import { Sheet, Button } from '@rhinolabs/ui';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileSidebarProps {
  currentPath: string;
}

export function MobileSidebar({ currentPath }: MobileSidebarProps) {
  return (
    <Sheet>
      <Sheet.Trigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left" className="w-72 p-0">
        <Sheet.Header className="px-4 py-3 border-b border-border">
          <Sheet.Title className="text-sm font-semibold">Navigation</Sheet.Title>
        </Sheet.Header>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar currentPath={currentPath} />
        </div>
      </Sheet.Content>
    </Sheet>
  );
}
