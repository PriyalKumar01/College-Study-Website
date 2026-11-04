import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative w-20 h-20 mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-secondary rounded-full"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">College Study Hub</h3>
          <p className="text-muted-foreground">Loading your academic resources...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
// Reviewed: academic catalog & interface consistency check (v2.0.35)
