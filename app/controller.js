/* globals angular */

angular.module('test.controllers', [])
  .controller('testController', testController);

function testController(testService){
  var vm = this;

  vm.things = [];

  init();

  function init(){
    testService.getThings();
  }
}