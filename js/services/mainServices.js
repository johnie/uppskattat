/*------------------------------------*\
    $SERVICES
\*------------------------------------*/
/**
 * Dummy data factory
 */
angular.module("uppskattat.services", [] ).factory('sampleEstimate', function($q, $timeout, $http){
 var SampleEstimate = {
  fetch: function () {
    var deferred = $q.defer();
    $timeout(function () {
      $http.get('./js/data.json').success(function (data) {
        deferred.resolve(data);
      });
    }, 30);
    return deferred.promise;
  }
 }
 return SampleEstimate;
});
