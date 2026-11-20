import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  const menuItems = [
    { label: 'About', href: '#hero' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine the active section
      const sections = [
        '#hero',
        '#experience',
        '#education',
        '#projects',
        '#skills',
        '#certifications',
        '#contact'
      ];
      let currentActive = '#hero';
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActive = section;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      const pathName = targetId === '#hero' ? 'home' : targetId.substring(1);
      window.history.pushState({}, '', `/${pathName}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ duration: 0.5 }}
      className={`fixed top-5 left-1/2 z-50 w-[94%] lg:w-auto transition-all duration-300 rounded-full border border-white/10 ${
        scrolled || mobileMenuOpen
          ? 'glass py-2.5 px-6 md:px-8 shadow-[0_0_30px_rgba(139,92,246,0.3)]'
          : 'bg-black/40 backdrop-blur-md py-3 px-6 md:px-9'
      }`}
    >
      <div className="flex justify-between items-center gap-6 md:gap-8 w-full">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-tertiary tracking-tight"
        >
          OM.
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-7">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                handleSmoothScroll(e, item.href);
                setActiveSection(item.href);
              }}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.href
                  ? 'text-secondary drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                  : 'text-textMuted hover:text-textBase'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Navbar Resume Download CTA (Desktop) */}
        <div className="hidden md:flex items-center">
          <a
            href="/Omkar_Mali_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            download="Omkar_Mahadev_Mali_Resume.pdf"
            className="px-4 py-1.5 rounded-full bg-secondary/15 hover:bg-secondary text-secondary hover:text-white border border-secondary/40 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
          >
            <FaDownload size={11} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-textBase hover:text-secondary transition-colors focus:outline-none p-1"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 mt-3 pt-2 bg-primary/95 backdrop-blur-md rounded-2xl"
          >
            <div className="flex flex-col px-4 py-3 space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.href);
                    setActiveSection(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-base font-medium transition-colors py-1 ${
                    activeSection === item.href
                      ? 'text-secondary font-bold'
                      : 'text-textMuted hover:text-secondary'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-2 border-t border-white/10">
                <a
                  href="/Omkar_Mali_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  download="Omkar_Mahadev_Mali_Resume.pdf"
                  className="w-full py-2.5 rounded-xl bg-secondary text-white font-semibold flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(251,86,7,0.35)]"
                >
                  <FaDownload size={13} />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
