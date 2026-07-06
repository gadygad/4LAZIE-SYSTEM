import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg.set_content("This is a test email from your 4LAZIE application to verify that the email configuration is working correctly.")
msg['Subject'] = 'Test Email Verification - 4LAZIE'
msg['From'] = "kilingepazasauti@gmail.com"
msg['To'] = "kilingepazasauti@gmail.com"

try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("kilingepazasauti@gmail.com", "aaoscrjhrswirlhh")
    server.send_message(msg)
    server.quit()
    print("SUCCESS: Email sent successfully!")
except Exception as e:
    print(f"FAILED: {e}")
