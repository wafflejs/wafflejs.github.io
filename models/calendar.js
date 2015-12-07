import angular from 'angular'
import { forEach } from 'lodash'

import calendar from './calendar.yml'

forEach(calendar, (day) => {
  day.date = new Date(day.day)
  forEach(day.schedule, (event) => {
    forEach(event, (item, time) => {
      // expand shorthand
      if (typeof(item) === 'string')
        event[time] = { title: item }
    })
  })
})

export default angular.module('wafflejs.models.calendar', [])
.constant('calendar', calendar)
.name
