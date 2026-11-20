import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import UfoCursor from './components/UfoCursor';
import SpaceshipChatbot from './components/SpaceshipChatbot';
import blackHoleBg from './assets/black_hole_bg.jpg';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-textBase overflow-x-hidden relative">
      {/* Spaceship Cursor Tracker */}
      <UfoCursor />

      {/* Interactive AI Chatbot for Spaceship */}
      <SpaceshipChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
      />

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
      {/* Responsive vertical rhythm: tight and compact on mobile, spacious on desktop */}
      <main className="container mx-auto px-4 sm:px-6 md:px-12 pt-16 md:pt-24 pb-8 md:pb-16 space-y-6 md:space-y-16">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <footer className="border-t border-white/10 py-6 md:py-8 text-center text-textMuted text-xs md:text-sm">
        <p>&copy; {new Date().getFullYear()} Omkar Mahadev Mali. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
