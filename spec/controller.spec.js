describe('The Controller Test Suite: With Local Dependencies', function() {
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
      spyOn(locals.testService, 'getThings');

      ctrl = $controller('testController', locals);
    });
  });

  it('should compile and exist', function() {
    expect(ctrl).toBeDefined();
    expect(ctrl.things).toBeDefined();
  });
  
  function testServiceFake(){
    var svc = this;
    svc.getThings = getThings;
    function getThings(){}
  }
});

describe('The Controller Test Suite: With Mock Utils', function() {
  var $controller;
  var $rootScope;
  var $injector;
  var ctrl;
  var locals = {};

  beforeEach(function(){
    module(
      'mocks.testService',
      'test.controllers'
    );

    inject(function(_$controller_, _$rootScope_, _$injector_){
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;
      
      ctrl = $controller('testController', locals);
    });
  });

  it('should be able to call mocked method', function() {
    var testService = $injector.get('testService');

    ctrl.init();
    $rootScope.$digest();

    expect(testService.getThings).toHaveBeenCalled();
    expect(ctrl.things).toEqual([]);
  });

  it('should be able to define per test responses for mocked objects', function() {
    var testService = $injector.get('testService');
    testService.getThings.resolveWith([1,2,3]);

    ctrl.init();
    $rootScope.$digest();
    
    expect(testService.getThings).toHaveBeenCalled();
    expect(ctrl.things).toEqual([1,2,3]);
  });
  
  angular.module('mocks.testService', ['mocks.util'])
    .factory('testService', testService);

  function testService(mockUtil) {
    var api = {
      getThings: mockUtil.promise([])
    };

    mockUtil.setupSpies(api);
  
    return api;
  }
});
