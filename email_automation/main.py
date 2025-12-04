#!/usr/bin/env python3
"""
Email Automation - Main Script
A comprehensive email automation tool for sending single, bulk, and scheduled emails.

Usage:
    python main.py --help
    python main.py send --to recipient@email.com --subject "Hello" --body "Message here"
    python main.py bulk --file contacts.csv --subject "Hello {name}" --template welcome
    python main.py schedule --to recipient@email.com --time 09:00 --repeat daily
"""

import argparse
import sys
import csv
from pathlib import Path

from config import EmailConfig
from email_sender import EmailSender
from templates import EmailTemplates
from scheduler import EmailScheduler


def send_single_email(args):
    """Send a single email."""
    config = EmailConfig.from_env()
    sender = EmailSender(config)
    
    # Check if using a template
    html_body = None
    if args.template:
        template_func = getattr(EmailTemplates, f"{args.template}_email", None)
        if template_func:
            template_data = template_func(
                name=args.name or "User",
                company=args.company or "Our Company"
            )
            if not args.subject:
                args.subject = template_data['subject']
            if not args.body:
                args.body = template_data['body']
            html_body = template_data.get('html')
    
    # Parse attachments
    attachments = args.attachments.split(',') if args.attachments else None
    
    success = sender.send_email(
        to_email=args.to,
        subject=args.subject,
        body=args.body,
        html_body=html_body,
        attachments=attachments
    )
    
    if success:
        print(f"✓ Email sent successfully to {args.to}")
    else:
        print(f"✗ Failed to send email to {args.to}")
        sys.exit(1)


