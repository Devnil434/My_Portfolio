import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar }             from "@/components/Navbar";
import { Hero }               from "@/components/Hero";
import { WaveDivider }        from "@/components/WaveDivider";
import { TechStack }          from "@/components/TechStack";
import { Experience }         from "@/components/Experience";
import { Education }          from "@/components/Education";
import { Projects }           from "@/components/Projects";
import { Achievements }       from "@/components/Achievements";
import { Contact }            from "@/components/Contact";
import { Footer }             from "@/components/Footer";
import { Preloader }          from "@/components/Preloader";


export default function Home() {
  return (
    <>
      <Preloader />
      {/* Living background (fixed, z-0) */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main content sits above the background */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <WaveDivider label="// CAPABILITIES //" />
        <TechStack />
        <WaveDivider flip label="// EXPERIENCE //" />
        <Experience />
        <WaveDivider label="// EDUCATION //" />
        <Education />
        <WaveDivider flip label="// PROJECTS //" />
        <Projects />
        <WaveDivider flip label="// ACHIEVEMENTS //" />
        <Achievements />
        <WaveDivider label="// CONTACT //" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
