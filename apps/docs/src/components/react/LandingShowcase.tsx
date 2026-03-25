import { Button, Badge, Switch, Tabs, Card, Progress, Separator } from '@rhinolabs/ui';
import { ArrowRight, Check, Star, Zap } from 'lucide-react';
import { useState } from 'react';

export function LandingShowcase() {
  const [switchOn, setSwitchOn] = useState(true);
  const [progress] = useState(65);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Buttons Card */}
      <Card className="p-6">
        <p className="mb-4 text-sm font-medium text-foreground">Buttons</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="secondary">Secondary</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Button size="sm" variant="destructive">Destructive</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
          <Button size="sm" variant="link">Link</Button>
        </div>
      </Card>

      {/* Badges Card */}
      <Card className="p-6">
        <p className="mb-4 text-sm font-medium text-foreground">Badges</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Card>

      {/* Switch Card */}
      <Card className="p-6">
        <p className="mb-4 text-sm font-medium text-foreground">Controls</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dark mode</span>
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Notifications</span>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Tabs Card */}
      <Card className="p-6">
        <p className="mb-4 text-sm font-medium text-foreground">Tabs</p>
        <Tabs defaultValue="overview">
          <Tabs.List className="w-full">
            <Tabs.Trigger value="overview" className="flex-1 text-xs">Overview</Tabs.Trigger>
            <Tabs.Trigger value="analytics" className="flex-1 text-xs">Analytics</Tabs.Trigger>
            <Tabs.Trigger value="reports" className="flex-1 text-xs">Reports</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview" className="pt-3">
            <p className="text-sm text-muted-foreground">Overview content goes here.</p>
          </Tabs.Content>
          <Tabs.Content value="analytics" className="pt-3">
            <p className="text-sm text-muted-foreground">Analytics content goes here.</p>
          </Tabs.Content>
          <Tabs.Content value="reports" className="pt-3">
            <p className="text-sm text-muted-foreground">Reports content goes here.</p>
          </Tabs.Content>
        </Tabs>
      </Card>

      {/* Progress Card */}
      <Card className="p-6">
        <p className="mb-4 text-sm font-medium text-foreground">Progress</p>
        <div className="space-y-3">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">{progress}% completed</p>
        </div>
      </Card>

      {/* CTA Card */}
      <Card className="p-6 flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Ready to build?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Start using the toolkit in your next project.
          </p>
        </div>
        <Button className="mt-4 w-full" asChild>
          <a href="/introduction">
            Get Started <ArrowRight className="ml-2 size-4" />
          </a>
        </Button>
      </Card>
    </div>
  );
}
