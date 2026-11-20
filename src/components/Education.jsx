import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  const educations = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Tatyasaheb Kore Institute of Engineering and Technology, Warananagar',
      period: '2025 - 2027 (Pursuing)',
      score: 'FY CGPA – 8.34/10'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'D. Y. Patil College of Engineering and Technology, Talsande',
      period: '2022 - 2025',
      score: 'CGPA - 8.18/10'
    }
  ];

  return (
    <section id="education" className="py-4 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-12 flex items-center">
          <span className="text-secondary mr-3 md:mr-4">02.</span> Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {educations.map((edu, index) => (
            <div key={index} className="glass-card p-5 md:p-8 border-t-4 border-t-tertiary">
              <h3 className="text-lg md:text-xl font-bold text-textBase mb-1.5">{edu.degree}</h3>
              <h4 className="text-sm md:text-lg text-textMuted mb-3">{edu.institution}</h4>
              <div className="flex justify-between items-center text-xs md:text-sm font-mono text-tertiary bg-tertiary/10 px-3.5 py-2 rounded-lg inline-flex w-full">
                <span>{edu.period}</span>
                <span className="font-bold">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
