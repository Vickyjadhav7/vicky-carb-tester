"""
Email Scheduler Module
Schedule emails to be sent at specific times.
"""

import schedule
import time
import threading
from typing import Callable, Optional
from datetime import datetime
import logging

from email_sender import EmailSender
from config import EmailConfig

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class EmailScheduler:
    """Schedule and manage automated email sending."""

    def __init__(self, email_sender: Optional[EmailSender] = None):
        """
        Initialize the scheduler.
        
        Args:
            email_sender: Optional EmailSender instance (creates one if not provided)
        """
        if email_sender:
            self.sender = email_sender
        else:
            config = EmailConfig.from_env()
            self.sender = EmailSender(config)
        
        self._running = False
        self._thread = None

    def schedule_email(
        self,
        to_email: str,
        subject: str,
        body: str,
        send_time: str,
        html_body: Optional[str] = None,
        repeat: str = None
    ) -> None:
        """
        Schedule an email to be sent.
        
        Args:
            to_email: Recipient email address
            subject: Email subject
            body: Email body
            send_time: Time to send (HH:MM format for daily, or specific patterns)
            html_body: Optional HTML body
            repeat: Repeat pattern ('daily', 'weekly', 'monday', etc.)
        """
        def send_job():
            logger.info(f"Executing scheduled email to {to_email}")
            self.sender.send_email(
                to_email=to_email,
                subject=subject,
                body=body,
                html_body=html_body
            )

        if repeat == 'daily':
            schedule.every().day.at(send_time).do(send_job)
            logger.info(f"Scheduled daily email to {to_email} at {send_time}")
        elif repeat == 'weekly':
            schedule.every().week.at(send_time).do(send_job)
            logger.info(f"Scheduled weekly email to {to_email} at {send_time}")
        elif repeat in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']:
            getattr(schedule.every(), repeat).at(send_time).do(send_job)
            logger.info(f"Scheduled email to {to_email} every {repeat} at {send_time}")
        elif repeat == 'hourly':
            schedule.every().hour.do(send_job)
            logger.info(f"Scheduled hourly email to {to_email}")
        else:
            # One-time scheduled email
            schedule.every().day.at(send_time).do(send_job).tag('one-time')
            logger.info(f"Scheduled one-time email to {to_email} at {send_time}")

    def schedule_reminder(
        self,
        to_email: str,
        reminder_message: str,
        send_time: str,
        repeat: str = 'daily'
    ) -> None:
        """
        Schedule a reminder email.
        
        Args:
            to_email: Recipient email
            reminder_message: The reminder message
            send_time: Time to send (HH:MM format)
            repeat: How often to repeat
        """
        subject = f"Reminder: {reminder_message[:50]}..."
        body = f"""
Hello,

This is your scheduled reminder:

{reminder_message}

---
This is an automated reminder.
        """.strip()

        self.schedule_email(
            to_email=to_email,
            subject=subject,
            body=body,
            send_time=send_time,
            repeat=repeat
        )

    def start(self, blocking: bool = True) -> None:
        """
        Start the scheduler.
        
        Args:
            blocking: If True, blocks the main thread. If False, runs in background.
        """
        self._running = True
        logger.info("Email scheduler started")

        if blocking:
            self._run_scheduler()
        else:
            self._thread = threading.Thread(target=self._run_scheduler)
            self._thread.daemon = True
            self._thread.start()

    def stop(self) -> None:
        """Stop the scheduler."""
        self._running = False
        schedule.clear()
        logger.info("Email scheduler stopped")

    def _run_scheduler(self) -> None:
        """Run the scheduler loop."""
        while self._running:
            schedule.run_pending()
            time.sleep(1)

    def get_scheduled_jobs(self) -> list:
        """Get list of all scheduled jobs."""
        return schedule.get_jobs()

    def clear_all(self) -> None:
        """Clear all scheduled jobs."""
        schedule.clear()
        logger.info("All scheduled jobs cleared")


# Example usage
if __name__ == "__main__":
    # Create scheduler
    scheduler = EmailScheduler()
    
    # Schedule a daily reminder
    scheduler.schedule_reminder(
        to_email="example@email.com",
        reminder_message="Don't forget to check your daily reports!",
        send_time="09:00",
        repeat='daily'
    )
    
    # Schedule a weekly email
    scheduler.schedule_email(
        to_email="example@email.com",
        subject="Weekly Summary",
        body="Here's your weekly summary...",
        send_time="10:00",
        repeat='monday'
    )
    
    print("Scheduler running. Press Ctrl+C to stop.")
    try:
        scheduler.start(blocking=True)
    except KeyboardInterrupt:
        scheduler.stop()
