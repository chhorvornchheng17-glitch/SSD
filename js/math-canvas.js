/**
 * math-canvas.js - Interactive Geometric & Mathematical Particles Background Canvas
 * Teacher Chheng Chhovorn - Mathematics Portfolio
 */

(function () {
  'use strict';

  class MathCanvasAnimation {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.symbols = ['π', '∑', '∫', '∞', '√x', 'Δ', 'e', 'θ', 'f(x)', 'λ', 'x²', '∇', '≈', '≠', 'lim', 'sinθ', 'dy/dx'];
      this.particles = [];
      this.symbolsParticles = [];
      this.geometricNodes = [];
      this.numNodes = 40;
      this.numSymbols = 22;
      this.maxConnectDistance = 140;
      this.mouse = { x: null, y: null, radius: 150 };
      this.animationFrameId = null;
      this.isDark = true;
      this.time = 0;

      this.init();
    }

    init() {
      this.resize();
      this.checkTheme();
      this.createParticles();
      this.createSymbols();

      window.addEventListener('resize', () => {
        this.resize();
        this.createParticles();
        this.createSymbols();
      });

      window.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      // Observer for theme changes
      const observer = new MutationObserver(() => {
        this.checkTheme();
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

      this.animate();
    }

    checkTheme() {
      this.isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    }

    resize() {
      const container = this.canvas.parentElement;
      const rect = container ? container.getBoundingClientRect() : { width: window.innerWidth, height: 600 };
      this.canvas.width = rect.width || window.innerWidth;
      this.canvas.height = rect.height || 600;

      if (window.innerWidth < 768) {
        this.numNodes = 20;
        this.numSymbols = 12;
        this.maxConnectDistance = 90;
      } else {
        this.numNodes = 45;
        this.numSymbols = 22;
        this.maxConnectDistance = 140;
      }
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.numNodes; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2.5 + 1.5,
          color: this.isDark ? 'rgba(56, 189, 248, ' : 'rgba(2, 132, 199, '
        });
      }
    }

    createSymbols() {
      this.symbolsParticles = [];
      for (let i = 0; i < this.numSymbols; i++) {
        const text = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        this.symbolsParticles.push({
          text: text,
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.15, // slight upward float
          fontSize: Math.floor(Math.random() * 12) + 14,
          opacity: Math.random() * 0.4 + 0.15,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.01
        });
      }
    }

    drawCoordinateGrid() {
      const step = 60;
      this.ctx.save();
      this.ctx.strokeStyle = this.isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(15, 23, 42, 0.035)';
      this.ctx.lineWidth = 1;

      for (let x = 0; x < this.canvas.width; x += step) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
        this.ctx.stroke();
      }

      for (let y = 0; y < this.canvas.height; y += step) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.stroke();
      }
      this.ctx.restore();
    }

    drawSineWaves() {
      this.ctx.save();
      const waveColor = this.isDark ? 'rgba(20, 184, 166, 0.1)' : 'rgba(13, 148, 136, 0.08)';
      const waveColor2 = this.isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(79, 70, 229, 0.06)';

      const drawWave = (color, amp, freq, speed, yOffset) => {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let x = 0; x < this.canvas.width; x += 5) {
          const y = yOffset + Math.sin(x * freq + this.time * speed) * amp;
          if (x === 0) this.ctx.moveTo(x, y);
          else this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
      };

      const centerY = this.canvas.height * 0.55;
      drawWave(waveColor, 40, 0.005, 0.02, centerY);
      drawWave(waveColor2, 55, 0.003, -0.015, centerY + 20);
      this.ctx.restore();
    }

    drawSymbols() {
      this.ctx.save();
      this.symbolsParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        // Wrap around bounds
        if (p.x < -40) p.x = this.canvas.width + 20;
        if (p.x > this.canvas.width + 40) p.x = -20;
        if (p.y < -40) p.y = this.canvas.height + 20;
        if (p.y > this.canvas.height + 40) p.y = -20;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rot);

        const color = this.isDark
          ? `rgba(226, 232, 240, ${p.opacity})`
          : `rgba(30, 41, 59, ${p.opacity * 0.8})`;

        this.ctx.font = `600 ${p.fontSize}px 'Outfit', 'Inter', monospace, sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(p.text, 0, 0);
        this.ctx.restore();
      });
      this.ctx.restore();
    }

    drawConnectionsAndParticles() {
      this.ctx.save();

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

        // Mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.mouse.radius) {
            const force = (1 - dist / this.mouse.radius) * 1.5;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        // Draw particle dot
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.isDark ? 'rgba(56, 189, 248, 0.85)' : 'rgba(2, 132, 199, 0.85)';
        this.ctx.fill();

        // Connect with other particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.maxConnectDistance) {
            const alpha = (1 - dist / this.maxConnectDistance) * (this.isDark ? 0.35 : 0.25);
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = this.isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(2, 132, 199, ${alpha})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
          }
        }

        // Connect to mouse if close
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const mdx = this.mouse.x - p.x;
          const mdy = this.mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < this.mouse.radius) {
            const mAlpha = (1 - mdist / this.mouse.radius) * 0.45;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.strokeStyle = this.isDark
              ? `rgba(245, 158, 11, ${mAlpha})`
              : `rgba(217, 119, 6, ${mAlpha})`;
            this.ctx.lineWidth = 1.2;
            this.ctx.stroke();
          }
        }
      }

      this.ctx.restore();
    }

    animate() {
      this.time += 1;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawCoordinateGrid();
      this.drawSineWaves();
      this.drawSymbols();
      this.drawConnectionsAndParticles();

      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    }
  }

  // Initialize canvas when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new MathCanvasAnimation('hero-math-canvas');
  });
})();
