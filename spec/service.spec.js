describe('The Service Test Suite', function() {
  var $httpBackend;
  var testService;

  beforeEach(function(){
    module('test.service');

    inject(function(_$httpBackend_, _testService_){
      $httpBackend = _$httpBackend_;
      testService = _testService_;
    });
  });

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should exist', function() {
    expect(testService).toBeDefined();
  });

  it('should call the correct url on updateThing', function() {
    $httpBackend.expectGET('/api/update/thing').respond({})
    testService.updateThing();
    $httpBackend.flush();
  });
});