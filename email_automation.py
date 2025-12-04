#!/usr/bin/env python3
"""
Email Automation Script
A comprehensive Python script for automating email sending with support for:
- Single and bulk email sending
- HTML and plain text emails
- Attachments
- CC and BCC recipients
- Email templates
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import List, Optional
import json
from datetime import datetime


class EmailAutomation:
    """Email automation class for sending emails programmatically."""
    
    def __init__(self, smtp_server: str, smtp_port: int, 
                 sender_email: str, sender_password: str,
                 use_tls: bool = True):
        """
        Initialize email automation with SMTP settings.
        
        Args:
            smtp_server: SMTP server address (e.g., 'smtp.gmail.com')
            smtp_port: SMTP server port (e.g., 587 for TLS, 465 for SSL)
            sender_email: Email address to send from
            sender_password: Password or app-specific password for sender email
            use_tls: Whether to use TLS encryption (default: True)
        """
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.sender_email = sender_email
        self.sender_password = sender_password
        self.use_tls = use_tls
    
    def create_message(self, to_email: str, subject: str, body: str,
                      html_body: Optional[str] = None,
                      cc: Optional[List[str]] = None,
                      bcc: Optional[List[str]] = None,
                      attachments: Optional[List[str]] = None) -> MIMEMultipart:
        """
        Create an email message with optional HTML, CC, BCC, and attachments.
        
        Args:
            to_email: Recipient email address(es) - can be string or list
            subject: Email subject
            body: Plain text email body
            html_body: Optional HTML email body
            cc: Optional list of CC recipients
            bcc: Optional list of BCC recipients
            attachments: Optional list of file paths to attach
        
        Returns:
            MIMEMultipart message object
        """
        msg = MIMEMultipart('alternative')
        msg['From'] = self.sender_email
        msg['To'] = to_email if isinstance(to_email, str) else ', '.join(to_email)
        msg['Subject'] = subject
        
        if cc:
            msg['Cc'] = ', '.join(cc) if isinstance(cc, list) else cc
        
        # Add plain text part
        text_part = MIMEText(body, 'plain')
        msg.attach(text_part)
        
        # Add HTML part if provided
        if html_body:
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
        
        # Add attachments if any
        if attachments:
            for file_path in attachments:
                if os.path.isfile(file_path):
                    with open(file_path, 'rb') as attachment:
                        part = MIMEBase('application', 'octet-stream')
                        part.set_payload(attachment.read())
                    
                    encoders.encode_base64(part)
                    part.add_header(
                        'Content-Disposition',
                        f'attachment; filename= {os.path.basename(file_path)}'
                    )
                    msg.attach(part)
        
        return msg
    
    def send_email(self, to_email: str, subject: str, body: str,
                   html_body: Optional[str] = None,
                   cc: Optional[List[str]] = None,
                   bcc: Optional[List[str]] = None,
                   attachments: Optional[List[str]] = None) -> bool:
        """
        Send a single email.
        
        Args:
            to_email: Recipient email address(es)
            subject: Email subject
            body: Plain text email body
            html_body: Optional HTML email body
            cc: Optional list of CC recipients
            bcc: Optional list of BCC recipients
            attachments: Optional list of file paths to attach
        
        Returns:
            True if email sent successfully, False otherwise
        """
        try:
            msg = self.create_message(to_email, subject, body, html_body, cc, bcc, attachments)
            
            # Combine all recipients
            recipients = [to_email] if isinstance(to_email, str) else to_email
            if cc:
                recipients.extend(cc if isinstance(cc, list) else [cc])
            if bcc:
                recipients.extend(bcc if isinstance(bcc, list) else [bcc])
            
            # Connect to SMTP server and send
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                if self.use_tls:
                    server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)
            
            print(f"✓ Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            print(f"✗ Error sending email to {to_email}: {str(e)}")
            return False
    
    def send_bulk_emails(self, recipients: List[dict], 
                        subject_template: Optional[str] = None,
                        body_template: Optional[str] = None) -> dict:
        """
        Send bulk emails to multiple recipients.
        
        Args:
            recipients: List of dictionaries, each containing:
                - 'email': recipient email address
                - 'subject': email subject (or use subject_template)
                - 'body': email body (or use body_template)
                - 'html_body': optional HTML body
                - 'cc': optional CC list
                - 'bcc': optional BCC list
                - 'attachments': optional attachments list
            subject_template: Optional template string for subject (use {name}, {email}, etc.)
            body_template: Optional template string for body (use {name}, {email}, etc.)
        
        Returns:
            Dictionary with success and failure counts
        """
        results = {'success': 0, 'failed': 0, 'failed_emails': []}
        
        for recipient in recipients:
            email = recipient.get('email')
            subject = recipient.get('subject', subject_template or 'No Subject')
            body = recipient.get('body', body_template or '')
            
            # Replace template variables if templates are used
            if subject_template:
                subject = subject_template.format(**recipient)
            if body_template:
                body = body_template.format(**recipient)
            
            success = self.send_email(
                to_email=email,
                subject=subject,
                body=body,
                html_body=recipient.get('html_body'),
                cc=recipient.get('cc'),
                bcc=recipient.get('bcc'),
                attachments=recipient.get('attachments')
            )
            
            if success:
                results['success'] += 1
            else:
                results['failed'] += 1
                results['failed_emails'].append(email)
        
        print(f"\n📊 Bulk email summary:")
        print(f"   Success: {results['success']}")
        print(f"   Failed: {results['failed']}")
        
        return results


def load_config(config_file: str = 'email_config.json') -> dict:
    """Load email configuration from JSON file."""
    try:
        with open(config_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Config file {config_file} not found. Using environment variables.")
        return {}


def main():
    """Example usage of the EmailAutomation class."""
    
    # Configuration - You can load from file or use environment variables
    # For Gmail, you'll need to use an App Password: https://support.google.com/accounts/answer/185833
    
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'your_email@gmail.com')
    SENDER_PASSWORD = os.getenv('SENDER_PASSWORD', 'your_app_password')
    
    # Initialize email automation
    email_bot = EmailAutomation(
        smtp_server=SMTP_SERVER,
        smtp_port=SMTP_PORT,
        sender_email=SENDER_EMAIL,
        sender_password=SENDER_PASSWORD,
        use_tls=True
    )
    
    # Example 1: Send a simple plain text email
    print("Example 1: Sending plain text email...")
    email_bot.send_email(
        to_email='recipient@example.com',
        subject='Test Email from Python',
        body='This is a test email sent using Python automation.'
    )
    
    # Example 2: Send an HTML email
    print("\nExample 2: Sending HTML email...")
    html_content = """
    <html>
      <body>
        <h2>Hello!</h2>
        <p>This is an <b>HTML email</b> sent using Python.</p>
        <p>Sent at: {}</p>
      </body>
    </html>
    """.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    
    email_bot.send_email(
        to_email='recipient@example.com',
        subject='HTML Test Email',
        body='This is the plain text version.',
        html_body=html_content
    )
    
    # Example 3: Send email with attachment
    print("\nExample 3: Sending email with attachment...")
    # email_bot.send_email(
    #     to_email='recipient@example.com',
    #     subject='Email with Attachment',
    #     body='Please find the attached file.',
    #     attachments=['/path/to/file.pdf']
    # )
    
    # Example 4: Send bulk emails
    print("\nExample 4: Sending bulk emails...")
    recipients = [
        {
            'email': 'recipient1@example.com',
            'subject': 'Personalized Email 1',
            'body': 'Hello! This is a personalized email.',
            'name': 'John'
        },
        {
            'email': 'recipient2@example.com',
            'subject': 'Personalized Email 2',
            'body': 'Hello! This is another personalized email.',
            'name': 'Jane'
        }
    ]
    
    # email_bot.send_bulk_emails(recipients)
    
    print("\n✓ Email automation examples completed!")


if __name__ == '__main__':
    main()
