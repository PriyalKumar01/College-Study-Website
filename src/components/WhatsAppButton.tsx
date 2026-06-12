import { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+918957221543';
    const message = 'Hi Priyal, I need help regarding College Study Hub.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div 
        className="relative flex items-center cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleWhatsAppClick}
      >
        {/* Text that slides out */}
        <div 
          className={`
            absolute right-20 bg-white dark:bg-gray-800 
            text-gray-800 dark:text-white px-4 py-3 rounded-full 
            shadow-lg border whitespace-nowrap font-medium
            transition-all duration-500 ease-in-out
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
          `}
        >
          Contact Us
        </div>
        
        {/* WhatsApp Button with real icon */}
        <button
          className="
            w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] 
            text-white shadow-lg flex items-center justify-center
            transition-all duration-300 hover:scale-110
            relative overflow-hidden
          "
          aria-label="Contact us on WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
            <path d="M27.6 4.37A15.86 15.86 0 0 0 16 0C7.16 0 0 7.16 0 16a15.9 15.9 0 0 0 2.14 8L0 32l8.22-2.16A15.9 15.9 0 0 0 16 32c8.84 0 16-7.16 16-16 0-4.28-1.67-8.3-4.4-11.63zM16 29.33a13.23 13.23 0 0 1-6.74-1.84l-.48-.29-5 1.31 1.33-4.87-.31-.5A13.23 13.23 0 0 1 2.67 16C2.67 8.64 8.64 2.67 16 2.67S29.33 8.64 29.33 16 23.36 29.33 16 29.33zm7.26-9.9c-.4-.2-2.36-1.16-2.72-1.3-.37-.13-.63-.2-.9.2-.26.4-1.02 1.3-1.25 1.56-.23.27-.46.3-.86.1a10.86 10.86 0 0 1-3.19-1.97 11.94 11.94 0 0 1-2.2-2.74c-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.69.2-.23.26-.4.4-.66.13-.27.06-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68-.23 0-.49-.02-.76-.02s-.69.1-1.06.5c-.36.4-1.38 1.35-1.38 3.29 0 1.94 1.41 3.82 1.61 4.08.2.27 2.78 4.24 6.73 5.94.94.4 1.67.65 2.24.83.94.3 1.8.26 2.47.16.75-.11 2.32-.95 2.65-1.87.32-.92.32-1.7.22-1.87-.1-.17-.36-.27-.76-.47z" fill="white"/>
          </svg>
          
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;
