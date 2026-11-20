import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'Warna Farmer App – Animal Management and Revenue Tracker',
      stack: ['Dart', 'Flutter', 'GetX', 'REST APIs', 'Node.js', 'Express.js', 'Firebase'],
      description: 'Built a production-level agricultural app to help farmers keep track of their animals and income. Implemented user authentication, animal management, live revenue summaries, real-time database syncing with Firebase, and multi-language support.',
      github: '#',
    },
    {
      title: 'VoltRoute – EV Charging Stations',
      stack: ['Dart', 'Flutter', 'GetX', 'REST APIs', 'MongoDB', 'Node.js', 'Express.js', 'Mongoose'],
      description: 'Developed an EV charging station app where users locate nearby stations and book charging slots seamlessly. Built full-featured backend modules for vendors and admins to manage station slots and reservations.',
      github: 'https://github.com/Omkar7376/voltRoute.git',
    },
    {
      title: 'StitchUp – Tailor Management App',
      stack: ['Kotlin', 'Jetpack Compose', 'Dagger Hilt', 'REST APIs', 'DataStore', 'MVVM'],
      description: 'Engineered an Android app with modern Jetpack Compose for managing customer measurements, tailoring orders, and delivery schedules. Integrated backend APIs using MVVM architecture, Dagger Hilt dependency injection, and DataStore.',
      github: 'https://github.com/Omkar7376/stitchup-tailorAndroid.git',
    },
    {
      title: 'StitchUp – Tailor App Backend',
      stack: ['JavaScript', 'Node.js', 'Express.js', 'JWT Authentication', 'REST APIs'],
      description: 'Created secure backend REST APIs for managing tailor shop operations, customer measurements, and orders. Implemented JWT authentication, database schemas, and thoroughly tested API endpoints with Postman.',
      github: 'https://github.com/Omkar7376/stitchup-tailorApp.git',
    },
    {
      title: 'Cylinder-Selling-Android',
      stack: ['Kotlin', 'Android Studio', 'XML', 'Dagger Hilt', 'Retrofit', 'REST APIs', 'Postman', 'MVVM'],
      description: 'Developed a role-based Android application to manage cylinder bookings, inventory, and order tracking. Connected the app with REST APIs using Retrofit, Dagger Hilt, and structured with MVVM clean architecture.',
      github: '#',
    }
  ];

  return (
    <section id="projects" className="py-4 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-12 flex items-center">
          <span className="text-secondary mr-3 md:mr-4">03.</span> Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="glass-card p-5 md:p-8 flex flex-col relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              <div className="flex justify-between items-start mb-3 md:mb-5">
                <h3 className="text-lg md:text-2xl font-bold text-textBase group-hover:text-secondary transition-colors pr-3">
                  {project.title}
                </h3>
                <div className="flex space-x-3 shrink-0">
                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      title="View GitHub Repository"
                      className="p-2 rounded-full glass hover:text-secondary transition-colors"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-textMuted mb-4 md:mb-6 flex-grow leading-relaxed text-xs md:text-sm">
                {project.description}
              </p>

              <ul className="flex flex-wrap gap-1.5 md:gap-2 mt-auto pt-3 border-t border-white/5">
                {project.stack.map((tech, i) => (
                  <li key={i} className="text-[11px] md:text-xs font-mono text-tertiary bg-tertiary/10 px-2.5 py-0.5 rounded-full">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
