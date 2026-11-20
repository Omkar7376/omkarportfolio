import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import spaceshipImg from '../assets/spaceship.png';

const UfoCursor = () => {
  const [target, setTarget] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200,
    y: 150
  });
  const [rotation, setRotation] = useState(0);
  const lastPosRef = useRef({ x: 200, y: 150 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const dx = e.clientX - lastPosRef.current.x;
      // Calculate realistic bank / tilt based on horizontal movement
      const tilt = Math.max(-20, Math.min(20, dx * 1.5));
      setRotation(tilt);

      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // Keep spaceship bounded inside visible screen
      const safeX = Math.min(Math.max(10, e.clientX), window.innerWidth - 65);
      const safeY = Math.min(Math.max(10, e.clientY), window.innerHeight - 65);

      setTarget({ x: safeX, y: safeY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    // pointer-events-none ensures it NEVER blocks clicks on links, navbar, or buttons
    <motion.div
      className="fixed z-[90] pointer-events-none select-none"
      animate={{
        // Smoothly trail cursor offset by 28px so it never obscures the pointer
        x: target.x + 28,
        y: target.y + 24,
        rotate: rotation
      }}
      transition={{
        type: 'spring',
        damping: 22,
        stiffness: 100,
        mass: 0.6
      }}
      style={{ left: 0, top: 0 }}
    >
      <div className="relative pointer-events-none flex flex-col items-center">
        {/* Spaceship Image with engine glow */}
        <motion.div
          animate={{
            y: [0, -3, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut'
          }}
          className="relative pointer-events-none"
        >
          {/* Subtle cosmic energy halo */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-secondary/40 via-tertiary/30 to-accent/20 blur-md pointer-events-none" />

          <img
            src={spaceshipImg}
            alt="Spaceship Cursor Companion"
            className="w-14 h-14 object-contain relative z-10 filter drop-shadow-[0_6px_15px_rgba(139,92,246,0.7)] pointer-events-none"
            draggable="false"
          />

          {/* Engine Propulsion Thruster Flame */}
          <motion.div
            animate={{
              scaleY: [0.8, 1.3, 0.8],
              opacity: [0.6, 0.95, 0.6]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.35,
              ease: 'easeInOut'
            }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-4 bg-gradient-to-b from-cyan-300 via-secondary to-transparent rounded-full blur-[1px] pointer-events-none"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UfoCursor;
