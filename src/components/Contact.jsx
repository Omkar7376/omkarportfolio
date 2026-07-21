import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Replace with your Web3Forms Access Key
    formData.append("access_key", "0b7d8eb6-8b05-4861-b63a-223f050c2773");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section id="contact" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center">
          <span className="text-secondary mr-4">05.</span> What's Next?
        </h2>
        <p className="text-textMuted mb-12 text-lg">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="glass-card p-8 md:p-12 text-left">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-textMuted mb-2">Name</label>
                <input type="text" name="name" id="name" required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Full Name" />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-textMuted mb-2">Mobile Number</label>
                <input type="tel" name="mobile" id="mobile" required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Mobile Number" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textMuted mb-2">Email</label>
              <input type="email" name="email" id="email" required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Your Email Address" />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-textMuted mb-2">Subject</label>
              <input type="text" name="subject" id="subject" required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Project Inquiry" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-textMuted mb-2">Description</label>
              <textarea name="description" id="description" rows="5" required className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-textBase focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none" placeholder="I'd like to discuss..."></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-secondary to-tertiary text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(131,56,236,0.3)]">
              Send Message
            </button>

            {result && <p className="text-center text-accent font-medium mt-4">{result}</p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
