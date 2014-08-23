/*------------------------------------*\
    $DIRECTIVES
\*------------------------------------*/
/**
 * Select on click directive
 */
angular.module("uppskattat.directives", [] ).directive('selectOnClick', function () {
  // Linker function
  return function (scope, element, attrs) {
    element.bind('click', function () {
      this.select();
    });
  };
});
