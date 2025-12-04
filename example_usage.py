"""
Example Usage Scripts for Email Automation

This file contains various examples of how to use the EmailAutomation class.
Uncomment the example you want to run and update the email addresses.
"""

from email_automation import EmailAutomation
from pathlib import Path


def example_1_simple_email():
    """Example 1: Send a simple text email"""
    print("=" * 60)
    print("EXAMPLE 1: Simple Text Email")
    print("=" * 60)
    
    email_bot = EmailAutomation()
    
    # Test connection first
    if not email_bot.test_connection():
        return
    
    result = email_bot.send_email(
        to_email="recipient@example.com",  # Change this!
        subject="Test Email from Python",
        body="Hello!\n\nThis is a simple test email sent using Python automation.\n\nBest regards,\nEmail Bot"
    )
    
    print(f"\nStatus: {result['status']}")
    print(f"Message: {result['message']}")
    print(f"Timestamp: {result['timestamp']}")


def example_2_html_email():
    """Example 2: Send an HTML formatted email"""
    print("\n" + "=" * 60)
    print("EXAMPLE 2: HTML Formatted Email")
    print("=" * 60)
    
    email_bot = EmailAutomation()
    
    html_body = """
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .header { background-color: #4CAF50; color: white; padding: 20px; }
                .content { padding: 20px; }
                .button { 
                    background-color: #008CBA; 
                    color: white; 
                    padding: 10px 20px; 
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Welcome to Email Automation!</h1>
            </div>
            <div class="content">
                <h2>This is an HTML Email</h2>
                <p>Here are some features:</p>
                <ul>
                    <li><strong>Beautiful formatting</strong></li>
                    <li><em>Support for styling</em></li>
                    <li>Images and links</li>
                </ul>
                <p>
                    <a href="https://github.com" class="button">Visit GitHub</a>
                </p>
            </div>
        </body>
    </html>
    """
    
    result = email_bot.send_email(
        to_email="recipient@example.com",  # Change this!
        subject="HTML Email Test 🎨",
        body=html_body,
        html=True
    )
    
    print(f"\nStatus: {result['status']}")
    print(f"Message: {result['message']}")


def example_3_email_with_attachments():
    """Example 3: Send email with file attachments"""
    print("\n" + "=" * 60)
    print("EXAMPLE 3: Email with Attachments")
    print("=" * 60)
    
    email_bot = EmailAutomation()
    
    # Create a sample text file to attach
    sample_file = "sample_document.txt"
    with open(sample_file, 'w') as f:
        f.write("This is a sample document.\n")
        f.write("It demonstrates file attachment functionality.\n")
    
    result = email_bot.send_email(
        to_email="recipient@example.com",  # Change this!
        subject="Email with Attachment",
        body="Please find the attached document.",
        attachments=[sample_file]
    )
    
    print(f"\nStatus: {result['status']}")
    print(f"Message: {result['message']}")
    
    # Clean up
    Path(sample_file).unlink(missing_ok=True)


def example_4_multiple_recipients():
    """Example 4: Send email to multiple recipients with CC and BCC"""
    print("\n" + "=" * 60)
    print("EXAMPLE 4: Multiple Recipients with CC/BCC")
    print("=" * 60)
    
    email_bot = EmailAutomation()
    
    result = email_bot.send_email(
        to_email=["recipient1@example.com", "recipient2@example.com"],  # Change these!
        subject="Team Update",
        body="Hello Team,\n\nThis is a group email sent to multiple recipients.\n\nBest regards",
        cc=["manager@example.com"],  # Change this!
        bcc=["admin@example.com"]    # Change this!
    )
    
    print(f"\nStatus: {result['status']}")
    print(f"Message: {result['message']}")


