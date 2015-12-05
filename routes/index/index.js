import angular from 'angular'
import { values } from 'lodash'
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
      }
    }
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
