"""
Email Automation Configuration Module
Handles loading and managing configuration settings.
"""

import os
from dotenv import load_dotenv
from dataclasses import dataclass
from typing import Optional

# Load environment variables from .env file
load_dotenv()


@dataclass
class EmailConfig:
    """Configuration class for email settings."""
    smtp_server: str
    smtp_port: int
    email_address: str
    email_password: str
    sender_name: str
    use_tls: bool = True

    @classmethod
    def from_env(cls) -> 'EmailConfig':
        """Create configuration from environment variables."""
        return cls(
            smtp_server=os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
            smtp_port=int(os.getenv('SMTP_PORT', '587')),
            email_address=os.getenv('EMAIL_ADDRESS', ''),
            email_password=os.getenv('EMAIL_PASSWORD', ''),
            sender_name=os.getenv('SENDER_NAME', 'Email Automation'),
            use_tls=os.getenv('USE_TLS', 'true').lower() == 'true'
        )

    def validate(self) -> bool:
        """Validate that all required configuration is present."""
        if not self.email_address:
            raise ValueError("EMAIL_ADDRESS is required")
        if not self.email_password:
            raise ValueError("EMAIL_PASSWORD is required")
        return True


# Common SMTP configurations for different providers
SMTP_PROVIDERS = {
    'gmail': {
        'server': 'smtp.gmail.com',
        'port': 587,
        'use_tls': True
    },
    'outlook': {
        'server': 'smtp-mail.outlook.com',
        'port': 587,
        'use_tls': True
    },
    'yahoo': {
        'server': 'smtp.mail.yahoo.com',
        'port': 587,
        'use_tls': True
    },
    'office365': {
        'server': 'smtp.office365.com',
        'port': 587,
        'use_tls': True
    }
}
