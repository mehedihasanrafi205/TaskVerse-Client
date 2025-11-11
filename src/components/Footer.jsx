import { Link } from "react-router";
import { Facebook, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-gray-300 pt-16 pb-8 overflow-hidden border-t border-secondary/50">
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className=" px-6 relative z-10">
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 container mx-auto">
          
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="TaskVerse Logo" className="w-10" />
              <h1 className="text-3xl font-bold ">
                Task<span className="text-secondary">Verse</span>
              </h1>
            </Link>
            <p className="text-sm opacity-80 max-w-xs leading-relaxed">
              Manage, share, and complete your freelance tasks faster — a
              community-driven task hub for modern professionals.
            </p>
          </div>

         
          <div>
            <h2 className="text-lg font-semibold text-secondary mb-3">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-secondary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-jobs"
                  className="hover:text-secondary transition"
                >
                  All Jobs
                </Link>
              </li>
              <li>
                <Link to="/add-job" className="hover:text-secondary transition">
                  Add Job
                </Link>
              </li>
              <li>
                <Link
                  to="/accepted-tasks"
                  className="hover:text-secondary transition"
                >
                  My Tasks
                </Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h2 className="text-lg font-semibold text-secondary mb-3">
              Company
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-secondary transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-secondary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-secondary transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h2 className="text-lg font-semibold text-secondary mb-3">
              Contact Us
            </h2>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-secondary" />{" "}
                support@taskverse.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-secondary" /> Dhaka,
                Bangladesh
              </li>
            </ul>

           
            <div className="flex gap-4 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-all duration-300"
              >
                <Facebook size={18} className="text-secondary" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-all duration-300"
              >
                <Github size={18} className="text-secondary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-all duration-300"
              >
                <Linkedin size={18} className="text-secondary" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-all duration-300"
              >
                <FaXTwitter size={18} className="text-secondary" />
              </a>
            </div>
          </div>
        </div>

        
        <div className="divider before:bg-secondary/30 after:bg-secondary/30 my-8"></div>

     
        <div className="text-center text-sm text-gray-300 opacity-70">
          © {new Date().getFullYear()}{" "}
          <span className="text-secondary font-semibold">TaskVerse</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
