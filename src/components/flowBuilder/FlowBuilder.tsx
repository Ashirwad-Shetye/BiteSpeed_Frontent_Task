// Main component for building chatbot flows using React Flow. Handles node and edge management, drag-and-drop, selection, and validation.

"use client";

import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
	addEdge,
	Background,
	Controls,
	Node,
	Connection,
	useNodesState,
	useEdgesState,
	MarkerType,
	reconnectEdge,
	applyEdgeChanges,
	EdgeChange,
} from "reactflow";
import TextNode from "../nodes/TextNode";
import NodesPanel from "../nodesPanel/NodesPanel";
import SettingsPanel from "../settingsPanel/SettingsPanel";
import { CustomEdge, CustomNode, CustomNodeData } from "@/types";
import { validateFlow } from "@/utils/flowValidation";
import "reactflow/dist/style.css";
import { toast } from "sonner";

// Node types mapping for React Flow
const nodeTypes = {
	textNode: TextNode,
};

export default function FlowBuilder() {
	const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);
	const [edges, setEdges, _onEdgesChange] = useEdgesState<CustomEdge>([]);
	const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
	const [isInitialRender, setIsInitialRender] = useState(true);
	const [ tempLabel, setTempLabel ] = useState<string>( "" );
	
	// Track if this is the initial render for fitView
	useEffect(() => {
		if (nodes.length > 0) {
			setIsInitialRender(false);
		}
	}, [nodes]);

	// Handle dropping a new node onto the canvas
	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();
			const reactFlowBounds = event.currentTarget.getBoundingClientRect();
			const type = event.dataTransfer.getData("application/reactflow");

			if (!type) return;

			const position = {
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			};

			const newNode: CustomNode = {
				id: `${+new Date()}`,
				type,
				position,
				data: { label: "New node" },
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[setNodes]
	);

	// Handle connecting two nodes with an edge
	const onConnect = useCallback(
		(params: Connection) => {
			const sourceHasEdge = edges.some((edge) => edge.source === params.source);
			if (sourceHasEdge) {
				toast.info("Source handle can only have one outgoing edge");
				return;
			}
			setEdges((eds) =>
				addEdge(
					{
						...params,
						markerEnd: {
							type: MarkerType.ArrowClosed,
						},
					},
					eds
				)
			);
		},
		[edges, setEdges]
	);

	// Handle node selection (click)
	const onNodeClick = useCallback((_: unknown, node: Node) => {
		setSelectedNode(node as CustomNode);
		setTempLabel((node as CustomNode).data.label);
	}, []);

	// Update the label of a node by id
	const updateNodeLabel = useCallback(
		(id: string, label: string) => {
			setNodes((nds) =>
				nds.map((node) =>
					node.id === id ? { ...node, data: { ...node.data, label } } : node
				)
			);
			setSelectedNode((prev) =>
				prev && prev.id === id
					? { ...prev, data: { ...prev.data, label } }
					: prev
			);
		},
		[setNodes]
	);

	// Handle label change in the settings panel
	const handleLabelChange = useCallback((label: string) => {
		setTempLabel(label);
	}, []);

	// Save the flow, validate, and show notifications
	const onSave = useCallback(() => {
		// Apply tempLabel to the selected node if it exists and has changed
		if (selectedNode && tempLabel !== selectedNode.data.label) {
			updateNodeLabel(selectedNode.id, tempLabel);
		}

		// Validate the flow
		const error = validateFlow(nodes, edges);
		if (error) {
			toast.error(error.label, {
				description: error.description,
			});
			return;
		}

		toast.success("Flow saved successfully!");
		setSelectedNode(null);
		setTempLabel("");
	}, [nodes, edges, selectedNode, tempLabel, updateNodeLabel]);

	// Cancel editing and reset selection
	const handleCancel = useCallback(() => {
		setSelectedNode(null);
		setTempLabel("");
	}, []);

	// Reset the entire flow (nodes and edges)
	const handleReset = useCallback(() => {
		setNodes([]);
		setEdges([]);
		setSelectedNode(null);
		setTempLabel("");
	}, [setNodes, setEdges]);

    // Handle edge changes (delete, update, etc.)
    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }, [setEdges]);

    // Handle edge reconnection (moving edge to new source/target or dropping to remove)
    const onReconnect = useCallback((oldEdge: CustomEdge, newConnection: Connection | null) => {
        // If newConnection is null, remove the edge
        if (!newConnection || !newConnection.source || !newConnection.target) {
            setEdges((eds) => eds.filter((e) => e.id !== oldEdge.id));
        } else {
            setEdges((eds) => reconnectEdge(oldEdge, newConnection, eds));
        }
    }, [setEdges]);

	return (
		<div className='flex flex-col h-screen relative overflow-hidden'>
			{/* Top bar with Save button */}
			<div className='w-full bg-gray-100 py-2 px-20 shadow flex items-center justify-end'>
				<button
					onClick={onSave}
					className='bg-white cursor-pointer hover:shadow duration-200 text-primary font-semibold border border-[#5e69bb] px-10 py-1 rounded-md transition-colors focus:outline-none'
				>
					Save Changes
				</button>
			</div>
			<div className='flex-1 flex'>
				{/* ReactFlow viewport */}
				<div className='flex-grow relative'>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onReconnect={onReconnect}
						onConnect={onConnect}
						onDrop={onDrop}
						onDragOver={(event) => event.preventDefault()}
						onNodeClick={onNodeClick}
						nodeTypes={nodeTypes}
						fitView={isInitialRender}
						fitViewOptions={{ maxZoom: 1, minZoom: 0.1 }}
						defaultViewport={{ x: 0, y: 0, zoom: 1 }}
						className='bg-white'
					>
						<Background
							color='#aaa'
							gap={20}
						/>
						<Controls />
						{/* Reset Button Overlay */}
						<div className='absolute bottom-5 right-5 z-10'>
							<button
								onClick={handleReset}
								className='bg-white cursor-pointer hover:shadow text-primary font-semibold border border-[#5e69bb] px-3 py-1 rounded shadow focus:outline-none transition-colors duration-200'
							>
								Reset
							</button>
						</div>
					</ReactFlow>
				</div>
				<div className='min-w-72 w-80 max-w-[40%] border-l border-t border-gray-300 bg-white h-full'>
					{/* Show SettingsPanel if a node is selected, otherwise show NodesPanel */}
					{selectedNode ? (
						<SettingsPanel
							selectedNode={selectedNode}
							onCancel={handleCancel}
							onLabelChange={handleLabelChange}
						/>
					) : (
						<NodesPanel />
					)}
				</div>
			</div>
		</div>
	);
}
