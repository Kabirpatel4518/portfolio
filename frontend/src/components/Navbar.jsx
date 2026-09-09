import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
  ];

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          {data?.about?.profileImage ? (
            <img
              src={data.about.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/30 shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            </div>
          )}
          <Link
            to="/"
            className="text-2xl font-display font-bold text-primary tracking-tight uppercase"
          >
            {data?.about?.name || "PORTFOLIO"}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 ${isActive ? "text-primary" : "text-slate-700 hover:text-primary"}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="px-6 py-3 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-md transition-all shadow-[0_4px_14px_rgba(239,94,84,0.39)] hover:shadow-[0_6px_20px_rgba(239,94,84,0.39)] hover:-translate-y-0.5"
          >
            Contact Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-700 hover:text-primary transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Side Drawer) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 flex flex-col md:hidden rounded-l-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xl font-display font-bold text-slate-900 tracking-tight">
                  MENU
                </span>
                <button
                  className="p-2 text-slate-500 hover:text-primary hover:bg-red-50 rounded-full transition-all"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Links */}
              <motion.div
                className="flex flex-col p-6 space-y-2 overflow-y-auto"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                  },
                }}
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          },
                        },
                      }}
                    >
                      <Link
                        to={link.href}
                        className={`text-lg font-semibold tracking-wide transition-all flex items-center p-3 rounded-xl ${isActive ? "text-primary bg-primary/5 translate-x-2" : "text-slate-700 hover:text-primary hover:bg-slate-50 hover:translate-x-2"}`}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-primary mr-3 shadow-[0_0_8px_rgba(239,94,84,0.6)]"></span>
                        )}
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  className="pt-6 mt-4 border-t border-slate-100"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                        delay: 0.3,
                      },
                    },
                  }}
                >
                  <Link
                    to="/contact"
                    className="flex justify-center items-center w-full py-4 text-sm font-bold bg-primary text-white rounded-xl shadow-[0_4px_14px_rgba(239,94,84,0.39)] hover:shadow-[0_6px_20px_rgba(239,94,84,0.39)] hover:-translate-y-0.5 transition-all active:scale-95"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Contact Me
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
