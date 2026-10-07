/**
 * CareerPulse - Admin Dashboard Controller
 * Full CRUD for jobs, status reviewer for student applications, and inbox manager
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  // State
  let currentTheme = localStorage.getItem('cp_admin_theme') || 'light';
  let activeTab = 'tab-dashboard';
  let jobEditingId = null;

  // Apply Theme
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cp_admin_theme', theme);
    currentTheme = theme;
    const moon = document.querySelector('.theme-icon-moon');
    const sun = document.querySelector('.theme-icon-sun');
    if (moon && sun) {
      moon.style.display = theme === 'dark' ? 'none' : 'block';
      sun.style.display = theme === 'dark' ? 'block' : 'none';
    }
    if (window.lucide) lucide.createIcons();
  }

  applyTheme(currentTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'light' ? 'dark' : 'light');
      showToast(`Theme changed to ${currentTheme} mode`, 'info');
    });
  }

  // Sidebar Mobile Toggle
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const adminSidebar = document.getElementById('adminSidebar');
  if (sidebarToggleBtn && adminSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      adminSidebar.classList.toggle('open');
    });
  }

  // Close sidebar on click outside in mobile
  document.addEventListener('click', (e) => {
    if (adminSidebar && adminSidebar.classList.contains('open') && 
        !adminSidebar.contains(e.target) && e.target !== sidebarToggleBtn) {
      adminSidebar.classList.remove('open');
    }
  });

  // Sidebar Tab Switching
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
  const tabPanes = document.querySelectorAll('.admin-tab-pane');
  const pageTitle = document.getElementById('pageTitle');

  const tabTitles = {
    'tab-dashboard': 'Admin Dashboard',
    'tab-jobs': 'Jobs & Internships Management',
    'tab-applications': 'Student Applications Review',
    'tab-inquiries': 'Career Advisory Inbox',
    'tab-settings': 'System Settings'
  };

  function switchTab(targetTabId) {
    sidebarLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-tab') === targetTabId);
    });
    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.getAttribute('id') === targetTabId);
    });

    if (pageTitle && tabTitles[targetTabId]) {
      pageTitle.textContent = tabTitles[targetTabId];
    }
    activeTab = targetTabId;

    if (adminSidebar) adminSidebar.classList.remove('open');
    if (window.lucide) lucide.createIcons();

    // Re-render data for the active tab
    renderAllViews();
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Direct tab jump buttons
  const viewAllAppsBtn = document.getElementById('viewAllAppsBtn');
  if (viewAllAppsBtn) viewAllAppsBtn.addEventListener('click', () => switchTab('tab-applications'));

  const viewAllInquiriesBtn = document.getElementById('viewAllInquiriesBtn');
  if (viewAllInquiriesBtn) viewAllInquiriesBtn.addEventListener('click', () => switchTab('tab-inquiries'));

  // ==========================================
  // RENDER CONTROLLERS
  // ==========================================

  function renderStats() {
    const stats = DataStore.getStats();

    // Counters in sidebar
    const sbJobs = document.getElementById('sidebarJobsCount');
    const sbApps = document.getElementById('sidebarAppsCount');
    const sbInq = document.getElementById('sidebarInquiriesCount');
    if (sbJobs) sbJobs.textContent = stats.totalJobs;
    if (sbApps) sbApps.textContent = stats.totalApplications;
    if (sbInq) sbInq.textContent = stats.totalInquiries;

    // Stat cards on dashboard
    const statTotalJobs = document.getElementById('statTotalJobs');
    const statActiveInternships = document.getElementById('statActiveInternships');
    const statTotalApps = document.getElementById('statTotalApps');
    const statPendingApps = document.getElementById('statPendingApps');
    const statAcceptedApps = document.getElementById('statAcceptedApps');
    const statTotalInquiries = document.getElementById('statTotalInquiries');
    const statUnreadInquiries = document.getElementById('statUnreadInquiries');

    if (statTotalJobs) statTotalJobs.textContent = stats.totalJobs;
    if (statActiveInternships) statActiveInternships.textContent = `${stats.activeInternships} Active Internships`;
    if (statTotalApps) statTotalApps.textContent = stats.totalApplications;
    if (statPendingApps) statPendingApps.textContent = `${stats.pendingApplications} Pending Reviews`;
    if (statAcceptedApps) statAcceptedApps.textContent = stats.acceptedApplications;
    if (statTotalInquiries) statTotalInquiries.textContent = stats.totalInquiries;
    if (statUnreadInquiries) statUnreadInquiries.textContent = `${stats.unreadInquiries} New Inquiries`;
  }

  function renderRecentDashboard() {
    const apps = DataStore.getApplications();
    const inquiries = DataStore.getInquiries();

    // Recent Apps
    const recentAppsBody = document.getElementById('recentAppsTableBody');
    if (recentAppsBody) {
      const recent = apps.slice(0, 4);
      if (recent.length === 0) {
        recentAppsBody.innerHTML = `<tr><td colspan="6" class="empty-table-state">No student applications submitted yet.</td></tr>`;
      } else {
        recentAppsBody.innerHTML = recent.map(app => `
          <tr>
            <td>
              <strong>${app.candidateName}</strong><br>
              <small style="color:var(--admin-text-muted);">${app.candidateEmail}</small>
            </td>
            <td><strong>${app.jobTitle}</strong></td>
            <td>${app.company}</td>
            <td>${formatDate(app.appliedDate)}</td>
            <td><span class="status-pill status-${app.status.toLowerCase()}">${app.status}</span></td>
            <td>
              <button class="btn btn-outline btn-sm view-app-btn" data-id="${app.id}">View Dossier</button>
            </td>
          </tr>
        `).join('');
      }
    }

    // Recent Inquiries
    const recentInqBody = document.getElementById('recentInquiriesTableBody');
    if (recentInqBody) {
      const recent = inquiries.slice(0, 4);
      if (recent.length === 0) {
        recentInqBody.innerHTML = `<tr><td colspan="6" class="empty-table-state">No advisory messages received.</td></tr>`;
      } else {
        recentInqBody.innerHTML = recent.map(inq => `
          <tr>
            <td>
              <strong>${inq.name}</strong><br>
              <small style="color:var(--admin-text-muted);">${inq.email}</small>
            </td>
            <td><span class="status-pill" style="background:var(--admin-bg);">${inq.role}</span></td>
            <td>${inq.subject}</td>
            <td>${formatDate(inq.date)}</td>
            <td><span class="status-pill status-${inq.status.toLowerCase()}">${inq.status}</span></td>
            <td>
              <button class="btn btn-outline btn-sm" onclick="switchTab('tab-inquiries')">Open Inbox</button>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  // Jobs Manager Table
  const adminJobSearch = document.getElementById('adminJobSearch');
  const adminJobTypeFilter = document.getElementById('adminJobTypeFilter');
  const adminJobDeptFilter = document.getElementById('adminJobDeptFilter');
  const adminJobsTableBody = document.getElementById('adminJobsTableBody');

  function renderJobsTable() {
    if (!adminJobsTableBody) return;
    const query = adminJobSearch ? adminJobSearch.value.toLowerCase().trim() : '';
    const type = adminJobTypeFilter ? adminJobTypeFilter.value : 'all';
    const dept = adminJobDeptFilter ? adminJobDeptFilter.value : 'all';

    let jobs = DataStore.getJobs();

    if (query) {
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(query) ||
        j.company.toLowerCase().includes(query) ||
        j.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    if (type !== 'all') {
      jobs = jobs.filter(j => j.type === type);
    }
    if (dept !== 'all') {
      jobs = jobs.filter(j => j.department === dept);
    }

    if (jobs.length === 0) {
      adminJobsTableBody.innerHTML = `<tr><td colspan="7" class="empty-table-state">No matching opportunities found.</td></tr>`;
      return;
    }

    adminJobsTableBody.innerHTML = jobs.map(job => `
      <tr>
        <td>
          <div class="company-cell">
            <div class="company-mini-logo" style="background-color:${job.logoBg || '#4f46e5'};">
              ${job.logoText || 'CP'}
            </div>
            <div class="company-title-wrap">
              <strong>${job.title}</strong>
              <span>${job.company}</span>
            </div>
          </div>
        </td>
        <td>${job.department}</td>
        <td><span class="status-pill" style="background:var(--admin-primary-light); color:var(--admin-primary);">${job.type}</span></td>
        <td>${job.location} <small>(${job.setting})</small></td>
        <td><strong>${job.stipend}</strong></td>
        <td>${job.deadline}</td>
        <td>
          <div class="action-btn-group">
            <button class="icon-action-btn edit-job-btn" data-id="${job.id}" title="Edit Job">
              <i data-lucide="pencil"></i>
            </button>
            <button class="icon-action-btn btn-delete delete-job-btn" data-id="${job.id}" title="Delete Job">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach listeners
    adminJobsTableBody.querySelectorAll('.edit-job-btn').forEach(btn => {
      btn.addEventListener('click', () => openEditJobModal(btn.getAttribute('data-id')));
    });

    adminJobsTableBody.querySelectorAll('.delete-job-btn').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteJob(btn.getAttribute('data-id')));
    });

    if (window.lucide) lucide.createIcons();
  }

  if (adminJobSearch) adminJobSearch.addEventListener('input', renderJobsTable);
  if (adminJobTypeFilter) adminJobTypeFilter.addEventListener('change', renderJobsTable);
  if (adminJobDeptFilter) adminJobDeptFilter.addEventListener('change', renderJobsTable);

  // Applications Table
  const adminAppSearch = document.getElementById('adminAppSearch');
  const adminAppStatusFilter = document.getElementById('adminAppStatusFilter');
  const adminAppsTableBody = document.getElementById('adminAppsTableBody');
  const appsCountLabel = document.getElementById('appsCountLabel');

  function renderApplicationsTable() {
    if (!adminAppsTableBody) return;
    const query = adminAppSearch ? adminAppSearch.value.toLowerCase().trim() : '';
    const statusFilter = adminAppStatusFilter ? adminAppStatusFilter.value : 'all';

    let apps = DataStore.getApplications();

    if (query) {
      apps = apps.filter(a => 
        a.candidateName.toLowerCase().includes(query) ||
        a.candidateEmail.toLowerCase().includes(query) ||
        a.jobTitle.toLowerCase().includes(query) ||
        a.company.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      apps = apps.filter(a => a.status === statusFilter);
    }

    if (appsCountLabel) {
      appsCountLabel.textContent = `${apps.length} Applications on file`;
    }

    if (apps.length === 0) {
      adminAppsTableBody.innerHTML = `<tr><td colspan="6" class="empty-table-state">No matching student applications found.</td></tr>`;
      return;
    }

    adminAppsTableBody.innerHTML = apps.map(app => `
      <tr>
        <td>
          <strong>${app.candidateName}</strong><br>
          <small style="color:var(--admin-text-muted);">${app.candidateEmail}</small>
        </td>
        <td><strong>${app.jobTitle}</strong></td>
        <td>${app.company}</td>
        <td>${formatDate(app.appliedDate)}</td>
        <td>
          <select class="admin-select change-app-status-select" data-id="${app.id}" style="padding:4px 8px; font-size:0.8rem; font-weight:700;">
            <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
            <option value="Reviewing" ${app.status === 'Reviewing' ? 'selected' : ''}>🔍 Reviewing</option>
            <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>✅ Accepted</option>
            <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>❌ Rejected</option>
          </select>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn btn-outline btn-sm view-app-btn" data-id="${app.id}" title="View Application">
              <i data-lucide="eye" style="width:14px;height:14px;"></i> View
            </button>
            <button class="icon-action-btn btn-delete delete-app-btn" data-id="${app.id}" title="Delete Application">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach status dropdown change listeners
    adminAppsTableBody.querySelectorAll('.change-app-status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const appId = select.getAttribute('data-id');
        const newStatus = e.target.value;
        DataStore.updateApplicationStatus(appId, newStatus);
        showToast(`Application status updated to "${newStatus}"`, 'success');
        renderStats();
      });
    });

    // View & Delete listeners
    adminAppsTableBody.querySelectorAll('.view-app-btn').forEach(btn => {
      btn.addEventListener('click', () => openAppDetailModal(btn.getAttribute('data-id')));
    });

    adminAppsTableBody.querySelectorAll('.delete-app-btn').forEach(btn => {
      btn.addEventListener('click', () => handleDeleteApp(btn.getAttribute('data-id')));
    });

    if (window.lucide) lucide.createIcons();
  }

  if (adminAppSearch) adminAppSearch.addEventListener('input', renderApplicationsTable);
  if (adminAppStatusFilter) adminAppStatusFilter.addEventListener('change', renderApplicationsTable);

  // Inquiries Inbox Table
  const adminInquiriesTableBody = document.getElementById('adminInquiriesTableBody');
  const inquiriesCountLabel = document.getElementById('inquiriesCountLabel');

  function renderInquiriesTable() {
    if (!adminInquiriesTableBody) return;
    const inquiries = DataStore.getInquiries();

    if (inquiriesCountLabel) {
      inquiriesCountLabel.textContent = `${inquiries.length} Total Inquiries`;
    }

    if (inquiries.length === 0) {
      adminInquiriesTableBody.innerHTML = `<tr><td colspan="7" class="empty-table-state">No inquiries received yet.</td></tr>`;
      return;
    }

    adminInquiriesTableBody.innerHTML = inquiries.map(inq => `
      <tr>
        <td>
          <strong>${inq.name}</strong><br>
          <small><a href="mailto:${inq.email}" style="color:var(--admin-primary); text-decoration:none;">${inq.email}</a></small>
        </td>
        <td><span class="status-pill" style="background:var(--admin-bg);">${inq.role}</span></td>
        <td><strong>${inq.category}</strong></td>
        <td style="max-width:320px;">
          <strong>${inq.subject}</strong><br>
          <span style="font-size:0.8rem; color:var(--admin-text-muted); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
            ${inq.message}
          </span>
        </td>
        <td>${formatDate(inq.date)}</td>
        <td>
          <span class="status-pill status-${inq.status.toLowerCase()}">${inq.status}</span>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn btn-outline btn-sm toggle-reply-btn" data-id="${inq.id}">
              ${inq.status === 'Replied' ? 'Mark Unread' : 'Mark Replied'}
            </button>
            <button class="icon-action-btn btn-delete delete-inq-btn" data-id="${inq.id}">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    adminInquiriesTableBody.querySelectorAll('.toggle-reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const inqId = btn.getAttribute('data-id');
        const inq = DataStore.getInquiries().find(i => i.id === inqId);
        if (inq) {
          const nextStatus = inq.status === 'Replied' ? 'Unread' : 'Replied';
          DataStore.updateInquiryStatus(inqId, nextStatus);
          showToast(`Inquiry marked as ${nextStatus}`, 'info');
          renderAllViews();
        }
      });
    });

    adminInquiriesTableBody.querySelectorAll('.delete-inq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this inquiry?')) {
          DataStore.deleteInquiry(btn.getAttribute('data-id'));
          showToast('Inquiry deleted', 'info');
          renderAllViews();
        }
      });
    });

    if (window.lucide) lucide.createIcons();
  }

  function renderAllViews() {
    renderStats();
    renderRecentDashboard();
    renderJobsTable();
    renderApplicationsTable();
    renderInquiriesTable();
    // Also attach view app detail buttons on dashboard recent table
    document.querySelectorAll('#recentAppsTableBody .view-app-btn').forEach(btn => {
      btn.addEventListener('click', () => openAppDetailModal(btn.getAttribute('data-id')));
    });
  }

  // ==========================================
  // JOB MODAL (CREATE & EDIT)
  // ==========================================
  const jobModal = document.getElementById('jobModal');
  const jobForm = document.getElementById('jobForm');
  const postJobModalBtn = document.getElementById('postJobModalBtn');
  const quickPostJobBtn = document.getElementById('quickPostJobBtn');
  const closeJobModalBtn = document.getElementById('closeJobModalBtn');
  const cancelJobModalBtn = document.getElementById('cancelJobModalBtn');
  const jobModalHeading = document.getElementById('jobModalHeading');

  const jobFormId = document.getElementById('jobFormId');
  const jobFormTitle = document.getElementById('jobFormTitle');
  const jobFormCompany = document.getElementById('jobFormCompany');
  const jobFormType = document.getElementById('jobFormType');
  const jobFormDepartment = document.getElementById('jobFormDepartment');
  const jobFormLocation = document.getElementById('jobFormLocation');
  const jobFormSetting = document.getElementById('jobFormSetting');
  const jobFormStipend = document.getElementById('jobFormStipend');
  const jobFormDeadline = document.getElementById('jobFormDeadline');
  const jobFormTags = document.getElementById('jobFormTags');
  const jobFormDesc = document.getElementById('jobFormDesc');

  function openCreateJobModal() {
    jobEditingId = null;
    jobForm.reset();
    jobFormId.value = '';
    jobModalHeading.textContent = 'Post New Opportunity';
    jobModal.style.display = 'flex';
  }

  function openEditJobModal(jobId) {
    const job = DataStore.getJobs().find(j => j.id === jobId);
    if (!job) return;

    jobEditingId = jobId;
    jobFormId.value = job.id;
    jobFormTitle.value = job.title;
    jobFormCompany.value = job.company;
    jobFormType.value = job.type;
    jobFormDepartment.value = job.department;
    jobFormLocation.value = job.location;
    jobFormSetting.value = job.setting;
    jobFormStipend.value = job.stipend;
    jobFormDeadline.value = job.deadline;
    jobFormTags.value = job.tags ? job.tags.join(', ') : '';
    jobFormDesc.value = job.description;

    jobModalHeading.textContent = `Edit Opportunity • ${job.company}`;
    jobModal.style.display = 'flex';
  }

  function closeJobModal() {
    jobModal.style.display = 'none';
    jobEditingId = null;
  }

  if (postJobModalBtn) postJobModalBtn.addEventListener('click', openCreateJobModal);
  if (quickPostJobBtn) quickPostJobBtn.addEventListener('click', openCreateJobModal);
  if (closeJobModalBtn) closeJobModalBtn.addEventListener('click', closeJobModal);
  if (cancelJobModalBtn) cancelJobModalBtn.addEventListener('click', closeJobModal);

  if (jobForm) {
    jobForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!jobFormTitle.value.trim() || !jobFormCompany.value.trim() || !jobFormDesc.value.trim()) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const tagsArray = jobFormTags.value
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const jobData = {
        title: jobFormTitle.value.trim(),
        company: jobFormCompany.value.trim(),
        logoBg: "#4f46e5",
        logoText: jobFormCompany.value.trim().substring(0, 2).toUpperCase(),
        location: jobFormLocation.value.trim(),
        setting: jobFormSetting.value,
        type: jobFormType.value,
        department: jobFormDepartment.value,
        stipend: jobFormStipend.value.trim(),
        stipendValue: parseInt(jobFormStipend.value.replace(/[^0-9]/g, '')) || 40,
        deadline: jobFormDeadline.value.trim(),
        urgency: "New Posting",
        tags: tagsArray.length > 0 ? tagsArray : ["Full-Stack", "Technology"],
        description: jobFormDesc.value.trim(),
        requirements: [
          `Enrolled student pursuing a degree related to ${jobFormDepartment.value}.`,
          `Practical proficiency with ${tagsArray.join(', ') || 'modern engineering toolchains'}.`,
          `Strong communication and team collaboration abilities.`
        ],
        benefits: [
          `Competitive pay (${jobFormStipend.value.trim()}).`,
          `Executive 1-on-1 mentorship and return offer opportunities.`
        ]
      };

      if (jobEditingId) {
        DataStore.updateJob(jobEditingId, jobData);
        showToast(`Opportunity "${jobData.title}" updated successfully!`, 'success');
      } else {
        DataStore.addJob(jobData);
        showToast(`New opportunity posted! It is now live on the student portal.`, 'success');
      }

      closeJobModal();
      renderAllViews();
    });
  }

  function handleDeleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job posting? It will be removed from the public website.')) {
      DataStore.deleteJob(jobId);
      showToast('Opportunity removed successfully.', 'info');
      renderAllViews();
    }
  }

  // ==========================================
  // APPLICATION DETAIL MODAL
  // ==========================================
  const appDetailModal = document.getElementById('appDetailModal');
  const appDetailBody = document.getElementById('appDetailBody');
  const closeAppDetailBtn = document.getElementById('closeAppDetailBtn');
  const dismissAppDetailBtn = document.getElementById('dismissAppDetailBtn');

  function openAppDetailModal(appId) {
    const app = DataStore.getApplications().find(a => a.id === appId);
    if (!app) return;

    appDetailBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid var(--admin-border);">
        <div>
          <h2 style="font-size:1.35rem; margin-bottom:4px;">${app.candidateName}</h2>
          <p style="color:var(--admin-text-muted); font-size:0.9rem;">
            ${app.candidateEmail} &bull; ${app.candidatePhone || 'No phone provided'}
          </p>
        </div>
        <span class="status-pill status-${app.status.toLowerCase()}">${app.status}</span>
      </div>

      <div style="margin-bottom:16px;">
        <strong style="display:block; font-size:0.85rem; color:var(--admin-text-muted); text-transform:uppercase;">Applied For:</strong>
        <p style="font-size:1rem; font-weight:700;">${app.jobTitle} at ${app.company}</p>
        <p style="font-size:0.8rem; color:var(--admin-text-muted);">Submitted: ${formatDate(app.appliedDate)}</p>
      </div>

      <div style="margin-bottom:16px;">
        <strong style="display:block; font-size:0.85rem; color:var(--admin-text-muted); text-transform:uppercase;">Portfolio / Links:</strong>
        <p><a href="${app.portfolioUrl || '#'}" target="_blank" style="color:var(--admin-primary);">${app.portfolioUrl || 'None specified'}</a></p>
      </div>

      <div style="margin-bottom:16px;">
        <strong style="display:block; font-size:0.85rem; color:var(--admin-text-muted); text-transform:uppercase;">Attached Resume:</strong>
        <p style="display:flex; align-items:center; gap:8px;">
          <i data-lucide="file-text" style="width:16px;height:16px;color:var(--admin-primary);"></i>
          <span>${app.resumeFileName || 'Alex_Rivera_Resume_2026.pdf'}</span>
        </p>
      </div>

      <div style="margin-bottom:20px;">
        <strong style="display:block; font-size:0.85rem; color:var(--admin-text-muted); text-transform:uppercase;">Candidate Statement:</strong>
        <div style="padding:14px; background:var(--admin-bg); border-radius:var(--radius-md); font-size:0.9rem; line-height:1.6; margin-top:6px;">
          ${app.coverNote || 'No cover note provided.'}
        </div>
      </div>
    `;

    appDetailModal.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
  }

  function closeAppDetailModal() {
    appDetailModal.style.display = 'none';
  }

  if (closeAppDetailBtn) closeAppDetailBtn.addEventListener('click', closeAppDetailModal);
  if (dismissAppDetailBtn) dismissAppDetailBtn.addEventListener('click', closeAppDetailModal);

  function handleDeleteApp(appId) {
    if (confirm('Delete this student application record?')) {
      DataStore.deleteApplication(appId);
      showToast('Application deleted.', 'info');
      renderAllViews();
    }
  }

  // Reset Data Handler in Settings
  const resetDataBtn = document.getElementById('resetDataBtn');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      if (confirm('Reset all jobs, applications, and messages back to factory demo defaults?')) {
        DataStore.resetAllData();
        showToast('All demo data restored!', 'success');
        renderAllViews();
      }
    });
  }

  // Toast System
  function showToast(message, type = 'info') {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function formatDate(isoStr) {
    if (!isoStr) return 'N/A';
    const date = new Date(isoStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Close modals on overlay backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === jobModal) closeJobModal();
    if (e.target === appDetailModal) closeAppDetailModal();
  });

  // Initial Render
  renderAllViews();
});
