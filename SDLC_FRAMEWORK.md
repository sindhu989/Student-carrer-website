# 🚀 Software Development Lifecycle & Engineering Blueprint
## CareerPulse — Modern Student Career Portal & Admin System

This document outlines the complete **17-Step Software Engineering & Problem-Solving Lifecycle** used to architect, design, develop, test, secure, deploy, and maintain the **CareerPulse Student Career Website & Admin Portal**.

---

```
 1. UNDERSTAND
      ↓
 2. DEFINE THE PROBLEM
      ↓
 3. GATHER REQUIREMENTS
      ↓
 4. BREAK INTO SMALL PROBLEMS
      ↓
 5. PLAN THE LOGIC
      ↓
 6. DESIGN THE SOLUTION
      ↓
 7. CHOOSE TECHNOLOGY
      ↓
 8. DESIGN DATA / DATABASE
      ↓
 9. WRITE PSEUDOCODE
      ↓
 10. IMPLEMENT
      ↓
 11. TEST
      ↓
 12. DEBUG
      ↓
 13. REVIEW
      ↓
 14. OPTIMIZE
      ↓
 15. SECURITY CHECK
      ↓
 16. DEPLOY
      ↓
 17. MONITOR & MAINTAIN
```

---

## 1. UNDERSTAND

### The Core Vision
University students frequently struggle with fractured career resources—job listings scattered across email threads, unorganized project showcases, and slow feedback on applications. Simultaneously, campus career advisors and partner recruiters lack a lightweight, real-time interface to manage listings and review candidates.

**Target Users:**
1. **Students:** Want an intuitive, modern portal to view internships, showcase their portfolio, track required skills, and apply with 1 click.
2. **Admins / Career Advisors:** Want an administrative console to publish job postings, review received candidate submissions, change review statuses, and answer student inquiries.

---

## 2. DEFINE THE PROBLEM

### Problem Statements
* **Problem 1 (Discovery & Navigation):** Students waste hours browsing poorly formatted job boards lacking multi-factor filters (e.g., remote vs. on-site, department, pay range).
* **Problem 2 (Profile & Portfolio Presentation):** Standard resumes fail to interactively highlight real-world code, hackathon awards, and verified technical proficiencies.
* **Problem 3 (Feedback & Management Void):** When students submit applications or inquiries, they experience a "black hole" effect without status tracking (Pending, Reviewing, Accepted).
* **Problem 4 (Administrative Overhead):** Recruiters and advisors need a dashboard to post, edit, and track applicants without requiring complex database configuration for demonstration.

---

## 3. GATHER REQUIREMENTS

### A. Functional Requirements
#### Public Student Portal (`index.html`)
* **Hero Section:** High-converting landing banner with real-time statistics, search box, and quick-filter pills.
* **Student Dossier / Profile:** Avatar, GPA, target roles, academic history, coursework, leadership experience, and downloadable resume.
* **Skills Matrix:** Categorized technical and soft skills with proficiency bars and experience tags.
* **Projects Showcase:** Filterable project cards with tech tags, metrics, source code, and live demo modals.
* **Jobs & Internships Board:** Multi-factor search, filters (Type, Setting, Department, Sort Order), and bookmarking.
* **Job Application Flow:** 1-click apply modal with validation and profile pre-fill.
* **Contact & Advising:** Validated multi-field form with character count and toast feedback.

#### Admin Dashboard (`admin.html`)
* **Overview Analytics:** Key Performance Indicators (Total Jobs, Received Applications, Accepted Offers, Inquiries).
* **Jobs Management (CRUD):** Add new job, edit existing job, delete job, search/filter table.
* **Application Reviewer:** Candidate details, status updater (`Pending`, `Reviewing`, `Accepted`, `Rejected`), resume preview.
* **Inquiry Inbox:** Read, flag (`Unread`/`Replied`), and delete incoming messages.

### B. Non-Functional Requirements
* **Responsiveness:** Fluid layouts across Mobile (<640px), Tablet (640-1024px), and Desktop (>1024px).
* **Theme Support:** Clean Dark Mode and Light Mode with persistence.
* **Performance:** Sub-100ms client-side search/filter responsiveness.
* **Accessibility:** Semantic HTML5, ARIA tags, contrast compliance (WCAG 2.1 AA).
* **Persistence:** Client-side persistence using `localStorage` with zero external database dependencies.

---

## 4. BREAK INTO SMALL PROBLEMS (Decomposition)

We decompose the platform into 6 decoupled architectural components:

```
┌─────────────────────────────────────────────────────────────┐
│                       CAREERPULSE                           │
├───────────────┬───────────────────────────────┬─────────────┤
│ 1. UI SYSTEM  │ 2. DATA LAYER (DataStore)     │ 3. DISCOVERY│
│ • Design tokens│ • localStorage Sync           │ • Search    │
│ • Dark/Light  │ • Sample data seeds           │ • Filtering │
│ • Modals & CSS│ • CRUD abstractions           │ • Sorting   │
├───────────────┼───────────────────────────────┼─────────────┤
│ 4. VALIDATION │ 5. ADMIN PORTAL               │ 6. DEPLOY   │
│ • Inline Regex│ • KPI Dashboard               │ • Localhost │
│ • Error DOM   │ • Job CRUD Management         │ • GitHub    │
│ • Live counter│ • Application & Inbox triage  │   Pages     │
└───────────────┴───────────────────────────────┴─────────────┘
```

