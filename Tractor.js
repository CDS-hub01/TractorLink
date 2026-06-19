//GET ALL ELEMENTS — in order they appear in HTML
// Each element is checked before use because
// script.js runs on ALL pages!
// =====================================================

const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const darkToggle = document.getElementById('darkToggle');

// Home page elements
const featuredDrivers = document.getElementById('featuredDrivers');
const driverCount = document.getElementById('driverCount');

// Hire page elements
const stateFilter = document.getElementById('stateFilter');
const tractorFilter = document.getElementById('tractorFilter');
const applyFilters = document.getElementById('applyFilters');
const clearFilters = document.getElementById('clearFilters');
const driversGrid = document.getElementById('driversGrid');
const resultsCount = document.getElementById('resultsCount');
const emptyState = document.getElementById('emptyState');

// Register page elements
const registerForm = document.getElementById('registerForm');
const driverName = document.getElementById('driverName');
const driverPhone = document.getElementById('driverPhone');
const driverState = document.getElementById('driverState');
const driverCity = document.getElementById('driverCity');
const driverService = document.getElementById('driverService');
const driverExperience = document.getElementById('driverExperience');
const driverRate = document.getElementById('driverRate');
const driverDesc = document.getElementById('driverDesc');
const registerMsg = document.getElementById('registerMsg');

// Admin page elements
const adminStats = document.getElementById('adminStats');
const adminDrivers = document.getElementById('adminDrivers');
const adminEmptyState = document.getElementById('adminEmptyState');
const clearAllBtn = document.getElementById('clearAllBtn');
const pendingCount = document.getElementById('pendingCount');
const approvedCount = document.getElementById('approvedCount');
const allCount = document.getElementById('allCount');

// =====================================================
// SAMPLE DRIVERS DATA — Array of Objects
// Type: Array of Objects
// WHY: Pre-loaded drivers so the platform doesn't
// look empty when someone first visits!
// These represent already registered drivers.
// =====================================================

const sampleDrivers = [
  {
    id: 'sample_1',
    name: 'Emeka Okafor',
    phone: '08012345678',
    state: 'Rivers',
    city: 'Obio-Akpor',
    service: 'Ploughing',
    experience: '5-10 years',
    rate: '15000',
    desc: 'Experienced tractor operator specialising in land preparation for rice and cassava farming.',
    status: 'approved',
    date: '2026-01-15',
  },
  {
    id: 'sample_2',
    name: 'Aliyu Musa',
    phone: '08023456789',
    state: 'Kano',
    city: 'Kano Municipal',
    service: 'Harrowing',
    experience: '10+ years',
    rate: '18000',
    desc: 'Veteran operator with over a decade of experience across northern Nigerian farmlands.',
    status: 'approved',
    date: '2026-01-20',
  },
  {
    id: 'sample_3',
    name: 'Chidi Nwosu',
    phone: '08034567890',
    state: 'Anambra',
    city: 'Awka',
    service: 'Ridging',
    experience: '3-5 years',
    rate: '12000',
    desc: 'Skilled in yam and maize ridging. Reliable, punctual and thorough in all assignments.',
    status: 'approved',
    date: '2026-02-01',
  },
  {
    id: 'sample_4',
    name: 'Tunde Adeyemi',
    phone: '08045678901',
    state: 'Oyo',
    city: 'Ibadan',
    service: 'Planting',
    experience: '3-5 years',
    rate: '13000',
    desc: 'Specialises in mechanised planting for cocoa and cassava farms across Oyo State.',
    status: 'approved',
    date: '2026-02-10',
  },
  {
    id: 'sample_5',
    name: 'Yakubu Ibrahim',
    phone: '08056789012',
    state: 'Kaduna',
    city: 'Zaria',
    service: 'Harvesting',
    experience: '5-10 years',
    rate: '20000',
    desc: 'Expert harvesting operator for sorghum and maize. Works fast and leaves clean fields.',
    status: 'approved',
    date: '2026-02-15',
  },
  {
    id: 'sample_6',
    name: 'Boma Fubara',
    phone: '08067890123',
    state: 'Rivers',
    city: 'Port Harcourt',
    service: 'Ploughing',
    experience: '1-2 years',
    rate: '10000',
    desc: 'Young and hardworking operator ready to serve farmers across Rivers State.',
    status: 'approved',
    date: '2026-03-01',
  },
];

// DRIVER STORAGE SYSTEM
// WHY: Groups all driver data operations together
// Keeps localStorage logic clean and organised!

