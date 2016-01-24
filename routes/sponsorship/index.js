import angular from 'angular'
import { groupBy, sortBy } from 'lodash'
import html from './index.md'

export default angular.module('wafflejs.routes.sponsorship', [
  require('angular-ui-router'),
])
.config(($stateProvider) => {
  // un-smartypants the angular bindings
  const template = html.replace(/{{([^}]*)}}/g, (match, p1) => `{{${p1.replace(/[”“]/g, '"')}}}`)

  $stateProvider.state('sponsorship', {
    url: '/sponsorship',
    template: `<section><div class="container-fluid">${template}</div></section>`,
    controllerAs: 'sponsorship',
    controller: class {
      constructor(calendar) {
        this.calendar = groupBy(sortBy(calendar, 'day'), date => date.day.slice(0, 4))
      }
    }
  })
})
.name
