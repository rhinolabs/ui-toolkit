import { Tabs } from '@rhinolabs/ui';
import { CopyButton } from './CopyButton';

interface InstallTabsProps {
  packages: string;
}

const managers = [
  { id: 'pnpm', label: 'pnpm', cmd: 'pnpm add' },
  { id: 'npm', label: 'npm', cmd: 'npm install' },
  { id: 'yarn', label: 'yarn', cmd: 'yarn add' },
  { id: 'bun', label: 'bun', cmd: 'bun add' },
];

export function InstallTabs({ packages }: InstallTabsProps) {
  return (
    <div className="not-prose my-6 rounded-lg border border-border">
      <Tabs defaultValue="pnpm">
        <Tabs.List className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 h-10">
          {managers.map((m) => (
            <Tabs.Trigger
              key={m.id}
              value={m.id}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-3 pb-2.5 pt-2 text-sm"
            >
              {m.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {managers.map((m) => {
          const command = `${m.cmd} ${packages}`;
          return (
            <Tabs.Content key={m.id} value={m.id} className="p-0 relative">
              <div className="absolute right-4 top-3 z-10">
                <CopyButton text={command} />
              </div>
              <pre className="p-4 text-sm font-[JetBrains_Mono,monospace] bg-muted">
                <code>{command}</code>
              </pre>
            </Tabs.Content>
          );
        })}
      </Tabs>
    </div>
  );
}
