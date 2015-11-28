//import heap from './heap'

import angular from 'angular'
import css from './index.css'

angular.module('wafflejs', [
  require('./components/index').default,
  require('angular-new-router').default,
]).run(($router) => {
  $router.config([
    { path: '/', component: 'index' },
  ])
})
