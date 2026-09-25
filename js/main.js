/**
 * main.js - Core Logic, UI Interactions & State Management
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  /* ============================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ============================================================ */
  const initTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('chhovorn_theme') || (prefersDark ? 'dark' : 'light');

    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('chhovorn_theme', theme);
      if (themeIcon) {
        themeIcon.innerHTML = theme === 'light'
          ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
          : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    };

    setTheme(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
      });
    }
  };

  /* ============================================================
     2. NAVBAR & MOBILE NAVIGATION WITH SUBMENUS & SCROLLSPY
     ============================================================ */
  const initNavigation = () => {
    const navbar = document.getElementById('main-navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const navItemsWithDropdown = document.querySelectorAll('.nav-item-has-dropdown');
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sub-link');
    const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');

    // Section to Main Menu Mapping (5 groups)
    const sectionToNavGroup = {
      'hero': 'hero',
      'teaching-hub': 'teaching',
      'about': 'about',
      'testimonials': 'about',
      'stats-section': 'about',
      'courses': 'about',
      'playground': 'tools',
      'curve-video-studio': 'tools',
      'trig-video-studio': 'tools',
      'derivative-video-studio': 'tools',
      'arithmetic-video-studio': 'tools',
      'formulas': 'tools',
      'resources': 'tools',
      'contact': 'contact'
    };

    // Sticky shadow & ScrollSpy
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // ScrollSpy Detection
      let currentSection = '';
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 140;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      if (!currentSection && window.scrollY < 200) {
        currentSection = 'hero';
      }

      if (currentSection) {
        const activeNavKey = sectionToNavGroup[currentSection] || currentSection;

        // Update Desktop Nav Links
        navLinks.forEach(link => {
          const navKey = link.getAttribute('data-nav');
          const isDirectMatch = link.getAttribute('href') === `#${currentSection}`;
          const isGroupMatch = navKey === activeNavKey;

          if (isGroupMatch || isDirectMatch) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update Desktop Parent Dropdown State
        navItemsWithDropdown.forEach(item => {
          const group = item.getAttribute('data-nav-group');
          if (group === activeNavKey) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        // Update Dropdown Items Active State
        dropdownItems.forEach(item => {
          const sec = item.getAttribute('data-section');
          if (sec === currentSection) {
            item.classList.add('active-sub');
          } else {
            item.classList.remove('active-sub');
          }
        });

        // Update Mobile Nav Active States
        mobileLinks.forEach(link => {
          const sec = link.getAttribute('data-section');
          if (sec === currentSection) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    // Desktop Dropdown Toggle on Click / Touch
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const parent = toggle.closest('.nav-item-has-dropdown');
        if (!parent) return;

        if (window.innerWidth <= 992) return;

        const isCurrentlyOpen = parent.classList.contains('is-open');
        navItemsWithDropdown.forEach(item => {
          if (item !== parent) {
            item.classList.remove('is-open');
            const btn = item.querySelector('.nav-dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
        });

        parent.classList.toggle('is-open', !isCurrentlyOpen);
        toggle.setAttribute('aria-expanded', String(!isCurrentlyOpen));
      });
    });

    // Close desktop dropdowns on item click
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        navItemsWithDropdown.forEach(navItem => {
          navItem.classList.remove('is-open');
          const btn = navItem.querySelector('.nav-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      });
    });

    // Close desktop dropdowns on click outside or Escape
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item-has-dropdown')) {
        navItemsWithDropdown.forEach(navItem => {
          navItem.classList.remove('is-open');
          const btn = navItem.querySelector('.nav-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    const updateMenuBtnIcon = (isOpen) => {
      if (!mobileMenuBtn) return;
      mobileMenuBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navItemsWithDropdown.forEach(navItem => {
          navItem.classList.remove('is-open');
          const btn = navItem.querySelector('.nav-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
          if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            updateMenuBtnIcon(false);
          }
        }
      }
    });

    // Mobile Nav Toggle & Accordion Interaction
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileNav.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        updateMenuBtnIcon(isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const parentAccordion = toggle.closest('.mobile-accordion');
          if (!parentAccordion) return;

          const isOpen = parentAccordion.classList.contains('open');

          document.querySelectorAll('.mobile-accordion').forEach(acc => {
            if (acc !== parentAccordion) {
              acc.classList.remove('open');
              const b = acc.querySelector('.mobile-accordion-toggle');
              if (b) b.setAttribute('aria-expanded', 'false');
            }
          });

          parentAccordion.classList.toggle('open', !isOpen);
          toggle.setAttribute('aria-expanded', String(!isOpen));
        });
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          updateMenuBtnIcon(false);
          document.body.style.overflow = '';
        });
      });
    }
  };

  /* ============================================================
     3. STATS COUNTER ANIMATION
     ============================================================ */
  const initCounters = () => {
    const counterElements = document.querySelectorAll('[data-counter]');
    let activated = false;

    const runCounters = () => {
      counterElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeProgress * (target - start) + start);

          el.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        };

        requestAnimationFrame(updateCounter);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !activated) {
          activated = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  };

  /* ============================================================
     4. COURSES RENDERING & FILTERING
     ============================================================ */
  const initCourses = () => {
    const container = document.getElementById('courses-grid');
    const filterButtons = document.querySelectorAll('[data-course-filter]');
    if (!container || typeof COURSES_DATA === 'undefined') return;

    let activeFilter = 'all';

    const render = (courses) => {
      container.innerHTML = courses.map(c => `
        <div class="course-card glass-card" data-category="${c.category}">
          <div class="course-card-top">
            <span class="course-badge badge-${c.badgeColor}">${c.badge}</span>
            <span class="course-level">${c.level}</span>
          </div>
          <h3 class="course-title">${c.title}</h3>
          <p class="course-desc">${c.description}</p>
          
          <div class="course-highlights">
            ${c.highlights.slice(0, 3).map(h => `
              <div class="highlight-item">
                <span class="check-icon">✓</span>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>

          <div class="course-meta">
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>${c.duration}</span>
            </div>
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>${c.studentsCount} សិស្ស</span>
            </div>
          </div>

          <div class="course-footer">
            <div class="course-price">
              <span class="price-val">${c.price}</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.openEnrollModal('${c.id}')">
              <span>ចុះឈ្មោះរៀន</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      `).join('');
    };

    render(COURSES_DATA);

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-course-filter');

        const filtered = activeFilter === 'all'
          ? COURSES_DATA
          : COURSES_DATA.filter(c => c.category === activeFilter);

        render(filtered);
      });
    });
  };

  /* ============================================================
     5. TESTIMONIALS & SUCCESS STORIES
     ============================================================ */
  const initTestimonials = () => {
    const container = document.getElementById('testimonials-grid');
    if (!container || typeof TESTIMONIALS_DATA === 'undefined') return;

    container.innerHTML = TESTIMONIALS_DATA.map(t => `
      <div class="testimonial-card glass-card ${t.featured ? 'featured-student' : ''}">
        ${t.featured ? '<div class="student-ribbon">⭐ សិស្សពូកែខេត្ត ២០២៥</div>' : ''}
        <div class="testimonial-quote-icon">“</div>
        <p class="testimonial-quote">${t.quote}</p>
        <div class="testimonial-author">
          <div class="author-avatar ${t.image ? 'has-img' : ''}">
            ${t.image ? `<img src="${t.image}" alt="${t.name}" class="author-avatar-img">` : t.avatar}
          </div>
          <div class="author-info">
            <h4 class="author-name">${t.name}</h4>
            <span class="author-title">${t.title}</span>
            <span class="author-school">${t.school}</span>
          </div>
        </div>
        <div class="testimonial-tag">${t.badge}</div>
      </div>
    `).join('');
  };

  /* ============================================================
     6. RESOURCES & STUDY MATERIALS
     ============================================================ */
  const initResources = () => {
    const container = document.getElementById('resources-grid');
    if (!container || typeof RESOURCES_DATA === 'undefined') return;

    container.innerHTML = RESOURCES_DATA.map(r => `
      <div class="resource-card glass-card ${r.featured ? 'featured-res' : ''}">
        ${r.featured ? '<div class="res-featured-ribbon">⭐ ពេញនិយម</div>' : ''}
        <div class="resource-type-badge">${r.type}</div>
        <h3 class="resource-title">${r.title}</h3>
        <p class="resource-desc">${r.fileDesc}</p>
        
        <div class="resource-meta">
          <span>📄 ${r.pages}</span>
          <span>💾 ${r.size}</span>
          <span>📥 ${r.downloads} ទាញយក</span>
        </div>

        <button class="btn btn-outline resource-download-btn" onclick="window.downloadResource('${r.title}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>ទាញយកឯកសារឥតគិតថ្លៃ</span>
        </button>
      </div>
    `).join('');
  };

  /* ============================================================
     7. ENROLLMENT MODAL & CONTACT FORM
     ============================================================ */
  const initEnrollmentModal = () => {
    const modal = document.getElementById('enroll-modal');
    const closeBtn = document.getElementById('close-enroll-modal');
    const form = document.getElementById('enroll-form');
    const courseSelect = document.getElementById('enroll-course-select');
    const quickForm = document.getElementById('quick-enroll-form');
    const quickCourseSelect = document.getElementById('quick-course-select');

    // Options HTML helper
    const getOptionsHtml = () => {
      if (typeof COURSES_DATA === 'undefined') return '';
      return `
        <option value="">-- សូមជ្រើសរើសវគ្គសិក្សា --</option>
        ${COURSES_DATA.map(c => `<option value="${c.id}">${c.title} (${c.price})</option>`).join('')}
      `;
    };

    if (courseSelect) courseSelect.innerHTML = getOptionsHtml();
    if (quickCourseSelect) quickCourseSelect.innerHTML = getOptionsHtml();

    window.openEnrollModal = (courseId) => {
      if (!modal) return;
      if (courseSelect && courseId) courseSelect.value = courseId;
      if (quickCourseSelect && courseId) quickCourseSelect.value = courseId;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('show');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Modal quick form submit
    if (quickForm) {
      quickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('quick-name').value.trim();
        const phone = document.getElementById('quick-phone').value.trim();
        const grade = document.getElementById('quick-grade').value;
        const selectedCourseId = quickCourseSelect ? quickCourseSelect.value : '';
        const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId);
        const courseName = selectedCourse ? selectedCourse.title : 'វគ្គសិក្សាទូទៅ';

        if (!name || !phone) {
          window.showToast('សូមបំពេញឈ្មោះ និងលេខទូរស័ព្ទរបស់អ្នក! ⚠️', 'warning');
          return;
        }

        closeModal();
        quickForm.reset();

        window.showSuccessModal({
          name: name,
          phone: phone,
          grade: grade,
          course: courseName
        });
      });
    }

    // In-page contact form submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('enroll-name').value.trim();
        const phone = document.getElementById('enroll-phone').value.trim();
        const grade = document.getElementById('enroll-grade').value;
        const selectedCourseId = courseSelect ? courseSelect.value : '';
        const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId);
        const courseName = selectedCourse ? selectedCourse.title : 'វគ្គសិក្សាទូទៅ';

        if (!name || !phone) {
          window.showToast('សូមបំពេញឈ្មោះ និងលេខទូរស័ព្ទរបស់អ្នក! ⚠️', 'warning');
          return;
        }

        closeModal();
        form.reset();

        window.showSuccessModal({
          name: name,
          phone: phone,
          grade: grade,
          course: courseName
        });
      });
    }
  };

  /* ============================================================
     8. TOAST NOTIFICATION SYSTEM
     ============================================================ */
  window.showToast = (message, type = 'success') => {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'warning' ? '⚠️' : '✅'}</span>
        <span class="toast-msg">${message}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  /* ============================================================
     9. SUCCESS MODAL
     ============================================================ */
  window.showSuccessModal = (info) => {
    const successModal = document.getElementById('success-modal');
    if (!successModal) {
      window.showToast(`អរគុណ ${info.name}! ការចុះឈ្មោះវគ្គ «${info.course}» ជោគជ័យ។ ក្រុមការងារនឹងទាក់ទងតាមរយៈ ${info.phone} ក្នុងពេលឆាប់ៗ!`);
      return;
    }

    const nameEl = document.getElementById('success-student-name');
    const courseEl = document.getElementById('success-course-name');
    const phoneEl = document.getElementById('success-phone');

    if (nameEl) nameEl.textContent = info.name;
    if (courseEl) courseEl.textContent = info.course;
    if (phoneEl) phoneEl.textContent = info.phone;

    successModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    const closeSuccessBtn = document.getElementById('close-success-modal');
    if (closeSuccessBtn) {
      closeSuccessBtn.onclick = () => {
        successModal.classList.remove('show');
        document.body.style.overflow = '';
      };
    }
  };

  /* ============================================================
     10. RESOURCE DOWNLOAD MOCK
     ============================================================ */
  window.downloadResource = (title) => {
    window.showToast(`កំពុងទាញយក៖ «${title}» ... សូមរង់ចាំបន្តិច! 📥`);
    setTimeout(() => {
      window.showToast(`ទាញយក «${title}» បានជោគជ័យ! ✅`);
    }, 1500);
  };

  /* ============================================================
     11. BACK TO TOP BUTTON
     ============================================================ */
  const initBackToTop = () => {
    const topBtn = document.getElementById('back-to-top-btn');
    if (!topBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    });

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  /* ============================================================
     12. TEACHER BRAND HOVER PROFILE & COPY HELPER
     ============================================================ */
  window.copyContactText = function(event, text, btn) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const showSuccess = () => {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span>✓ បានចម្លង</span>';
      btn.classList.add('copied');
      if (typeof window.showToast === 'function') {
        window.showToast(`បានចម្លង «${text}» ដោយជោគជ័យ! 📋`);
      }
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.classList.remove('copied');
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showSuccess).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        showSuccess();
      } catch (e) {
        console.error('Copy failed', e);
      }
      document.body.removeChild(ta);
    }
  };

  const initBrandHoverCard = () => {
    const brandContainers = document.querySelectorAll('.nav-brand-container');
    brandContainers.forEach(container => {
      const triggerBadge = container.querySelector('.brand-contact-indicator');
      const brandLink = container.querySelector('.nav-brand');

      if (triggerBadge) {
        triggerBadge.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          container.classList.toggle('is-active');
        });
      }

      // On mobile / touch screen tap
      if (brandLink) {
        brandLink.addEventListener('click', (e) => {
          if (window.innerWidth <= 768 && !container.classList.contains('is-active')) {
            e.preventDefault();
            container.classList.add('is-active');
          }
        });
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-brand-container')) {
        document.querySelectorAll('.nav-brand-container.is-active').forEach(el => {
          el.classList.remove('is-active');
        });
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-brand-container.is-active').forEach(el => {
          el.classList.remove('is-active');
        });
      }
    });
  };

  /* ============================================================
     INITIALIZE ALL WHEN DOM READY
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initCounters();
    initCourses();
    initTestimonials();
    initResources();
    initEnrollmentModal();
    initBackToTop();
    initBrandHoverCard();
  });

})();
