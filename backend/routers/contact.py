"""Contact form endpoint."""
import os
import logging
from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, HTTPException

logger = logging.getLogger(__name__)

router = APIRouter()


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: str = ""
    subject: str
    message: str


@router.post("/api/contact")
async def submit_contact(data: ContactRequest):
    """Handle contact form submissions."""
    if not data.name.strip() or not data.message.strip():
        raise HTTPException(status_code=400, detail="姓名和訊息為必填欄位")

    if not data.subject:
        raise HTTPException(status_code=400, detail="請選擇諮詢類型")

    # Log the contact submission
    logger.info(
        f"Contact form: name={data.name}, email={data.email}, "
        f"company={data.company}, subject={data.subject}"
    )

    # Send notification email via Resend (if configured)
    resend_api_key = os.getenv("RESEND_API_KEY")
    if resend_api_key:
        try:
            import httpx
            notify_email = os.getenv("NOTIFY_EMAIL", "jennie@youjue.ai")
            async with httpx.AsyncClient() as client:
                await client.post(
                    "https://api.resend.com/emails",
                    headers={
                        "Authorization": f"Bearer {resend_api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "from": os.getenv("FROM_EMAIL", "YouJue Website <noreply@youjue.ai>"),
                        "to": [notify_email],
                        "subject": f"[官網聯繫] {data.subject} — {data.name}",
                        "html": _build_notification_email(data),
                    },
                )
            logger.info(f"Contact notification email sent to {notify_email}")
        except Exception as e:
            logger.error(f"Failed to send contact notification: {e}")
            # Don't fail the request if email fails

    return {
        "status": "success",
        "message": "訊息已送出，我們會儘快與您聯繫！",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


def _build_notification_email(data: ContactRequest) -> str:
    """Build notification email HTML."""
    subject_labels = {
        "product": "產品諮詢",
        "enterprise": "企業合作",
        "technical": "技術支援",
        "media": "媒體採訪",
        "other": "其他",
    }
    subject_label = subject_labels.get(data.subject, data.subject)

    return f"""
    <div style="font-family: 'Noto Sans TC', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366F1, #4F46E5); padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">官網聯繫表單通知</h2>
        </div>
        <div style="background: #F8FAFC; padding: 24px; border: 1px solid #E2E8F0; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #64748B; width: 100px;">姓名</td>
                    <td style="padding: 8px 0; font-weight: 600;">{data.name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748B;">信箱</td>
                    <td style="padding: 8px 0;"><a href="mailto:{data.email}">{data.email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748B;">公司</td>
                    <td style="padding: 8px 0;">{data.company or '未填寫'}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748B;">主旨</td>
                    <td style="padding: 8px 0;">{subject_label}</td>
                </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 16px 0;">
            <p style="color: #64748B; margin-bottom: 8px;">訊息內容：</p>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0; white-space: pre-wrap;">
{data.message}
            </div>
        </div>
    </div>
    """
