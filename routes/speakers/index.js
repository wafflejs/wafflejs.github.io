import angular from 'angular'
import html from './index.md'

export default angular.module('wafflejs.routes.speakers', [
  require('angular-ui-router'),
])
.config(($stateProvider) => {
  $stateProvider.state('speakers', {
    url: '/speakers',
    template: `<section><div class="container">${html}</div></section>`,
  })
})
.name
