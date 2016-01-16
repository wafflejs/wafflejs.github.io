import angular from 'angular'
import d3 from 'd3'
import moment from 'moment'
import { chain, forEach, map, values } from 'lodash'
import css from './chart-tickets.css'

export default angular.module('wafflejs.routes.metrics.chart-tickets', [
  require('models/calendar').default
])
.directive('chartTickets', () => {
  const margin = { top: 0, right: 60.5, bottom: 30.5, left: 40.5 }

  return {
    restrict: 'EA',
    scope: { tickets: '=' },
    bindToController: true,
    controllerAs: 'chartTickets',
    controller: class {
      constructor($element) {
        const svg = d3.select($element[0]).append('svg')

        this.chart = svg.append('g')
          .classed('chart', true)
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

        this.width = parseInt(svg.style('width')) - margin.left - margin.right
        this.height = parseInt(svg.style('height')) - margin.top - margin.bottom

        var byMonth = chain(this.tickets)
          .sortBy('Ticket Created Date')
          .groupBy('date')
          .value()
        var tickets = values(byMonth)

        // x
        forEach(byMonth, (tickets) => {
          tickets.date = moment(tickets[0].date).endOf('day')
          tickets.x = d3.time.scale()
            .domain([moment(tickets.date).subtract(38, 'days'), tickets.date])
            .range([0, this.width])
            .clamp(true)
        })
        var x = tickets[0].x
        var xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(d => Math.round(moment.duration(d - x.domain()[1]).asDays()))
        this.chart.append('g')
          .classed('x axis', true)
          .attr('transform', `translate(0, ${this.height})`)
          .call(xAxis)

        // y
        var y = d3.scale.linear()
          .domain([0, d3.max(map(tickets, 'length'))])
          .range([this.height, 0])
          .nice()

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
          .ticks(4)
        this.chart.append('g')
          .classed('y axis', true)
          .call(yAxis)

        // line
        var line = d3.svg.line()
          .x((ticket) => byMonth[ticket.date].x(ticket['Ticket Created Date']))
          .y((ticket, i) => y(i+1))
        var opacity = d3.scale.linear()
          .domain([tickets[0].date, tickets[tickets.length-1].date])
          .range([0.5, 1])

        var linePaths = this.chart.selectAll('path.line').data(tickets)
        linePaths.enter()
          .append('path')
          .classed('line', true)
          .classed('last', (d, i) => i === tickets.length - 1)
          .attr('opacity', d => opacity(d.date))
          .attr('d', line)

        // label
        this.chart.selectAll('text.label').data(tickets)
          .enter()
          .append('text')
          .classed('label', true)
          .attr('dx', '3px')
          .attr('dy', '.35em')
          .attr('opacity', d => opacity(d.date))
          .attr('transform', (d) => {
            const last = Math.min(moment(d[d.length -1]['Ticket Created Date']), d.date)
            return `translate(${d.x(last)}, ${y(d.length)})`
          })
          .text(d => `${d[0]['Event Month']} (${d.length})`)
      }
    }
  }
})
.name
