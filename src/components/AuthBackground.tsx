// Visuals: ambient background gradient mesh with subtle geometric accents
// Animated background canvas for auth pages
import { motion } from 'framer-motion';
import logoImg from '@/assets/college-study-hub-logo.png';

const AuthBackground = () => {
  const leftLogos = [
    { delay: 0, y: 0 },
    { delay: 0.5, y: 100 },
    { delay: 1, y: 200 },
    { delay: 1.5, y: 300 },
  ];

  const rightLogos = [
    { delay: 0.2, y: 50 },
    { delay: 0.7, y: 150 },
    { delay: 1.2, y: 250 },
    { delay: 1.7, y: 350 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Left side logos */}
      <div className="absolute left-4 md:left-12 top-0">
        {leftLogos.map(({ delay, y }, index) => (
          <motion.div
            key={`left-${index}`}
            style={{ position: 'absolute', top: `${y}px` }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 5,
              delay,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="opacity-20"
          >
            <img src={logoImg} alt="" className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
        ))}
      </div>

      {/* Right side logos */}
      <div className="absolute right-4 md:right-12 top-0">
        {rightLogos.map(({ delay, y }, index) => (
          <motion.div
            key={`right-${index}`}
            style={{ position: 'absolute', top: `${y}px` }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, -15, 15, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 5,
              delay,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="opacity-20"
          >
            <img src={logoImg} alt="" className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-accent/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};

export default AuthBackground;
// Reviewed: academic catalog & interface consistency check (v2.0.17)
// Reviewed: academic catalog & interface consistency check (v2.1.292)