def send_bulk_emails(args):
    """Send bulk emails from a CSV file."""
    config = EmailConfig.from_env()
    sender = EmailSender(config)
    
    # Read CSV file
    csv_path = Path(args.file)
    if not csv_path.exists():
        print(f"Error: File not found: {args.file}")
        sys.exit(1)
    
    recipients = []
    with open(csv_path, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        recipients = list(reader)
    
    if not recipients:
        print("Error: No recipients found in CSV file")
        sys.exit(1)
    
    print(f"Found {len(recipients)} recipients")
    
    # Get template if specified
    html_template = None
    if args.template:
        # Use a generic template approach for bulk
        html_template = """
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Hello {name},</h2>
            <p>{message}</p>
        </body>
        </html>
        """
    
    results = sender.send_bulk_emails(
        recipients_data=recipients,
        subject=args.subject,
        body_template=args.body,
        html_template=html_template,
        delay_seconds=args.delay
    )
    
    print(f"\n{'='*50}")
    print(f"Bulk Send Results:")
    print(f"  ✓ Sent: {len(results['sent'])}")
    print(f"  ✗ Failed: {len(results['failed'])}")
    print(f"  Total: {results['total']}")
    
    if results['failed']:
        print(f"\nFailed recipients:")
        for fail in results['failed']:
            print(f"  - {fail.get('email', 'Unknown')}: {fail.get('error', 'Unknown error')}")


def schedule_email(args):
    """Schedule an email."""
    scheduler = EmailScheduler()
    
    scheduler.schedule_email(
        to_email=args.to,
        subject=args.subject,
        body=args.body,
        send_time=args.time,
        repeat=args.repeat
    )
    
    print(f"✓ Email scheduled for {args.time}")
    if args.repeat:
        print(f"  Repeating: {args.repeat}")
    
    if args.run:
        print("\nScheduler running. Press Ctrl+C to stop.")
        try:
            scheduler.start(blocking=True)
        except KeyboardInterrupt:
            scheduler.stop()
            print("\nScheduler stopped.")


def interactive_mode():
    """Run in interactive mode."""
    print("\n" + "="*50)
    print("  Email Automation - Interactive Mode")
    print("="*50 + "\n")
    
    config = EmailConfig.from_env()
    sender = EmailSender(config)
    
    print("Enter email details (or 'quit' to exit):\n")
    
    while True:
        to_email = input("To: ").strip()
        if to_email.lower() == 'quit':
            break
            
        subject = input("Subject: ").strip()
        print("Body (enter empty line to finish):")
        
        body_lines = []
        while True:
            line = input()
            if line == "":
                break
            body_lines.append(line)
        body = "\n".join(body_lines)
        
        if to_email and subject and body:
            success = sender.send_email(
                to_email=to_email,
                subject=subject,
                body=body
            )
            if success:
                print(f"\n✓ Email sent to {to_email}\n")
            else:
                print(f"\n✗ Failed to send email\n")
        else:
            print("\n✗ Please provide all required fields\n")


def demo_mode():
    """Show a demonstration of the email automation capabilities."""
    print("\n" + "="*60)
    print("  Email Automation - Demo Mode")
    print("="*60)
    
    print("\n1. CONFIGURATION")
    print("-" * 40)
    print("""
Create a .env file with your email credentials:

    SMTP_SERVER=smtp.gmail.com
    SMTP_PORT=587
    EMAIL_ADDRESS=your-email@gmail.com
    EMAIL_PASSWORD=your-app-password
    SENDER_NAME=Your Name
    """)
    
    print("\n2. SEND A SINGLE EMAIL")
    print("-" * 40)
    print("""
    from config import EmailConfig
    from email_sender import EmailSender
    
    config = EmailConfig.from_env()
    sender = EmailSender(config)
    
    sender.send_email(
        to_email="recipient@example.com",
        subject="Hello!",
        body="This is a test email."
    )
    """)
    
    print("\n3. SEND BULK EMAILS")
    print("-" * 40)
    print("""
    recipients = [
        {"email": "user1@example.com", "name": "Alice"},
        {"email": "user2@example.com", "name": "Bob"},
    ]
    
    sender.send_bulk_emails(
        recipients_data=recipients,
        subject="Hello {name}!",
        body_template="Dear {name}, welcome aboard!"
    )
    """)
    
    print("\n4. USE EMAIL TEMPLATES")
    print("-" * 40)
    print("""
    from templates import EmailTemplates
    
    # Welcome email
    email = EmailTemplates.welcome_email(
        name="John",
        company="Acme Corp"
    )
    
    sender.send_email(
        to_email="john@example.com",
        subject=email['subject'],
        body=email['body'],
        html_body=email['html']
    )
    """)
    
    print("\n5. SCHEDULE EMAILS")
    print("-" * 40)
    print("""
    from scheduler import EmailScheduler
    
    scheduler = EmailScheduler()
    
    # Daily reminder at 9 AM
    scheduler.schedule_reminder(
        to_email="user@example.com",
        reminder_message="Check your reports!",
        send_time="09:00",
        repeat="daily"
    )
    
    scheduler.start()
    """)
    
    print("\n" + "="*60)
    print("  Run 'python main.py --help' for command-line options")
    print("="*60 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description='Email Automation Tool',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  Send a single email:
    python main.py send --to user@email.com --subject "Hello" --body "Message"
    
  Send with template:
    python main.py send --to user@email.com --template welcome --name "John"
    
  Send bulk emails:
    python main.py bulk --file contacts.csv --subject "Hello {name}" --body "Dear {name}..."
    
  Schedule an email:
    python main.py schedule --to user@email.com --time 09:00 --subject "Reminder" --body "..." --repeat daily
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Send command
    send_parser = subparsers.add_parser('send', help='Send a single email')
    send_parser.add_argument('--to', required=True, help='Recipient email address')
    send_parser.add_argument('--subject', help='Email subject')
    send_parser.add_argument('--body', help='Email body')
    send_parser.add_argument('--template', choices=['welcome', 'notification', 'newsletter'],
                             help='Use a pre-built template')
    send_parser.add_argument('--name', help='Recipient name (for templates)')
    send_parser.add_argument('--company', help='Company name (for templates)')
    send_parser.add_argument('--attachments', help='Comma-separated list of file paths')
    
    # Bulk command
    bulk_parser = subparsers.add_parser('bulk', help='Send bulk emails from CSV')
    bulk_parser.add_argument('--file', required=True, help='CSV file with recipients')
    bulk_parser.add_argument('--subject', required=True, help='Email subject (can include {placeholders})')
    bulk_parser.add_argument('--body', required=True, help='Email body (can include {placeholders})')
    bulk_parser.add_argument('--template', help='Use HTML template')
    bulk_parser.add_argument('--delay', type=float, default=1.0, help='Delay between emails in seconds')
    
    # Schedule command
    schedule_parser = subparsers.add_parser('schedule', help='Schedule an email')
    schedule_parser.add_argument('--to', required=True, help='Recipient email address')
    schedule_parser.add_argument('--subject', required=True, help='Email subject')
    schedule_parser.add_argument('--body', required=True, help='Email body')
    schedule_parser.add_argument('--time', required=True, help='Time to send (HH:MM format)')
    schedule_parser.add_argument('--repeat', choices=['daily', 'weekly', 'hourly', 
                                                       'monday', 'tuesday', 'wednesday',
                                                       'thursday', 'friday', 'saturday', 'sunday'],
                                 help='Repeat pattern')
    schedule_parser.add_argument('--run', action='store_true', help='Start scheduler immediately')
    
    # Interactive command
    subparsers.add_parser('interactive', help='Run in interactive mode')
    
    # Demo command
    subparsers.add_parser('demo', help='Show demo and usage examples')
    
    args = parser.parse_args()
    
    if args.command == 'send':
        if not args.subject and not args.template:
            print("Error: --subject is required (unless using --template)")
            sys.exit(1)
        if not args.body and not args.template:
            print("Error: --body is required (unless using --template)")
            sys.exit(1)
        send_single_email(args)
    elif args.command == 'bulk':
        send_bulk_emails(args)
    elif args.command == 'schedule':
        schedule_email(args)
    elif args.command == 'interactive':
        interactive_mode()
    elif args.command == 'demo':
        demo_mode()
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
