import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import spaceshipImg from '../assets/spaceship.png';

const UfoCursor = () => {
  const [target, setTarget] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: 100 });

  useEffect(() => {
    const handleClick = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <motion.div
      className="fixed z-[100] pointer-events-none"
      animate={{ x: target.x - 30, y: target.y - 30 }}
      transition={{ type: "spring", damping: 10, stiffness: 40 }}
      style={{ left: 0, top: 0 }}
    >
      <img
        src={spaceshipImg}
        alt="Spaceship cursor"
        className="w-16 h-16 object-contain filter drop-shadow-[0_10px_15px_rgba(139,92,246,0.6)]"
      />
    </motion.div>
  );
};

export default UfoCursor;
