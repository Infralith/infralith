import { Plus, Minus, Maximize2 } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

export function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
      <button
        onClick={() => zoomIn()}
        className="w-10 h-10 bg-surface border border-border rounded flex items-center justify-center hover:bg-surface-alt transition-colors cursor-pointer"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={() => zoomOut()}
        className="w-10 h-10 bg-surface border border-border rounded flex items-center justify-center hover:bg-surface-alt transition-colors cursor-pointer"
      >
        <Minus size={16} />
      </button>
      <button
        onClick={() => fitView({ padding: 0.3 })}
        className="w-10 h-10 bg-surface border border-border rounded flex items-center justify-center hover:bg-surface-alt transition-colors cursor-pointer"
      >
        <Maximize2 size={16} />
      </button>
    </div>
  );
}
