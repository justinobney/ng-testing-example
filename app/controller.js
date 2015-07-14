/* globals angular */

angular.module('test.controllers', [])
  .controller('testController', testController);

function testController(testService){
  var vm = this;

  vm.things = [];

  vm.init = init;

  function init(){
    testService.getThings().then(onSuccess);

    function onSuccess(resp){
      angular.copy(resp, vm.things);
    }
  }
}