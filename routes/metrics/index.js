import angular from 'angular'
import css from './index.css'

export default angular.module('wafflejs.routes.metrics', [
  require('angular-ui-router'),
  require('./chart-gender').default,
  require('./chart-tickets').default,
])
.config(($stateProvider) => {
  $stateProvider.state('metrics', {
    url: '/metrics',
    template: require('./index.jade')(css),
  })
})
.name
