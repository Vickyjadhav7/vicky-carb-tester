"""
Email Automation Script
Supports Gmail, Outlook, and custom SMTP servers
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os
import json
from typing import List, Optional
from datetime import datetime


class EmailAutomation:
    """Email automation class for sending emails via SMTP"""
    
    # Common SMTP server configurations
    SMTP_SERVERS = {
        'gmail': {
            'smtp_server': 'smtp.gmail.com',
            'smtp_port': 587,
            'smtp_port_ssl': 465
        },
        'outlook': {
            'smtp_server': 'smtp-mail.outlook.com',
            'smtp_port': 587,
            'smtp_port_ssl': 465
        },
        'yahoo': {
            'smtp_server': 'smtp.mail.yahoo.com',
            'smtp_port': 587,
            'smtp_port_ssl': 465
        }
    }
    
    def __init__(self, email: str, password: str, provider: str = 'gmail', 
                 smtp_server: Optional[str] = None, smtp_port: Optional[int] = None):
        """
        Initialize EmailAutomation
        
        Args:
            email: Your email address
            password: Your email password or app-specific password
            provider: Email provider ('gmail', 'outlook', 'yahoo', or 'custom')
            smtp_server: Custom SMTP server (required if provider is 'custom')
            smtp_port: Custom SMTP port (required if provider is 'custom')
        """
        self.email = email
        self.password = password
        
        if provider.lower() in self.SMTP_SERVERS:
            config = self.SMTP_SERVERS[provider.lower()]
            self.smtp_server = config['smtp_server']
            self.smtp_port = config['smtp_port']
        elif provider.lower() == 'custom':
            if not smtp_server or not smtp_port:
                raise ValueError("smtp_server and smtp_port are required for custom provider")
            self.smtp_server = smtp_server
            self.smtp_port = smtp_port
        else:
            raise ValueError(f"Unsupported provider: {provider}")
    
    def send_email(self, 
                   to_emails: List[str],
                   subject: str,
                   body: str,
                   is_html: bool = False,
                   cc_emails: Optional[List[str]] = None,
                   bcc_emails: Optional[List[str]] = None,
                   attachments: Optional[List[str]] = None) -> bool:
        """
        Send an email
        
        Args:
            to_emails: List of recipient email addresses
            subject: Email subject
            body: Email body content
            is_html: Whether the body is HTML format
            cc_emails: List of CC email addresses (optional)
            bcc_emails: List of BCC email addresses (optional)
            attachments: List of file paths to attach (optional)
        
        Returns:
            True if email sent successfully, False otherwise
        """
        try:
            # Create message
            message = MIMEMultipart()
            message['From'] = self.email
            message['To'] = ', '.join(to_emails)
            message['Subject'] = subject
            
            if cc_emails:
                message['Cc'] = ', '.join(cc_emails)
            
            # Add body to email
            body_type = 'html' if is_html else 'plain'
            message.attach(MIMEText(body, body_type))
            
            # Add attachments
            if attachments:
                for file_path in attachments:
                    if os.path.isfile(file_path):
                        self._add_attachment(message, file_path)
                    else:
                        print(f"Warning: File not found: {file_path}")
            
            # Combine all recipients
            all_recipients = to_emails.copy()
            if cc_emails:
                all_recipients.extend(cc_emails)
            if bcc_emails:
                all_recipients.extend(bcc_emails)
            
            # Create SMTP session
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.email, self.password)
                server.sendmail(self.email, all_recipients, message.as_string())
            
            print(f"Email sent successfully to {', '.join(to_emails)}")
            return True
            
        except smtplib.SMTPAuthenticationError:
            print("Error: Authentication failed. Check your email and password.")
            return False
        except smtplib.SMTPRecipientsRefused:
            print("Error: One or more recipient addresses were refused.")
            return False
        except smtplib.SMTPServerDisconnected:
            print("Error: Server unexpectedly disconnected.")
            return False
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False
    
    def _add_attachment(self, message: MIMEMultipart, file_path: str):
        """Add an attachment to the email message"""
        with open(file_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        
        encoders.encode_base64(part)
        
        filename = os.path.basename(file_path)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename= {filename}',
        )
        
        message.attach(part)
    
    def send_bulk_emails(self,
                        recipients: List[dict],
                        subject_template: str,
                        body_template: str,
                        is_html: bool = False,
                        attachments: Optional[List[str]] = None) -> dict:
        """
        Send bulk personalized emails
        
        Args:
            recipients: List of dicts with 'email' and optional 'name' and other fields
            subject_template: Subject template (use {name} or {email} for personalization)
            body_template: Body template (use {name} or {email} for personalization)
            is_html: Whether the body is HTML format
            attachments: List of file paths to attach (optional)
        
        Returns:
            Dictionary with 'success' and 'failed' lists
        """
        results = {'success': [], 'failed': []}
        
        for recipient in recipients:
            email = recipient.get('email')
            name = recipient.get('name', email.split('@')[0])
            
            # Personalize subject and body
            subject = subject_template.format(**recipient, name=name, email=email)
            body = body_template.format(**recipient, name=name, email=email)
            
            # Send email
            if self.send_email([email], subject, body, is_html, attachments=attachments):
                results['success'].append(email)
            else:
                results['failed'].append(email)
        
        print(f"\nBulk email summary:")
        print(f"Successfully sent: {len(results['success'])}")
        print(f"Failed: {len(results['failed'])}")
        
        return results


def load_config(config_file: str = 'email_config.json') -> dict:
    """Load email configuration from JSON file"""
    try:
        with open(config_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Config file {config_file} not found. Using default settings.")
        return {}


def save_config(config: dict, config_file: str = 'email_config.json'):
    """Save email configuration to JSON file"""
    with open(config_file, 'w') as f:
        json.dump(config, f, indent=4)


# Example usage
if __name__ == "__main__":
    # Example 1: Simple email
    print("Example 1: Sending a simple email")
    print("-" * 50)
    
    # Initialize email automation (replace with your credentials)
    # For Gmail, you may need to use an App Password instead of your regular password
    email_automation = EmailAutomation(
        email='your_email@gmail.com',
        password='your_app_password',  # Use App Password for Gmail
        provider='gmail'
    )
    
    # Send a simple text email
    email_automation.send_email(
        to_emails=['recipient@example.com'],
        subject='Test Email from Python',
        body='This is a test email sent using Python email automation.',
        is_html=False
    )
    
    print("\n" + "=" * 50 + "\n")
    
    # Example 2: HTML email with attachment
    print("Example 2: Sending HTML email with attachment")
    print("-" * 50)
    
    html_body = """
    <html>
      <body>
        <h2>Hello!</h2>
        <p>This is an <b>HTML email</b> sent from Python.</p>
        <p>Current time: {}</p>
      </body>
    </html>
    """.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    
    # Uncomment to send with attachment
    # email_automation.send_email(
    #     to_emails=['recipient@example.com'],
    #     subject='HTML Email with Attachment',
    #     body=html_body,
    #     is_html=True,
    #     attachments=['/path/to/file.pdf']  # Add file path here
    # )
    
    print("\n" + "=" * 50 + "\n")
    
    # Example 3: Bulk personalized emails
    print("Example 3: Sending bulk personalized emails")
    print("-" * 50)
    
    recipients = [
        {'email': 'user1@example.com', 'name': 'John', 'company': 'ABC Corp'},
        {'email': 'user2@example.com', 'name': 'Jane', 'company': 'XYZ Inc'},
    ]
    
    subject_template = "Hello {name}! Welcome to our service"
    body_template = """
    Dear {name},
    
    Thank you for joining us! We're excited to have {company} on board.
    
    Best regards,
    Email Automation Team
    """
    
    # Uncomment to send bulk emails
    # results = email_automation.send_bulk_emails(
    #     recipients=recipients,
    #     subject_template=subject_template,
    #     body_template=body_template,
    #     is_html=False
    # )
    
    print("\nNote: Update email credentials in the script before running.")
    print("For Gmail, use App Password: https://support.google.com/accounts/answer/185833")
