import { Project, Skill, ExperienceRecord } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, Prisma, and Stripe.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    link: 'https://example.com',
    repoUrl: 'https://github.com/example/repo',
  },
  {
    id: '2',
    title: 'Real-time Chat App',
    description: 'A real-time messaging application using WebSockets and Redis.',
    tags: ['React', 'Node.js', 'Socket.io', 'Redis'],
    link: 'https://example.com/chat',
  },
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Figma', 'Jest'],
  },
];

export const experiences: ExperienceRecord[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'Tech Corp',
    startDate: 'Jan 2024',
    endDate: 'Present',
    description: 'Leading the frontend architectural decisions and building scalable React applications.',
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Agency LLC',
    startDate: 'Mar 2021',
    endDate: 'Dec 2023',
    description: 'Developed and maintained various client projects using the MERN stack.',
  },
];
