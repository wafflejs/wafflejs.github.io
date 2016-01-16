import angular from 'angular'
import d3 from 'd3'
import moment from 'moment'
import { forEach, keys, values, pairs, countBy, sortBy, chain } from 'lodash'
import css from './chart-gender.css'

export default angular.module('wafflejs.routes.metrics.chart-gender', [
  require('models/calendar').default
])
.directive('chartGender', () => {
  const margin = { top: 0, right: 10.5, bottom: 30.5, left: 100.5 }

  return {
    restrict: 'EA',
    controller: class {
      constructor($element) {
        this.svg = d3.select($element[0]).append('svg')

        this.chart = this.svg.append('g')
          .attr('class', 'chart')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

        this.width = parseInt(this.svg.style('width')) - margin.left - margin.right

        d3.csv('/routes/metrics/tickets.csv', (row, i) => {
          row['Ticket Created Date'] = moment.utc(row['Ticket Created Date'], 'YYYY-MM-DD HH:mm:ss').toDate()
          row.month = row.Event.match(/WaffleJS \((.*)\)/)[1]
          return row
        }, this.onTickets.bind(this))
      }

      onTickets(err, tickets) {
        var byMonth = chain(tickets)
          .sortBy('Ticket Created Date')
          .groupBy('month')
          .transform((byMonth, tickets, month) => {
            var x = 0
            byMonth[month] = sortBy(pairs(countBy(tickets, 'Ticket Gender Guess')))
            byMonth[month].total = tickets.length
            forEach(byMonth[month], (d) => { d.x0 = x; x += d[1] })
          })
          .value()
        tickets = values(byMonth)

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
          .attr('class', 'month')
          .attr('transform', d => `translate(0, ${y(d)})`)
        var bars = barGroups.selectAll('rect.bar').data(d => byMonth[d])
        bars.enter()
          .append('rect')
          .attr('class', d => `bar ${d[0] || 'null'}`)
          .attr('width', d => x(d[1]))
          .attr('height', y.rangeBand())
          .attr('x', d => x(d.x0))

        // axes drawn on top of bars
        var xAxis = d3.svg.axis()
          .scale(x)
        this.chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${this.height})`)
          .call(xAxis)

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
        this.chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
      }
    }
  }
})
.name
