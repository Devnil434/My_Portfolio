import Container from './Container';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
