import angular from 'angular'
import d3 from 'd3'
import moment from 'moment'
import { transform } from 'lodash'
import css from './index.css'

export default angular.module('wafflejs.routes.metrics', [
  require('angular-ui-router'),
  require('./chart-gender').default,
  require('./chart-retention').default,
  require('./chart-tickets').default,
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
        const dates = transform(calendar, (dates, month) => {
          dates[moment(month.day).format('MMM')] = month.day
        })
        return d3.csv.parse(csv.data, (row) => {
          row['Ticket Created Date'] = moment.utc(row['Ticket Created Date'], 'YYYY-MM-DD HH:mm:ss').toDate()
          row.date = dates[row['Event Month']]
          return row
        });
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
