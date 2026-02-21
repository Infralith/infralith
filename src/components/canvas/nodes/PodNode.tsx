import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Hexagon } from 'lucide-react';

export interface PodNodeData {
  label: string;
  status: 'Running' | 'Pending' | 'Failed';
  uptime: string;
  [key: string]: unknown;
}

export function PodNode({ data, selected }: NodeProps) {
  const d = data as unknown as PodNodeData;

  const statusColor =
    d.status === 'Running'
      ? 'bg-success'
      : d.status === 'Pending'
        ? 'bg-warning'
        : 'bg-danger';

  return (
    <div
      className={`w-56 bg-surface/90 border rounded-xl overflow-hidden transition-all ${
        selected ? 'border-node-pod/50 node-glow-success' : 'border-node-pod/30'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-node-pod !w-2 !h-2" />

      <div className="bg-node-pod/10 px-3 py-2 flex items-center gap-2 border-b border-border">
        <Hexagon size={14} className="text-node-pod" />
        <span className="text-xs font-bold uppercase tracking-wider text-node-pod">
          Pod Instance
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-xs font-mono text-foreground mb-2 truncate">{d.label}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex rounded-full h-2 w-2 ${statusColor}`} />
            <span className="text-[10px] text-muted">{d.status}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">{d.uptime}</span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-node-pod !w-2 !h-2" />
    </div>
  );
}
