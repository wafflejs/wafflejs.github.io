import angular from 'angular'
import css from './index.css'

export default angular.module('wafflejs.routes.index', [
  require('angular-ui-router'),
  require('angular-marked'),
  require('models/calendar').default,
])
.config(($stateProvider) => {
  $stateProvider.state('index', {
    url: '/',
    template: require('./index.jade')(css),
    controllerAs: 'index',
    controller: class {
      constructor(calendar) {
        calendar = calendar.slice()
        this.day = calendar.shift()
      }
    },
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
