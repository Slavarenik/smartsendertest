import { useCallback, useRef, useState } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  ReactFlowProvider,
  Controls,
  MiniMap,
} from '@xyflow/react';

import { initialNodes, initialEdges } from '../Utils/MockupData';
import { nodeTypes } from '../NodeTypes';
import { ContextMenu } from './ContextMenu';

type TconnectingNodeWithHandle = { nodeId: string, handleId: string, handleType: string };

export const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeWithHandle = useRef<TconnectingNodeWithHandle | null>(null);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null);

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onConnectStart = useCallback((_: React.MouseEvent, { nodeId, handleId, handleType }: TconnectingNodeWithHandle) => {
    connectingNodeWithHandle.current = { nodeId, handleId, handleType };
  }, [connectingNodeWithHandle]);

  const onConnectEnd = useCallback(
    (event: any, connectionState: any) => {      
      if (!connectionState.isValid) {
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
      }
    },
    [screenToFlowPosition],
  );

  const addNode = (node: Node) => {
    setContextMenuPosition(null);
    setNodes((nds) => nds.concat({...node, position: screenToFlowPosition({x: node.position.x, y: node.position.y})}));
    setEdges((eds) =>
      eds.concat({ 
        id: `${connectingNodeWithHandle.current?.nodeId}-${node.id}`,
        source: connectingNodeWithHandle.current?.nodeId as string,
         target: node.id
      }),
    );
    connectingNodeWithHandle.current = null;
  }

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>      
      {contextMenuPosition && <ContextMenu position={contextMenuPosition} addNode={addNode} />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onConnectStart={onConnectStart as any}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[10, 10]}        
        fitViewOptions={{ padding: 2 }}
        // nodeOrigin={nodeOrigin}
        colorMode="system"
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
};


export default () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);