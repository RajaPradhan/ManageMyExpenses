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
      this.renderDonutChart(nextProps);
    }
  }

  renderDonutChart(nextProps) {
    this.svgContainer = select(document.getElementsByClassName('donutChartSvgContainer')[0]);
    this.svgContainer.select('.donutG').remove();
    this.svgContainer.selectAll('.legendG').remove();

    const color = scaleOrdinal(schemeCategory10);

    const arc = shape.arc()
      .outerRadius(100)
      .innerRadius(60);

    const group = this.svgContainer.append("g")
      .classed("donutG", true)
      .attr("transform", "translate(" + 230 + "," + 170 + ")")

    const arcs = shape.pie().value((d) => { return d.total; })(nextProps.data);

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

    // Create the legend
    const legendG = this.svgContainer.selectAll(".legendG")
      .data(nextProps.data)
      .enter()
      .append("g")
      .classed("legendG", true)
      .attr("transform", (d, i) => {
        return "translate(" + 450 + "," + (i * 40 + 100) + ")";
      })
      //.classed("legend", true);

    legendG.append("rect")
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", function(d, i) {
        return color(i);
      });

    legendG.append("text")
      .text(function(d){
        return `${d._id} ($${d.total})`;
      })
      .style("font-size", '1em')
      .style("font-family", "Roboto, sans-serif")
      .attr("y", 20)
      .attr("x", 40);
  }

  render() {
    return (
      <svg
        width="100%"
        height="350"
        style={{border: '1px solid'}}
        className="donutChartSvgContainer"
      />
    );
  }
}
