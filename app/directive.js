/* globals angular */

angular.module('test.directive', [])
  .directive('test', testDirective);

function testDirective(){
  return  {
    restrict: 'E',
    scope: {
      'thing': '='
    },
    template: '{{count}} {{thing.name}}',
    link: link
  };

  function link(scope, iElement) {
    scope.count = 0;
    iElement.addClass('test-directive');

    iElement.on('click', onClick);

    function onClick(){
      scope.count++;
      scope.$apply();
    }
  }
}
