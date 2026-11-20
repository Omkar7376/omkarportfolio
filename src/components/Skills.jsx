import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Kotlin', 'Java', 'Dart', 'Python', 'SQL', 'JavaScript']
    },
    {
      title: 'Android & Mobile',
      skills: ['Jetpack Compose', 'XML', 'MVVM', 'Clean Architecture', 'DataStore', 'Flutter', 'GetX', 'Android Studio']
    },
    {
      title: 'API & Dependency Injection',
      skills: ['REST APIs', 'Retrofit', 'Ktor', 'Hilt / Dagger', 'Koin']
    },
    {
      title: 'Backend & Databases',
      skills: ['Node.js', 'Express.js', 'JWT', 'MySQL', 'MongoDB', 'Firebase']
    },
    {
      title: 'Developer Tools',
      skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'MySQL Workbench', 'MongoDB Compass']
    }
  ];

  return (
    <section id="skills" className="py-4 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-12 flex items-center">
          <span className="text-secondary mr-3 md:mr-4">04.</span> Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-card p-5 md:p-7 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-textBase mb-4 border-b border-white/10 pb-2.5">{category.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-textMuted hover:text-textBase hover:border-secondary hover:bg-secondary/15 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
