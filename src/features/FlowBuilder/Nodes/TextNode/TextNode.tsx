import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useCallback } from "react";

export function TextUpdaterNode(props: NodeProps) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className='border border-gray-300 bg-[#262626] p-3 w-50 rounded-md' key={props.id}>
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col gap-2"> 
        <label className="text-xs text-white-700" htmlFor="text">CustomText Node:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag border border-gray-300 rounded-md p-2 w-full text-[10px] text-white-700" />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}