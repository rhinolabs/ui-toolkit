import { useState } from 'react';
import { ScrollArea } from '@rhinolabs/ui';
import { ChevronRight } from 'lucide-react';
import { sidebarData } from '../../data/sidebar';

interface SidebarProps {
  currentPath: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of sidebarData) {
      initial[section.title] = true;
    }
    return initial;
  });

  function toggleSection(title: string) {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <ScrollArea className="h-full">
      <nav className="p-4 pr-2">
        {sidebarData.map((section) => (
          <div key={section.title} className="mb-4">
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-semibold text-foreground hover:bg-accent/50 transition-colors"
            >
              {section.title}
              <ChevronRight
                className={`size-4 text-muted-foreground transition-transform ${
                  openSections[section.title] ? 'rotate-90' : ''
                }`}
              />
            </button>
            {openSections[section.title] && (
              <div className="mt-1 ml-2 border-l border-border pl-2">
                {section.items.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                        isActive
                          ? 'font-medium text-foreground bg-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                    >
                      {item.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
      <ScrollArea.Bar />
    </ScrollArea>
  );
}
