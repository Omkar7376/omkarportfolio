import React from 'react';

const BlackHole = () => {
  return (
    <div className="fixed top-[20%] left-[20%] md:top-[30%] md:left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none opacity-80 z-[-1]">
      {/* Black Hole Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] md:w-[200px] md:h-[200px] bg-black rounded-full shadow-[0_0_80px_30px_rgba(139,92,246,0.7)] z-10"></div>
      
      {/* Accretion Disk */}
      <div className="absolute top-0 left-0 w-full h-full border-[10px] md:border-[20px] border-transparent border-t-secondary border-b-tertiary rounded-full animate-[spin_4s_linear_infinite] opacity-60 mix-blend-screen shadow-[0_0_50px_15px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border-[5px] md:border-[10px] border-transparent border-r-accent border-l-secondary rounded-full animate-[spin_3s_linear_infinite_reverse] opacity-80 mix-blend-screen shadow-[0_0_30px_10px_rgba(244,114,182,0.5)]"></div>
      
      {/* Outer Glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-tr from-secondary via-transparent to-tertiary rounded-full opacity-20 blur-[60px] animate-[pulse_4s_ease-in-out_infinite]"></div>
    </div>
  );
};

export default BlackHole;
