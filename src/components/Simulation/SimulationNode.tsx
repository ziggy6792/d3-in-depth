import { NodeInterface } from 'src/components/ForceGraph';

interface ISimulationNodeProps {
  node: NodeInterface;
}

const SimulationNode: React.FC<ISimulationNodeProps> = ({ node }) => {
  return (
    <g>
      <rect width={60} height={60} fill='#fff'></rect>
      <text y='10' fill='red'>
        {node.details.name}
      </text>
    </g>
  );
};

export default SimulationNode;
