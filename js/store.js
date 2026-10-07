/**
 * CareerPulse - Unified Data Store & State Management
 * Connects the public Student Portal (index.html) and Admin Dashboard (admin.html)
 * Synchronizes data seamlessly via localStorage
 */

const STORAGE_KEYS = {
  JOBS: 'cp_jobs_v2',
  APPLICATIONS: 'cp_applications_v2',
  INQUIRIES: 'cp_inquiries_v2',
  PROFILE: 'cp_student_profile',
  SAVED_JOBS: 'cp_saved_jobs'
};

const SAMPLE_APPLICATIONS = [
  {
    id: "app-101",
    jobId: "job-1",
    jobTitle: "Software Engineering Intern • Summer 2027",
    company: "CloudScale Systems",
    candidateName: "Alex Rivera",
    candidateEmail: "alex.rivera@campus.edu",
    candidatePhone: "(415) 890-1234",
    portfolioUrl: "https://github.com/alexrivera-dev",
    resumeFileName: "Alex_Rivera_Resume_2026.pdf",
    coverNote: "I have 3 years of hands-on experience in React, TypeScript, and FastAPI. Recently led a hackathon winning project.",
    appliedDate: "2026-10-05T14:30:00.000Z",
    status: "Reviewing" // Pending, Reviewing, Accepted, Rejected
  },
  {
    id: "app-102",
    jobId: "job-3",
    jobTitle: "Machine Learning & AI Engineering Intern",
    company: "NeuralPulse Labs",
    candidateName: "Alex Rivera",
    candidateEmail: "alex.rivera@campus.edu",
    candidatePhone: "(415) 890-1234",
    portfolioUrl: "https://github.com/alexrivera-dev",
    resumeFileName: "Alex_Rivera_Resume_2026.pdf",
    coverNote: "Strong background in PyTorch and transformer fine-tuning. Co-authored an IEEE workshop paper on radiographic analysis.",
    appliedDate: "2026-10-06T10:15:00.000Z",
    status: "Accepted"
  },
  {
    id: "app-103",
    jobId: "job-2",
    jobTitle: "Frontend Developer Intern • Design Systems",
    company: "Starlight Digital",
    candidateName: "Jordan Hayes",
    candidateEmail: "jordan.h@university.edu",
    candidatePhone: "(555) 349-8812",
    portfolioUrl: "https://jordanhayes.design",
    resumeFileName: "Jordan_Hayes_CV.pdf",
    coverNote: "Specialized in component design tokens, accessibility WCAG AA, and Storybook prototyping.",
    appliedDate: "2026-10-06T16:45:00.000Z",
    status: "Pending"
  }
];

const SAMPLE_INQUIRIES = [
  {
    id: "inq-201",
    name: "Samantha Wright",
    email: "samantha.w@campus.edu",
    role: "student",
    category: "mentorship",
    subject: "Requesting 1-on-1 Mock Technical Interview for Systems Track",
    message: "Hi Career Center team, I have an upcoming technical screen for a distributed systems internship next week. Could I schedule a mock interview?",
    date: "2026-10-06T09:20:00.000Z",
    status: "Unread" // Unread, Replied, Archived
  },
  {
    id: "inq-202",
    name: "Marcus Vance",
    email: "m.vance@techventures.io",
    role: "recruiter",
    category: "employer",
    subject: "Campus Recruiting Partnership for Spring 2027",
    message: "We are expanding our college hiring program and would love to host an on-campus info session and tech talk next month.",
    date: "2026-10-05T18:10:00.000Z",
    status: "Replied"
  }
];

