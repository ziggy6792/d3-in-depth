/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { TSelection } from 'src/d3Types';
import { makeStyles } from 'src/makeStyles';
import useResizeObserver from 'src/hooks/useResizeObserver';

const margin = { right: 50, left: 50 };

interface IDragSliderProps {
  value: number;
  onValueChanged: (value: number) => void;
  rangeMax: number;
  rangeMin?: number;
  ticks?: number;
  handleFormatter?: (value: number) => string;
}

const useStyles = makeStyles()(() => ({
  label: {
    fill: '#fff',
  },
  ticks: {
    fill: '#fff',
    fontSize: 10,
  },
  trackLine: {
    strokeLinecap: 'round',
  },
  handle: {
    fill: '#fff',
    stroke: '#000',
    strokeOpacity: 0.5,
    strokeWidth: 1.25,
  },
  track: {
    stroke: '#fff',
    strokeOpacity: 0.3,
    strokeWidth: 10,
  },
  trackInset: {
    stroke: '#dcdcdc',
    strokeWidth: 8,
  },
  trackOverlay: {
    pointerEvents: 'stroke',
    strokeWidth: 50,
    stroke: 'transparent',
    cursor: 'crosshair',
  },
  playButton: {
    width: 80,
  },
  slider: {},
  trackLines: {},
}));

const DragSliderAnimation: React.FC<IDragSliderProps> = ({
  value,
  onValueChanged,
  rangeMin = 0,
  rangeMax,
  ticks = 10,
  handleFormatter = (sliderValue) => Math.floor(sliderValue),
}) => {
  // Maybe don't need this
  const [svg, setSvg] = useState<null | TSelection>(null);

  const svgRef = useRef<null | SVGSVGElement>(null);
  const handleRef = useRef<null | SVGCircleElement>(null);
  const labelRef = useRef<null | SVGTextElement>(null);
  const sliderRef = useRef<null | SVGGElement>(null);

  const { classes, cx } = useStyles();

  const wrapperRef = useRef<null | HTMLDivElement>();
  const dimensions = useResizeObserver(wrapperRef) as { width: number; height: number };

  const xScale = useMemo(() => {
    if (!dimensions) return null;
    return d3
      .scaleLinear()
      .domain([rangeMin, rangeMax])
      .range([0, dimensions.width - margin.left - margin.right])
      .clamp(true);
  }, [dimensions]);

  useEffect(() => {
    if (!svg) return;
    if (!xScale) return;
    // update slider
    d3.select(handleRef.current).attr('cx', xScale(value));
    d3.select(labelRef.current).attr('x', xScale(value)).text(handleFormatter(value));
  }, [svg, value, xScale]);

  // Draw initial d3
  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }
    if (!dimensions) return;

    const { height } = dimensions;

    const slider = svg.select(`.${classes.slider}`).attr('transform', 'translate(' + margin.left + ',' + height / 2 + ')');

    slider
      .selectAll(`.${classes.ticks}`)
      .attr('transform', 'translate(0,' + 18 + ')')
      .selectAll('text')
      .data(xScale.ticks(ticks))
      .join('text')
      .attr('x', xScale)
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d;
      });

    const trackLines = svg.select(`.${classes.trackLines}`);

    trackLines.call(
      d3.drag().on('drag', function (event) {
        onValueChanged(xScale.invert(event.x));
      })
    );

    svg.attr('opacity', 1);
  }, [svg, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} width='100%' height={80} opacity={0}>
        <g ref={sliderRef} className={classes.slider}>
          <g className={classes.trackLines}>
            {xScale &&
              [classes.track, classes.trackInset, classes.trackOverlay].map((className) => (
                <line key={className} x1={xScale.range()[0]} x2={xScale.range()[1]} className={cx(className, classes.trackLine)} />
              ))}
            <circle ref={handleRef} r={9} className={classes.handle}></circle>
          </g>
          <g className={classes.ticks}></g>
          <text ref={labelRef} className={classes.label} textAnchor='middle' transform={'translate(0,' + -25 + ')'}></text>
        </g>
      </svg>
    </div>
  );
};

export default DragSliderAnimation;
