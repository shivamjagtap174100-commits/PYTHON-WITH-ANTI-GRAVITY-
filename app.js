/**
 * Anti-Gravity Python - Main Application Controller
 * Handles UI reactivity, Web Audio synthesis, Confetti physics,
 * Code editor enhancements, A.N.T.I. Mentor, and LocalStorage sync.
 */

// ============================================================================
// 1. Web Audio API Sound Synthesizer (Zero-Dependency Sci-Fi Audio)
// ============================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChirp() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playRunSound() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  playSuccessChime() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Sci-fi triumphant chord: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + i * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      });
    } catch (e) {}
  }

  playErrorBuzz() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.2);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  playBadgeFanfare() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      arpeggio.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.4);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEffects();

// ============================================================================
// 2. Anti-Gravity Canvas Starfield Engine
// ============================================================================
class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.numStars = 45;
    this.mouseX = 0;
    this.mouseY = 0;

    this.resize();
    this.initStars();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random() * 0.3 + 0.05,
        pulseSpeed: Math.random() * 0.008 + 0.002,
        color: '#94a3b8'
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - this.width / 2) * 0.03;
      this.mouseY = (e.clientY - this.height / 2) * 0.03;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let star of this.stars) {
      // Floating upwards (anti-gravity upward drift!)
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = this.height;
        star.x = Math.random() * this.width;
      }

      // Gentle star twinkle
      star.alpha += star.pulseSpeed;
      if (star.alpha > 0.95 || star.alpha < 0.2) {
        star.pulseSpeed = -star.pulseSpeed;
      }

      const drawX = star.x - this.mouseX * (star.size * 0.5);
      const drawY = star.y - this.mouseY * (star.size * 0.5);

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      this.ctx.shadowBlur = star.size > 1.2 ? 6 : 2;
      this.ctx.shadowColor = star.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================================================
// 3. Futuristic Confetti Particle Engine
// ============================================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animating = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(originX, originY) {
    this.resize();
    const x = originX || window.innerWidth / 2;
    const y = originY || window.innerHeight / 2;
    const colors = ['#00f0ff', '#22d3ee', '#a855f7', '#c084fc', '#f59e0b', '#10b981', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3, // Initial upward burst
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 15 - 7.5,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        gravity: 0.18 // Low anti-gravity pull
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.render();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.render());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ============================================================================
// 4. Central Application State & Logic
// ============================================================================
const STORAGE_KEY = 'antigravity_python_v1_save';

const DEFAULT_STATE = {
  currentLessonId: 'm1-l1',
  activeTab: 'theory', // 'theory' | 'practice'
  completedLessons: [],
  completedQuizzes: [],
  userCode: {},
  totalXp: 0,
  unlockedBadges: [],
  flawlessRuns: 0,
  soundEnabled: true,
  engineType: 'auto',
  sidebarOpen: false,
  isSandboxMode: false,
  sandboxCode: `# ==========================================
# Anti-Gravity Python - Interactive Sandbox
# Write and experiment with Python code here!
# ==========================================

print("Welcome to Anti-Gravity Python Sandbox!")

# 1. Variables and Math
item_name = "Notebook"
quantity = 3
price = 40
total = quantity * price
print(f"Purchased {quantity} x {item_name} = ₹{total}")

# 2. For Loop Example
print("Counting:")
for i in range(1, 4):
    print(f"  Step {i}")
`,
  mentorRevealedLevel: 0
};

