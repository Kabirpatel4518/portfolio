import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Education = ({ education }) => {
  return (
    <section
      id="education"
      className="relative z-10 bg-slate-50 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 19px, #000 19px, #000 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #000 19px, #000 20px)",
        }}
      ></div>
      <div className="section-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              <span className="text-primary italic font-display">
                Education
              </span>
            </h2>
            <div className="w-16 h-[4px] bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 w-full mx-auto space-y-12 pb-8">
            {education?.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Line Highlight */}
                <div className="absolute top-0 left-[-2px] w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-700"></div>

                {/* Timeline Dot */}
                <div className="absolute -left-[19px] top-1 p-2 rounded-full bg-white border-2 border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  <GraduationCap size={16} />
                </div>

                <div className="bg-white border border-slate-100 shadow-[0_5px_20px_-10px_rgba(0,0,0,0.05)] rounded-2xl p-6 md:p-8 hover:shadow-[0_10px_30px_-10px_rgba(239,94,84,0.15)] hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <h4 className="text-sm font-semibold tracking-wide uppercase text-slate-500 mb-6 bg-slate-50 inline-block px-3 py-1 rounded-md">
                    {edu.institution}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {edu.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
