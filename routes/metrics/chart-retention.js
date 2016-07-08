import angular from 'angular'
import d3 from 'd3'
import {
  chain,
  flatten,
  intersection,
  keys,
  map,
  sortedIndex,
  uniq,
} from 'lodash'

const margin = { top: 0, right: 60.5, bottom: 30.5, left: 40.5 }

module.exports = angular.module('wafflejs.routes.metrics.chart-retention', [])
.component('chartRetention', {
  bindings: { tickets: '<' },
  controllerAs: 'chartRetention',
  controller: class {
    constructor($element) {
      const byMonth = chain(this.tickets)
        .groupBy('date')
        .transform((byMonth, tickets, date) => {
          byMonth[date] = uniq(map(tickets, 'Ticket Email Digest'))
          byMonth[date]['Event Month'] = tickets[0]['Event Month']
        })
        .value()
      const sortedDates = keys(byMonth).sort()
      const retention = map(byMonth, (digests, date) => {
        const after = sortedIndex(sortedDates, date)
        return map(sortedDates.slice(after), (date) => {
          return { date, count: intersection(byMonth[date], digests).length }
        })
      })

      const svg = d3.select($element[0]).append('svg')

      const chart = svg.append('g')
        .attr('class', 'chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const width = parseInt(svg.style('width')) - margin.left - margin.right
      const height = parseInt(svg.style('height')) - margin.top - margin.bottom

      // x
      const x = d3.scale.ordinal()
        .domain(sortedDates)
        .rangePoints([0, width], 1)
      const xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(d => byMonth[d]['Event Month'])
      chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

      // y
      const y = d3.scale.sqrt()
        .domain([0, d3.max(map(flatten(retention), 'count'))])
        .range([height, 0])
        .nice()
      const yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(4)
      chart.append('g')
        .attr('class', 'y axis')
        .call(yAxis)

      // line
      const line = d3.svg.line()
        .x(d => x(d.date))
        .y(d => y(d.count))

      chart.selectAll('path.line').data(retention)
        .enter()
          .append('path')
          .attr('class', d => `line ${d[0].date}`)
          .attr('d', line)
    }
  }
})
.name
