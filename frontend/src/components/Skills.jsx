import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDeviconClass } from "../utils/iconHelper";

const Skills = ({ skills }) => {
  const [activeTab, setActiveTab] = useState("All");

  // Get unique categories for tabs
  const categories = [
    "All",
    ...new Set(skills?.map((skill) => skill.category) || []),
  ];

  // Filter skills based on active tab
  const filteredSkills =
    activeTab === "All"
      ? skills
      : skills?.filter((skill) => skill.category === activeTab);

  return (
    <section id="skills" className="relative z-10 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="section-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              <span className="text-primary italic font-display">Skills</span>
            </h2>
            <div className="w-16 h-[4px] bg-primary mx-auto rounded-full"></div>

            <div className="flex flex-wrap justify-center gap-4 mt-6 md:mt-8">
              {categories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredSkills?.map((skill, index) => (
                <motion.div
                  key={skill.category + index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  layout
                  className="bg-white p-8 flex flex-col items-start group rounded-2xl border border-slate-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 relative"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors duration-300">
                    {skill.category}
                  </h3>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 w-full">
                    {skill.tags.map((tag, i) => {
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
