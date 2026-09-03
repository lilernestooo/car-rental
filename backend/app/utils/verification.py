import random
from datetime import datetime, timedelta

def generate_verification_code() -> str:
    return f"{random.randint(0, 999999):06d}"

def code_expiry() -> datetime:
    return datetime.utcnow() + timedelta(minutes=10)

def send_verification_email(email: str, code: str):
    """
    PLACEHOLDER — wire this up to a real email service when ready
    (Gmail SMTP, SendGrid, Mailgun, etc). For now it just prints
    to your terminal so you can test the flow end-to-end.
    """
    print(f"[DEV MODE] Verification code for {email}: {code}")