import { useState, useEffect } from 'react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  const filtered = headings.filter((h) => h.depth >= 2 && h.depth <= 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );

    for (const heading of filtered) {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [filtered]);

  if (filtered.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="mb-2 text-sm font-semibold text-foreground">On This Page</p>
      {filtered.map((heading) => (
        <a
          key={heading.slug}
          href={`#${heading.slug}`}
          className={`block text-sm transition-colors py-1 ${
            heading.depth === 3 ? 'pl-4' : ''
          } ${
            activeId === heading.slug
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
