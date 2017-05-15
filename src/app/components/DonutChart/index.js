import React, { Component } from 'react';

import { select } from 'd3-selection';
import * as shape from 'd3-shape';
import { interpolate } from 'd3-interpolate';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';

export default class DonutChart extends Component {
  constructor(props) {
    super(props);

    this.svgContainer = '';
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.length) {
      this.renderDonutChart();
    }
  }

  renderDonutChart() {
    this.svgContainer = select(document.getElementById('donuChartSvgContainer'));
    this.svgContainer.select('.donutG').remove();
    
    const color = scaleOrdinal(schemeCategory10);

    const arc = shape.arc()
      .outerRadius(100)
      .innerRadius(60);

    const group = this.svgContainer.append("g")
      .classed("donutG", true)
      .attr("transform", "translate(" + 230 + "," + 170 + ")")

    const arcs = shape.pie()(this.props.data);

    arcs.forEach(function(d, i) {
      group.append("path")
        .attr("fill", color(i))
        .transition()
        .duration(2000)
        .attrTween("d", function() {
        let start = {startAngle: 0, endAngle: 0};
        let interpolator = interpolate(start, d);
        return function(t) {
          return arc(interpolator(t));
        };
      })
    });
  }

  render() {
    return (
      <svg width="100%" height="350" style={{border: '1px solid'}} id="donuChartSvgContainer">
      </svg>
    );
  }
}
