import * as d3 from 'd3';

export const easeInterpolate = (ease) => {
  return function (a, b) {
    var i = d3.interpolate(a, b);
    return function (t) {
      return i(ease(t));
    };
  };
};
