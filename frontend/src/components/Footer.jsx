import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ data }) => {
  return (
    <footer className="bg-navy py-12 border-t-0 mt-0 w-full">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 border-b border-slate-800 pb-12 mb-8 text-center md:text-left">
          {/* Column 1: Profile & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-4">
              {data?.about?.profileImage && (
                <img
                  src={data.about.profileImage}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shadow-[0_0_15px_rgba(239,94,84,0.2)]"
                />
              )}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white tracking-widest uppercase">
                  {data?.about?.name || "PORTFOLIO"}
                </span>
              </div>
            </div>

            {data?.about?.objective && (
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {data.about.objective}
              </p>
            )}

            <h4 className="text-white font-bold mb-3">Get in Touch</h4>
            <a
              href="mailto:kabirpatel2882004@gmail.com"
              className="text-primary hover:text-white transition-colors mb-2 block font-medium"
            >
              kabirpatel2882004@gmail.com
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Skills", href: "/skills" },
                { name: "Projects", href: "/projects" },
                { name: "Experience", href: "/experience" },
                { name: "Contact", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  <Link
                    to={link.href}
                    className="text-slate-400 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hobbies */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6 text-lg">
              Hobbies & Interests
            </h4>
            {data?.about?.hobbies && data.about.hobbies.length > 0 && (
              <ul className="space-y-3">
                {data.about.hobbies.map((hobby, index) => (
                  <li
                    key={index}
                    className="text-slate-400 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {hobby}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 3: Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6 text-lg">Social Links</h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all"
              >
                <i className="fas fa-globe"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
