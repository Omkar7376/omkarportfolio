import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: 'Software Developer Intern',
      company: 'FasCave IT Solutions PVT',
      period: '01/2025 - 06/2025',
      description: 'Contributed to the implementation of two production-level Android applications using Kotlin and MVVM architecture. Built authentication, order management, and property modules while integrating APIs using Retrofit. Used Dagger Hilt for dependency injection and tested APIs with Postman.'
    },
    {
      role: 'Software Developer Intern',
      company: 'Warana University',
      period: '01/2026 - Present',
      description: 'Contributed to the development of a production-level agricultural management application using Flutter and GetX. Built user authentication, dashboard summaries, and animal tracking modules by integrating Firebase services. Configured Firebase for secure backend operations and real-time database syncing.'
    }
  ];

  return (
    <section id="experience" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center">
          <span className="text-secondary mr-4">01.</span> Experience
        </h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-black/20 before:to-transparent">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-primary bg-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(250,86,7,0.5)] z-10"></div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 hover:-translate-y-1 transition-transform">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-bold text-textBase">{exp.role}</h3>
                  <span className="text-secondary font-mono text-sm">{exp.period}</span>
                </div>
                <h4 className="text-lg text-tertiary mb-4 font-medium">{exp.company}</h4>
                <p className="text-textMuted leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
