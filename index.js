import {} from './heap'

import angular from 'angular'
import {} from './index.css'

angular.module('wafflejs', [
  require('./routes/index'),
  require('./routes/metrics'),
  require('./routes/performers'),
  require('./routes/script'),
  require('./routes/speakers'),
  require('./routes/sponsorship'),
  require('./routes/tickets'),
  require('./routes/go'),
  require('./title'),
])
.config(($locationProvider) => {
  $locationProvider.html5Mode(true)
})
.run(($rootScope, $document) => {
  $rootScope.$on('$stateChangeSuccess', (event, to, toParams, from) => {
    if (from.name !== to.name)
      $document[0].body.scrollTop = 0
  })
  $rootScope.$on('$stateChangeError', (e, to, toParams, from, fromParams, error) => {
    throw error
  })
})
