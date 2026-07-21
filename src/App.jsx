import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-primary text-textBase overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000"></div>
      </div>
      
      <Navbar />
      <main className="container mx-auto px-6 md:px-12 pt-24 pb-12 space-y-32">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      
      <footer className="border-t border-white/10 py-8 text-center text-textMuted text-sm">
        <p>&copy; {new Date().getFullYear()} Omkar Mahadev Mali. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

export default App;
