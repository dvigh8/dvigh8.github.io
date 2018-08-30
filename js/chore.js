var app = angular.module('choreApp', []);


app.directive("kid", function() {
  return {
    restrict: "E",
    scope: {
        done: "&"
      },
    template: '<input type="text" ng-model="chore">' +
      '{{chore}}' +
      '<div class="button" ng-click="done({chore: chore})">I\'m done</div>'
  };
});