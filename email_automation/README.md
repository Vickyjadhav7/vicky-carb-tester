# Email Automation Tool

A comprehensive Python email automation solution for sending single emails, bulk emails, and scheduled emails with template support.

## Features

- ✉️ **Single Email Sending** - Send individual emails with attachments
- 📬 **Bulk Email Sending** - Send personalized emails to multiple recipients from CSV
- 📝 **Email Templates** - Pre-built templates for welcome, notification, and newsletter emails
- ⏰ **Email Scheduling** - Schedule emails for specific times with repeat options
- 🔒 **Secure** - Uses TLS encryption for SMTP connections
- 🎨 **HTML Support** - Send beautiful HTML emails

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Credentials

Copy the example environment file and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your email credentials:

```env
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SENDER_NAME=Your Name
```

> **For Gmail users:** You need to generate an App Password:
> 1. Go to [Google Account Security](https://myaccount.google.com/security)
> 2. Enable 2-Factor Authentication
> 3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
> 4. Generate a new app password for "Mail"

### 3. Send Your First Email

```bash
python main.py send --to recipient@email.com --subject "Hello" --body "This is a test email"
```

## Usage

### Command Line Interface

#### Send a Single Email

```bash
# Basic email
python main.py send --to user@email.com --subject "Hello" --body "Message here"

# With template
python main.py send --to user@email.com --template welcome --name "John" --company "Acme Corp"

# With attachments
python main.py send --to user@email.com --subject "Report" --body "See attached" --attachments "report.pdf,data.xlsx"
```

#### Send Bulk Emails

Create a CSV file with recipient data:

```csv
email,name,company
john@example.com,John Smith,Acme Corp
jane@example.com,Jane Doe,Tech Inc
```

Send bulk emails:

```bash
python main.py bulk --file contacts.csv --subject "Hello {name}!" --body "Dear {name}, welcome to {company}!"
```

#### Schedule Emails

```bash
# Daily email at 9 AM
python main.py schedule --to user@email.com --subject "Daily Report" --body "..." --time 09:00 --repeat daily --run

# Weekly email on Monday
python main.py schedule --to user@email.com --subject "Weekly Summary" --body "..." --time 10:00 --repeat monday --run
```

#### Interactive Mode

```bash
python main.py interactive
```

#### Demo Mode

```bash
python main.py demo
```

### Python API

#### Send a Single Email

```python
from config import EmailConfig
from email_sender import EmailSender

config = EmailConfig.from_env()
sender = EmailSender(config)

sender.send_email(
    to_email="recipient@example.com",
    subject="Hello!",
    body="This is a test email.",
    html_body="<h1>Hello!</h1><p>This is a test email.</p>",
    attachments=["document.pdf"]
)
```

#### Send Bulk Emails

```python
recipients = [
    {"email": "user1@example.com", "name": "Alice", "role": "Developer"},
    {"email": "user2@example.com", "name": "Bob", "role": "Designer"},
]

results = sender.send_bulk_emails(
    recipients_data=recipients,
    subject="Hello {name}!",
    body_template="Dear {name}, welcome as our new {role}!",
    delay_seconds=1.0
)

print(f"Sent: {len(results['sent'])}, Failed: {len(results['failed'])}")
```

#### Use Templates

```python
from templates import EmailTemplates

# Welcome email
email = EmailTemplates.welcome_email(name="John", company="Acme Corp")

sender.send_email(
    to_email="john@example.com",
    subject=email['subject'],
    body=email['body'],
    html_body=email['html']
)

# Notification email
email = EmailTemplates.notification_email(
    name="John",
    title="New Feature Available",
    message="We've launched a new feature!",
    action_url="https://example.com/features"
)

# Newsletter
email = EmailTemplates.newsletter_email(
    name="John",
    newsletter_title="Weekly Digest",
    articles=[
        {"title": "Article 1", "summary": "Summary...", "url": "https://..."},
        {"title": "Article 2", "summary": "Summary...", "url": "https://..."},
    ]
)
```

#### Schedule Emails

```python
from scheduler import EmailScheduler

scheduler = EmailScheduler()

# Daily reminder at 9 AM
scheduler.schedule_reminder(
    to_email="user@example.com",
    reminder_message="Check your daily reports!",
    send_time="09:00",
    repeat="daily"
)

# Weekly email on Monday at 10 AM
scheduler.schedule_email(
    to_email="team@example.com",
    subject="Weekly Summary",
    body="Here's the weekly summary...",
    send_time="10:00",
    repeat="monday"
)

# Start the scheduler
scheduler.start(blocking=True)
```

## Supported SMTP Providers

| Provider | SMTP Server | Port |
|----------|------------|------|
| Gmail | smtp.gmail.com | 587 |
| Outlook | smtp-mail.outlook.com | 587 |
| Yahoo | smtp.mail.yahoo.com | 587 |
| Office 365 | smtp.office365.com | 587 |

## File Structure

```
email_automation/
├── main.py              # CLI entry point
├── config.py            # Configuration handling
├── email_sender.py      # Core email sending functionality
├── templates.py         # Email templates
├── scheduler.py         # Email scheduling
├── requirements.txt     # Python dependencies
├── .env.example         # Example environment file
├── contacts_example.csv # Example CSV for bulk emails
└── README.md           # This file
```

## Security Notes

- Never commit your `.env` file with real credentials
- Use App Passwords instead of your main password for Gmail
- Store credentials securely in production environments
- The tool uses TLS encryption for all SMTP connections

## License

MIT License - feel free to use and modify as needed.
