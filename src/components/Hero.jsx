import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import profileImg from '../assets/omkarprofile.jpeg';

const Hero = () => {
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col justify-center relative pt-20 pb-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

        {/* Text Content - Left Side */}
        <div className="flex-1 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-secondary font-medium tracking-wider uppercase mb-4"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-textBase to-textMuted"
          >
            Omkar Mahadev Mali.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-textMuted mb-6"
          >
            I build high-performance Android apps.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-textMuted/80 max-w-2xl mb-10 leading-relaxed"
          >
            Android Developer with hands-on experience building scalable mobile applications using Kotlin, Jetpack Compose, MVVM, Clean Architecture, and REST API integration. Passionate about building user-focused applications and modern web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center space-x-6"
          >
            <a href="#contact" className="px-8 py-4 bg-secondary text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(251,86,7,0.3)]">
              Get In Touch
            </a>

            <div className="flex space-x-4">
              <a href="https://github.com/Omkar7376" target="_blank" rel="noreferrer" className="p-3 glass rounded-full text-textBase hover:text-secondary hover:-translate-y-1 transition-all">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/omkar-mali5501" target="_blank" rel="noreferrer" className="p-3 glass rounded-full text-textBase hover:text-accent hover:-translate-y-1 transition-all">
                <FaLinkedin size={24} />
              </a>
              <a href="mailto:omkarmali2326@gmail.com" className="p-3 glass rounded-full text-textBase hover:text-tertiary hover:-translate-y-1 transition-all">
                <FaEnvelope size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Profile Image - Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto mt-10 lg:mt-0"
        >
          <div className="relative group cursor-pointer">
            {/* Animated glowing backdrop circles */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary via-tertiary to-accent opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [360, 270, 180, 90, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-[-10px] rounded-full border-2 border-dashed border-secondary/50 group-hover:border-secondary transition-colors duration-500"
            />

            {/* Main Image Container */}
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 2
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-primary shadow-2xl z-10"
            >
              <img
                src={profileImg}
                alt="Omkar Mali"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                style={{ objectPosition: "center top" }} // Adjust this if the face gets cut off
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
