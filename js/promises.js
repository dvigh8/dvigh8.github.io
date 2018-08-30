angular.module('promises', []);

function getData($timeout, $q) {
  return function() {
    var defer = $q.defer()

    // simulated async function
    return $q(function(resolve,reject){
    $timeout(function() {
            resolve(Math.floor(Math.random() * 10)) 
        
     
        }, 2000)
    })
  }
}

angular.module('app', [])
.factory('getData', getData)
.run(function(getData) {
  var promise = getData()
})


.run(function(getData){
    var promise = getData()
    .then(function(num) {
        console.log(num)
        return num * 2
    }, function(error) {
        console.error(error)
    })
    .then(function(num){
        console.log(num)
    })
    .finally(function(){
        console.log('finished at: ', new Date())
    })
})
