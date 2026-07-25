export function getStudioHtmlTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile Aura Studio 2.0 — Visual Builder & Live Designer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #09090b;
      --bg-surface: #121215;
      --bg-card: #18181b;
      --border-color: #27272a;
      --accent-primary: #a855f7;
      --accent-hover: #9333ea;
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --sidebar-width: 280px;
      --inspector-width: 320px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    body { background-color: var(--bg-dark); color: var(--text-main); height: 100vh; display: flex; flexDirection: column; overflow: hidden; }

    /* Top Navigation */
    .top-nav {
      height: 54px;
      background-color: var(--bg-surface);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      z-index: 100;
    }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 16px; color: var(--text-main); }
    .brand span { color: var(--accent-primary); }
    .badge-live { background-color: rgba(168, 85, 247, 0.15); color: var(--accent-primary); padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; border: 1px solid var(--accent-primary); }

    .viewport-controls { display: flex; gap: 6px; background-color: var(--bg-dark); padding: 4px; border-radius: 8px; border: 1px solid var(--border-color); }
    .btn-icon { background: none; border: none; color: var(--text-muted); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; }
    .btn-icon:hover, .btn-icon.active { background-color: var(--bg-card); color: var(--text-main); }

    .actions { display: flex; gap: 10px; align-items: center; }
    .btn-primary { background-color: var(--accent-primary); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; transition: background 0.2s; }
    .btn-primary:hover { background-color: var(--accent-hover); }

    /* Main Container */
    .studio-main { display: flex; flex: 1; height: calc(100vh - 54px); overflow: hidden; }

    /* Left Sidebar */
    .sidebar { width: var(--sidebar-width); background-color: var(--bg-surface); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; overflow-y: auto; }
    .sidebar-section { padding: 16px; border-bottom: 1px solid var(--border-color); }
    .sidebar-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 12px; }
    .nav-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 6px; color: var(--text-muted); cursor: pointer; font-size: 13px; font-weight: 500; margin-bottom: 4px; transition: all 0.15s; }
    .nav-item:hover, .nav-item.active { background-color: var(--bg-card); color: var(--text-main); }

    /* Canvas Area */
    .canvas-container { flex: 1; background-color: #050507; display: flex; flex-direction: column; align-items: center; padding: 32px; overflow-y: auto; position: relative; }
    .canvas-preview { background-color: var(--bg-dark); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; width: 100%; max-width: 840px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); transition: max-width 0.3s ease; }

    /* Inspector Right Sidebar */
    .inspector { width: var(--inspector-width); background-color: var(--bg-surface); border-left: 1px solid var(--border-color); padding: 20px; overflow-y: auto; }
    .form-group { margin-bottom: 18px; }
    .form-label { font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; display: block; }
    .form-input, .form-select { width: 100%; background-color: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); padding: 8px 12px; border-radius: 6px; font-size: 13px; outline: none; }
    .form-input:focus, .form-select:focus { border-color: var(--accent-primary); }

    /* SVG & Markdown Live Frame */
    #hero-svg-container { margin-bottom: 24px; border-radius: 12px; overflow: hidden; width: 100%; }
    #hero-svg-container svg { width: 100%; height: auto; display: block; }
    #markdown-preview-container { font-family: 'Inter', sans-serif; line-height: 1.6; color: var(--text-main); font-size: 14px; }
  </style>
