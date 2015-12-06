import angular from 'angular'
import { forEach } from 'lodash'
import css from './index.css'
import schedule from './schedule.yml'

export default angular.module('wafflejs.routes.index', [
  require('angular-ui-router'),
  require('angular-marked'),
])
.config(($stateProvider) => {
  $stateProvider.state('index', {
    url: '/',
    template: require('./index.jade')(css),
    controllerAs: 'index',
    controller: class {
      constructor() {
        this.schedule = schedule[0].schedule
        // fix title
        forEach(this.schedule, (event) => {
          forEach(event, (item, time) => {
            if (typeof(item) === 'string')
              event[time] = { title: item }
          })
        })

        this.sponsors = schedule[0].sponsors
      }
    },
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
