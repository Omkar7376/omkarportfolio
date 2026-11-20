import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaPaperPlane,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
  FaExternalLinkAlt,
  FaCompass,
  FaRobot,
  FaRocket,
  FaUserAstronaut,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaCertificate,
  FaPhoneAlt
} from 'react-icons/fa';
import spaceshipImg from '../assets/spaceship.png';

// Web Audio API sound synthesizer
const playSound = (type, enabled = true) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'message') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch {
    // Ignore audio permission errors
  }
};

// Inline Markdown parser (replaces **bold**, *italic*, [text](url) with real elements)
const formatInlineText = (str) => {
  if (!str) return null;
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      elements.push(str.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Link
      elements.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noreferrer"
          className="text-secondary hover:underline font-medium inline-flex items-center gap-1"
        >
          {match[1]} <FaExternalLinkAlt size={9} />
        </a>
      );
    } else if (match[3]) {
      // Bold
      elements.push(
        <strong key={match.index} className="font-semibold text-white">
          {match[3]}
        </strong>
      );
    } else if (match[4]) {
      // Italic
      elements.push(
        <em key={match.index} className="italic text-textMuted">
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      // Code
      elements.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-white/10 text-secondary font-mono text-xs">
          {match[5]}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str.length) {
    elements.push(str.substring(lastIndex));
  }

  return elements.length > 0 ? elements : str;
};

// Formatted Rich Text Viewer for general bot responses
const FormattedMessage = ({ text }) => {
  if (!text) return null;
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Bullet point
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          const content = trimmed.substring(1).trim();
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
              <div className="flex-1">{formatInlineText(content)}</div>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="px-1.5 py-0.2 rounded bg-secondary/20 text-secondary text-xs font-mono font-bold shrink-0 mt-0.5">
                {numMatch[1]}
              </span>
              <div className="flex-1">{formatInlineText(numMatch[2])}</div>
            </div>
          );
        }

        return <div key={idx}>{formatInlineText(line)}</div>;
      })}
    </div>
  );
};