---

## 5. PLAN THE LOGIC

### A. Two-Way Synchronization Flow
```
Student Portal (index.html)                 Admin Portal (admin.html)
        │                                              │
        │ [Apply / Contact Submit]                    │ [Post / Edit / Delete Job]
        ▼                                              ▼
┌──────────────────────────────────────────────────────────────┐
│                    DataStore (store.js)                      │
│                 Browser localStorage Sync                   │
└──────────────────────────────────────────────────────────────┘
        ▲                                              ▲
        │                                              │
        │ [Live Jobs Board Update]                     │ [Live Applications / Inbox]
```

### B. Job Search & Multi-Filter Logic
1. Start with complete job list `DataStore.getJobs()`.
2. Apply text query matching: `title.includes(q) || company.includes(q) || tags.includes(q)`.
3. Apply Employment Type filter: `type === selectedType || selectedType === 'all'`.
4. Apply Setting/Location filter: `setting === selectedSetting || location.includes(selectedLoc)`.
5. Apply Department filter: `department === selectedDept || selectedDept === 'all'`.
6. Apply Saved Jobs toggle: `savedOnly ? savedIds.includes(job.id) : true`.
7. Sort remaining array based on `sortOrder` (`newest`, `stipend-high`, `deadline`).
8. Render HTML cards; if empty, render empty-state reset card.

---

## 6. DESIGN THE SOLUTION

### Architecture Design
```
frontend/
├── index.html        ─── Public UI View (Student Perspective)
├── admin.html        ─── Management UI View (Recruiter/Admin Perspective)
├── css/
│   ├── style.css     ─── Public Theme, Hero, Grid, Cards, Modals
│   └── admin.css     ─── Dashboard Layout, KPI Cards, Data Tables
└── js/
    ├── data.js       ─── Default Data Seeds (Profiles, Skills, Projects, Jobs)
    ├── store.js      ─── Unified Data Layer (Abstraction over localStorage)
    ├── app.js        ─── Public Reactive Event Handlers & DOM Controller
    └── admin.js      ─── Admin CRUD Operations & Status State Machine
```

---

## 7. CHOOSE TECHNOLOGY

| Layer | Chosen Tech | Rationale |
|---|---|---|
| **Structure** | Semantic HTML5 | High accessibility, SEO-friendly, natively supported without build tooling. |
| **Styling** | Modern CSS3 (Variables + Grid/Flexbox) | Zero build overhead, native light/dark mode with CSS custom properties. |
| **Scripting** | Vanilla JavaScript (ES6+) | Instant load times, zero bundle dependencies, full lifecycle control. |
| **Data Layer** | Web Storage API (`localStorage`) | Persistent client-side demo state across browser refreshes and tabs. |
| **Icons** | Lucide Icons (SVG) | Crisp, modern vector iconography with zero visual distortion. |
| **Local Server** | Node.js Built-in `http` module | Zero npm dependencies, instantaneous startup on port 3000. |
| **Production Hosting**| GitHub Pages | Global CDN delivery, automated Git branch deployment. |

---

## 8. DESIGN DATA / DATABASE

### Entity Models

#### 1. Job Entity
```typescript
interface Job {
  id: string;               // e.g., "job-1"
  title: string;            // e.g., "Software Engineering Intern"
  company: string;          // e.g., "CloudScale Systems"
  logoBg: string;           // Hex color
  logoText: string;         // 2-letter abbreviation
  location: string;         // City, State
  setting: "Remote" | "Hybrid" | "On-site";
  type: "Internship" | "Co-op" | "Full-Time" | "Part-Time";
  department: string;       // e.g., "Software Engineering"
  stipend: string;          // e.g., "$48 - $56 / hr"
  stipendValue: number;     // Numeric for sorting
  deadline: string;         // Formatted date string
  postedDate: string;       // ISO date
  tags: string[];           // Tech stack keywords
  description: string;
  requirements: string[];
  benefits: string[];
}
```

#### 2. Application Entity
```typescript
interface Application {
  id: string;               // e.g., "app-101"
  jobId: string;
  jobTitle: string;
  company: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  portfolioUrl?: string;
  resumeFileName: string;
  coverNote: string;
  appliedDate: string;      // ISO timestamp
  status: "Pending" | "Reviewing" | "Accepted" | "Rejected";
}
```

#### 3. Inquiry Entity
```typescript
interface Inquiry {
  id: string;               // e.g., "inq-201"
  name: string;
  email: string;
  role: "student" | "recruiter" | "alumni" | "faculty";
  category: "mentorship" | "resume" | "employer" | "bug" | "other";
  subject: string;
  message: string;
  date: string;
  status: "Unread" | "Replied" | "Archived";
}
```

