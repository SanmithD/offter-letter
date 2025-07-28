import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-4 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/offerLogo.png" 
                alt="OfferLetter Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold">OfferLetter</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md md:text-[20px] ">
              Your trusted platform for finding the perfect job opportunities. 
              Connect with top employers and take the next step in your career journey.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/jobs" 
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a 
                  href="/profile" 
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                >
                  Profile
                </a>
              </li>
              <li>
                <a 
                  href="/notification" 
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                >
                  Notifications
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/help" 
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            <div className="text-sm text-gray-600">
              © 2025 OfferLetter. All rights reserved.
            </div>

            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/sanmith-devadiga-227983291/" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200" target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              
              <a 
                href="https://x.com/Sanmith82255043" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200" target="_blank"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              
              <a 
                href="https://www.facebook.com/sanmith.devadiga" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200" target="_blank"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              
              <a 
                href="https://www.instagram.com/sanmith_04/" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200" target="_blank"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              
              <a 
                href="https://github.com/SanmithD" 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200" target="_blank"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
