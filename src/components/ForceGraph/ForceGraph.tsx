import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { D3DragEvent, SimulationLinkDatum } from 'd3';
import { NodeInterface, GraphElements } from './types';
import { useSimulationContext } from 'src/components/Simulation/SimulaitionProvider';
import { TSelection } from 'src/d3Types';

type CardSVG = d3.Selection<SVGSVGElement, NodeInterface, d3.BaseType, unknown>;

type Simulation = d3.Simulation<NodeInterface, SimulationLinkDatum<NodeInterface>>;

type DragEvent = D3DragEvent<SVGCircleElement, NodeInterface, NodeInterface>;

const selectedColor = '#85054d';
const unselectedColor = '#18295e';

const generateCard = (cardElement: CardSVG) => {
  const cardGroup = cardElement.append('g');

  // Card Background
  cardGroup
    .append('rect')
    .classed('fund-label-card', true)
    .attr('fill', (d) => unselectedColor)
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('rx', 20);

  // Card Contents
  const textOffset = 20;
  const initialOffset = 30;

  cardGroup
    .append('text')
    .attr('transform', 'translate(25, ' + (textOffset * 0 + initialOffset) + ')')
    .text((d) => d?.details?.name || null);

  cardGroup.selectAll('text').style('fill', 'white');
};

interface FundGraphGeneratorProps {
  graphElements: GraphElements;
}

const nodeWidth = 60;
const nodeHeight = 60;

const svgHeight = 800;

export const ForceGraph: React.FC<FundGraphGeneratorProps> = ({ graphElements }) => {
  const svgRef = useRef(null);
  const [svg, setSvg] = useState<null | TSelection>(null);

  const { activeNode } = useSimulationContext();

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }

    const updateGraph = async () => {
      const links = graphElements.links.map((d) => Object.assign({}, d));
      const nodes = graphElements.nodes.map((d) => Object.assign({}, d));
      const drag = (simulation: Simulation) => {
        function dragStarted(event: DragEvent) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }

        function dragged(event: D3DragEvent<SVGCircleElement, NodeInterface, NodeInterface>) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragEnded(event: D3DragEvent<SVGCircleElement, NodeInterface, NodeInterface>) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }

        return d3.drag<SVGCircleElement, NodeInterface>().on('start', dragStarted).on('drag', dragged).on('end', dragEnded);
      };

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id((d: any) => d.id)
            .distance(240)
        )
        .force('charge', d3.forceManyBody().strength(-240))
        .force('collide', d3.forceCollide(150))
        .force('center', d3.forceCenter(window.innerWidth / 2, svgHeight / 2));

      const link = svg
        .select('#graph-links')
        .attr('stroke', '#FFF')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join(
          (enter) => enter.append('line'),
          (update) => update,
          (exit) => exit.remove()
        )
        .attr('stroke-width', (d: any) => Math.sqrt(d.value));

      const nodeG = svg
        .selectAll('.node')
        .data(nodes)
        .join('g')
        .attr('class', 'node')
        .call(drag(simulation) as any);

      simulation.on('tick', () => {
        // link
        //   .attr('x1', (d: any) => d.source.x)
        //   .attr('y1', (d: any) => d.source.y)
        //   .attr('x2', (d: any) => d.target.x)
        //   .attr('y2', (d: any) => d.target.y);

        // node.attr('x', (d) => (d.x ? (d.x as number) - nodeWidth / 2 : 0)).attr('y', (d) => (d.y ? (d.y as number) - nodeHeight / 2 : 0));

        nodeG.attr('transform', (d) => {
          return `translate(${d.x},${d.y})`;
        });

        nodeG.selectAll('circle').data(['']).join('circle').attr('r', 10);

        svg
          .selectAll('.link')
          .data(links)
          .join('line')
          .attr('class', 'link')
          .attr('stroke', 'black')
          .attr('fill', 'none')
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);
      });
    };
    updateGraph();
  }, [graphElements, svg]);

  useEffect(() => {
    if (!svg) return;
    svg
      .selectAll('.fund-label-card')
      .data(graphElements.links)
      .join('rect')
      .transition()
      .duration(500)
      .attr('fill', (d, index) => (index === activeNode ? selectedColor : unselectedColor));
  }, [activeNode, svg, graphElements]);

  return (
    <>
      <svg ref={svgRef} width={'100%'} height={svgHeight} id='graph-svg'>
        <g id='graph-links' stroke='#999' strokeOpacity='0.6'></g>
        <g id='graph-nodes'></g>
        <g id='graph-labels'></g>
        {graphElements.nodes.map((link) => (
          <g className='node-rect'>
            <rect width={50} height={50} fill='#fff'></rect>
            <text y='10' fill='red'>
              I love SVG!
            </text>
          </g>
        ))}
      </svg>
    </>
  );
};
