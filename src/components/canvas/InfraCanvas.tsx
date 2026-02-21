import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ServiceNode } from './nodes/ServiceNode';
import { DeploymentNode } from './nodes/DeploymentNode';
import { PodNode } from './nodes/PodNode';
import { CanvasControls } from './CanvasControls';
import { useAppStore } from '@/store/app.store';

const initialNodes: Node[] = [
  {
    id: 'service-1',
    type: 'serviceNode',
    position: { x: 100, y: 200 },
    data: {
      label: 'frontend-lb',
      serviceType: 'LoadBalancer',
      portMapping: 'Port 80 → 8080',
      healthy: true,
    },
  },
  {
    id: 'deployment-1',
    type: 'deploymentNode',
    position: { x: 480, y: 160 },
    data: {
      label: 'web-frontend',
      replicas: 3,
      cpuPercent: 12,
    },
  },
  {
    id: 'pod-1',
    type: 'podNode',
    position: { x: 840, y: 350 },
    data: {
      label: 'web-frontend-a1b2c',
      status: 'Running',
      uptime: '4m 12s',
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e-svc-deploy',
    source: 'service-1',
    target: 'deployment-1',
    animated: true,
    style: { stroke: '#1152d4', strokeWidth: 2 },
  },
  {
    id: 'e-deploy-pod',
    source: 'deployment-1',
    target: 'pod-1',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
];

export function InfraCanvas() {
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const nodeTypes = useMemo(
    () => ({
      serviceNode: ServiceNode,
      deploymentNode: DeploymentNode,
      podNode: PodNode,
    }),
    [],
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);

      // Track selection
      for (const change of changes) {
        if (change.type === 'select' && change.selected) {
          setSelectedNodeId(change.id);
        }
      }
    },
    [onNodesChange, setSelectedNodeId],
  );

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
    },
    [onEdgesChange],
  );

  return (
    <main className="flex-1 relative canvas-grid">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        className="!bg-transparent"
      >
        <Background variant={BackgroundVariant.Dots} gap={30} size={1} color="#1e293b" />
        <CanvasControls />
      </ReactFlow>
    </main>
  );
}
