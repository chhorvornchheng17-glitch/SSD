/**
 * academic.js - Logic for Lessons, Slides Player, Exercise Bank & Exam Simulator
 * Teacher Chheng Chhovorn - Mathematics Platform
 */

(function () {
  'use strict';

  /* ============================================================
     1. THEME SYNC
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
     1.5 KATEX MATH TYPOGRAPHY RENDER HELPER
     ============================================================ */
  const triggerMathRender = (element) => {
    if (typeof window.renderMathInElement === 'function' && element) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        // Graceful fallback
      }
    }
  };

  /* ============================================================
     2. GLOBAL NAVIGATION & MOBILE ACCORDIONS
     ============================================================ */
  const initNav = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const navItemsWithDropdown = document.querySelectorAll('.nav-item-has-dropdown');
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');

    const updateMenuBtnIcon = (isOpen) => {
      if (!mobileMenuBtn) return;
      mobileMenuBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    };

    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) return;
        const parent = toggle.closest('.nav-item-has-dropdown');
        if (!parent) return;

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

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item-has-dropdown')) {
        navItemsWithDropdown.forEach(navItem => {
          navItem.classList.remove('is-open');
          const btn = navItem.querySelector('.nav-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

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
    }
  };

  /* ============================================================
     3. LESSONS MANAGER
     ============================================================ */
  class LessonsManager {
    constructor() {
      this.currentGrade = 'grade11';
      this.currentChapterId = 'g11-ch1';
      this.gradeTabs = document.querySelectorAll('[data-grade-tab]');
      this.chaptersListEl = document.getElementById('chapters-list');
      this.lessonContentEl = document.getElementById('lesson-content');
      this.searchInput = document.getElementById('lesson-search-input');
      this.textbookContainer = document.getElementById('textbook-showcase-container');

      window.academicLessons = this;

      if (this.lessonContentEl) {
        this.init();
      }
    }

    init() {
      // Check URL search params for grade/chapter
      const params = new URLSearchParams(window.location.search);
      const gradeParam = params.get('grade');
      const chapterParam = params.get('ch');

      if (gradeParam && ACADEMIC_CURRICULUM[gradeParam]) {
        this.currentGrade = gradeParam;
      }
      if (chapterParam) {
        this.currentChapterId = chapterParam;
      }

      this.gradeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          this.gradeTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.currentGrade = tab.getAttribute('data-grade-tab');
          const gradeData = ACADEMIC_CURRICULUM[this.currentGrade];
          if (gradeData && gradeData.chapters.length > 0) {
            this.currentChapterId = gradeData.chapters[0].id;
          }
          this.renderTextbookShowcase();
          this.renderSidebar();
          this.renderCurrentLesson();
        });
      });

      if (this.searchInput) {
        this.searchInput.addEventListener('input', (e) => {
          const query = e.target.value.trim().toLowerCase();
          this.filterChapters(query);
        });
      }

      // Set active grade tab initially
      const activeTab = document.querySelector(`[data-grade-tab="${this.currentGrade}"]`);
      if (activeTab) {
        this.gradeTabs.forEach(t => t.classList.remove('active'));
        activeTab.classList.add('active');
      }

      this.renderTextbookShowcase();
      this.renderSidebar();
      this.renderCurrentLesson();
    }

    renderTextbookShowcase() {
      if (!this.textbookContainer) {
        this.textbookContainer = document.getElementById('textbook-showcase-container');
      }
      if (!this.textbookContainer) return;

      const gradeData = ACADEMIC_CURRICULUM[this.currentGrade];
      if (!gradeData || !gradeData.textbook) {
        this.textbookContainer.innerHTML = '';
        return;
      }

      const tb = gradeData.textbook;
      this.textbookContainer.innerHTML = `
        <div class="textbook-showcase-box">
          <div class="textbook-showcase-grid">
            <div>
              <div class="textbook-badge-official">
                <span>📚 សៀវភៅសិក្សាគោលក្រសួងអប់រំ យុវជន និងកីឡា (ផ្លូវការ)</span>
              </div>
              <h2 class="textbook-showcase-title">
                ${tb.title} <span class="text-gradient">(${tb.level})</span>
              </h2>
              <p class="textbook-showcase-desc">
                ខ្លឹមសារមេរៀនត្រូវបានរៀបចំឡើងយ៉ាងសម្រិតសម្រាំងស្របតាមសៀវភៅសិក្សាគោលរបស់ក្រសួងអប់រំ យុវជន និងកីឡា (ភាគ១, ${tb.totalPages} ទំព័រ) ចែកចេញជា <strong>${tb.chaptersCount} ជំពូកធំៗ និង ${tb.lessonsCount} មេរៀនពេញលេញ</strong> ដោយមានការបង្ហាញពីទំនាក់ទំនង និងស្ពានតភ្ជាប់ចំណេះដឹងពីជំពូកមួយទៅជំពូកមួយយ៉ាងច្បាស់លាស់។
              </p>
              <div class="textbook-stats-row">
                <div class="textbook-stat-pill"><span>📑</span> <span>ជំពូក៖ <strong>${tb.chaptersCount} ជំពូក</strong></span></div>
                <div class="textbook-stat-pill"><span>📋</span> <span>មេរៀន៖ <strong>${tb.lessonsCount} មេរៀន</strong></span></div>
                <div class="textbook-stat-pill"><span>📖</span> <span>សៀវភៅគោល៖ <strong>${tb.totalPages} ទំព័រ</strong></span></div>
                <div class="textbook-stat-pill"><span>🏛️</span> <span>បោះពុម្ព៖ <strong>MoEYS</strong></span></div>
              </div>
            </div>
            <div class="textbook-actions-col">
              <a href="${tb.pdfFile}" target="_blank" class="btn-pdf-download" title="បើកសៀវភៅសិក្សាគោលផ្លូវការជាទម្រង់ PDF">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>អាន / ទាញយក PDF</span>
              </a>
              <a href="lesson-plan-exponential-ibl.html" class="btn-view-toggle" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.45); color: #34d399; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;" title="កិច្ចតែងការបង្រៀនគរុកោសល្យបែបការរិះរក (IBL - 5E Model)">
                <span>📝 កិច្ចតែងការ (IBL)</span>
              </a>
              <button class="btn-view-toggle" id="btn-toggle-roadmap" onclick="window.academicLessons.toggleRoadmapView()">
                <span>🗺️ បង្ហាញផែនទីជំពូក</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Chapter Progression Flowchart / Roadmap -->
        <div class="progression-roadmap-wrap" id="progression-roadmap">
          <div class="roadmap-header">
            <div>
              <div class="roadmap-title">
                <span>🗺️</span>
                <span>ផែនទីទំនាក់ទំនង & ដំណើរវិវត្តនៃមេរៀន (Chapter Progression Roadmap)</span>
              </div>
              <div class="roadmap-subtitle">
                ស្វែងយល់ពីទំនាក់ទំនង និងស្ពានតភ្ជាប់តក្កវិទ្យាពីជំពូកមួយទៅជំពូកមួយតាមលំដាប់លំដោយគរុកោសល្យ
              </div>
            </div>
          </div>

          <div class="roadmap-grid">
            ${gradeData.chapters.map((ch, idx) => `
              <div class="roadmap-card ${ch.id === this.currentChapterId ? 'active-node' : ''}" onclick="window.academicLessons.goToChapter('${ch.id}')">
                <div class="roadmap-card-top">
                  <span class="roadmap-chapter-num">${ch.chapterNum}</span>
                  <span class="roadmap-chapter-pages">${ch.pageRange || ''}</span>
                </div>
                <div style="font-size: 1.6rem; margin-bottom: 0.4rem;">${ch.icon}</div>
                <div class="roadmap-card-title">${ch.title}</div>
                <div class="roadmap-card-eng">${ch.englishTitle}</div>
                <div class="roadmap-lessons-count">
                  <span>📋</span>
                  <span>${ch.lessons.length} មេរៀនពេញលេញ</span>
                </div>
              </div>
            `).join('')}

            <!-- Inter-Chapter Connection Banners -->
            <div class="inter-chapter-bridge-banner">
              <span style="font-size: 1.3rem;">🔗</span>
              <div>
                <strong style="color: var(--accent-cyan);">ស្ពានតភ្ជាប់ចំណេះដឹងពីជំពូក ១ ➡️ ជំពូក ២ ➡️ ជំពូក ៣ ➡️ ជំពូក ៤៖</strong>
                <span>ពីគំរូនៃលេខរៀបលំដាប់ (ស្វ៊ីត និងអនុមានរួម) វិវត្តទៅជាអនុគមន៍អិចស្ប៉ូណង់ស្យែលជាប់ និងលោការីត រួចបន្តទៅរកអនុគមន៍ខួបត្រីកោណមាត្រ និងអនុវត្តរូបមន្តត្រីកោណមាត្រក្នុងម៉ាទ្រីសបង្វិល និងដេទែរមីណង់។</span>
              </div>
            </div>
          </div>
        </div>
      `;

      triggerMathRender(this.textbookContainer);
    }

    goToChapter(chapterId) {
      this.currentChapterId = chapterId;
      this.renderSidebar();
      this.renderCurrentLesson();
      this.updateRoadmapActiveNode();
      if (this.lessonContentEl) {
        this.lessonContentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    toggleRoadmapView() {
      const roadmap = document.getElementById('progression-roadmap');
      const btn = document.getElementById('btn-toggle-roadmap');
      if (!roadmap) return;
      const isHidden = roadmap.style.display === 'none';
      roadmap.style.display = isHidden ? 'block' : 'none';
      if (btn) {
        btn.innerHTML = isHidden ? '<span>🗺️ លាក់ផែនទីជំពូក</span>' : '<span>🗺️ បង្ហាញផែនទីជំពូក</span>';
      }
    }

    updateRoadmapActiveNode() {
      const cards = document.querySelectorAll('.roadmap-card');
      const gradeData = ACADEMIC_CURRICULUM[this.currentGrade];
      if (!gradeData) return;
      cards.forEach((card, idx) => {
        if (gradeData.chapters[idx] && gradeData.chapters[idx].id === this.currentChapterId) {
          card.classList.add('active-node');
        } else {
          card.classList.remove('active-node');
        }
      });
    }

    filterChapters(query) {
      if (!this.chaptersListEl) return;
      const gradeData = ACADEMIC_CURRICULUM[this.currentGrade];
      if (!gradeData) return;

      const filtered = gradeData.chapters.filter(ch => {
        return ch.title.toLowerCase().includes(query) ||
               ch.summary.toLowerCase().includes(query) ||
               ch.englishTitle.toLowerCase().includes(query) ||
               ch.lessons.some(l => l.toLowerCase().includes(query));
      });

      this.renderSidebar(filtered);
    }

    renderSidebar(chaptersToRender) {
      if (!this.chaptersListEl) return;
      const gradeData = ACADEMIC_CURRICULUM[this.currentGrade];
      const chapters = chaptersToRender || (gradeData ? gradeData.chapters : []);

      if (chapters.length === 0) {
        this.chaptersListEl.innerHTML = `<li style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">រកមិនឃើញជំពូកត្រូវគ្នានឹងពាក្យស្វែងរកឡើយ</li>`;
        return;
      }

      this.chaptersListEl.innerHTML = chapters.map(ch => `
        <li>
          <div class="chapter-nav-item ${ch.id === this.currentChapterId ? 'active' : ''}" data-chapter-id="${ch.id}">
            <span class="chapter-nav-icon">${ch.icon}</span>
            <div class="chapter-nav-meta">
              <span class="chapter-nav-num">${ch.chapterNum}</span>
              <span class="chapter-nav-name">${ch.title}</span>
              ${ch.pageRange ? `<span class="chapter-nav-page-badge">📖 ${ch.pageRange}</span>` : ''}
            </div>
          </div>
        </li>
      `).join('');

      // Add click listener
      this.chaptersListEl.querySelectorAll('.chapter-nav-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.getAttribute('data-chapter-id');
          this.currentChapterId = id;
          this.chaptersListEl.querySelectorAll('.chapter-nav-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          this.renderCurrentLesson();
          this.updateRoadmapActiveNode();
          // Scroll to top of lesson card
          this.lessonContentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    renderCurrentLesson() {
      if (!this.lessonContentEl) return;
      const gradeData = ACADEMIC_CURRICULUM[this.currentGrade];
      if (!gradeData) return;

      const chapter = gradeData.chapters.find(c => c.id === this.currentChapterId) || gradeData.chapters[0];
      if (!chapter) return;

      const currentIndex = gradeData.chapters.findIndex(c => c.id === chapter.id);
      const prevChapter = currentIndex > 0 ? gradeData.chapters[currentIndex - 1] : null;
      const nextChapter = currentIndex < gradeData.chapters.length - 1 ? gradeData.chapters[currentIndex + 1] : null;

      this.lessonContentEl.innerHTML = `
        <div class="lesson-card">
          <div class="lesson-top-bar">
            <span class="lesson-chapter-label">
              <span>${chapter.icon}</span>
              <span>${gradeData.gradeName} | ${chapter.chapterNum}</span>
              ${chapter.pageRange ? `<span style="opacity: 0.85; font-size: 0.8rem; margin-left: 0.35rem;">(${chapter.pageRange})</span>` : ''}
            </span>
            <div class="lesson-action-btns">
              <button class="tool-action-btn" onclick="window.print()" title="បោះពុម្ពមេរៀន">
                <span>🖨️ បោះពុម្ព</span>
              </button>
              ${gradeData.textbook ? `
                <a href="${gradeData.textbook.pdfFile}" target="_blank" class="tool-action-btn" style="border-color: rgba(6, 182, 212, 0.4); color: var(--accent-cyan);" title="បើកសៀវភៅគោល PDF">
                  <span>📥 សៀវភៅគោល</span>
                </a>
              ` : ''}
              ${chapter.id === 'g11-ch2' ? `
                <a href="lesson-plan-exponential-ibl.html" class="tool-action-btn" style="border-color: rgba(16, 185, 129, 0.5); color: #34d399; font-weight: 700; background: rgba(16, 185, 129, 0.12);" title="កិច្ចតែងការបង្រៀនគរុកោសល្យបែបការរិះរក (IBL - 5E Model)">
                  <span>📝 កិច្ចតែងការ</span>
                </a>
              ` : ''}
              <a href="slides.html?grade=${this.currentGrade}&ch=${chapter.id}" class="tool-action-btn" title="មើលស្លាយបង្រៀន">
                <span>📽️ ស្លាយ</span>
              </a>
              <a href="exercises.html?grade=${this.currentGrade}&ch=${chapter.id}" class="tool-action-btn" title="អនុវត្តលំហាត់">
                <span>✍️ លំហាត់</span>
              </a>
            </div>
          </div>

          <h2 class="lesson-main-title">${chapter.title}</h2>
          <div class="lesson-eng-title">${chapter.englishTitle}</div>
          <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            ${chapter.summary}
          </p>

          <!-- Inter-Chapter Knowledge Bridges (ទំនាក់ទំនងរវាងជំពូក) -->
          ${chapter.connectionFromPrev || chapter.connectionToNext ? `
            <div class="chapter-bridge-container">
              ${chapter.connectionFromPrev ? `
                <div class="bridge-box bridge-prev">
                  <div class="bridge-title">
                    <span>🔗</span>
                    <span>ចំណេះដឹងតភ្ជាប់ពីជំពូកមុន (Prerequisite Bridge)</span>
                  </div>
                  <p class="bridge-text">${chapter.connectionFromPrev}</p>
                </div>
              ` : '<div></div>'}
              ${chapter.connectionToNext ? `
                <div class="bridge-box bridge-next">
                  <div class="bridge-title">
                    <span>🚀</span>
                    <span>ស្ពានតភ្ជាប់ឆ្ពោះទៅជំពូកបន្ទាប់ (Next Progression Bridge)</span>
                  </div>
                  <p class="bridge-text">${chapter.connectionToNext}</p>
                </div>
              ` : '<div></div>'}
            </div>
          ` : ''}

          <!-- Learning Objectives -->
          <div class="objectives-box">
            <div class="objectives-title">
              <span>🎯 វត្ថុបំណងនៃមេរៀន (Learning Objectives)</span>
            </div>
            <ul class="objectives-list">
              ${chapter.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>

          <!-- Sublessons breakdown -->
          <div class="sublessons-box">
            <div class="sublessons-title">📋 មាតិកាមេរៀនក្នុងជំពូកនេះ (${chapter.lessons.length} មេរៀន)៖</div>
            <ul class="sublessons-list">
              ${chapter.lessons.map(l => `<li>${l}</li>`).join('')}
            </ul>
          </div>

          <!-- Key Formulas Grid -->
          <h3 class="academic-section-heading">
            <span>📐 រូបមន្តគន្លឹះដែលត្រូវចងចាំ</span>
          </h3>
          <div class="academic-formulas-grid">
            ${chapter.keyFormulas.map(f => `
              <div class="academic-formula-card">
                <div class="formula-card-top">
                  <span class="formula-card-title">${f.name}</span>
                  <button class="tool-action-btn" style="padding: 0.2rem 0.5rem;" onclick="window.copyText('${this.escapeHtml(f.text)}')">
                    <span>ចម្លង</span>
                  </button>
                </div>
                <div class="formula-card-math">${f.text}</div>
                <div class="formula-card-desc">${f.desc}</div>
              </div>
            `).join('')}
          </div>

          <!-- Theory Content -->
          <h3 class="academic-section-heading">
            <span>📖 ខ្លឹមសារទ្រឹស្តី និងក្បួនដោះស្រាយ</span>
          </h3>
          <div class="theory-rich-content">
            ${chapter.theoryContent}
          </div>

          <!-- Worked Examples -->
          <h3 class="academic-section-heading">
            <span>💡 ឧទាហរណ៍គំរូ និងដំណោះស្រាយមួយជំហានម្តងៗ</span>
          </h3>
          ${chapter.workedExamples.map((ex, idx) => `
            <div class="example-card">
              <div class="example-header" onclick="this.parentElement.querySelector('.example-body').classList.toggle('hidden');">
                <span style="font-weight: 700; color: var(--text-primary);">ឧទាហរណ៍ទី ${idx + 1}</span>
                <span class="example-badge">ដំណោះស្រាយលម្អិត</span>
              </div>
              <div class="example-body">
                <div class="example-question">${ex.question}</div>
                <ul class="example-steps">
                  ${ex.steps.map(s => `<li>${s}</li>`).join('')}
                </ul>
                <div class="example-answer">ចម្លើយ៖ ${ex.answer}</div>
              </div>
            </div>
          `).join('')}

          <!-- Teacher Advice Tip -->
          <div class="teacher-tip-card">
            <div class="teacher-tip-avatar">👩‍🏫</div>
            <div class="teacher-tip-content">
              <h4>ដំបូន្មាន និងគន្លឹះប្រឡងពីអ្នកគ្រូ ឆេង ឆវ័ន្ត៖</h4>
              <p>${chapter.tips}</p>
            </div>
          </div>

          <!-- Practice Problems -->
          <h3 class="academic-section-heading">
            <span>📝 លំហាត់ស្វ័យវាយតម្លៃ (Self-Practice)</span>
          </h3>
          <ul style="padding-left: 1.4rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem;">
            ${chapter.practiceProblems.map(p => `<li>${p}</li>`).join('')}
          </ul>

          <!-- Chapter Navigation Buttons (Next / Prev) -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); flex-wrap: wrap;">
            ${prevChapter ? `
              <button class="tool-action-btn" style="padding: 0.65rem 1.1rem; font-weight: 600;" onclick="window.academicLessons.goToChapter('${prevChapter.id}')">
                <span>⬅️ ជំពូកមុន៖ ${prevChapter.chapterNum}</span>
              </button>
            ` : '<div></div>'}
            ${nextChapter ? `
              <button class="btn btn-primary btn-sm" onclick="window.academicLessons.goToChapter('${nextChapter.id}')">
                <span>ជំពូកបន្ទាប់៖ ${nextChapter.chapterNum} ➡️</span>
              </button>
            ` : '<div></div>'}
          </div>

          <!-- Lesson Hub Footer Links -->
          <div class="lesson-hub-links" style="margin-top: 1.5rem;">
            ${chapter.id === 'g11-ch2' ? `
              <a href="game-exponential.html" class="btn btn-sm" style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff; border: none; font-weight: 700; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);">
                <span>🚀 លេងល្បែងអន្តរកម្ម៖ យានអវកាសអិចស្ប៉ូណង់ស្យែល</span>
              </a>
              <a href="lesson-plan-exponential-ibl.html" class="btn btn-sm" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; border: none; font-weight: 700; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);">
                <span>📝 កិច្ចតែងការបង្រៀន (IBL Lesson Plan)</span>
              </a>
            ` : ''}
            <a href="slides.html?grade=${this.currentGrade}&ch=${chapter.id}" class="btn btn-primary btn-sm">
              <span>📽️ បើកស្លាយបង្រៀន</span>
            </a>
            <a href="exercises.html?grade=${this.currentGrade}&ch=${chapter.id}" class="btn btn-outline btn-sm">
              <span>✍️ ធ្វើលំហាត់ជំពូកនេះ</span>
            </a>
            <a href="exams.html" class="btn btn-outline btn-sm">
              <span>📑 វិញ្ញាសាត្រៀមប្រឡង</span>
            </a>
          </div>
        </div>
      `;

      triggerMathRender(this.lessonContentEl);
    }

    escapeHtml(str) {
      return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    }
  }

  /* ============================================================
     4. INTERACTIVE SLIDES CONTROLLER
     ============================================================ */
  class SlidesController {
    constructor() {
      this.currentDeckIndex = 0;
      this.currentSlideIndex = 0;
      this.stage = document.getElementById('slides-stage');
      this.counter = document.getElementById('slide-counter');
      this.progressBar = document.getElementById('slide-progress-bar');
      this.notesDrawer = document.getElementById('slides-notes-drawer');
      this.prevBtn = document.getElementById('slide-prev-btn');
      this.nextBtn = document.getElementById('slide-next-btn');
      this.deckSelector = document.getElementById('slide-deck-select');
      this.fullscreenBtn = document.getElementById('slide-fullscreen-btn');
      this.notesBtn = document.getElementById('slide-notes-btn');

      if (this.stage && TEACHING_SLIDES_DATA.length > 0) {
        this.init();
      }
    }

    init() {
      // Check query params
      const params = new URLSearchParams(window.location.search);
      const chParam = params.get('ch');
      if (chParam) {
        const foundIdx = TEACHING_SLIDES_DATA.findIndex(d => d.id.includes(chParam) || d.id === chParam);
        if (foundIdx !== -1) this.currentDeckIndex = foundIdx;
      }

      if (this.deckSelector) {
        this.deckSelector.innerHTML = TEACHING_SLIDES_DATA.map((deck, idx) => `
          <option value="${idx}" ${idx === this.currentDeckIndex ? 'selected' : ''}>
            ${deck.gradeLabel} - ${deck.title}
          </option>
        `).join('');

        this.deckSelector.addEventListener('change', (e) => {
          this.currentDeckIndex = parseInt(e.target.value, 10);
          this.currentSlideIndex = 0;
          this.renderSlide();
        });
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
      }

      if (this.notesBtn && this.notesDrawer) {
        this.notesBtn.addEventListener('click', () => {
          this.notesDrawer.classList.toggle('open');
        });
      }

      if (this.fullscreenBtn) {
        this.fullscreenBtn.addEventListener('click', () => {
          const container = document.querySelector('.slides-player-card');
          if (!document.fullscreenElement) {
            container.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        });
      }

      // Keyboard arrow navigation
      document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          this.nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          this.prevSlide();
        }
      });

      this.renderSlide();
    }

    renderSlide() {
      const deck = TEACHING_SLIDES_DATA[this.currentDeckIndex];
      if (!deck || !deck.slides) return;

      const slide = deck.slides[this.currentSlideIndex];
      if (!slide) return;

      this.stage.innerHTML = `
        <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 0.5rem;">
          ${deck.gradeLabel} | ស្លាយទី ${slide.number} នៃ ${deck.slides.length}
        </div>
        <h3 style="font-size: clamp(1.4rem, 2.5vw, 2.1rem); font-weight: 800; line-height: 1.3; margin-bottom: 0.25rem;">
          ${slide.title}
        </h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
          ${slide.subtitle}
        </p>
        <div class="slide-body-content">
          ${slide.content}
        </div>
      `;

      if (this.counter) {
        this.counter.textContent = `${this.currentSlideIndex + 1} / ${deck.slides.length}`;
      }

      if (this.progressBar) {
        const pct = ((this.currentSlideIndex + 1) / deck.slides.length) * 100;
        this.progressBar.style.width = `${pct}%`;
      }

      if (this.notesDrawer) {
        this.notesDrawer.innerHTML = `
          <strong>📝 កំណត់ចំណាំរបស់អ្នកគ្រូ (Teacher's Speaker Notes):</strong>
          <p style="margin-top: 0.4rem;">${slide.notes || 'គ្មានកំណត់ចំណាំសម្រាប់ស្លាយនេះឡើយ។'}</p>
        `;
      }

      if (this.prevBtn) {
        this.prevBtn.disabled = this.currentSlideIndex === 0;
        this.prevBtn.style.opacity = this.currentSlideIndex === 0 ? '0.5' : '1';
      }
      if (this.nextBtn) {
        this.nextBtn.disabled = this.currentSlideIndex === deck.slides.length - 1;
        this.nextBtn.style.opacity = this.currentSlideIndex === deck.slides.length - 1 ? '0.5' : '1';
      }

      triggerMathRender(this.stage);
    }

    nextSlide() {
      const deck = TEACHING_SLIDES_DATA[this.currentDeckIndex];
      if (deck && this.currentSlideIndex < deck.slides.length - 1) {
        this.currentSlideIndex++;
        this.renderSlide();
      }
    }

    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
        this.renderSlide();
      }
    }
  }

  /* ============================================================
     5. EXERCISES BANK MANAGER
     ============================================================ */
  class ExercisesManager {
    constructor() {
      this.listEl = document.getElementById('exercises-list');
      this.filterBtns = document.querySelectorAll('[data-difficulty-filter]');
      this.gradeSelect = document.getElementById('exercise-grade-select');
      this.searchInput = document.getElementById('exercise-search-input');
      this.currentDifficulty = 'all';
      this.currentGrade = 'all';
      this.searchQuery = '';

      if (this.listEl) {
        this.init();
      }
    }

    init() {
      this.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentDifficulty = btn.getAttribute('data-difficulty-filter');
          this.render();
        });
      });

      if (this.gradeSelect) {
        this.gradeSelect.addEventListener('change', (e) => {
          this.currentGrade = e.target.value;
          this.render();
        });
      }

      if (this.searchInput) {
        this.searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.trim().toLowerCase();
          this.render();
        });
      }

      this.render();
    }

    render() {
      if (!this.listEl) return;

      const filtered = EXERCISES_DATA.filter(ex => {
        const matchDiff = this.currentDifficulty === 'all' || ex.difficulty === this.currentDifficulty;
        const matchGrade = this.currentGrade === 'all' || ex.grade === this.currentGrade;
        const matchSearch = !this.searchQuery ||
                            ex.title.toLowerCase().includes(this.searchQuery) ||
                            ex.chapterName.toLowerCase().includes(this.searchQuery) ||
                            ex.problem.toLowerCase().includes(this.searchQuery);
        return matchDiff && matchGrade && matchSearch;
      });

      if (filtered.length === 0) {
        this.listEl.innerHTML = `
          <div style="text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <span style="font-size: 2.5rem;">🔍</span>
            <h4 style="margin: 0.5rem 0; color: var(--text-primary);">រកមិនឃើញលំហាត់ត្រូវគ្នានឹងការស្វែងរកឡើយ</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">សូមសាកល្បងផ្លាស់ប្តូរជម្រើសកម្រិត ឬពាក្យគន្លឹះ</p>
          </div>
        `;
        return;
      }

      this.listEl.innerHTML = filtered.map(ex => `
        <div class="exercise-item-card">
          <div class="exercise-item-top">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan);">
              📚 ${ex.gradeLabel} | ${ex.chapterName}
            </span>
            <span class="exercise-difficulty-pill ${ex.difficultyColor}">
              កម្រិត៖ ${ex.difficultyLabel}
            </span>
          </div>
          <h3 class="exercise-title">${ex.title}</h3>
          <div class="exercise-problem-box">
            ${ex.problem}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            💡 <strong>គន្លឹះ (Hint):</strong> ${ex.hint}
          </div>
          <button class="btn btn-outline btn-sm" onclick="this.nextElementSibling.classList.toggle('open'); this.textContent = this.nextElementSibling.classList.contains('open') ? '▲ លាក់ដំណោះស្រាយ' : '▼ បង្ហាញដំណោះស្រាយ';">
            ▼ បង្ហាញដំណោះស្រាយ
          </button>
          <div class="exercise-solution-panel">
            ${ex.solution}
          </div>
        </div>
      `).join('');

      triggerMathRender(this.listEl);
    }
  }

  /* ============================================================
     6. MOCK EXAM TIMER & SIMULATOR
     ============================================================ */
  class ExamSimulator {
    constructor() {
      this.timerEl = document.getElementById('exam-timer-display');
      this.startBtn = document.getElementById('exam-start-timer');
      this.pauseBtn = document.getElementById('exam-pause-timer');
      this.resetBtn = document.getElementById('exam-reset-timer');
      this.durationSeconds = 150 * 60; // 150 minutes default
      this.remainingSeconds = this.durationSeconds;
      this.timerInterval = null;
      this.isRunning = false;

      if (this.timerEl) {
        this.init();
      }
    }

    init() {
      this.updateDisplay();

      if (this.startBtn) {
        this.startBtn.addEventListener('click', () => this.start());
      }
      if (this.pauseBtn) {
        this.pauseBtn.addEventListener('click', () => this.pause());
      }
      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => this.reset());
      }
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.timerInterval = setInterval(() => {
        if (this.remainingSeconds > 0) {
          this.remainingSeconds--;
          this.updateDisplay();
        } else {
          this.pause();
          alert('⏰ អស់ពេលធ្វើវិញ្ញាសាហើយ! សូមផ្ទៀងផ្ទាត់ចម្លើយរបស់អ្នក។');
        }
      }, 1000);
    }

    pause() {
      this.isRunning = false;
      clearInterval(this.timerInterval);
    }

    reset() {
      this.pause();
      this.remainingSeconds = this.durationSeconds;
      this.updateDisplay();
    }

    updateDisplay() {
      if (!this.timerEl) return;
      const hours = Math.floor(this.remainingSeconds / 3600);
      const mins = Math.floor((this.remainingSeconds % 3600) / 60);
      const secs = this.remainingSeconds % 60;
      const fmt = (n) => String(n).padStart(2, '0');
      this.timerEl.textContent = `${fmt(hours)}:${fmt(mins)}:${fmt(secs)}`;
    }
  }

  // Global helper for copying contact text
  window.copyContactText = function(event, text, btn) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const showSuccess = () => {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span>✓ បានចម្លង</span>';
      btn.classList.add('copied');
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

      if (brandLink) {
        brandLink.addEventListener('click', (e) => {
          if (window.innerWidth <= 768 && !container.classList.contains('is-active')) {
            e.preventDefault();
            container.classList.add('is-active');
          }
        });
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-brand-container')) {
        document.querySelectorAll('.nav-brand-container.is-active').forEach(el => {
          el.classList.remove('is-active');
        });
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-brand-container.is-active').forEach(el => {
          el.classList.remove('is-active');
        });
      }
    });
  };

  // DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    new LessonsManager();
    new SlidesController();
    new ExercisesManager();
    new ExamSimulator();
    initBrandHoverCard();
    setTimeout(() => {
      triggerMathRender(document.body);
    }, 150);
  });
})();
