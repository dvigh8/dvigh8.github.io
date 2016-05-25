angular.module('directives',[])
.directive("welcome",function(){
           return{
            restrict: "A",
               link:function(){
                   alert("howdy!");
               }
           }
           })
function FunCtrl(){
    var self = this;
    
    self.start = function(){
        console.log("Fun times have been started!");
    }
    self.end = function(){
        console.log("Fun time is over.");
    }
}
angular.module('directives',[])
.controller('FunCtrl', FunCtrl)
.directive("entering", function(){
    return function(scope, element, attrs){
        element.bind("mouseenter", function(){
        element.addClass(attrs.entering);
        })
    }
})
.directive("leaving", function(){
    return function(scope,element, attrs){
        element.bind("mouseleave", function(){
        element.removeClass(attrs.entering);
        })
    }
})
;
