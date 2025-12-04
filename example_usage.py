#!/usr/bin/env python3
"""
Simple example demonstrating how to use the EmailAutomation class.
"""

from email_automation import EmailAutomation
import os

def example_simple_email():
    """Example: Send a simple plain text email."""
    print("=" * 50)
    print("Example 1: Simple Email")
    print("=" * 50)
    
    # Initialize (update with your credentials)
    email_bot = EmailAutomation(
        smtp_server=os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
        smtp_port=int(os.getenv('SMTP_PORT', '587')),
        sender_email=os.getenv('SENDER_EMAIL', 'your_email@gmail.com'),
        sender_password=os.getenv('SENDER_PASSWORD', 'your_password'),
        use_tls=True
    )
    
    # Send email
    email_bot.send_email(
        to_email='recipient@example.com',  # Change this
        subject='Hello from Python!',
        body='This is a simple test email sent using Python automation.'
    )


def example_html_email():
    """Example: Send an HTML formatted email."""
    print("\n" + "=" * 50)
    print("Example 2: HTML Email")
    print("=" * 50)
    
    email_bot = EmailAutomation(
        smtp_server=os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
        smtp_port=int(os.getenv('SMTP_PORT', '587')),
        sender_email=os.getenv('SENDER_EMAIL', 'your_email@gmail.com'),
        sender_password=os.getenv('SENDER_PASSWORD', 'your_password'),
        use_tls=True
    )
    
    html_body = """
    <html>
      <head></head>
      <body>
        <h2 style="color: #2c3e50;">Hello!</h2>
        <p>This is an <strong>HTML email</strong> sent using Python.</p>
        <p>You can include:</p>
        <ul>
          <li>Formatted text</li>
          <li>Links: <a href="https://www.python.org">Python.org</a></li>
          <li>Images</li>
          <li>Tables</li>
        </ul>
        <p style="color: #7f8c8d; font-size: 12px;">Best regards,<br>Email Automation Bot</p>
      </body>
    </html>
    """
    
    email_bot.send_email(
        to_email='recipient@example.com',  # Change this
        subject='HTML Email Example',
        body='This is the plain text version of the email.',
        html_body=html_body
    )


def example_bulk_emails():
    """Example: Send bulk personalized emails."""
    print("\n" + "=" * 50)
    print("Example 3: Bulk Emails")
    print("=" * 50)
    
    email_bot = EmailAutomation(
        smtp_server=os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
        smtp_port=int(os.getenv('SMTP_PORT', '587')),
        sender_email=os.getenv('SENDER_EMAIL', 'your_email@gmail.com'),
        sender_password=os.getenv('SENDER_PASSWORD', 'your_password'),
        use_tls=True
    )
    
    # List of recipients with personalized data
    recipients = [
        {
            'email': 'user1@example.com',  # Change these
            'name': 'John Doe',
            'company': 'Acme Corp'
        },
        {
            'email': 'user2@example.com',  # Change these
            'name': 'Jane Smith',
            'company': 'Tech Inc'
        }
    ]
    
    # Template strings with placeholders
    subject_template = "Welcome {name}!"
    body_template = """
Hello {name},

Thank you for joining us! We're excited to have {company} as part of our community.

Best regards,
The Team
    """
    
    results = email_bot.send_bulk_emails(
        recipients,
        subject_template=subject_template,
        body_template=body_template
    )
    
    print(f"\nBulk email results:")
    print(f"  ✓ Successfully sent: {results['success']}")
    print(f"  ✗ Failed: {results['failed']}")
    if results['failed_emails']:
        print(f"  Failed emails: {', '.join(results['failed_emails'])}")


if __name__ == '__main__':
    print("\n📧 Email Automation Examples")
    print("=" * 50)
    print("\n⚠️  IMPORTANT: Update email addresses and credentials before running!")
    print("   You can set them as environment variables or modify the code.\n")
    
    # Uncomment the example you want to run:
    
    # example_simple_email()
    # example_html_email()
    # example_bulk_emails()
    
    print("\n💡 Tip: Uncomment the example functions above to run them.")
    print("   Make sure to update email addresses and credentials first!")
