import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'Cylinder-Selling-Android',
      stack: ['Kotlin', 'Android Studio', 'XML', 'Dagger Hilt', 'Rest API Integration'],
      description: 'Designed and implemented a role-based Android application to manage cylinder bookings, order tracking. Integrated REST APIs using Retrofit and structured the app using MVVM architecture.',
      github: '#',
    },
    {
      title: 'StitchUp – Tailor Management App',
      stack: ['Kotlin', 'Jetpack Compose', 'Hilt/Dagger', 'DataStore', 'MVVM'],
      description: 'Created an Android app to manage customer measurements, orders, and delivery tracking. Integrated backend APIs and maintained clean architecture using MVVM and Hilt.',
      github: 'https://github.com/Omkar7376/stitchup-tailorAndroid.git',
    },
    {
      title: 'VoltRoute – Ev Charging Stations',
      stack: ['Dart', 'Flutter', 'GetX', 'Rest API', 'Node.js', 'MongoDB'],
      description: 'Developed VoltRoute, an EV charging station app that helps users find nearby stations and book charging slots easily. Built backend and management features for vendors and admins.',
      github: 'https://github.com/Omkar7376/voltRoute.git',
    },
    {
      title: 'Warna Farmer App – Animal Management',
      stack: ['Dart', 'Flutter', 'GetX', 'Firebase', 'Node.js'],
      description: 'Developed an agricultural app for farmers to easily track livestock counts and monitor financial summaries. Built a secure Firebase backend to manage user authentication and real-time syncing.',
      github: '#',
    }
  ];

  return (
    <section id="projects" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center">
          <span className="text-secondary mr-4">02.</span> Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="glass-card p-8 flex flex-col relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-textBase group-hover:text-secondary transition-colors">{project.title}</h3>
                <div className="flex space-x-4">
                  {project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-textMuted hover:text-textBase transition-colors">
                      <FaGithub size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-textMuted mb-8 flex-grow">{project.description}</p>
              
              <ul className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech, i) => (
                  <li key={i} className="text-xs font-mono text-tertiary bg-tertiary/10 px-3 py-1 rounded-full">
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
