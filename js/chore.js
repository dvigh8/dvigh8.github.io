angular.module('chore', [])

//app.controller("ChoreCtrl", function($scope){
//    $scope.logChore = function(chore){
////        alert(chore + " is done!");
//    };
//});
.directive("kid",function(){
    return{
        restrict:"E",
        scope: {
        
        },
        template:'<input type="text" ng-model="chore">' + '{{chore}}' + '<div class="button" ng-click="done({chore: chore})">I\'m done</div>'
    };
});
