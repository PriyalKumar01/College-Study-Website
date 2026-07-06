import { useNavigate } from 'react-router-dom';
import { Mail, Heart, Phone, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 mt-auto w-full font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                alt="College Study Hub"
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-black text-white tracking-wider">College Study Hub</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed text-sm">
              Empowering students with hand-picked academic resources, past exam papers, active scholarship boards, off-campus placement directories, and career-building guides.
            </p>
            <div className="text-xs flex items-center gap-1.5 text-slate-500 font-medium">
              Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for the student community.
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-extrabold text-white mb-6 uppercase tracking-widest text-xs text-indigo-400">Quick Links</h3>
            <div className="space-y-3 text-sm">
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/notes")}>
                <span>Study Notes</span>
              </div>
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/opportunities")}>
                <span>Job Openings</span>
              </div>
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/scholarship-portal")}>
                <span>Scholarships</span>
              </div>
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/cgpa-calculator")}>
                <span>CGPA Calculator</span>
              </div>
            </div>
          </div>

          {/* Premium Packs Column */}
          <div>
            <h3 className="font-extrabold text-white mb-6 uppercase tracking-widest text-xs text-sky-400">Premium Packs</h3>
            <div className="space-y-3 text-sm">
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/premium-content")}>
                <span>Career Pages Directory</span>
              </div>
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/premium-content")}>
                <span>HR Contacts Directory</span>
              </div>
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/ats-friendly-resume")}>
                <span>ATS Resume Builder</span>
              </div>
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/premium-content")}>
                <span>Placement Roadmap</span>
              </div>
            </div>
          </div>

          {/* Help & Support Column */}
          <div>
            <h3 className="font-extrabold text-white mb-6 uppercase tracking-widest text-xs text-emerald-400">Support</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-355 hover:text-white transition-colors cursor-pointer font-semibold break-all" onClick={() => window.open('mailto:collegestudy.support@gmail.com')}>
                    collegestudy.support@gmail.com
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">For queries & verification support</p>
                </div>
              </div>
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5" onClick={() => handleNavigation("/about")}>
                <HelpCircle className="h-4 w-4 text-slate-400" />
                <span>About College Study Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
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