---

## 9. WRITE PSEUDOCODE

### Form Validation Engine Pseudocode
```
FUNCTION validateForm(formElements):
    LET isValid = TRUE
    
    FOR EACH input IN formElements:
        IF input.hasAttribute('required') AND isEmpty(input.value):
            SHOW_ERROR(input, "Field is required")
            isValid = FALSE
            
        ELSE IF input.type == 'email' AND NOT matchesEmailRegex(input.value):
            SHOW_ERROR(input, "Invalid email format")
            isValid = FALSE
            
        ELSE IF input.hasAttribute('minlength') AND input.value.length < input.minlength:
            SHOW_ERROR(input, "Minimum length not met")
            isValid = FALSE
            
        ELSE:
            CLEAR_ERROR(input)
            MARK_VALID(input)
            
    RETURN isValid
```

---

## 10. IMPLEMENT

* **`index.html`**: Structured semantic markup with accessible landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<aside>`, `<dialog>`).
* **`admin.html`**: Built standalone admin dashboard with collapsible navigation sidebar and tabular views.
* **`css/style.css`**: Defined root CSS variables, gradient typography, glassmorphism preview cards, and mobile drawers.
* **`css/admin.css`**: Configured administrative data tables, status badges, and KPI statistic cards.
* **`js/store.js`**: Built unified CRUD data access layer with fallback data seeding.
* **`js/app.js`**: Wired interactive search, tab toggles, profile editor, job modals, and toast notifications.
* **`js/admin.js`**: Wired job posting/editing form, status change events, and message deletion.

---

## 11. TEST

### Testing Checklist & Execution
- [x] **Cross-Browser Verification:** Tested layout rendering in Google Chrome, Edge, and mobile viewports.
- [x] **Job Search Filter Verification:** Verified combined text searches with department and work-setting filters.
- [x] **Application Submission Test:** Verified that submitting an application on `index.html` immediately creates an entry visible in `admin.html`.
- [x] **Admin Job CRUD Test:** Verified that posting a new job in `admin.html` immediately renders it on `index.html`.
- [x] **Form Boundary Validation:** Verified that entering invalid email addresses or messages shorter than 20 characters triggers visual validation errors.
- [x] **Responsive Drawer Test:** Verified mobile hamburger menu expansion and automatic collapse upon link selection.

---

## 12. DEBUG

### Resolved Issues During Development
1. **GitHub Pages Initial 404:**
   * *Root Cause:* GitHub Actions workflow lacked default Pages write permission on fresh repository initialization.
   * *Fix:* Pushed dedicated `gh-pages` branch and transitioned repository deployment to native branch hosting.
2. **Data Isolation Across Views:**
   * *Root Cause:* Public portal was reading static array copies while Admin was mutating state.
   * *Fix:* Centralized state under `DataStore` in `store.js` ensuring single source of truth via `localStorage`.

---

## 13. REVIEW

### Code Review & Best Practices
* **DRY (Don't Repeat Yourself):** Reused modal styles and shared data seed structures.
* **Accessibility Standards:** Added `aria-label`, `role="tab"`, `aria-selected`, and keyboard `Escape` modal exit listeners.
* **Maintainability:** Pure modular design separating structure (`.html`), presentation (`.css`), and behavior (`.js`).

---

## 14. OPTIMIZE

* **Performance:** Zero external runtime scripts or heavyweight UI frameworks (React/Vue/Angular); 100% native browser rendering.
* **Hardware Acceleration:** Leveraged CSS `transform: translateY()` and `opacity` transitions for smooth 60fps animations.
* **Lazy Loading:** Added `loading="lazy"` on all portfolio thumbnail preview images.

---

## 15. SECURITY CHECK

* **Input Sanitization:** Used `textContent` over `innerHTML` where user-supplied strings are written to prevent Cross-Site Scripting (XSS).
* **External Link Hardening:** Appended `rel="noopener noreferrer"` to all outbound external links.
* **State Tampering Protection:** Wrapped JSON parse calls in `try/catch` blocks with automatic fallback to initial seeds.

---

## 16. DEPLOY

* **Local Environment:** Node HTTP daemon running on `http://localhost:3000/`.
* **Remote Source Control:** Git repository at `https://github.com/sindhu989/Student-carrer-website`.
* **Production Live URL:** Hosted via GitHub Pages at `https://sindhu989.github.io/Student-carrer-website/`.

---

## 17. MONITOR & MAINTAIN

* **Backup & Reset:** Built a "Reset Demo Data" trigger inside Admin System Settings.
* **Extensibility Roadmap:**
  * Phase 2: Connect RESTful API backend (Node.js/Express with MongoDB/PostgreSQL).
  * Phase 3: JWT-based authentication for students and university recruiters.
  * Phase 4: Automated email dispatch for application status changes.
