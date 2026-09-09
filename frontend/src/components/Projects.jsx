import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code, Folder } from "lucide-react";
import { getDeviconClass } from "../utils/iconHelper";

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="relative z-10 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 100% 50%, transparent 20%, #000 21%, #000 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, #000 21%, #000 34%, transparent 35%, transparent)', backgroundSize: '60px 60px' }}></div>
      <div className="section-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              <span className="text-primary italic font-display">Projects</span>
            </h2>
            <div className="w-16 h-[4px] bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full group hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-base mb-8 flex-grow leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100">
                    {project.tags.map((tag, i) => {
                      const iconClass = getDeviconClass(tag);
                      return (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-md bg-slate-50 text-slate-700 border border-slate-200 group-hover:border-primary/20 transition-colors"
                        >
                          {iconClass && (
                            <i className={`${iconClass} text-base`}></i>
                          )}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
