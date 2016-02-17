import angular from 'angular'
import { groupBy } from 'lodash'
import html from './index.md'

export default angular.module('wafflejs.routes.sponsorship', [
  require('angular-ui-router'),
  require('models/calendar').default,
])
.config(($stateProvider) => {
  $stateProvider.state('sponsorship', {
    url: '/sponsorship',
    template: `<section><div class="container-fluid">${html}</div></section>`,
    controller($scope, calendar) {
      $scope.calendar = groupBy(calendar, date => date.day.slice(0, 4))
    }
  })
})
.name