// Structured Topic Cards
const AboutCard = () => (
  <div className="space-y-3.5 text-left">
    <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-secondary/30 to-tertiary/30 border border-secondary/40 flex items-center justify-center text-secondary shrink-0">
        <FaUserAstronaut size={16} />
      </div>
      <div>
        <h4 className="font-display font-bold text-white text-base leading-tight">
          Omkar Mahadev Mali
        </h4>
        <span className="text-[11px] font-mono text-secondary font-medium tracking-wide">
          Android & Mobile Developer
        </span>
      </div>
    </div>

    <p className="text-sm text-slate-200 leading-relaxed">
      Android developer with hands-on experience building mobile applications using Kotlin, Jetpack Compose, and Flutter. Experienced in implementing authentication, orders, and property management modules with MVVM, Clean Architecture, REST APIs (Retrofit), Hilt, Firebase, and Node.js/Express.js backend development.
    </p>

    <div className="space-y-1.5">
      <span className="text-[11px] uppercase font-mono tracking-wider text-textMuted block">
        Core Focus Areas
      </span>
      <div className="flex flex-wrap gap-1.5">
        {[
          'Kotlin',
          'Jetpack Compose',
          'Flutter & GetX',
          'MVVM & Clean Arch',
          'REST APIs & Retrofit',
          'Hilt / Dagger',
          'Firebase'
        ].map((item, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-lg bg-secondary/15 border border-secondary/30 text-white text-xs font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const SkillsCard = () => (
  <div className="space-y-3 text-left">
    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
      <FaCode className="text-secondary" size={14} />
      <h4 className="font-display font-bold text-white text-sm">
        Technical Skills & Stack
      </h4>
    </div>

    {/* Mobile & Android */}
    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
      <span className="text-xs font-semibold text-secondary flex items-center gap-1.5">
        📱 Mobile & Android
      </span>
      <div className="flex flex-wrap gap-1.5">
        {['Kotlin', 'Jetpack Compose', 'Flutter', 'GetX', 'XML', 'MVVM', 'Clean Architecture', 'DataStore', 'Android Studio'].map((s, i) => (
          <span key={i} className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-xs text-slate-200 font-mono">
            {s}
          </span>
        ))}
      </div>
    </div>

    {/* API & Dependency Injection */}
    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
      <span className="text-xs font-semibold text-tertiary flex items-center gap-1.5">
        🔌 API Integration & DI
      </span>
      <div className="flex flex-wrap gap-1.5">
        {['REST APIs', 'Retrofit', 'Ktor', 'Hilt / Dagger', 'Koin'].map((s, i) => (
          <span key={i} className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-xs text-slate-200 font-mono">
            {s}
          </span>
        ))}
      </div>
    </div>

    {/* Backend & Databases */}
    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
      <span className="text-xs font-semibold text-accent flex items-center gap-1.5">
        ⚡ Backend & Databases
      </span>
      <div className="flex flex-wrap gap-1.5">
        {['Node.js', 'Express.js', 'JWT', 'MySQL', 'MongoDB', 'Firebase'].map((s, i) => (
          <span key={i} className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-xs text-slate-200 font-mono">
            {s}
          </span>
        ))}
      </div>
    </div>

    {/* Languages & Tools */}
    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
      <span className="text-xs font-semibold text-textMuted flex items-center gap-1.5">
        🛠️ Languages & Tools
      </span>
      <div className="flex flex-wrap gap-1.5">
        {['Kotlin', 'Java', 'Dart', 'Python', 'SQL', 'JavaScript', 'Git', 'GitHub', 'Postman', 'VS Code', 'MySQL Workbench'].map((s, i) => (
          <span key={i} className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-xs text-slate-200 font-mono">
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsCard = () => {
  const projectList = [
    {
      title: 'Warna Farmer App – Animal Management & Revenue Tracker',
      tech: 'Dart • Flutter • GetX • REST APIs • Firebase',
      desc: 'Agricultural app for farmers to track livestock, monitor income, and real-time syncing.',
      github: '#'
    },
    {
      title: 'VoltRoute – EV Charging Stations',
      tech: 'Dart • Flutter • GetX • Node.js • MongoDB',
      desc: 'EV charging station locator & slot reservation app with vendor/admin dashboards.',
      github: 'https://github.com/Omkar7376/voltRoute.git'
    },
    {
      title: 'StitchUp – Tailor Management App',
      tech: 'Kotlin • Jetpack Compose • Hilt • DataStore • MVVM',
      desc: 'Android app for managing customer measurements, orders, and delivery schedules.',
      github: 'https://github.com/Omkar7376/stitchup-tailorAndroid.git'
    },
    {
      title: 'StitchUp – Tailor App Backend',
      tech: 'JavaScript • Node.js • Express.js • JWT • REST APIs',
      desc: 'Backend APIs for managing tailor shop operations, authentication, and order workflows.',
      github: 'https://github.com/Omkar7376/stitchup-tailorApp.git'
    },
    {
      title: 'Cylinder-Selling-Android',
      tech: 'Kotlin • XML • Dagger Hilt • Retrofit • MVVM',
      desc: 'Role-based cylinder management and tracking Android application.',
      github: '#'
    }
  ];

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center gap-2 pb-2 border-b border-white/10">
        <FaRocket className="text-secondary" size={14} />
        <h4 className="font-display font-bold text-white text-sm">
          Featured Mobile & Backend Projects
        </h4>
      </div>

      <div className="space-y-2.5">
        {projectList.map((p, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-secondary/40 transition-colors space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <h5 className="font-bold text-white text-xs">{p.title}</h5>
              {p.github !== '#' && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-textMuted hover:text-secondary transition-colors"
                  title="View on GitHub"
                >
                  <FaGithub size={13} />
                </a>
              )}
            </div>
            <p className="text-[11px] font-mono text-secondary">{p.tech}</p>
            <p className="text-xs text-slate-300 leading-snug">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceCard = () => (
  <div className="space-y-3 text-left">
    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
      <FaBriefcase className="text-secondary" size={14} />
      <h4 className="font-display font-bold text-white text-sm">
        Work & Internship Experience
      </h4>
    </div>

    <div className="space-y-2.5">
      {/* Warana */}
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
        <div className="flex justify-between items-baseline">
          <h5 className="font-bold text-white text-xs">Warana University</h5>
          <span className="text-[10px] font-mono text-secondary">01/2026 – Present</span>
        </div>
        <p className="text-xs text-tertiary font-medium">Software Developer Intern</p>
        <p className="text-xs text-slate-300 leading-snug">
          Building production agricultural management app with Flutter, GetX, and Firebase including authentication, livestock tracking, and real-time database syncing.
        </p>
      </div>

      {/* FasCave */}
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
        <div className="flex justify-between items-baseline">
          <h5 className="font-bold text-white text-xs">FasCave IT Solutions PVT</h5>
          <span className="text-[10px] font-mono text-secondary">01/2025 – 06/2025</span>
        </div>
        <p className="text-xs text-tertiary font-medium">Software Developer Intern</p>
        <p className="text-xs text-slate-300 leading-snug">
          Contributed to two production Android apps using Kotlin, MVVM, Retrofit APIs, and Dagger Hilt dependency injection.
        </p>
      </div>
    </div>
  </div>
);

const EducationCard = () => (
  <div className="space-y-3 text-left">
    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
      <FaGraduationCap className="text-secondary" size={14} />
      <h4 className="font-display font-bold text-white text-sm">
        Academic Credentials
      </h4>
    </div>

    <div className="space-y-2.5">
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
        <div className="flex justify-between items-start">
          <h5 className="font-bold text-white text-xs">Master of Computer Applications (MCA)</h5>
          <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary text-[10px] font-mono font-bold shrink-0">
            FY CGPA 8.34
          </span>
        </div>
        <p className="text-xs text-textMuted">Tatyasaheb Kore Institute of Engg & Tech, Warananagar</p>
        <p className="text-[11px] font-mono text-tertiary">2025 – 2027 (Pursuing)</p>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
        <div className="flex justify-between items-start">
          <h5 className="font-bold text-white text-xs">Bachelor of Computer Application (BCA)</h5>
          <span className="px-2 py-0.5 rounded bg-tertiary/20 text-tertiary text-[10px] font-mono font-bold shrink-0">
            CGPA 8.18 / 10
          </span>
        </div>
        <p className="text-xs text-textMuted">D Y Patil College of Engg & Tech, Talsande</p>
        <p className="text-[11px] font-mono text-tertiary">2022 – 2025</p>
      </div>
    </div>
  </div>
);

const CertificationsCard = () => (
  <div className="space-y-3 text-left">
    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
      <FaCertificate className="text-secondary" size={14} />
      <h4 className="font-display font-bold text-white text-sm">
        Certifications & Leadership
      </h4>
    </div>

    <div className="space-y-2">
      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
        <h5 className="font-bold text-white text-xs">Postman API Fundamentals Student Expert</h5>
        <span className="text-[10px] font-mono text-secondary">Postman • API Integration & Testing</span>
      </div>
      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
        <h5 className="font-bold text-white text-xs">IBM Python for Data Science</h5>
        <span className="text-[10px] font-mono text-tertiary">IBM • Python & Data Analysis</span>
      </div>
      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
        <h5 className="font-bold text-white text-xs">IBM SQL and Relational Databases</h5>
        <span className="text-[10px] font-mono text-accent">IBM • Database Architecture</span>
      </div>
      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
        <h5 className="font-bold text-white text-xs">Event Coordinator – WebSoftera Hackathon</h5>
        <span className="text-[10px] font-mono text-green-400">Leadership & Developer Event Coordination</span>
      </div>
    </div>
  </div>
);

const ContactCard = () => (
  <div className="space-y-3 text-left">
    <div className="flex items-center gap-2 pb-2 border-b border-white/10">
      <FaEnvelope className="text-secondary" size={14} />
      <h4 className="font-display font-bold text-white text-sm">
        Contact Omkar Directly
      </h4>
    </div>

    <div className="grid grid-cols-1 gap-2 pt-1">
      <a
        href="mailto:omkarmali2326@gmail.com"
        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-secondary/40 transition-colors group"
      >
        <div className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
          <FaEnvelope size={13} />
        </div>
        <div className="overflow-hidden">
          <span className="text-[10px] text-textMuted font-mono block">Email</span>
          <span className="text-xs font-semibold text-white group-hover:text-secondary transition-colors truncate block">
            omkarmali2326@gmail.com
          </span>
        </div>
      </a>

      <a
        href="tel:8010827376"
        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-green-400/40 transition-colors group"
      >
        <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
          <FaPhoneAlt size={13} />
        </div>
        <div>
          <span className="text-[10px] text-textMuted font-mono block">Phone / WhatsApp</span>
          <span className="text-xs font-semibold text-white group-hover:text-green-400 transition-colors">
            +91 8010827376
          </span>
        </div>
      </a>

      <div className="grid grid-cols-2 gap-2">
        <a
          href="https://www.linkedin.com/in/omkar-mali5501"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-secondary/40 transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center shrink-0">
            <FaLinkedin size={13} />
          </div>
          <div>
            <span className="text-[10px] text-textMuted font-mono block">LinkedIn</span>
            <span className="text-xs font-semibold text-white group-hover:text-tertiary transition-colors">
              Profile ↗
            </span>
          </div>
        </a>

        <a
          href="https://github.com/Omkar7376"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-secondary/40 transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
            <FaGithub size={13} />
          </div>
          <div>
            <span className="text-[10px] text-textMuted font-mono block">GitHub</span>
            <span className="text-xs font-semibold text-white group-hover:text-secondary transition-colors">
              Projects ↗
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
);

const initialWelcomeMessage = {
  id: 'welcome-msg',
  sender: 'bot',
  text: "Greetings, voyager! 🛸 I'm **Astra**, the AI navigator of Omkar's interstellar portfolio. How can I guide your journey through his cosmos today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  actions: [
    { label: "📄 Download Resume", type: "download", target: "/Omkar_Mali_Resume.pdf" },
    { label: "🚀 About Omkar", type: "prompt", target: "Tell me about Omkar" },
    { label: "⚡ Tech Stack", type: "prompt", target: "What are your skills?" },
    { label: "📱 Projects", type: "prompt", target: "Show me projects" },
    { label: "💼 Experience", type: "prompt", target: "Work experience" },
    { label: "🏆 Certifications", type: "prompt", target: "Certifications" },
    { label: "🎓 Education", type: "prompt", target: "Education details" },
    { label: "📬 Contact", type: "prompt", target: "Contact Omkar" }
  ]
};

const getBotResponse = (rawInput) => {
  const input = rawInput.toLowerCase().trim();

  // Resume Download
  if (
    input.includes('resume') ||
    input.includes('cv') ||
    input.includes('download')
  ) {
    return {
      text: "📄 **Omkar's Official Resume is Ready for Download:**\n\nYou can view and download his latest Android Developer resume PDF directly using the button below!",
      actions: [
        { label: "⬇️ Download Resume PDF", type: "download", target: "/Omkar_Mali_Resume.pdf" },
        { label: "📬 Contact Omkar Directly", type: "scroll", target: "#contact" }
      ]
    };
  }

  // About Omkar
  if (
    input.includes('about') ||
    input.includes('who is') ||
    input.includes('bio') ||
    input.includes('omkar') ||
    input.includes('introduce') ||
    input.includes('developer')
  ) {
    return {
      type: 'about',
      actions: [
        { label: "📄 Download Resume", type: "download", target: "/Omkar_Mali_Resume.pdf" },
        { label: "💼 View Experience", type: "scroll", target: "#experience" },
        { label: "📱 Featured Projects", type: "scroll", target: "#projects" },
        { label: "📬 Get In Touch", type: "scroll", target: "#contact" }
      ]
    };
  }

  // Skills & Tech Stack
  if (
    input.includes('skill') ||
    input.includes('stack') ||
    input.includes('tech') ||
    input.includes('kotlin') ||
    input.includes('compose') ||
    input.includes('flutter') ||
    input.includes('language') ||
    input.includes('tool') ||
    input.includes('database') ||
    input.includes('backend')
  ) {
    return {
      type: 'skills',
      actions: [
        { label: "🎯 Jump to Skills Section", type: "scroll", target: "#skills" },
        { label: "📱 View Projects", type: "scroll", target: "#projects" }
      ]
    };
  }

  // Projects
  if (
    input.includes('project') ||
    input.includes('app') ||
    input.includes('portfolio') ||
    input.includes('stitchup') ||
    input.includes('voltroute') ||
    input.includes('cylinder') ||
    input.includes('warna') ||
    input.includes('work')
  ) {
    return {
      type: 'projects',
      actions: [
        { label: "🎯 Jump to Projects Section", type: "scroll", target: "#projects" },
        { label: "🐙 StitchUp GitHub", type: "link", target: "https://github.com/Omkar7376/stitchup-tailorAndroid.git" },
        { label: "🐙 VoltRoute GitHub", type: "link", target: "https://github.com/Omkar7376/voltRoute.git" }
      ]
    };
  }

  // Experience / Internships
  if (
    input.includes('experience') ||
    input.includes('intern') ||
    input.includes('job') ||
    input.includes('fascave') ||
    input.includes('warana university') ||
    input.includes('career')
  ) {
    return {
      type: 'experience',
      actions: [
        { label: "🎯 Jump to Experience Section", type: "scroll", target: "#experience" },
        { label: "📬 Contact Omkar", type: "scroll", target: "#contact" }
      ]
    };
  }

  // Education
  if (
    input.includes('education') ||
    input.includes('college') ||
    input.includes('degree') ||
    input.includes('mca') ||
    input.includes('bca') ||
    input.includes('university') ||
    input.includes('cgpa') ||
    input.includes('sgpa') ||
    input.includes('score') ||
    input.includes('study')
  ) {
    return {
      type: 'education',
      actions: [
        { label: "🎯 Jump to Education Section", type: "scroll", target: "#education" }
      ]
    };
  }

  // Certifications
  if (
    input.includes('cert') ||
    input.includes('ibm') ||
    input.includes('postman') ||
    input.includes('hackathon') ||
    input.includes('activity') ||
    input.includes('expert')
  ) {
    return {
      type: 'certifications',
      actions: [
        { label: "🎯 Jump to Certifications", type: "scroll", target: "#certifications" }
      ]
    };
  }

  // Contact / Hire / Links
  if (
    input.includes('contact') ||
    input.includes('hire') ||
    input.includes('email') ||
    input.includes('phone') ||
    input.includes('mobile') ||
    input.includes('reach') ||
    input.includes('call') ||
    input.includes('message') ||
    input.includes('linkedin') ||
    input.includes('github')
  ) {
    return {
      type: 'contact',
      actions: [
        { label: "✉️ Open Contact Form", type: "scroll", target: "#contact" },
        { label: "📄 Download Resume", type: "download", target: "/Omkar_Mali_Resume.pdf" },
        { label: "📞 Call +91 8010827376", type: "link", target: "tel:8010827376" }
      ]
    };
  }

  // Space / Alien / Spaceship / Easter eggs
  if (
    input.includes('ufo') ||
    input.includes('spaceship') ||
    input.includes('alien') ||
    input.includes('space') ||
    input.includes('galaxy') ||
    input.includes('black hole') ||
    input.includes('astra')
  ) {
    return {
      text: "🛸 **Astra Telemetry Report:**\n\nIon thrusters are operating at 100%! We are currently escorting you smoothly across Omkar's galaxy. Cursor companion active in passive telemetry mode—no interference with your controls!",
      actions: [
        { label: "🚀 Show Projects", type: "prompt", target: "Show me projects" },
        { label: "⚡ Explore Skills", type: "prompt", target: "What are your skills?" }
      ]
    };
  }

  // Jokes
  if (
    input.includes('joke') ||
    input.includes('funny') ||
    input.includes('laugh')
  ) {
    const jokes = [
      "🤖 Why did the Android developer bring a telescope to work? Because they were debugging an OutOfMemoryError in a distant galaxy!",
      "🚀 Why do programmers love space? Because in space, no one can hear your compiler warnings!",
      "⚡ There are only 10 types of people in the galaxy: those who understand binary, and those who don't!",
      "🛸 Why didn't the spaceship crash into the server? Because it was protected by Clean Architecture!"
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      actions: [
        { label: "😂 Tell another joke", type: "prompt", target: "Tell me a joke" },
        { label: "🚀 Back to Omkar's work", type: "prompt", target: "Show me projects" }
      ]
    };
  }

  // Greetings
  if (
    input.includes('hello') ||
    input.includes('hi') ||
    input.includes('hey') ||
    input.includes('sup') ||
    input.includes('howdy') ||
    input.includes('greetings')
  ) {
    return {
      text: "Hello explorer! 🚀 Systems are primed and ready. What sector of Omkar's portfolio would you like to investigate?",
      actions: [
        { label: "📄 Download Resume", type: "download", target: "/Omkar_Mali_Resume.pdf" },
        { label: "👨‍💻 About Omkar", type: "prompt", target: "Tell me about Omkar" },
        { label: "📱 Projects", type: "prompt", target: "Show me projects" },
        { label: "📬 Contact", type: "prompt", target: "Contact Omkar" }
      ]
    };
  }

  // Thank you / Bye
  if (input.includes('thank') || input.includes('thanks') || input.includes('bye')) {
    return {
      text: "You're most welcome! May your voyage across the tech cosmos be full of successful builds and zero bugs! 🌌 Safe travels!",
      actions: [
        { label: "📬 Contact Omkar", type: "scroll", target: "#contact" }
      ]
    };
  }

  // Default Fallback
  return {
    text: `📡 Transmission decoded: "${rawInput}"\n\nI can provide direct information on Omkar's **Projects**, **Technical Skills**, **Experience**, **Certifications**, or download his official resume!`,
    actions: [
      { label: "📄 Download Resume", type: "download", target: "/Omkar_Mali_Resume.pdf" },
      { label: "🚀 About Omkar", type: "prompt", target: "Tell me about Omkar" },
      { label: "⚡ Tech Stack", type: "prompt", target: "What are your skills?" },
      { label: "📱 Projects", type: "prompt", target: "Show me projects" },
      { label: "📬 Contact Omkar", type: "scroll", target: "#contact" }
    ]
  };
};

const SpaceshipChatbot = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState([initialWelcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (isOpen) {
      playSound('open', !isMutedRef.current);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    playSound('send', !isMutedRef.current);
    setIsTyping(true);

    // Realistic bot response delay
    setTimeout(() => {
      const botReply = getBotResponse(messageText);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        type: botReply.type,
        text: botReply.text,
        actions: botReply.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      playSound('message', !isMutedRef.current);
    }, 600);
  };

  const handleActionClick = (action) => {
    if (action.type === 'scroll') {
      const element = document.querySelector(action.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'link') {
      window.open(action.target, '_blank', 'noreferrer');
    } else if (action.type === 'download') {
      const link = document.createElement('a');
      link.href = action.target;
      link.download = 'Omkar_Mahadev_Mali_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.type === 'prompt') {
      handleSendMessage(action.target);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...initialWelcomeMessage,
        id: `welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    playSound('open', !isMutedRef.current);
  };

  return (
    <>
      {/* Floating Spaceship Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-[95] cursor-pointer group"
          >
            {/* Glowing cosmic ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-secondary via-tertiary to-accent opacity-75 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

            <div className="relative flex items-center gap-3 px-4 py-3 bg-primary/90 border border-secondary/50 rounded-full shadow-[0_0_25px_rgba(139,92,246,0.5)] backdrop-blur-xl text-textBase">
              <div className="relative">
                <img
                  src={spaceshipImg}
                  alt="Spaceship Bot"
                  className="w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Astra AI</span>
                <span className="text-[11px] text-textMuted font-mono">Chat with Spaceship</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[120] w-[calc(100vw-2rem)] sm:w-[440px] max-h-[85vh] h-[640px] flex flex-col rounded-3xl bg-[#0a0c16]/95 border border-secondary/40 shadow-[0_12px_60px_rgba(139,92,246,0.4)] backdrop-blur-2xl overflow-hidden font-sans"
          >
            {/* Top Futuristic Glowing Header */}
            <div className="relative px-5 py-4 border-b border-white/10 bg-gradient-to-r from-secondary/20 via-tertiary/15 to-transparent flex items-center justify-between">
              {/* Header Status & Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-black/60 border border-secondary/40 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <img
                    src={spaceshipImg}
                    alt="Spaceship"
                    className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0c16]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base text-white tracking-wide">
                      Astra <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary font-mono">AI 2.0</span>
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-green-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    SYSTEM ONLINE • SPACESHIP NAVIGATOR
                  </p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
                  className="p-2 rounded-lg text-textMuted hover:text-white hover:bg-white/5 transition-colors"
                >
                  {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                </button>
                <button
                  onClick={handleResetChat}
                  title="Clear & Restart Transmission"
                  className="p-2 rounded-lg text-textMuted hover:text-secondary hover:bg-white/5 transition-colors"
                >
                  <FaRedo size={13} />
                </button>
                <button
                  onClick={onClose}
                  title="Close Assistant"
                  className="p-2 rounded-lg text-textMuted hover:text-red-400 hover:bg-white/5 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>

            {/* Quick Action Navigation Bar */}
            <div className="px-4 py-2.5 border-b border-white/5 bg-black/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[10px] uppercase font-mono text-textMuted shrink-0 mr-1 flex items-center gap-1">
                <FaCompass size={11} className="text-secondary" /> Quick:
              </span>
              <button
                onClick={() => handleActionClick({ type: 'download', target: '/Omkar_Mali_Resume.pdf' })}
                className="shrink-0 px-2.5 py-1 rounded-full bg-secondary/20 hover:bg-secondary text-secondary hover:text-white border border-secondary/50 transition-all font-semibold flex items-center gap-1"
              >
                <FaDownload size={9} /> Resume
              </button>
              <button
                onClick={() => handleSendMessage('Tell me about Omkar')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-textMuted hover:text-white transition-all font-medium"
              >
                About
              </button>
              <button
                onClick={() => handleSendMessage('What are your skills?')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-textMuted hover:text-white transition-all font-medium"
              >
                Skills
              </button>
              <button
                onClick={() => handleSendMessage('Show me projects')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-textMuted hover:text-white transition-all font-medium"
              >
                Projects
              </button>
              <button
                onClick={() => handleSendMessage('Work experience')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-textMuted hover:text-white transition-all font-medium"
              >
                Experience
              </button>
              <button
                onClick={() => handleSendMessage('Certifications')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-textMuted hover:text-white transition-all font-medium"
              >
                Certifications
              </button>
              <button
                onClick={() => handleSendMessage('Education details')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-textMuted hover:text-white transition-all font-medium"
              >
                Education
              </button>
              <button
                onClick={() => handleSendMessage('Contact Omkar')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-secondary/20 border border-white/10 hover:border-secondary/40 text-textMuted hover:text-white transition-all font-medium"
              >
                Contact
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[94%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center shrink-0 mb-1 text-secondary">
                        <FaRobot size={12} />
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-secondary to-tertiary text-white rounded-br-none shadow-[0_4px_15px_rgba(139,92,246,0.3)] text-sm font-medium'
                          : 'bg-white/[0.06] border border-white/10 text-slate-100 rounded-bl-none shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-md w-full'
                      }`}
                    >
                      {/* Render Structured Card or Formatted Text */}
                      {msg.sender === 'user' ? (
                        <span>{msg.text}</span>
                      ) : msg.type === 'about' ? (
                        <AboutCard />
                      ) : msg.type === 'skills' ? (
                        <SkillsCard />
                      ) : msg.type === 'projects' ? (
                        <ProjectsCard />
                      ) : msg.type === 'experience' ? (
                        <ExperienceCard />
                      ) : msg.type === 'education' ? (
                        <EducationCard />
                      ) : msg.type === 'certifications' ? (
                        <CertificationsCard />
                      ) : msg.type === 'contact' ? (
                        <ContactCard />
                      ) : (
                        <FormattedMessage text={msg.text} />
                      )}

                      {/* Interactive Action Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() => handleActionClick(act)}
                              className="px-3 py-1.5 rounded-lg bg-black/50 hover:bg-secondary/30 border border-secondary/40 text-xs text-white font-medium flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(139,92,246,0.2)] hover:scale-[1.02]"
                            >
                              <span>{act.label}</span>
                              {act.type === 'link' && <FaExternalLinkAlt size={9} className="opacity-70" />}
                              {act.type === 'download' && <FaDownload size={9} className="text-secondary" />}
                              {act.type === 'scroll' && <FaCompass size={10} className="text-secondary" />}
                              {act.type === 'prompt' && <FaRocket size={9} className="text-secondary" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0 mb-1 text-accent">
                        <FaUserAstronaut size={11} />
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-textMuted/60 mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center shrink-0 text-secondary">
                    <FaRobot size={12} />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-none bg-white/[0.07] border border-white/10 flex items-center gap-1.5 text-textMuted">
                    <span className="text-xs font-mono text-secondary mr-1">Astra is transmitting</span>
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Transmission Field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Astra anything about Omkar..."
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 focus:border-secondary/60 rounded-xl text-sm text-white placeholder-textMuted/60 focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-secondary to-tertiary text-white rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-center shrink-0"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpaceshipChatbot;
