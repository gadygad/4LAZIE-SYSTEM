<div align="center">

<img src="https://img.shields.io/badge/Built%20with-Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Status-Active%20Development-10b981?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Made%20in-Tanzania%20🇹🇿-000000?style=for-the-badge"/>

</div>

---

# 📚 4LAZIE — Smart Student Notes Platform

> *Built out of necessity. Built by a student. Built for students.*

**4LAZIE** is a free, centralized academic platform built specifically for students at technical colleges in Tanzania. It puts everything a student needs — notes, past papers, timetables, and assignment help — in one place, organized by course, level, and semester.

---

## 🧑‍💻 The True Story of 4LAZIE

My name is **Godfrey Charles Nyagwisi**. In 2024, I started my Diploma in Computer Science and Engineering at **St. Joseph University in Tanzania (SJUIT)**. 

When I joined college, my biggest dream was to become a game developer. But reality hit hard: learning programming in a developing country with limited resources, no mentors, and a language barrier (coming from a Swahili-speaking government school) was incredibly difficult. I eventually shifted my focus to cybersecurity and pentesting, which led me to ask: *"What language should I learn?"* The answer was **Java**.

### The Sacrifice
I struggled to find someone at my college who loved Java or could teach me. So, I turned to AI and YouTube. Specifically, I found a 102-video tutorial playlist by **Navin Reddy (Telusko)**. 

To continue learning, I needed a laptop. My friend, **Iqbal** (a year ahead of me), had a broken laptop. In a desperate move to keep learning, **I sold my smartphone to pay for his laptop's repair**, on the condition that I could use it. 

The problem? **My smartphone contained all my scattered PDF notes.** When exam season arrived, I had no phone, no notes, and I spent hours begging classmates for study materials. The pain of not having notes when I needed them most was agonizing.

### The Birth of "4LAZIE"
In April of this year, I decided to build a project to test my Java skills. Remembering my struggles, I decided to build a "personal document bank" where I could safely store all my materials. 

I've always loved humor, so I jokingly called the system **"4LAZIE" (For Lazy)**. The idea was simple: I was too "lazy" to waste hours searching for notes in scattered WhatsApp groups. I wanted a system that did the hard work of organizing materials so I could spend less time searching and more time actually studying.

During exams, my classmates started struggling to find notes, just like I used to. I told them, *"Go to 4lazie.com."* That was my "aha" moment. I realized this wasn't just my problem; it was a nationwide problem for Tanzanian students. 

### The Silent Struggle Behind the Screen
To scale 4LAZIE, I had to learn things that were never taught in class: Cloudinary, MongoDB, SSL/TLS certificates, domain registration, and cloud deployment. I learned all of this through AI (ChatGPT, Antigravity) while simultaneously juggling six heavy, unrelated college subjects. 

