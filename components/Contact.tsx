"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, Code, Briefcase, Send, Leaf } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const SOCIAL = [
  { label: "Email",    href: `mailto:${resumeData.personalInfo.email}`,  icon: Mail,     color: "#3EE6A5", text: resumeData.personalInfo.email },
  { label: "GitHub",   href: resumeData.personalInfo.github,              icon: Code,     color: "#A3FF12", text: "github.com/alexdev" },
  { label: "LinkedIn", href: resumeData.personalInfo.linkedin,            icon: Briefcase, color: "#22c55e", text: "linkedin.com/in/alexdev" },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden z-10">
      {/* Soft glowing green bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(62,230,165,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Floating gentle leaves */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 pointer-events-none"
          style={{
            width: 8 + i * 4,
            height: 8 + i * 4,
            background: i % 2 === 0 ? "var(--accent-mint)" : "var(--accent-lime)",
            left:  `${10 + i * 14}%`,
            top:   `${20 + (i % 3) * 25}%`,
            filter: "blur(2px)",
          }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Faded avatar in corner */}
      <div className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.05] pointer-events-none overflow-hidden rounded-tl-full">
        <Image
          src={resumeData.personalInfo.avatarUrl}
          alt=""
          fill
          className="object-cover"
          sizes="288px"
          aria-hidden
        />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label block mb-3">&gt; Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-black">
            Let&apos;s <span className="text-forest">Grow</span> Together
          </h2>
          <p className="text-[var(--fg-muted)] mt-4 max-w-xl mx-auto">
            Open to collaborations, projects, or just a conversation about the future of the web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <p className="text-sm text-[var(--fg-muted)] font-semibold mb-1 font-mono">Connect via</p>
            {SOCIAL.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass-card p-4 flex items-center gap-4 group"
                whileHover={{ x: 4 }}
              >
                <div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                    border:     `1px solid color-mix(in srgb, ${s.color} 22%, transparent)`,
                  }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--fg-subtle)] font-mono">{s.label}</p>
                  <p className="text-sm text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)] transition-colors">
                    {s.text}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-6 md:p-8 flex flex-col gap-4"
          >
            <p className="text-sm text-[var(--fg-muted)] font-semibold font-mono mb-1">Quick message</p>

            <input
              type="text"
              placeholder="Your Name"
              required
              className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                background:   "rgba(7,31,23,0.6)",
                border:       "1px solid var(--glass-border)",
                color:        "var(--fg-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-mint)")}
              onBlur={(e)  => (e.target.style.borderColor = "var(--glass-border)")}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "rgba(7,31,23,0.6)",
                border:     "1px solid var(--glass-border)",
                color:      "var(--fg-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-mint)")}
              onBlur={(e)  => (e.target.style.borderColor = "var(--glass-border)")}
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              required
              className="rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
              style={{
                background: "rgba(7,31,23,0.6)",
                border:     "1px solid var(--glass-border)",
                color:      "var(--fg-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-mint)")}
              onBlur={(e)  => (e.target.style.borderColor = "var(--glass-border)")}
            />

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              className="btn-forest py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-1"
              whileHover={status === "idle" ? { scale: 1.03 } : {}}
              whileTap={status === "idle" ? { scale: 0.97 } : {}}
              animate={status === "idle" ? { boxShadow: ["0 0 20px var(--glow-mint)", "0 0 35px var(--glow-mint)", "0 0 20px var(--glow-mint)"] } : {}}
              transition={status === "idle" ? { duration: 3, repeat: Infinity } : {}}
            >
              {status === "idle"    && <><Send className="w-4 h-4" /> Send Message</>}
              {status === "sending" && <><Leaf className="w-4 h-4 animate-spin" /> Sending...</>}
              {status === "sent"    && "Message Sent ✓"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
