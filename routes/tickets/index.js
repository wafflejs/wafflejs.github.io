import angular from 'angular'
import css from './index.css'

export default angular.module('wafflejs.routes.tickets', [
  require('angular-ui-router'),
  require('models/calendar').default,
])
.config(($stateProvider) => {
  $stateProvider.state('tickets', {
    url: '/tickets',
    template: require('./index.jade')(css),
    controllerAs: 'tickets',
    controller: class {
      constructor($element, calendar) {
        this.day = calendar.on()

        const script = angular.element('<script>').attr('src', 'https://js.tito.io/v1')
        $element.append(script)
      }
    }
  })
})
.run(($window) => {
  $window.TitoDevelopmentMode = location.host !== 'wafflejs.com'
})
.name
