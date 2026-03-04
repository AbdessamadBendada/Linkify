'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  const handleClaim = () => {
    if (username.trim()) {
      router.push(`/signup?username=${username.trim().toLowerCase()}`)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black: #0a0a0a;
          --white: #f5f2ec;
          --accent: #e8ff47;
          --muted: #8a8578;
          --card: #141410;
        }

        body {
          background: var(--black);
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          overflow-x: hidden;
        }

        .bebas { font-family: 'Bebas Neue', sans-serif; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 48px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(16px);
        }
        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          color: var(--accent);
          text-decoration: none;
        }
        .nav-links { display: flex; gap: 36px; align-items: center; }
        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--white); }
        .nav-cta {
          background: var(--accent) !important;
          color: var(--black) !important;
          padding: 10px 22px;
          border-radius: 2px;
          font-weight: 500 !important;
          font-size: 13px !important;
          letter-spacing: 1px;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 140px 48px 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(232,255,71,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(232,255,71,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(232,255,71,0.3);
          padding: 6px 14px;
          border-radius: 2px;
          margin-bottom: 32px;
          width: fit-content;
          animation: fadeUp 0.6s ease both;
        }
        .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: 0.92;
          letter-spacing: -1px;
          max-width: 900px;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero h1 em {
          font-style: italic;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          color: var(--accent);
          font-size: 0.7em;
        }
        .hero-sub {
          margin-top: 32px;
          font-size: 18px;
          color: var(--muted);
          max-width: 480px;
          line-height: 1.7;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero-note {
          font-size: 12px;
          color: var(--muted);
          margin-top: 18px;
          letter-spacing: 0.3px;
          animation: fadeUp 0.7s 0.4s ease both;
        }

        /* FLOATING PREVIEW */
        .hero-preview {
          position: absolute;
          right: 6%; top: 50%;
          transform: translateY(-50%);
          width: 280px;
          animation: floatCard 4s ease-in-out infinite, fadeUp 1s 0.5s ease both;
        }
        .preview-card {
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        .preview-avatar {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, var(--accent), #a8cc00);
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
        }
        .preview-name { font-weight: 500; font-size: 16px; margin-bottom: 4px; }
        .preview-bio { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
        .preview-link {
          display: block;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 13px;
          margin-bottom: 8px;
          text-align: left;
          color: var(--white);
          text-decoration: none;
          transition: background 0.2s;
        }
        .preview-link:hover { background: rgba(232,255,71,0.08); }

        /* URL INPUT */
        .url-input-wrap {
          display: flex;
          align-items: center;
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px;
          overflow: hidden;
          max-width: 500px;
          margin-top: 48px;
          transition: border-color 0.3s;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .url-input-wrap:focus-within { border-color: var(--accent); }
        .url-prefix {
          padding: 0 16px;
          font-size: 14px;
          color: var(--muted);
          white-space: nowrap;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .url-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: var(--white);
        }
        .url-input::placeholder { color: var(--muted); }
        .url-btn {
          background: var(--accent);
          color: var(--black);
          border: none;
          padding: 0 24px;
          min-height: 54px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s;
        }
        .url-btn:hover { opacity: 0.85; }

        /* TICKER */
        .ticker {
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 14px 0;
          background: rgba(232,255,71,0.03);
        }
        .ticker-inner {
          display: flex;
          white-space: nowrap;
          animation: ticker 20s linear infinite;
        }
        .ticker-item {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          padding: 0 40px;
        }
        .ticker-item strong { color: var(--accent); }

        /* FEATURES */
        .section { padding: 120px 48px; }
        .section-label {
          font-size: 11px; letter-spacing: 3px;
          text-transform: uppercase; color: var(--accent); margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 6vw, 80px);
          line-height: 1; letter-spacing: 1px;
          max-width: 700px; margin-bottom: 64px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2px;
        }
        .feature-card {
          background: var(--card);
          padding: 40px 36px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: border-color 0.3s, background 0.3s;
          position: relative; overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--accent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .feature-card:hover::before { transform: scaleX(1); }
        .feature-card:hover { background: #1a1a14; border-color: rgba(232,255,71,0.1); }
        .feature-icon { font-size: 28px; margin-bottom: 20px; display: block; }
        .feature-title { font-size: 18px; font-weight: 500; margin-bottom: 12px; }
        .feature-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

        /* HOW IT WORKS */
        .how-section {
          padding: 120px 48px;
          background: #0d0d09;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 48px; margin-top: 64px;
        }
        .step-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px; color: rgba(232,255,71,0.12); line-height: 1; margin-bottom: 8px;
        }
        .step-title { font-size: 18px; font-weight: 500; margin-bottom: 10px; }
        .step-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

        /* PRICING */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px; margin-top: 64px; max-width: 800px;
        }
        .pricing-card {
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px; padding: 40px 36px;
        }
        .pricing-card.featured { border-color: var(--accent); position: relative; }
        .pricing-card.featured::after {
          content: 'POPULAR';
          position: absolute; top: -1px; right: 24px;
          background: var(--accent); color: var(--black);
          font-size: 10px; font-weight: 500; letter-spacing: 2px; padding: 4px 10px;
        }
        .pricing-plan { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
        .pricing-price { font-family: 'Bebas Neue', sans-serif; font-size: 56px; line-height: 1; margin-bottom: 4px; }
        .pricing-price sup { font-family: 'DM Sans', sans-serif; font-size: 20px; font-weight: 300; vertical-align: super; }
        .pricing-period { font-size: 13px; color: var(--muted); margin-bottom: 32px; }
        .pricing-features { list-style: none; margin-bottom: 36px; }
        .pricing-features li {
          font-size: 14px; color: var(--muted);
          padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 10px;
        }
        .pricing-features li::before { content: '—'; color: var(--accent); font-size: 12px; }
        .pricing-features li.active { color: var(--white); }

        /* BUTTONS */
        .btn-primary {
          background: var(--accent); color: var(--black);
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: 15px; letter-spacing: 0.5px;
          padding: 16px 36px; border: none; border-radius: 2px;
          cursor: pointer; transition: transform 0.2s, opacity 0.2s;
          display: inline-block; text-decoration: none;
        }
        .btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }
        .btn-ghost {
          background: transparent; color: var(--white);
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          padding: 16px 28px; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 2px; cursor: pointer;
          transition: border-color 0.2s; text-decoration: none; display: inline-block;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.5); }

        /* CTA */
        .cta-section {
          padding: 120px 48px; text-align: center; position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: 'LINKIFY';
          position: absolute; font-family: 'Bebas Neue', sans-serif;
          font-size: 25vw; color: rgba(255,255,255,0.02);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          white-space: nowrap; pointer-events: none;
        }
        .cta-section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 7vw, 90px); line-height: 1; margin-bottom: 24px;
        }
        .cta-section p { font-size: 16px; color: var(--muted); margin-bottom: 48px; }

        /* FOOTER */
        footer {
          padding: 48px; border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;
        }
        .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; color: var(--accent); }
        .footer-links { display: flex; gap: 28px; }
        .footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--white); }
        .footer-copy { font-size: 12px; color: rgba(138,133,120,0.5); }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(-50%) rotate(1deg); }
          50% { transform: translateY(calc(-50% - 16px)) rotate(-0.5deg); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 900px) {
          .nav { padding: 20px 24px; }
          .nav-links { display: none; }
          .hero { padding: 120px 24px 80px; }
          .hero-preview { display: none; }
          .section, .how-section, .cta-section { padding: 80px 24px; }
          footer { padding: 36px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="logo">LINKIFY</Link>
        <div className="nav-links">
          <Link href="#features">Features</Link>
          <Link href="#how">How it works</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/signup" className="nav-cta">GET STARTED FREE</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-tag">✦ Free to start — no credit card</div>
        <h1>ONE LINK.<br /><em>Everything</em><br />YOU ARE.</h1>
        <p className="hero-sub">Your entire online world — portfolio, socials, store, music — beautifully arranged on a single shareable page.</p>

        <div className="url-input-wrap">
          <span className="url-prefix">linkify.io/</span>
          <input
            className="url-input"
            type="text"
            placeholder="yourname"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleClaim()}
          />
          <button className="url-btn" onClick={handleClaim}>CLAIM IT →</button>
        </div>
        <p className="hero-note">✓ Free forever &nbsp;·&nbsp; ✓ Live in 60 seconds &nbsp;·&nbsp; ✓ No design skills needed</p>

        {/* FLOATING PREVIEW */}
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-avatar">🎨</div>
            <div className="preview-name">Alex Rivera</div>
            <div className="preview-bio">Designer & Creative Director</div>
            <a href="#" className="preview-link"><span>🎨</span> Portfolio</a>
            <a href="#" className="preview-link"><span>𝕏</span> Twitter / X</a>
            <a href="#" className="preview-link"><span>📷</span> Instagram</a>
            <a href="#" className="preview-link"><span>💼</span> Book a call</a>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          <span className="ticker-item">✦ <strong>10,000+</strong> pages created</span>
          <span className="ticker-item">✦ Works on every device</span>
          <span className="ticker-item">✦ <strong>60 second</strong> setup</span>
          <span className="ticker-item">✦ No coding needed</span>
          <span className="ticker-item">✦ <strong>100% free</strong> to start</span>
          <span className="ticker-item">✦ Custom themes</span>
          <span className="ticker-item">✦ Analytics included</span>
          <span className="ticker-item">✦ <strong>10,000+</strong> pages created</span>
          <span className="ticker-item">✦ Works on every device</span>
          <span className="ticker-item">✦ <strong>60 second</strong> setup</span>
          <span className="ticker-item">✦ No coding needed</span>
          <span className="ticker-item">✦ <strong>100% free</strong> to start</span>
          <span className="ticker-item">✦ Custom themes</span>
          <span className="ticker-item">✦ Analytics included</span>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-label">What you get</div>
        <div className="section-title">BUILT FOR CREATORS,<br />NOT DEVELOPERS.</div>
        <div className="features-grid">
          {[
            { icon: '⚡', title: 'Instant Setup', desc: 'Pick a username, add your links, and go live. No design skills, no code, no waiting. Your page is ready in under a minute.' },
            { icon: '🎨', title: 'Beautiful Themes', desc: 'Choose from a curated set of stunning themes or customize colors and fonts to perfectly match your personal brand.' },
            { icon: '📊', title: 'Link Analytics', desc: 'See exactly how many people are clicking your links, where they\'re coming from, and which links perform best.' },
            { icon: '📱', title: 'Mobile First', desc: 'Your page looks perfect on every screen — phone, tablet, desktop. Optimized for the places your audience actually is.' },
            { icon: '🔗', title: 'Unlimited Links', desc: 'Add as many links as you need. Social profiles, websites, products, booking pages — all in one place.' },
            { icon: '🌐', title: 'Custom Domain', desc: 'Connect your own domain for a fully professional look. Your brand, your URL, your rules.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-label">Simple as that</div>
        <div className="section-title">UP AND RUNNING IN 3 STEPS.</div>
        <div className="steps">
          {[
            { n: '01', title: 'Claim your username', desc: 'Pick a handle that represents you. It becomes your permanent link — short, clean, and memorable.' },
            { n: '02', title: 'Add your links', desc: 'Paste in your social profiles, websites, and anything else you want people to find. Drag to reorder.' },
            { n: '03', title: 'Share it everywhere', desc: 'Put your Linkify URL in your Instagram bio, email signature, business card — anywhere you appear online.' },
          ].map(s => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="section-label">Pricing</div>
        <div className="section-title">STARTS FREE.<br />GROWS WITH YOU.</div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-plan">Free</div>
            <div className="pricing-price"><sup>$</sup>0</div>
            <div className="pricing-period">forever</div>
            <ul className="pricing-features">
              <li className="active">Unlimited links</li>
              <li className="active">Custom username</li>
              <li className="active">3 themes</li>
              <li>Basic analytics</li>
              <li>Custom domain</li>
            </ul>
            <Link href="/signup" className="btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Get started</Link>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-plan">Pro</div>
            <div className="pricing-price"><sup>$</sup>7</div>
            <div className="pricing-period">per month</div>
            <ul className="pricing-features">
              <li className="active">Unlimited links</li>
              <li className="active">Custom username</li>
              <li className="active">All themes + custom colors</li>
              <li className="active">Full analytics dashboard</li>
              <li className="active">Custom domain</li>
            </ul>
            <Link href="/signup" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Start free trial</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>YOUR LINK<br />IS WAITING.</h2>
        <p>Join thousands of creators who have already claimed their page.</p>
        <Link href="/signup" className="btn-primary" style={{ fontSize: '16px', padding: '18px 48px' }}>CLAIM YOUR FREE PAGE →</Link>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">LINKIFY</div>
        <div className="footer-links">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
        </div>
        <div className="footer-copy">© 2026 Linkify. All rights reserved.</div>
      </footer>
    </>
  )
}