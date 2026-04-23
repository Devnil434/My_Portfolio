"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { Mail, Code, Briefcase, Send, Leaf } from "lucide-react";
import { AvatarWatermark } from "./AvatarEntity";

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
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Failed to send message");
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }

    if (status !== "idle") {
      setTimeout(() => setStatus("idle"), 4000);
    }
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

        <div className="max-w-2xl mx-auto">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-6 md:p-10 flex flex-col gap-5"
          >
            <p className="text-sm text-[var(--fg-muted)] font-semibold font-mono mb-2 text-center">Send a quick message</p>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="rounded-xl px-5 py-4 text-sm outline-none transition-all"
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
              name="email"
              placeholder="Your Email"
              required
              className="rounded-xl px-5 py-4 text-sm outline-none transition-all"
              style={{
                background: "rgba(7,31,23,0.6)",
                border:     "1px solid var(--glass-border)",
                color:      "var(--fg-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-mint)")}
              onBlur={(e)  => (e.target.style.borderColor = "var(--glass-border)")}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="rounded-xl px-5 py-4 text-sm outline-none transition-all resize-none"
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
              className="btn-forest py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2"
              whileHover={status === "idle" ? { scale: 1.02 } : {}}
              whileTap={status === "idle" ? { scale: 0.98 } : {}}
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
