/*
 * <test thing="thing"></test>
 * thing: {
 *   name: string
 * }
 */

describe('The Directive Test Suite', function() {
  var $compile;
  var $rootScope;

  beforeEach(function(){
    module('test.directive');

    inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  it('should compile', function() {
    expect(compile).not.toThrow();
  });

  it('should add css classes', function() {
    var el = compile();
    expect(el.hasClass('test-directive')).toBeTruthy();
  });

  it('should track count', function() {
    $rootScope.thing = {name: 'thing(s)'};

    var el = compile();
    $rootScope.$digest();  // I forgot to do this
    expect(el.text()).toBe('0 thing(s)');
    el.triggerHandler('click');
    expect(el.text()).toBe('1 thing(s)');
  });

  function compile(){
    var html = '<test thing="thing"></test>';
    var el = angular.element(html);
    $compile(el)($rootScope);
    return el;
  }
});