class AppController {
  constructor() {
    this.state = this.loadState();
    sounds.enabled = this.state.soundEnabled;

    this.confetti = null;
    this.starfield = null;
    this.lastRunFailed = false;

    // Dom elements cache
    this.dom = {};
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = Object.assign({}, DEFAULT_STATE, JSON.parse(saved));
        parsed.completedQuizzes = parsed.completedQuizzes || [];
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return Object.assign({}, DEFAULT_STATE);
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  init() {
    // Initialize visuals
    this.starfield = new Starfield('starfield-canvas');
    this.confetti = new ConfettiEngine('confetti-canvas');

    // Cache DOM
    this.cacheDom();

    // Hook Python engine status callback
    if (window.antiGravityEngine) {
      window.antiGravityEngine.onStatusChange = (status) => {
        this.updateEngineIndicator(status);
      };
    }

    // Bind event listeners
    this.bindEvents();

    // Render initial UI
    this.renderSidebar();
    this.renderHeaderStats();
    this.renderLessonView();
    this.updateBadgesList();

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  cacheDom() {
    this.dom.sidebar = document.getElementById('sidebar-menu');
    this.dom.sidebarOverlay = document.getElementById('sidebar-overlay');
    this.dom.toggleSidebarBtn = document.getElementById('btn-toggle-sidebar');
    this.dom.closeSidebarBtn = document.getElementById('btn-close-sidebar');

    this.dom.totalXpEl = document.getElementById('header-total-xp');
    this.dom.rankTitleEl = document.getElementById('header-rank-title');
    this.dom.globalProgressEl = document.getElementById('header-progress-bar');
    this.dom.progressPctEl = document.getElementById('header-progress-pct');

    this.dom.soundToggleBtn = document.getElementById('btn-toggle-sound');
    this.dom.sandboxToggleBtn = document.getElementById('btn-toggle-sandbox');
    this.dom.badgesModalBtn = document.getElementById('btn-view-badges');

    this.dom.lessonTitleEl = document.getElementById('lesson-title');
    this.dom.lessonSubtitleEl = document.getElementById('lesson-subtitle');
    this.dom.moduleTitleEl = document.getElementById('module-title-badge');
    this.dom.lessonXpBadge = document.getElementById('lesson-xp-badge');
    this.dom.lessonStoryEl = document.getElementById('lesson-story-text');

    this.dom.theoryTabBtn = document.getElementById('tab-btn-theory');
    this.dom.practiceTabBtn = document.getElementById('tab-btn-practice');
    this.dom.theoryContent = document.getElementById('theory-tab-content');
    this.dom.practiceContent = document.getElementById('practice-tab-content');

    this.dom.codeEditor = document.getElementById('code-editor');
    this.dom.lineNumbers = document.getElementById('line-numbers');
    this.dom.editorCharCount = document.getElementById('editor-char-count');

    this.dom.terminalOutput = document.getElementById('terminal-output');
    this.dom.terminalStatus = document.getElementById('terminal-status-chip');
    this.dom.terminalExecTime = document.getElementById('terminal-exec-time');

    this.dom.runCodeBtn = document.getElementById('btn-run-code');
    this.dom.checkSolutionBtn = document.getElementById('btn-check-solution');
    this.dom.resetCodeBtn = document.getElementById('btn-reset-code');
    this.dom.clearTerminalBtn = document.getElementById('btn-clear-terminal');
    this.dom.copyOutputBtn = document.getElementById('btn-copy-output');

    // Mentor
    this.dom.askMentorBtn = document.getElementById('btn-ask-mentor');
    this.dom.mentorContainer = document.getElementById('mentor-container');
    this.dom.mentorMessage = document.getElementById('mentor-message');
    this.dom.mentorHintsList = document.getElementById('mentor-hints-list');
    this.dom.mentorNextHintBtn = document.getElementById('btn-mentor-next-hint');

    // Modals
    this.dom.successModal = document.getElementById('modal-mission-success');
    this.dom.nextMissionBtn = document.getElementById('btn-next-mission');
    this.dom.closeSuccessModalBtn = document.getElementById('btn-close-success-modal');

    this.dom.badgesModal = document.getElementById('modal-badges');
    this.dom.closeBadgesModalBtn = document.getElementById('btn-close-badges-modal');

    this.dom.resetProgressBtn = document.getElementById('btn-reset-progress');

    this.dom.engineStatusBadge = document.getElementById('engine-status-badge');
  }

  getCurrentLesson() {
    for (const mod of CURRICULUM) {
      const found = mod.lessons.find(l => l.id === this.state.currentLessonId);
      if (found) return found;
    }
    return CURRICULUM[0].lessons[0];
  }

  getCurrentModule() {
    const lesson = this.getCurrentLesson();
    return CURRICULUM.find(m => m.id === lesson.moduleId) || CURRICULUM[0];
  }

  getRank(xp) {
    if (xp >= 1400) return 'Python Pro';
    if (xp >= 1000) return 'Data Architect';
    if (xp >= 600) return 'Logic Master';
    if (xp >= 250) return 'Python Explorer';
    return 'Python Beginner';
  }

  updateEngineIndicator(statusInfo) {
    if (!this.dom.engineStatusBadge) return;
    if (statusInfo.isReady) {
      this.dom.engineStatusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span> Engine: WASM CPython 3.12`;
      this.dom.engineStatusBadge.className = 'hidden xl:flex text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 items-center gap-1.5 font-mono';
    } else {
      this.dom.engineStatusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-sky-600"></span> Engine: Local VM`;
      this.dom.engineStatusBadge.className = 'hidden xl:flex text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 items-center gap-1.5 font-mono';
    }
  }

  bindEvents() {
    // Tab switching
    this.dom.theoryTabBtn.addEventListener('click', () => this.switchTab('theory'));
    this.dom.practiceTabBtn.addEventListener('click', () => this.switchTab('practice'));

    // Sound toggle
    this.dom.soundToggleBtn.addEventListener('click', () => {
      this.state.soundEnabled = !this.state.soundEnabled;
      sounds.enabled = this.state.soundEnabled;
      this.renderSoundButton();
      this.saveState();
      sounds.playChirp();
    });

    // Mobile sidebar toggle
    if (this.dom.toggleSidebarBtn) {
      this.dom.toggleSidebarBtn.addEventListener('click', () => {
        this.openSidebar();
      });
    }
    if (this.dom.closeSidebarBtn) {
      this.dom.closeSidebarBtn.addEventListener('click', () => {
        this.closeSidebar();
      });
    }
    if (this.dom.sidebarOverlay) {
      this.dom.sidebarOverlay.addEventListener('click', () => {
        this.closeSidebar();
      });
    }

    // Code Editor interactions
    this.dom.codeEditor.addEventListener('input', () => {
      this.updateLineNumbers();
      this.updateCharCount();
      // Auto-save user code draft
      if (this.state.isSandboxMode) {
        this.state.sandboxCode = this.dom.codeEditor.value;
      } else {
        this.state.userCode[this.state.currentLessonId] = this.dom.codeEditor.value;
      }
      this.saveState();
    });

    this.dom.codeEditor.addEventListener('scroll', () => {
      this.dom.lineNumbers.scrollTop = this.dom.codeEditor.scrollTop;
    });

    // Tab key & smart indent in code editor
    this.dom.codeEditor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        sounds.playChirp();
        const start = this.dom.codeEditor.selectionStart;
        const end = this.dom.codeEditor.selectionEnd;
        const val = this.dom.codeEditor.value;
        this.dom.codeEditor.value = val.substring(0, start) + '    ' + val.substring(end);
        this.dom.codeEditor.selectionStart = this.dom.codeEditor.selectionEnd = start + 4;
        this.updateLineNumbers();
        this.updateCharCount();
      } else if (e.key === 'Enter') {
        const start = this.dom.codeEditor.selectionStart;
        const val = this.dom.codeEditor.value;
        const currentLine = val.substring(0, start).split('\n').pop();
        const indentMatch = currentLine.match(/^(\s*)/);
        let indent = indentMatch ? indentMatch[1] : '';

        // If line ends with colon (:), add 4 spaces
        if (currentLine.trim().endsWith(':')) {
          indent += '    ';
        }

        if (indent.length > 0) {
          e.preventDefault();
          this.dom.codeEditor.value = val.substring(0, start) + '\n' + indent + val.substring(start);
          this.dom.codeEditor.selectionStart = this.dom.codeEditor.selectionEnd = start + 1 + indent.length;
          this.updateLineNumbers();
          this.updateCharCount();
        }
      }
    });

    // Run code button
    this.dom.runCodeBtn.addEventListener('click', () => {
      sounds.playRunSound();
      this.handleRunCode();
    });

    // Check solution button
    this.dom.checkSolutionBtn.addEventListener('click', () => {
      sounds.playRunSound();
      this.handleCheckSolution();
    });

