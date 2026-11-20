import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaDownload } from 'react-icons/fa';
import profileImg from '../assets/omkarprofile.jpeg';

const Hero = () => {
  return (
    <section id="hero" className="min-h-0 lg:min-h-[75vh] flex flex-col justify-center relative pt-8 md:pt-16 pb-2 md:pb-6">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">

        {/* Text Content - Left Side */}
        <div className="flex-1 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-secondary font-medium tracking-wider uppercase mb-2 md:mb-3 text-xs md:text-sm"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 md:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-textBase to-textMuted"
          >
            Omkar Mahadev Mali.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-textMuted mb-4 md:mb-6"
          >
            I build scalable Android & mobile apps.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-textMuted/90 max-w-2xl mb-6 md:mb-9 leading-relaxed"
          >
            Android developer with hands-on experience building mobile apps using Kotlin, Jetpack Compose, and Flutter. Experienced in implementing authentication, orders, and property management modules with MVVM, Clean Architecture, REST APIs (Retrofit), Hilt, Firebase, and backend development with Node.js and Express.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 md:gap-4"
          >
            {/* Primary Action: Get In Touch */}
            <a
              href="#contact"
              className="px-6 py-3 bg-secondary text-white font-medium text-sm md:text-base rounded-xl hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(251,86,7,0.35)]"
            >
              Get In Touch
            </a>

            {/* Direct Resume Download Button */}
            <a
              href="/Omkar_Mali_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              download="Omkar_Mahadev_Mali_Resume.pdf"
              className="px-6 py-3 glass rounded-xl text-textBase hover:text-secondary hover:border-secondary/60 transition-all font-medium text-sm md:text-base flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              <FaDownload size={13} className="text-secondary" />
              <span>Download Resume</span>
            </a>

            {/* Social & Contact Icons */}
            <div className="flex space-x-2.5 sm:space-x-3 mt-1 sm:mt-0">
              <a
                href="https://github.com/Omkar7376"
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                className="p-2.5 md:p-3 glass rounded-full text-textBase hover:text-secondary hover:-translate-y-1 transition-all"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/omkar-mali5501"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="p-2.5 md:p-3 glass rounded-full text-textBase hover:text-accent hover:-translate-y-1 transition-all"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:omkarmali2326@gmail.com"
                title="Email Omkar"
                className="p-2.5 md:p-3 glass rounded-full text-textBase hover:text-tertiary hover:-translate-y-1 transition-all"
              >
                <FaEnvelope size={18} />
              </a>
              <a
                href="tel:8010827376"
                title="Call: +91 8010827376"
                className="p-2.5 md:p-3 glass rounded-full text-textBase hover:text-green-400 hover:-translate-y-1 transition-all"
              >
                <FaPhoneAlt size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Profile Image - Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto mt-4 lg:mt-0"
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
              className="absolute inset-[-8px] rounded-full border-2 border-dashed border-secondary/50 group-hover:border-secondary transition-colors duration-500"
            />

            {/* Main Image Container */}
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 2
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-4 border-primary shadow-2xl z-10"
            >
              <img
                src={profileImg}
                alt="Omkar Mali"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                style={{ objectPosition: "center top" }}
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
