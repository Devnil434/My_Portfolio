export default function Navbar() {
  const links = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">
        <div className="font-bold text-xl tracking-tight">Portfolio</div>
        <ul className="hidden md:flex flex-1 justify-center space-x-8">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          {/* TODO: Implement Framer Motion animate presence for mobile menu */}
          {/* TODO: Add Theme Switcher logic (retro/dark) here */}
          <button aria-label="Toggle theme" className="p-2 border border-border rounded-md hover:bg-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
