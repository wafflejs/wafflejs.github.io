import angular from 'angular'
import * as d3 from 'd3'
import moment from 'moment'
import { chain, flatten, forEach, keys, map, values } from 'lodash'
import {} from './chart-tickets.css'

const margin = { top: 0, right: 60.5, bottom: 30.5, left: 40.5 }

module.exports = angular.module('wafflejs.routes.metrics.chart-tickets', [])
.component('chartTickets', {
  bindings: { tickets: '<' },
  controllerAs: 'chartTickets',
  controller: class {
    constructor($element) {
      const byMonth = chain(this.tickets)
        .sortBy('Ticket Created Date')
        .groupBy('date')
        .value()
      const tickets = values(byMonth)
      const last = keys(byMonth).sort().reverse()[0]

      const svg = d3.select($element[0]).append('svg')

      const chart = svg.append('g')
        .classed('chart', true)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      let { width, height } = svg.node().getBoundingClientRect()
      width = width - margin.left - margin.right
      height = height - margin.top - margin.bottom

      // x
      forEach(tickets, (tickets) => {
        tickets.last = tickets[0].date === last
        tickets.date = moment(tickets[0].date).endOf('day')
        tickets.x = d3.scaleTime()
          .domain([moment(tickets.date).subtract(38, 'days'), tickets.date])
          .range([0, width])
          .clamp(true)
        forEach(tickets, (d, i) => {
          d.x = tickets.x
          d.n = i + 1
        })
      })
      const x = tickets[0][0].x
      const xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat(d => Math.round(moment.duration(d - x.domain()[1]).asDays()))
      chart.append('g')
        .classed('x axis', true)
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

      // y
      const y = d3.scaleLinear()
        .domain([0, d3.max(map(tickets, 'length'))])
        .range([height, 0])
        .nice()
      const yAxis = d3.axisLeft()
        .scale(y)
        .ticks(4)
      chart.append('g')
        .classed('y axis', true)
        .call(yAxis)

      // line
      const line = d3.line()
        .x(d => d.x(d['Ticket Created Date']))
        .y(d => y(d.n))
      const opacity = d3.scaleLinear()
        .domain([tickets[0].date, tickets[tickets.length-1].date])
        .range([0.5, 1])

      const lines = chart.selectAll('path.line').data(tickets)
      lines
        .enter().append('path')
          .classed('line', true)
          .attr('opacity', d => opacity(d.date))
          .attr('d', line)

      // label
      chart.selectAll('text.label').data(tickets)
        .enter().append('text')
          .classed('label', true)
          .attr('dx', '3px')
          .attr('dy', '.35em')
          .attr('opacity', d => opacity(d.date))
          .attr('transform', (d) => {
            const last = Math.min(moment(d[d.length-1]['Ticket Created Date']), d.date)
            return `translate(${d.x(last)}, ${y(d.length)})`
          })
          .text(d => `${d[0]['Event Month']} (${d.length})`)

      // voronoi
      const voronoi = d3.voronoi()
        .x(d => d.x(d['Ticket Created Date']))
        .y(d => y(d.n))
      const voronoiGroup = chart.append('g')
        .classed('voronoi', true)
      voronoiGroup.selectAll('path')
        .data(voronoi(flatten(tickets)))
        .enter().append('path')
          .attr('d', d => `M${d.join('L')}Z`)
          .datum(d => d.point)
          .on('mouseover', p => lines.classed('current', d => d.x === p.x))

      chart.on('mouseout', () => lines.classed('current', d => d.last))
      chart.on('mouseout')()
    }
  }
})
.name
