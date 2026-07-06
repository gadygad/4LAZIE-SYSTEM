import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg['Subject'] = 'New Material Added: Introduction to Computer Science'
msg['From'] = "kilingepazasauti@gmail.com"
msg['To'] = "kilingepazasauti@gmail.com"

htmlBody = """
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
<div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #10b981;">
<h1 style="color: #10b981; font-weight: 800; margin: 0;">4LAZIE</h1>
<p style="color: #64748b; font-size: 14px; margin-top: 5px;">smart in brain</p>
</div>
<div style="padding: 30px 0;">
<h2 style="color: #1e293b; font-size: 20px;">Hello Student,</h2>
<p style="color: #475569; font-size: 16px; line-height: 1.6;">A new <strong>Notes</strong> titled <strong>"Introduction to Computer Science"</strong> has just been uploaded for your class.</p>
<div style="text-align: center; margin: 35px 0;">
<a href="#" style="background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">Read Now</a>
</div>
<p style="color: #475569; font-size: 16px; line-height: 1.6;">Stay ahead of your studies with 4LAZIE.</p>
</div>
<div style="text-align: center; padding-top: 15px; color: #94a3b8; font-size: 12px;">
<p>&copy; 2024 4LAZIE Student Community. All rights reserved.</p>
</div>
</div>
"""

msg.add_alternative(htmlBody, subtype='html')

try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("kilingepazasauti@gmail.com", "aaoscrjhrswirlhh")
    server.send_message(msg)
    server.quit()
    print("SUCCESS")
except Exception as e:
    print(f"FAILED: {e}")
