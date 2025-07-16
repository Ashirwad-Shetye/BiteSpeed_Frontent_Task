import { Node } from 'reactflow';

// Data structure for custom node data, allowing for extensible properties
export interface CustomNodeData {
  label: string;
  [key: string]: unknown; // Additional properties for extensibility
}

// Type alias for a custom node, using React Flow's Node type
export type CustomNode = Node<CustomNodeData, string>;

// Interface for custom edge structure between nodes
export interface CustomEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}