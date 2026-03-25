import { useState } from 'react';
import { Tabs } from '@rhinolabs/ui';
import { CopyButton } from './CopyButton';

interface ComponentPreviewProps {
  code: string;
  children: React.ReactNode;
}

export function ComponentPreview({ code, children }: ComponentPreviewProps) {
  return (
    <div className="not-prose my-6 rounded-lg border border-border">
      <Tabs defaultValue="preview">
        <Tabs.List className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 h-11">
          <Tabs.Trigger
            value="preview"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-3 pb-3 pt-2 text-sm"
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="code"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-3 pb-3 pt-2 text-sm"
          >
            Code
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="preview" className="p-0">
          <div className="flex min-h-[350px] w-full items-center justify-center p-10">
            {children}
          </div>
        </Tabs.Content>
        <Tabs.Content value="code" className="p-0 relative">
          <div className="absolute right-4 top-4 z-10">
            <CopyButton text={code} />
          </div>
          <div className="max-h-[450px] overflow-auto">
            <pre className="p-4 text-sm leading-relaxed">
              <code className="font-[JetBrains_Mono,monospace] text-[13px]">{code}</code>
            </pre>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
