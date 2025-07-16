// Ensures there are not multiple root nodes (nodes without incoming edges).

import { CustomEdge, CustomNode } from '@/types';

/**
 * Validates the chatbot flow to ensure only one root node exists.
 * @param nodes - Array of all nodes in the flow
 * @param edges - Array of all edges in the flow
 * @returns An error object if validation fails, or null if valid
 */

export function validateFlow(nodes: CustomNode[], edges: CustomEdge[]): {
  label: string;
  description: string;
} | null {
  // If there is only one or zero nodes, no validation needed
  if (nodes.length <= 1) return null;

  // Find nodes that do not have any incoming edges (potential roots)
  const nodesWithEmptyTargetHandles = nodes.filter(
    (node) => !edges.some((edge) => edge.target === node.id)
  );

  // If more than one root node exists, return an error
  if (nodesWithEmptyTargetHandles.length > 1) {
    return {
      label: 'Cannot save Flow',
      description: 'Multiple nodes with empty target handles detected',
    };
  }

  // Flow is valid
  return null;
}