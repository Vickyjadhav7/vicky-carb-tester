"""Simple email automation helper.

This module provides an EmailAutomation class that can send templated
messages to one or more recipients using SMTP-compatible providers.
"""
from __future__ import annotations

from dataclasses import dataclass
from email.message import EmailMessage
from pathlib import Path
from string import Template
import argparse
import csv
import os
import smtplib
import ssl
from typing import Iterable, Sequence


@dataclass(frozen=True)
class EmailConfig:
    """SMTP connection settings."""

    smtp_host: str
    smtp_port: int
    username: str
    password: str
    use_tls: bool = True


@dataclass(frozen=True)
class Recipient:
    """Individual email recipient."""

    address: str
    name: str = ""

    @property
    def formatted(self) -> str:
        return f"{self.name} <{self.address}>" if self.name else self.address


class EmailAutomation:
    """Send templated emails through a configured SMTP server."""

    def __init__(self, config: EmailConfig) -> None:
        self._config = config

    def send_email(
        self,
        subject: str,
        body: str,
        recipients: Iterable[Recipient],
        *,
        reply_to: str | None = None,
        sender: str,
    ) -> None:
        """Send the provided body to the given recipients."""

        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = sender
        message["To"] = ", ".join(r.formatted for r in recipients)
        if reply_to:
            message["Reply-To"] = reply_to
        message.set_content(body)

        context = ssl.create_default_context()
        with smtplib.SMTP(self._config.smtp_host, self._config.smtp_port) as smtp:
            if self._config.use_tls:
                smtp.starttls(context=context)
            smtp.login(self._config.username, self._config.password)
            smtp.send_message(message)

    def send_bulk(
        self,
        subject_template: Template,
        body_template: Template,
        recipients: Sequence[Recipient],
        *,
        sender: str,
    ) -> None:
        """Send a personalized message to every recipient."""

        for recipient in recipients:
            substitutions = {"name": recipient.name, "email": recipient.address}
            subject = subject_template.safe_substitute(substitutions)
            body = body_template.safe_substitute(substitutions)
            self.send_email(subject, body, [recipient], sender=sender)


def load_recipients(csv_path: Path) -> list[Recipient]:
    """Load a CSV file containing at least an email column."""

    recipients: list[Recipient] = []
    with csv_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            email = row.get("email", "").strip()
            if not email:
                continue
            recipients.append(
                Recipient(
                    address=email,
                    name=row.get("name", "").strip(),
                )
            )
    return recipients


def build_config_from_env() -> EmailConfig:
    """Create a config object using environment variables."""

    try:
        return EmailConfig(
            smtp_host=os.environ["SMTP_HOST"],
            smtp_port=int(os.environ.get("SMTP_PORT", "587")),
            username=os.environ["SMTP_USERNAME"],
            password=os.environ["SMTP_PASSWORD"],
            use_tls=os.environ.get("SMTP_USE_TLS", "1") not in {"0", "false", "False"},
        )
    except KeyError as exc:  # pragma: no cover
        missing = ", ".join(str(exc))
        raise RuntimeError(f"Missing environment variable: {missing}") from exc


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Send templated emails")
    parser.add_argument("recipients", type=Path, help="CSV file with email,name headers")
    parser.add_argument("subject", help="Subject line template e.g. 'Hi $name'")
    parser.add_argument("body", help="Path to a text file used as the body template")
    parser.add_argument("sender", help="Email address that appears in the From field")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    recipients = load_recipients(args.recipients)
    body_template_text = Path(args.body).read_text(encoding="utf-8")
    automation = EmailAutomation(build_config_from_env())
    automation.send_bulk(
        Template(args.subject),
        Template(body_template_text),
        recipients,
        sender=args.sender,
    )


if __name__ == "__main__":
    main()
