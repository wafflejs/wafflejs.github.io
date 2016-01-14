import angular from 'angular'
import d3 from 'd3'
import moment from 'moment'
import { forEach, map, keys, values, transform, remove, chain } from 'lodash'
import css from './chart-tickets.css'

export default angular.module('wafflejs.routes.metrics.chart-tickets', [
  require('models/calendar').default
])
.directive('chartTickets', (calendar) => {
  const margin = { top: 10.5, right: 100.5, bottom: 30.5, left: 40.5 }
  const days = transform(calendar, (days, month) => {
    days[moment(month.day).format('MMMM')] = month.day
  }, {})

  return {
    restrict: 'EA',
    controller: class {
      constructor($element) {
        const svg = d3.select($element[0]).append('svg')

        this.chart = svg.append('g')
          .attr('class', 'chart')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

        this.width = parseInt(svg.style('width')) - margin.left - margin.right
        this.height = parseInt(svg.style('height')) - margin.top - margin.bottom

        d3.csv('/routes/metrics/tickets.csv', (row, i) => {
          row['Ticket Created Date'] = moment.utc(row['Ticket Created Date'], 'YYYY-MM-DD HH:mm:ss').toDate()
          row.month = row.Event.match(/WaffleJS \((.*)\)/)[1]
          row.day = days[row.month]
          return row
        }, this.onTickets.bind(this))
      }

      onTickets(err, tickets) {
        var byEvent = _(tickets)
          .sortBy('Ticket Created Date')
          .groupBy('Event')
          .value()
        tickets = values(byEvent)

        // x
        forEach(byEvent, (tickets, event) => {
          tickets.day = moment(tickets[0].day).endOf('day')
          tickets.x = d3.time.scale()
            .domain([moment(tickets.day).subtract(38, 'days'), tickets.day])
            .range([0, this.width])
            .clamp(true)
        })
        var x = tickets[0].x
        var xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(d => Math.round(moment.duration(d - x.domain()[1]).asDays()))
        this.chart.append('g')
          .attr('class', 'x axis')
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
          .attr('class', 'y axis')
          .call(yAxis)

        // line
        var line = d3.svg.line()
          .x((ticket, i) => byEvent[ticket.Event].x(ticket['Ticket Created Date']))
          .y((ticket, i) => y(i+1))
        var opacity = d3.scale.linear()
          .domain([tickets[0].day, tickets[tickets.length-1].day])
          .range([0.5, 1])

        var linePaths = this.chart.selectAll('path.line')
          .data(tickets)
        linePaths.enter()
          .append('path')
          .attr('class', d => `line ${d[0].month}`)
          .attr('opacity', d => opacity(d.day))
          .attr('d', line)

        // label
        this.chart.selectAll('text.label').data(tickets)
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('dx', '3px')
          .attr('dy', '.35em')
          .attr('opacity', d => opacity(d.day))
          .attr('transform', (d) => {
            const last = Math.min(moment(d[d.length -1]['Ticket Created Date']), d.day)
            return `translate(${d.x(last)}, ${y(d.length)})`
          })
          .text(d => `${d[0].month} (${d.length})`)
      }
    }
  }
})
.name
