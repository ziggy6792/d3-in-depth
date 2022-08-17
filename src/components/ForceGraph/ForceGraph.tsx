import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { D3DragEvent, SimulationLinkDatum } from 'd3';
import { NodeInterface, GraphElements } from './types';
import { useSimulationContext } from 'src/components/Simulation/SimulaitionProvider';
import { TSelection } from 'src/d3Types';

type CardSVG = d3.Selection<SVGSVGElement, NodeInterface, d3.BaseType, unknown>;

type Simulation = d3.Simulation<NodeInterface, SimulationLinkDatum<NodeInterface>>;

type DragEvent = D3DragEvent<SVGCircleElement, NodeInterface, NodeInterface>;

const generateCard = (cardElement: CardSVG) => {
  const cardGroup = cardElement.append('g');

  // Card Background
  cardGroup
    .append('rect')
    .classed('fund-label-card', true)
    .attr('fill', (d) => '#18295e')
    .attr('width', width)
    .attr('height', height)
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

const width = 60;
const height = 60;

export const ForceGraph: React.FC<FundGraphGeneratorProps> = ({ graphElements }) => {
  const svgRef = useRef(null);
  const [svg, setSvg] = useState<null | TSelection>(null);

  const { time } = useSimulationContext();

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
        .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

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

      const node = svg
        .select('#graph-nodes')
        .selectAll('svg')
        .data(nodes)
        .join(
          (enter) => {
            const cardSVG = enter.append('svg').attr('width', width).attr('height', height);
            generateCard(cardSVG);
            return cardSVG;
          },
          (update) => {
            // Redraw the card
            update.html('');
            generateCard(update as unknown as CardSVG);
            return update;
          },
          (exit) => exit.remove()
        )
        .call(drag(simulation) as any);

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node.attr('x', (d) => (d.x ? (d.x as number) - width / 2 : 0)).attr('y', (d) => (d.y ? (d.y as number) - height / 2 : 0));
      });
    };
    updateGraph();
  }, [graphElements, svg]);

  // useEffect(() => {
  //   if (!svg) return;

  //   const labels = svg.selectAll('.fund-label-card').attr('width', time);
  // }, [time, svg]);

  return (
    <>
      <svg ref={svgRef} width={'100%'} height={1000} id='graph-svg'>
        <g id='graph-links' stroke='#999' strokeOpacity='0.6'></g>
        <g id='graph-nodes'></g>
        <g id='graph-labels'></g>
      </svg>
    </>
  );
};
