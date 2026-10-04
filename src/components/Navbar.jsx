import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

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
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine the active section
      const sections = menuItems.map(item => item.href);
      let currentActive = '#hero';
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is somewhat near the top of the viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActive = section;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      // Update the URL path cleanly without a # (e.g. /home, /about)
      const pathName = targetId === '#hero' ? 'home' : targetId.substring(1);
      window.history.pushState({}, '', `/${pathName}`);
    }
  };



  return (
    <motion.nav
      initial={{ y: -100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ duration: 0.5 }}
      className={`fixed top-6 left-1/2 z-50 w-[90%] md:w-auto transition-all duration-300 rounded-full border border-white/10 ${scrolled || mobileMenuOpen ? 'glass py-3 px-8 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'bg-black/30 backdrop-blur-md py-4 px-10'}`}
    >
      <div className="flex justify-between items-center gap-10 w-full">
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-tertiary"
        >
          OM.
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                handleSmoothScroll(e, item.href);
                setActiveSection(item.href);
              }}
              className={`text-sm font-medium transition-colors ${activeSection === item.href
                ? 'text-secondary drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                : 'text-textMuted hover:text-textBase'
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-textBase hover:text-secondary transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
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
            className="md:hidden border-t border-black/10 mt-4 bg-primary/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.href);
                    setActiveSection(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-base font-medium transition-colors py-2 ${activeSection === item.href
                    ? 'text-secondary'
                    : 'text-textMuted hover:text-secondary'
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
