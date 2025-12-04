"""
Advanced Email Automation with Scheduling and CSV Support
Requires: pip install schedule pandas python-dotenv
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os
import json
import csv
from typing import List, Optional
from datetime import datetime
import time

try:
    import schedule
    import pandas as pd
    from dotenv import load_dotenv
    ADVANCED_FEATURES = True
except ImportError:
    ADVANCED_FEATURES = False
    print("Warning: Advanced features require: pip install schedule pandas python-dotenv")


class AdvancedEmailAutomation:
    """Advanced email automation with scheduling and CSV support"""
    
    SMTP_SERVERS = {
        'gmail': {
            'smtp_server': 'smtp.gmail.com',
            'smtp_port': 587
        },
        'outlook': {
            'smtp_server': 'smtp-mail.outlook.com',
            'smtp_port': 587
        },
        'yahoo': {
            'smtp_server': 'smtp.mail.yahoo.com',
            'smtp_port': 587
        }
    }
    
    def __init__(self, email: Optional[str] = None, password: Optional[str] = None,
                 provider: str = 'gmail', use_env: bool = True):
        """
        Initialize Advanced Email Automation
        
        Args:
            email: Your email address (or set EMAIL env variable)
            password: Your email password (or set PASSWORD env variable)
            provider: Email provider
            use_env: Load credentials from .env file
        """
        if use_env and ADVANCED_FEATURES:
            load_dotenv()
        
        self.email = email or os.getenv('EMAIL')
        self.password = password or os.getenv('PASSWORD')
        
        if not self.email or not self.password:
            raise ValueError("Email and password must be provided or set in environment variables")
        
        if provider.lower() in self.SMTP_SERVERS:
            config = self.SMTP_SERVERS[provider.lower()]
            self.smtp_server = config['smtp_server']
            self.smtp_port = config['smtp_port']
        else:
            raise ValueError(f"Unsupported provider: {provider}")
    
    def send_email(self, to_emails: List[str], subject: str, body: str,
                   is_html: bool = False, attachments: Optional[List[str]] = None) -> bool:
        """Send an email (same as basic version)"""
        try:
            message = MIMEMultipart()
            message['From'] = self.email
            message['To'] = ', '.join(to_emails)
            message['Subject'] = subject
            
            body_type = 'html' if is_html else 'plain'
            message.attach(MIMEText(body, body_type))
            
            if attachments:
                for file_path in attachments:
                    if os.path.isfile(file_path):
                        self._add_attachment(message, file_path)
            
            context = ssl.create_default_context()
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.email, self.password)
                server.sendmail(self.email, to_emails, message.as_string())
            
            print(f"✓ Email sent to {', '.join(to_emails)} at {datetime.now().strftime('%H:%M:%S')}")
            return True
        except Exception as e:
            print(f"✗ Error: {str(e)}")
            return False
    
    def _add_attachment(self, message: MIMEMultipart, file_path: str):
        """Add attachment to email"""
        with open(file_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename= {os.path.basename(file_path)}')
        message.attach(part)
    
    def load_recipients_from_csv(self, csv_file: str) -> List[dict]:
        """Load recipients from CSV file"""
        if not ADVANCED_FEATURES:
            # Fallback to standard library
            recipients = []
            with open(csv_file, 'r') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    recipients.append(row)
            return recipients
        
        df = pd.read_csv(csv_file)
        return df.to_dict('records')
    
    def send_from_csv(self, csv_file: str, subject_template: str, body_template: str,
                     is_html: bool = False, email_column: str = 'email') -> dict:
        """Send emails to recipients loaded from CSV"""
        recipients = self.load_recipients_from_csv(csv_file)
        results = {'success': [], 'failed': []}
        
        for recipient in recipients:
            email = recipient.get(email_column)
            if not email:
                continue
            
            subject = subject_template.format(**recipient)
            body = body_template.format(**recipient)
            
            if self.send_email([email], subject, body, is_html):
                results['success'].append(email)
            else:
                results['failed'].append(email)
        
        return results
    
    def schedule_email(self, time_str: str, to_emails: List[str], subject: str,
                      body: str, is_html: bool = False, attachments: Optional[List[str]] = None):
        """
        Schedule an email to be sent at a specific time
        
        Args:
            time_str: Time in format 'HH:MM' (24-hour format)
            to_emails: List of recipient emails
            subject: Email subject
            body: Email body
            is_html: Whether body is HTML
            attachments: List of attachment file paths
        """
        if not ADVANCED_FEATURES:
            print("Error: schedule library not installed. Install with: pip install schedule")
            return
        
        def send_scheduled():
            self.send_email(to_emails, subject, body, is_html, attachments)
        
        schedule.every().day.at(time_str).do(send_scheduled)
        print(f"Email scheduled for {time_str} daily")
    
    def schedule_recurring(self, interval: str, to_emails: List[str], subject: str,
                          body: str, is_html: bool = False):
        """
        Schedule recurring emails
        
        Args:
            interval: 'daily', 'weekly', 'hourly', or 'HH:MM' for specific time
            to_emails: List of recipient emails
            subject: Email subject
            body: Email body
            is_html: Whether body is HTML
        """
        if not ADVANCED_FEATURES:
            print("Error: schedule library not installed")
            return
        
        def send_recurring():
            self.send_email(to_emails, subject, body, is_html)
        
        if interval == 'daily':
            schedule.every().day.do(send_recurring)
        elif interval == 'weekly':
            schedule.every().week.do(send_recurring)
        elif interval == 'hourly':
            schedule.every().hour.do(send_recurring)
        else:
            schedule.every().day.at(interval).do(send_recurring)
        
        print(f"Recurring email scheduled: {interval}")
    
    def run_scheduler(self):
        """Run the email scheduler (blocks execution)"""
        if not ADVANCED_FEATURES:
            print("Error: schedule library not installed")
            return
        
        print("Email scheduler running. Press Ctrl+C to stop.")
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute


# Example usage
if __name__ == "__main__":
    if not ADVANCED_FEATURES:
        print("Installing required packages...")
        print("Run: pip install schedule pandas python-dotenv")
        exit(1)
    
    # Load from environment variables or provide directly
    email_automation = AdvancedEmailAutomation(provider='gmail', use_env=True)
    
    # Example: Send email from CSV
    # recipients.csv should have columns: email, name, company, etc.
    # results = email_automation.send_from_csv(
    #     csv_file='recipients.csv',
    #     subject_template='Hello {name}!',
    #     body_template='Dear {name},\n\nWelcome from {company}!\n\nBest regards',
    #     email_column='email'
    # )
    
    # Example: Schedule daily email
    # email_automation.schedule_email(
    #     time_str='09:00',
    #     to_emails=['recipient@example.com'],
    #     subject='Daily Report',
    #     body='This is your daily automated email.'
    # )
    # email_automation.run_scheduler()
    
    print("Advanced email automation ready!")
    print("Create a .env file with:")
    print("EMAIL=your_email@gmail.com")
    print("PASSWORD=your_app_password")
