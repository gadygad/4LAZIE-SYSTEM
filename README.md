<div align="center">

<img src="https://img.shields.io/badge/Built%20with-Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Status-Active%20Development-10b981?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Made%20in-Tanzania%20🇹🇿-000000?style=for-the-badge"/>

</div>

---

# 📚 4LAZIE — Smart Student Notes Platform

> *One student. One problem. One solution built from scratch.*

**4LAZIE** is a free, open academic platform built specifically for students at technical colleges in Tanzania. It puts everything a student needs — notes, past papers, timetables, and assignment help — in one place, organized by course, level, and semester.

No more hunting through WhatsApp groups. No more scattered downloads. No more paying for materials that should be free.

---

## 🧑‍💻 The Story Behind 4LAZIE

I'm **Careen**, a computer science student at **St. Joseph University in Tanzania (SJUIT)**. Like most of my classmates, I spent hours every week trying to find notes on WhatsApp, asking seniors for past papers, or missing exam dates because no one announced them on time.

I couldn't find a solution that worked for Tanzanian students. So I built one.

4LAZIE started as a side project I coded on my own time, with no funding, no team, and no external support — just a laptop, an internet connection, and a need to solve a real problem.

Today, it handles user accounts, file uploads, real-time messaging, push notifications, admin dashboards, and more. And I'm still a student.

---

## 🌍 The Problem

Across Tanzania and East Africa:

- 📵 Study materials are shared informally through WhatsApp — unreliable and disorganized
- 💸 Many students cannot afford paid resources or private tutoring
- 🏫 Universities lack centralized digital platforms for academic resources
- ⏰ Exam dates, timetables, and announcements are often communicated too late
- 📝 Students needing help with assignments have nowhere to turn except expensive tutors

**4LAZIE addresses all of this — for free.**

---

## ✅ What 4LAZIE Does

| Feature | Description |
|---------|-------------|
| 📄 **Notes & Past Papers** | Upload, search, and download PDFs by subject, level, and semester |
| 📅 **Timetables & Calendar** | View class schedules and exam dates per semester |
| 🆘 **Assignment Help** | Students submit assignments; admins/tutors respond with solutions |
| 💬 **Real-Time Messaging** | Slack-like live chat using Server-Sent Events (SSE) with typing indicators |
| 🔔 **Push Notifications** | PWA-capable with offline support and mobile install |
| 🔐 **Secure Accounts** | Register with email or Google Sign-In + OTP email verification |
| 🛡️ **Admin Dashboard** | Manage users, notes, subjects, courses, and timetables |
| 👑 **Super Admin Approvals** | Sensitive delete actions require approval from Super Admin |
| ⭐ **Premium Section** | Optional upgrade for extended features |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Java 17, Spring Boot 3.2 |
| **Database** | MongoDB |
| **Frontend** | Thymeleaf, HTML, CSS, Bootstrap 5 |
| **Security** | Spring Security, BCrypt, Google OAuth |
| **File Storage** | Cloudinary |
| **Email** | Gmail SMTP |
| **Real-time** | Server-Sent Events (SSE) |
| **Push Notifications** | Web Push API + VAPID |
| **Deployment** | Docker, GitHub Actions |

---

## 🚀 Getting Started

### Requirements

