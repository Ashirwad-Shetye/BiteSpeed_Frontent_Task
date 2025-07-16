// This component displays draggable node types.
// Users can drag a node type from this panel into the flow area to add a new node.

"use client"

import { Icons } from "../ui/Icons";

export default function NodesPanel() {

	// Handles the drag start event for a node type
	const onDragStart = (event: React.DragEvent, nodeType: string) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div className='h-full grid grid-cols-2 p-4 gap-4'>
			{/* Draggable Message Node */}
			<div
				className='p-5 border h-fit flex flex-col gap-3 items-center justify-center border-primary text-primary rounded bg-white cursor-grab hover:bg-gray-100 transition-colors'
				draggable
				onDragStart={(event) => onDragStart(event, "textNode")}
			>
				<Icons.message />
				<span className='text-sm font-semibold'>Message</span>
			</div>
		</div>
	);
}
