"""
Email Automation Script
This script provides a comprehensive email automation solution with support for:
- Sending single and batch emails
- HTML email templates
- File attachments
- Multiple recipients (To, CC, BCC)
- SSL/TLS encryption
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from email.utils import formataddr
from typing import List, Optional, Dict
from pathlib import Path
from dotenv import load_dotenv
import csv
import json
from datetime import datetime

# Load environment variables
load_dotenv()


class EmailAutomation:
    """
    Email automation class for sending emails with various configurations
    """
    
    def __init__(
        self,
        smtp_server: str = None,
        smtp_port: int = None,
        email: str = None,
        password: str = None,
        use_tls: bool = True
    ):
        """
        Initialize email automation with SMTP configuration
        
        Args:
            smtp_server: SMTP server address (e.g., smtp.gmail.com)
            smtp_port: SMTP port (587 for TLS, 465 for SSL, 25 for non-encrypted)
            email: Sender email address
            password: Email password or app-specific password
            use_tls: Whether to use TLS encryption (recommended)
        """
        self.smtp_server = smtp_server or os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = smtp_port or int(os.getenv('SMTP_PORT', 587))
        self.email = email or os.getenv('EMAIL_ADDRESS')
        self.password = password or os.getenv('EMAIL_PASSWORD')
        self.use_tls = use_tls
        self.sender_name = os.getenv('SENDER_NAME', 'Email Bot')
        
        if not self.email or not self.password:
            raise ValueError("Email and password must be provided either as arguments or environment variables")
    
    def send_email(
        self,
        to_email: str | List[str],
        subject: str,
        body: str,
        cc: Optional[List[str]] = None,
        bcc: Optional[List[str]] = None,
        attachments: Optional[List[str]] = None,
        html: bool = False,
        reply_to: Optional[str] = None
    ) -> Dict[str, any]:
        """
        Send an email with optional attachments and HTML content
        
        Args:
            to_email: Recipient email address(es)
            subject: Email subject
            body: Email body content
            cc: List of CC recipients
            bcc: List of BCC recipients
            attachments: List of file paths to attach
            html: Whether the body is HTML content
            reply_to: Reply-to email address
            
        Returns:
            Dictionary with status and message
        """
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['From'] = formataddr((self.sender_name, self.email))
            msg['Subject'] = subject
            
            # Handle multiple recipients
            if isinstance(to_email, list):
                msg['To'] = ', '.join(to_email)
            else:
                msg['To'] = to_email
                to_email = [to_email]
            
            if cc:
                msg['Cc'] = ', '.join(cc)
                to_email.extend(cc)
            
            if bcc:
                to_email.extend(bcc)
            
            if reply_to:
                msg['Reply-To'] = reply_to
            
            # Attach body
            if html:
                msg.attach(MIMEText(body, 'html'))
            else:
                msg.attach(MIMEText(body, 'plain'))
            
            # Attach files
            if attachments:
                for file_path in attachments:
                    self._attach_file(msg, file_path)
            
            # Connect and send
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                if self.use_tls:
                    server.starttls()
                server.login(self.email, self.password)
                server.send_message(msg)
            
            return {
                'status': 'success',
                'message': f'Email sent successfully to {", ".join(to_email)}',
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Failed to send email: {str(e)}',
                'timestamp': datetime.now().isoformat()
            }
    
    def _attach_file(self, msg: MIMEMultipart, file_path: str):
        """
        Attach a file to the email message
        
        Args:
            msg: MIMEMultipart message object
            file_path: Path to the file to attach
        """
        try:
            path = Path(file_path)
            if not path.exists():
                raise FileNotFoundError(f"File not found: {file_path}")
            
            with open(file_path, 'rb') as file:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(file.read())
            
            encoders.encode_base64(part)
            part.add_header(
                'Content-Disposition',
                f'attachment; filename={path.name}'
            )
            msg.attach(part)
            
        except Exception as e:
            print(f"Warning: Could not attach file {file_path}: {str(e)}")
    
    def send_bulk_emails(
        self,
        recipients: List[Dict[str, str]],
        subject_template: str,
        body_template: str,
        html: bool = False,
        attachments: Optional[List[str]] = None,
        log_file: str = 'email_log.json'
    ) -> List[Dict[str, any]]:
        """
        Send personalized emails to multiple recipients
        
        Args:
            recipients: List of dictionaries containing recipient info and template variables
                       Example: [{'email': 'john@example.com', 'name': 'John', 'company': 'Acme'}]
            subject_template: Subject with placeholders like "Hello {name}!"
            body_template: Body with placeholders
            html: Whether the body is HTML
            attachments: List of file paths to attach to each email
            log_file: Path to save the email log
            
        Returns:
            List of results for each email sent
        """
        results = []
        
        for recipient in recipients:
            try:
                # Replace placeholders
                email_address = recipient.get('email')
                if not email_address:
                    results.append({
                        'status': 'error',
                        'message': 'No email address provided',
                        'recipient': recipient
                    })
                    continue
                
                # Format subject and body with recipient data
                subject = subject_template.format(**recipient)
                body = body_template.format(**recipient)
                
                # Send email
                result = self.send_email(
                    to_email=email_address,
                    subject=subject,
                    body=body,
                    html=html,
                    attachments=attachments
                )
                result['recipient'] = email_address
                results.append(result)
                
            except Exception as e:
                results.append({
                    'status': 'error',
                    'message': str(e),
                    'recipient': recipient.get('email', 'unknown'),
                    'timestamp': datetime.now().isoformat()
                })
        
        # Save log
        self._save_log(results, log_file)
        
        return results
    
    def send_from_csv(
        self,
        csv_file: str,
        subject_template: str,
        body_template: str,
        html: bool = False,
        attachments: Optional[List[str]] = None
    ) -> List[Dict[str, any]]:
        """
        Send emails to recipients listed in a CSV file
        
        Args:
            csv_file: Path to CSV file with columns including 'email'
            subject_template: Subject with placeholders matching CSV columns
            body_template: Body with placeholders matching CSV columns
            html: Whether the body is HTML
            attachments: List of file paths to attach
            
        Returns:
            List of results for each email sent
        """
        recipients = []
        
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            recipients = list(reader)
        
        return self.send_bulk_emails(
            recipients=recipients,
            subject_template=subject_template,
            body_template=body_template,
            html=html,
            attachments=attachments,
            log_file=f'email_log_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        )
    
    def _save_log(self, results: List[Dict], log_file: str):
        """
        Save email sending results to a log file
        
        Args:
            results: List of result dictionaries
            log_file: Path to save the log
        """
        try:
            with open(log_file, 'w', encoding='utf-8') as file:
                json.dump(results, file, indent=2)
            print(f"Log saved to {log_file}")
        except Exception as e:
            print(f"Warning: Could not save log: {str(e)}")
    
    def test_connection(self) -> bool:
        """
        Test SMTP connection and credentials
        
        Returns:
            True if connection successful, False otherwise
        """
        try:
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                if self.use_tls:
                    server.starttls()
                server.login(self.email, self.password)
            print("✓ Connection successful!")
            return True
        except Exception as e:
            print(f"✗ Connection failed: {str(e)}")
            return False


def main():
    """
    Example usage of the EmailAutomation class
    """
    # Initialize email automation
    email_bot = EmailAutomation()
    
    # Test connection
    print("Testing SMTP connection...")
    if not email_bot.test_connection():
        print("Please check your credentials and try again.")
        return
    
    # Example 1: Send a simple email
    print("\nExample 1: Sending a simple email...")
    result = email_bot.send_email(
        to_email="recipient@example.com",
        subject="Test Email from Python",
        body="This is a test email sent using Python automation!"
    )
    print(f"Result: {result['status']} - {result['message']}")
    
    # Example 2: Send an HTML email with attachments
    print("\nExample 2: Sending HTML email with attachment...")
    html_body = """
    <html>
        <body>
            <h2>Welcome to Email Automation!</h2>
            <p>This is an <strong>HTML email</strong> with formatting.</p>
            <ul>
                <li>Feature 1: Easy to use</li>
                <li>Feature 2: Supports attachments</li>
                <li>Feature 3: Bulk sending</li>
            </ul>
        </body>
    </html>
    """
    result = email_bot.send_email(
        to_email="recipient@example.com",
        subject="HTML Email Test",
        body=html_body,
        html=True,
        # attachments=["document.pdf"]  # Uncomment to add attachments
    )
    print(f"Result: {result['status']} - {result['message']}")
    
    # Example 3: Send bulk personalized emails
    print("\nExample 3: Sending bulk personalized emails...")
    recipients = [
        {"email": "john@example.com", "name": "John", "company": "Acme Inc"},
        {"email": "jane@example.com", "name": "Jane", "company": "Tech Corp"},
    ]
    
    results = email_bot.send_bulk_emails(
        recipients=recipients,
        subject_template="Hello {name}!",
        body_template="Dear {name},\n\nGreetings from {company}!\n\nBest regards,\nEmail Bot",
        html=False
    )
    
    success_count = sum(1 for r in results if r['status'] == 'success')
    print(f"Sent {success_count}/{len(results)} emails successfully")


if __name__ == "__main__":
    main()
