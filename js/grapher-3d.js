/**
 * grapher-3d.js - Interactive 3D Mathematical Grapher & Oxyz Space Geometry Studio
 * Features:
 * 1. 3D Surface Grapher: z = f(x, y) with Math Parser, Presets, Domain Controls & Color Shaders
 * 2. 3D Space Geometry (Oxyz): Plot 3D Coordinates A(x,y,z), Vectors, Midpoint, Distance & Plane Equation
 * 3. 60 FPS HTML5 Canvas 3D Engine: 360° Orbit Drag, Mouse Wheel Zoom, Depth Sorting & Directional Lighting
 * 4. Export HD PNG, View Presets (Isometric, Top XOY, Front XOZ, Side YOZ), Auto-Rotate Turntable
 * Teacher Chheng Chhovorn - Mathematics Platform
 */

(function () {
  'use strict';

  // ============================================================
  // 1. MATHEMATICAL PARSER & 3D PRESETS
  // ============================================================
  const PRESET_SURFACES = {
    saddle: {
      name: 'ផ្ទៃកែបសេះ (Hyperbolic Paraboloid)',
      formula: 'x^2 - y^2',
      xRange: [-3, 3],
      yRange: [-3, 3],
      resolution: 28,
      desc: 'ផ្ទៃកែបសេះមានចំណុចកែប (Saddle Point) ត្រង់គល់កូអរដោនេ (0, 0, 0)។'
    },
    paraboloid: {
      name: 'ចានប៉ារ៉ាបូឡូអ៊ីត (Elliptic Paraboloid)',
      formula: '(x^2 + y^2) / 3',
      xRange: [-3, 3],
      yRange: [-3, 3],
      resolution: 28,
      desc: 'ក្រាបមានរាងដូចចានផ្ងារឡើងលើ កំពូលអប្បបរមាត្រង់ (0, 0, 0)។'
    },
    sombrero: {
      name: 'រលកទឹករាងមួក (Sombrero Ripple Wave)',
      formula: '3 * sin(sqrt(x^2 + y^2)) / (sqrt(x^2 + y^2) + 0.1)',
      xRange: [-6, 6],
      yRange: [-6, 6],
      resolution: 34,
      desc: 'រលកទឹករាងជារង្វង់កណ្តាលរីកសាយភាយតាមអនុគមន៍ស៊ីនុសធៀបនឹងចម្ងាយ r។'
    },
    waves: {
      name: 'រលកពងមាន់ (Egg Carton Waves)',
      formula: 'sin(x) * cos(y)',
      xRange: [-5, 5],
      yRange: [-5, 5],
      resolution: 32,
      desc: 'រលកបន្តបន្ទាប់គ្នាដែលបង្កើតជាកំពូល និងជ្រលងឆ្លាស់គ្នាដូចប្រអប់ពងមាន់។'
    },
    gaussian: {
      name: 'កណ្តឹងហ្គោស 3D (Gaussian Bell Hill)',
      formula: '3.5 * exp(-(x^2 + y^2) / 3)',
      xRange: [-4, 4],
      yRange: [-4, 4],
      resolution: 30,
      desc: 'អនុគមន៍ដង់ស៊ីតេប្រូបាប៊ីលីតេធម្មតា (Normal Distribution) ក្នុងលំហ 2D។'
    },
    plane: {
      name: 'ប្លង់ក្នុងលំហ (Plane in 3D Space)',
      formula: '3 - 0.6*x - 0.4*y',
      xRange: [-4, 4],
      yRange: [-4, 4],
      resolution: 20,
      desc: 'សមីការប្លង់ ax + by + cz = d កាត់អ័ក្សកូអរដោនេក្នុងលំហ Oxyz។'
    },
    hemisphere: {
      name: 'អឌ្ឍស្វ៊ែរ 3D (Hemisphere)',
      formula: 'sqrt(max(0, 16 - x^2 - y^2))',
      xRange: [-4, 4],
      yRange: [-4, 4],
      resolution: 32,
      desc: 'ពាក់កណ្តាលផ្ទៃស្វ៊ែរខាងលើដែលមានកាំ R = 4 ផ្ចិត O(0,0,0)។'
    },
    monkey_saddle: {
      name: 'កែបស្វា 3D (Monkey Saddle)',
      formula: '(x^3 - 3*x*y^2) / 6',
      xRange: [-3, 3],
      yRange: [-3, 3],
      resolution: 30,
      desc: 'ផ្ទៃដែលមានជម្រាលចុះ ៣ ទិស សម្រាប់ជើងស្វាទាំងពីរ និងកន្ទុយ។'
    }
  };

  // Safe Math Parser
  function compileMathExpression(exprStr) {
    if (!exprStr || typeof exprStr !== 'string') return () => 0;

    let clean = exprStr.trim().toLowerCase();

    // Replace power operator
    clean = clean.replace(/\^/g, '**');

    // Replace implicit multiplication: e.g. 2x -> 2*x, 3sin -> 3*sin, x( -> x*(
    clean = clean.replace(/([0-9]+)\s*([a-zA-Z(])/g, '$1*$2');
    clean = clean.replace(/([xXyY])\s*([xXyY(])/g, '$1*$2');
    clean = clean.replace(/\)\s*([0-9a-zA-Z(])/g, ')*$1');

    // Mathematical constants and functions
    const mathReplacements = [
      { pattern: /\bpi\b/g, rep: 'Math.PI' },
      { pattern: /\be\b/g, rep: 'Math.E' },
      { pattern: /\bsin\b/g, rep: 'Math.sin' },
      { pattern: /\bcos\b/g, rep: 'Math.cos' },
      { pattern: /\btan\b/g, rep: 'Math.tan' },
      { pattern: /\bsqrt\b/g, rep: 'Math.sqrt' },
      { pattern: /\babs\b/g, rep: 'Math.abs' },
      { pattern: /\bexp\b/g, rep: 'Math.exp' },
      { pattern: /\blog\b/g, rep: 'Math.log' },
      { pattern: /\bmax\b/g, rep: 'Math.max' },
      { pattern: /\bmin\b/g, rep: 'Math.min' }
    ];

    mathReplacements.forEach(({ pattern, rep }) => {
      clean = clean.replace(pattern, rep);
    });

    try {
      /* eslint-disable no-new-func */
      const fn = new Function('x', 'y', `
        try {
          const z = ${clean};
          return (Number.isFinite(z)) ? z : 0;
        } catch(e) {
          return 0;
        }
      `);
      // Test run with dummy coordinates
      fn(1, 1);
      return fn;
    } catch (e) {
      console.warn('Math compile error:', e);
      return () => 0;
    }
  }

  // ============================================================
  // 2. COLOR SHADER PALETTES
  // ============================================================
  const COLOR_PALETTES = {
    cyber: {
      name: 'Cyber Neon (ខៀវ-ស្វាយ-ស៊ីយ៉ាន)',
      getColor: (t) => {
        // t from 0 to 1
        const r = Math.round(14 + t * 220);
        const g = Math.round(165 - t * 80 + Math.sin(t * Math.PI) * 90);
        const b = Math.round(233 + (1 - t) * 22);
        return `rgb(${r}, ${g}, ${b})`;
      }
    },
    viridis: {
      name: 'Viridis (ស្វាយ-បៃតង-លឿង)',
      getColor: (t) => {
        const r = Math.round(68 + t * 185);
        const g = Math.round(1 + t * 220);
        const b = Math.round(84 + (1 - t) * 120);
        return `rgb(${r}, ${g}, ${b})`;
      }
    },
    sunset: {
      name: 'Sunset Gold (ស្វាយ-ទឹកក្រូច-មាស)',
      getColor: (t) => {
        const r = Math.round(120 + t * 135);
        const g = Math.round(20 + t * 190);
        const b = Math.round(180 * (1 - t) + 20);
        return `rgb(${r}, ${g}, ${b})`;
      }
    },
    ocean: {
      name: 'Ocean Blue (ខៀវជ្រៅ-ផ្ទៃមេឃ)',
      getColor: (t) => {
        const r = Math.round(8 + t * 100);
        const g = Math.round(70 + t * 160);
        const b = Math.round(160 + t * 95);
        return `rgb(${r}, ${g}, ${b})`;
      }
    },
    rainbow: {
      name: 'Rainbow Spectrum (ឥន្ទធនូពេញលេញ)',
      getColor: (t) => {
        const hue = Math.round((1 - t) * 260); // blue to red
        return `hsl(${hue}, 85%, 55%)`;
      }
    }
  };

  // ============================================================
  // 3. 3D MATH ENGINE & PROJECTION
  // ============================================================
  class Engine3D {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      // Camera State
      this.pitch = 0.55; // Angle in radians (elevation)
      this.yaw = -0.75; // Angle in radians (azimuth)
      this.zoom = 40; // Scale pixels per 3D unit
      this.panX = 0;
      this.panY = 0;
      this.target = { x: 0, y: 0, z: 0 }; // 3D center of view & orbit
      this.width = 800; // Logical CSS width
      this.height = 540; // Logical CSS height

      // Mouse & Touch interaction state
      this.isDragging = false;
      this.isPanning = false;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.autoRotate = false;
      this.autoRotateSpeed = 0.006;

      // Rendering Style
      this.renderMode = 'solid_wire'; // 'solid', 'wireframe', 'solid_wire'
      this.paletteKey = 'cyber';
      this.showAxes = true;
      this.showGrid = true;
      this.projectionType = 'perspective'; // 'perspective' or 'orthographic'

      // Light source (normalized directional vector)
      this.light = this.normalizeVector({ x: -1.2, y: -1.0, z: 2.2 });
    }

    normalizeVector(v) {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1;
      return { x: v.x / len, y: v.y / len, z: v.z / len };
    }

    // Transform 3D world coordinate (x, y, z) into 3D camera space around target
    worldToCamera(p) {
      const tx = this.target ? (this.target.x || 0) : 0;
      const ty = this.target ? (this.target.y || 0) : 0;
      const tz = this.target ? (this.target.z || 0) : 0;

      const px = p.x - tx;
      const py = p.y - ty;
      const pz = p.z - tz;

      // 1. Rotate around Z axis (Yaw)
      const cosY = Math.cos(this.yaw);
      const sinY = Math.sin(this.yaw);
      const x1 = px * cosY - py * sinY;
      const y1 = px * sinY + py * cosY;
      const z1 = pz;

      // 2. Rotate around X axis (Pitch)
      const cosP = Math.cos(this.pitch);
      const sinP = Math.sin(this.pitch);
      const x2 = x1;
      const y2 = y1 * cosP - z1 * sinP;
      const z2 = y1 * sinP + z1 * cosP;

      return { x: x2, y: y2, z: z2 };
    }

    // Project 3D camera point into 2D Screen pixel coordinates centered on logical canvas
    project(p) {
      const cam = this.worldToCamera(p);
      const w = this.width || (this.canvas ? this.canvas.clientWidth : 800) || 800;
      const h = this.height || (this.canvas ? this.canvas.clientHeight : 540) || 540;
      const cx = w / 2 + this.panX;
      const cy = h / 2 + this.panY;

      if (this.projectionType === 'perspective') {
        const d = 24; // Smooth camera focal distance
        const depth = d + cam.y; // distance along line of sight
        const factor = depth > 0.5 ? d / depth : 1;

        return {
          sx: cx + cam.x * this.zoom * factor,
          sy: cy - cam.z * this.zoom * factor,
          depth: cam.y,
          visible: depth > 0.5
        };
      } else {
        // Orthographic projection
        return {
          sx: cx + cam.x * this.zoom,
          sy: cy - cam.z * this.zoom,
          depth: cam.y,
          visible: true
        };
      }
    }
  }

  // ============================================================
  // 4. MAIN GRAPHER 3D STUDIO CONTROLLER
  // ============================================================
  class Grapher3DStudio {
    constructor() {
      this.canvas = document.getElementById('canvas-3d-grapher');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.engine = new Engine3D(this.canvas);

      // Modes: 'surface' or 'coordinates'
      this.activeTab = 'surface';

      // Surface Model state
      this.currentPresetKey = 'saddle';
      this.formulaStr = 'x^2 - y^2';
      this.mathFn = compileMathExpression(this.formulaStr);
      this.xRange = [-3, 3];
      this.yRange = [-3, 3];
      this.resolution = 28;

      // Coordinates / Points & Vectors Model state
      this.pointsList = [
        { label: 'A', x: 2, y: 3, z: 4, color: '#ef4444' },
        { label: 'B', x: -2, y: 1, z: 3, color: '#38bdf8' },
        { label: 'C', x: 0, y: -3, z: 2, color: '#10b981' }
      ];

      this.initDPI();
      this.initDOM();
      this.initEvents();
      this.recalculateSurfaceCenter();
      this.updateFormulaInfo();
      this.updatePointsCalculations();

      // Start 60 FPS animation loop
      requestAnimationFrame(() => this.animate());
    }

    initDPI() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = rect.width || 800;
      this.height = rect.height || 540;

      this.canvas.width = Math.round(this.width * dpr);
      this.canvas.height = Math.round(this.height * dpr);

      // Ensure transform matches DPR scaling so drawing uses logical units
      if (this.ctx.resetTransform) {
        this.ctx.resetTransform();
      } else {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      this.ctx.scale(dpr, dpr);

      this.engine.width = this.width;
      this.engine.height = this.height;
    }

    initDOM() {
      // Inputs & Buttons
      this.formulaInput = document.getElementById('input-formula-3d');
      this.plotBtn = document.getElementById('btn-plot-3d');
      this.xMinInput = document.getElementById('input-xmin');
      this.xMaxInput = document.getElementById('input-xmax');
      this.yMinInput = document.getElementById('input-ymin');
      this.yMaxInput = document.getElementById('input-ymax');
      this.resolutionSlider = document.getElementById('slider-res-3d');
      this.resolutionValue = document.getElementById('val-res-3d');

      // Style Controls
      this.renderModeSelect = document.getElementById('select-render-mode');
      this.paletteSelect = document.getElementById('select-palette');
      this.toggleAxesCheckbox = document.getElementById('toggle-axes');
      this.toggleGridCheckbox = document.getElementById('toggle-grid');
      this.toggleAutoRotateBtn = document.getElementById('btn-auto-rotate');

      // Camera Preset Buttons
      this.btnCenter = document.getElementById('btn-view-center');
      this.btnIso = document.getElementById('btn-view-iso');
      this.btnTop = document.getElementById('btn-view-top');
      this.btnFront = document.getElementById('btn-view-front');
      this.btnSide = document.getElementById('btn-view-side');
      this.btnReset = document.getElementById('btn-view-reset');
      this.btnSnapshot = document.getElementById('btn-snapshot-3d');

      // Coordinates Mode DOM
      this.pointsInput = document.getElementById('input-points-coords');
      this.plotPointsBtn = document.getElementById('btn-plot-points');
      this.pointsResultsBox = document.getElementById('coords-calc-results');

      // HUD & Info
      this.hudAngles = document.getElementById('hud-3d-angles');
      this.hudFormula = document.getElementById('hud-3d-formula');
      this.formulaDesc = document.getElementById('formula-description');
    }

    initEvents() {
      // Resize
      window.addEventListener('resize', () => {
        this.initDPI();
      });

      // Canvas Drag to Rotate & Pan
      this.canvas.addEventListener('mousedown', (e) => {
        this.engine.isDragging = true;
        this.engine.isPanning = (e.button === 2 || e.shiftKey);
        this.engine.lastMouseX = e.clientX;
        this.engine.lastMouseY = e.clientY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.engine.isDragging) return;
        const dx = e.clientX - this.engine.lastMouseX;
        const dy = e.clientY - this.engine.lastMouseY;
        this.engine.lastMouseX = e.clientX;
        this.engine.lastMouseY = e.clientY;

        if (this.engine.isPanning) {
          this.engine.panX += dx;
          this.engine.panY += dy;
        } else {
          this.engine.yaw += dx * 0.01;
          this.engine.pitch += dy * 0.01;

          // Limit pitch to avoid flipping upside down
          const maxPitch = Math.PI / 2 - 0.05;
          this.engine.pitch = Math.max(-maxPitch, Math.min(maxPitch, this.engine.pitch));
        }
        this.updateHUD();
      });

      window.addEventListener('mouseup', () => {
        this.engine.isDragging = false;
        this.engine.isPanning = false;
      });

      // Prevent Context Menu on canvas to allow right-click panning
      this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

      // Mouse Wheel to Zoom
      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        this.engine.zoom = Math.max(10, Math.min(180, this.engine.zoom * factor));
        this.updateHUD();
      }, { passive: false });

      // Touch Events for Mobile (Single Touch = Rotate, Pinch = Zoom)
      let initialTouchDist = 0;
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.engine.isDragging = true;
          this.engine.lastMouseX = e.touches[0].clientX;
          this.engine.lastMouseY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          this.engine.isDragging = false;
          initialTouchDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
        }
      }, { passive: true });

      this.canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && this.engine.isDragging) {
          const dx = e.touches[0].clientX - this.engine.lastMouseX;
          const dy = e.touches[0].clientY - this.engine.lastMouseY;
          this.engine.lastMouseX = e.touches[0].clientX;
          this.engine.lastMouseY = e.touches[0].clientY;

          this.engine.yaw += dx * 0.012;
          this.engine.pitch += dy * 0.012;
          const maxPitch = Math.PI / 2 - 0.05;
          this.engine.pitch = Math.max(-maxPitch, Math.min(maxPitch, this.engine.pitch));
          this.updateHUD();
        } else if (e.touches.length === 2) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          if (initialTouchDist > 0) {
            const factor = dist / initialTouchDist;
            this.engine.zoom = Math.max(10, Math.min(180, this.engine.zoom * factor));
            initialTouchDist = dist;
            this.updateHUD();
          }
        }
      }, { passive: true });

      this.canvas.addEventListener('touchend', () => {
        this.engine.isDragging = false;
        initialTouchDist = 0;
      });

      // Tabs: Surface vs Coordinates
      const tabBtns = document.querySelectorAll('[data-grapher-tab]');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeTab = btn.getAttribute('data-grapher-tab');

          document.querySelectorAll('.grapher-tab-pane').forEach(p => p.classList.remove('active'));
          const targetPane = document.getElementById(`tab-pane-${this.activeTab}`);
          if (targetPane) targetPane.classList.add('active');

          this.recenterView();
        });
      });

      // Recenter View Button & Canvas Double-Click
      if (this.btnCenter) {
        this.btnCenter.addEventListener('click', () => this.recenterView());
      }
      this.canvas.addEventListener('dblclick', () => this.recenterView());

      // Formula Plot Button
      if (this.plotBtn) {
        this.plotBtn.addEventListener('click', () => this.applyCustomFormula());
      }
      if (this.formulaInput) {
        this.formulaInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') this.applyCustomFormula();
        });
      }

      // Presets Selection
      const presetButtons = document.querySelectorAll('[data-preset-3d]');
      presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          presetButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const key = btn.getAttribute('data-preset-3d');
          this.applyPreset(key);
        });
      });

      // Domain Sliders and Inputs
      if (this.resolutionSlider) {
        this.resolutionSlider.addEventListener('input', (e) => {
          this.resolution = parseInt(e.target.value, 10);
          if (this.resolutionValue) this.resolutionValue.textContent = `${this.resolution}x${this.resolution}`;
        });
      }

      // Render Mode
      if (this.renderModeSelect) {
        this.renderModeSelect.addEventListener('change', (e) => {
          this.engine.renderMode = e.target.value;
        });
      }

      // Palette Select
      if (this.paletteSelect) {
        this.paletteSelect.addEventListener('change', (e) => {
          this.engine.paletteKey = e.target.value;
        });
      }

      // Checkboxes: Axes & Grid
      if (this.toggleAxesCheckbox) {
        this.toggleAxesCheckbox.addEventListener('change', (e) => {
          this.engine.showAxes = e.target.checked;
        });
      }
      if (this.toggleGridCheckbox) {
        this.toggleGridCheckbox.addEventListener('change', (e) => {
          this.engine.showGrid = e.target.checked;
        });
      }

      // Auto-Rotate Button
      if (this.toggleAutoRotateBtn) {
        this.toggleAutoRotateBtn.addEventListener('click', () => {
          this.engine.autoRotate = !this.engine.autoRotate;
          this.toggleAutoRotateBtn.classList.toggle('active', this.engine.autoRotate);
          this.toggleAutoRotateBtn.innerHTML = this.engine.autoRotate
            ? '<span>⏸️ ផ្អាកបង្វិល</span>'
            : '<span>🔄 បង្វិល 360°</span>';
        });
      }

      // View Angle Buttons
      if (this.btnIso) {
        this.btnIso.addEventListener('click', () => {
          this.engine.pitch = 0.55;
          this.engine.yaw = -0.75;
          this.engine.panX = 0;
          this.engine.panY = 0;
          this.updateHUD();
        });
      }
      if (this.btnTop) {
        this.btnTop.addEventListener('click', () => {
          this.engine.pitch = Math.PI / 2 - 0.01; // looking down on XOY
          this.engine.yaw = 0;
          this.engine.panX = 0;
          this.engine.panY = 0;
          this.updateHUD();
        });
      }
      if (this.btnFront) {
        this.btnFront.addEventListener('click', () => {
          this.engine.pitch = 0; // looking at XOZ
          this.engine.yaw = 0;
          this.engine.panX = 0;
          this.engine.panY = 0;
          this.updateHUD();
        });
      }
      if (this.btnSide) {
        this.btnSide.addEventListener('click', () => {
          this.engine.pitch = 0;
          this.engine.yaw = -Math.PI / 2; // looking at YOZ
          this.engine.panX = 0;
          this.engine.panY = 0;
          this.updateHUD();
        });
      }
      if (this.btnReset) {
        this.btnReset.addEventListener('click', () => {
          this.engine.pitch = 0.55;
          this.engine.yaw = -0.75;
          this.recenterView();
        });
      }

      // Snapshot PNG Export
      if (this.btnSnapshot) {
        this.btnSnapshot.addEventListener('click', () => this.exportSnapshot());
      }

      // Coordinates Plotting Button
      if (this.plotPointsBtn) {
        this.plotPointsBtn.addEventListener('click', () => this.applyCustomPoints());
      }
    }

    recalculateSurfaceCenter() {
      const xMin = this.xRange[0];
      const xMax = this.xRange[1];
      const yMin = this.yRange[0];
      const yMax = this.yRange[1];

      // Sample surface grid to determine height range and optimal bounding box
      const sampleSteps = 16;
      const dx = (xMax - xMin) / sampleSteps;
      const dy = (yMax - yMin) / sampleSteps;
      let minZ = Infinity;
      let maxZ = -Infinity;

      for (let i = 0; i <= sampleSteps; i++) {
        const x = xMin + i * dx;
        for (let j = 0; j <= sampleSteps; j++) {
          const y = yMin + j * dy;
          const z = this.mathFn(x, y);
          if (Number.isFinite(z)) {
            if (z < minZ) minZ = z;
            if (z > maxZ) maxZ = z;
          }
        }
      }

      if (!Number.isFinite(minZ) || !Number.isFinite(maxZ)) {
        minZ = -2;
        maxZ = 2;
      }

      const midX = (xMin + xMax) / 2;
      const midY = (yMin + yMax) / 2;
      const midZ = (minZ + maxZ) / 2;

      this.engine.target = { x: midX, y: midY, z: midZ };
      this.engine.panX = 0;
      this.engine.panY = 0;

      // Calculate optimal zoom to fit surface within canvas viewport
      const spanX = Math.max(1, xMax - xMin);
      const spanY = Math.max(1, yMax - yMin);
      const spanZ = Math.max(1, maxZ - minZ);
      const maxSpan = Math.max(spanX, spanY, spanZ * 0.7);
      const targetZoom = Math.max(16, Math.min(50, Math.round((this.height * 0.5) / (maxSpan || 6))));
      this.engine.zoom = targetZoom;

      this.updateHUD();
    }

    recalculateCoordinatesCenter() {
      if (!this.pointsList || this.pointsList.length === 0) {
        this.engine.target = { x: 0, y: 0, z: 0 };
        this.engine.zoom = 40;
        this.engine.panX = 0;
        this.engine.panY = 0;
        return;
      }

      let minX = 0, maxX = 0;
      let minY = 0, maxY = 0;
      let minZ = 0, maxZ = 0;

      this.pointsList.forEach(pt => {
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
        if (pt.z < minZ) minZ = pt.z;
        if (pt.z > maxZ) maxZ = pt.z;
      });

      const midX = (minX + maxX) / 2;
      const midY = (minY + maxY) / 2;
      const midZ = (minZ + maxZ) / 2;

      this.engine.target = { x: midX, y: midY, z: midZ };
      this.engine.panX = 0;
      this.engine.panY = 0;

      const span = Math.max(Math.abs(maxX - minX), Math.abs(maxY - minY), Math.abs(maxZ - minZ), 4);
      const targetZoom = Math.max(20, Math.min(55, Math.round((this.height * 0.46) / span)));
      this.engine.zoom = targetZoom;

      this.updateHUD();
    }

    recenterView() {
      this.engine.panX = 0;
      this.engine.panY = 0;
      if (this.activeTab === 'surface') {
        this.recalculateSurfaceCenter();
      } else {
        this.recalculateCoordinatesCenter();
      }
      this.updateHUD();
    }

    applyPreset(presetKey) {
      const preset = PRESET_SURFACES[presetKey];
      if (!preset) return;
      this.currentPresetKey = presetKey;
      this.formulaStr = preset.formula;
      this.mathFn = compileMathExpression(this.formulaStr);
      this.xRange = [...preset.xRange];
      this.yRange = [...preset.yRange];
      this.resolution = preset.resolution;

      if (this.formulaInput) this.formulaInput.value = preset.formula;
      if (this.xMinInput) this.xMinInput.value = this.xRange[0];
      if (this.xMaxInput) this.xMaxInput.value = this.xRange[1];
      if (this.yMinInput) this.yMinInput.value = this.yRange[0];
      if (this.yMaxInput) this.yMaxInput.value = this.yRange[1];
      if (this.resolutionSlider) this.resolutionSlider.value = this.resolution;
      if (this.resolutionValue) this.resolutionValue.textContent = `${this.resolution}x${this.resolution}`;

      this.updateFormulaInfo();
      this.recalculateSurfaceCenter();
    }

    applyCustomFormula() {
      if (!this.formulaInput) return;
      const str = this.formulaInput.value.trim();
      if (!str) return;

      this.formulaStr = str;
      this.mathFn = compileMathExpression(this.formulaStr);

      if (this.xMinInput && this.xMaxInput) {
        this.xRange = [parseFloat(this.xMinInput.value) || -3, parseFloat(this.xMaxInput.value) || 3];
      }
      if (this.yMinInput && this.yMaxInput) {
        this.yRange = [parseFloat(this.yMinInput.value) || -3, parseFloat(this.yMaxInput.value) || 3];
      }

      this.updateFormulaInfo();
      this.recalculateSurfaceCenter();
    }

    applyCustomPoints() {
      if (!this.pointsInput) return;
      const text = this.pointsInput.value.trim();
      if (!text) return;

      // Parse points lines like: A(2, 3, 4) or B(-1, 2, 5) or 2,3,4
      const lines = text.split('\n');
      const newPoints = [];
      const colors = ['#ef4444', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

      lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Check if starts with label like "A(1, 2, 3)"
        const match = trimmed.match(/^([a-zA-Z0-9]+)\s*\(\s*(-?[0-9.]+)\s*,\s*(-?[0-9.]+)\s*,\s*(-?[0-9.]+)\s*\)/);
        if (match) {
          newPoints.push({
            label: match[1],
            x: parseFloat(match[2]),
            y: parseFloat(match[3]),
            z: parseFloat(match[4]),
            color: colors[idx % colors.length]
          });
        } else {
          // Fallback comma separated
          const parts = trimmed.split(',').map(s => parseFloat(s.trim()));
          if (parts.length >= 3 && parts.every(n => Number.isFinite(n))) {
            newPoints.push({
              label: String.fromCharCode(65 + newPoints.length),
              x: parts[0],
              y: parts[1],
              z: parts[2],
              color: colors[idx % colors.length]
            });
          }
        }
      });

      if (newPoints.length > 0) {
        this.pointsList = newPoints;
        this.updatePointsCalculations();
        this.recalculateCoordinatesCenter();
      }
    }

    updateFormulaInfo() {
      if (this.hudFormula) {
        this.hudFormula.textContent = `z = ${this.formulaStr}`;
      }
      if (this.formulaDesc) {
        const preset = PRESET_SURFACES[this.currentPresetKey];
        if (preset && preset.formula === this.formulaStr) {
          this.formulaDesc.textContent = `${preset.name}៖ ${preset.desc}`;
        } else {
          this.formulaDesc.textContent = `ផ្ទៃក្រាប 3D តាមសមីការ z = ${this.formulaStr} លើចន្លោះ x ∈ [${this.xRange[0]}, ${this.xRange[1]}] និង y ∈ [${this.yRange[0]}, ${this.yRange[1]}]។`;
        }
      }
    }

    updatePointsCalculations() {
      if (!this.pointsResultsBox) return;
      if (this.pointsList.length < 2) {
        this.pointsResultsBox.innerHTML = '<p style="color: #94a3b8; font-size: 0.85rem;">សូមបញ្ចូលយ៉ាងហោចណាស់ ២ ចំណុចដើម្បីគណនាចម្ងាយ និងវ៉ិចទ័រ។</p>';
        return;
      }

      const pA = this.pointsList[0];
      const pB = this.pointsList[1];

      // Distance AB
      const distAB = Math.sqrt(
        Math.pow(pB.x - pA.x, 2) + Math.pow(pB.y - pA.y, 2) + Math.pow(pB.z - pA.z, 2)
      );

      // Midpoint M
      const midM = {
        x: ((pA.x + pB.x) / 2).toFixed(2),
        y: ((pA.y + pB.y) / 2).toFixed(2),
        z: ((pA.z + pB.z) / 2).toFixed(2)
      };

      // Vector AB
      const vecAB = {
        x: (pB.x - pA.x).toFixed(2),
        y: (pB.y - pA.y).toFixed(2),
        z: (pB.z - pA.z).toFixed(2)
      };

      let html = `
        <div style="background: rgba(15, 23, 42, 0.7); border-radius: 8px; padding: 0.75rem; border: 1px solid rgba(56, 189, 248, 0.2); font-size: 0.88rem; line-height: 1.6;">
          <div style="color: #38bdf8; font-weight: 700; margin-bottom: 0.3rem;">📐 លទ្ធផលធរណីមាត្រក្នុងលំហ Oxyz៖</div>
          <div>• វ៉ិចទ័រ $\\vec{${pA.label}${pB.label}} = (${vecAB.x}, ${vecAB.y}, ${vecAB.z})$</div>
          <div>• ប្រវែងចម្ងាយ $d(${pA.label}, ${pB.label}) = ||\\vec{${pA.label}${pB.label}}|| = \\mathbf{${distAB.toFixed(2)}}$ ឯកតា</div>
          <div>• ចំណុចកណ្តាល $M(${midM.x}, ${midM.y}, ${midM.z})$</div>
      `;

      // If 3 points, calculate normal vector and plane equation
      if (this.pointsList.length >= 3) {
        const pC = this.pointsList[2];
        const vAB = { x: pB.x - pA.x, y: pB.y - pA.y, z: pB.z - pA.z };
        const vAC = { x: pC.x - pA.x, y: pC.y - pA.y, z: pC.z - pA.z };

        // Cross product n = vAB x vAC
        const nx = vAB.y * vAC.z - vAB.z * vAC.y;
        const ny = vAB.z * vAC.x - vAB.x * vAC.z;
        const nz = vAB.x * vAC.y - vAB.y * vAC.x;
        const dConst = -(nx * pA.x + ny * pA.y + nz * pA.z);

        html += `
          <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <div style="color: #f59e0b; font-weight: 700;">✈️ សមីការប្លង់កាត់ ៣ ចំណុច (${pA.label}${pB.label}${pC.label})៖</div>
            <div>• វ៉ិចទ័រប្រក្រតី $\\vec{n} = \\vec{${pA.label}${pB.label}} \\times \\vec{${pA.label}${pC.label}} = (${nx.toFixed(1)}, ${ny.toFixed(1)}, ${nz.toFixed(1)})$</div>
            <div>• សមីការទូទៅ៖ $\\mathbf{${nx.toFixed(1)}x + ${ny.toFixed(1)}y + ${nz.toFixed(1)}z + (${dConst.toFixed(1)}) = 0}$</div>
          </div>
        `;
      }

      html += '</div>';
      this.pointsResultsBox.innerHTML = html;

      // Re-render KaTeX if available
      if (window.renderMathInElement) {
        window.renderMathInElement(this.pointsResultsBox, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    }

    updateHUD() {
      if (this.hudAngles) {
        const degYaw = Math.round(((this.engine.yaw * 180) / Math.PI) % 360);
        const degPitch = Math.round((this.engine.pitch * 180) / Math.PI);
        this.hudAngles.textContent = `Yaw: ${degYaw}° | Pitch: ${degPitch}° | Zoom: ${Math.round(this.engine.zoom)}`;
      }
    }

    exportSnapshot() {
      const link = document.createElement('a');
      link.download = `3d-graph-${Date.now()}.png`;
      link.href = this.canvas.toDataURL('image/png');
      link.click();
    }

    // ============================================================
    // 5. 60 FPS ANIMATION & RENDER PIPELINE
    // ============================================================
    animate() {
      if (this.engine.autoRotate) {
        this.engine.yaw += this.engine.autoRotateSpeed;
        this.updateHUD();
      }

      this.render();
      requestAnimationFrame(() => this.animate());
    }

    render() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      // Clear Canvas with sleek deep background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      // Draw subtle background radial glow
      const glowGrad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w * 0.6);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
      glowGrad.addColorStop(1, 'rgba(9, 13, 22, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw Oxyz Grid Plane if enabled
      if (this.engine.showGrid) {
        this.renderGroundGrid(ctx);
      }

      // Draw 3D Surface Mesh or 3D Space Coordinates based on active mode
      if (this.activeTab === 'surface') {
        this.renderSurfaceMesh(ctx);
      } else {
        this.renderCoordinatesSpace(ctx);
      }

      // Draw Oxyz Coordinate Axes if enabled (on top for clarity)
      if (this.engine.showAxes) {
        this.renderAxes(ctx);
      }
    }

    // Render XOY Ground Grid
    renderGroundGrid(ctx) {
      const maxDim = Math.max(
        Math.abs(this.xRange[0]), Math.abs(this.xRange[1]),
        Math.abs(this.yRange[0]), Math.abs(this.yRange[1]),
        5
      );
      const gridRange = Math.min(10, Math.ceil(maxDim));
      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.lineWidth = 1;

      for (let i = -gridRange; i <= gridRange; i++) {
        const p1 = this.engine.project({ x: i, y: -gridRange, z: 0 });
        const p2 = this.engine.project({ x: i, y: gridRange, z: 0 });
        if (p1.visible && p2.visible) {
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.stroke();
        }

        const q1 = this.engine.project({ x: -gridRange, y: i, z: 0 });
        const q2 = this.engine.project({ x: gridRange, y: i, z: 0 });
        if (q1.visible && q2.visible) {
          ctx.beginPath();
          ctx.moveTo(q1.sx, q1.sy);
          ctx.lineTo(q2.sx, q2.sy);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // Render Oxyz Coordinate Axes with 3D Arrowheads and Labels
    renderAxes(ctx) {
      const maxDim = Math.max(
        Math.abs(this.xRange[0]), Math.abs(this.xRange[1]),
        Math.abs(this.yRange[0]), Math.abs(this.yRange[1]),
        5
      );
      const axisLen = Math.min(12, Math.ceil(maxDim) + 1.5);
      const origin = this.engine.project({ x: 0, y: 0, z: 0 });

      // Axis definitions: X (Red), Y (Green), Z (Blue)
      const axes = [
        { dir: { x: axisLen, y: 0, z: 0 }, label: 'X', color: '#ef4444' },
        { dir: { x: 0, y: axisLen, z: 0 }, label: 'Y', color: '#10b981' },
        { dir: { x: 0, y: 0, z: axisLen }, label: 'Z', color: '#38bdf8' }
      ];

      ctx.save();
      ctx.lineWidth = 2.5;

      axes.forEach(({ dir, label, color }) => {
        const pt = this.engine.project(dir);
        if (!origin.visible || !pt.visible) return;

        // Line
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(origin.sx, origin.sy);
        ctx.lineTo(pt.sx, pt.sy);
        ctx.stroke();

        // 3D Arrowhead
        const angle = Math.atan2(pt.sy - origin.sy, pt.sx - origin.sx);
        const headLen = 9;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(pt.sx, pt.sy);
        ctx.lineTo(pt.sx - headLen * Math.cos(angle - Math.PI / 6), pt.sy - headLen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(pt.sx - headLen * Math.cos(angle + Math.PI / 6), pt.sy - headLen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();

        // 3D Billboard Label
        ctx.fillStyle = color;
        ctx.font = '700 13px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, pt.sx + 12 * Math.cos(angle), pt.sy + 12 * Math.sin(angle));
      });

      // Origin dot O(0,0,0)
      if (origin.visible) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(origin.sx, origin.sy, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '600 11px "Outfit", sans-serif';
        ctx.fillText('O', origin.sx - 8, origin.sy + 8);
      }
      ctx.restore();
    }

    // Render 3D Surface Mesh with Painters Depth Sorting & Shading
    renderSurfaceMesh(ctx) {
      const res = this.resolution;
      const xMin = this.xRange[0];
      const xMax = this.xRange[1];
      const yMin = this.yRange[0];
      const yMax = this.yRange[1];

      const dx = (xMax - xMin) / res;
      const dy = (yMax - yMin) / res;

      // 1. Generate Vertex Grid
      const vertices = [];
      let minZ = Infinity;
      let maxZ = -Infinity;

      for (let i = 0; i <= res; i++) {
        vertices[i] = [];
        const x = xMin + i * dx;
        for (let j = 0; j <= res; j++) {
          const y = yMin + j * dy;
          const z = this.mathFn(x, y);
          vertices[i][j] = { x, y, z };
          if (z < minZ) minZ = z;
          if (z > maxZ) maxZ = z;
        }
      }

      if (maxZ === minZ) maxZ = minZ + 1; // avoid divide by zero

      // 2. Generate Triangles / Quads for Depth Sorting
      const faces = [];
      for (let i = 0; i < res; i++) {
        for (let j = 0; j < res; j++) {
          const v0 = vertices[i][j];
          const v1 = vertices[i + 1][j];
          const v2 = vertices[i + 1][j + 1];
          const v3 = vertices[i][j + 1];

          // Face normal calculation
          const ab = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
          const ac = { x: v3.x - v0.x, y: v3.y - v0.y, z: v3.z - v0.z };
          const nx = ab.y * ac.z - ab.z * ac.y;
          const ny = ab.z * ac.x - ab.x * ac.z;
          const nz = ab.x * ac.y - ab.y * ac.x;
          const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
          const normal = { x: nx / nLen, y: ny / nLen, z: nz / nLen };

          // Centroid for depth sorting
          const centroid = {
            x: (v0.x + v1.x + v2.x + v3.x) / 4,
            y: (v0.y + v1.y + v2.y + v3.y) / 4,
            z: (v0.z + v1.z + v2.z + v3.z) / 4
          };
          const camCentroid = this.engine.worldToCamera(centroid);

          faces.push({
            v: [v0, v1, v2, v3],
            normal,
            avgZ: centroid.z,
            depth: camCentroid.y // depth for Painter's algorithm
          });
        }
      }

      // Sort faces back to front (largest depth first)
      faces.sort((a, b) => b.depth - a.depth);

      // 3. Render Faces
      const palette = COLOR_PALETTES[this.engine.paletteKey] || COLOR_PALETTES.cyber;
      const isSolid = this.engine.renderMode === 'solid' || this.engine.renderMode === 'solid_wire';
      const isWire = this.engine.renderMode === 'wireframe' || this.engine.renderMode === 'solid_wire';

      ctx.save();
      faces.forEach(face => {
        const p0 = this.engine.project(face.v[0]);
        const p1 = this.engine.project(face.v[1]);
        const p2 = this.engine.project(face.v[2]);
        const p3 = this.engine.project(face.v[3]);

        if (!p0.visible || !p1.visible || !p2.visible || !p3.visible) return;

        // Path
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.lineTo(p3.sx, p3.sy);
        ctx.closePath();

        if (isSolid) {
          // Normalize height for coloring (0 to 1)
          const normZ = Math.max(0, Math.min(1, (face.avgZ - minZ) / (maxZ - minZ)));
          const baseColor = palette.getColor(normZ);

          // Directional Lighting calculation
          const dot = face.normal.x * this.engine.light.x +
                      face.normal.y * this.engine.light.y +
                      face.normal.z * this.engine.light.z;
          const diffuse = Math.max(0, dot);
          const brightness = 0.4 + 0.6 * diffuse; // ambient + diffuse

          ctx.fillStyle = baseColor;
          ctx.fill();

          // Apply subtle shadow/lighting glaze overlay
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, (1 - brightness) * 0.45)})`;
          ctx.fill();
        }

        if (isWire) {
          ctx.strokeStyle = isSolid ? 'rgba(255, 255, 255, 0.12)' : palette.getColor(0.8);
          ctx.lineWidth = isSolid ? 0.6 : 1.2;
          ctx.stroke();
        }
      });
      ctx.restore();
    }

    // Render 3D Space Geometry (Coordinates, Points, Droplines & Vectors)
    renderCoordinatesSpace(ctx) {
      ctx.save();

      // Draw vectors connecting points if >= 2 points
      if (this.pointsList.length >= 2) {
        ctx.lineWidth = 2.5;
        for (let i = 0; i < this.pointsList.length - 1; i++) {
          const p1 = this.pointsList[i];
          const p2 = this.pointsList[i + 1];
          const s1 = this.engine.project(p1);
          const s2 = this.engine.project(p2);

          if (s1.visible && s2.visible) {
            ctx.strokeStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(s1.sx, s1.sy);
            ctx.lineTo(s2.sx, s2.sy);
            ctx.stroke();

            // Vector arrow tip
            const angle = Math.atan2(s2.sy - s1.sy, s2.sx - s1.sx);
            const headLen = 10;
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(s2.sx, s2.sy);
            ctx.lineTo(s2.sx - headLen * Math.cos(angle - Math.PI / 6), s2.sy - headLen * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(s2.sx - headLen * Math.cos(angle + Math.PI / 6), s2.sy - headLen * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      // If 3 points, draw translucent plane triangle
      if (this.pointsList.length >= 3) {
        const sA = this.engine.project(this.pointsList[0]);
        const sB = this.engine.project(this.pointsList[1]);
        const sC = this.engine.project(this.pointsList[2]);

        if (sA.visible && sB.visible && sC.visible) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sA.sx, sA.sy);
          ctx.lineTo(sB.sx, sB.sy);
          ctx.lineTo(sC.sx, sC.sy);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }

      // Render Each Point with Drop-lines to XOY plane
      this.pointsList.forEach(pt => {
        const p3d = this.engine.project(pt);
        const pGround = this.engine.project({ x: pt.x, y: pt.y, z: 0 });

        if (!p3d.visible) return;

        // Vertical drop-line from point to XOY ground
        if (pGround.visible) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(p3d.sx, p3d.sy);
          ctx.lineTo(pGround.sx, pGround.sy);
          ctx.stroke();
          ctx.setLineDash([]);

          // Ground shadow dot
          ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
          ctx.beginPath();
          ctx.arc(pGround.sx, pGround.sy, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Point sphere node
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p3d.sx, p3d.sy, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // White border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Point Label & Coordinates Tag
        ctx.fillStyle = '#f8fafc';
        ctx.font = '700 12px "Outfit", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${pt.label}(${pt.x}, ${pt.y}, ${pt.z})`, p3d.sx + 10, p3d.sy - 4);
      });

      ctx.restore();
    }
  }

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    window.grapher3DApp = new Grapher3DStudio();
  });
})();
