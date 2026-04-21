import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <article className="border border-border bg-card text-card-foreground rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={`${title} thumbnail`}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {link && (
          <div className="mt-6">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              View Project &rarr;
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
