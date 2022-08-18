/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import useInterval from 'src/hooks/useInterval';
import { TSelection } from 'src/d3Types';
import { makeStyles } from 'src/makeStyles';
import { Button } from '@mui/material';

const margin = { right: 50, left: 50 };

interface IDragSliderProps {
  value: number;
  onChange: (value: number) => void;
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
  slider: {},
  trackLines: {},
}));

const DragSliderAnimation: React.FC<IDragSliderProps> = ({ value, onChange }) => {
  // Maybe don't need this
  const [svg, setSvg] = useState<null | TSelection>(null);

  const svgRef = useRef<null | SVGSVGElement>(null);
  const handleRef = useRef<null | SVGCircleElement>(null);
  const labelRef = useRef<null | SVGTextElement>(null);
  const sliderRef = useRef<null | SVGGElement>(null);

  const [moving, setMoving] = useState(false);

  const { classes, cx } = useStyles();

  // ToDo: move memos to hook
  const { width, height } = useMemo(() => {
    if (!svg) {
      return {};
    }
    return { width: +svg.attr('width') - margin.left - margin.right, height: +svg.attr('height') };
  }, [svg]);

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 180]).range([0, width]).clamp(true);
  }, [svg]);

  const updateSlider = useCallback(
    (newValue: number) => {
      if (!svg) return;
      // svg.style('background-color', d3.hsl(newValue, 0.8, 0.8) as any);
      d3.select(handleRef.current).attr('cx', xScale(newValue));
      d3.select(labelRef.current).attr('x', xScale(newValue)).text(Math.floor(newValue));
      onChange(newValue);
    },
    [svg]
  );

  // Draw initial d3
  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }

    const slider = svg.select(`.${classes.slider}`).attr('transform', 'translate(' + margin.left + ',' + height / 2 + ')');

    slider
      .selectAll(`.${classes.ticks}`)
      .attr('transform', 'translate(0,' + 18 + ')')
      .selectAll('text')
      .data(xScale.ticks(10))
      .join('text')
      .attr('x', xScale)
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d;
      });

    const trackLines = svg.select(`.${classes.trackLines}`);

    trackLines.call(
      d3.drag().on('drag', function (event) {
        updateSlider(xScale.invert(event.x));
        setMoving(false);
      })
    );

    // cool effect but remove for mow
    // d3.transition() // Gratuitous intro!
    //   .duration(750)
    //   .tween('hue', function () {
    //     var i = d3.interpolate(20, 0);
    //     return function (t) {
    //       updateSlider(i(t));
    //     };
    //   });

    svg.attr('opacity', 1);

    updateSlider(0);
  }, [svg]);

  useInterval(() => {
    if (moving) {
      let newSliderValue: number = value + xScale.domain()[1] / 100;
      if (newSliderValue > xScale.domain()[1]) {
        setMoving(false);
        newSliderValue = 0;
      }
      updateSlider(newSliderValue);
    }
  }, 100);

  return (
    <div>
      <svg ref={svgRef} width='960' height='200' opacity={0}>
        <g ref={sliderRef} className={classes.slider}>
          <g className={classes.trackLines}>
            {[classes.track, classes.trackInset, classes.trackOverlay].map((className) => (
              <line key={className} x1={xScale.range()[0]} x2={xScale.range()[1]} className={cx(className, classes.trackLine)} />
            ))}
            <circle ref={handleRef} r={9} className={classes.handle}></circle>
          </g>
          <g className={classes.ticks}></g>
          <text ref={labelRef} className={classes.label} textAnchor='middle' transform={'translate(0,' + -25 + ')'}></text>
        </g>
      </svg>
      <Button
        variant='contained'
        onClick={() => {
          setMoving((prevValue) => !prevValue);
        }}
      >
        {moving ? 'Pause' : 'Play'}
      </Button>
    </div>
  );
};

export default DragSliderAnimation;
