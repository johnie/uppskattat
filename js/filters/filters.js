/*------------------------------------*\
    $FILTERS
\*------------------------------------*/


/**
 * Turn unformated text to HTML
 */
angular.module("uppskattat.filters", [] ).filter(
  "to_trusted", ['$sce', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
}]);
