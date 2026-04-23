export const resumeData = {
  personalInfo: {
    name: "Nilanjan Saha",
    role: "AI/ML Engineer",
    tagline: "Hire Me!",
    bio: "Hi! I'm Nilanjan. A results-driven AI/ML Engineer with strong skills in building high-performance applications, DevOps engineering, and full stack technologies.",
    email: "[EMAIL_ADDRESS]",
    github: "https://github.com/Devnil434",
    linkedin: "https://www.linkedin.com/in/devnil-674580189",
    resumeUrl: "https://drive.google.com/file/d/1hqjMX7T7jsTlXgvvyhOgiEoGwuKYo2uv/view?usp=drive_link",
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
      title: "Multi-Document RAG System",
      shortDescription: "A high-performance RAG system built with Hybrid Search, Reranking, and ultra-fast Groq LPU inference.",
      fullDescription:
        "A Production-Grade Multi-Document RAG System. It combines BM25 (keyword) and ChromaDB (vector) search for optimal retrieval precision. Results are passed through a Reranker before being sent to the ultra-fast Groq LPU LLM for streaming responses. Features a clean Streamlit chat UI with multi-PDF upload support and an authentication layer.",
      problem: "Standard RAG systems rely solely on semantic vector search, missing exact keyword matches (IDs, acronyms), leading to poor context retrieval and LLM hallucinations.",
      solution: "Engineered a Hybrid Retriever combining BM25 (exact match) and Chroma Vector Search (semantic), passed through a Reranker, and streamed via Groq LPU for highly grounded, sub-second responses.",
      features: [
        "Hybrid Retrieval (BM25 + Vector Search)",
        "Reranking for Better Relevance",
        "Persistent Chroma Vector Database",
        "Streaming LLM Responses via Groq LPU",
        "Multi-PDF Upload & Automatic Text Chunking",
        "Authentication Layer & Clean Streamlit Chat UI"
      ],
      metrics: [
        { label: "Retrieval Precision", val: 96 },
        { label: "Latency", val: 99 },
        { label: "Groundedness", val: 94 },
      ],
      image: "/thumbnail/project1.svg",
      tags: ["Python", "Streamlit", "LangChain", "ChromaDB", "Sentence Transformers", "Groq API"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com/Devnil434/multi-doc-rag",
      color: "#3EE6A5", // Adjusted to mint for the theme
    },
    {
      id: "project-2",
      title: "Civic-Eye Reporting",
      shortDescription: "A full-stack civic issue reporting platform with ML categorization and a mobile app.",
      fullDescription:
        "Civic-Eye is a comprehensive civic issue reporting system consisting of a React-based web admin dashboard and mobile app integration for citizen service management. It empowers citizens to report issues with geolocation and photos, while an ML FastAPI service auto-categorizes them. The backend is powered by Express.js and Supabase.",
      problem: "Citizens lack an easy way to report local issues with precise locations, and municipal administrators struggle to manually sort and verify thousands of incoming reports.",
      solution: "Developed a cross-platform system where citizens snap a photo to submit a report, while an automated ML pipeline categorizes the issue for administrators using an interactive Supabase-powered React dashboard.",
      features: [
        "React Admin Dashboard with Interactive Maps",
        "Mobile App API for Geolocation & Photo Uploads",
        "Automated Report Categorization via FastAPI (ML)",
        "Real-time Status Tracking & Notifications",
        "Supabase PostgreSQL Database Integration",
      ],
      metrics: [
        { label: "Efficiency", val: 95 },
        { label: "Uptime", val: 99.9 },
        { label: "UX Rating", val: 92 },
      ],
      image: "/thumbnail/project2.svg",
      tags: ["React", "Express.js", "Supabase", "FastAPI", "Machine Learning", "Node.js"],
      liveUrl: "https://janata-seva-admin-panel.vercel.app/",
      codeUrl: "https://github.com",
      color: "#1db870", // Deeper green
    },
    {
      id: "project-3",
      title: "Cortex-Bench",
      shortDescription: "Offline-first AI routing system with dynamic SLM selection and a real-time privacy firewall.",
      fullDescription:
        "Cortex-Bench is a privacy-first, fully local AI routing system that orchestrates multiple Small Language Models (SLMs) using Ollama. It features a robust privacy firewall built with Microsoft Presidio and spaCy to detect and reversibly mask PII before inference. A benchmarking engine compares latency, token speed, and response quality across models like phi3:mini, llama3.2:3b, and mistral:7b.",
      problem: "Sending sensitive data to external LLM APIs poses severe privacy risks, while running a single massive local model is slow and resource-intensive.",
      solution: "Built an offline-first intelligent router that classifies query intent to select the optimal local SLM, coupled with a real-time reversible PII masking firewall.",
      features: [
        "Intelligent Model Routing (Intent Classification)",
        "PII Detection & Masking (Microsoft Presidio & spaCy)",
        "Reversible Anonymization Pipeline",
        "Benchmarking Engine (Latency, Tokens/sec, Quality)",
        "Real-Time Streaming via Server-Sent Events (SSE)",
      ],
      metrics: [
        { label: "Privacy Score", val: 100 },
        { label: "Routing Acc", val: 94 },
        { label: "Latency", val: 96 },
      ],
      image: "/thumbnail/project3.svg",
      tags: ["Python", "FastAPI", "Streamlit", "Ollama", "spaCy", "Presidio"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "#A3FF12", // Lime accent
    },
    {
      id: "project-4",
      title: "Amazon Kindle Bestseller Pipeline",
      shortDescription: "A fully automated n8n data pipeline to scrape, clean, and structure Amazon Kindle bestseller data.",
      fullDescription:
        "A robust data extraction pipeline that automatically scrapes the Amazon Kindle Bestseller list, extracts detailed metadata using JSON-LD, and enriches the dataset. It handles rate limiting, data cleaning (converting ratings, standardizing dates, fixing URLs), and automatically exports the structured data to a CSV file and Google Sheets for downstream machine learning and analysis workflows.",
      problem: "Manually collecting and cleaning bestseller data for analysis or machine learning pipelines is time-consuming, error-prone, and often blocked by anti-bot measures.",
      solution: "Engineered a fully automated n8n workflow that performs rate-limited web scraping, deep metadata extraction via HTML parsing, and data normalization, culminating in structured cloud exports.",
      features: [
        "End-to-End Automation with n8n",
        "Rate-Limited Web Scraping & HTML Parsing",
        "Deep Metadata Enrichment (JSON-LD)",
        "Data Cleaning & Normalization (Dates, Prices, Ratings)",
        "Automated Cloud Export to Google Sheets & CSV",
      ],
      metrics: [
        { label: "Automation", val: 100 },
        { label: "Data Quality", val: 98 },
        { label: "Reliability", val: 99 },
      ],
      image: "/thumbnail/project4.svg",
      tags: ["n8n", "JavaScript", "Web Scraping", "Data Engineering", "Google Sheets API"],
      liveUrl: "https://example.com",
      codeUrl: "https://github.com",
      color: "#FF9900", // Amazon Orange accent
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Open Source Contributor",
      company: "GSSoC, OSCI, Hacktoberfest, Open-Odyssey",
      period: "2023 – Present",
      description:
        "Remote – Contributed to 10+ repositories improving reliability, test coverage, and documentation quality. Earned official Hacktoberfest Swag for validated pull requests across multiple open-source projects. Enhanced performance and modularity across multiple open-source projects, gaining collaborative development experience.",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Google Solution Challenge 2025",
      description: "Selected among Top 105 Global Teams worldwide.",
    },
    {
      id: "ach-2",
      title: "Hackathon Participation",
      description: "Competed in 9+ hackathons, consistently delivering rapid and functional prototypes.",
    },
    {
      id: "ach-3",
      title: "Rotary Club Merit Test",
      description: "Ranked 10th among participants.",
    },
  ],
};
