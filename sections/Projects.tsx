import SectionWrapper from '../components/SectionWrapper';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data';

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
