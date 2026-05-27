import { useNavigate } from 'react-router-dom';
import { Mail, Heart } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-16 text-gray-400 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                alt="College Study Hub"
                className="h-10 w-auto"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-bold text-white tracking-wide">College Study Hub</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed text-sm">
              Empowering students with comprehensive academic resources, global opportunities, and career development tools.
            </p>
            <div className="text-xs flex items-center gap-1.5">
              Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for the student community.
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
            <div className="space-y-3 text-sm">
              <div className="hover:text-primary hover:underline cursor-pointer transition-colors" onClick={() => handleNavigation("/notes")}>Notes</div>
              <div className="hover:text-primary hover:underline cursor-pointer transition-colors" onClick={() => handleNavigation("/opportunities")}>Opportunities</div>
              <div className="hover:text-primary hover:underline cursor-pointer transition-colors" onClick={() => handleNavigation("/cgpa-calculator")}>CGPA Calculator</div>
              <div className="hover:text-primary hover:underline cursor-pointer transition-colors" onClick={() => handleNavigation("/about")}>About Us</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-gray-800 p-1.5 rounded">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white hover:text-primary transition-colors cursor-pointer" onClick={() => window.open('mailto:priyalkumar06@gmail.com')}>
                    priyalkumar06@gmail.com
                  </p>
                  <p className="text-xs text-gray-500 mt-1">For support & inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} College Study Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white hover:underline cursor-pointer transition-colors" onClick={() => handleNavigation("/privacy")}>Privacy Policy</span>
            <span className="hover:text-white hover:underline cursor-pointer transition-colors" onClick={() => handleNavigation("/terms")}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
