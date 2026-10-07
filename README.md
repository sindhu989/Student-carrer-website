# CareerPulse — Modern Student Career & Internship Portal

**CareerPulse** is a clean, modern, fully responsive Student Career & Opportunity Portal engineered with semantic HTML5, modern CSS3 (with CSS variables and dark/light mode), and vanilla JavaScript.

---

## 🌟 Key Features

### 1. Home Page & Hero Showcase
- **Hero Banner:** Headline with high-converting call-to-actions, stats counter (1,400+ Vetted Internships, 94.8% Offer Acceptance Rate, $42/hr Avg Stipend, 350+ Partner Companies).
- **Instant Search:** Integrated search bar with quick-tag pills (`Frontend`, `Python`, `Remote`, `Product Design`, `Machine Learning`) that smoothly scroll to and filter the job board in real-time.
- **Glassmorphism Candidate Card:** Preview of candidate status, tech stacks, and real-time interview badge alerts.

### 2. Comprehensive Student Profile
- **Candidate Dossier:** Dynamic profile card displaying student avatar, online status, GPA, target role, graduation year, location, and social links.
- **Interactive Multi-Tab Layout:**
  - **About Me:** Executive summary and career focus grid.
  - **Education:** Timeline showing university degree, honors, coursework grades.
  - **Experience:** Internship fellowship and Teaching Assistant history.
  - **Honors & Certs:** Hackathon wins, AWS Solutions Architect certification, and Meta Frontend developer credentials.
- **Profile Customizer (Edit Profile Modal):** Allows updating name, target headline, GPA, location, and bio with client-side validation, persisted in browser `localStorage`.
- **Resume Preview & Download:** Formatted ATS-styled resume preview modal with download action.

### 3. Skills Matrix
- **Categorized Technical Proficiencies:**
  - Frontend & UI (React 18, TypeScript, HTML5/CSS3, Tailwind)
  - Backend & Databases (Node.js, FastAPI/Python, PostgreSQL, Redis)
  - Cloud & DevOps (Docker, AWS, Git/GitHub Actions, Linux)
  - Professional Soft Skills (Technical Communication, Agile, LeetCode Problem Solving, Mentorship)
- **Interactive Filter Pills:** Filter skills by category with proficiency progress bars and experience tags.

### 4. Featured Student Projects
- **Interactive Project Showcase:** 6 real-world projects featuring tags, metrics, and live demo/GitHub links.
- **Search & Category Filtering:** Search by keyword, technology, or title, plus filter pills (`All`, `Full Stack`, `AI/ML`, `Mobile/IoT`, `Cloud`).
- **Interactive Project Details Modal:** Complete architecture breakdown, problem statements, and key technical challenges solved.

### 5. Jobs & Internships Opportunity Board
- **Comprehensive Multi-Factor Filtering:**
  - Real-time text search (Title, Company, Skills).
  - Employment type filter (`Internship`, `Co-op`, `Full-Time`, `Part-Time`).
  - Work environment filter (`Remote Only`, `Hybrid`, `On-site`, specific cities).
  - Sorting (`Newest First`, `Highest Stipend`, `Application Deadline`).
  - Discipline tags (`Software Engineering`, `Data & AI`, `Product & UI/UX`, `Cloud & Security`).
- **Bookmarking / Saved Jobs:** Save/unsave opportunities with real-time navbar counter badge and "Show Saved Only" filter toggle, persisted across reloads via `localStorage`.
- **Interactive Job Details & Application Modal:**
  - Detailed responsibilities, requirements, and benefits.
  - One-click application form pre-filled with student profile information.
  - Form validation with simulated resume attachment and instant submission feedback.

### 6. Contact & Advisory Section
- **Direct Advisory Cards:** Office address, direct emails, advising hours, and student FAQ accordion.
- **Interactive Contact Form with Validation:**
  - Full Name (required, min 3 chars).
  - Valid Email address pattern.
  - Affiliation selector and inquiry category.
  - Subject line (min 5 chars).
  - Message textarea (min 20 chars with live counter).
  - Consent agreement checkbox.
  - Inline error feedback and loading state with custom Toast Notification.

### 7. Modern UI/UX Highlights
- **Dark Mode & Light Mode:** Toggleable with automatic persistence in `localStorage` and system theme detection.
- **Toast Notification System:** Non-intrusive floating feedback messages for all actions.
- **Fully Responsive:** Custom layouts for desktop, tablet, and mobile devices with collapsible navigation drawer.
- **Accessibility:** Semantic HTML, ARIA attributes, keyboard navigation (`Escape` closes modals, `Enter` searches), and high-contrast color ratios.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser:

```bash
# In Windows PowerShell:
Start-Process index.html
```

Or serve with any static server:
```bash
npx serve .
# or
python -m http.server 8000
```

---

## 📁 Project Structure

```
student/
├── index.html            # Public Student Portal (Home, Profile, Skills, Projects, Jobs, Contact)
├── admin.html            # Dedicated Admin Management Portal (CRUD Jobs, Review Apps, Inbox)
├── css/
│   ├── style.css         # Public portal styles (glassmorphism, themes, responsive layout)
│   └── admin.css         # Admin dashboard styles (sidebar, KPI cards, data tables, modals)
├── js/
│   ├── data.js           # Static data seeds for profile, skills, projects, and jobs
│   ├── store.js          # Unified DataStore synchronizing public site and admin portal via localStorage
│   ├── app.js            # Public student portal reactive controller
│   └── admin.js          # Admin dashboard controller (CRUD operations, status reviews, inbox)
├── server.js             # Built-in local HTTP server
└── README.md             # Project documentation & usage guide
```

---

## 🛡️ Admin Panel Features (`admin.html`)

- **Dashboard Overview:** KPI stats tracking total jobs, received applications, accepted offers, and unread inquiries.
- **Jobs & Internships Manager:** Full CRUD capability to add, edit, or delete opportunities with instant synchronization to the public job board.
- **Applications Reviewer:** Review all submitted candidate applications with status toggles (`Pending`, `Reviewing`, `Accepted`, `Rejected`) and detailed dossier previews.
- **Contact Advisory Inbox:** View, filter, and respond to incoming mentorship and recruiter messages with read/unread flags.
- **Live Two-Way Data Sync:** Data added or updated in either portal immediately reflects in both views via `DataStore`.
