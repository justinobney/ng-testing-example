describe('Controller Spec', function() {
  var $controller;
  var $rootScope;
  var ctrl;
  var locals = {};

  beforeEach(function(){
    module('test.controllers');

    inject(function(_$controller_, _$rootScope_){
      $controller = _$controller_;
      $rootScope = _$rootScope_
      
      locals.testService = new testServiceFake();
      setupSpies(locals.testService);

      ctrl = $controller('testController', locals);
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
    expect(ctrl.things).toBeDefined();

    expect(locals.testService.getThings).toHaveBeenCalled();
  });

  function setupSpies(obj){
    Object.keys(obj).forEach(function(key){
      spyOn(obj, key).and.callThrough();
    })
  }
});

function testServiceFake(){
  var svc = this;

  svc.getThings = getThings;

  function getThings(){}
}