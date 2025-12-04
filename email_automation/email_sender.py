"""
Email Sender Module
Core functionality for sending emails via SMTP.
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import List, Optional, Union
from pathlib import Path
import logging

from config import EmailConfig

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class EmailSender:
    """Class to handle email sending operations."""

    def __init__(self, config: EmailConfig):
        """
        Initialize the EmailSender with configuration.
        
        Args:
            config: EmailConfig object with SMTP settings
        """
        self.config = config
        self.config.validate()

    def send_email(
        self,
        to_email: Union[str, List[str]],
        subject: str,
        body: str,
        html_body: Optional[str] = None,
        cc: Optional[List[str]] = None,
        bcc: Optional[List[str]] = None,
        attachments: Optional[List[str]] = None,
        reply_to: Optional[str] = None
    ) -> bool:
        """
        Send an email.

        Args:
            to_email: Recipient email address(es)
            subject: Email subject line
            body: Plain text email body
            html_body: Optional HTML version of the email body
            cc: Optional list of CC recipients
            bcc: Optional list of BCC recipients
            attachments: Optional list of file paths to attach
            reply_to: Optional reply-to email address

        Returns:
            bool: True if email was sent successfully, False otherwise
        """
        try:
            # Create message
            message = MIMEMultipart('alternative')
            message['Subject'] = subject
            message['From'] = f"{self.config.sender_name} <{self.config.email_address}>"
            
            # Handle multiple recipients
            if isinstance(to_email, list):
                message['To'] = ', '.join(to_email)
                recipients = to_email.copy()
            else:
                message['To'] = to_email
                recipients = [to_email]

            # Add CC recipients
            if cc:
                message['Cc'] = ', '.join(cc)
                recipients.extend(cc)

            # Add BCC recipients (don't add to header, just to recipients list)
            if bcc:
                recipients.extend(bcc)

            # Add Reply-To header
            if reply_to:
                message['Reply-To'] = reply_to

            # Attach plain text body
            message.attach(MIMEText(body, 'plain'))

            # Attach HTML body if provided
            if html_body:
                message.attach(MIMEText(html_body, 'html'))

            # Handle attachments
            if attachments:
                for file_path in attachments:
                    self._attach_file(message, file_path)

            # Send email
            self._send_via_smtp(message, recipients)
            
            logger.info(f"Email sent successfully to {to_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False

    def _attach_file(self, message: MIMEMultipart, file_path: str) -> None:
        """
        Attach a file to the email message.

        Args:
            message: The email message to attach the file to
            file_path: Path to the file to attach
        """
        path = Path(file_path)
        if not path.exists():
            logger.warning(f"Attachment not found: {file_path}")
            return

        with open(path, 'rb') as file:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(file.read())

        encoders.encode_base64(part)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename={path.name}'
        )
        message.attach(part)
        logger.info(f"Attached file: {path.name}")

    def _send_via_smtp(self, message: MIMEMultipart, recipients: List[str]) -> None:
        """
        Send message via SMTP server.

        Args:
            message: The email message to send
            recipients: List of recipient email addresses
        """
        context = ssl.create_default_context()

        with smtplib.SMTP(self.config.smtp_server, self.config.smtp_port) as server:
            if self.config.use_tls:
                server.starttls(context=context)
            
            server.login(self.config.email_address, self.config.email_password)
            server.sendmail(
                self.config.email_address,
                recipients,
                message.as_string()
            )

    def send_bulk_emails(
        self,
        recipients_data: List[dict],
        subject: str,
        body_template: str,
        html_template: Optional[str] = None,
        delay_seconds: float = 1.0
    ) -> dict:
        """
        Send bulk emails with personalization.

        Args:
            recipients_data: List of dicts with 'email' and other personalization fields
            subject: Email subject (can contain {placeholders})
            body_template: Plain text body template with {placeholders}
            html_template: Optional HTML body template with {placeholders}
            delay_seconds: Delay between emails to avoid rate limiting

        Returns:
            dict: Summary with 'sent' and 'failed' counts and details
        """
        import time

        results = {
            'sent': [],
            'failed': [],
            'total': len(recipients_data)
        }

        for i, recipient in enumerate(recipients_data, 1):
            email = recipient.get('email')
            if not email:
                logger.warning(f"Skipping recipient without email: {recipient}")
                results['failed'].append({'data': recipient, 'error': 'No email address'})
                continue

            try:
                # Personalize subject and body
                personalized_subject = subject.format(**recipient)
                personalized_body = body_template.format(**recipient)
                personalized_html = html_template.format(**recipient) if html_template else None

                success = self.send_email(
                    to_email=email,
                    subject=personalized_subject,
                    body=personalized_body,
                    html_body=personalized_html
                )

                if success:
                    results['sent'].append(email)
                else:
                    results['failed'].append({'email': email, 'error': 'Send failed'})

            except KeyError as e:
                error_msg = f"Missing placeholder: {e}"
                logger.error(f"Failed for {email}: {error_msg}")
                results['failed'].append({'email': email, 'error': error_msg})

            except Exception as e:
                logger.error(f"Failed for {email}: {str(e)}")
                results['failed'].append({'email': email, 'error': str(e)})

            # Progress update
            logger.info(f"Progress: {i}/{len(recipients_data)}")

            # Delay between emails (except for the last one)
            if i < len(recipients_data) and delay_seconds > 0:
                time.sleep(delay_seconds)

        logger.info(f"Bulk send complete: {len(results['sent'])} sent, {len(results['failed'])} failed")
        return results
