# 4LAZIE

**4LAZIE** is a student notes platform for technical colleges in Tanzania.  
Students can find and download notes, past papers, timetables, and the academic calendar in one place — organized by course, level, and semester.

Built for **St. Joseph University in Tanzania (SJUIT)** and similar institutions.

---

## What problem does it solve?

Many students get study materials from WhatsApp groups, random folders, or scattered links.  
4LAZIE puts everything in one website so students can:

- Search notes by subject and level
- Download past papers (CAT, UE, assignments)
- View class timetables
- Check exam dates on the academic calendar

---

## Main features

- **Notes & past papers** — upload, browse, search, and download PDFs
- **Course-based access** — students only see materials for their program (e.g. DIP_CSE)
- **Timetables** — view schedules by program, level, and semester
- **Academic calendar** — CAT and UE dates for each semester
- **User accounts** — register with email or Google Sign-In
- **Email verification** — new users must verify their email before logging in
- **Admin dashboard** — manage users, notes, subjects, courses, and timetables
- **Super Admin approvals** — sensitive delete actions need approval
- **Push notifications** — works as a PWA on mobile (installable, offline support)
- **Exam Generator Hub** — built-in tools for admins to generate beautiful PDF past papers (UE, CATs) for multiple universities
- **Premium section** — optional upgrade area for extra features

---

## Tech stack

| Part | Technology |
|------|------------|
| Backend | Java 17, Spring Boot 3.2 |
| Database | MongoDB |
| Frontend | Thymeleaf, HTML, CSS, Bootstrap |
| Security | Spring Security, BCrypt |
| File storage | Cloudinary |
| Email | Gmail SMTP |
| Login | Email/password + Google OAuth |
| Deploy | Docker, GitHub Actions |

---

## Requirements

Before you run the project, make sure you have:

- **Java 17** or newer
- **Maven 3.8+**
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Cloudinary account** (for file uploads) — [cloudinary.com](https://cloudinary.com)
- **Gmail App Password** (for sending emails)
- **Google OAuth Client ID** (optional, for Google Sign-In)

---

## How to run locally

### 1. Clone the project

```bash
git clone <your-repo-url>
cd 4LAZIE
```

### 2. Set up environment variables

Copy the example file:

```bash
cp .env.example .env
```

Open `.env` and fill in your real values.  
On your server or hosting platform (Render, Railway, etc.), set the same variables there.

**Important:** Never commit real passwords or API keys to Git.

### 3. Run with Maven

```bash
./mvnw spring-boot:run
```

Or on Windows:

```bash
mvnw.cmd spring-boot:run
```

### 4. Open in browser

Go to: **http://localhost:8080**

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `8080`) |
| `MONGO_URI` | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAIL` | Default admin email (first setup) |
| `ADMIN_PASSWORD` | Default admin password (first setup) |
| `STUDENT_EMAIL` | Default test student email |
| `STUDENT_PASSWORD` | Default test student password |
| `MAIL_USERNAME` | Gmail address for sending emails |
| `MAIL_PASSWORD` | Gmail app password |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `VAPID_PUBLIC_KEY` | Web push public key |
| `VAPID_PRIVATE_KEY` | Web push private key |
| `VAPID_SUBJECT` | e.g. `mailto:admin@yourdomain.com` |
| `ENCRYPTION_SECRET_KEY` | Secret key for URL encryption |

> **Note:** The app reads `MONGO_URI` (not `MONGO_URL`). Use `MONGO_URI` when deploying.

---

## User roles

| Role | What they can do |
|------|------------------|
| **Student** | Browse notes, download files, view timetables, manage profile |
| **Admin** | Manage notes, users, subjects, courses (based on permissions) |
| **Super Admin** | Full access + approve delete requests from other admins |

Admin permissions include: `MANAGE_USERS`, `MANAGE_NOTES`, `MANAGE_SUBJECTS`, `MANAGE_COURSES`, `MANAGE_TIMETABLES`, `MANAGE_CALENDAR`.

---

## Project structure

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

## Run with Docker

```bash
docker build -t 4lazie .
docker run -p 8080:8080 --env-file .env 4lazie
```

---

## Build for production

```bash
./mvnw clean package
java -jar target/school-system-1.0-SNAPSHOT.jar
```

---

## Default pages

| URL | Page |
|-----|------|
| `/` or `/home` | Public home page |
| `/login` | Login |
| `/register` | Create account |
| `/dashboard` | Student dashboard (login required) |
| `/notes` | Browse notes |
| `/upload` | Upload notes (admin only) |
| `/admin/dashboard` | Admin panel |

---

## Contributing

This is a personal project. If you want to help or report a bug, open an issue or contact the author.

---

## Author

**Careen** — First full-stack project  
Built with Spring Boot for Tanzanian college students.

---

## License

Private project. All rights reserved.
