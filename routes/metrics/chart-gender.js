import angular from 'angular'
import d3 from 'd3'
import {
  chain,
  countBy,
  forEach,
  keys,
  pairs,
  sortBy,
  values,
} from 'lodash'
import css from './chart-gender.css'

export default angular.module('wafflejs.routes.metrics.chart-gender', [
  require('models/calendar').default
])
.directive('chartGender', () => {
  const margin = { top: 0, right: 60.5, bottom: 30.5, left: 40.5 }

  return {
    restrict: 'EA',
    scope: { tickets: '=' },
    bindToController: true,
    controllerAs: 'chartGender',
    controller: class {
      constructor($element) {
        this.svg = d3.select($element[0]).append('svg')

        this.chart = this.svg.append('g')
          .classed('chart', true)
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

        this.width = parseInt(this.svg.style('width')) - margin.left - margin.right

        var byMonth = chain(this.tickets)
          .sortBy('Ticket Created Date')
          .groupBy('Event Month')
          .transform((byMonth, tickets, month) => {
            var x = 0
            byMonth[month] = sortBy(pairs(countBy(tickets, 'Ticket Gender Guess')))
            byMonth[month].total = tickets.length
            forEach(byMonth[month], (d) => {
              d.total = tickets.length
              d.x0 = x
              x += d[1]
            })
          })
          .value()
        var tickets = values(byMonth)

        const barHeight = 30
        this.height = tickets.length * barHeight - margin.top - margin.bottom
        this.svg.style('height', `${this.height + margin.top + margin.bottom}px`)

        // x
        var x = d3.scale.linear()
          .domain([0, d3.max(tickets, d => d.total)])
          .range([0, this.width])
          .nice()

        // y
        var y = d3.scale.ordinal()
          .domain(keys(byMonth))
          .rangeRoundBands([0, this.height], 0.2)

        // bars
        var barGroups = this.chart.selectAll('g.month').data(keys(byMonth))
        barGroups.enter()
          .append('g')
          .classed('month', true)
          .attr('transform', d => `translate(0, ${y(d)})`)
        var bars = barGroups.selectAll('rect.bar').data(d => byMonth[d])
        bars.enter()
          .append('rect')
          .attr('class', d => `bar ${d[0] || 'null'}`)
          .attr('width', d => x(d[1]))
          .attr('height', y.rangeBand())
          .attr('x', d => x(d.x0))

        // labels
        var labels = barGroups.selectAll('text.label').data(d => byMonth[d])
        labels.enter()
          .append('text')
          .classed('label', true)
          .attr('x', d => x(d.x0 + d[1]/2))
          .attr('y', '1em')
          .attr('text-anchor', 'middle')
          .text(d => d[0] && `${d[0]} (${(d[1]/d.total*100).toFixed()}%)`)

        // axes drawn on top of bars
        var xAxis = d3.svg.axis()
          .scale(x)
        this.chart.append('g')
          .classed('x axis', true)
          .attr('transform', `translate(0, ${this.height})`)
          .call(xAxis)

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
        this.chart.append('g')
          .classed('y axis', true)
          .call(yAxis)
      }
    }
  }
})
.name
