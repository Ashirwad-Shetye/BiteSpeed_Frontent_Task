// Shows a message icon, label, and WhatsApp icon, with source and target handles for connections.
"use client";

import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Icons } from "../ui/Icons";

const TextNode = ({ data, selected }: NodeProps) => {
	return (
		<div
			className={`relative rounded-md shadow-md border min-w-[15rem] ${
				selected ? "border-blue-500" : "border-gray-300"
			} bg-white flex items-center`}
		>
			{/* Source handle for outgoing connections */}
			<Handle
				type='source'
				position={Position.Right}
				id='source'
				className='w-3 h-3 bg-green-500 rounded-full'
				style={{ right: "-6px", top: "50%", transform: "translateY(-50%)" }}
			/>
			<div className='flex-1'>
				{/* Node header with message and WhatsApp icons */}
				<div className='text-sm flex items-center justify-between font-semibold text-gray-700 bg-[#b3efe4] px-3 py-1 rounded-t-md'>
					<div className='flex items-center gap-2'>
						<Icons.message />
						<h1 className='text-gray-700'>Send Message</h1>
					</div>
					<div className='rounded-full p-1 bg-white text-green-600'>
						<Icons.whatsapp />
					</div>
				</div>
				{/* Node body with label */}
				<div className='w-full py-2 px-3 rounded-b-md text-sm outline-none text-black'>
					<p>{data.label ? data.label : "Text"}</p>
				</div>
			</div>
			{/* Target handle for incoming connections */}
			<Handle
				type='target'
				position={Position.Left}
				id='target'
				className='w-3 h-3 bg-gray-500 rounded-full'
				style={{ left: "-6px", top: "50%", transform: "translateY(-50%)" }}
			/>
		</div>
	);
};

export default TextNode;
