import angular from 'angular'

export default angular.module('wafflejs.routes.sponsorship', [
  require('angular-ui-router'),
])
.config(($stateProvider) => {
  $stateProvider.state('sponsorship', {
    url: '/sponsorship',
    template: require('./index.jade')(),
  })
})
.name