const driverStore = {
  // Read all drivers — sample + registered combined
  getAll() {
    const registered = JSON.parse(localStorage.getItem('tl_drivers')) || [];
    return [...sampleDrivers, ...registered];
  },

  // Read only user-registered drivers from localStorage
  getRegistered() {
    return JSON.parse(localStorage.getItem('tl_drivers')) || [];
  },

  // Save a new driver to localStorage
  save(driver) {
    const drivers = this.getRegistered();
    drivers.push(driver);
    localStorage.setItem('tl_drivers', JSON.stringify(drivers));
  },

  // Remove a registered driver by id
  remove(id) {
    const drivers = this.getRegistered().filter((d) => d.id !== id);
    localStorage.setItem('tl_drivers', JSON.stringify(drivers));
  },

  // Approve a registered driver
  approve(id) {
    const drivers = this.getRegistered().map((d) => {
      if (d.id === id) d.status = 'approved';
      return d;
    });
    localStorage.setItem('tl_drivers', JSON.stringify(drivers));
  },

  // Clear all registered drivers
  clearAll() {
    localStorage.removeItem('tl_drivers');
  },
};

// GET DRIVER INITIALS FOR AVATAR
// WHY: Creates a nice letter avatar from driver name
// Example: "Emeka Okafor" → "EO"

const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

// =====================================================
// CREATE DRIVER CARD HTML
// Type: Function returning template literal
// WHEN: Called by renderFeaturedDrivers and renderHirePage
// WHY: One function builds cards for both pages!
// =====================================================

const createDriverCard = (driver, showContact = true) => {
  return `
    <div class="driver-card">
      <div class="driver-card-header">
        <div class="driver-avatar">${getInitials(driver.name)}</div>
        <div>
          <p class="driver-name">${driver.name}</p>
          <span class="driver-service">${driver.service}</span>
        </div>
      </div>
      <div class="driver-details">
        <div class="driver-detail">
          <i class="fas fa-map-marker-alt"></i>
          <span>${driver.city}, ${driver.state} State</span>
        </div>
        <div class="driver-detail">
          <i class="fas fa-clock"></i>
          <span>${driver.experience} experience</span>
        </div>
        ${
          driver.desc
            ? `
        <div class="driver-detail">
          <i class="fas fa-info-circle"></i>
          <span>${driver.desc.substring(0, 80)}...</span>
        </div>`
            : ''
        }
      </div>
      <p class="driver-rate">₦${Number(driver.rate).toLocaleString('en-NG')}/day</p>
      <span class="driver-approved-badge">
        <i class="fas fa-check-circle"></i> Verified Operator
      </span>
      ${
        showContact
          ? `
      <a href="tel:${driver.phone}" class="btn btn-primary full-width">
        <i class="fas fa-phone"></i> Contact Driver
      </a>`
          : ''
      }
    </div>
  `;
};

// =====================================================
// HOME PAGE — FEATURED DRIVERS
// Type: filter() + innerHTML
// WHEN: Home page loads
// WHY: Shows first 3 approved drivers as a preview
// =====================================================

const renderFeaturedDrivers = () => {
  if (!featuredDrivers) return;

  // Get only approved drivers and show first 3
  const approved = driverStore
    .getAll()
    .filter((d) => d.status === 'approved')
    .slice(0, 3);

  if (approved.length === 0) {
    featuredDrivers.innerHTML = `
      <p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 40px 0;">
        No drivers available yet. Be the first to register!
      </p>
    `;
    return;
  }

  featuredDrivers.innerHTML = approved.map((d) => createDriverCard(d)).join('');

  // Update the stats counter on the hero section
  if (driverCount) {
    const total = driverStore
      .getAll()
      .filter((d) => d.status === 'approved').length;
    driverCount.textContent = total + '+';
  }
};

// =====================================================
// HIRE PAGE — RENDER ALL DRIVERS WITH FILTERS
// Type: filter() + forEach + innerHTML
// WHEN: Hire page loads or filters are applied
// WHY: Shows approved drivers based on selected filters
// =====================================================

