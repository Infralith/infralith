export interface Position {
  x: number;
  y: number;
}

export interface FlowNode {
  id: string;
  type: string;
  label: string;
  position: Position;
  data: Record<string, unknown>;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}
