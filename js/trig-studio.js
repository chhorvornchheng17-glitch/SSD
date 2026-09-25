/**
 * trig-studio.js - Trigonometric Practice Video Studio & Classroom Exercise Lab
 * High-performance 60 FPS Canvas Animation Studio featuring SHINE Institute Students
 * solving advanced trigonometric function exercises (3Blue1Brown-style Unit Circle + Cartesian Wave).
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  class TrigPracticeStudio {
    constructor() {
      this.canvas = document.getElementById('trig-video-canvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.students = window.TRIG_STUDENT_PRACTICE_DATA || [];
      this.currentIndex = 0;

      // Animation State
      this.progress = 0; // 0.0 to 1.0
      this.isPlaying = true;
      this.speed = 1.0;
      this.animationFrameId = null;
      this.lastTimestamp = 0;
      this.dashOffset = 0;

      // Video Recording State
      this.isRecording = false;
      this.mediaRecorder = null;
      this.recordedChunks = [];
      this.recordedBlobUrl = null;

      // Particle Trail System
      this.particles = [];

      // Image Cache for Student Photos
      this.imageCache = {};

      // DOM Elements Cache
      this.initDomReferences();

      // Setup
      this.preloadStudentImages();
      this.handleResize();
      this.bindEvents();
      this.renderStudentCards();
      this.updateUI();

      // Start Loop
      this.loop(0);
    }

    initDomReferences() {
      this.viewport = this.canvas.parentElement;
      this.playBtn = document.getElementById('trig-play-btn');
      this.replayBtn = document.getElementById('trig-replay-btn');
      this.progressBar = document.getElementById('trig-progress-bar');
      this.timeDisplay = document.getElementById('trig-time-display');
      this.recordBtn = document.getElementById('trig-record-btn');
      this.downloadBtn = document.getElementById('trig-download-btn');
      this.recBadge = document.getElementById('trig-rec-badge');
      this.speedButtons = document.querySelectorAll('[data-trig-speed]');
      this.cardsContainer = document.getElementById('trig-student-cards');

      // HUD Elements
      this.hudStudentName = document.getElementById('trig-hud-student-name');
      this.hudFormula = document.getElementById('trig-hud-formula');
      this.hudAngle = document.getElementById('trig-hud-angle');
      this.hudYVal = document.getElementById('trig-hud-yval');

      // Explanations & Steps Panel
      this.detailStudentPhoto = document.getElementById('trig-detail-student-photo');
      this.detailStudentName = document.getElementById('trig-detail-student-name');
      this.detailStudentBadge = document.getElementById('trig-detail-student-badge');
      this.detailExerciseTitle = document.getElementById('trig-detail-exercise-title');
      this.detailFormula = document.getElementById('trig-detail-formula');
      this.detailExplanation = document.getElementById('trig-detail-explanation');
      this.detailStepsList = document.getElementById('trig-detail-steps');
    }

    preloadStudentImages() {
      this.students.forEach((student, index) => {
        if (!student.photo) return;
        const img = new Image();
        img.src = student.photo;
        img.onload = () => {
          this.imageCache[student.id] = img;
        };
      });
    }

    handleResize() {
      if (!this.canvas || !this.viewport) return;
      const rect = this.viewport.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Target logical aspect ratio 16:9 (1280 x 720 logical coordinate space)
      this.logicalWidth = 1280;
      this.logicalHeight = 720;

      // Actual display canvas size
      this.canvas.width = this.logicalWidth * dpr;
      this.canvas.height = this.logicalHeight * dpr;

      // Scale canvas rendering context for crisp high-DPI display
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    bindEvents() {
      window.addEventListener('resize', () => this.handleResize());

      // Play / Pause Toggle
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => {
          if (this.isPlaying) {
            this.pause();
          } else {
            this.play();
          }
        });
      }

      // Replay
      if (this.replayBtn) {
        this.replayBtn.addEventListener('click', () => {
          this.progress = 0;
          this.play();
        });
      }

      // Progress Scrubber
      if (this.progressBar) {
        this.progressBar.addEventListener('input', (e) => {
          this.pause();
          this.progress = parseFloat(e.target.value) / 100;
        });
      }

      // Speed Buttons
      this.speedButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.speedButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          this.speed = parseFloat(btn.dataset.trigSpeed) || 1.0;
        });
      });

      // Video Recording Button
      if (this.recordBtn) {
        this.recordBtn.addEventListener('click', () => {
          if (this.isRecording) {
            this.stopRecording();
          } else {
            this.startRecording();
          }
        });
      }

      // Video Download Button
      if (this.downloadBtn) {
        this.downloadBtn.addEventListener('click', () => {
          this.downloadVideo();
        });
      }
    }

    renderStudentCards() {
      if (!this.cardsContainer) return;
      this.cardsContainer.innerHTML = '';

      this.students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = `trig-student-card ${index === this.currentIndex ? 'active' : ''}`;
        card.dataset.index = index;

        card.innerHTML = `
          <div class="trig-card-avatar-wrap">
            <img src="${student.photo}" alt="${student.studentName}" class="trig-card-avatar" onerror="this.src='assets/images/placeholder.jpg'">
            <span class="trig-card-number">#${index + 1}</span>
          </div>
          <div class="trig-card-info">
            <h4 class="trig-card-name">${student.studentName}</h4>
            <span class="trig-card-badge">${student.studentBadge}</span>
            <div class="trig-card-formula">${student.formulaPlain || student.formula}</div>
          </div>
          <div class="trig-card-action">
            <span class="trig-card-play-icon">▶</span>
          </div>
        `;

        card.addEventListener('click', () => {
          this.selectStudent(index);
        });

        this.cardsContainer.appendChild(card);
      });
    }

    selectStudent(index) {
      if (index < 0 || index >= this.students.length) return;
      this.currentIndex = index;
      this.progress = 0;
      this.particles = [];

      // Update card active states
      const cards = this.cardsContainer?.querySelectorAll('.trig-student-card');
      cards?.forEach((c, idx) => {
        c.classList.toggle('active', idx === index);
      });

      this.updateUI();
      this.play();

      if (window.showToast) {
        const s = this.students[index];
        window.showToast(`✨ កំពុងទស្សនាការអនុវត្តលំហាត់របស់ប្អូន ${s.studentName}: ${s.formulaPlain}`);
      }
    }

    updateUI() {
      const student = this.students[this.currentIndex];
      if (!student) return;

      // Update HUD
      if (this.hudStudentName) this.hudStudentName.textContent = student.studentName;
      if (this.hudFormula) this.hudFormula.textContent = student.formulaPlain || student.formula;

      // Update Detailed Panel below video
      if (this.detailStudentPhoto) this.detailStudentPhoto.src = student.photo;
      if (this.detailStudentName) this.detailStudentName.textContent = student.studentName;
      if (this.detailStudentBadge) this.detailStudentBadge.textContent = `${student.studentBadge} • ${student.school}`;
      if (this.detailExerciseTitle) this.detailExerciseTitle.textContent = student.exerciseTitle;
      if (this.detailFormula) this.detailFormula.textContent = student.formulaPlain || student.formula;
      if (this.detailExplanation) this.detailExplanation.textContent = student.explanation;

      // Render Steps List
      if (this.detailStepsList && student.steps) {
        this.detailStepsList.innerHTML = student.steps
          .map((step, idx) => `
            <li class="trig-step-item">
              <span class="step-num">${idx + 1}</span>
              <span class="step-text">${step}</span>
            </li>
          `)
          .join('');
      }
    }

    play() {
      this.isPlaying = true;
      if (this.playBtn) {
        this.playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <span>ផ្អាក (Pause)</span>
        `;
      }
    }

    pause() {
      this.isPlaying = false;
      if (this.playBtn) {
        this.playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>ចាក់ (Play)</span>
        `;
      }
    }

    /* ============================================================
       RECORDING & VIDEO DOWNLOAD (60 FPS WebM)
       ============================================================ */
    startRecording() {
      if (!this.canvas) return;

      try {
        const stream = this.canvas.captureStream(60);
        const options = { mimeType: 'video/webm;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options.mimeType = 'video/webm';
        }

        this.mediaRecorder = new MediaRecorder(stream, options);
        this.recordedChunks = [];

        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            this.recordedChunks.push(e.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
          if (this.recordedBlobUrl) {
            URL.revokeObjectURL(this.recordedBlobUrl);
          }
          this.recordedBlobUrl = URL.createObjectURL(blob);

          if (this.downloadBtn) {
            this.downloadBtn.style.display = 'inline-flex';
          }
          if (window.showToast) {
            window.showToast('✅ បានថតវីដេអូចប់សព្វគ្រប់! ចុច "ទាញយកវីដេអូ (.webm)" ដើម្បីរក្សាទុក។');
          }
        };

        // Reset and play
        this.progress = 0;
        this.isRecording = true;
        this.mediaRecorder.start();

        if (this.recordBtn) {
          this.recordBtn.classList.add('btn-recording');
          this.recordBtn.innerHTML = `
            <span class="record-pulse-dot"></span>
            <span>⏹️ បញ្ចប់ការថត (Stop)</span>
          `;
        }
        if (this.recBadge) {
          this.recBadge.classList.add('recording-active');
        }

        this.play();

        if (window.showToast) {
          window.showToast('🎥 កំពុងចាប់ផ្តើមថតវីដេអូកម្រិតច្បាស់ 60 FPS...');
        }
      } catch (err) {
        console.error('Recording error:', err);
        if (window.showToast) {
          window.showToast('⚠️ កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ MediaRecorder captureStream ឡើយ។');
        }
      }
    }

    stopRecording() {
      if (!this.isRecording) return;
      this.isRecording = false;

      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }

      if (this.recordBtn) {
        this.recordBtn.classList.remove('btn-recording');
        this.recordBtn.innerHTML = `
          <span>🎥 ថតវីដេអូ (Record Video)</span>
        `;
      }
      if (this.recBadge) {
        this.recBadge.classList.remove('recording-active');
      }
    }

    downloadVideo() {
      if (!this.recordedBlobUrl) return;
      const student = this.students[this.currentIndex];
      const studentNameSafe = student ? student.studentName.replace(/\s+/g, '_') : 'student';
      const a = document.createElement('a');
      a.href = this.recordedBlobUrl;
      a.download = `trig-practice-${studentNameSafe}-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      if (window.showToast) {
        window.showToast('📥 កំពុងទាញយកឯកសារវីដេអូត្រីកោណមាត្រ .webm ទៅកាន់កុំព្យូទ័ររបស់អ្នក!');
      }
    }

    /* ============================================================
       ANIMATION LOOP
       ============================================================ */
    loop(timestamp) {
      const dt = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      if (this.isPlaying) {
        // Complete one full cycle in ~6 seconds at 1.0x speed
        const step = 0.0028 * this.speed;
        this.progress += step;
        this.dashOffset = (this.dashOffset - 1.5 * this.speed) % 16;

        if (this.progress >= 1.0) {
          this.progress = 1.0;
          this.pause();

          if (this.isRecording) {
            setTimeout(() => this.stopRecording(), 400);
          }
        }
      }

      // Update Scrubber & Time Display
      if (this.progressBar) {
        this.progressBar.value = (this.progress * 100).toFixed(1);
      }
      if (this.timeDisplay) {
        const totalDuration = 6.0 / this.speed;
        const currentSec = (this.progress * totalDuration).toFixed(1);
        this.timeDisplay.textContent = `${currentSec}s / ${totalDuration.toFixed(1)}s`;
      }

      this.drawFrame();
      this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
    }

    /* ============================================================
       CANVAS RENDERING ENGINE
       ============================================================ */
    drawFrame() {
      const ctx = this.ctx;
      const w = this.logicalWidth;
      const h = this.logicalHeight;
      const student = this.students[this.currentIndex];
      if (!student) return;

      // 1. Clear Canvas with deep slate chalkboard color
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Subtle ambient vignette
      const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 100, w * 0.5, h * 0.5, w * 0.8);
      bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
      bgGrad.addColorStop(1, 'rgba(3, 7, 18, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Compute Layout Sub-viewports
      // Left side: Unit Circle (35% width)
      // Right side: Cartesian Wave (65% width)
      const circleCX = w * 0.20;
      const circleCY = h * 0.54;
      const circleRadius = 110;

      const waveOriginX = w * 0.44;
      const waveOriginY = circleCY;
      const waveWidth = w * 0.52;
      const waveHeight = 260;
      const waveScaleY = 60; // 60px per math unit

      // Calculate current angle x based on domain
      const [domainMin, domainMax] = student.domain || [0, Math.PI * 2];
      const domainSpan = domainMax - domainMin;
      const currentX = domainMin + domainSpan * this.progress;
      const currentY = student.f(currentX);

      // 3. Draw Sub-viewports Background Grids
      this.drawCircleGrid(ctx, circleCX, circleCY, circleRadius);
      this.drawWaveGrid(ctx, waveOriginX, waveOriginY, waveWidth, waveHeight, waveScaleY, student);

      // 4. Draw Full Reference Wave Ghost Path
      this.drawGhostWave(ctx, waveOriginX, waveOriginY, waveWidth, waveScaleY, domainMin, domainMax, student);

      // 5. Draw Animated Active Wave
      const waveCurrentPt = this.drawActiveWave(ctx, waveOriginX, waveOriginY, waveWidth, waveScaleY, domainMin, domainMax, currentX, student);

      // 6. Draw Key Mathematical Points (Roots, Max, Min, Intersections)
      this.drawKeyPoints(ctx, waveOriginX, waveOriginY, waveWidth, waveScaleY, domainMin, domainMax, currentX, student);

      // 7. Draw Unit Circle / Reference Phasor
      const circleCurrentPt = this.drawUnitCircle(ctx, circleCX, circleCY, circleRadius, currentX, student);

      // 8. Draw Glowing Laser Projection Beam connecting Circle point to Wave point!
      if (circleCurrentPt && waveCurrentPt) {
        this.drawProjectionLaser(ctx, circleCurrentPt, waveCurrentPt, student);
      }

      // 9. Draw Particle Trail at wave tip
      if (waveCurrentPt) {
        this.drawParticleSparks(ctx, waveCurrentPt.x, waveCurrentPt.y);
      }

      // 10. Draw Top Information Headers & HUD
      this.drawCanvasHeader(ctx, w, student);

      // 11. Draw Authentic Student Photo Inset Badge (Baked into Canvas & Video Recording)
      this.drawStudentCanvasBadge(ctx, w, student);

      // 12. Draw Live Angle & Value Callout Box
      this.drawLiveValueCard(ctx, circleCX, circleCY, currentX, currentY, student);
    }

    /* ============================================================
       UNIT CIRCLE / PHASOR DRAWING
       ============================================================ */
    drawCircleGrid(ctx, cx, cy, r) {
      ctx.save();

      // Subtle circular grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75, 1.0, 1.25].forEach((factor) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * factor, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Unit Circle Main Outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Axes (Ox, Oy)
      const axisLen = r * 1.35;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = 1.5;

      // X Axis (cos)
      ctx.beginPath();
      ctx.moveTo(cx - axisLen, cy);
      ctx.lineTo(cx + axisLen, cy);
      ctx.stroke();

      // Y Axis (sin)
      ctx.beginPath();
      ctx.moveTo(cx, cy + axisLen);
      ctx.lineTo(cx, cy - axisLen);
      ctx.stroke();

      // Axis Arrows
      this.drawArrow(ctx, cx + axisLen, cy, 0, '#94a3b8');
      this.drawArrow(ctx, cx, cy - axisLen, -Math.PI / 2, '#94a3b8');

      // Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('cos θ', cx + axisLen + 8, cy + 4);

      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'center';
      ctx.fillText('sin θ', cx, cy - axisLen - 10);

      // Circle Origin
      ctx.fillStyle = '#64748b';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('O', cx - 6, cy + 14);

      // Degree reference marks (0°, 90°, 180°, 270°)
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('0', cx + r + 4, cy - 4);
      ctx.textAlign = 'center';
      ctx.fillText('π/2', cx + 16, cy - r - 4);
      ctx.textAlign = 'right';
      ctx.fillText('π', cx - r - 4, cy - 4);
      ctx.textAlign = 'center';
      ctx.fillText('3π/2', cx + 18, cy + r + 14);

      ctx.restore();
    }

    drawUnitCircle(ctx, cx, cy, r, theta, student) {
      ctx.save();

      // Effective angle for rotation depending on function type
      let effAngle = theta;
      if (student.omega) effAngle *= student.omega;
      if (student.phase) effAngle -= student.phase;

      // In math, positive angle rotates counter-clockwise (Canvas Y is downward)
      const cosVal = Math.cos(effAngle);
      const sinVal = Math.sin(effAngle);

      // Scaled by amplitude if applicable
      const amp = student.amplitude || 1;
      const ptX = cx + cosVal * r * (amp > 1.5 ? 1.15 : 1.0);
      const ptY = cy - sinVal * (student.amplitude ? student.amplitude * 45 : r);

      // 1. Shaded angle sector/arc
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      // Canvas arc sweeps clockwise; math positive is counter-clockwise (-effAngle)
      ctx.arc(cx, cy, 32, 0, -effAngle, effAngle > 0);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Angle text θ
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      const midAngle = -effAngle / 2;
      ctx.fillText('θ', cx + 42 * Math.cos(midAngle), cy + 42 * Math.sin(midAngle) + 4);

      // 2. Right Triangle Components (cos = blue horizontal, sin = green vertical)
      // Horizontal cos line: from (cx, cy) to (ptX, cy)
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ptX, cy);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Vertical sin line: from (ptX, cy) to (ptX, ptY)
      ctx.beginPath();
      ctx.moveTo(ptX, cy);
      ctx.lineTo(ptX, ptY);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 3. Rotating Phasor Arm (Vector from Center to Point P)
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ptX, ptY);
      ctx.strokeStyle = '#f59e0b'; // Gold vector
      ctx.lineWidth = 2.8;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Phasor Tip Point P(cos θ, sin θ)
      ctx.beginPath();
      ctx.arc(ptX, ptY, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Outer pulsing ring
      ctx.beginPath();
      ctx.arc(ptX, ptY, 11 + Math.sin(Date.now() / 150) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label for Point P
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('P(cos θ, sin θ)', ptX - 10, ptY - 8);

      // If Tangent exercise, also draw tangent line on circle
      if (student.type === 'tangent') {
        const tanVal = Math.tan(effAngle);
        const tanAxisX = cx + r;
        const tanPtY = cy - tanVal * 45;
        // Tangent vertical contact line
        ctx.beginPath();
        ctx.moveTo(tanAxisX, cy - 120);
        ctx.lineTo(tanAxisX, cy + 120);
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Line extending through circle tip to tangent axis
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(tanAxisX, tanPtY);
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tanAxisX, tanPtY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899';
        ctx.fill();
      }

      ctx.restore();
      return { x: ptX, y: ptY };
    }

    /* ============================================================
       CARTESIAN WAVE GRAPH DRAWING
       ============================================================ */
    drawWaveGrid(ctx, ox, oy, w, h, scaleY, student) {
      ctx.save();

      // Background graph container box
      ctx.fillStyle = 'rgba(10, 18, 36, 0.65)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1;
      this.roundRect(ctx, ox - 20, oy - h / 2, w + 40, h, 10);
      ctx.fill();
      ctx.stroke();

      // Grid Lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;

      // Horizontal grid lines (Y ticks: -3, -2, -1, 0, 1, 2, 3)
      for (let yVal = -3; yVal <= 3; yVal++) {
        if (yVal === 0) continue;
        const yPx = oy - yVal * scaleY;
        ctx.beginPath();
        ctx.moveTo(ox, yPx);
        ctx.lineTo(ox + w, yPx);
        ctx.stroke();

        // Y Labels
        ctx.fillStyle = '#64748b';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(yVal > 0 ? `+${yVal}` : `${yVal}`, ox - 6, yPx + 3);
      }

      // Vertical grid lines (X radian ticks: 0, π/4, π/2, 3π/4, π, ...)
      const [dMin, dMax] = student.domain || [0, Math.PI * 2];
      const ticks = [
        { val: 0, label: '0' },
        { val: Math.PI / 4, label: 'π/4' },
        { val: Math.PI / 2, label: 'π/2' },
        { val: (3 * Math.PI) / 4, label: '3π/4' },
        { val: Math.PI, label: 'π' },
        { val: (5 * Math.PI) / 4, label: '5π/4' },
        { val: (3 * Math.PI) / 2, label: '3π/2' },
        { val: (7 * Math.PI) / 4, label: '7π/4' },
        { val: 2 * Math.PI, label: '2π' }
      ];

      ticks.forEach((tick) => {
        if (tick.val >= dMin && tick.val <= dMax) {
          const ratio = (tick.val - dMin) / (dMax - dMin);
          const xPx = ox + ratio * w;

          ctx.beginPath();
          ctx.moveTo(xPx, oy - h / 2 + 10);
          ctx.lineTo(xPx, oy + h / 2 - 10);
          ctx.stroke();

          // X Labels
          ctx.fillStyle = '#94a3b8';
          ctx.font = '11px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(tick.label, xPx, oy + 20);
        }
      });

      // Special baseline for vertical shift (e.g. y = 1 for student Socheata)
      if (student.verticalShift) {
        const basePy = oy - student.verticalShift * scaleY;
        ctx.beginPath();
        ctx.moveTo(ox, basePy);
        ctx.lineTo(ox + w, basePy);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`ស្នូលលំនឹង y = ${student.verticalShift}`, ox + 10, basePy - 6);
      }

      // Special target line for Equation exercise (Chariya: sin x = √3/2)
      if (student.type === 'equation' && student.targetY !== undefined) {
        const targetPy = oy - student.targetY * scaleY;
        ctx.beginPath();
        ctx.moveTo(ox, targetPy);
        ctx.lineTo(ox + w, targetPy);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`y = √3/2 ≈ 0.866`, ox + w - 10, targetPy - 6);
      }

      // Special Vertical Asymptotes for Tangent (Piseth: x = ±π/2)
      if (student.type === 'tangent') {
        const asympX1 = ox + ((-Math.PI / 2 - dMin) / (dMax - dMin)) * w;
        const asympX2 = ox + ((Math.PI / 2 - dMin) / (dMax - dMin)) * w;

        [asympX1, asympX2].forEach((ax, idx) => {
          if (ax >= ox && ax <= ox + w) {
            ctx.beginPath();
            ctx.moveTo(ax, oy - h / 2);
            ctx.lineTo(ax, oy + h / 2);
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(idx === 0 ? 'x = -π/2' : 'x = π/2', ax, oy - h / 2 + 16);
          }
        });
      }

      // Ox Axis Main Line
      ctx.beginPath();
      ctx.moveTo(ox - 10, oy);
      ctx.lineTo(ox + w + 20, oy);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Oy Axis Main Line
      ctx.beginPath();
      ctx.moveTo(ox, oy + h / 2 - 8);
      ctx.lineTo(ox, oy - h / 2 + 8);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Axis Arrows
      this.drawArrow(ctx, ox + w + 20, oy, 0, '#94a3b8');
      this.drawArrow(ctx, ox, oy - h / 2 + 8, -Math.PI / 2, '#94a3b8');

      // Axis Labels
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 13px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('x (rad)', ox + w + 24, oy + 4);
      ctx.textAlign = 'center';
      ctx.fillText('y = f(x)', ox, oy - h / 2 - 6);

      ctx.restore();
    }

    drawGhostWave(ctx, ox, oy, w, scaleY, dMin, dMax, student) {
      ctx.save();
      ctx.beginPath();
      const numSteps = 240;
      let first = true;

      for (let i = 0; i <= numSteps; i++) {
        const x = dMin + (dMax - dMin) * (i / numSteps);
        const y = student.f(x);

        // Clamp extreme values for tangent
        if (student.type === 'tangent' && Math.abs(y) > 6) {
          first = true;
          continue;
        }

        const px = ox + (i / numSteps) * w;
        const py = oy - y * scaleY;

        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    drawActiveWave(ctx, ox, oy, w, scaleY, dMin, dMax, currentX, student) {
      ctx.save();

      // If Superposition exercise (Rachana), first draw constituent blue sin and purple cos
      if (student.type === 'superposition') {
        this.drawSuperpositionConstituents(ctx, ox, oy, w, scaleY, dMin, dMax, currentX);
      }

      const numSteps = Math.max(10, Math.floor(240 * this.progress));
      if (numSteps === 0) {
        ctx.restore();
        return null;
      }

      // Shaded area under active curve
      ctx.beginPath();
      let first = true;
      let lastPx = ox;
      let lastPy = oy;

      for (let i = 0; i <= numSteps; i++) {
        const x = dMin + (currentX - dMin) * (i / numSteps);
        const y = student.f(x);

        if (student.type === 'tangent' && Math.abs(y) > 6) {
          first = true;
          continue;
        }

        const px = ox + ((x - dMin) / (dMax - dMin)) * w;
        const py = oy - y * scaleY;
        lastPx = px;
        lastPy = py;

        if (first) {
          ctx.moveTo(px, oy);
          ctx.lineTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }

      if (!first) {
        ctx.lineTo(lastPx, oy);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, oy - 2 * scaleY, 0, oy + 2 * scaleY);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
        grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.18)');
        grad.addColorStop(1, 'rgba(2, 132, 199, 0.05)');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Active Glowing Stroke
      ctx.beginPath();
      first = true;
      for (let i = 0; i <= numSteps; i++) {
        const x = dMin + (currentX - dMin) * (i / numSteps);
        const y = student.f(x);

        if (student.type === 'tangent' && Math.abs(y) > 6) {
          first = true;
          continue;
        }

        const px = ox + ((x - dMin) / (dMax - dMin)) * w;
        const py = oy - y * scaleY;

        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.strokeStyle = student.type === 'superposition' ? '#fbbf24' : '#06b6d4';
      ctx.lineWidth = 3.8;
      ctx.shadowColor = student.type === 'superposition' ? 'rgba(245, 158, 11, 0.8)' : 'rgba(6, 182, 212, 0.8)';
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Current Tracer Pen Head at (lastPx, lastPy)
      ctx.beginPath();
      ctx.arc(lastPx, lastPy, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
      return { x: lastPx, y: lastPy, mathX: currentX, mathY: student.f(currentX) };
    }

    drawSuperpositionConstituents(ctx, ox, oy, w, scaleY, dMin, dMax, currentX) {
      const steps = Math.max(10, Math.floor(200 * this.progress));

      // 1. Blue Wave: sin(x)
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const x = dMin + (currentX - dMin) * (i / steps);
        const y = Math.sin(x);
        const px = ox + ((x - dMin) / (dMax - dMin)) * w;
        const py = oy - y * scaleY;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Purple Wave: cos(x)
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const x = dMin + (currentX - dMin) * (i / steps);
        const y = Math.cos(x);
        const px = ox + ((x - dMin) / (dMax - dMin)) * w;
        const py = oy - y * scaleY;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    /* ============================================================
       KEY POINTS & CRITICAL ROOTS HIGHLIGHTS
       ============================================================ */
    drawKeyPoints(ctx, ox, oy, w, scaleY, dMin, dMax, currentX, student) {
      if (!student.keyPoints) return;
      ctx.save();

      student.keyPoints.forEach((kp) => {
        // Show point only if tracer has reached or passed it
        const isReached = currentX >= kp.x - 0.05;
        const ratio = (kp.x - dMin) / (dMax - dMin);
        const px = ox + ratio * w;
        const py = oy - kp.y * scaleY;

        ctx.beginPath();
        ctx.arc(px, py, isReached ? 5.5 : 3.5, 0, Math.PI * 2);

        if (isReached) {
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Label
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          const labelY = kp.y >= 0 ? py - 12 : py + 18;
          ctx.fillText(kp.label, px, labelY);
        } else {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
          ctx.fill();
        }
      });

      ctx.restore();
    }

    /* ============================================================
       GLOWING LASER PROJECTION BEAM
       Connecting Unit Circle Point to Cartesian Wave Point
       ============================================================ */
    drawProjectionLaser(ctx, circlePt, wavePt, student) {
      ctx.save();

      // Glowing Horizontal Laser Beam
      ctx.beginPath();
      ctx.moveTo(circlePt.x, circlePt.y);
      ctx.lineTo(wavePt.x, circlePt.y); // Horizontal projection line
      if (Math.abs(circlePt.y - wavePt.y) > 2) {
        ctx.lineTo(wavePt.x, wavePt.y); // Drop to actual wave Y if offset
      }

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.9)';
      ctx.shadowBlur = 12;
      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = this.dashOffset;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      // Traveling Laser Photon along the line
      const laserProgress = (Date.now() % 1000) / 1000;
      const photonX = circlePt.x + (wavePt.x - circlePt.x) * laserProgress;
      ctx.beginPath();
      ctx.arc(photonX, circlePt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(245, 158, 11, 1)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    /* ============================================================
       PARTICLE SPARKS AT TRACER PEN
       ============================================================ */
    drawParticleSparks(ctx, px, py) {
      if (this.isPlaying && Math.random() < 0.6) {
        this.particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 1.0,
          alpha: 1.0,
          size: Math.random() * 3 + 1.5,
          color: Math.random() > 0.5 ? '#38bdf8' : '#fbbf24'
        });
      }

      ctx.save();
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.restore();
    }

    /* ============================================================
       CANVAS TOP HEADER (EXERCISE & FORMULA)
       ============================================================ */
    drawCanvasHeader(ctx, w, student) {
      ctx.save();

      // Top Left: Exercise title & Formula Pill
      const pillX = 24;
      const pillY = 20;
      const pillW = 420;
      const pillH = 64;

      ctx.fillStyle = 'rgba(7, 13, 27, 0.85)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.2;
      this.roundRect(ctx, pillX, pillY, pillW, pillH, 8);
      ctx.fill();
      ctx.stroke();

      // Exercise Title Text
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px Kantumruy Pro, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(student.exerciseTitle, pillX + 16, pillY + 24);

      // Formula Text
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 15px JetBrains Mono, monospace';
      ctx.fillText(student.formulaPlain || student.formula, pillX + 16, pillY + 48);

      // Period & Amplitude Tags on right of pill
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`A = ${student.amplitude || 1} | T = ${student.period || '2π'}`, pillX + pillW - 16, pillY + 48);

      ctx.restore();
    }

    /* ============================================================
       AUTHENTIC STUDENT PHOTO INSET BADGE (DRAWN ON CANVAS)
       Baked into the video recording so student is permanently featured!
       ============================================================ */
    drawStudentCanvasBadge(ctx, w, student) {
      ctx.save();

      const badgeW = 390;
      const badgeH = 74;
      const badgeX = w - badgeW - 24;
      const badgeY = 20;

      // Frosted Glass Card
      ctx.fillStyle = 'rgba(7, 13, 27, 0.90)';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      ctx.lineWidth = 1.4;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.25)';
      ctx.shadowBlur = 12;
      this.roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 10);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Student Circular Avatar (clipped)
      const avatarCX = badgeX + 42;
      const avatarCY = badgeY + badgeH / 2;
      const avatarR = 26;

      const img = this.imageCache[student.id];
      if (img && img.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarCX, avatarCY, avatarR, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, avatarCX - avatarR, avatarCY - avatarR, avatarR * 2, avatarR * 2);
        ctx.restore();
      } else {
        // Fallback stylish monogram circle
        ctx.beginPath();
        ctx.arc(avatarCX, avatarCY, avatarR, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 16px Kantumruy Pro, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(student.studentName.charAt(0) || 'S', avatarCX, avatarCY + 6);
      }

      // Glowing Gold Avatar Ring
      ctx.beginPath();
      ctx.arc(avatarCX, avatarCY, avatarR + 2, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Student Name & Badge Information
      ctx.textAlign = 'left';

      // 1. Student Name
      ctx.fillStyle = '#fbbf24'; // Rich Gold
      ctx.font = 'bold 15px Kantumruy Pro, sans-serif';
      ctx.fillText(student.studentName, badgeX + 80, badgeY + 26);

      // 2. Honors Badge / School
      ctx.fillStyle = '#38bdf8'; // Cyan
      ctx.font = '11px Kantumruy Pro, sans-serif';
      ctx.fillText(student.studentBadge, badgeX + 80, badgeY + 45);

      // 3. Live Practice Indicator with pulsing dot
      const dotX = badgeX + 84;
      const dotY = badgeY + 60;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Kantumruy Pro, sans-serif';
      ctx.fillText('អនុវត្តន៍លំហាត់ផ្ទាល់ • SHINE Institute', dotX + 8, dotY + 3.5);

      ctx.restore();
    }

    /* ============================================================
       LIVE VALUE CALLOUT CARD (BOTTOM LEFT)
       ============================================================ */
    drawLiveValueCard(ctx, cx, cy, x, y, student) {
      ctx.save();

      const cardX = 24;
      const cardY = 640;
      const cardW = 380;
      const cardH = 56;

      ctx.fillStyle = 'rgba(7, 13, 27, 0.85)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      this.roundRect(ctx, cardX, cardY, cardW, cardH, 8);
      ctx.fill();
      ctx.stroke();

      // Degrees and Radians
      const deg = ((x * 180) / Math.PI).toFixed(1);
      const radFrac = (x / Math.PI).toFixed(2);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`មុំ θ: ${deg}° (${radFrac}π rad)`, cardX + 16, cardY + 24);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px JetBrains Mono, monospace';
      ctx.fillText(`y = ${y.toFixed(3)}`, cardX + 16, cardY + 44);

      // Update DOM HUD elements as well
      if (this.hudAngle) {
        this.hudAngle.innerHTML = `មុំ θ = <strong>${deg}°</strong> (${radFrac}π rad)`;
      }
      if (this.hudYVal) {
        this.hudYVal.innerHTML = `តម្លៃ f(θ) = <strong>${y.toFixed(3)}</strong>`;
      }

      ctx.restore();
    }

    /* ============================================================
       HELPERS
       ============================================================ */
    drawArrow(ctx, x, y, angle, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-7, -4);
      ctx.lineTo(-7, 4);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    roundRect(ctx, x, y, w, h, r) {
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      }
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.trigPracticeStudio = new TrigPracticeStudio();
    });
  } else {
    window.trigPracticeStudio = new TrigPracticeStudio();
  }
})();