- Java 17+
- Maven 3.8+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Cloudinary account — [cloudinary.com](https://cloudinary.com)
- Gmail App Password
- Google OAuth Client ID *(optional)*

### 1. Clone the project

```bash
git clone https://github.com/gadygad/4LAZIE-SYSTEM.git
cd 4LAZIE-SYSTEM
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your real values. Never commit real credentials to Git.

### 3. Run with Maven

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

### 4. Open in browser

```
http://localhost:8080
```

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `8080`) |
| `MONGO_URI` | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAIL` | Default admin email |
| `ADMIN_PASSWORD` | Default admin password |
| `STUDENT_EMAIL` | Default test student email |
| `STUDENT_PASSWORD` | Default test student password |
| `MAIL_USERNAME` | Gmail address for sending emails |
| `MAIL_PASSWORD` | Gmail app password |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `VAPID_PUBLIC_KEY` | Web push public key |
| `VAPID_PRIVATE_KEY` | Web push private key |
| `VAPID_SUBJECT` | e.g. `mailto:admin@yourdomain.com` |
| `ENCRYPTION_SECRET_KEY` | Secret key for URL encryption |

> **Note:** Use `MONGO_URI` (not `MONGO_URL`) when deploying.

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Student** | Browse notes, download files, view timetables, manage profile, submit assignments, chat with admins |
| **Admin** | Manage notes, users, subjects, courses (based on assigned permissions) |
| **Super Admin** | Full access + approve delete requests from other admins |

Admin permissions: `MANAGE_USERS`, `MANAGE_NOTES`, `MANAGE_SUBJECTS`, `MANAGE_COURSES`, `MANAGE_TIMETABLES`, `MANAGE_CALENDAR`

---

## 🗂️ Project Structure

```
src/main/java/com/school/
├── config/        # Security, database setup, caching
├── controller/    # Web pages and API endpoints
├── model/         # Database models (User, Note, Course, etc.)
├── repository/    # MongoDB data access
├── service/       # Business logic (email, files, notifications)
└── util/          # Helper classes

src/main/resources/
├── templates/     # HTML pages (Thymeleaf)
├── static/        # CSS, JS, images
└── application.properties
```

---

## 🐳 Run with Docker

```bash
docker build -t 4lazie .
docker run -p 8080:8080 --env-file .env 4lazie
```

---

## 📡 Default Pages

| URL | Page |
|-----|------|
| `/` | Public home page |
| `/login` | Login |
| `/register` | Create account |
| `/dashboard` | Student dashboard *(login required)* |
| `/notes` | Browse notes |
| `/assignments` | Submit and track assignments |
| `/messages` | Direct chat with admins |
| `/contact` | Contact page |
| `/upload` | Upload notes *(admin only)* |
| `/admin/dashboard` | Admin panel |
| `/admin/messages` | Admin chat panel |

---

## 💚 Support This Project

4LAZIE is built and maintained by a single student with no funding. Every line of code was written in personal time, between classes, late at night — because I believe Tanzanian students deserve better tools.

**If 4LAZIE has helped you — or if you believe in what it's trying to do — here's how you can help:**

### 💵 Financial Support

| Platform | Link |
|----------|------|
| ☕ Ko-fi (one-time or monthly) | *coming soon* |
| 💛 GitHub Sponsors | *coming soon* |
| 📱 M-Pesa Tanzania | *+255 766 689 326* |

Even a small contribution helps cover:
- Server & hosting costs
- Domain renewal
- Cloudinary storage
- Development time

---

### 🏆 Grant & Partnership Opportunities

4LAZIE is actively seeking:

- 🌍 **Educational grants** for edtech projects in Sub-Saharan Africa
- 🤝 **Institutional partnerships** with universities, colleges, or NGOs
- 💼 **Corporate sponsorships** from tech companies invested in African education
- 👨‍🏫 **Mentorship** from experienced developers or startup founders

**Relevant grant programs this project qualifies for:**

| Organization | Program | Focus |
|---|---|---|
| [Google.org](https://google.org) | Impact Challenge: Africa | Social impact, education tech |
| [Mastercard Foundation](https://mastercardfdn.org) | Scholars Program | African youth education |
| [Mozilla Foundation](https://foundation.mozilla.org/grants) | Technology Fund | Open internet & education |
| [Tony Elumelu Foundation](https://tonyelumelu.com/foundation) | Entrepreneurship Program | African youth entrepreneurs |
| [African Development Bank](https://afdb.org) | Digital Africa | Digital transformation |
| USAID | Higher Education Solutions Network | Education in developing countries |

---

### 📬 Contact for Partnerships

If you are an organization, institution, or individual who wants to support or collaborate:

**Email:** support@4lazie.com  
**Contact Form:** [4lazie.com/contact](https://4lazie.com/contact)  
**LinkedIn:** *(coming soon)*

---

## 🤝 Contributing

This is currently a solo project. Contributions are welcome in these forms:

- 🐛 **Bug reports** — open a GitHub Issue
- 💡 **Feature suggestions** — open a Discussion
- 🔧 **Code contributions** — fork, improve, and submit a Pull Request
- 📢 **Spread the word** — share with students who need it

---

## 👤 Author

**Careen Godfrey**  
Computer Science Student — SJUIT, Tanzania 🇹🇿  
Building 4LAZIE as a first full-stack project to serve students like myself.

> *"I built the platform I wish existed when I started college."*

---

## 📄 License

This project is currently **proprietary**. Usage, redistribution, or copying of source code requires explicit permission from the author.

---

<div align="center">

Made with ❤️ in Tanzania &nbsp;|&nbsp; Built for African students &nbsp;|&nbsp; Powered by Spring Boot

</div>
