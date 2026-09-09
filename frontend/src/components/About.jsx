import React from "react";
import { motion } from "framer-motion";
import { Terminal, Users, CheckCircle } from "lucide-react";
import { getDeviconClass } from "../utils/iconHelper";

const About = ({ data, stats }) => {
  const statCards = [
    {
      icon: <Terminal size={32} />,
      value: stats?.experience || "1+",
      label: "Years Experience",
    },
    {
      icon: <CheckCircle size={32} />,
      value: stats?.projects || "25+",
      label: "Projects Delivered",
    },
    {
      icon: <Users size={32} />,
      value: stats?.clients || "15+",
      label: "Happy Clients",
    },
  ];

  return (
    <section id="about" className="relative z-10 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}></div>
      <div className="section-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              <span className="text-primary italic font-display">About</span>
            </h2>
            <div className="w-16 h-[4px] bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Heading and Objective */}
            <div>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 font-medium">
                {data?.objective}
              </p>

              <div className="flex flex-col sm:flex-row gap-8 mt-10">
                {data?.languages && (
                  <div className="flex-1">
                    <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                      Languages & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.languages.map((lang, idx) => {
                        const iconClass = getDeviconClass(lang);
                        return (
                          <span
                            key={idx}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-slate-200 text-slate-700 rounded-full font-semibold shadow-sm hover:shadow-md hover:border-primary/40 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
                          >
                            {iconClass && (
                              <i className={`${iconClass} text-lg`}></i>
                            )}
                            {lang}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {data?.hobbies && (
                  <div className="flex-1">
                    <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                      Hobbies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.hobbies.map((hobby, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 text-sm bg-white border border-slate-200 text-slate-700 rounded-full font-semibold shadow-sm hover:shadow-md hover:border-primary/40 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Stats or secondary info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {statCards.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 group hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="mb-6 p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {stat.icon}
                  </div>
                  <h4 className="text-4xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
