import angular from 'angular'
import html from './index.md'

export default angular.module('wafflejs.routes.brunch', [
  require('angular-ui-router'),
])
.config(($stateProvider) => {
  $stateProvider.state('brunch', {
    url: '/brunch',
    template: `<section><div class="container-fluid">${html}</div></section>`,
  })
})
.name
