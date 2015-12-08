import angular from 'angular'
import html from './index.md'

export default angular.module('wafflejs.routes.sponsorship', [
  require('angular-ui-router'),
])
.config(($stateProvider) => {
  $stateProvider.state('sponsorship', {
    url: '/sponsorship',
    template: `<section><div class="container-fluid">${html}</div></section>`,
  })
})
.name