const DataStore = {
  // --- Initialization ---
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(SAMPLE_APPLICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SAMPLE_INQUIRIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_JOBS)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(["job-1", "job-3"]));
    }
  },

  // --- Jobs Management ---
  getJobs() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS)) || INITIAL_JOBS;
    } catch (e) {
      return INITIAL_JOBS;
    }
  },

  saveJobs(jobs) {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  },

  addJob(jobData) {
    const jobs = this.getJobs();
    const newJob = {
      id: "job-" + Date.now(),
      postedDate: new Date().toISOString().split('T')[0],
      ...jobData
    };
    jobs.unshift(newJob);
    this.saveJobs(jobs);
    return newJob;
  },

  updateJob(jobId, updatedData) {
    const jobs = this.getJobs();
    const index = jobs.findIndex(j => j.id === jobId);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updatedData };
      this.saveJobs(jobs);
      return jobs[index];
    }
    return null;
  },

  deleteJob(jobId) {
    let jobs = this.getJobs();
    jobs = jobs.filter(j => j.id !== jobId);
    this.saveJobs(jobs);

    // Also remove from saved bookmarks if present
    let saved = this.getSavedJobIds();
    saved = saved.filter(id => id !== jobId);
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(saved));
  },

  // --- Applications Management ---
  getApplications() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) || SAMPLE_APPLICATIONS;
    } catch (e) {
      return SAMPLE_APPLICATIONS;
    }
  },

  saveApplications(apps) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  },

  addApplication(appData) {
    const apps = this.getApplications();
    const newApp = {
      id: "app-" + Date.now(),
      appliedDate: new Date().toISOString(),
      status: "Pending",
      ...appData
    };
    apps.unshift(newApp);
    this.saveApplications(apps);
    return newApp;
  },

  updateApplicationStatus(appId, newStatus) {
    const apps = this.getApplications();
    const target = apps.find(a => a.id === appId);
    if (target) {
      target.status = newStatus;
      this.saveApplications(apps);
      return target;
    }
    return null;
  },

  deleteApplication(appId) {
    let apps = this.getApplications();
    apps = apps.filter(a => a.id !== appId);
    this.saveApplications(apps);
  },

  // --- Inquiries Management ---
  getInquiries() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES)) || SAMPLE_INQUIRIES;
    } catch (e) {
      return SAMPLE_INQUIRIES;
    }
  },

  saveInquiries(inquiries) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  },

  addInquiry(inqData) {
    const inquiries = this.getInquiries();
    const newInquiry = {
      id: "inq-" + Date.now(),
      date: new Date().toISOString(),
      status: "Unread",
      ...inqData
    };
    inquiries.unshift(newInquiry);
    this.saveInquiries(inquiries);
    return newInquiry;
  },

  updateInquiryStatus(inquiryId, newStatus) {
    const inquiries = this.getInquiries();
    const target = inquiries.find(i => i.id === inquiryId);
    if (target) {
      target.status = newStatus;
      this.saveInquiries(inquiries);
      return target;
    }
    return null;
  },

  deleteInquiry(inquiryId) {
    let inquiries = this.getInquiries();
    inquiries = inquiries.filter(i => i.id !== inquiryId);
    this.saveInquiries(inquiries);
  },

  // --- Bookmarked / Saved Jobs ---
  getSavedJobIds() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_JOBS)) || [];
    } catch (e) {
      return [];
    }
  },

  saveSavedJobIds(ids) {
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(ids));
  },

  // --- Profile ---
  getProfile() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profileData) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
  },

  // --- Aggregated Stats ---
  getStats() {
    const jobs = this.getJobs();
    const apps = this.getApplications();
    const inquiries = this.getInquiries();

    return {
      totalJobs: jobs.length,
      activeInternships: jobs.filter(j => j.type === 'Internship' || j.type === 'Co-op').length,
      totalApplications: apps.length,
      pendingApplications: apps.filter(a => a.status === 'Pending').length,
      acceptedApplications: apps.filter(a => a.status === 'Accepted').length,
      totalInquiries: inquiries.length,
      unreadInquiries: inquiries.filter(i => i.status === 'Unread').length
    };
  },

  // --- Reset to Factory Defaults ---
  resetAllData() {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(SAMPLE_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SAMPLE_INQUIRIES));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(["job-1", "job-3"]));
  }
};

// Initialize immediately upon script execution
DataStore.init();
