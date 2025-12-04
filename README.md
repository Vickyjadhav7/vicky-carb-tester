# Python Email Automation

A comprehensive Python-based email automation system that supports sending single emails, bulk emails, HTML templates, attachments, and more.

## Features

- ✉️ **Single Email Sending** - Send individual emails with ease
- 📧 **Bulk Email Sending** - Send personalized emails to multiple recipients
- 🎨 **HTML Email Support** - Create beautiful HTML-formatted emails
- 📎 **File Attachments** - Attach documents, images, and other files
- 📊 **CSV Integration** - Import recipients from CSV files
- 🔒 **Secure Authentication** - Uses environment variables for credentials
- 📝 **Email Logging** - Track sending status with JSON logs
- 🔄 **Template Variables** - Personalize emails with dynamic content

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up your email credentials:
```bash
cp .env.example .env
```

4. Edit `.env` file with your email credentials:
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
SENDER_NAME=Your Name
```

## Gmail Setup (Recommended)

For Gmail users, you need to use an **App Password** instead of your regular password:

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new App Password for "Mail"
4. Use this 16-character password in your `.env` file

## Quick Start

### Example 1: Send a Simple Email

```python
from email_automation import EmailAutomation

# Initialize
email_bot = EmailAutomation()

# Send email
result = email_bot.send_email(
    to_email="recipient@example.com",
    subject="Hello from Python!",
    body="This is an automated email."
)

print(result)
```

### Example 2: Send HTML Email with Attachment

```python
html_content = """
<html>
    <body>
        <h1>Hello!</h1>
        <p>This is an <strong>HTML email</strong>.</p>
    </body>
</html>
"""

result = email_bot.send_email(
    to_email="recipient@example.com",
    subject="HTML Email Test",
    body=html_content,
    html=True,
    attachments=["document.pdf", "image.png"]
)
```

### Example 3: Send Bulk Personalized Emails

```python
recipients = [
    {"email": "john@example.com", "name": "John", "company": "Acme Inc"},
    {"email": "jane@example.com", "name": "Jane", "company": "Tech Corp"}
]

results = email_bot.send_bulk_emails(
    recipients=recipients,
    subject_template="Hello {name}!",
    body_template="Dear {name},\n\nGreetings from {company}!\n\nBest regards",
    html=False
)
```

### Example 4: Send Emails from CSV File

Create a CSV file (`recipients.csv`):
```csv
email,name,company,position
john@example.com,John Doe,Acme Inc,Manager
jane@example.com,Jane Smith,Tech Corp,Developer
```

Send emails:
```python
# Read template
with open('email_template.html', 'r') as f:
    html_template = f.read()

# Send to all recipients in CSV
results = email_bot.send_from_csv(
    csv_file='recipients.csv',
    subject_template='Hello {name} from {company}!',
    body_template=html_template,
    html=True
)
```

## Email Class Methods

### `__init__(smtp_server, smtp_port, email, password, use_tls)`
Initialize the EmailAutomation class with SMTP configuration.

### `send_email(to_email, subject, body, cc, bcc, attachments, html, reply_to)`
Send a single email with optional attachments and HTML content.

### `send_bulk_emails(recipients, subject_template, body_template, html, attachments, log_file)`
Send personalized emails to multiple recipients with template variables.

### `send_from_csv(csv_file, subject_template, body_template, html, attachments)`
Read recipients from a CSV file and send personalized emails.

### `test_connection()`
Test the SMTP connection and credentials.

## SMTP Server Configuration

### Gmail
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

### Outlook/Hotmail
```
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo
```
SMTP_SERVER=smtp.mail.yahoo.com
SMTP_PORT=587
```

### Office 365
```
SMTP_SERVER=smtp.office365.com
SMTP_PORT=587
```

## File Structure

```
.
├── email_automation.py      # Main email automation script
├── requirements.txt         # Python dependencies
├── .env.example            # Example environment configuration
├── .env                    # Your actual credentials (not in git)
├── email_template.html     # Example HTML email template
├── recipients.csv          # Example recipients CSV file
└── README.md              # This file
```

## Email Logs

Email sending results are automatically logged to JSON files:
- Default: `email_log.json`
- CSV bulk sends: `email_log_YYYYMMDD_HHMMSS.json`

Example log entry:
```json
{
  "status": "success",
  "message": "Email sent successfully to john@example.com",
  "recipient": "john@example.com",
  "timestamp": "2025-12-04T10:30:00"
}
```

## Security Best Practices

1. **Never commit `.env` file** - Keep credentials secure
2. **Use App Passwords** - Don't use your main email password
3. **Enable 2FA** - Add extra security to your email account
4. **Limit permissions** - Only grant necessary access
5. **Rotate passwords** - Change App Passwords periodically

## Troubleshooting

### Authentication Error
- For Gmail: Make sure you're using an App Password, not your regular password
- Check that 2-Factor Authentication is enabled
- Verify SMTP server and port settings

### Connection Timeout
- Check your firewall settings
- Verify SMTP server address
- Try port 465 with SSL instead of 587 with TLS

### Emails Going to Spam
- Avoid spam trigger words
- Include a proper sender name
- Don't send too many emails at once
- Add a valid Reply-To address

## Running the Examples

Test the script with built-in examples:
```bash
python email_automation.py
```

This will:
1. Test SMTP connection
2. Run example email sends (commented out to prevent accidental sends)

## License

MIT License - Feel free to use this in your projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.