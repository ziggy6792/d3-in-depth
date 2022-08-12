import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
// import { BaseType, Selection } from 'd3-selection';
// import { scaleLinear } from 'd3-scale';
// import { drag } from 'd3-drag';
// import { interpolate } from 'd3-interpolate';
import * as d3 from 'd3';
import './DragSliderAnimation.css';

const margin = { right: 50, left: 50 };

const DragSlider2: React.FC = () => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [svg, setSvg] = useState<null | d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(null);

  const [moving, setMoving] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  // const [timer, setTimer] = useState(null);

  const [handle, setHandle] = useState(null);
  // const [x, setX] = useState(null);
  // const [width, setWidth] = useState(null);

  const [slider, setSlider] = useState<d3.Selection<SVGGElement, unknown, null, undefined>>(null);

  const { width, height } = useMemo(() => {
    if (!svg) {
      return {};
    }
    return { width: +svg.attr('width') - margin.left - margin.right, height: +svg.attr('height') };
  }, [svg]);

  const x = useMemo(() => {
    return d3.scaleLinear().domain([0, 180]).range([0, width]).clamp(true);
  }, [svg]);

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }
    // svg.append('rect').attr('width', 200).attr('height', 200).attr('fill', 'blue');

    const d3Slider = svg
      .append('g')
      .attr('class', 'slider')
      .attr('transform', 'translate(' + margin.left + ',' + height / 2 + ')');

    d3Slider
      .append('line')
      .attr('class', 'track')
      .attr('x1', x.range()[0])
      .attr('x2', x.range()[1])
      .select(function () {
        // ToDo: fix any
        return this!.parentNode.appendChild(this.cloneNode(true)) as any;
      })
      .attr('class', 'track-inset')
      .select(function () {
        return this!.parentNode.appendChild(this.cloneNode(true));
      })
      .attr('class', 'track-overlay')
      .call(
        d3.drag().on('drag', function (event) {
          const me = d3.select(this);
          setCurrentValue(x(x.invert(event.x)));
          setMoving(false);
        })
      );

    d3Slider
      .insert('g', '.track-overlay')
      .attr('class', 'ticks')
      .attr('transform', 'translate(0,' + 18 + ')')
      .selectAll('text')
      .data(x.ticks(10))
      .enter()
      .append('text')
      .attr('x', x)
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d;
      });

    d3Slider
      .transition() // Gratuitous intro!
      .duration(750);
    // .tween('hue', function () {
    //   var i = d3.interpolate(0, 0);
    //   return function (t) {
    //     hue(i(t));
    //   };
    // });

    setSlider(d3Slider);
  }, [svg]);

  useEffect(() => {
    if (!slider) return;

    let handle = slider.insert('circle', '.track-overlay').attr('class', 'handle').attr('r', 9);

    let label = slider
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .text('0')
      .attr('transform', 'translate(0,' + -25 + ')');

    handle.attr('cx', x(x.invert(currentValue)));
    label.attr('x', x(x.invert(currentValue))).text(Math.floor(currentValue));
    svg.style('background-color', d3.hsl(currentValue, 0.8, 0.8) as any);

    return () => {
      label.remove();
      handle.remove();
    };
  }, [currentValue, slider]);

  useEffect(() => {
    if (!svg) return;
    let timer = null;
    let currValInternal: number = currentValue;
    let targetValue = width;
    const step = () => {
      currValInternal = currValInternal + targetValue / 151;
      setCurrentValue(currValInternal);
    };
    if (moving) {
      timer = setInterval(step, 100);
    }
    return () => {
      clearInterval(timer);
    };
  }, [moving]);

  return (
    <div>
      <svg ref={svgRef} width='960' height='500'></svg>
      <button
        id='play-button'
        onClick={() => {
          setMoving((prevValue) => !prevValue);
        }}>
        {moving ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default DragSlider2;
