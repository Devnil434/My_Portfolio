"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function SectionsOverlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // 0–20% → HERO (no UI)
  // 20–40% → ABOUT
  // 40–65% → PROJECTS
  // 65–80% → SKILLS
  // 80–90% → EXPERIENCE
  // 90–100% → CONTACT

  // About Transforms
  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [20, 0, 0, -20]);

  // Projects Transforms
  const projectsOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const projectsY = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [20, 0, 0, -20]);

  // Skills Transforms
  const skillsOpacity = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const skillsY = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [20, 0, 0, -20]);

  // Experience Transforms
  const expOpacity = useTransform(scrollYProgress, [0.75, 0.8, 0.85, 0.9], [0, 1, 1, 0]);
  const expY = useTransform(scrollYProgress, [0.75, 0.8, 0.85, 0.9], [20, 0, 0, -20]);

  // Contact Transforms
  const contactOpacity = useTransform(scrollYProgress, [0.85, 0.9, 0.95, 1], [0, 1, 1, 0]);
  const contactY = useTransform(scrollYProgress, [0.85, 0.9, 0.95, 1], [20, 0, 0, -20]);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center p-8 z-10 text-white">
      {/* ABOUT */}
      <motion.div
        style={{ opacity: aboutOpacity, y: aboutY }}
        className="absolute left-6 md:left-24 max-w-md pointer-events-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-lg text-white">
          Crafting <span className="text-blue-400">Digital</span> Experiences.
        </h2>
        <p className="text-lg text-white/80 drop-shadow-md leading-relaxed backdrop-blur-sm bg-black/10 p-6 rounded-2xl border border-white/10 shadow-2xl">
          I'm a passionate developer focusing on building scalable and performant
          web applications. I love solving complex problems with cutting-edge technologies
          and creative frontend interfaces.
        </p>
      </motion.div>

      {/* PROJECTS */}
      <motion.div
        style={{ opacity: projectsOpacity, y: projectsY }}
        className="absolute right-6 md:right-24 max-w-lg pointer-events-auto"
      >
        <h2 className="text-4xl font-bold mb-6 tracking-tight drop-shadow-lg text-white">
          Featured <span className="text-purple-400">Projects</span>
        </h2>
        <div className="space-y-4">
          <div className="p-6 backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl shadow-xl hover:bg-black/40 transition-colors">
            <h3 className="text-2xl font-bold mb-2 text-white">Omni-Channel Engine</h3>
            <p className="text-white/70 text-sm">Real-time matching algorithms for massive-scale systems.</p>
          </div>
          <div className="p-6 backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl shadow-xl hover:bg-black/40 transition-colors">
            <h3 className="text-2xl font-bold mb-2 text-white">Cinematic WebGL</h3>
            <p className="text-white/70 text-sm">Award-winning 3D experiences leveraging React Three Fiber.</p>
          </div>
        </div>
      </motion.div>

      {/* SKILLS */}
      <motion.div
        style={{ opacity: skillsOpacity, y: skillsY }}
        className="absolute left-6 md:left-24 max-w-xl pointer-events-auto"
      >
        <h2 className="text-4xl font-bold mb-6 tracking-tight drop-shadow-lg text-white">
          Technical <span className="text-green-400">Node System</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          {["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "WebGL", "Three.js", "Node.js", "Redis", "PostgreSQL", "Socket.io"].map(skill => (
            <span key={skill} className="px-5 py-2 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-medium transition-all shadow-lg text-sm md:text-base text-white">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* EXPERIENCE */}
      <motion.div
        style={{ opacity: expOpacity, y: expY }}
        className="absolute right-6 md:right-24 max-w-md pointer-events-auto"
      >
         <h2 className="text-4xl font-bold mb-6 tracking-tight drop-shadow-lg text-white">
          Professional <span className="text-orange-400">Timeline</span>
        </h2>
        <div className="pl-6 border-l-2 border-white/20 space-y-8 relative">
          <div className="relative">
            <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
            <h3 className="text-xl font-bold text-white">Senior Web Developer</h3>
            <p className="text-white/60 text-sm mb-2">2022 - Present</p>
            <p className="text-white/80 text-sm">Leading frontend architecture and Awwwards-winning experiences.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-white/50" />
            <h3 className="text-xl font-bold text-white">Frontend Engineer</h3>
            <p className="text-white/60 text-sm mb-2">2019 - 2022</p>
            <p className="text-white/80 text-sm">Developed interactive applications with React and Next.js.</p>
          </div>
        </div>
      </motion.div>

      {/* CONTACT */}
      <motion.div
        style={{ opacity: contactOpacity, y: contactY }}
        className="absolute bottom-20 md:bottom-1/3 left-0 right-0 mx-auto w-full max-w-lg text-center pointer-events-auto px-6"
      >
        <div className="p-8 backdrop-blur-xl bg-black/40 border border-white/20 rounded-3xl shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white"> Let's <span className="text-blue-500">Connect</span></h2>
          <p className="text-white/70 mb-8">Currently available for freelance opportunities and innovative collaborations.</p>
          <a href="mailto:hello@example.com" className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Initiate Link
          </a>
        </div>
      </motion.div>
    </div>
  );
}
