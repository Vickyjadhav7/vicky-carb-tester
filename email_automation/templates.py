"""
Email Templates Module
Pre-built email templates for common use cases.
"""

from jinja2 import Template
from typing import Dict, Any


class EmailTemplates:
    """Collection of email templates."""

    @staticmethod
    def welcome_email(name: str, company: str = "Our Company") -> Dict[str, str]:
        """
        Generate a welcome email.
        
        Args:
            name: Recipient's name
            company: Company name
            
        Returns:
            Dict with 'subject', 'body', and 'html' keys
        """
        subject = f"Welcome to {company}!"
        
        body = f"""
Hello {name},

Welcome to {company}! We're thrilled to have you join us.

Here's what you can do next:
- Complete your profile
- Explore our features
- Connect with our community

If you have any questions, feel free to reach out to our support team.

Best regards,
The {company} Team
        """.strip()

        html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(to right, #141E30, #243B55); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
        .content {{ background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }}
        .button {{ display: inline-block; background: #61dafb; color: #141E30; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }}
        ul {{ padding-left: 20px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to {company}!</h1>
        </div>
        <div class="content">
            <p>Hello <strong>{name}</strong>,</p>
            <p>We're thrilled to have you join us!</p>
            <p>Here's what you can do next:</p>
            <ul>
                <li>Complete your profile</li>
                <li>Explore our features</li>
                <li>Connect with our community</li>
            </ul>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The {company} Team</p>
        </div>
    </div>
</body>
</html>
        """.strip()

        return {'subject': subject, 'body': body, 'html': html}

    @staticmethod
    def notification_email(
        name: str,
        title: str,
        message: str,
        action_url: str = None,
        action_text: str = "View Details"
    ) -> Dict[str, str]:
        """
        Generate a notification email.
        
        Args:
            name: Recipient's name
            title: Notification title
            message: Notification message
            action_url: Optional URL for action button
            action_text: Text for the action button
            
        Returns:
            Dict with 'subject', 'body', and 'html' keys
        """
        subject = title
        
        body = f"""
Hello {name},

{message}

{f"Click here for more details: {action_url}" if action_url else ""}

Best regards,
Notification System
        """.strip()

        action_button = f'<a href="{action_url}" class="button">{action_text}</a>' if action_url else ''

        html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #4a90d9; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
        .content {{ background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }}
        .button {{ display: inline-block; background: #4a90d9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{title}</h1>
        </div>
        <div class="content">
            <p>Hello <strong>{name}</strong>,</p>
            <p>{message}</p>
            {action_button}
            <p>Best regards,<br>Notification System</p>
        </div>
    </div>
</body>
</html>
        """.strip()

        return {'subject': subject, 'body': body, 'html': html}

    @staticmethod
    def newsletter_email(
        name: str,
        newsletter_title: str,
        articles: list,
        unsubscribe_url: str = "#"
    ) -> Dict[str, str]:
        """
        Generate a newsletter email.
        
        Args:
            name: Recipient's name
            newsletter_title: Title of the newsletter
            articles: List of dicts with 'title', 'summary', and 'url' keys
            unsubscribe_url: URL for unsubscribing
            
        Returns:
            Dict with 'subject', 'body', and 'html' keys
        """
        subject = newsletter_title
        
        articles_text = "\n".join([
            f"- {article['title']}\n  {article['summary']}\n  Read more: {article['url']}"
            for article in articles
        ])
        
        body = f"""
Hello {name},

{newsletter_title}

{articles_text}

---
To unsubscribe, visit: {unsubscribe_url}
        """.strip()

        articles_html = "\n".join([
            f"""
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <h3 style="color: #333; margin-bottom: 10px;">{article['title']}</h3>
                <p style="color: #666;">{article['summary']}</p>
                <a href="{article['url']}" style="color: #4a90d9;">Read more →</a>
            </div>
            """
            for article in articles
        ])

        html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }}
        .content {{ background: #ffffff; padding: 20px; border: 1px solid #eee; }}
        .footer {{ background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888; border-radius: 0 0 5px 5px; }}
        .footer a {{ color: #4a90d9; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{newsletter_title}</h1>
        </div>
        <div class="content">
            <p>Hello <strong>{name}</strong>,</p>
            <p>Here's what's new:</p>
            {articles_html}
        </div>
        <div class="footer">
            <p>You're receiving this because you subscribed to our newsletter.</p>
            <p><a href="{unsubscribe_url}">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>
        """.strip()

        return {'subject': subject, 'body': body, 'html': html}

    @staticmethod
    def custom_template(template_str: str, variables: Dict[str, Any]) -> str:
        """
        Render a custom Jinja2 template with variables.
        
        Args:
            template_str: Jinja2 template string
            variables: Dictionary of variables to use in the template
            
        Returns:
            Rendered template string
        """
        template = Template(template_str)
        return template.render(**variables)
