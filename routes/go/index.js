import angular from 'angular'
import css from './index.css'

module.exports = angular.module('wafflejs.routes.go', [
  require('angular-ui-router'),
  require('models/calendar'),
])
.config(($stateProvider) => {
  $stateProvider.state('go', {
    url: '/go',
    template: require('./index.jade')(css),
    controllerAs: 'go',
    controller: class {
      constructor(calendar) {
        this.calendar = calendar
        this.day = calendar.on()
      }
    }
  })
})
.name
