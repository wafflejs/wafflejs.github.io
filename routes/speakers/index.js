import angular from 'angular'
import html from './index.md'

module.exports = angular.module('wafflejs.routes.speakers', [
  require('angular-ui-router'),
  require('models/calendar'),
])
.config(($stateProvider) => {
  $stateProvider.state('speakers', {
    url: '/speakers',
    template: `<section><div class="container-fluid">${html}</div></section>`,
    controller($scope, calendar) {
      $scope.day = calendar.on()
    },
  })
})
.name
