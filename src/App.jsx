import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import UfoCursor from './components/UfoCursor';
import blackHoleBg from './assets/black_hole_bg.jpg';

function App() {
  return (
    <div className="min-h-screen bg-black text-textBase overflow-x-hidden relative">
      <UfoCursor />

      {/* Cinematic Image Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-2] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 animate-[slowPan_30s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: `url(${blackHoleBg})`, transform: 'scale(1.1)' }}
        ></div>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      <Navbar />
      <main className="container mx-auto px-6 md:px-12 pt-24 pb-12 space-y-32">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-textMuted text-sm">
        <p>&copy; {new Date().getFullYear()} Omkar Mahadev Mali.</p>
      </footer>
    </div>
  );
}

export default App;