</head>
<body>

  <!-- Top Navigation -->
  <header class="top-nav">
    <div class="brand">
      ✨ <span>PROFILE AURA</span> STUDIO 2.0
      <span class="badge-live">LIVE DESIGNER</span>
    </div>

    <div class="viewport-controls">
      <button class="btn-icon active" onclick="setViewport('desktop')">💻 Desktop (800px)</button>
      <button class="btn-icon" onclick="setViewport('tablet')">📱 Tablet (600px)</button>
      <button class="btn-icon" onclick="setViewport('mobile')">📲 Mobile (380px)</button>
    </div>

    <div class="actions">
      <button class="btn-icon" onclick="undoState()">↩ Undo</button>
      <button class="btn-icon" onclick="redoState()">↪ Redo</button>
      <button class="btn-primary" onclick="exportProfile()">⚡ Export Portfolio</button>
    </div>
  </header>

  <!-- Main Studio Interface -->
  <div class="studio-main">

    <!-- Left Navigation Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-section">
        <div class="sidebar-title">Studio Navigation</div>
        <div class="nav-item active" onclick="switchTab('themes')">🎨 Themes Preset (20)</div>
        <div class="nav-item" onclick="switchTab('templates')">📐 Layout Templates (16)</div>
        <div class="nav-item" onclick="switchTab('hero')">🖼️ Satori Hero Engine</div>
        <div class="nav-item" onclick="switchTab('widgets')">🧩 Widget Ecosystem (9)</div>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Active Presets</div>
        <div class="nav-item"><span>Current Theme:</span> <strong id="lbl-theme">black-obsidian</strong></div>
        <div class="nav-item"><span>Current Layout:</span> <strong id="lbl-template">editorial-hero</strong></div>
      </div>
    </aside>

    <!-- Center Live Canvas -->
    <main class="canvas-container">
      <div class="canvas-preview" id="canvas-preview">
        <div id="hero-svg-container">Loading Satori Vector Hero...</div>
        <div id="markdown-preview-container">Loading Portfolio README...</div>
      </div>
    </main>

    <!-- Right Inspector Panel -->
    <aside class="inspector">
      <div class="sidebar-title">Inspector & Property Controls</div>

      <div class="form-group">
        <label class="form-label">Developer Display Name</label>
        <input type="text" id="inp-name" class="form-input" value="Kalash Mishra" oninput="updateConfig('name', this.value)">
      </div>

      <div class="form-group">
        <label class="form-label">Role Title</label>
        <input type="text" id="inp-role" class="form-input" value="Principal Architect" oninput="updateConfig('role', this.value)">
      </div>

      <div class="form-group">
        <label class="form-label">Active Visual Theme</label>
        <select id="sel-theme" class="form-select" onchange="updateTheme(this.value)">
          <option value="black-obsidian">Black Obsidian (Vercel Style)</option>
          <option value="cyberpunk-neon">Cyberpunk 2099</option>
          <option value="tokyo-night">Tokyo Night</option>
          <option value="monochrome-pro">Monochrome Pro (Apple)</option>
          <option value="dracula-vamp">Dracula Vamp</option>
          <option value="nordic-frost">Nordic Frost</option>
          <option value="emerald-matrix">Emerald Matrix</option>
          <option value="sunset-overdrive">Sunset Overdrive</option>
          <option value="anime-mecha">Anime Mecha Tactical</option>
          <option value="rose-gold-dark">Rose Gold Dark Luxury</option>
          <option value="aurora-borealis">Aurora Borealis</option>
          <option value="galaxy-void">Galaxy Void</option>
          <option value="gojo-limitless">Gojo Limitless</option>
          <option value="glassmorphism">Frosted Glass Ambient</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Active Portfolio Layout Template</label>
        <select id="sel-template" class="form-select" onchange="updateTemplate(this.value)">
          <option value="editorial-hero">Editorial Magazine Hero</option>
          <option value="bento-grid">Modern Bento Box Grid</option>
          <option value="minimalist-compact">Minimalist Compact Executive</option>
          <option value="portfolio-showcase">Portfolio Showcase</option>
          <option value="dashboard-metrics">Dashboard Analytics View</option>
          <option value="landing-page">Product Landing Page</option>
          <option value="glassmorphic-card">Glassmorphic Floating Cards</option>
          <option value="developer-card">Developer ID Badge</option>
          <option value="apple-minimal">Apple Sleek Minimal</option>
          <option value="cyber-tactical">Cyber Tactical Grid</option>
        </select>
      </div>
    </aside>

  </div>

  <script>
    async function loadStudioData() {
      try {
        const res = await fetch('/api/render');
        const data = await res.json();
        if (data.heroSvg) {
          document.getElementById('hero-svg-container').innerHTML = data.heroSvg;
        }
        if (data.markdownHtml) {
          document.getElementById('markdown-preview-container').innerHTML = data.markdownHtml;
        }
      } catch (err) {
        console.error('Failed to render live studio preview:', err);
      }
    }

    async function updateTheme(themeId) {
      document.getElementById('lbl-theme').innerText = themeId;
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeId })
      });
      loadStudioData();
    }

    async function updateTemplate(templateId) {
      document.getElementById('lbl-template').innerText = templateId;
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: templateId })
      });
      loadStudioData();
    }

    async function updateConfig(key, val) {
      const payload = { profile: {} };
      payload.profile[key] = val;
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      loadStudioData();
    }

    function setViewport(mode) {
      const canvas = document.getElementById('canvas-preview');
      if (mode === 'desktop') canvas.style.maxWidth = '840px';
      if (mode === 'tablet') canvas.style.maxWidth = '600px';
      if (mode === 'mobile') canvas.style.maxWidth = '380px';
    }

    async function exportProfile() {
      alert('⚡ Exporting portfolio README.md and hero.svg to workspace...');
      await fetch('/api/export', { method: 'POST' });
    }

    function undoState() { loadStudioData(); }
    function redoState() { loadStudioData(); }

    loadStudioData();
  </script>
</body>
</html>`;
}
