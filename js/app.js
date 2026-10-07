/**
 * CareerPulse - Modern Student Career & Internship Portal
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // State Management
  const AppState = {
    theme: localStorage.getItem('cp_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    profile: DataStore.getProfile(),
    savedJobIds: DataStore.getSavedJobIds(),
    activeSkillCategory: 'all',
    activeProjectCategory: 'all',
    projectSearchQuery: '',
    jobSearchQuery: '',
    jobTypeFilter: 'all',
    jobLocationFilter: 'all',
    jobDepartmentFilter: 'all',
    jobSortOrder: 'newest',
    showSavedJobsOnly: false
  };

  // ==========================================
  // 1. THEME MANAGER
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cp_theme', theme);
    AppState.theme = theme;
    if (window.lucide) lucide.createIcons();
  }

  applyTheme(AppState.theme);

  themeToggleBtn.addEventListener('click', () => {
    const nextTheme = AppState.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  });

  // ==========================================
  // 2. NAVIGATION & MOBILE DRAWER
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking a link
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside navbar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#navbar') && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Quick profile nav button
  const quickProfileBtn = document.getElementById('quickProfileBtn');
  if (quickProfileBtn) {
    quickProfileBtn.addEventListener('click', () => {
      const profileSection = document.getElementById('profile');
      if (profileSection) {
        profileSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================
  // 3. STUDENT PROFILE SYSTEM
  // ==========================================
  function renderStudentProfile() {
    const p = AppState.profile;

    // Hero card elements
    const heroName = document.getElementById('heroCardName');
    const heroRole = document.getElementById('heroCardRole');
    if (heroName) heroName.textContent = p.name;
    if (heroRole) heroRole.textContent = p.degree;

    // Sidebar card elements
    const profileName = document.getElementById('profileName');
    const profileHeadline = document.getElementById('profileHeadline');
    const profileLocation = document.getElementById('profileLocation');
    const profileGpa = document.getElementById('profileGpa');
    const profileBioText = document.getElementById('profileBioText');
    const resumeDocName = document.getElementById('resumeDocName');

    if (profileName) profileName.textContent = p.name;
    if (profileHeadline) profileHeadline.textContent = p.headline;
    if (profileLocation) profileLocation.textContent = p.location;
    if (profileGpa) profileGpa.textContent = p.gpa;
    if (profileBioText) profileBioText.textContent = p.bio;
    if (resumeDocName) resumeDocName.textContent = p.name;

    // Pre-fill application form with profile data
    const applyFullName = document.getElementById('applyFullName');
    const applyEmail = document.getElementById('applyEmail');
    if (applyFullName) applyFullName.value = p.name;
    if (applyEmail) applyEmail.value = p.email;
  }

  renderStudentProfile();

  // Profile Tabs
  const profileTabBtns = document.querySelectorAll('.tab-btn');
  const profileTabPanes = document.querySelectorAll('.tab-pane');

  profileTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      profileTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      profileTabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePane = document.getElementById(targetTabId);
      if (activePane) activePane.classList.add('active');

      if (window.lucide) lucide.createIcons();
    });
  });

  // Edit Profile Modal Elements
  const editProfileModal = document.getElementById('editProfileModal');
  const openEditProfileBtn = document.getElementById('openEditProfileBtn');
  const closeEditProfileBtn = document.getElementById('closeEditProfileBtn');
  const cancelEditProfileBtn = document.getElementById('cancelEditProfileBtn');
  const editProfileForm = document.getElementById('editProfileForm');

  const editName = document.getElementById('editName');
  const editHeadline = document.getElementById('editHeadline');
  const editGpa = document.getElementById('editGpa');
  const editLocation = document.getElementById('editLocation');
  const editBio = document.getElementById('editBio');

  function openEditModal() {
    const p = AppState.profile;
    editName.value = p.name;
    editHeadline.value = p.headline;
    editGpa.value = p.gpa;
    editLocation.value = p.location;
    editBio.value = p.bio;

    // Clear previous errors
    clearFormErrors(editProfileForm);
    openModal(editProfileModal);
  }

  if (openEditProfileBtn) openEditProfileBtn.addEventListener('click', openEditModal);
  if (closeEditProfileBtn) closeEditProfileBtn.addEventListener('click', () => closeModal(editProfileModal));
  if (cancelEditProfileBtn) cancelEditProfileBtn.addEventListener('click', () => closeModal(editProfileModal));

  // Edit Profile Form Submission with Validation
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!editName.value.trim() || editName.value.trim().length < 3) {
        showInputError(editName, 'editNameError');
        isValid = false;
      } else {
        clearInputError(editName, 'editNameError');
      }

      if (!editHeadline.value.trim() || editHeadline.value.trim().length < 5) {
        showInputError(editHeadline, 'editHeadlineError');
        isValid = false;
      } else {
        clearInputError(editHeadline, 'editHeadlineError');
      }

      const gpaNum = parseFloat(editGpa.value);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
        showInputError(editGpa, 'editGpaError');
        isValid = false;
      } else {
        clearInputError(editGpa, 'editGpaError');
      }

      if (!editLocation.value.trim()) {
        showInputError(editLocation, 'editLocationError');
        isValid = false;
      } else {
        clearInputError(editLocation, 'editLocationError');
      }

      if (!editBio.value.trim() || editBio.value.trim().length < 20) {
        showInputError(editBio, 'editBioError');
        isValid = false;
      } else {
        clearInputError(editBio, 'editBioError');
      }

      if (isValid) {
        AppState.profile.name = editName.value.trim();
        AppState.profile.headline = editHeadline.value.trim();
        AppState.profile.gpa = parseFloat(editGpa.value).toFixed(2);
        AppState.profile.location = editLocation.value.trim();
        AppState.profile.bio = editBio.value.trim();

        DataStore.saveProfile(AppState.profile);
        renderStudentProfile();
        closeModal(editProfileModal);
        showToast('Profile updated successfully!', 'success');
      }
    });
  }

  // Resume Preview & Download Modals
  const resumePreviewModal = document.getElementById('resumePreviewModal');
  const previewResumeBtn = document.getElementById('previewResumeBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  const downloadResumeModalBtn = document.getElementById('downloadResumeModalBtn');
  const footerResumeLink = document.getElementById('footerResumeLink');

  if (previewResumeBtn) previewResumeBtn.addEventListener('click', () => openModal(resumePreviewModal));
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', () => closeModal(resumePreviewModal));
  if (footerResumeLink) footerResumeLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(resumePreviewModal);
  });

  function triggerResumeDownload() {
    showToast(`Downloading Alex_Rivera_Resume_2026.pdf...`, 'info');
    setTimeout(() => {
      showToast('Resume downloaded successfully!', 'success');
    }, 1200);
  }

  if (downloadResumeBtn) downloadResumeBtn.addEventListener('click', triggerResumeDownload);
  if (downloadResumeModalBtn) downloadResumeModalBtn.addEventListener('click', triggerResumeDownload);

  // ==========================================
  // 4. SKILLS SECTION RENDERING & FILTERING
  // ==========================================
  const skillsGridContainer = document.getElementById('skillsGridContainer');
  const skillsFilterPills = document.querySelectorAll('#skillsFilterPills .filter-pill');

  function renderSkills() {
    if (!skillsGridContainer) return;
    const category = AppState.activeSkillCategory;

    const filtered = category === 'all' 
      ? INITIAL_SKILLS 
      : INITIAL_SKILLS.filter(s => s.category === category);

    skillsGridContainer.innerHTML = filtered.map(skill => `
      <div class="skill-card">
        <div class="skill-card-top">
          <div>
            <h4 class="skill-name">${skill.name}</h4>
            <span class="skill-exp-badge">${skill.experience}</span>
          </div>
          <span class="badge ${skill.level === 'Expert' ? 'badge-accent' : 'badge-accent'}">${skill.level}</span>
        </div>
        <p class="skill-desc">${skill.description}</p>
        <div class="skill-bar-wrap">
          <div class="skill-bar-meta">
            <span>Proficiency</span>
            <span>${skill.proficiency}%</span>
          </div>
          <div class="skill-progress-bar">
            <div class="skill-progress-fill" style="width: ${skill.proficiency}%;"></div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  skillsFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      skillsFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.activeSkillCategory = pill.getAttribute('data-category');
      renderSkills();
    });
  });

  renderSkills();

  // ==========================================
  // 5. PROJECTS SECTION SEARCH & FILTERING
  // ==========================================
  const projectsGridContainer = document.getElementById('projectsGridContainer');
  const projectSearchInput = document.getElementById('projectSearchInput');
  const clearProjectSearchBtn = document.getElementById('clearProjectSearchBtn');
  const projectCategoryFilters = document.querySelectorAll('#projectCategoryFilter .filter-pill');
  const projectsEmptyState = document.getElementById('projectsEmptyState');
  const resetProjectsFilterBtn = document.getElementById('resetProjectsFilterBtn');

  // Project Details Modal Elements
  const projectModal = document.getElementById('projectModal');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalCategory = document.getElementById('projectModalCategory');
  const projectModalImg = document.getElementById('projectModalImg');
  const projectModalTags = document.getElementById('projectModalTags');
  const projectModalDesc = document.getElementById('projectModalDesc');
  const projectModalHighlights = document.getElementById('projectModalHighlights');
  const projectModalLiveBtn = document.getElementById('projectModalLiveBtn');
  const projectModalGithubBtn = document.getElementById('projectModalGithubBtn');

  function renderProjects() {
    if (!projectsGridContainer) return;
    const category = AppState.activeProjectCategory;
    const query = AppState.projectSearchQuery.toLowerCase().trim();

    const filtered = INITIAL_PROJECTS.filter(project => {
      const matchCategory = category === 'all' || project.category === category;
      const matchQuery = !query || 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query));
      return matchCategory && matchQuery;
    });

    if (filtered.length === 0) {
      projectsGridContainer.innerHTML = '';
      projectsEmptyState.style.display = 'block';
      return;
    }

    projectsEmptyState.style.display = 'none';

    projectsGridContainer.innerHTML = filtered.map(proj => `
      <div class="project-card" data-project-id="${proj.id}">
        <div class="project-img-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-img" loading="lazy">
          <span class="project-badge-pill">${proj.badge}</span>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${proj.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            ${proj.tags.length > 3 ? `<span class="project-tag">+${proj.tags.length - 3}</span>` : ''}
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-metric">
            <i data-lucide="sparkles" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i>
            <span>${proj.metrics}</span>
          </div>
          <div class="project-actions">
            <button class="btn btn-primary btn-sm view-project-btn" data-id="${proj.id}">
              <i data-lucide="eye"></i>
              <span>View Details</span>
            </button>
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" title="View Source">
              <i data-lucide="github"></i>
              <span>Code</span>
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to "View Details" buttons
    const viewButtons = projectsGridContainer.querySelectorAll('.view-project-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-id');
        openProjectDetailsModal(projId);
      });
    });

    if (window.lucide) lucide.createIcons();
  }

  function openProjectDetailsModal(projId) {
    const proj = INITIAL_PROJECTS.find(p => p.id === projId);
    if (!proj) return;

    projectModalTitle.innerHTML = proj.title;
    projectModalCategory.textContent = `${proj.badge} • ${proj.tags.join(', ')}`;
    projectModalImg.src = proj.image;
    projectModalImg.alt = proj.title;
    projectModalDesc.textContent = proj.overview;

    projectModalTags.innerHTML = proj.tags.map(tag => `<span class="badge badge-accent">${tag}</span>`).join('');
    projectModalHighlights.innerHTML = proj.highlights.map(h => `<li>${h}</li>`).join('');

    projectModalLiveBtn.href = proj.demoUrl;
    projectModalGithubBtn.href = proj.githubUrl;

    openModal(projectModal);
  }

  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', () => closeModal(projectModal));

  // Project Category Filters
  projectCategoryFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      projectCategoryFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.activeProjectCategory = pill.getAttribute('data-filter');
      renderProjects();
    });
  });

  // Project Search Input
  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', (e) => {
      AppState.projectSearchQuery = e.target.value;
      if (clearProjectSearchBtn) {
        clearProjectSearchBtn.style.display = e.target.value ? 'block' : 'none';
      }
      renderProjects();
    });
  }

  if (clearProjectSearchBtn) {
    clearProjectSearchBtn.addEventListener('click', () => {
      projectSearchInput.value = '';
      AppState.projectSearchQuery = '';
      clearProjectSearchBtn.style.display = 'none';
      renderProjects();
    });
  }

  if (resetProjectsFilterBtn) {
    resetProjectsFilterBtn.addEventListener('click', () => {
      AppState.activeProjectCategory = 'all';
      AppState.projectSearchQuery = '';
      if (projectSearchInput) projectSearchInput.value = '';
      if (clearProjectSearchBtn) clearProjectSearchBtn.style.display = 'none';
      projectCategoryFilters.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
      renderProjects();
    });
  }

  renderProjects();

  // ==========================================
  // 6. JOBS & INTERNSHIPS BOARD
  // ==========================================
  const jobsGridContainer = document.getElementById('jobsGridContainer');
  const jobSearchInput = document.getElementById('jobSearchInput');
  const clearJobSearchBtn = document.getElementById('clearJobSearchBtn');
  const jobTypeFilter = document.getElementById('jobTypeFilter');
  const jobLocationFilter = document.getElementById('jobLocationFilter');
  const jobSortFilter = document.getElementById('jobSortFilter');
  const jobCategoryTags = document.querySelectorAll('#jobCategoryTags .sub-pill');
  const bookmarkedOnlyToggleBtn = document.getElementById('bookmarkedOnlyToggleBtn');
  const savedJobsToggleBtn = document.getElementById('savedJobsToggleBtn');
  const savedJobsCounter = document.getElementById('savedJobsCounter');
  const savedCountLabel = document.getElementById('savedCountLabel');
  const jobsResultCount = document.getElementById('jobsResultCount');
  const jobsEmptyState = document.getElementById('jobsEmptyState');
  const jobsEmptyResetBtn = document.getElementById('jobsEmptyResetBtn');
  const resetAllJobsFiltersBtn = document.getElementById('resetAllJobsFiltersBtn');

  // Job Application Modal Elements
  const jobModal = document.getElementById('jobModal');
  const closeJobModalBtn = document.getElementById('closeJobModalBtn');
  const cancelApplyBtn = document.getElementById('cancelApplyBtn');
  const jobApplicationForm = document.getElementById('jobApplicationForm');
  const jobModalTitle = document.getElementById('jobModalTitle');
  const jobModalSubtitle = document.getElementById('jobModalSubtitle');
  const jobModalLogo = document.getElementById('jobModalLogo');
  const jobModalMetaRow = document.getElementById('jobModalMetaRow');
  const jobModalDescription = document.getElementById('jobModalDescription');
  const jobModalRequirements = document.getElementById('jobModalRequirements');
  const applyJobId = document.getElementById('applyJobId');

  // File Upload Drop Zone
  const fileDropZone = document.getElementById('fileDropZone');
  const applyResumeFile = document.getElementById('applyResumeFile');
  const browseFileBtn = document.getElementById('browseFileBtn');
  const fileDropLabel = document.getElementById('fileDropLabel');

  if (browseFileBtn && applyResumeFile) {
    browseFileBtn.addEventListener('click', () => applyResumeFile.click());
    applyResumeFile.addEventListener('change', () => {
      if (applyResumeFile.files && applyResumeFile.files[0]) {
        fileDropLabel.textContent = `${applyResumeFile.files[0].name} (${(applyResumeFile.files[0].size / 1024).toFixed(1)} KB)`;
      }
    });
  }

  function updateSavedCounters() {
    const count = AppState.savedJobIds.length;
    if (savedJobsCounter) savedJobsCounter.textContent = count;
    if (savedCountLabel) savedCountLabel.textContent = count;
    DataStore.saveSavedJobIds(AppState.savedJobIds);
  }

  updateSavedCounters();

  function renderJobs() {
    if (!jobsGridContainer) return;
    const query = AppState.jobSearchQuery.toLowerCase().trim();
    const type = AppState.jobTypeFilter;
    const loc = AppState.jobLocationFilter;
    const dept = AppState.jobDepartmentFilter;
    const sort = AppState.jobSortOrder;
    const savedOnly = AppState.showSavedJobsOnly;

    let filtered = DataStore.getJobs().filter(job => {
      // Keyword Match
      const matchQuery = !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.tags.some(t => t.toLowerCase().includes(query));

      // Employment Type Match
      const matchType = type === 'all' || job.type === type;

      // Location Match
      const matchLoc = loc === 'all' || 
        (loc === 'Remote' ? job.setting === 'Remote' : 
         loc === 'Hybrid' ? job.setting === 'Hybrid' : 
         job.location.includes(loc));

      // Department Match
      const matchDept = dept === 'all' || job.department === dept;

      // Saved Filter Match
      const matchSaved = !savedOnly || AppState.savedJobIds.includes(job.id);

      return matchQuery && matchType && matchLoc && matchDept && matchSaved;
    });

    // Sorting
    if (sort === 'stipend-high') {
      filtered.sort((a, b) => b.stipendValue - a.stipendValue);
    } else if (sort === 'deadline') {
      filtered.sort((a, b) => a.deadline.localeCompare(b.deadline));
    } else {
      // Newest first
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    // Update Result Count
    if (jobsResultCount) {
      jobsResultCount.textContent = `Showing ${filtered.length} opportunit${filtered.length === 1 ? 'y' : 'ies'}`;
    }

    if (filtered.length === 0) {
      jobsGridContainer.innerHTML = '';
      jobsEmptyState.style.display = 'block';
      return;
    }

    jobsEmptyState.style.display = 'none';

    jobsGridContainer.innerHTML = filtered.map(job => {
      const isSaved = AppState.savedJobIds.includes(job.id);
      return `
        <div class="job-card" data-job-id="${job.id}">
          <div class="job-card-header">
            <div class="job-company-identity">
              <div class="company-logo-avatar" style="background-color: ${job.logoBg};">
                ${job.logoText}
              </div>
              <div>
                <span class="company-name">${job.company}</span>
                <span class="job-urgency-badge">${job.urgency}</span>
              </div>
            </div>
            <button class="bookmark-job-btn ${isSaved ? 'bookmarked' : ''}" data-job-id="${job.id}" title="${isSaved ? 'Remove Bookmark' : 'Save Job'}" aria-label="Bookmark Job">
              <i data-lucide="bookmark"></i>
            </button>
          </div>

          <h3 class="job-title">${job.title}</h3>

          <div class="job-meta-chips">
            <span class="job-meta-chip">
              <i data-lucide="map-pin"></i> ${job.location} (${job.setting})
            </span>
            <span class="job-meta-chip">
              <i data-lucide="briefcase"></i> ${job.type}
            </span>
            <span class="job-meta-chip">
              <i data-lucide="clock"></i> Deadline: ${job.deadline}
            </span>
          </div>

          <p class="job-desc-snippet">${job.description}</p>

          <div class="job-tags-row">
            ${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
          </div>

          <div class="job-card-footer">
            <div class="job-stipend-wrap">
              <span class="job-stipend-amount">${job.stipend}</span>
              <span class="job-deadline-text">Posted ${formatRelativeDate(job.postedDate)}</span>
            </div>
            <div class="job-card-actions">
              <button class="btn btn-primary btn-sm apply-job-btn" data-job-id="${job.id}">
                <span>Apply Now</span>
                <i data-lucide="chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach event listeners to Bookmark buttons
    const bookmarkButtons = jobsGridContainer.querySelectorAll('.bookmark-job-btn');
    bookmarkButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jobId = btn.getAttribute('data-job-id');
        toggleBookmarkJob(jobId);
      });
    });

    // Attach event listeners to Apply buttons
    const applyButtons = jobsGridContainer.querySelectorAll('.apply-job-btn');
    applyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-job-id');
        openJobApplicationModal(jobId);
      });
    });

    if (window.lucide) lucide.createIcons();
  }

  function toggleBookmarkJob(jobId) {
    const index = AppState.savedJobIds.indexOf(jobId);
    if (index > -1) {
      AppState.savedJobIds.splice(index, 1);
      showToast('Removed from saved jobs', 'info');
    } else {
      AppState.savedJobIds.push(jobId);
      showToast('Saved to your bookmarked opportunities!', 'success');
    }
    updateSavedCounters();
    renderJobs();
  }

  function openJobApplicationModal(jobId) {
    const job = DataStore.getJobs().find(j => j.id === jobId);
    if (!job) return;

    applyJobId.value = job.id;
    jobModalTitle.textContent = job.title;
    jobModalSubtitle.textContent = `${job.company} • ${job.location} (${job.setting})`;
    jobModalLogo.textContent = job.logoText;
    jobModalLogo.style.backgroundColor = job.logoBg;

    jobModalMetaRow.innerHTML = `
      <span class="badge badge-accent"><i data-lucide="dollar-sign"></i> ${job.stipend}</span>
      <span class="badge badge-accent"><i data-lucide="briefcase"></i> ${job.type}</span>
      <span class="badge badge-accent"><i data-lucide="calendar"></i> Deadline: ${job.deadline}</span>
      <span class="badge badge-accent"><i data-lucide="layers"></i> ${job.department}</span>
    `;

    jobModalDescription.textContent = job.description;
    jobModalRequirements.innerHTML = `
      ${job.requirements.map(r => `<li>${r}</li>`).join('')}
      ${job.benefits.map(b => `<li><strong>Perk:</strong> ${b}</li>`).join('')}
    `;

    // Reset validation errors
    clearFormErrors(jobApplicationForm);
    openModal(jobModal);
    if (window.lucide) lucide.createIcons();
  }

  if (closeJobModalBtn) closeJobModalBtn.addEventListener('click', () => closeModal(jobModal));
  if (cancelApplyBtn) cancelApplyBtn.addEventListener('click', () => closeModal(jobModal));

  // Job Application Form Submission with Validation
  if (jobApplicationForm) {
    jobApplicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const applyFullName = document.getElementById('applyFullName');
      const applyEmail = document.getElementById('applyEmail');
      const applyPhone = document.getElementById('applyPhone');
      const applyNotes = document.getElementById('applyNotes');

      if (!applyFullName.value.trim() || applyFullName.value.trim().length < 2) {
        showInputError(applyFullName, 'applyNameError');
        isValid = false;
      } else {
        clearInputError(applyFullName, 'applyNameError');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!applyEmail.value.trim() || !emailRegex.test(applyEmail.value.trim())) {
        showInputError(applyEmail, 'applyEmailError');
        isValid = false;
      } else {
        clearInputError(applyEmail, 'applyEmailError');
      }

      const phoneRegex = /^[0-9\-\+\(\)\s]{8,}$/;
      if (!applyPhone.value.trim() || !phoneRegex.test(applyPhone.value.trim())) {
        showInputError(applyPhone, 'applyPhoneError');
        isValid = false;
      } else {
        clearInputError(applyPhone, 'applyPhoneError');
      }

      if (!applyNotes.value.trim() || applyNotes.value.trim().length < 15) {
        showInputError(applyNotes, 'applyNotesError');
        isValid = false;
      } else {
        clearInputError(applyNotes, 'applyNotesError');
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitApplyBtn');
        const origBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Submitting...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;

          // Save application into DataStore so Admin can see it!
          const appliedJob = DataStore.getJobs().find(j => j.id === applyJobId.value) || {};
          const portfolioElem = document.getElementById('applyPortfolio');
          DataStore.addApplication({
            jobId: applyJobId.value,
            jobTitle: jobModalTitle.textContent,
            company: appliedJob.company || "Company",
            candidateName: applyFullName.value.trim(),
            candidateEmail: applyEmail.value.trim(),
            candidatePhone: applyPhone.value.trim(),
            portfolioUrl: portfolioElem ? portfolioElem.value.trim() : '',
            resumeFileName: fileDropLabel ? fileDropLabel.textContent : 'Resume.pdf',
            coverNote: applyNotes.value.trim()
          });

          closeModal(jobModal);
          jobApplicationForm.reset();
          // Restore default profile data
          applyFullName.value = AppState.profile.name;
          applyEmail.value = AppState.profile.email;
          showToast(`Application successfully sent to ${jobModalTitle.textContent}! Check your inbox for confirmation.`, 'success');
        }, 900);
      }
    });
  }

  // Job Search & Filters event handlers
  if (jobSearchInput) {
    jobSearchInput.addEventListener('input', (e) => {
      AppState.jobSearchQuery = e.target.value;
      if (clearJobSearchBtn) clearJobSearchBtn.style.display = e.target.value ? 'block' : 'none';
      renderJobs();
    });
  }

  if (clearJobSearchBtn) {
    clearJobSearchBtn.addEventListener('click', () => {
      jobSearchInput.value = '';
      AppState.jobSearchQuery = '';
      clearJobSearchBtn.style.display = 'none';
      renderJobs();
    });
  }

  if (jobTypeFilter) {
    jobTypeFilter.addEventListener('change', (e) => {
      AppState.jobTypeFilter = e.target.value;
      renderJobs();
    });
  }

  if (jobLocationFilter) {
    jobLocationFilter.addEventListener('change', (e) => {
      AppState.jobLocationFilter = e.target.value;
      renderJobs();
    });
  }

  if (jobSortFilter) {
    jobSortFilter.addEventListener('change', (e) => {
      AppState.jobSortOrder = e.target.value;
      renderJobs();
    });
  }

  jobCategoryTags.forEach(pill => {
    pill.addEventListener('click', () => {
      jobCategoryTags.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.jobDepartmentFilter = pill.getAttribute('data-dept');
      renderJobs();
    });
  });

  // Saved Jobs Toggles
  function toggleSavedFilterView() {
    AppState.showSavedJobsOnly = !AppState.showSavedJobsOnly;
    bookmarkedOnlyToggleBtn.classList.toggle('active', AppState.showSavedJobsOnly);
    savedJobsToggleBtn.classList.toggle('active', AppState.showSavedJobsOnly);
    renderJobs();
    showToast(AppState.showSavedJobsOnly ? 'Filtering: Showing bookmarked opportunities only' : 'Showing all opportunities', 'info');
  }

  if (bookmarkedOnlyToggleBtn) bookmarkedOnlyToggleBtn.addEventListener('click', toggleSavedFilterView);
  if (savedJobsToggleBtn) {
    savedJobsToggleBtn.addEventListener('click', () => {
      const jobsSection = document.getElementById('jobs');
      if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
      toggleSavedFilterView();
    });
  }

  function resetAllJobsFilters() {
    AppState.jobSearchQuery = '';
    AppState.jobTypeFilter = 'all';
    AppState.jobLocationFilter = 'all';
    AppState.jobDepartmentFilter = 'all';
    AppState.jobSortOrder = 'newest';
    AppState.showSavedJobsOnly = false;

    if (jobSearchInput) jobSearchInput.value = '';
    if (clearJobSearchBtn) clearJobSearchBtn.style.display = 'none';
    if (jobTypeFilter) jobTypeFilter.value = 'all';
    if (jobLocationFilter) jobLocationFilter.value = 'all';
    if (jobSortFilter) jobSortFilter.value = 'newest';
    if (bookmarkedOnlyToggleBtn) bookmarkedOnlyToggleBtn.classList.remove('active');
    jobCategoryTags.forEach(p => p.classList.toggle('active', p.getAttribute('data-dept') === 'all'));

    renderJobs();
    showToast('Job filters reset', 'info');
  }

  if (resetAllJobsFiltersBtn) resetAllJobsFiltersBtn.addEventListener('click', resetAllJobsFilters);
  if (jobsEmptyResetBtn) jobsEmptyResetBtn.addEventListener('click', resetAllJobsFilters);

  // Hero Search integration
  const heroSearchInput = document.getElementById('heroSearchInput');
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  const heroQuickTags = document.querySelectorAll('.hero-quick-tags .tag-pill');

  function triggerHeroSearch(query) {
    if (!query) query = heroSearchInput.value.trim();
    if (query) {
      AppState.jobSearchQuery = query;
      if (jobSearchInput) {
        jobSearchInput.value = query;
        if (clearJobSearchBtn) clearJobSearchBtn.style.display = 'block';
      }
      renderJobs();
    }
    const jobsSection = document.getElementById('jobs');
    if (jobsSection) jobsSection.scrollIntoView({ behavior: 'smooth' });
  }

  if (heroSearchBtn) heroSearchBtn.addEventListener('click', () => triggerHeroSearch());
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') triggerHeroSearch();
    });
  }

  heroQuickTags.forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-query');
      if (heroSearchInput) heroSearchInput.value = q;
      triggerHeroSearch(q);
    });
  });

  renderJobs();

  // ==========================================
  // 7. CONTACT FORM VALIDATION & SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactRole = document.getElementById('contactRole');
  const contactCategory = document.getElementById('contactCategory');
  const contactSubject = document.getElementById('contactSubject');
  const contactMessage = document.getElementById('contactMessage');
  const contactConsent = document.getElementById('contactConsent');
  const contactCharCount = document.getElementById('contactCharCount');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  // Live character counter on message textarea
  if (contactMessage && contactCharCount) {
    contactMessage.addEventListener('input', () => {
      const len = contactMessage.value.length;
      contactCharCount.textContent = `${len} / 20 min chars`;
      if (len >= 20) {
        contactCharCount.style.color = 'var(--success)';
        clearInputError(contactMessage, 'messageError');
      } else {
        contactCharCount.style.color = 'var(--text-muted)';
      }
    });
  }

  // Real-time clearance of errors on user input
  [contactName, contactEmail, contactSubject].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('is-invalid');
          const errorId = input.id.replace('contact', '').toLowerCase() + 'Error';
          const errorElement = document.getElementById(errorId);
          if (errorElement) errorElement.classList.remove('visible');
        }
      });
    }
  });

  [contactRole, contactCategory].forEach(select => {
    if (select) {
      select.addEventListener('change', () => {
        if (select.value) {
          select.classList.remove('is-invalid');
          const errorId = select.id.replace('contact', '').toLowerCase() + 'Error';
          const errorElement = document.getElementById(errorId);
          if (errorElement) errorElement.classList.remove('visible');
        }
      });
    }
  });

  if (contactConsent) {
    contactConsent.addEventListener('change', () => {
      if (contactConsent.checked) {
        const consentError = document.getElementById('consentError');
        if (consentError) consentError.classList.remove('visible');
      }
    });
  }

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Name validation
      if (!contactName.value.trim() || contactName.value.trim().length < 3) {
        showInputError(contactName, 'nameError');
        isValid = false;
      } else {
        clearInputError(contactName, 'nameError');
      }

      // 2. Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!contactEmail.value.trim() || !emailRegex.test(contactEmail.value.trim())) {
        showInputError(contactEmail, 'emailError');
        isValid = false;
      } else {
        clearInputError(contactEmail, 'emailError');
      }

      // 3. Affiliation Role
      if (!contactRole.value) {
        showInputError(contactRole, 'roleError');
        isValid = false;
      } else {
        clearInputError(contactRole, 'roleError');
      }

      // 4. Topic Category
      if (!contactCategory.value) {
        showInputError(contactCategory, 'categoryError');
        isValid = false;
      } else {
        clearInputError(contactCategory, 'categoryError');
      }

      // 5. Subject
      if (!contactSubject.value.trim() || contactSubject.value.trim().length < 5) {
        showInputError(contactSubject, 'subjectError');
        isValid = false;
      } else {
        clearInputError(contactSubject, 'subjectError');
      }

      // 6. Message (min 20 characters)
      if (!contactMessage.value.trim() || contactMessage.value.trim().length < 20) {
        showInputError(contactMessage, 'messageError');
        isValid = false;
      } else {
        clearInputError(contactMessage, 'messageError');
      }

      // 7. Consent Checkbox
      if (!contactConsent.checked) {
        const consentErr = document.getElementById('consentError');
        if (consentErr) consentErr.classList.add('visible');
        isValid = false;
      } else {
        const consentErr = document.getElementById('consentError');
        if (consentErr) consentErr.classList.remove('visible');
      }

      if (isValid) {
        // Show loading state
        const btnText = contactSubmitBtn.querySelector('.btn-text');
        const btnIcon = contactSubmitBtn.querySelector('.btn-icon');
        const btnSpinner = contactSubmitBtn.querySelector('.btn-spinner');

        contactSubmitBtn.disabled = true;
        if (btnText) btnText.textContent = 'Sending Message...';
        if (btnIcon) btnIcon.style.display = 'none';
        if (btnSpinner) btnSpinner.style.display = 'inline-block';

        setTimeout(() => {
          contactSubmitBtn.disabled = false;
          if (btnText) btnText.textContent = 'Submit Inquiry';
          if (btnIcon) btnIcon.style.display = 'inline-block';
          if (btnSpinner) btnSpinner.style.display = 'none';

          const senderName = contactName.value.trim();

          // Save inquiry into DataStore so Admin can read it in Inbox
          DataStore.addInquiry({
            name: senderName,
            email: contactEmail.value.trim(),
            role: contactRole.value,
            category: contactCategory.value,
            subject: contactSubject.value.trim(),
            message: contactMessage.value.trim()
          });

          contactForm.reset();
          if (contactCharCount) contactCharCount.textContent = '0 / 20 min chars';

          // Reset validity classes
          const validInputs = contactForm.querySelectorAll('.is-valid');
          validInputs.forEach(input => input.classList.remove('is-valid'));

          showToast(`Thank you, ${senderName}! Your message was delivered to the University Career Center. We will reply within 24 hours.`, 'success');
        }, 1000);
      } else {
        showToast('Please correct the highlighted fields in the form.', 'error');
      }
    });
  }

  // ==========================================
  // 8. MODAL HELPERS & ACCESSIBILITY
  // ==========================================
  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Close modals on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        if (modal.style.display === 'flex') {
          closeModal(modal);
        }
      });
    }
  });

  // ==========================================
  // 9. FORM VALIDATION HELPERS
  // ==========================================
  function showInputError(inputElement, errorId) {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
    const errText = document.getElementById(errorId);
    if (errText) errText.classList.add('visible');
  }

  function clearInputError(inputElement, errorId) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    const errText = document.getElementById(errorId);
    if (errText) errText.classList.remove('visible');
  }

  function clearFormErrors(form) {
    const invalids = form.querySelectorAll('.is-invalid');
    const valids = form.querySelectorAll('.is-valid');
    const errorMsgs = form.querySelectorAll('.error-msg');

    invalids.forEach(el => el.classList.remove('is-invalid'));
    valids.forEach(el => el.classList.remove('is-valid'));
    errorMsgs.forEach(el => el.classList.remove('visible'));
  }

  // ==========================================
  // 10. TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle-2';
    if (type === 'error') iconName = 'alert-triangle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="toast-icon"></i>
      <div class="toast-message">${message}</div>
      <button class="toast-close-btn" aria-label="Dismiss toast">
        <i data-lucide="x" style="width:16px;height:16px;"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    const closeBtn = toast.querySelector('.toast-close-btn');
    const dismiss = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, 4500);
  }

  function formatRelativeDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  }
});
