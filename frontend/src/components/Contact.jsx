import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import axios from "axios";
import { API_URL } from "../config";

const Contact = () => {
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
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 2px, transparent 2px, transparent 12px)' }}></div>
      <div className="section-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              <span className="text-primary italic font-display">Contact</span>
            </h2>
            <div className="w-16 h-[4px] bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Text */}
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                      Mobile Number
                    </h4>
                    <p className="text-slate-600">9328008309</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                      Email Id
                    </h4>
                    <p className="text-slate-600">
                      kabirpatel2882004@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col space-y-6 relative overflow-hidden group"
              >
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
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all resize-none placeholder:text-slate-400"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`flex items-center justify-center space-x-2 w-full px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 mt-4 shadow-[0_5px_15px_rgba(239,94,84,0.3)] hover:shadow-[0_10px_25px_rgba(239,94,84,0.4)] hover:-translate-y-1 ${
                    status === "success"
                      ? "bg-green-500 text-white"
                      : status === "error"
                        ? "bg-red-500 text-white"
                        : "bg-primary text-white"
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
