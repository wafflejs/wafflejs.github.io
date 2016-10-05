import angular from 'angular'
import { concat, filter, find, forEach, keys, map } from 'lodash'
import css from './index.css'
import script from './script.yml'

const eventAt = (schedule, time) => {
  let event = find(schedule, event => keys(event)[0] === time)
  return event && event[time]
}

module.exports = angular.module('wafflejs.routes.script', [
  require('angular-ui-router'),
  require('angular-marked'),
  require('models/calendar'),
])
.config(($stateProvider) => {
  $stateProvider.state('script', {
    url: '/script?day',
    template: require('./index.jade')(css),
    controllerAs: 'script',
    controller: class {
      constructor(calendar, $scope, $state) {
        this.calendar = calendar
        this.day = calendar.on($state.params.day)
        const schedule = this.day.schedule

        forEach(script, (description, time) => {
          eventAt(schedule, time).description = description
        })

        const events = map(schedule, event => event[keys(event)[0]])
        this.talks = filter(events, { type: 'Talk' })
        this.speakers = map(this.talks, 'person')
        this.performances = filter(events, { type: 'Performance' })
        this.performers = map(this.performances, performance => concat(performance.person || performance.people))

        $scope.$watch(() => this.day, (current, previous) => {
          if (current !== previous)
            $state.go('.', this.day)
        })
      }
    },
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