    // Reset code button
    this.dom.resetCodeBtn.addEventListener('click', () => {
      sounds.playChirp();
      const lesson = this.getCurrentLesson();
      const code = this.state.isSandboxMode ? DEFAULT_STATE.sandboxCode : lesson.practice.starterCode;
      this.dom.codeEditor.value = code;
      if (this.state.isSandboxMode) {
        this.state.sandboxCode = code;
      } else {
        this.state.userCode[this.state.currentLessonId] = code;
      }
      this.saveState();
      this.updateLineNumbers();
      this.updateCharCount();
    });

    // Clear terminal button
    this.dom.clearTerminalBtn.addEventListener('click', () => {
      sounds.playChirp();
      this.clearTerminal();
    });

    // Copy terminal output
    this.dom.copyOutputBtn.addEventListener('click', () => {
      sounds.playChirp();
      const text = this.dom.terminalOutput.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const orig = this.dom.copyOutputBtn.innerHTML;
        this.dom.copyOutputBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Copied';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          this.dom.copyOutputBtn.innerHTML = orig;
          if (window.lucide) window.lucide.createIcons();
        }, 1800);
      });
    });

    // Ask Mentor button
    this.dom.askMentorBtn.addEventListener('click', () => {
      sounds.playChirp();
      this.handleAskMentor();
    });

    if (this.dom.mentorNextHintBtn) {
      this.dom.mentorNextHintBtn.addEventListener('click', () => {
        sounds.playChirp();
        this.revealNextHint();
      });
    }

    // Success Modal buttons
    if (this.dom.nextMissionBtn) {
      this.dom.nextMissionBtn.addEventListener('click', () => {
        sounds.playChirp();
        this.advanceToNextMission();
        this.closeSuccessModal();
      });
    }
    if (this.dom.closeSuccessModalBtn) {
      this.dom.closeSuccessModalBtn.addEventListener('click', () => {
        this.closeSuccessModal();
      });
    }

    // Badges Modal buttons
    if (this.dom.badgesModalBtn) {
      this.dom.badgesModalBtn.addEventListener('click', () => {
        sounds.playChirp();
        this.openBadgesModal();
      });
    }
    if (this.dom.closeBadgesModalBtn) {
      this.dom.closeBadgesModalBtn.addEventListener('click', () => {
        this.closeBadgesModal();
      });
    }

    // Sandbox Toggle button
    if (this.dom.sandboxToggleBtn) {
      this.dom.sandboxToggleBtn.addEventListener('click', () => {
        sounds.playChirp();
        this.toggleSandboxMode();
      });
    }

    // Reset Progress button
    if (this.dom.resetProgressBtn) {
      this.dom.resetProgressBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all anti-gravity training telemetry? All XP, progress, and badges will be reset.')) {
          localStorage.removeItem(STORAGE_KEY);
          location.reload();
        }
      });
    }
  }

  openSidebar() {
    this.dom.sidebar.classList.remove('-translate-x-full');
    this.dom.sidebarOverlay.classList.remove('hidden');
  }

  closeSidebar() {
    this.dom.sidebar.classList.add('-translate-x-full');
    this.dom.sidebarOverlay.classList.add('hidden');
  }

  renderSoundButton() {
    if (!this.dom.soundToggleBtn) return;
    if (this.state.soundEnabled) {
      this.dom.soundToggleBtn.innerHTML = `<i data-lucide="volume-2" class="w-3.5 h-3.5 text-slate-600"></i><span class="hidden sm:inline text-xs text-slate-600">SFX</span>`;
    } else {
      this.dom.soundToggleBtn.innerHTML = `<i data-lucide="volume-x" class="w-3.5 h-3.5 text-slate-400"></i><span class="hidden sm:inline text-xs text-slate-400">Muted</span>`;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  switchTab(tab) {
    sounds.playChirp();
    this.state.activeTab = tab;
    this.saveState();

    if (tab === 'theory') {
      this.dom.theoryTabBtn.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all bg-sky-600 text-white shadow-xs';
      this.dom.practiceTabBtn.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100';
      this.dom.theoryContent.classList.remove('hidden');
      this.dom.practiceContent.classList.add('hidden');
    } else {
      this.dom.practiceTabBtn.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all bg-sky-600 text-white shadow-xs';
      this.dom.theoryTabBtn.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100';
      this.dom.practiceContent.classList.remove('hidden');
      this.dom.theoryContent.classList.add('hidden');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  scrollToQuiz() {
    sounds.playChirp();
    this.switchTab('theory');
    setTimeout(() => {
      const q = document.getElementById('quiz-block');
      if (q) {
        q.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);
  }

  selectLesson(lessonId) {
    sounds.playChirp();
    this.state.isSandboxMode = false;
    this.state.currentLessonId = lessonId;
    this.state.mentorRevealedLevel = 0;
    this.saveState();

    this.renderSidebar();
    this.renderHeaderStats();
    this.renderLessonView();
    this.closeSidebar();

    // Scroll main view to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleSandboxMode() {
    this.state.isSandboxMode = !this.state.isSandboxMode;
    this.saveState();

    if (this.state.isSandboxMode) {
      this.dom.sandboxToggleBtn.classList.add('bg-sky-50', 'border-sky-300', 'text-sky-700');
      this.dom.sandboxToggleBtn.classList.remove('bg-white', 'border-slate-200', 'text-slate-700');
    } else {
      this.dom.sandboxToggleBtn.classList.remove('bg-sky-50', 'border-sky-300', 'text-sky-700');
      this.dom.sandboxToggleBtn.classList.add('bg-white', 'border-slate-200', 'text-slate-700');
    }

    this.renderLessonView();
  }

  renderSidebar() {
    if (!this.dom.sidebar) return;
    const navContainer = document.getElementById('sidebar-navigation-tree');
    if (!navContainer) return;

    let html = '';

    CURRICULUM.forEach((mod) => {
      const isCompleted = isModuleCompleted(mod.id, this.state);
      const modCompletedCount = mod.lessons.filter(l => this.state.completedLessons.includes(l.id)).length;
      const modProgressPct = Math.round((modCompletedCount / mod.lessons.length) * 100);

      html += `
        <div class="mb-3.5">
          <div class="flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span class="flex items-center gap-2">
              <i data-lucide="${mod.icon}" class="w-3.5 h-3.5 text-sky-600"></i>
              ${mod.number}. ${mod.title}
            </span>
            <span class="text-[11px] font-mono text-slate-500 font-medium">${modProgressPct}%</span>
          </div>
          <div class="space-y-1 mt-1 pl-1">
      `;

      mod.lessons.forEach((lesson) => {
        const isCurrent = !this.state.isSandboxMode && lesson.id === this.state.currentLessonId;
        const isLessonDone = this.state.completedLessons.includes(lesson.id);

        let itemClass = 'flex items-center justify-between px-2.5 py-2 rounded-md text-xs transition-colors cursor-pointer group ';
        if (isCurrent) {
          itemClass += 'bg-sky-50 text-sky-800 border-l-2 border-sky-600 font-semibold ';
        } else if (isLessonDone) {
          itemClass += 'text-slate-700 hover:bg-slate-100 font-medium ';
        } else {
          itemClass += 'text-slate-500 hover:bg-slate-50 ';
        }

        html += `
          <div class="${itemClass}" onclick="window.antiGravityApp.selectLesson('${lesson.id}')">
            <div class="flex items-center gap-2 truncate">
              ${
                isLessonDone
                  ? '<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>'
                  : (isCurrent
                      ? '<i data-lucide="circle-dot" class="w-3.5 h-3.5 text-sky-600 shrink-0"></i>'
                      : '<i data-lucide="circle" class="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-slate-600"></i>')
              }
              <span class="truncate">${lesson.title}</span>
            </div>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 group-hover:text-sky-700 shrink-0">
              ${lesson.xp} XP
            </span>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    navContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }

  renderHeaderStats() {
    const totalLessons = CURRICULUM.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedCount = this.state.completedLessons.length;
    const progressPct = Math.round((completedCount / totalLessons) * 100);

    if (this.dom.totalXpEl) this.dom.totalXpEl.textContent = `${this.state.totalXp} XP`;
    if (this.dom.rankTitleEl) this.dom.rankTitleEl.textContent = this.getRank(this.state.totalXp);
    if (this.dom.globalProgressEl) this.dom.globalProgressEl.style.width = `${progressPct}%`;
    if (this.dom.progressPctEl) this.dom.progressPctEl.textContent = `${progressPct}%`;

    this.renderSoundButton();
  }

  renderLessonView() {
    if (this.state.isSandboxMode) {
      this.renderSandboxView();
      return;
    }

    const lesson = this.getCurrentLesson();
    const mod = this.getCurrentModule();
    const isCompleted = this.state.completedLessons.includes(lesson.id);

    // Update Header / Banner Info
    if (this.dom.moduleTitleEl) {
      this.dom.moduleTitleEl.innerHTML = `<i data-lucide="${mod.icon}" class="w-3.5 h-3.5 text-sky-600"></i> Module ${mod.number}: ${mod.title}`;
    }
    if (this.dom.lessonTitleEl) this.dom.lessonTitleEl.textContent = lesson.title;
    if (this.dom.lessonSubtitleEl) this.dom.lessonSubtitleEl.textContent = lesson.subtitle;
    if (this.dom.lessonXpBadge) {
      this.dom.lessonXpBadge.textContent = `${lesson.xp} XP`;
      this.dom.lessonXpBadge.className = isCompleted
        ? 'px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1'
        : 'px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1';
    }
    if (this.dom.lessonStoryEl) this.dom.lessonStoryEl.textContent = lesson.story;

    // Render Theory Tab
    this.renderTheoryTab(lesson);

    // Render Practice Tab & Objectives
    this.renderPracticeTab(lesson);

    // Load Editor Code (Saved or Starter)
    const savedCode = this.state.userCode[lesson.id];
    const initialCode = savedCode !== undefined ? savedCode : lesson.practice.starterCode;
    this.dom.codeEditor.value = initialCode;
    this.updateLineNumbers();
    this.updateCharCount();

    // Reset mentor box state
    this.resetMentorBox();

    // Make sure active tab is selected
    this.switchTab(this.state.activeTab || 'theory');

    if (window.lucide) window.lucide.createIcons();
  }

  renderSandboxView() {
    if (this.dom.moduleTitleEl) {
      this.dom.moduleTitleEl.innerHTML = `<i data-lucide="code-2" class="w-3.5 h-3.5 text-sky-600"></i> Free Practice Sandbox`;
    }
    if (this.dom.lessonTitleEl) this.dom.lessonTitleEl.textContent = 'Python Practice Sandbox';
    if (this.dom.lessonSubtitleEl) this.dom.lessonSubtitleEl.textContent = 'An open sandbox to write, run, and experiment with any Python code';
    if (this.dom.lessonXpBadge) {
      this.dom.lessonXpBadge.textContent = 'Open Practice';
      this.dom.lessonXpBadge.className = 'px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1';
    }
    if (this.dom.lessonStoryEl) {
      this.dom.lessonStoryEl.textContent = 'Welcome to the Python sandbox! Write and experiment with variables, calculations, loops, data structures, and functions freely.';
    }

    // Load sandbox code
    this.dom.codeEditor.value = this.state.sandboxCode;
    this.updateLineNumbers();
    this.updateCharCount();

    // Auto-switch to Practice tab
    this.switchTab('practice');
  }

  renderTheoryTab(lesson) {
    if (!this.dom.theoryContent) return;
    const t = lesson.theory;

    let html = `
      <div class="space-y-4">
        <!-- Overview -->
        <div class="p-4 rounded-lg bg-white border border-slate-200 text-slate-700 leading-relaxed text-xs sm:text-sm shadow-xs">
          ${t.overview.replace(/\n/g, '<br>')}
        </div>

        <!-- Sections -->
        <div class="space-y-4">
    `;

    t.sections.forEach((sec, idx) => {
      html += `
        <div class="card-panel p-4 sm:p-5 card-interactive bg-white">
          <h4 class="text-xs sm:text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            ${sec.title}
          </h4>
          <p class="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">${sec.content}</p>
          <div class="relative group">
            <pre class="bg-slate-50 p-3.5 rounded font-mono text-xs text-slate-900 overflow-x-auto border border-slate-200"><code>${this.escapeHtml(sec.code)}</code></pre>
            <button 
              onclick="window.antiGravityApp.loadSnippetToEditor(\`${this.escapeForSnippet(sec.code)}\`)"
              class="absolute top-2 right-2 px-2 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1 shadow-xs">
              <i data-lucide="play" class="w-3 h-3 text-sky-600"></i> Try In Editor
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>

        <!-- Syntax Breakdown Matrix -->
        <div class="card-panel p-4 sm:p-5 bg-white">
          <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2.5 flex items-center gap-1.5">
            <i data-lucide="code-2" class="w-3.5 h-3.5 text-sky-600"></i>
            Syntax Breakdown
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
    `;

    t.syntaxTokens.forEach((item) => {
      html += `
        <div class="p-2.5 rounded bg-slate-50 border border-slate-200 flex flex-col justify-center">
          <code class="text-xs font-mono text-sky-700 font-semibold mb-0.5">${this.escapeHtml(item.token)}</code>
          <span class="text-xs text-slate-600">${item.description}</span>
        </div>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Pro Tip -->
        <div class="p-3.5 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2.5">
          <i data-lucide="info" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
          <div>
            <h5 class="text-xs font-semibold text-amber-800 mb-0.5">Pro Tip</h5>
            <p class="text-xs text-amber-900/90 leading-relaxed">${t.cosmicTip}</p>
          </div>
        </div>

        <!-- Concept Check Quiz Section -->
        ${this.renderQuizSection(lesson)}

        <!-- Call to action button -->
        <div class="pt-2 flex justify-end">
          <button 
            onclick="window.antiGravityApp.switchTab('practice')"
            class="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-xs">
            <span>Proceed to Exercises</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;

    this.dom.theoryContent.innerHTML = html;
  }

  renderQuizSection(lesson) {
    if (!lesson.quiz) return '';
    const q = lesson.quiz;
    const isCompleted = (this.state.completedQuizzes || []).includes(lesson.id);
    const letters = ['A', 'B', 'C', 'D'];

    let optionsHtml = '';
    q.options.forEach((opt, idx) => {
      const isCorrect = idx === q.correctIndex;
      let btnClass = 'w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between group ';

      if (isCompleted) {
        if (isCorrect) {
          btnClass += 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs';
        } else {
          btnClass += 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-default';
        }
      } else {
        btnClass += 'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 text-slate-800 cursor-pointer shadow-xs active:scale-[0.99]';
      }

      optionsHtml += `
        <button 
          type="button" 
          id="quiz-opt-${idx}"
          ${isCompleted ? 'disabled' : ''}
          onclick="window.antiGravityApp.handleQuizAnswer('${lesson.id}', ${idx})"
          class="${btnClass}">
          <div class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-md ${isCompleted && isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-sky-100 group-hover:text-sky-700'} flex items-center justify-center font-mono text-xs font-bold shrink-0">
              ${letters[idx]}
            </span>
            <span class="text-xs sm:text-sm">${this.escapeHtml(opt)}</span>
          </div>
          <span id="quiz-opt-icon-${idx}">
            ${isCompleted && isCorrect ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0"></i>' : ''}
          </span>
        </button>
      `;
    });

    let feedbackHtml = '';
    if (isCompleted) {
      feedbackHtml = `
        <div class="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 mt-3 flex items-start gap-2.5">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
          <div>
            <strong class="text-xs font-bold block text-emerald-900">Correct! (+25 XP Earned)</strong>
            <p class="text-xs text-emerald-800 leading-relaxed mt-0.5">${this.escapeHtml(q.explanation)}</p>
          </div>
        </div>
      `;
    }

    return `
      <div id="quiz-block" class="card-panel p-5 sm:p-6 bg-white border border-slate-200 shadow-xs">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-md bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <i data-lucide="help-circle" class="w-4 h-4"></i>
            </div>
            <div>
              <h4 class="text-xs sm:text-sm font-bold text-slate-900">Concept Check Quiz</h4>
              <span class="text-[11px] text-slate-500">Test what you learned before starting the exercise</span>
            </div>
          </div>
          <span id="quiz-badge-${lesson.id}" class="text-[11px] font-mono px-2 py-0.5 rounded ${isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
            ${isCompleted ? '✓ Completed (+25 XP)' : 'Question 1 of 1 · +25 XP'}
          </span>
        </div>

        <div class="mb-3.5">
          <p class="text-[11px] font-semibold text-sky-700 uppercase tracking-wider mb-1 font-mono">Question:</p>
          <p class="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">${this.escapeHtml(q.question)}</p>
        </div>

        <!-- Options Container -->
        <div class="space-y-2 mb-3">
          ${optionsHtml}
        </div>

        <!-- Feedback Container -->
        <div id="quiz-feedback-container">
          ${feedbackHtml}
        </div>
      </div>
    `;
  }

  handleQuizAnswer(lessonId, selectedIdx) {
    const lesson = CURRICULUM.flatMap(m => m.lessons).find(l => l.id === lessonId);
    if (!lesson || !lesson.quiz) return;
    const q = lesson.quiz;

    const optBtn = document.getElementById(`quiz-opt-${selectedIdx}`);
    const optIcon = document.getElementById(`quiz-opt-icon-${selectedIdx}`);
    const feedbackEl = document.getElementById('quiz-feedback-container');
    const badgeEl = document.getElementById(`quiz-badge-${lesson.id}`);

    if (selectedIdx === q.correctIndex) {
      // CORRECT!
      sounds.playSuccessChime();
      const firstTime = !(this.state.completedQuizzes || []).includes(lesson.id);
      if (firstTime) {
        if (!this.state.completedQuizzes) this.state.completedQuizzes = [];
        this.state.completedQuizzes.push(lesson.id);
        this.state.totalXp += 25;
        this.saveState();
        this.renderHeaderStats();
        this.checkAndAwardBadges();
      }

      // Update badge
      if (badgeEl) {
        badgeEl.textContent = '✓ Completed (+25 XP)';
        badgeEl.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold';
      }

      // Mark all options
      q.options.forEach((_, idx) => {
        const b = document.getElementById(`quiz-opt-${idx}`);
        const ic = document.getElementById(`quiz-opt-icon-${idx}`);
        if (!b) return;
        b.disabled = true;
        if (idx === q.correctIndex) {
          b.className = 'w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs';
          if (ic) ic.innerHTML = '<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0"></i>';
        } else {
          b.className = 'w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-default';
          if (ic) ic.innerHTML = '';
        }
      });

      // Show Feedback with direct button to exercises
      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <div class="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 mt-3 flex flex-col gap-2.5">
            <div class="flex items-start gap-2.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-xs font-bold block text-emerald-900">Correct! (+25 XP)</strong>
                <p class="text-xs text-emerald-800 leading-relaxed mt-0.5">${this.escapeHtml(q.explanation)}</p>
              </div>
            </div>
            <div class="pt-1 flex justify-end">
              <button onclick="window.antiGravityApp.switchTab('practice')" class="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs">
                <span>Start Practice Exercise</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `;
      }
      if (window.lucide) window.lucide.createIcons();

    } else {
      // INCORRECT!
      sounds.playErrorBuzz();
      if (optBtn) {
        optBtn.className = 'w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between bg-rose-50 border-rose-300 text-rose-900 font-medium';
      }
      if (optIcon) {
        optIcon.innerHTML = '<i data-lucide="x-circle" class="w-4 h-4 text-rose-500 shrink-0"></i>';
      }

      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <div class="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 mt-3 flex items-start gap-2">
            <i data-lucide="alert-circle" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
            <div>
              <strong class="text-xs font-bold block text-rose-900">Not quite right</strong>
              <p class="text-xs text-rose-800 leading-relaxed mt-0.5">Review the concept explanation above and try another option!</p>
            </div>
          </div>
        `;
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }

  renderPracticeTab(lesson) {
    const checklistContainer = document.getElementById('practice-checklist-container');
    const expectedOutputEl = document.getElementById('practice-expected-output');

    if (checklistContainer) {
      let chkHtml = '';
      lesson.practice.checklist.forEach((item, idx) => {
        chkHtml += `
          <div class="flex items-start gap-2.5 text-xs text-slate-700">
            <span class="w-4 h-4 rounded bg-slate-100 text-sky-700 border border-slate-200 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 font-medium">
              ${idx + 1}
            </span>
            <span class="leading-relaxed">${item}</span>
          </div>
        `;
      });
      checklistContainer.innerHTML = chkHtml;
    }

    if (expectedOutputEl) {
      expectedOutputEl.textContent = lesson.practice.expectedOutput;
    }
  }

  loadSnippetToEditor(code) {
    sounds.playChirp();
    this.dom.codeEditor.value = code;
    this.updateLineNumbers();
    this.updateCharCount();
    this.switchTab('practice');
  }

  insertSnippet(text, cursorOffset) {
    sounds.playChirp();
    const ed = this.dom.codeEditor;
    const start = ed.selectionStart || 0;
    const end = ed.selectionEnd || 0;
    const val = ed.value;
    ed.value = val.substring(0, start) + text + val.substring(end);
    const newPos = cursorOffset !== undefined ? start + cursorOffset : start + text.length;
    ed.selectionStart = ed.selectionEnd = newPos;
    ed.focus();
    this.updateLineNumbers();
    this.updateCharCount();
    if (this.state.isSandboxMode) {
      this.state.sandboxCode = ed.value;
    } else {
      this.state.userCode[this.state.currentLessonId] = ed.value;
    }
    this.saveState();
  }

  updateLineNumbers() {
    const lines = this.dom.codeEditor.value.split('\n');
    const lineCount = lines.length;
    let numbers = '';
    for (let i = 1; i <= lineCount; i++) {
      numbers += `${i}\n`;
    }
    this.dom.lineNumbers.textContent = numbers;
  }

  updateCharCount() {
    const charCount = this.dom.codeEditor.value.length;
    if (this.dom.editorCharCount) {
      this.dom.editorCharCount.textContent = `${charCount} chars`;
    }
  }

  async handleRunCode() {
    const code = this.dom.codeEditor.value;
    this.setTerminalStatus('executing');

    const result = await window.antiGravityEngine.execute(code);

    if (result.error) {
      this.lastRunFailed = true;
      sounds.playErrorBuzz();
      this.displayTerminalError(result.error, result.executionTimeMs, result.engineUsed);
      this.setTerminalStatus('error');
      // Highlight mentor button
      this.dom.askMentorBtn.classList.add('animate-pulse', 'border-amber-400', 'text-amber-300');
    } else {
      this.lastRunFailed = false;
      this.displayTerminalOutput(result.stdout, result.executionTimeMs, result.engineUsed);
      this.setTerminalStatus('success');
      this.dom.askMentorBtn.classList.remove('animate-pulse', 'border-amber-400', 'text-amber-300');
    }
  }

  async handleCheckSolution() {
    if (this.state.isSandboxMode) {
      await this.handleRunCode();
      return;
    }

    const lesson = this.getCurrentLesson();
    const code = this.dom.codeEditor.value;
    this.setTerminalStatus('executing');

    const result = await window.antiGravityEngine.execute(code);

    if (result.error) {
      this.lastRunFailed = true;
      sounds.playErrorBuzz();
      this.displayTerminalError(result.error, result.executionTimeMs, result.engineUsed);
      this.setTerminalStatus('error');
      this.showMentorFeedback(`Runtime deviation detected: ${result.error}. Click "Ask Mentor" for a guidance vector.`);
      return;
    }

    // Run custom validator for the challenge
    const validation = lesson.practice.validator(result.stdout, code);

    if (validation.success) {
      // SUCCESS!
      sounds.playSuccessChime();
      this.confetti.burst();
      this.displayTerminalSuccess(result.stdout, validation.message, result.executionTimeMs);
      this.setTerminalStatus('passed');

      const isFirstTime = !this.state.completedLessons.includes(lesson.id);
      if (isFirstTime) {
        this.state.completedLessons.push(lesson.id);
        this.state.totalXp += lesson.xp;
        if (!this.lastRunFailed) {
          this.state.flawlessRuns++;
        }
        this.saveState();
      }

      this.renderSidebar();
      this.renderHeaderStats();
      this.checkAndAwardBadges();

      // Show congratulations modal
      setTimeout(() => {
        this.openSuccessModal(lesson, validation.message);
      }, 700);
    } else {
      // Failed validation
      this.lastRunFailed = true;
      sounds.playErrorBuzz();
      this.displayTerminalWarning(result.stdout, validation.message, result.executionTimeMs);
      this.setTerminalStatus('failed');
      this.showMentorFeedback(validation.message);
    }
  }

  displayTerminalOutput(stdout, execTime, engine) {
    const timestamp = new Date().toLocaleTimeString();
    let content = `<div class="text-[11px] text-slate-500 mb-2 font-mono">[${timestamp}] ${engine} (${execTime}ms)</div>`;

    if (!stdout || !stdout.trim()) {
      content += `<div class="text-slate-400 italic font-mono">&lt;Process finished with return code 0 (no output)&gt;</div>`;
    } else {
      const escaped = this.escapeHtml(stdout);
      content += `<div class="text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">${escaped}</div>`;
    }

    this.dom.terminalOutput.innerHTML = content;
    if (this.dom.terminalExecTime) this.dom.terminalExecTime.textContent = `${execTime}ms`;
  }

  displayTerminalSuccess(stdout, message, execTime) {
    const timestamp = new Date().toLocaleTimeString();
    let content = `<div class="text-[11px] text-slate-500 mb-2 font-mono">[${timestamp}] All unit checks validated in ${execTime}ms</div>`;

    if (stdout && stdout.trim()) {
      content += `<div class="text-slate-800 font-mono whitespace-pre-wrap mb-2.5">${this.escapeHtml(stdout)}</div>`;
    }

    content += `
      <div class="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 shrink-0"></i>
        <span>${message}</span>
      </div>
    `;

    this.dom.terminalOutput.innerHTML = content;
    if (window.lucide) window.lucide.createIcons();
    if (this.dom.terminalExecTime) this.dom.terminalExecTime.textContent = `${execTime}ms`;
  }

  displayTerminalError(error, execTime, engine) {
    const timestamp = new Date().toLocaleTimeString();
    let content = `
      <div class="text-[11px] text-slate-500 mb-2 font-mono">[${timestamp}] Exception encountered (${engine}) in ${execTime}ms</div>
      <div class="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono leading-relaxed whitespace-pre-wrap">
        <i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-600 inline mr-1 align-text-bottom"></i>${this.escapeHtml(error)}
      </div>
    `;

    this.dom.terminalOutput.innerHTML = content;
    if (window.lucide) window.lucide.createIcons();
    if (this.dom.terminalExecTime) this.dom.terminalExecTime.textContent = `${execTime}ms`;
  }

  displayTerminalWarning(stdout, message, execTime) {
    const timestamp = new Date().toLocaleTimeString();
    let content = `<div class="text-[11px] text-slate-500 mb-2 font-mono">[${timestamp}] Output did not match expected solution in ${execTime}ms</div>`;

    if (stdout && stdout.trim()) {
      content += `<div class="text-slate-800 font-mono whitespace-pre-wrap mb-2">${this.escapeHtml(stdout)}</div>`;
    }

    content += `
      <div class="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono flex items-start gap-2">
        <i data-lucide="info" class="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5"></i>
        <div>
          <strong class="block text-amber-900">Objective Incomplete:</strong>
          <span>${message}</span>
        </div>
      </div>
    `;

    this.dom.terminalOutput.innerHTML = content;
    if (window.lucide) window.lucide.createIcons();
    if (this.dom.terminalExecTime) this.dom.terminalExecTime.textContent = `${execTime}ms`;
  }

  clearTerminal() {
    this.dom.terminalOutput.innerHTML = `<span class="text-slate-400 font-mono text-xs">Ready. Output will appear here after running code.</span>`;
    this.setTerminalStatus('idle');
    if (this.dom.terminalExecTime) this.dom.terminalExecTime.textContent = '0ms';
  }

  setTerminalStatus(status) {
    if (!this.dom.terminalStatus) return;
    const chips = {
      idle: { text: 'IDLE', color: 'bg-slate-100 text-slate-600 border-slate-300' },
      executing: { text: 'RUNNING', color: 'bg-sky-50 text-sky-700 border-sky-300 animate-pulse' },
      success: { text: 'SUCCESS', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
      passed: { text: 'PASSED', color: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' },
      error: { text: 'ERROR', color: 'bg-rose-50 text-rose-700 border-rose-300' },
      failed: { text: 'FAILED', color: 'bg-amber-50 text-amber-700 border-amber-300' }
    };
    const c = chips[status] || chips.idle;
    this.dom.terminalStatus.textContent = c.text;
    this.dom.terminalStatus.className = `text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${c.color}`;
  }

  // ==========================================================================
  // 5. A.N.T.I. - AI Python Mentor Intelligence
  // ==========================================================================
  resetMentorBox() {
    if (!this.dom.mentorContainer) return;
    this.dom.mentorContainer.classList.add('hidden');
    this.dom.mentorHintsList.innerHTML = '';
    this.state.mentorRevealedLevel = 0;
  }

  handleAskMentor() {
    const lesson = this.getCurrentLesson();
    const code = this.dom.codeEditor.value;

    this.dom.mentorContainer.classList.remove('hidden');

    // Context-sensitive diagnosis
    let diagnosis = '';
    if (!code.trim()) {
      diagnosis = `Your code editor is empty. Read the learning objectives above and start by typing your solution.`;
    } else if (code.includes('print(') && !code.includes(')')) {
      diagnosis = `Syntax Notice: You opened a print( statement without a closing parenthesis ). Remember that all brackets must be closed in pairs.`;
    } else if (code.includes('"') && (code.match(/"/g) || []).length % 2 !== 0) {
      diagnosis = `Syntax Notice: Unclosed quotation mark detected. Every opening quote requires a matching closing quote.`;
    } else if (/(if|elif|else|for|while|def)\b/.test(code) && !code.includes(':')) {
      diagnosis = `Syntax Notice: Python compound statements (if, elif, else, for, while) must conclude with a colon (:) before indented lines.`;
    } else {
      diagnosis = `Review the expected output and checklist. Here is a hint to guide your implementation:`;
    }

    this.dom.mentorMessage.textContent = diagnosis;

    // Show first hint if none revealed
    if (this.state.mentorRevealedLevel === 0) {
      this.revealNextHint();
    }
  }

  showMentorFeedback(feedback) {
    if (!this.dom.mentorContainer) return;
    this.dom.mentorContainer.classList.remove('hidden');
    this.dom.mentorMessage.textContent = `Hint: ${feedback}`;
  }

  revealNextHint() {
    const lesson = this.getCurrentLesson();
    const hints = lesson.practice.hints;
    const currentLvl = this.state.mentorRevealedLevel;

    if (currentLvl < hints.length) {
      const hint = hints[currentLvl];
      const hintCard = document.createElement('div');
      hintCard.className = 'p-3 rounded-lg bg-white border border-amber-200 text-xs text-slate-700 leading-relaxed shadow-xs';
      hintCard.innerHTML = `
        <div class="flex items-center gap-1.5 text-amber-700 font-semibold mb-1">
          <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i>
          <span>Hint ${hint.level}: ${hint.title}</span>
        </div>
        <div>${this.escapeHtml(hint.text)}</div>
      `;
      this.dom.mentorHintsList.appendChild(hintCard);
      this.state.mentorRevealedLevel++;
      this.saveState();

      if (window.lucide) window.lucide.createIcons();

      // Check if max hints reached
      if (this.state.mentorRevealedLevel >= hints.length) {
        if (this.dom.mentorNextHintBtn) {
          this.dom.mentorNextHintBtn.classList.add('hidden');
        }
      }
    }
  }

  // ==========================================================================
  // 6. Badges & Gamification Modal
  // ==========================================================================
  checkAndAwardBadges() {
    BADGES.forEach((badge) => {
      const alreadyEarned = this.state.unlockedBadges.includes(badge.id);
      if (!alreadyEarned && badge.condition(this.state)) {
        this.state.unlockedBadges.push(badge.id);
        this.saveState();
        sounds.playBadgeFanfare();
        this.showBadgeToast(badge);
      }
    });
  }

  showBadgeToast(badge) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 p-3.5 rounded-lg bg-white border border-slate-200 flex items-center gap-3 shadow-xl transition-all duration-300';
    toast.innerHTML = `
      <div class="w-9 h-9 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
        <i data-lucide="${badge.icon}" class="w-4 h-4"></i>
      </div>
      <div>
        <span class="text-[10px] font-semibold uppercase tracking-wider text-amber-700 block">Achievement Unlocked</span>
        <strong class="text-xs font-semibold text-slate-900 block">${badge.name}</strong>
        <span class="text-[11px] text-slate-500">${badge.description}</span>
      </div>
    `;
    document.body.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  openSuccessModal(lesson, validationMsg) {
    if (!this.dom.successModal) return;
    const titleEl = document.getElementById('modal-success-lesson-title');
    const xpEl = document.getElementById('modal-success-xp');
    const msgEl = document.getElementById('modal-success-message');

    if (titleEl) titleEl.textContent = lesson.title;
    if (xpEl) xpEl.textContent = `+${lesson.xp} XP`;
    if (msgEl) msgEl.textContent = validationMsg;

    this.dom.successModal.classList.remove('hidden');
    this.dom.successModal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  }

  closeSuccessModal() {
    if (!this.dom.successModal) return;
    this.dom.successModal.classList.add('hidden');
    this.dom.successModal.classList.remove('flex');
  }

  advanceToNextMission() {
    // Find next lesson
    let allLessons = [];
    CURRICULUM.forEach(m => {
      m.lessons.forEach(l => allLessons.push(l));
    });

    const currentIdx = allLessons.findIndex(l => l.id === this.state.currentLessonId);
    if (currentIdx !== -1 && currentIdx < allLessons.length - 1) {
      const nextLesson = allLessons[currentIdx + 1];
      this.selectLesson(nextLesson.id);
    } else {
      // Completed all lessons!
      alert('Congratulations! You have completed all lessons in Python Foundation!');
    }
  }

  openBadgesModal() {
    if (!this.dom.badgesModal) return;
    this.updateBadgesList();
    this.dom.badgesModal.classList.remove('hidden');
    this.dom.badgesModal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  }

  closeBadgesModal() {
    if (!this.dom.badgesModal) return;
    this.dom.badgesModal.classList.add('hidden');
    this.dom.badgesModal.classList.remove('flex');
  }

  updateBadgesList() {
    const container = document.getElementById('modal-badges-grid');
    if (!container) return;

    let html = '';
    BADGES.forEach((b) => {
      const unlocked = this.state.unlockedBadges.includes(b.id);
      html += `
        <div class="p-3.5 rounded-lg border transition-all ${
          unlocked
            ? 'bg-white border-slate-200 shadow-xs'
            : 'bg-slate-50 border-slate-200/80 opacity-50'
        }">
          <div class="flex items-center gap-2.5 mb-1.5">
            <div class="w-8 h-8 rounded-md flex items-center justify-center ${
              unlocked ? `bg-amber-50 text-amber-600 border border-amber-200` : 'bg-slate-100 text-slate-400'
            }">
              <i data-lucide="${b.icon}" class="w-4 h-4"></i>
            </div>
            <div>
              <h5 class="text-xs font-semibold ${unlocked ? 'text-slate-900' : 'text-slate-500'}">${b.name}</h5>
              <span class="text-[10px] font-mono uppercase tracking-wider ${unlocked ? 'text-emerald-600 font-medium' : 'text-slate-400'}">
                ${unlocked ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
          </div>
          <p class="text-[11px] text-slate-500">${b.description}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ==========================================================================
  // 7. Utility helpers
  // ==========================================================================
  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  escapeForSnippet(code) {
    return code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.antiGravityApp = new AppController();
  window.antiGravityApp.init();
});

