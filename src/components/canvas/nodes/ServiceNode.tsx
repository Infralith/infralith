import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Globe } from 'lucide-react';

export interface ServiceNodeData {
  label: string;
  serviceType: string;
  portMapping: string;
  healthy: boolean;
  [key: string]: unknown;
}

export function ServiceNode({ data, selected }: NodeProps) {
  const d = data as unknown as ServiceNodeData;
  return (
    <div
      className={`w-64 bg-surface/90 border-2 rounded-xl overflow-hidden transition-all ${
        selected ? 'border-node-service node-glow-primary' : 'border-node-service/60'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-node-service !w-2 !h-2" />

      <div className="bg-node-service/20 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-node-service" />
          <span className="text-xs font-bold uppercase tracking-wider text-node-service">
            Service
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-foreground mb-1">{d.label}</h3>
        <p className="text-[10px] text-muted-foreground font-mono">Type: {d.serviceType}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] text-muted">{d.portMapping}</span>
          {d.healthy && (
            <span className="text-[10px] text-success font-bold">Healthy</span>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-node-service !w-2 !h-2" />
    </div>
  );
}
