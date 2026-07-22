import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Kotlin', 'Dart', 'Python', 'SQL', 'JavaScript']
    },
    {
      title: 'Android & Mobile',
      skills: ['Jetpack Compose', 'Flutter', 'XML', 'MVVM', 'GetX', 'Clean Architecture', 'Room', 'DataStore']
    },
    {
      title: 'Backend & Database',
      skills: ['Node.js', 'Express.js', 'JWT', 'MySQL', 'MongoDB', 'Firebase']
    },
    {
      title: 'Data Science & Tools',
      skills: ['NumPy', 'Pandas', 'Matplotlib', 'Git', 'GitHub', 'Postman', 'Retrofit', 'Dagger Hilt']
    }
  ];

  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center">
          <span className="text-secondary mr-4">03.</span> Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-card p-8">
              <h3 className="text-xl font-bold text-textBase mb-6 border-b border-black/10 pb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-lg bg-black/5 border border-black/10 text-textMuted hover:text-textBase hover:border-accent hover:bg-accent/10 transition-colors cursor-default"
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
