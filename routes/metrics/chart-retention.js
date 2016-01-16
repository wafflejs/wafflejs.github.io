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

export default angular.module('wafflejs.routes.metrics.chart-retention', [
  require('models/calendar').default
])
.directive('chartRetention', () => {
  const margin = { top: 0, right: 60.5, bottom: 30.5, left: 40.5 }

  return {
    restrict: 'EA',
    scope: { tickets: '=' },
    bindToController: true,
    controllerAs: 'chartRetention',
    controller: class {
      constructor($element) {
        const svg = d3.select($element[0]).append('svg')

        this.chart = svg.append('g')
          .attr('class', 'chart')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

        this.width = parseInt(svg.style('width')) - margin.left - margin.right
        this.height = parseInt(svg.style('height')) - margin.top - margin.bottom

        var byMonth = chain(this.tickets)
          .groupBy('date')
          .transform((byMonth, tickets, date) => {
            byMonth[date] = uniq(map(tickets, 'Ticket Email Digest'))
            byMonth[date]['Event Month'] = tickets[0]['Event Month']
          })
          .value()
        var sortedDates = keys(byMonth).sort()
        var retention = map(byMonth, (digests, date) => {
          var after = sortedIndex(sortedDates, date)
          return map(sortedDates.slice(after), (date) => {
            return { date, count: intersection(byMonth[date], digests).length }
          })
        })

        // x
        var x = d3.scale.ordinal()
          .domain(sortedDates)
          .rangePoints([0, this.width], 1)
        var xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(d => byMonth[d]['Event Month'])
        this.chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${this.height})`)
          .call(xAxis)

        // y
        var y = d3.scale.sqrt()
          .domain([0, d3.max(map(flatten(retention), 'count'))])
          .range([this.height, 0])
          .nice()
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
          .ticks(4)
        this.chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)

        // line
        var line = d3.svg.line()
          .x(d => x(d.date))
          .y(d => y(d.count))

        var linePaths = this.chart.selectAll('path.line').data(retention)
        linePaths.enter()
          .append('path')
          .attr('class', d => `line ${d[0].date}`)
          .attr('d', line)
      }
    }
  }
})
.name
