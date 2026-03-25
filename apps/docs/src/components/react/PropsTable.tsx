import { Table } from '@rhinolabs/ui';

interface PropDef {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

interface PropsTableProps {
  data: PropDef[];
}

export function PropsTable({ data }: PropsTableProps) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border">
      <Table>
        <Table.Header>
          <Table.Row className="bg-muted/50">
            <Table.Head className="font-semibold">Prop</Table.Head>
            <Table.Head className="font-semibold">Type</Table.Head>
            <Table.Head className="font-semibold">Default</Table.Head>
            {data.some((d) => d.description) && (
              <Table.Head className="font-semibold">Description</Table.Head>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((prop) => (
            <Table.Row key={prop.name}>
              <Table.Cell>
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-[JetBrains_Mono,monospace]">
                  {prop.name}
                </code>
              </Table.Cell>
              <Table.Cell>
                <code className="text-sm font-[JetBrains_Mono,monospace] text-muted-foreground">
                  {prop.type}
                </code>
              </Table.Cell>
              <Table.Cell>
                {prop.default ? (
                  <code className="text-sm font-[JetBrains_Mono,monospace]">{prop.default}</code>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </Table.Cell>
              {data.some((d) => d.description) && (
                <Table.Cell className="text-sm text-muted-foreground">
                  {prop.description || '-'}
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
