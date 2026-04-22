"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, Code, Briefcase, Send } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  {
    label: "Email",
    href: `mailto:${resumeData.personalInfo.email}`,
    icon: Mail,
    color: "var(--neon-blue)",
    text: resumeData.personalInfo.email,
  },
  {
    label: "GitHub",
    href: resumeData.personalInfo.github,
    icon: Code,
    color: "var(--neon-purple)",
    text: "github.com/alexdev",
  },
  {
    label: "LinkedIn",
    href: resumeData.personalInfo.linkedin,
    icon: Briefcase,
    color: "var(--neon-pink)",
    text: "linkedin.com/in/alexdev",
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full bg-[var(--neon-pink)] opacity-[0.04] blur-[120px]" />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-tag mb-3">&gt;&gt; Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Let&apos;s <span className="text-neon">Connect</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Open to new projects, collaborations, or just a chat about the future of the web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <p className="text-zinc-300 font-semibold mb-2">Find me on</p>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-xl p-4 flex items-center gap-4 border border-[var(--glass-border)] hover:border-[var(--neon-blue)] group transition-all duration-300"
              >
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: `color-mix(in srgb, ${link.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${link.color} 20%, transparent)`,
                  }}
                >
                  <link.icon className="w-5 h-5" style={{ color: link.color }} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-mono">{link.label}</p>
                  <p className="text-sm text-zinc-200 group-hover:text-white transition-colors">
                    {link.text}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Quick contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 flex flex-col gap-4 border border-[var(--glass-border)]">
              <p className="text-zinc-300 font-semibold mb-1">Send a message</p>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[var(--neon-blue)] transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[var(--neon-blue)] transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                className="bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[var(--neon-blue)] transition-colors resize-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-neon flex items-center justify-center gap-2 text-black font-bold py-3 rounded-xl text-sm mt-1"
              >
                {status === "sent" ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
