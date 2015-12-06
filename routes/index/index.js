import angular from 'angular'
import { values, forEach } from 'lodash'
import css from './index.css'
import schedule from './schedule.yml'

export default angular.module('wafflejs.routes.index', [
  require('angular-route'),
  require('angular-marked'),
])
.config(($routeProvider) => {
  $routeProvider.when('/', {
    template: require('./index.jade')(css),
    controllerAs: 'index',
    controller: class {
      constructor() {
        this.schedule = values(schedule[0])[0]
        forEach(this.schedule, (event) => {
          forEach(event, (item, time) => {
            if (typeof(item) === 'string')
              event[time] = { title: item }
          })
        })
      }
    }
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
