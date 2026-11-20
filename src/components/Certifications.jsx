import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaAward } from 'react-icons/fa';

const Certifications = () => {
  const certs = [
    {
      title: 'Postman API Fundamentals Student Expert',
      issuer: 'Postman',
      tag: 'API Integration & Testing'
    },
    {
      title: 'IBM Python for Data Science',
      issuer: 'IBM',
      tag: 'Python & Data Analysis'
    },
    {
      title: 'IBM SQL and Relational Databases',
      issuer: 'IBM',
      tag: 'Databases & Query Optimization'
    }
  ];

  return (
    <section id="certifications" className="py-4 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-12 flex items-center">
          <span className="text-secondary mr-3 md:mr-4">05.</span> Certifications & Activities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
          {certs.map((cert, index) => (
            <div
              key={index}
              className="glass-card p-5 md:p-6 border-t-2 border-t-secondary hover:-translate-y-1 transition-transform flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary flex items-center justify-center mb-3">
                  <FaCertificate size={16} />
                </div>
                <h3 className="font-bold text-white text-sm md:text-base mb-1.5 leading-snug">{cert.title}</h3>
                <p className="text-xs text-textMuted font-mono mb-3">{cert.issuer}</p>
              </div>
              <span className="text-[10px] md:text-[11px] font-mono text-tertiary bg-tertiary/10 px-2.5 py-0.5 rounded-md inline-block self-start">
                {cert.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Extracurricular Activities */}
        <div className="glass-card p-5 md:p-8 flex items-center gap-4 border-l-4 border-l-accent">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent/20 border border-accent/40 text-accent flex items-center justify-center shrink-0">
            <FaAward size={20} />
          </div>
          <div>
            <span className="text-[11px] uppercase font-mono text-accent font-semibold tracking-wider block mb-0.5">
              Leadership & Activities
            </span>
            <h4 className="text-base md:text-lg font-bold text-white mb-0.5">
              Event Coordinator – WebSoftera Hackathon
            </h4>
            <p className="text-xs md:text-sm text-textMuted leading-relaxed">
              Organized and coordinated the WebSoftera Hackathon, driving developer engagement, managing logistics, and facilitating project reviews.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
