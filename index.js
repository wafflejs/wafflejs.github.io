//import heap from './heap'

import angular from 'angular'
import css from './index.css'

angular.module('wafflejs', [
  require('./routes/index').default,
]).config(($locationProvider) => {
  $locationProvider.html5Mode(true)
})