**But there is a deeper layer to this struggle.** I am not just a student; I am a father. I have an 11-year-old daughter named **Careen** (which is why my computer's internal profile is named after her). To pay for her 4th-grade education and my own college tuition, I run an informal micro-lending business with a small rotating capital. Whatever little profit I make is split between Careen's school fees, my college fees, and keeping 4LAZIE alive. 

It has not been easy. Right now, 4LAZIE runs on free hosting because my free tier on Railway expired, forcing a migration to Render. **Behind the code, there are days I feel like giving up.** I frequently use my food money to buy internet bundles, pay for domains, and keep this platform alive for other students. But every time I look at my daughter and remember where I started, I realize I cannot quit. That passion keeps me going.

---

## 🌍 The Problem It Solves

Across Tanzania and East Africa:
- 📵 Study materials are shared informally through WhatsApp — unreliable, scattered, and easily lost (as I experienced).
- 💸 Many students cannot afford paid resources.
- 🏫 Universities lack centralized, easy-to-access digital platforms for academic resources.

**4LAZIE solves this by centralizing knowledge for free.**

---

## ✅ Features

| Feature | Description |
|---------|-------------|
| 📄 **Notes & Past Papers** | Upload, search, and download PDFs by subject, level, and semester |
| 📅 **Timetables & Calendar** | View class schedules and exam dates per semester |
| 🆘 **Assignment Help** | Students submit assignments; admins/tutors respond with solutions |
| 💬 **Real-Time Messaging** | Slack-like live chat using Server-Sent Events (SSE) with typing indicators |
| 🔔 **Push Notifications** | PWA-capable with offline support and mobile install |
| 🔐 **Secure Accounts** | Register with email or Google Sign-In + OTP email verification |
| 🛡️ **Admin Dashboard** | Manage users, notes, subjects, courses, and timetables |
| 💻 **Device Management** | View all active logged-in devices and remotely log them out |
| 🚨 **Advanced Security** | Email alerts on password change with emergency lockdown / account suspension link |
| ✨ **Premium UI/UX** | Glassmorphism, micro-animations, and a highly responsive, modern interface |

---

## 🛠️ Tech Stack

I learned all of this through late-night YouTube tutorials and relentless practice:

| Layer | Technology |
|-------|------------|
| **Backend** | Java 17, Spring Boot 3.2 |
| **Database** | MongoDB |
| **Frontend** | Thymeleaf, HTML, CSS, Bootstrap 5, Vanilla JS |
| **Security** | Spring Security, BCrypt, Google OAuth |
| **File Storage** | Cloudinary |
| **Real-time** | Server-Sent Events (SSE) |

---

## 🚀 Getting Started (For Developers)

### 1. Clone the project
```bash
git clone https://github.com/gadygad/4LAZIE-SYSTEM.git
cd 4LAZIE-SYSTEM
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Open `.env` and fill in your MongoDB URI, Cloudinary keys, and SMTP credentials.

### 3. Run with Maven
```bash
./mvnw spring-boot:run
```

---

## 💚 Support The Dream

4LAZIE is built and maintained by a single student with zero funding. I sold my phone to learn how to build this. Every line of code was written on a borrowed laptop, late at night. Today, **I use my food money to buy internet bundles and pay for the domain** just so this platform can remain free for Tanzanian students.

### The 2027 Vision
I will graduate in **2027**. My ultimate goal is to officially register 4LAZIE as a formal EdTech company and expand this system to serve **every single university and college in Tanzania**. I know it won't be easy, but after everything I have overcome, I know it is possible.

Because 4LAZIE is currently on free hosting, it is sometimes slow. With your help, I can upgrade the servers, fund the company registration, and make this platform blazing fast and accessible nationwide.

**If my story resonates with you, or if 4LAZIE has helped you, please consider supporting this mission:**

### 💵 Financial Support

For local supporters in Tanzania, you can easily send your contributions directly via Mobile Money. Every contribution keeps the servers running!

**Vodacom M-Pesa**
- **Number:** 0756 567 424
- **Name:** Godfrey Charles Nyagwisi

Even a small contribution helps cover server hosting costs so I don't have to sacrifice my meals to keep education accessible.

### 🏆 Grant & Partnership Opportunities

4LAZIE is actively seeking educational grants, institutional partnerships, and mentorship from experienced developers or startup founders.

If you are an organization (like Google.org, Mastercard Foundation, or Tony Elumelu Foundation) looking to support grassroots EdTech in Africa, please reach out.

**Email:** support@4lazie.com  
**Contact Form:** [4lazie.com/contact](https://4lazie.com/contact)  

---

## 🤝 Contributing

Contributions are heavily welcomed! Whether it's fixing a bug, adding a feature, or helping to upload notes for your specific university.

---

## 👤 Author

**Godfrey Charles Nyagwisi**  
Computer Science Student, Entrepreneur & Father — SJUIT, Tanzania 🇹🇿  

> *"I didn't just build a system. I built the lifeline I needed when I had nothing."*

---

<div align="center">

Made with ❤️ in Tanzania &nbsp;|&nbsp; Built for African students &nbsp;|&nbsp; Powered by Spring Boot

</div>
