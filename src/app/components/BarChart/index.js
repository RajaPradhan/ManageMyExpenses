import React, { Component } from 'react';

import { select } from 'd3-selection';
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import { transition } from 'd3-transition';

import _ from 'lodash';
import helpers from 'appPath/helpers';

import styles from './style.scss';

export default class BarChart extends Component {
  constructor(props) {
    super(props);

    this.svgContainer = '';
    this.svgContainerdimensions = {};
    this.xAxisLength = 0;
    this.yAxisLength = 0;
    this.margin = 50;
    this.xScale = '';
    this.yScale = '';
    this.xScaleBand = '';
    this.yScaleDomain = [0, 0];
  }

  // componentDidMount() {
  //   if(this.props.data.length) {
  //     this.renderBarChart();
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.length) {
      this.renderBarChart();
    }
  }

  renderBarChart() {
    this.svgContainer = select(document.getElementById('barChartSvgContainer'));
    this.svgContainerdimensions = document.getElementById('barChartSvgContainer').getBoundingClientRect();
    this.xAxisLength = this.svgContainerdimensions.width - 2 * this.margin;
    this.yAxisLength = this.svgContainerdimensions.height - 2 * this.margin;
    this.calculateYScaleRange();
    this.renderXAxis();
    this.renderYAxis();
    this.renderBars();
  }

  calculateYScaleRange() {
    const sortedData = _.sortBy(this.props.data, 'total');
    if(sortedData.length) {
      //this.yScaleDomain = [sortedData[sortedData.length-1].total, sortedData[0].total];
      this.yScaleDomain = [0, sortedData[sortedData.length-1].total];
    }
  }

  renderXAxis() {
    // this.xScale = scaleTime()
    //   .domain([new Date(2017, 0, 1), new Date()])
    //   .range([0, this.xAxisLength]);

    const months = _.slice(helpers.months, 0, _.indexOf(helpers.months, helpers.getCurrentMonth()) + 1);
    const monthsLowerCase = _.map(months, (month) => { return _.toLower(month) });

    this.xScale = scaleBand()
      .domain(monthsLowerCase)
      .range([0, this.svgContainerdimensions.width])
      .padding(0.6);

    // const xAxis = axisBottom(this.xScale)
    //   .ticks(5)
    //   .tickFormat(timeFormat("%B"));

    const xAxis = axisBottom(this.xScale)
      .tickValues(monthsLowerCase);
    this.svgContainer.select('.x-axis').remove();
    this.svgContainer.append("g")
        .classed("x-axis", true)
        .attr("transform", () => {
          return "translate(" + this.margin + "," + (this.svgContainerdimensions.height - this.margin) + ")";
        })
        .call(xAxis);

    this.xScaleBand = scaleBand()
      .domain(monthsLowerCase)
      .range([0, this.svgContainerdimensions.width])
      .padding(0.6);
  }

  renderYAxis() {
    this.yScale = scaleLinear()
      .domain(this.yScaleDomain)
      .range([0, this.yAxisLength]);

    // const yAxis = axisLeft(this.yScale)
    //   .ticks(5);
    //
    // this.svgContainer.append("g")
    //     .classed("y-axis", true)
    //     .attr("transform", () => {
    //       return "translate(" + this.margin + "," + this.margin + ")";
    //     })
    //     .call(yAxis);
  }

  renderBars() {
    this.svgContainer.select('.barG').remove();
    const bar = this.svgContainer.append("g")
      .classed("barG", true)
      .attr("transform", "translate(" + this.margin + "," + -this.margin + ")")
      .selectAll("rect")
      .data(this.props.data, (d) => { return d.total; })
      .enter()
      .append("g")
      .classed(styles.bar, true);

      bar.append("rect")
        .attr("width", (d) => { return this.xScaleBand.bandwidth(); })
        .attr("x", (d, i) => { return this.xScaleBand(d._id) })
        .style("fill", "#00BCD4")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .attr("height", 0)
        .attr("y", this.svgContainerdimensions.height)
        .transition()
        .duration(2000)
        .attr("height", (d) => { return this.yScale(d.total); })
        .attr("y", (d) => { return this.svgContainerdimensions.height - this.yScale(d.total);})

      bar.append("text")
        .attr("class", "label")
        .attr("x", (d, i) => { return this.xScaleBand(d._id) })
        .attr("y", (d) => { return (this.svgContainerdimensions.height - this.yScale(d.total)) - 20;})
        .attr("dy", ".35em") //vertical align middle
        .text(function(d){
            return '$' + d.total;
        })
  }

  render() {
    return (
      <svg
        width="100%"
        height="350"
        style={{border: '1px solid'}}
        id="barChartSvgContainer"
      />
    );
  }
}
