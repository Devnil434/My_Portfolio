import SectionWrapper from '../components/SectionWrapper';
import { skills } from '../data';

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-muted-foreground mb-4">
            Hi, I am a passionate developer focusing on building scalable and performant
            web applications. I love solving complex problems with modern technologies.
          </p>
          <p className="text-muted-foreground">
            In my free time, I explore emerging tech, design patterns, and creative
            frontend interfaces using WebGL.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Skills</h2>
          <div className="space-y-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-lg font-semibold mb-2">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
