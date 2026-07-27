<div align="center">

```aura width=860 height=220 link="https://github.com/kalashmishra21/profile-aura"
<div style={{
  width: '100%', height: '100%', background: '#09090b',
  display: 'flex', alignItems: 'center', fontFamily: 'Inter',
  position: 'relative', overflow: 'hidden', borderRadius: 16,
  border: '1px solid rgba(168, 85, 247, 0.2)'
}}>

  <style>{`
      @keyframes float-slow {
        0%, 100% { transform: translateX(0px); opacity: 0.8; }
        50% { transform: translateX(350px); opacity: 1.2; }
      }
      @keyframes float-medium {
        0%, 100% { transform: translateX(0px); opacity: 0.7; }
        50% { transform: translateX(-250px); opacity: 1.1; }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateX(0px); opacity: 0.9; }
        50% { transform: translateX(200px); opacity: 0.6; }
      }
      #glow-1 { animation: float-slow 8s ease-in-out infinite; }
      #glow-2 { animation: float-medium 12s ease-in-out infinite; }
      #glow-3 { animation: float-fast 9s ease-in-out infinite; }
    `}</style>

  <svg width="860" height="220" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
        <stop offset="70%" stopColor="rgba(168, 85, 247, 0)" />
      </radialGradient>
      <radialGradient id="g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
        <stop offset="70%" stopColor="rgba(56, 189, 248, 0)" />
      </radialGradient>
      <radialGradient id="g3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(236, 72, 153, 0.25)" />
        <stop offset="70%" stopColor="rgba(236, 72, 153, 0)" />
      </radialGradient>
    </defs>

    <ellipse id="glow-1" cx="200" cy="220" rx="250" ry="200" fill="url(#g1)" />
    <ellipse id="glow-2" cx="600" cy="0" rx="300" ry="250" fill="url(#g2)" />
    <ellipse id="glow-3" cx="400" cy="110" rx="200" ry="150" fill="url(#g3)" />
  </svg>

  <div style={{
    position: 'absolute', left: 48, top: 62, width: 96, height: 96,
    borderRadius: 48, background: 'linear-gradient(135deg, #a855f7, #38bdf8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)'
  }}>
    <img src={github?.user?.avatarUrl ?? 'https://github.com/kalashmishra21.png'} width={88} height={88} style={{ borderRadius: 44 }} />
  </div>

  <div style={{ display:'flex', flexDirection:'column', marginLeft:176, gap:8, zIndex: 10 }}>
    <div style={{ display:'flex', fontSize:42, fontWeight:800, color:'#ffffff', letterSpacing:'-1px', lineHeight:1 }}>
      profile-aura
    </div>
    <div style={{ display:'flex', fontSize:16, color:'rgba(255,255,255,0.7)', fontWeight:400, letterSpacing:'0.2px' }}>
      Next-Gen SVG-First GitHub README Generator with Satori
    </div>
    <div style={{ display:'flex', gap:10, marginTop:10, flexWrap: 'wrap' }}>
      {[
        'React/JSX',
        'SVG Rendering',
        'GitHub Actions',
        'TypeScript'
      ].map(function(tag, i) {
        return (
          <div key={i} style={{
            display:'flex', padding:'6px 14px', borderRadius:20,
            background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
            color:'rgba(255,255,255,0.9)', fontSize:13, fontWeight:500,
          }}>{tag}</div>
        );
      })}
    </div>
  </div>
</div>
```

</div>

<br/>

Generate incredibly beautiful, animated, and dynamic GitHub profiles using Vercel Satori. **Profile Aura** replaces standard markdown lists and static images with pixel-perfect SVG widgets engineered for aesthetic excellence.

GitHub strips all JS and CSS from README files, but `profile-aura` bypasses this by rendering everything into static SVG images using React JSX at build time!

---

### Features

<div align="center">

```aura width=860 height=160 align=center
<div style={{ display: 'flex', gap: '20px', width: '100%', height: '100%', padding: '10px 0' }}>
  <div style={{
    flex: 1, display: 'flex', flexDirection: 'column', background: '#09090b',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 24,
    fontFamily: 'Inter'
  }}>
    <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>JSX to SVG</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: '#a855f7', marginBottom: 6 }}>Satori Engine</div>
    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
      Write real React components. Profile Aura compiles them into gorgeous SVGs.
    </div>
  </div>

  <div style={{
    flex: 1, display: 'flex', flexDirection: 'column', background: '#09090b',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 24,
    fontFamily: 'Inter'
  }}>
    <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Automated</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>GitHub Actions</div>
    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
      Auto-rebuilds and pushes on a cron schedule to keep your profile always up-to-date.
    </div>
  </div>

  <div style={{
    flex: 1, display: 'flex', flexDirection: 'column', background: '#09090b',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 24,
    fontFamily: 'Inter', position: 'relative', overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', bottom: -50, right: -50, width: 150, height: 150, background: 'rgba(236,72,153,0.2)', filter: 'blur(40px)' }}></div>
    <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Themes</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: '#ec4899', marginBottom: 6 }}>Design Tokens</div>
    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
      Customize colors, layouts, and typography instantly with token-based themes.
    </div>
  </div>
</div>
```

</div>

---

### Quick Start (3 Steps)

Run one command in your repository. It configures the GitHub Actions workflow, generates your config file, and audits your `.gitignore`.

<div align="center">

```aura width=860 height=180 align=center
<div style={{ display: 'flex', gap: '16px', width: '100%', height: '100%', padding: '10px 0' }}>
  <div style={{
    flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #111, #000)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20,
    fontFamily: 'Inter'
  }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: 12 }}>STEP 1</div>
    <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Initialize</div>
    <div style={{ fontSize: 13, color: '#a855f7', fontFamily: 'monospace', background: 'rgba(168,85,247,0.1)', padding: '6px 10px', borderRadius: 6, marginBottom: 10 }}>$ npx profile-aura init</div>
    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Scaffolds your config files</div>
  </div>

  <div style={{
    flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #111, #000)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20,
    fontFamily: 'Inter'
  }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: 12 }}>STEP 2</div>
    <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Configure</div>
    <div style={{ fontSize: 13, color: '#38bdf8', fontFamily: 'monospace', background: 'rgba(56,189,248,0.1)', padding: '6px 10px', borderRadius: 6, marginBottom: 10 }}>profile-aura.config.json</div>
    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Set your data and themes</div>
  </div>

  <div style={{
    flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #111, #000)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20,
    fontFamily: 'Inter'
  }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: 12 }}>STEP 3</div>
    <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Deploy</div>
    <div style={{ fontSize: 13, color: '#fff', padding: '6px 0', marginBottom: 10 }}>Push to GitHub Main</div>
    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>GitHub Actions does the rest</div>
  </div>
</div>
```

</div>

### Commands
| Command | Description |
|---------|-------------|
| `npx profile-aura init` | Scaffold workflow and configuration files |
| `npx profile-aura build` | Render SVGs and generate README.md locally |

<br/>

### Why Profile Aura?
`profile-aura` doesn't just generate flat SVGs. It uses advanced Satori rendering coupled with raw SVG injections:
- **Radial Gradients**: Deep space backgrounds (`<radialGradient>`)
- **Glassmorphism**: Semi-transparent backgrounds (`rgba(0,0,0,0.4)`) with backdrop shadows (`<feDropShadow>`).
- **Glows**: Intense neon filters.
- **Animations**: Injected CSS `@keyframes` floating elements that bypass GitHub's Camo sanitizer.

<div align="center">
Made with ❤️ by Kalash Mishra
</div>
