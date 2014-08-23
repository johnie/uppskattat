/*!*
 * Uppskattat — Estimate Calculator
 * http://uppskatt.at
 * http://github.com/johnie/uppskattat
 */

/**
 * Main controller
 */
angular.module("uppskattat", [
  "ui.sortable",
  "uppskattat.filters", 
  "uppskattat.directives",
  "uppskattat.services"
  ]).controller("EstimateController", function( $scope, sampleEstimate ) {
    /**
     * Defaults
     */
    $scope.logoRemoved = false;
    $scope.printMode   = false;


    /**
     * Sample Data
     */
    sampleEstimate.fetch().then(function (data) {
      /**
       * Check if data has been modified, otherwise user estimate samples
       */
      if (localStorage["estimate"] == "" || localStorage["estimate"] == null) {
        $scope.estimate = data;
        $scope.estimate.start_date = new Date().toJSON().slice(0,10);
      }
      else {
        $scope.estimate = JSON.parse(localStorage["estimate"]);
      }

      /**
       * Always watch for changes
       */
      $scope.$watch("estimate", function() {
        localStorage["estimate"] = JSON.stringify($scope.estimate);
      }, true);

      /**
       * Clear LocalStorage
       */
      $scope.clearLocalStorage = function() {
        var confirmClear = confirm("Are you sure you want to clear the progress?");
        if( confirmClear ) {
          localStorage["estimate"] = "";
          $scope.estimate = data;
        }
      }

    });

    /**
     * Sortable options
     */
    $scope.sortableOptions = {
      placeholder: 'ui-state-highlight',
      scrollSensitivity: 50,
      start: function(e, ui ){
        ui.placeholder.height(ui.helper.outerHeight());
      }
    };

    /**
     * Print page
     */
    $scope.printInfo = function() {
      window.print();
    };

    /**
     * Scroll top
     */
    $scope.scrollTop = function() {
      $("html, body").animate({ scrollTop: 0 }, "fast");
      return false;
    };

    /**
     * Change logo
     */
    $scope.editLogo = function() {
      $("#imgInp").trigger("click");
    }

    /**
     * Clear saved logo to sample.
     */
    $scope.removeLogo = function( element ) {
      var elem = angular.element("#remove_logo");
      if( elem.text() == "Show Logo") {
        elem.text("Remove Logo");
        elem.addClass('btn--red');
        elem.removeClass('btn--green');
        $scope.logoRemoved = false;
      }
      else {
        elem.text("Show Logo");
        elem.removeClass('btn--red');
        elem.addClass('btn--green');
        $scope.logoRemoved = true;
      }
    }

    /**
     * Add empty row of item
     */
    $scope.addItem = function( sectionIndex ) {
        $scope.estimate.sections[sectionIndex].items.push({title: "Item title", description: "Item description", target: 0, min: 0, max: 0, mean: 0});
    };

    /**
     * Remove item row
     */
    $scope.removeItem = function( sectionIndex, item ) {
      $scope.estimate.sections[sectionIndex].items.splice(item, 1);
    }


    /**
     * Add empty section
     */
    $scope.addSection = function() {
      $scope.estimate.sections.push({section_title: "Section title", items: [{title: "Item title", description: "Item description", target: 0, min: 0, max: 0, mean: 0}]});
    }

    /**
     * Remove section
     */
    $scope.removeSection = function( item ) {
      $scope.estimate.sections.splice($scope.estimate.sections.indexOf( item ), 1);
    }

});

/**
 * Read file url for logo and save into LocalStorage
 */
function readURL( input ) {
  if(input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function ( e ) {
      $("#company_logo").attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

jQuery(document).ready(function($) {
  /**
   * Change the logo URL
   */
  $('#imgInp').change(function() {
    readURL(this);
  });
  $("textarea").autosize();
});
