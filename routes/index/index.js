import angular from 'angular'
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
        this.schedule = schedule;
      }
    }
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
