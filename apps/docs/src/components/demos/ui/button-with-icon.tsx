import { Button } from '@rhinolabs/ui';
import { Download, Moon } from 'lucide-react';

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Download className="size-4 mr-2" />
        Download
      </Button>
      <Button variant="outline">
        <Moon className="size-4 mr-2" />
        Toggle Theme
      </Button>
    </div>
  );
}
