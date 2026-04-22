import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar }             from "@/components/Navbar";
import { Hero }               from "@/components/Hero";
import { WaveDivider }        from "@/components/WaveDivider";
import { TechStack }          from "@/components/TechStack";
import { Projects }           from "@/components/Projects";
import { Contact }            from "@/components/Contact";
import { Footer }             from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Living background (fixed, z-0) */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main content sits above the background */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <WaveDivider label="// CAPABILITIES //" />
        <TechStack />
        <WaveDivider flip label="// PROJECTS //" />
        <Projects />
        <WaveDivider label="// CONTACT //" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
