import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Layers } from 'lucide-react';

export interface DeploymentNodeData {
  label: string;
  replicas: number;
  cpuPercent: number;
  [key: string]: unknown;
}

export function DeploymentNode({ data, selected }: NodeProps) {
  const d = data as unknown as DeploymentNodeData;
  return (
    <div
      className={`w-64 bg-surface/90 border rounded-xl overflow-hidden transition-all ${
        selected ? 'border-node-deploy node-glow-deploy' : 'border-border-light hover:border-node-deploy'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-node-deploy !w-2 !h-2" />

      <div className="bg-node-deploy/10 px-3 py-2 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-node-deploy" />
          <span className="text-xs font-bold uppercase tracking-wider text-node-deploy">
            Deployment
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-foreground mb-1">{d.label}</h3>

        {/* Replica dots */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex -space-x-1">
            {Array.from({ length: d.replicas }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-success border border-surface"
              />
            ))}
          </div>
          <span className="text-[10px] text-muted">{d.replicas} Replicas</span>
        </div>

        {/* CPU gauge */}
        <div className="mt-4 bg-surface-alt/50 rounded p-2 border border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground uppercase">CPU</span>
            <span className="text-[10px] text-muted">{d.cpuPercent}%</span>
          </div>
          <div className="w-full bg-border-light h-1 rounded-full overflow-hidden">
            <div
              className="bg-node-deploy h-full transition-all"
              style={{ width: `${d.cpuPercent}%` }}
            />
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-node-deploy !w-2 !h-2" />
    </div>
  );
}
