import SectionWrapper from '../components/SectionWrapper';

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="text-center">
      <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        I am currently looking for new opportunities. Whether you have a question or just want to say hi, I will try my best to get back to you!
      </p>
      <a 
        href="mailto:example@example.com"
        className="inline-block border-2 border-border text-foreground px-8 py-3 rounded-md font-medium hover:bg-secondary transition-colors"
      >
        Say Hello
      </a>
    </SectionWrapper>
  );
}
