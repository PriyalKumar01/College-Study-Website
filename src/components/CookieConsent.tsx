import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, X } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">We value your privacy</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    We use cookies to enhance your browsing experience and analyze site traffic. 
                    By clicking "Accept", you consent to our use of cookies. 
                    <a href="/privacy-policy" className="text-blue-600 hover:underline ml-1">
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button 
                  variant="outline"
                  size="sm" 
                  onClick={handleReject}
                  className="text-xs px-4 h-9 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Decline
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAccept}
                  className="text-xs px-4 h-9 bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Accept Cookies
                </Button>
              </div>

              <button
                onClick={handleReject}
                className="absolute top-3 right-3 sm:hidden text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
