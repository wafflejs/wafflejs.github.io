import heap from './heap'

import angular from 'angular'
import css from './index.css'

angular.module('wafflejs', [
  require('./routes/index').default,
  require('./routes/past').default,
  require('./routes/speakers').default,
  require('./routes/sponsorship').default,
  require('./title').default,
])
.config(($locationProvider) => {
  $locationProvider.html5Mode(true)
})
.run(($rootScope, $document) => {
  $rootScope.$on('$stateChangeSuccess', () => {
    $document[0].body.scrollTop = 0
  })
})

window.onscroll = function() {
  if (window.pageYOffset > 50) {
    document.getElementById('footer').className = '';
  }
}
