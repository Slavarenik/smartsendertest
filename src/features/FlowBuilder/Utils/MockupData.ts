import type { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  { 
    id: 'n1',
    type: 'default',
    position: { x: 0, y: 0 },    
    data: { 
      label: 'Default',
      width: 200,
    }
  },  
  {
    id: 'n2',
    type: 'textNode',
    position: { x: 0, y: 100 },
    data: {  
      value: 'Message',
      width: 200,
    } 
  },
];

export const initialEdges: Edge[] = [
  { id: 'n1-n2', source: 'n1', target: 'n2' },  
];