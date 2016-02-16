import angular from 'angular'

// un-smartypants the angular bindings
import html from './index.md'
const template = html.replace(/{{([^}]*)}}/g, (match, p1) => `{{${p1.replace(/[”“]/g, '"')}}}`)

export default angular.module('wafflejs.routes.speakers', [
  require('angular-ui-router'),
])
.config(($stateProvider) => {
  $stateProvider.state('speakers', {
    url: '/speakers',
    template: `<section><div class="container-fluid">${template}</div></section>`,
    controller($scope, calendar) {
      $scope.day = calendar.on()
    },
  })
})
.name
