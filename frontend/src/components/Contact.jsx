import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import axios from "axios";
import { API_URL } from "../config";

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle', 'sending', 'success', 'error'
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setValidationError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strict Validation
    if (!formData.name.trim())
      return setValidationError("Please enter your name.");
    if (!formData.email.trim())
      return setValidationError("Please enter your email.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return setValidationError("Please enter a valid email address.");
    if (formData.message.trim().length < 10)
      return setValidationError(
        "Message is too short. Please write at least 10 characters.",
      );

    setStatus("sending");

    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      if (response.data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative z-10 bg-white overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #000, #000 2px, transparent 2px, transparent 12px)",
        }}
      ></div>
      <div className="section-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              <span className="text-primary italic font-display">Contact</span>
            </h2>
            <div className="w-16 h-[4px] bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row w-full mx-auto">
            {/* Left Contact Info Side */}
            <div className="bg-slate-50/50 p-10 lg:p-16 lg:w-2/5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-3">
                Let's Talk
              </h3>
              <p className="text-slate-500 mb-10 leading-relaxed">
                {data?.objective}
              </p>

              <div className="space-y-8">
                <a
                  href="tel:9328008309"
                  className="group flex items-center gap-5 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors border border-slate-100 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Call Me
                    </h4>
                    <p className="text-slate-900 font-bold text-lg">
                      9328008309
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:kabirpatel2882004@gmail.com"
                  className="group flex items-center gap-5 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors border border-slate-100 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Email Me
                    </h4>
                    <p className="text-slate-900 font-bold text-lg truncate">
                      kabirpatel2882004@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Form Side */}
            <div className="p-10 lg:p-12 lg:w-3/5 bg-white flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                {validationError && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium flex items-start gap-2 border border-red-100 animate-in fade-in slide-in-from-top-2">
                    <span>⚠️</span> {validationError}
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-transparent border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full bg-transparent border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full bg-transparent border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder:text-slate-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`flex items-center justify-center space-x-2 w-full px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 mt-2 hover:-translate-y-1 ${
                    status === "success"
                      ? "bg-green-500 text-white shadow-[0_10px_20px_rgba(34,197,94,0.3)]"
                      : status === "error"
                        ? "bg-red-500 text-white shadow-[0_10px_20px_rgba(239,68,68,0.3)]"
                        : "bg-primary text-white shadow-[0_10px_20px_rgba(239,94,84,0.3)] hover:shadow-[0_15px_30px_rgba(239,94,84,0.4)]"
                  }`}
                >
                  <span>
                    {status === "sending"
                      ? "Sending..."
                      : status === "success"
                        ? "Message Sent!"
                        : status === "error"
                          ? "Error! Try again"
                          : "Send Message"}
                  </span>
                  {status !== "sending" && status !== "success" && (
                    <Send
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
