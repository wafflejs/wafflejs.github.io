import angular from 'angular'
import { find } from 'lodash'
import css from '../index/index.css'

export default angular.module('wafflejs.routes.past', [
  require('angular-ui-router'),
  require('angular-marked'),
  require('models/calendar').default,
])
.config(($stateProvider) => {
  $stateProvider.state('past', {
    url: '/past/:day',
    template: require('../index/index.jade')(css),
    resolve: {
      day(calendar, $stateParams) {
        return find(calendar, { day: $stateParams.day })
      }
    },
    controllerAs: 'index',
    controller: class {
      constructor(day) {
        this.day = day
      }
    },
  })
})
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.name
