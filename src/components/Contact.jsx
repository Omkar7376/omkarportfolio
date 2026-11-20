import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Transmitting message...");
    const formData = new FormData(event.target);

    // Web3Forms Access Key
    formData.append("access_key", "0b7d8eb6-8b05-4861-b63a-223f050c2773");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Transmitted Successfully! I will get back to you soon.");
        event.target.reset();
      } else {
        setResult(data.message || "Something went wrong. Please email directly.");
      }
    } catch {
      setResult("Transmission error. Please send an email directly to omkarmali2326@gmail.com");
    }
  };

  return (
    <section id="contact" className="py-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 flex items-center justify-center">
            <span className="text-secondary mr-3 md:mr-4">06.</span> What's Next?
          </h2>
          <p className="text-textMuted text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            I am currently open to Android developer positions, internships, and collaborative software projects. Feel free to reach out directly!
          </p>
        </div>

        {/* Quick Contact Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10">
          <a
            href="mailto:omkarmali2326@gmail.com"
            className="glass-card p-4 md:p-5 flex items-center gap-3.5 hover:border-secondary/60 transition-all group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/20 border border-secondary/40 text-secondary flex items-center justify-center shrink-0">
              <FaEnvelope size={18} />
            </div>
            <div>
              <span className="text-[10px] md:text-xs uppercase font-mono text-textMuted block">Direct Email</span>
              <span className="text-xs md:text-base font-bold text-white group-hover:text-secondary transition-colors">
                omkarmali2326@gmail.com
              </span>
            </div>
          </a>

          <a
            href="tel:8010827376"
            className="glass-card p-4 md:p-5 flex items-center gap-3.5 hover:border-green-400/60 transition-all group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center shrink-0">
              <FaPhoneAlt size={16} />
            </div>
            <div>
              <span className="text-[10px] md:text-xs uppercase font-mono text-textMuted block">Call / WhatsApp</span>
              <span className="text-xs md:text-base font-bold text-white group-hover:text-green-400 transition-colors">
                +91 8010827376
              </span>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <div className="glass-card p-6 md:p-12 text-left">
          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="name" className="block text-xs md:text-sm font-medium text-textMuted mb-1.5 md:mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-xs md:text-sm font-medium text-textMuted mb-1.5 md:mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs md:text-sm font-medium text-textMuted mb-1.5 md:mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs md:text-sm font-medium text-textMuted mb-1.5 md:mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                placeholder="Job Opportunity / Project Inquiry"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-xs md:text-sm font-medium text-textMuted mb-1.5 md:mb-2">Message</label>
              <textarea
                name="description"
                id="description"
                rows="4"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none"
                placeholder="Hi Omkar, I came across your portfolio and would like to discuss..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 md:py-4 bg-gradient-to-r from-secondary to-tertiary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(131,56,236,0.35)] flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <FaPaperPlane size={14} />
              <span>Send Message</span>
            </button>

            {result && (
              <p className="text-center text-accent font-medium mt-3 p-3 rounded-lg bg-black/40 border border-white/10 text-xs md:text-sm">
                {result}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
