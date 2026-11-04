import { motion } from 'framer-motion';
import { BookOpen, Code, Atom, Calculator, Lightbulb, PenTool } from 'lucide-react';

export const StudyBackground = () => {
  const icons = [
    { Icon: BookOpen, delay: 0 },
    { Icon: Code, delay: 0.5 },
    { Icon: Atom, delay: 1 },
    { Icon: Calculator, delay: 1.5 },
    { Icon: Lightbulb, delay: 2 },
    { Icon: PenTool, delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Study Elements */}
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 0 
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay,
            ease: "linear"
          }}
        >
          <Icon size={40 + Math.random() * 40} />
        </motion.div>
      ))}

      {/* Animated Book Stack */}
      <motion.div
        className="absolute top-20 left-10 opacity-10"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="relative">
          <div className="w-16 h-2 bg-primary rounded-sm"></div>
          <div className="w-14 h-2 bg-accent rounded-sm mt-1 ml-1"></div>
          <div className="w-12 h-2 bg-secondary rounded-sm mt-1 ml-2"></div>
        </div>
      </motion.div>

      {/* Floating Equations */}
      <motion.div
        className="absolute top-1/3 right-20 text-4xl font-mono opacity-5"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ∫ƒ(x)dx
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 text-3xl font-mono opacity-5"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        E = mc²
      </motion.div>

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-8 h-8 border-2 border-primary/10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-accent/10 rounded-full"
        initial={{ scale: 1, opacity: 0.1 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Code Brackets */}
      <motion.div
        className="absolute top-1/4 left-1/3 text-5xl font-mono opacity-5 text-primary"
        initial={{ x: 0 }}
        animate={{ x: [0, 10, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        {"{ }"}
      </motion.div>

      {/* Binary Numbers */}
      <motion.div
        className="absolute bottom-20 right-10 font-mono text-sm opacity-5"
        initial={{ opacity: 0.05 }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div>1010110</div>
        <div>0110101</div>
        <div>1101001</div>
      </motion.div>

      {/* DNA Helix */}
      <motion.div
        className="absolute top-3/4 left-1/4 opacity-5"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="30" height="60" viewBox="0 0 30 60" className="fill-current text-primary">
          <path d="M15 0 Q25 15 15 30 Q5 45 15 60 M15 0 Q5 15 15 30 Q25 45 15 60" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </motion.div>
    </div>
  );
};
// Reviewed: academic catalog & interface consistency check (v2.0.57)
