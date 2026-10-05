import { initialNodes } from "../Utils/MockupData";
import type { Node } from "@xyflow/react";

export const ContextMenu = ({ position, addNode }: { position: { x: number, y: number }, addNode: (node: Node) => void }) => {
  const handleAddNode = (node: Node) => {
    addNode({...node, id: `node_${Date.now()}`, position: { x: position.x, y: position.y }});
  };

  return (
    <div className="absolute w-200px border border-[#ccc] z-10 bg-white p-2 rounded-md shadow-md" style={{ top: position.y, left: position.x }}>
      <h1 className="text-sm font-medium text-gray-400 mb-2">Context Menu</h1>
      <ul className="space-y-1">
        {initialNodes.map((node) => (
          <li key={node.id} className="text-sm text-slate-600">
            <button onClick={() => handleAddNode(node)} className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-800 hover:bg-slate-800 hover:text-white hover:cursor-pointer">
              Add {node.type} Node
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};