const renderHirePage = (state = 'all', service = 'all') => {
  if (!driversGrid) return;

  // Get all approved drivers first
  let filtered = driverStore.getAll().filter((d) => d.status === 'approved');

  // Filter by state if not "all"
  if (state !== 'all') {
    filtered = filtered.filter((d) => d.state === state);
  }

  // Filter by service type if not "all"
  if (service !== 'all') {
    filtered = filtered.filter((d) => d.service === service);
  }

  // Update results count text
  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} driver${filtered.length !== 1 ? 's' : ''}`;
  }

  // Show empty state if nothing found
  if (filtered.length === 0) {
    driversGrid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Render the driver cards
  driversGrid.innerHTML = filtered.map((d) => createDriverCard(d)).join('');
};

//Hire page Filter control with addeventListner on btns for the Apply and Clear filter buttons

const initHirefilters = () => {
  if (!applyFilters) return;

  //Apply to filters button
  applyFilters.addEventListener('click', () => {
    const state = stateFilter ? stateFilter.value : 'all';
    const service = tractorFilter ? tractorFilter.value : 'all';
    renderHirePage(state, service);
  });

  //To Clear button
  clearFilters.addEventListener('click', () => {
    if (stateFilter) stateFilter.value = 'all';
    if (tractorFilter) tractorFilter.value = 'all';
    renderHirePage();
  });
};

//REGISTER PAGE __FORM SUBMISSION -- with submit event + validation + localStorage, so when driver submit registeration form it validates all fields then saves to localstorege for the admin to approve....

const initRegisterform = () => {
  if (!registerForm) return;

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Read all form values and trim spaces
    const name = driverName.value.trim();
    const phone = driverPhone.value.trim();
    const state = driverState.value;
    const city = driverCity.value.trim();
    const service = driverService.value;
    const experience = driverExperience.value;
    const rate = driverRate.value.trim();
    const desc = driverDesc.value.trim();

    //check all required fields are filled properly
    if (
      !name ||
      !phone ||
      !state ||
      !city ||
      !service ||
      !experience ||
      !rate
    ) {
      registerMsg.textContent = 'Please fill in all required fields!';
      registerMsg.className = 'form-msg error';
      setTimeout(() => {
        registerMsg.textContent = '';
      }, 4000);
      return;
    }

    //Validate Nigerian phone number
    const phoneRegex = /^0[789][01]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      registerMsg.textContent = 'Please enter a valid Nigerian phone number!';
      registerMsg.className = 'form-msg error';
      setTimeout(() => {
        registerMsg.textContent = '';
      }, 4000);
      return;
    }

    //Validate daily Rate is a real number
    if (isNaN(rate) || Number(rate) <= 0) {
      registerMsg.textContent = 'Please enter a valid daily rate amount!';
      registerMsg.className = 'form-msg error';
      setTimeout(() => {
        registerMsg.textContent = '';
      }, 4000);
      return;
    }

    //All valid __ create new driver object
    const newDriver = {
      id: 'drv_' + Date.now(),
      name,
      phone,
      state,
      city,
      service,
      experience,
      rate,
      desc: desc || 'No description provided',
      status: 'pending', //New registrations are pending by default
      date: new Date().toLocaleDateString('en-NG'),
    };

    //save to localstorage
    driverStore.save(newDriver);

    //Show success message
    registerMsg.textContent = `Thank you ${name}! Your registration is under review. We will contact you at ${phone} once approved.`;
    registerMsg.className = 'form-msg success';

    //Clear the form
    registerForm.reset();

    setTimeout(() => {
      registerMsg.textContent = '';
    }, 6000);
  });
};

//ADMIN PAGE -- RENDER STATS -- renderadmin function and template literals

const renderAdminStats = () => {
  if (!adminStats) return;

  const all = driverStore.getAll();
  const registered = driverStore.getRegistered();
  const pending = registered.filter((d) => d.status === 'pending').length;
  const approved = all.filter((d) => d.status === 'approved').length;

  adminStats.innerHTML = `
    <div class="stat-card">
      <div class="stat-card-icon"><i class="fas fa-users"></i></div>
      <div>
        <p class="stat-card-number">${all.length}</p>
        <p class="stat-card-label">Total Drivers</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon"><i class="fas fa-check-circle"></i></div>
      <div>
        <p class="stat-card-number">${approved}</p>
        <p class="stat-card-label">Approved</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon"><i class="fas fa-clock"></i></div>
      <div>
        <p class="stat-card-number">${pending}</p>
        <p class="stat-card-label">Pending Review</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon"><i class="fas fa-map-marker-alt"></i></div>
      <div>
        <p class="stat-card-number">${new Set(all.map((d) => d.state)).size}</p>
        <p class="stat-card-label">States Covered</p>
      </div>
    </div>
  `;
};

//Admin Page -- Render Drivers Table -- filter(), forEach and template literals-- to show drivers based on selected tab(all/pending/approved)

const renderAdminDrivers = (tab = 'pending') => {
  if (!adminDrivers) return;

  const registered = driverStore.getRegistered();

  //Filter based on active tab
  let drivers;
  if (tab === 'pending') {
    drivers = registered.filter((d) => d.status === 'pending');
  } else if (tab === 'approved') {
    drivers = registered.filter((d) => d.status === 'approved');
  } else {
    drivers = registered;
  }

  //update tab count
  if (pendingCount)
    pendingCount.textContent = registered.filter(
      (d) => d.status === 'pending',
    ).length;
  if (approvedCount)
    approvedCount.textContent = registered.filter(
      (d) => d.status === 'approved',
    ).length;
  if (allCount) allCount.textContent = registered.length;

  //show empty state if no drivers
  if (drivers.length === 0) {
    adminDrivers.innerHTML = '';
    if (adminEmptyState) adminEmptyState.style.display = 'block';
    return;
  }
  if (adminEmptyState) adminEmptyState.style.display = 'none';

  //Render each driver card
  adminDrivers.innerHTML = drivers
    .map(
      (driver) => `
    <div class="admin-driver-card">
      <div class="admin-driver-info">
        <div>
          <p class="admin-driver-name">${driver.name}</p>
          <p class="admin-driver-meta">${driver.service} • ${driver.experience}</p>
        </div>
        <div>
          <p class="admin-driver-meta">${driver.city}, ${driver.state}</p>
          <p class="admin-driver-meta">${driver.phone}</p>
        </div>
        <div>
          <p class="admin-driver-meta">₦${Number(driver.rate).toLocaleString('en-NG')}/day</p>
          <p class="admin-driver-meta">Registered: ${driver.date}</p>
        </div>
        <div>
          <span class="status-badge ${driver.status === 'approved' ? 'status-approved' : 'status-pending'}">
            <i class="fas fa-${driver.status === 'approved' ? 'check' : 'clock'}"></i>
            ${driver.status === 'approved' ? 'Approved' : 'Pending'}
          </span>
        </div>
      </div>
      <div class="admin-actions">
        ${
          driver.status === 'pending'
            ? `
        <button class="btn btn-success approve-btn" data-id="${driver.id}">
          <i class="fas fa-check"></i> Approve
        </button>`
            : ''
        }
        <button class="btn btn-danger delete-btn" data-id="${driver.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `,
    )
    .join('');

  //attach approve button
  document.querySelectorAll('.approve-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      driverStore.approve(btn.getAttribute('data-id'));
      renderAdminStats();
      renderAdminDrivers(tab);
    });
  });

  //Attach delete button listeners
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const confirmed = confirm('Are you sure you want to remove this driver?');
      if (confirmed) {
        driverStore.remove(btn.getAttribute('data'));
        renderAdminStats();
        renderAdminDrivers(tab);
      }
    });
  });
};

