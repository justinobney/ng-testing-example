/* globals angular */

angular.module('test', [])
  .service('testService', testService);

function testService($http){
  var svc = this;

  svc.updateThing = updateThing;

  function updateThing(){
    return $http.get('/api/update/thing');
  }
}
