import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const Hero = ({ data }) => {
  return (
    <section
      className="min-h-screen flex flex-col justify-center relative bg-[#f9f9fc]"
      id="home"
    >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

      {/* Bottom Wave/Curve (Simulated with a gradient for now) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>

      <div className="section-content flex flex-col-reverse md:flex-row items-center justify-between relative z-10 pt-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 pr-0 md:pr-10 mt-12 md:mt-0"
        >
          <div className="inline-flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs mb-6">
            <span className="w-8 h-[2px] bg-primary"></span>
            <span>{data?.role || "Full-Stack Developer"}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-slate-900">
            Hi, I'm <br />
            <span className="text-primary font-display">Kabir Patel</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            {data?.desc ||
              "I'm passionate about creating beautiful, functional, and user-friendly digital experiences."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_8px_20px_rgba(239,94,84,0.3)] hover:-translate-y-1 text-center"
            >
              Hire Me
            </a>
            {data?.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 text-slate-700 font-bold hover:text-primary transition-colors"
                download
              >
                <Download size={20} />
                <span>Download CV</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Content (Image or Placeholder) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-16 md:mt-0"
        >
          <div className="relative w-full max-w-[450px] flex items-end justify-center">
            {data?.profileImage ? (
              <img
                src={data.profileImage}
                alt="Profile"
                className="w-full h-auto object-cover rounded-3xl shadow-2xl drop-shadow-2xl"
                style={{ maxHeight: "500px" }}
              />
            ) : (
              <>
                {/* Simple silhouette or transparent image representation */}
                <svg
                  viewBox="0 0 400 500"
                  className="w-[80%] h-auto text-slate-200 drop-shadow-xl"
                  fill="currentColor"
                >
                  <path d="M200 50C150 50 120 90 120 150C120 210 160 250 200 250C240 250 280 210 280 150C280 90 250 50 200 50ZM100 280C50 280 10 330 10 390V500H390V390C390 330 350 280 300 280C250 280 230 320 200 320C170 320 150 280 100 280Z" />
                </svg>

                {/* Optional instructional text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50">
                  <p className="font-bold text-slate-500 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">
                    Your Photo Here
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
