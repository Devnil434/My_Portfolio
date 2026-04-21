import SectionWrapper from '../components/SectionWrapper';

export default function Hero() {
  return (
    <SectionWrapper id="hero" className="min-h-[80vh] flex flex-col justify-center text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
        Creative Developer
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Crafting digital experiences with modern tools. Focusing on clean code, 
        performance, and scalable architecture.
      </p>
      <div>
        <a 
          href="#projects" 
          className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          View Projects
        </a>
      </div>
      {/* TODO: Add React Three Fiber Canvas here for Phase 2 3D elements */}
    </SectionWrapper>
  );
}
