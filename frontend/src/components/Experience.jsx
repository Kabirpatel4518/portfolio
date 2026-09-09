import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Experience = ({ experience }) => {
  return (
    <section id="experience" className="relative z-10 bg-white">
      <div className="section-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Some of my <br /> <span className="text-primary italic font-display">Experience</span>
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-1/2 max-w-4xl mx-auto space-y-12 pb-8">
          {experience?.map((exp, index) => (
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
                <Briefcase size={16} />
              </div>
              
              <div className="bg-white border border-slate-100 shadow-[0_5px_20px_-10px_rgba(0,0,0,0.05)] rounded-2xl p-6 md:p-8 hover:shadow-[0_10px_30px_-10px_rgba(239,94,84,0.15)] hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{exp.role}</h3>
                <h4 className="text-sm font-semibold tracking-wide uppercase text-slate-500 mb-6 bg-slate-50 inline-block px-3 py-1 rounded-md">{exp.company}</h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {exp.desc}
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

export default Experience;
