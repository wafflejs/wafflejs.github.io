import angular from 'angular'
import * as d3 from 'd3'
import moment from 'moment'
import { reverse, transform } from 'lodash'
import css from './index.css'

module.exports = angular.module('wafflejs.routes.metrics', [
  require('angular-ui-router'),
  require('models/calendar'),
  require('./chart-gender'),
  require('./chart-retention'),
  require('./chart-tickets'),
])
.config(($stateProvider) => {
  $stateProvider.state('metrics', {
    url: '/metrics',
    template: require('./index.jade')(css),
    resolve: {
      csv($http) {
        return $http.get('/routes/metrics/tickets.csv')
      },

      tickets(csv, calendar) {
        const dates = transform(reverse(calendar), (dates, month) => {
          dates[moment(month.day).format('MMM')] = month.day
        }, {})
        return d3.csvParse(csv.data, (row) => {
          row['Ticket Created Date'] = moment.utc(row['Ticket Created Date'], 'YYYY-MM-DD HH:mm:ss').toDate()
          row.date = dates[row['Event Month']]
          return row
        })
      }
    },
    controllerAs: 'metrics',
    controller: class {
      constructor(tickets) {
        this.tickets = tickets
      }
    }
  })
})
.name
