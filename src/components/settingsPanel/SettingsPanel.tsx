// This component provides a panel for editing the label of a selected node in the chatbot flow builder.
// It allows users to update the node's label and cancel changes. It is shown when a node is selected.

"use client";

import { CustomNode } from "@/types";
import { Icons } from "../ui/Icons";
import { useState, useEffect } from "react";

// Props for the SettingsPanel component
interface SettingsPanelProps {
	selectedNode: CustomNode | null;
	onCancel: () => void;
	onLabelChange: (label: string) => void;
}

export default function SettingsPanel({
	selectedNode,
	onCancel,
	onLabelChange,
}: SettingsPanelProps ) {
	
	const [tempLabel, setTempLabel] = useState<string>("");

	// Update the tempLabel when the selected node changes
	useEffect(() => {
		if (selectedNode) {
			setTempLabel(selectedNode.data.label);
		}
	}, [selectedNode]);

	// Handle changes to the textarea and propagate them up
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newLabel = event.target.value;
		setTempLabel(newLabel);
		onLabelChange(newLabel);
	};

	// Handle cancel button click, resetting the label and calling onCancel
	const handleCancelClick = () => {
		setTempLabel(selectedNode?.data.label || "");
		onCancel();
	};

	return (
		<div>
			{/* Header with back button and title */}
			<div className='w-full relative h-8 flex text-black items-center border-b border-gray-300'>
				<button
					className='h-full px-3 absolute top-0 left-0 z-20 cursor-pointer'
					onClick={handleCancelClick}
				>
					<Icons.arrowLeft />
				</button>
				<h3 className='text-sm text-center w-full'>Message</h3>
			</div>

			{/* Editable area for the selected node */}
			{selectedNode ? (
				<div className='p-4 border-b border-gray-300'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Text
					</label>
					<textarea
						value={tempLabel}
						onChange={handleChange}
						className='w-full p-1 text-sm text-black border border-gray-300 h-20 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>
			) : (
				<p className='text-sm text-gray-500'>Select a node to edit</p>
			)}
		</div>
	);
}
