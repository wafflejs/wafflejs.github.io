import angular from 'angular'
import css from './index.css'
import schedule from './schedule.yml'

console.log(css)
export default angular.module('wafflejs.index', [
  require('angular-marked')
])
.config((markedProvider) => {
  markedProvider.setOptions({ smartypants: true })
})
.controller('IndexController', class {
  constructor() {
    this.schedule = schedule;
  }
})
.run(($templateCache) => {
  $templateCache.put('./components/index/index.html', require('./index.jade')())
})
.name
