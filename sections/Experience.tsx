import SectionWrapper from '../components/SectionWrapper';
import { experiences } from '../data';

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-l-4 border-primary pl-6 py-2">
            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <p className="text-muted-foreground font-medium mb-2">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            <p className="text-foreground">{exp.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
