import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <TechStack />
      <Projects />
      <Contact />
      
      <footer className="w-full py-8 text-center text-zinc-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Alex Dev. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Tailwind CSS & Framer Motion</p>
      </footer>
    </main>
  );
}