//Admin Page -- Tab Switching -- querySelector,forEach and addEventListeners -- when admin clicks a tab button is switches btw pending, approved and veiw all...

const initAdminTabs = () => {
  const tabsBtns = document.querySelectorAll('.tab-btn');
  if (!tabsBtns.length) return;

  tabsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      //Remove active from all tabs
      tabsBtns.forEach((b) => b.classList.remove('active'));

      //Add active to any clicked tab
      btn.classList.add('active');

      //render drivers forselected tab
      renderAdminDrivers(btn.getAttribute('data-tab'));
    });
  });
};

//Admin -- Clear All Data -- confirm() and localStorage.removeitem so when admin clicks clear all Data Btn it removes all registered drivers after confirmation

const initClearAll = () => {
  if (!clearAllBtn) return;

  clearAllBtn.addEventListener('click', () => {
    const confirmed = confirm(
      'Are you sure you want to delete All registered drivers? Sample drivers will remain. This cannot be undone!',
    );
    if (confirmed) {
      driverStore.clearAll();
      renderAdminStats();
      renderAdminDrivers('pending');
    }
  });
};

//Dark Mode TOGGLE -- classList.toggle and localstorage( save in the browser) //

const initDarkMode = () => {
  if (!darkToggle) return;

  //check if dark mode was saved previously
  const saved = localStorage.getItem('tl_darkmode');
  if (saved === 'true') {
    document.body.classList.add('dark-mode');
    const icon = darkToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    //save preference to localStorage
    localStorage.setItem('tl_darkmode', isDark);

    //update icon
    const icon = darkToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-moon', !isDark);
      icon.classList.toggle('fa-sun', isDark);
    }
  });
};

//Hambuger Menu -- works on all pages -- i used classlist toggle, ForEach, querySelector and addEventListener -- when user clicks Humburger button on moblie opens and close moblie navigation...

const initHamburger = () => {
  if (!hamburger || !navLinks) return;

  //Toggle hamburger when clicked
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  //Close menu when any link is clicked
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });

  //Close menu when user clicks anywhere outside the navbar
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
};

//NAVBAR SCROLL EFFECT -- SCroll add event listener -- when user scrolls the page it adds scrolled class for subtle shadow effect

const initNavbarScroll = () => {
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
};

//SET CURRENT YEAR FOR ALL FOOTERS -- automatically set correct year
const setCurrentYear = () => {
  document.querySelectorAll('.current-year').forEach((span) => {
    span.textContent = new Date().getFullYear();
  });
};

// INITIALIZE -- runs in every page -- aand checks if its elements exist

//Runs on all pages
initHamburger();
initDarkMode();
initNavbarScroll();
setCurrentYear();

//Runs only on their specific pages -- and each function checks if elements exists first

renderFeaturedDrivers();
renderHirePage();
initHirefilters();
initRegisterform();
renderAdminStats();
renderAdminDrivers('pending');
initAdminTabs();
initClearAll();