def example_5_bulk_personalized_emails():
    """Example 5: Send personalized emails to multiple people"""
    print("\n" + "=" * 60)
    print("EXAMPLE 5: Bulk Personalized Emails")
    print("=" * 60)
    
    email_bot = EmailAutomation()
    
    # List of recipients with personalization data
    recipients = [
        {
            "email": "john.doe@example.com",
            "name": "John",
            "company": "Acme Inc",
            "position": "Manager"
        },
        {
            "email": "jane.smith@example.com",
            "name": "Jane",
            "company": "Tech Corp",
            "position": "Developer"
        },
        {
            "email": "bob.johnson@example.com",
            "name": "Bob",
            "company": "StartupXYZ",
            "position": "CEO"
        }
    ]
    
    # Template with placeholders
    subject_template = "Hello {name}, Opportunity at {company}"
    
    body_template = """
    Dear {name},
    
    I hope this email finds you well. I'm reaching out regarding your position as {position} at {company}.
    
    We have an exciting opportunity that might interest you. Our email automation system can help 
    streamline your communication processes and save valuable time.
    
    Key benefits:
    - Automated personalized emails
    - HTML templates support
    - CSV integration for bulk sending
    - Detailed logging and tracking
    
    Would you be interested in learning more about how this can benefit {company}?
    
    Best regards,
    Email Automation Team
    
    P.S. This email was automatically personalized for you, {name}!
    """
    
    results = email_bot.send_bulk_emails(
        recipients=recipients,
        subject_template=subject_template,
        body_template=body_template,
        html=False
    )
    
    # Print summary
    success_count = sum(1 for r in results if r['status'] == 'success')
    print(f"\n✓ Successfully sent: {success_count}/{len(results)} emails")
    
    for result in results:
        status_icon = "✓" if result['status'] == 'success' else "✗"
        print(f"  {status_icon} {result['recipient']}: {result['message']}")


def example_6_csv_bulk_send():
    """Example 6: Send emails from CSV file with HTML template"""
    print("\n" + "=" * 60)
    print("EXAMPLE 6: Bulk Send from CSV with HTML Template")
    print("=" * 60)
    
    email_bot = EmailAutomation()
    
    # Check if files exist
    if not Path('recipients.csv').exists():
        print("Error: recipients.csv not found!")
        return
    
    if not Path('email_template.html').exists():
        print("Error: email_template.html not found!")
        return
    
    # Read HTML template
    with open('email_template.html', 'r', encoding='utf-8') as f:
        html_template = f.read()
    
    # Send to all recipients in CSV
    results = email_bot.send_from_csv(
        csv_file='recipients.csv',
        subject_template='Hello {name} from {company}!',
        body_template=html_template,
        html=True
    )
    
    # Print summary
    success_count = sum(1 for r in results if r['status'] == 'success')
    print(f"\n✓ Successfully sent: {success_count}/{len(results)} emails")
    
    for result in results:
        status_icon = "✓" if result['status'] == 'success' else "✗"
        print(f"  {status_icon} {result.get('recipient', 'unknown')}: {result['message']}")


def example_7_test_connection():
    """Example 7: Test SMTP connection"""
    print("\n" + "=" * 60)
    print("EXAMPLE 7: Test SMTP Connection")
    print("=" * 60)
    
    email_bot = EmailAutomation()
    
    print("\nTesting connection to SMTP server...")
    print(f"Server: {email_bot.smtp_server}")
    print(f"Port: {email_bot.smtp_port}")
    print(f"Email: {email_bot.email}")
    
    success = email_bot.test_connection()
    
    if success:
        print("\n✓ All systems ready! You can now send emails.")
    else:
        print("\n✗ Connection failed. Please check:")
        print("  1. Your .env file has correct credentials")
        print("  2. You're using an App Password (for Gmail)")
        print("  3. 2-Factor Authentication is enabled")
        print("  4. SMTP server and port are correct")


if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("EMAIL AUTOMATION - EXAMPLE USAGE")
    print("=" * 60)
    print("\nIMPORTANT: Update email addresses before running examples!")
    print("\nAvailable examples:")
    print("  1. Simple text email")
    print("  2. HTML formatted email")
    print("  3. Email with attachments")
    print("  4. Multiple recipients with CC/BCC")
    print("  5. Bulk personalized emails")
    print("  6. Bulk send from CSV with HTML template")
    print("  7. Test SMTP connection")
    print("\n" + "=" * 60)
    
    # UNCOMMENT THE EXAMPLE YOU WANT TO RUN:
    
    example_7_test_connection()  # Start with testing connection
    
    # example_1_simple_email()
    # example_2_html_email()
    # example_3_email_with_attachments()
    # example_4_multiple_recipients()
    # example_5_bulk_personalized_emails()
    # example_6_csv_bulk_send()
    
    print("\n" + "=" * 60)
    print("DONE!")
    print("=" * 60 + "\n")
