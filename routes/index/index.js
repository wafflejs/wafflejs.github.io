import angular from 'angular'
import moment from 'moment'
import { sortBy, sortedLastIndex, some, values } from 'lodash'
import css from './index.css'

export default angular.module('wafflejs.routes.index', [
  require('angular-ui-router'),
  require('angular-marked'),
  require('models/calendar').default,
])
.config(($stateProvider) => {
  $stateProvider.state('index', {
    url: '/?day',
    template: require('./index.jade')(css),
    controllerAs: 'index',
    controller: class {
      constructor(calendar, $stateParams) {
        calendar = sortBy(calendar, 'day')
        const yesterday = { day: moment($stateParams.day).subtract(1, 'day').format('YYYY-MM-DD') }
        const index = sortedLastIndex(calendar, yesterday, 'day')
        this.day = calendar[index]
        this.last = calendar[index - 1]
        this.tba = some(this.day.schedule, (event) => {
          const title = values(event)[0].title
          return title && title.match(/TBA/)
        })
      }
    },
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
