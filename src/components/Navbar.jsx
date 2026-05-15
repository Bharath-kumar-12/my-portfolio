import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['About', 'Projects', 'Skills', 'Contact'];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5, 5, 16, 0.85)'
          : 'rgba(5, 5, 16, 0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(168,85,247,0.12)' : '1px solid transparent',
        padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              boxShadow: '0 0 16px rgba(168,85,247,0.5)',
            }}
          >
            B
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Bharath<span style={{ color: '#a855f7' }}>.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="nav-link">
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn-neon btn-neon-primary text-sm"
              style={{ padding: '0.6rem 1.5rem' }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 w-6 transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #06b6d4)',
                transform:
                  menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                  menuOpen && i === 1 ? 'scaleX(0)' :
                  menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full py-6 px-8 flex flex-col gap-4"
          style={{
            background: 'rgba(5,5,16,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(168,85,247,0.12)',
          }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;