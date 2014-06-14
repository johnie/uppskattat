/*!*
 * Uppskattat — Estimate Calculator
 * http://uppskatt.at
 * http://github.com/johnie/uppskattat
 */

var uppskattat = angular.module("uppskattat", [] );

/**
 * HTML filter
 */
uppskattat.filter(
  "to_trusted", ['$sce', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
}]);

/**
 * Main controller
 */
uppskattat.controller(
  "EstimateController", 

  function( $scope ) {
    /**
     * Defaults
     */
    $scope.logoRemoved = false;
    $scope.printMode   = false;

    /**
     * Default Logo
     */
    $scope.company_logo = "http://placehold.it/350x100&text=LOGO";


    /**
     * Sample Estimate data
     */
    var sample_estimate = {
      estimate_title: "Estimate",
      customer_info:  {name: "Mr. John Doe", web_link: "John Doe Designs Inc.", address1: "1 Infinite Loop", address2: "Cupertino, California, US", postal: "90210"},
      company_info:  {name: "Wired In AB", web_link: "wiredin.se", address1: "Söderbyvägen 4", address2: "Arlandastad, Sweden", postal: "195 60"},
      sections: [
        {
          section_title: "Management and Communications",
          items:[ 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Planning and Preparation",
          items:[ 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Client side Development",
          items:[ 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Server side Development",
          items:[ 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Quality Assurance",
          items:[ 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        }
      ],
      author_email: "professor.x@xmen.com"
    };

    $scope.estimate = sample_estimate;

    /**
     * Get index of section
     */
    $scope.sectionIndex = function() {
      var index = $(".estimate-section").index();
      return index;
    }
    
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
     * Add empty row of item
     */
    $scope.addItem = function() {
      angular.forEach($scope.estimate.sections, function (section) {
        section.items.push({title: "Item title", description: "Item description", target: 0, min: 0, max: 0, mean: 0});
      });
    }

    /**
     * Remove item row
     */
    $scope.removeItem = function( item ) {
      $scope.estimate.items.splice($scope.estimate.sections.items.indexOf( item ), 1);
    }


    /**
     * Add empty section
     */
    $scope.addSection = function() {
      $scope.estimate.sections.push({section_title: "Section title", items: [{title: "Item title", description: "Item description", target: 0, min: 0, max: 0, mean: 0}]});
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
