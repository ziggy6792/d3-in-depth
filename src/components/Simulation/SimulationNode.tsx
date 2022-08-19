/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { NodeInterface } from 'src/components/ForceGraph';
import { TSelection } from 'src/d3Types';
import { useSimulationContext } from './SimulaitionProvider';

interface ISimulationNodeProps {
  node: NodeInterface;
}

const selectedColor = '#85054d';
const unselectedColor = '#18295e';

const SimulationNode: React.FC<ISimulationNodeProps> = ({ node }) => {
  const { activeNode } = useSimulationContext();

  const svgRef = useRef(null);
  const [svg, setSvg] = useState<null | TSelection>(null);

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }
    svg
      .select('rect')
      .transition()
      .duration(500)
      .attr('fill', activeNode === node.data.id ? selectedColor : unselectedColor);
  }, [activeNode, svg]);

  return (
    <svg ref={svgRef}>
      <rect width={60} height={60} rx={20}></rect>
      <text fill='white' x={30} y={30} textAnchor='middle' dominantBaseline='middle' fontSize='2em'>
        {node.data.name}
        {node.index}
      </text>
    </svg>
  );
};

export default SimulationNode;
