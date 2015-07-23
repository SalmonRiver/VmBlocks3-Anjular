'use strict';

describe('Directive: svg2Directive', function () {

  // load the directive's module
  beforeEach(module('vmBlocks3AnjularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<svg2-directive></svg2-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the svg2Directive directive');
  }));
});
