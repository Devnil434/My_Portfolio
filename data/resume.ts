export const resumeData = {
  personalInfo: {
    name: "Alex Dev",
    role: "Full Stack Engineer",
    tagline: "& UI/UX Designer",
    bio: "I craft futuristic, high-performance web experiences that blur the line between design and engineering. Obsessed with clean code, beautiful interfaces, and pushing the boundaries of the modern web.",
    email: "hello@alexdev.io",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    resumeUrl: "/resume.pdf",
    avatarUrl: "/avatar.png",
  },
  techStack: [
    { name: "Next.js", category: "Framework" },
    { name: "React", category: "Library" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Framer Motion", category: "Animation" },
    { name: "Node.js", category: "Runtime" },
    { name: "GraphQL", category: "API" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Prisma", category: "ORM" },
    { name: "Docker", category: "DevOps" },
    { name: "Redis", category: "Cache" },
    { name: "AWS", category: "Cloud" },
  ],
  projects: [
    {
      id: "project-1",
      title: "Neon Nexus",
      shortDescription: "A futuristic e-commerce platform with 3D product visualizations.",
      fullDescription:
        "Neon Nexus is a high-performance e-commerce platform built with the Next.js App Router and Framer Motion. It features a seamless glassmorphism UI, real-time inventory tracking via WebSockets, complex 3D product visualizations using Three.js, and a full payment pipeline integrated with Stripe. Lighthouse score: 98/100.",
      problem: "Traditional e-commerce feels static and boring. Users bounce because the shopping experience lacks interactivity and premium feel.",
      solution: "Built a fully interactive, immersive storefront using Three.js for 3D product models and WebSockets for real-time stock sync, wrapped in a glassmorphic Next.js UI.",
      features: [
        "Interactive 3D product viewer (Three.js)",
        "Real-time inventory synchronization",
        "Secure Stripe payment pipeline",
        "Dynamic, glassmorphic layout",
      ],
      metrics: [
        { label: "Performance", val: 98 },
        { label: "Accessibility", val: 100 },
        { label: "SEO", val: 95 },
      ],
      image: "/thumbnail/project1.svg",
      tags: ["Next.js", "Tailwind", "Framer Motion", "Three.js", "Stripe"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "#3EE6A5", // Adjusted to mint for the theme
    },
    {
      id: "project-2",
      title: "Quantum Dashboard",
      shortDescription: "Real-time analytics dashboard with draggable dynamic widgets.",
      fullDescription:
        "Quantum Dashboard provides real-time data visualization for complex enterprise metrics. It utilizes WebSockets for live updates and features a heavily customized, draggable widget interface built with dnd-kit. Charts are rendered with Recharts. The backend is a Node.js microservice architecture deployed on AWS ECS.",
      problem: "Enterprise dashboards are often rigid, slow, and require manual refreshing, slowing down critical decision-making.",
      solution: "Engineered a modular dashboard with draggable widgets and WebSockets to push live data streams directly to Recharts visualizers without page reloads.",
      features: [
        "Drag-and-drop widget grid (dnd-kit)",
        "Live data streaming (WebSockets)",
        "High-performance charting (Recharts)",
        "AWS ECS microservice backend",
      ],
      metrics: [
        { label: "Latency", val: 99 },
        { label: "Uptime", val: 99.9 },
        { label: "Modularity", val: 100 },
      ],
      image: "/thumbnail/project2.svg",
      tags: ["React", "TypeScript", "D3.js", "WebSockets", "Node.js"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "#1db870", // Deeper green
    },
    {
      id: "project-3",
      title: "Cyberpunk Chat",
      shortDescription: "E2E encrypted real-time messaging with a cyberpunk aesthetic.",
      fullDescription:
        "A secure, peer-to-peer messaging application built with Next.js and Socket.io. It guarantees privacy using AES-256 encryption and TLS. Features include group chats, file sharing, read receipts, and an offline message queue powered by Redis. The UI is deliberately styled with a dark cyberpunk aesthetic using custom Tailwind theme tokens.",
      problem: "Mainstream messaging apps harvest user data. There's a lack of visually striking, truly private communication tools.",
      solution: "Developed an E2E encrypted chat protocol using AES-256, delivered through a brutalist/cyberpunk neon UI.",
      features: [
        "End-to-End AES-256 Encryption",
        "Real-time typing & read receipts",
        "Offline message queueing (Redis)",
        "Custom UI token system",
      ],
      metrics: [
        { label: "Security", val: 100 },
        { label: "Speed", val: 94 },
        { label: "UX", val: 98 },
      ],
      image: "/thumbnail/project3.svg",
      tags: ["Next.js", "Socket.io", "Tailwind", "Redis", "Cryptography"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "#A3FF12", // Lime accent
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Frontend Engineer",
      company: "TechNova Inc.",
      period: "2023 – Present",
      description:
        "Leading a 6-person frontend team building high-performance web applications. Improved core web vitals by 40% and implemented a shared design system adopted across 3 products.",
    },
    {
      id: "exp-2",
      role: "UI/UX Developer",
      company: "Creative Solutions Ltd.",
      period: "2021 – 2023",
      description:
        "Designed and developed interactive interfaces for 12+ client projects. Bridged the gap between design and engineering, delivering pixel-perfect implementations from Figma.",
    },
  ],
};
