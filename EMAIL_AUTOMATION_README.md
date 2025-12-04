# Email Automation with Python

A comprehensive Python solution for automating email sending with support for multiple email providers, attachments, HTML emails, bulk sending, and scheduling.

## Features

- ✅ Support for Gmail, Outlook, Yahoo, and custom SMTP servers
- ✅ Send plain text and HTML emails
- ✅ Attach files to emails
- ✅ Bulk email sending with personalization
- ✅ CC and BCC support
- ✅ Error handling and logging
- ✅ Advanced features: CSV import, scheduling (optional)

## Quick Start

### Basic Usage

1. **Install Python** (3.6+ required)

2. **Basic Email Script** (`email_automation.py`):
   ```python
   from email_automation import EmailAutomation
   
   # Initialize
   email_automation = EmailAutomation(
       email='your_email@gmail.com',
       password='your_app_password',  # Use App Password for Gmail
       provider='gmail'
   )
   
   # Send email
   email_automation.send_email(
       to_emails=['recipient@example.com'],
       subject='Hello from Python!',
       body='This is a test email.',
       is_html=False
   )
   ```

### Gmail Setup

For Gmail, you need to use an **App Password** instead of your regular password:

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Generate an app password for "Mail"
5. Use this 16-character password in the script

### Supported Providers

- **Gmail**: `provider='gmail'`
- **Outlook/Hotmail**: `provider='outlook'`
- **Yahoo**: `provider='yahoo'`
- **Custom SMTP**: `provider='custom'` (provide `smtp_server` and `smtp_port`)

## Examples

### Example 1: Simple Text Email

```python
from email_automation import EmailAutomation

email_automation = EmailAutomation(
    email='your_email@gmail.com',
    password='your_app_password',
    provider='gmail'
)

email_automation.send_email(
    to_emails=['recipient@example.com'],
    subject='Test Email',
    body='Hello! This is a test email.',
    is_html=False
)
```

### Example 2: HTML Email with Attachment

```python
html_body = """
<html>
  <body>
    <h2>Hello!</h2>
    <p>This is an <b>HTML email</b>.</p>
  </body>
</html>
"""

email_automation.send_email(
    to_emails=['recipient@example.com'],
    subject='HTML Email',
    body=html_body,
    is_html=True,
    attachments=['/path/to/file.pdf']
)
```

### Example 3: Bulk Personalized Emails

```python
recipients = [
    {'email': 'user1@example.com', 'name': 'John', 'company': 'ABC Corp'},
    {'email': 'user2@example.com', 'name': 'Jane', 'company': 'XYZ Inc'},
]

subject_template = "Hello {name}! Welcome"
body_template = "Dear {name},\n\nThank you for joining {company}!"

results = email_automation.send_bulk_emails(
    recipients=recipients,
    subject_template=subject_template,
    body_template=body_template,
    is_html=False
)
```

### Example 4: Email with CC and BCC

```python
email_automation.send_email(
    to_emails=['primary@example.com'],
    subject='Email with CC/BCC',
    body='This email has CC and BCC recipients.',
    cc_emails=['cc@example.com'],
    bcc_emails=['bcc@example.com']
)
```

## Advanced Features

### CSV Import (Requires pandas)

```python
from advanced_email_automation import AdvancedEmailAutomation

email_automation = AdvancedEmailAutomation(provider='gmail', use_env=True)

# recipients.csv format:
# email,name,company
# user1@example.com,John,ABC Corp
# user2@example.com,Jane,XYZ Inc

results = email_automation.send_from_csv(
    csv_file='recipients.csv',
    subject_template='Hello {name}!',
    body_template='Dear {name} from {company}, welcome!',
    email_column='email'
)
```

### Scheduled Emails (Requires schedule)

```python
# Schedule daily email at 9:00 AM
email_automation.schedule_email(
    time_str='09:00',
    to_emails=['recipient@example.com'],
    subject='Daily Report',
    body='Your daily automated email.'
)

# Run scheduler (blocks execution)
email_automation.run_scheduler()
```

### Environment Variables

Create a `.env` file:

```
EMAIL=your_email@gmail.com
PASSWORD=your_app_password
PROVIDER=gmail
```

Then use:
```python
email_automation = AdvancedEmailAutomation(provider='gmail', use_env=True)
```

## Installation

### Basic (No external dependencies)

The basic `email_automation.py` uses only Python standard library - no installation needed!

### Advanced Features

```bash
pip install schedule pandas python-dotenv
```

Or install from requirements:
```bash
pip install -r requirements.txt
```

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use App Passwords** for Gmail (not your regular password)
3. **Use environment variables** or `.env` files for credentials
4. **Add `.env` to `.gitignore`**
5. **Use secure connections** (TLS/SSL) - already implemented

## Error Handling

The script includes comprehensive error handling for:
- Authentication failures
- Invalid recipient addresses
- Server connection issues
- File attachment errors
- Network problems

## Troubleshooting

### Gmail Authentication Error
- Make sure you're using an App Password, not your regular password
- Enable 2-Step Verification first
- Check that "Less secure app access" is enabled (if not using App Password)

### Connection Timeout
- Check your internet connection
- Verify firewall settings
- Try different SMTP port (587 or 465)

### Attachment Not Found
- Verify file paths are correct
- Check file permissions
- Ensure files exist before sending

## License

This code is provided as-is for educational and automation purposes.

## Support

For issues or questions:
1. Check the error messages in the console
2. Verify your email provider settings
3. Ensure credentials are correct
4. Check network connectivity
