import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────
//  🔑  EMAILJS CREDENTIALS
//  Steps to get these:
//  1. Go to https://www.emailjs.com and sign up (free)
//  2. Add an Email Service  →  copy "Service ID"
//  3. Create an Email Template →  copy "Template ID"
//     Template variables to use: {{from_name}}, {{from_email}}, {{message}}
//  4. Go to Account → API Keys → copy "Public Key"
//  Then paste them below:
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'aBcDeFgHiJkLmNoP'

function useReveal(ref, delay = 0) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), delay);
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, [ref, delay]);
}

const socials = [
  {
    name: 'GitHub', href: 'https://github.com', color: '#a855f7',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn', href: 'https://linkedin.com', color: '#06b6d4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter', href: 'https://twitter.com', color: '#ec4899',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

// Status types: 'idle' | 'loading' | 'success' | 'error'
function StatusBox({ status, onReset }) {
  if (status === 'idle') return null;

  const config = {
    loading: { icon: null, title: 'Sending...', msg: 'Hold on, sending your message to Bharath.', color: '#a855f7' },
    success: { icon: '✅', title: 'Message Sent!', msg: "You'll hear back within 24 hours. Thanks for reaching out 🚀", color: '#84cc16' },
    error:   { icon: '❌', title: 'Something went wrong', msg: 'Please try again, or email me directly at bharath@gmail.com', color: '#ec4899' },
  }[status];

  return (
    <div style={{
      height: '100%', minHeight: 260,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 16, textAlign: 'center', padding: '1rem',
    }}>
      {status === 'loading' ? (
        /* Spinner */
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          border: '3px solid rgba(168,85,247,0.15)',
          borderTopColor: '#a855f7',
          animation: 'spin 0.9s linear infinite',
        }} />
      ) : (
        <div style={{ fontSize: '3rem', lineHeight: 1 }}>{config.icon}</div>
      )}

      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.4rem',
        color: config.color,
      }}>
        {config.title}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: 300 }}>
        {config.msg}
      </p>
      {(status === 'success' || status === 'error') && (
        <button
          onClick={onReset}
          className="btn-neon btn-neon-outline"
          style={{ marginTop: 8, fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}
        >
          {status === 'success' ? 'Send Another' : 'Try Again'}
        </button>
      )}
    </div>
  );
}

function Contact() {
  const titleRef = useRef(null);
  const formRef  = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  useReveal(titleRef);
  useReveal(formRef, 150);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      message:    form.message,
      to_name:    'Bharath',   // your name (shows in email template)
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const handleReset = () => setStatus('idle');

  return (
    <section
      id="contact"
      className="mesh-bg py-28 px-6"
      style={{
        background: 'linear-gradient(180deg, var(--bg-dark) 0%, #060618 50%, var(--bg-dark) 100%)',
        position: 'relative',
      }}
    >
      {/* Blob */}
      <div style={{
        position: 'absolute', top: '10%', right: '15%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="reveal text-center mb-16">
          <span className="section-label">// let's connect</span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.03em',
          }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
            Got a project? Let's make something amazing together 🚀
          </p>
        </div>

        <div ref={formRef} className="reveal grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* {Left info panel} */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* {Contact info card} */}
            <div className="neon-card" style={{ padding: '1.75rem', flex: 1 }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Let's build something great
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                I'm always open to freelance projects, full-time opportunities, or just a friendly chat about tech and design.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '📧', label: 'bharath@gmail.com' },
                  { icon: '📍', label: 'Chennai, India' },
                  { icon: '🕐', label: 'Responds within 24h' },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', flexShrink: 0,
                    }}>
                      {icon}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="neon-card" style={{ padding: '1.5rem' }}>
              <div style={{
                fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', marginBottom: '0.875rem',
              }}>
                Find me online
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {socials.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    title={social.name}
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.5)', transition: 'all 0.25s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${social.color}80`;
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.background = `${social.color}15`;
                      e.currentTarget.style.boxShadow = `0 0 20px ${social.color}30`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="neon-card md:col-span-3" style={{ padding: '2rem' }}>
            {status !== 'idle' ? (
              <StatusBox status={status} onReset={handleReset} />
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
                      YOUR NAME
                    </label>
                    <input
                      type="text" required className="neon-input"
                      placeholder="Bharath"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
                      YOUR EMAIL
                    </label>
                    <input
                      type="email" required className="neon-input"
                      placeholder="bharath@gmail.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
                    YOUR MESSAGE
                  </label>
                  <textarea
                    required rows={5} className="neon-input"
                    placeholder="Hi Bharath, I'd love to work with you on..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-neon btn-neon-primary"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  Send Message 🚀
                </button>

                {/* EmailJS not configured yet — show warning */}
                {EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' && (
                  <p style={{
                    textAlign: 'center', fontSize: '0.72rem',
                    color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace',
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: 10, padding: '0.5rem 1rem',
                  }}>
                    {/* Warning wrapper */}
                    {"⚠️ EmailJS not configured yet. Add your keys to Contact.jsx"}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Spinner keyframe injected inline */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

export default Contact;