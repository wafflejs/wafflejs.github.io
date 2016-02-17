import angular from 'angular'
import { groupBy } from 'lodash'

// un-smartypants the angular bindings
import html from './index.md'
const template = html.replace(/{{([^}]*)}}/g, (match, p1) => `{{${p1.replace(/[”“]/g, '"')}}}`)

export default angular.module('wafflejs.routes.sponsorship', [
  require('angular-ui-router'),
])
.config(($stateProvider) => {
  $stateProvider.state('sponsorship', {
    url: '/sponsorship',
    template: `<section><div class="container-fluid">${template}</div></section>`,
    controller($scope, calendar) {
      $scope.calendar = groupBy(calendar, date => date.day.slice(0, 4))
    }
  })
})
.name
