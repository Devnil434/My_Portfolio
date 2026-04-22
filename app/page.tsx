import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Divider } from "@/components/Divider";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        {/* Hero */}
        <Hero />

        {/* Divider 1 */}
        <Divider label="// CAPABILITIES //" />

        {/* Tech Stack */}
        <TechStack />

        {/* Divider 2 */}
        <Divider label="// PROJECTS //" />

        {/* Projects */}
        <Projects />

        {/* Divider 3 */}
        <Divider label="// CONTACT //" />

        {/* Contact */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
