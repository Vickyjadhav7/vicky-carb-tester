# Email Automation with Python

A comprehensive Python script for automating email sending with support for single emails, bulk emails, HTML content, attachments, and more.

## Features

- ✅ Send single emails
- ✅ Send bulk emails to multiple recipients
- ✅ HTML and plain text email support
- ✅ Email attachments
- ✅ CC and BCC support
- ✅ Email templates with variable substitution
- ✅ Error handling and logging

## Requirements

- Python 3.6 or higher
- SMTP server credentials (Gmail, Outlook, or any SMTP server)

## Setup

### 1. Install Python Dependencies

All required libraries are included in Python's standard library, so no additional installation is needed. However, if you want to use environment variables from a `.env` file:

```bash
pip install python-dotenv
```

### 2. Configure Email Credentials

#### Option A: Environment Variables (Recommended)

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your credentials:
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password
```

#### Option B: JSON Configuration File

1. Copy `email_config.json.example` to `email_config.json`:
```bash
cp email_config.json.example email_config.json
```

2. Edit `email_config.json` with your credentials.

#### Option C: Direct Code Modification

Edit the `main()` function in `email_automation.py` and set your credentials directly.

### 3. Gmail Setup (if using Gmail)

If you're using Gmail, you'll need to:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this app password (not your regular password) in the configuration

## Usage

### Basic Usage

```python
from email_automation import EmailAutomation

# Initialize
email_bot = EmailAutomation(
    smtp_server='smtp.gmail.com',
    smtp_port=587,
    sender_email='your_email@gmail.com',
    sender_password='your_app_password',
    use_tls=True
)

# Send a simple email
email_bot.send_email(
    to_email='recipient@example.com',
    subject='Hello!',
    body='This is a test email.'
)
```

### Send HTML Email

```python
html_content = """
<html>
  <body>
    <h2>Hello!</h2>
    <p>This is an <b>HTML email</b>.</p>
  </body>
</html>
"""

email_bot.send_email(
    to_email='recipient@example.com',
    subject='HTML Email',
    body='Plain text version',
    html_body=html_content
)
```

### Send Email with Attachments

```python
email_bot.send_email(
    to_email='recipient@example.com',
    subject='Email with Attachment',
    body='Please find the attached file.',
    attachments=['/path/to/file.pdf', '/path/to/image.jpg']
)
```

### Send Email with CC and BCC

```python
email_bot.send_email(
    to_email='recipient@example.com',
    subject='Email with CC/BCC',
    body='This email has CC and BCC recipients.',
    cc=['cc1@example.com', 'cc2@example.com'],
    bcc=['bcc@example.com']
)
```

### Send Bulk Emails

```python
recipients = [
    {
        'email': 'user1@example.com',
        'subject': 'Hello User1',
        'body': 'Personalized message for User1',
        'name': 'User1'
    },
    {
        'email': 'user2@example.com',
        'subject': 'Hello User2',
        'body': 'Personalized message for User2',
        'name': 'User2'
    }
]

results = email_bot.send_bulk_emails(recipients)
print(f"Success: {results['success']}, Failed: {results['failed']}")
```

### Using Templates

```python
subject_template = "Hello {name}!"
body_template = "Dear {name},\n\nThis is a personalized email for {email}."

recipients = [
    {'email': 'john@example.com', 'name': 'John'},
    {'email': 'jane@example.com', 'name': 'Jane'}
]

email_bot.send_bulk_emails(
    recipients,
    subject_template=subject_template,
    body_template=body_template
)
```

## Running the Script

Run the example script:

```bash
python email_automation.py
```

**Note:** Make sure to update the email addresses and credentials in the `main()` function before running.

## SMTP Server Settings

### Gmail
- SMTP Server: `smtp.gmail.com`
- Port: `587` (TLS) or `465` (SSL)
- Requires App Password

### Outlook/Hotmail
- SMTP Server: `smtp-mail.outlook.com`
- Port: `587` (TLS)

### Yahoo Mail
- SMTP Server: `smtp.mail.yahoo.com`
- Port: `587` (TLS) or `465` (SSL)

### Custom SMTP Server
Use your organization's SMTP server settings.

## Security Best Practices

1. **Never commit credentials to version control**
   - Use `.env` file and add it to `.gitignore`
   - Use environment variables in production

2. **Use App Passwords**
   - For Gmail, use App Passwords instead of your main password

3. **Keep credentials secure**
   - Store credentials in environment variables or secure vaults
   - Rotate passwords regularly

## Troubleshooting

### Common Issues

1. **Authentication Error**
   - Verify your email and password are correct
   - For Gmail, ensure you're using an App Password
   - Check if 2FA is enabled (required for App Passwords)

2. **Connection Error**
   - Verify SMTP server and port are correct
   - Check firewall settings
   - Ensure TLS/SSL settings match your server

3. **Email Not Received**
   - Check spam/junk folder
   - Verify recipient email address is correct
   - Check SMTP server logs for errors

## License

This project is open source and available for use.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.
