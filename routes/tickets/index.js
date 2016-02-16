import angular from 'angular'
import moment from 'moment'
import { sortBy, sortedLastIndexBy } from 'lodash'
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
        calendar = sortBy(calendar, 'day')
        const yesterday = { day: moment().subtract(1, 'day').format('YYYY-MM-DD') }
        const index = sortedLastIndexBy(calendar, yesterday, 'day')
        this.day = calendar[index]

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
