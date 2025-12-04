#!/usr/bin/env python3
"""
Utility script for sending templated emails via SMTP.

Example (Gmail with an app password):
    python email_automation.py \
        --smtp-server smtp.gmail.com \
        --smtp-port 465 \
        --use-ssl \
        --username you@gmail.com \
        --password-env SMTP_PASS \
        --from you@gmail.com \
        --to teammate@example.com \
        --subject "Deployment finished" \
        --template templates/summary.txt \
        --context release=2024.12 build=42 \
        --attachment reports/status.pdf
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import smtplib
import ssl
from dataclasses import dataclass, field
from email.message import EmailMessage
from pathlib import Path
from typing import Iterable, Sequence


@dataclass(slots=True)
class SMTPSettings:
    server: str
    port: int
    username: str
    password: str
    use_ssl: bool = True
    use_starttls: bool = False
    timeout: float | None = 60.0


@dataclass(slots=True)
class EmailPayload:
    subject: str
    body: str
    sender: str
    to: Sequence[str]
    cc: Sequence[str] = field(default_factory=tuple)
    bcc: Sequence[str] = field(default_factory=tuple)
    attachments: Sequence[Path] = field(default_factory=tuple)


def parse_context(pairs: Iterable[str]) -> dict[str, str]:
    """Turn ["k=v", ...] into {"k": "v"}."""
    context: dict[str, str] = {}
    for pair in pairs:
        if "=" not in pair:
            raise argparse.ArgumentTypeError(
                f"Context '{pair}' must look like key=value."
            )
        key, value = pair.split("=", maxsplit=1)
        key = key.strip()
        if not key:
            raise argparse.ArgumentTypeError("Context keys cannot be empty.")
        context[key] = value.strip()
    return context


class DefaultingDict(dict[str, str]):
    """Allows str.format_map to leave {placeholders} untouched when missing."""

    def __missing__(self, key: str) -> str:
        return "{" + key + "}"


def load_context(args: argparse.Namespace) -> dict[str, str]:
    context: dict[str, str] = {}
    if args.context_file:
        data = json.loads(Path(args.context_file).read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise SystemExit("Context file must contain a JSON object.")
        context.update({str(k): str(v) for k, v in data.items()})
    context.update(parse_context(args.context or ()))
    return context


def resolve_body(args: argparse.Namespace, context: dict[str, str]) -> str:
    if args.template:
        template = Path(args.template).read_text(encoding="utf-8")
        return template.format_map(DefaultingDict(context))
    if args.body_file:
        return Path(args.body_file).read_text(encoding="utf-8")
    if args.body:
        return args.body
    raise SystemExit("Provide --body, --body-file, or --template.")


def build_message(payload: EmailPayload) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = payload.subject
    msg["From"] = payload.sender
    msg["To"] = ", ".join(payload.to)
    if payload.cc:
        msg["Cc"] = ", ".join(payload.cc)
    msg.set_content(payload.body)

    for attachment in payload.attachments:
        path = Path(attachment)
        data = path.read_bytes()
        mime_type, _ = mimetypes.guess_type(path.name)
        maintype, subtype = (mime_type or "application/octet-stream").split("/", 1)
        msg.add_attachment(data, maintype=maintype, subtype=subtype, filename=path.name)
    return msg


def send_email(settings: SMTPSettings, message: EmailMessage) -> None:
    if settings.use_ssl and settings.use_starttls:
        raise SystemExit("Choose either --use-ssl or --use-starttls, not both.")

    ssl_context = ssl.create_default_context()
    smtp: smtplib.SMTP

    if settings.use_ssl:
        smtp = smtplib.SMTP_SSL(
            settings.server,
            settings.port,
            timeout=settings.timeout,
            context=ssl_context,
        )
    else:
        smtp = smtplib.SMTP(settings.server, settings.port, timeout=settings.timeout)

    with smtp:
        if settings.use_starttls:
            smtp.starttls(context=ssl_context)

        if settings.username and settings.password:
            smtp.login(settings.username, settings.password)

        smtp.send_message(message)


def read_password(args: argparse.Namespace) -> str:
    if args.password:
        return args.password
    if args.password_env:
        try:
            return os.environ[args.password_env]
        except KeyError as exc:
            raise SystemExit(
                f"Environment variable '{args.password_env}' is not set."
            ) from exc
    raise SystemExit("Provide --password or --password-env.")


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Send templated emails via SMTP with optional attachments."
    )
    parser.add_argument("--smtp-server", required=True, help="SMTP host name.")
    parser.add_argument("--smtp-port", type=int, default=465, help="SMTP port.")
    parser.add_argument("--username", help="SMTP username; defaults to sender.")
    parser.add_argument(
        "--password",
        help="SMTP password (consider using --password-env instead).",
    )
    parser.add_argument(
        "--password-env",
        help="Environment variable that stores the SMTP password.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=60.0,
        help="Socket timeout in seconds (default: 60).",
    )
    parser.add_argument(
        "--use-ssl",
        action="store_true",
        default=False,
        help="Connect using SMTP over SSL (implicit TLS).",
    )
    parser.add_argument(
        "--use-starttls",
        action="store_true",
        help="Upgrade plaintext connection with STARTTLS.",
    )
    parser.add_argument("--from", dest="sender", required=True, help="From address.")
    parser.add_argument(
        "--to",
        nargs="+",
        required=True,
        help="Recipient email addresses.",
    )
    parser.add_argument("--cc", nargs="+", help="CC recipients.")
    parser.add_argument("--bcc", nargs="+", help="BCC recipients.")
    parser.add_argument("--subject", required=True, help="Email subject line.")
    parser.add_argument("--body", help="Plain-text body inline.")
    parser.add_argument(
        "--body-file",
        help="Path to a text file used as the body.",
    )
    parser.add_argument(
        "--template",
        help="Path to a text template that uses Python str.format placeholders.",
    )
    parser.add_argument(
        "--context",
        nargs="*",
        help="Template context as key=value pairs.",
    )
    parser.add_argument(
        "--context-file",
        help="Path to a JSON file whose keys feed the template context.",
    )
    parser.add_argument(
        "--attachment",
        nargs="*",
        default=(),
        help="Paths to files that will be attached.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Render everything but skip the SMTP call.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_arguments()
    context = load_context(args)
    body = resolve_body(args, context)
    password = read_password(args)
    username = args.username or args.sender

    payload = EmailPayload(
        subject=args.subject,
        body=body,
        sender=args.sender,
        to=args.to,
        cc=tuple(args.cc or ()),
        bcc=tuple(args.bcc or ()),
        attachments=tuple(Path(p) for p in args.attachment),
    )
    message = build_message(payload)

    settings = SMTPSettings(
        server=args.smtp_server,
        port=args.smtp_port,
        username=username,
        password=password,
        use_ssl=args.use_ssl,
        use_starttls=args.use_starttls,
        timeout=args.timeout,
    )

    if args.dry_run:
        print("Dry run complete. Message would be sent with:")
        print(f"  From: {payload.sender}")
        print(f"  To: {', '.join(payload.to)}")
        if payload.cc:
            print(f"  Cc: {', '.join(payload.cc)}")
        if payload.bcc:
            print(f"  Bcc: {', '.join(payload.bcc)}")
        print(f"  Subject: {payload.subject}")
        print(f"  Body preview: {payload.body[:120]!r}")
        print(f"  Attachments: {[p.name for p in payload.attachments]}")
        return

    send_email(settings, message)
    print("Email sent.")


if __name__ == "__main__":
    main()
