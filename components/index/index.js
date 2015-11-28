import angular from 'angular'
import css from './index.css'

export default angular.module('wafflejs.index', [])
.controller('IndexController', class {
  constructor() {
  }
})
.run(($templateCache) => {
  $templateCache.put('./components/index/index.html', require('./index.jade')())
})
.name
