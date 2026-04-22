export const resumeData = {
  personalInfo: {
    name: "Alex Dev",
    title: "Full Stack Engineer & UI/UX Designer",
    description: "Building futuristic, high-performance web experiences with modern technologies.",
    email: "hello@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    avatarUrl: "/globe.svg", // Using a placeholder from public for now
  },
  techStack: [
    { name: "Next.js", icon: "nextjs" },
    { name: "React", icon: "react" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Framer Motion", icon: "framer" },
    { name: "Node.js", icon: "nodejs" },
    { name: "GraphQL", icon: "graphql" },
    { name: "PostgreSQL", icon: "postgres" }
  ],
  projects: [
    {
      id: "project-1",
      title: "Neon Nexus",
      shortDescription: "A futuristic e-commerce platform.",
      fullDescription: "Neon Nexus is a high-performance e-commerce platform built with Next.js App Router and Framer Motion. It features a seamless glassmorphism UI, real-time inventory tracking, and complex 3D product visualizations.",
      image: "/window.svg", // Placeholder
      tags: ["Next.js", "Tailwind", "Framer Motion", "Three.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "project-2",
      title: "Quantum Dashboard",
      shortDescription: "Real-time analytics dashboard with dynamic widgets.",
      fullDescription: "Quantum Dashboard provides real-time data visualization for complex enterprise metrics. It utilizes WebSockets for live updates and features a heavily customized, draggable widget interface.",
      image: "/file.svg", // Placeholder
      tags: ["React", "TypeScript", "D3.js", "WebSockets"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "project-3",
      title: "Cyberpunk Chat",
      shortDescription: "End-to-end encrypted messaging application.",
      fullDescription: "A secure, peer-to-peer messaging app with a sleek, cyberpunk-inspired UI. It guarantees privacy using advanced encryption algorithms and offers instant message delivery.",
      image: "/globe.svg", // Placeholder
      tags: ["Next.js", "Socket.io", "Tailwind", "Cryptography"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Frontend Engineer",
      company: "TechNova",
      period: "2023 - Present",
      description: "Leading the frontend team in developing high-performance web applications using React and Next.js. Implemented robust design systems and improved core web vitals by 40%."
    },
    {
      id: "exp-2",
      role: "UI/UX Developer",
      company: "Creative Solutions",
      period: "2021 - 2023",
      description: "Designed and developed interactive user interfaces for various client projects. Bridged the gap between design and engineering, ensuring pixel-perfect implementations."
    }
  ]
};
