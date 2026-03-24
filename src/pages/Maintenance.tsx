import React, { useState, useEffect } from "react";
import { RefreshCw, Bell, ServerCog, Activity, ShieldAlert, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Maintenance = () => {
  const { toast } = useToast();
  // 10 minutes count down in seconds
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.reload();
      return;
    }

    const timerInt = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInt);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleNotifyMe = () => {
    toast({
      title: "Notification Set",
      description: "We'll notify you when the site is back up. Sit tight!",
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Particles generator
  const particles = Array.from({ length: 25 });

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#050510] text-slate-50 relative overflow-hidden px-4 md:px-8 font-sans selection:bg-purple-500/30">
      
      {/* --- Abstract Background Elements --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2], rotate: [0, -90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[100px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-4xl border-[1px] border-slate-800/20 rounded-full opacity-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-4xl max-h-4xl border-[1px] border-slate-700/10 rounded-full opacity-30" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* --- Main Content Container (2-Column on LG) --- */}
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 relative">
        
        {/* Left Side: Animated Orbits & Icon Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-[320px] lg:h-[320px] relative flex items-center justify-center mt-2 lg:mt-0"
        >
          {/* Orbit 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-purple-500/30 border-t-purple-400 border-b-transparent shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          />
          {/* Orbit 2 */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-5 lg:inset-8 rounded-full border border-blue-500/30 border-l-blue-400 border-r-transparent"
          />
          {/* Pulse Glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-10 lg:inset-16 rounded-full bg-gradient-to-tr from-purple-600/30 to-blue-600/30 blur-2xl lg:blur-3xl"
          />
          
          <div className="relative z-10 bg-slate-900/50 backdrop-blur-md border border-slate-700/80 p-5 lg:p-7 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <ServerCog className="w-12 h-12 lg:w-16 lg:h-16 text-slate-100" strokeWidth={1} />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1 bg-[#050510] rounded-full p-1 lg:p-1.5"
            >
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500/90" />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Text & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md lg:max-w-lg w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 lg:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] lg:text-xs font-semibold mb-3 lg:mb-4 backdrop-blur-md shadow-sm">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            System Optimization in Progress
          </div>
          
          {/* pb-2 prevents the 'g' from being cut off by bg-clip-text bounding box */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 pb-2 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
              We're upgrading
            </span>
          </h1>
          
          <p className="text-sm lg:text-base text-slate-400 leading-relaxed mb-5 lg:mb-6 max-w-sm mx-auto lg:mx-0">
            Our engineers are supercharging the experience. We'll be back online in just a few minutes. Thanks!
          </p>

          {/* Glassmorphic Countdown Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full relative group mb-6 lg:mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur" />
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl p-5 lg:p-6 transition-colors">
              
              <p className="text-[9px] lg:text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-3">
                Estimated Downtime
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-4xl lg:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-400 drop-shadow-sm leading-none pb-1">
                    {formatTime(timeLeft).split(':')[0]}
                  </span>
                  <span className="text-[9px] lg:text-[10px] text-slate-500 mt-1 uppercase font-semibold">Min</span>
                </div>
                <span className="text-3xl lg:text-4xl text-slate-600 font-thin mb-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-4xl lg:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-400 drop-shadow-sm leading-none pb-1">
                    {formatTime(timeLeft).split(':')[1]}
                  </span>
                  <span className="text-[9px] lg:text-[10px] text-slate-500 mt-1 uppercase font-semibold">Sec</span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent lg:from-slate-700/80 via-slate-700 to-transparent my-4 opacity-60" />

              <div className="flex items-center justify-center lg:justify-start gap-2 text-[11px] lg:text-xs text-slate-400 font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80" />
                <span>Checking database connection...</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-800/80 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10 * 60, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-row items-center gap-3 w-full justify-center lg:justify-start"
          >
            <Button
              onClick={handleRetry}
              className="flex-1 sm:flex-none h-10 px-5 bg-slate-100 hover:bg-white text-slate-900 shadow-xl shadow-white/5 font-semibold transition-all group rounded-full text-[13px] lg:text-sm"
            >
              <RefreshCw className="mr-2 h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
              Check Status
            </Button>
            <Button
              onClick={handleNotifyMe}
              variant="outline"
              className="flex-1 sm:flex-none h-10 px-5 border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold rounded-full bg-transparent backdrop-blur-sm text-[13px] lg:text-sm"
            >
              <Bell className="mr-2 h-3.5 w-3.5 text-purple-400" />
              Notify Me
            </Button>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};

export default Maintenance;
