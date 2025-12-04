"""
Simple Example Usage of Email Automation
Update the credentials before running
"""

from email_automation import EmailAutomation
from datetime import datetime

# ============================================
# CONFIGURATION - UPDATE THESE VALUES
# ============================================
YOUR_EMAIL = 'your_email@gmail.com'
YOUR_PASSWORD = 'your_app_password'  # Gmail App Password
RECIPIENT_EMAIL = 'recipient@example.com'

# ============================================
# Example 1: Send Simple Text Email
# ============================================
def example_simple_email():
    print("Example 1: Sending simple text email...")
    
    email_automation = EmailAutomation(
        email=YOUR_EMAIL,
        password=YOUR_PASSWORD,
        provider='gmail'
    )
    
    success = email_automation.send_email(
        to_emails=[RECIPIENT_EMAIL],
        subject='Test Email from Python',
        body='Hello! This is a simple test email sent using Python automation.',
        is_html=False
    )
    
    if success:
        print("✓ Email sent successfully!\n")
    else:
        print("✗ Failed to send email.\n")

# ============================================
# Example 2: Send HTML Email
# ============================================
def example_html_email():
    print("Example 2: Sending HTML email...")
    
    email_automation = EmailAutomation(
        email=YOUR_EMAIL,
        password=YOUR_PASSWORD,
        provider='gmail'
    )
    
    html_body = f"""
    <html>
      <head>
        <style>
          body {{ font-family: Arial, sans-serif; }}
          .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
          .header {{ background-color: #4CAF50; color: white; padding: 20px; text-align: center; }}
          .content {{ padding: 20px; background-color: #f9f9f9; }}
          .footer {{ text-align: center; padding: 10px; color: #666; }}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hello from Python!</h1>
          </div>
          <div class="content">
            <p>This is an <strong>HTML email</strong> sent using Python automation.</p>
            <p>Current date and time: <em>{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em></p>
            <p>You can include:</p>
            <ul>
              <li>Formatted text</li>
              <li>Links and images</li>
              <li>Custom styling</li>
            </ul>
          </div>
          <div class="footer">
            <p>Sent via Python Email Automation</p>
          </div>
        </div>
      </body>
    </html>
    """
    
    success = email_automation.send_email(
        to_emails=[RECIPIENT_EMAIL],
        subject='HTML Email Example',
        body=html_body,
        is_html=True
    )
    
    if success:
        print("✓ HTML email sent successfully!\n")
    else:
        print("✗ Failed to send email.\n")

# ============================================
# Example 3: Send Email with CC and BCC
# ============================================
def example_email_with_cc_bcc():
    print("Example 3: Sending email with CC and BCC...")
    
    email_automation = EmailAutomation(
        email=YOUR_EMAIL,
        password=YOUR_PASSWORD,
        provider='gmail'
    )
    
    success = email_automation.send_email(
        to_emails=[RECIPIENT_EMAIL],
        subject='Email with CC and BCC',
        body='This email demonstrates CC and BCC functionality.',
        cc_emails=['cc_recipient@example.com'],
        bcc_emails=['bcc_recipient@example.com']
    )
    
    if success:
        print("✓ Email with CC/BCC sent successfully!\n")
    else:
        print("✗ Failed to send email.\n")

# ============================================
# Example 4: Bulk Personalized Emails
# ============================================
def example_bulk_emails():
    print("Example 4: Sending bulk personalized emails...")
    
    email_automation = EmailAutomation(
        email=YOUR_EMAIL,
        password=YOUR_PASSWORD,
        provider='gmail'
    )
    
    # List of recipients with personalization data
    recipients = [
        {'email': 'user1@example.com', 'name': 'John Doe', 'company': 'ABC Corporation'},
        {'email': 'user2@example.com', 'name': 'Jane Smith', 'company': 'XYZ Industries'},
        {'email': 'user3@example.com', 'name': 'Bob Johnson', 'company': 'Tech Solutions Inc'},
    ]
    
    subject_template = "Welcome {name}! - {company}"
    body_template = """
    Dear {name},
    
    Welcome to our service! We're excited to have {company} on board.
    
    This is a personalized email sent using Python automation.
    
    Best regards,
    Email Automation Team
    """
    
    results = email_automation.send_bulk_emails(
        recipients=recipients,
        subject_template=subject_template,
        body_template=body_template,
        is_html=False
    )
    
    print(f"\nBulk email results:")
    print(f"  Successfully sent: {len(results['success'])}")
    print(f"  Failed: {len(results['failed'])}\n")

# ============================================
# Example 5: Using Different Email Providers
# ============================================
def example_different_providers():
    print("Example 5: Using different email providers...")
    
    # Gmail
    gmail = EmailAutomation(
        email='your_email@gmail.com',
        password='your_app_password',
        provider='gmail'
    )
    print("✓ Gmail configuration ready")
    
    # Outlook
    outlook = EmailAutomation(
        email='your_email@outlook.com',
        password='your_password',
        provider='outlook'
    )
    print("✓ Outlook configuration ready")
    
    # Custom SMTP
    custom = EmailAutomation(
        email='your_email@customdomain.com',
        password='your_password',
        provider='custom',
        smtp_server='smtp.customdomain.com',
        smtp_port=587
    )
    print("✓ Custom SMTP configuration ready\n")

# ============================================
# Main Execution
# ============================================
if __name__ == "__main__":
    print("=" * 60)
    print("Email Automation Examples")
    print("=" * 60)
    print("\n⚠️  IMPORTANT: Update credentials in this file before running!\n")
    
    # Uncomment the examples you want to run:
    
    # example_simple_email()
    # example_html_email()
    # example_email_with_cc_bcc()
    # example_bulk_emails()
    # example_different_providers()
    
    print("\nTo run examples:")
    print("1. Update YOUR_EMAIL, YOUR_PASSWORD, and RECIPIENT_EMAIL at the top")
    print("2. Uncomment the example functions you want to run")
    print("3. Run: python example_usage.py")
    print("\nFor Gmail, use App Password: https://support.google.com/accounts/answer/185833")
