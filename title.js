import angular from 'angular'

export default angular.module('title', [])
.directive('title', function($document, $timeout) {
  const title = angular.element($document[0].querySelector('title')).clone()

  function syncTitle() {
    // $timeout is needed to get pushState + history + title to play correctly
    // together. otherwise, the browser ends up recording weird page titles in
    // history for some reason.
    $timeout(function() {
      $document[0].title = title.text()
    })
  }

  return {
    restrict: 'E',
    transclude: true,
    link: function(scope, elem, attrs, controller, transclude) {
      transclude(function(clone, scope) {
        title.append(clone)
        scope.$on('$destroy', function() {
          clone.remove()
          syncTitle()
        })

        scope.$watch(function() { return clone.text() }, function(current) {
          if (current.indexOf('{{') === -1) // prevent unwanted/early updates
            syncTitle()
        })
      })
    }
  }
})
.name
