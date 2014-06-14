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
            {id: 1, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 2, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 3, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Planning and Preparation",
          items:[ 
            {id: 1, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 2, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 3, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Client side Development",
          items:[ 
            {id: 1, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 2, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 3, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Server side Development",
          items:[ 
            {id: 1, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 2, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 3, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        },
        {
          section_title: "Quality Assurance",
          items:[ 
            {id: 1, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, rerum!", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 2, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, obcaecati.", target: 0, min: 0, max: 0, mean: 0}, 
            {id: 3, title: "Item title", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, cupiditate.", target: 0, min: 0, max: 0, mean: 0} 
          ]
        }
      ],
      author_email: "professor.x@xmen.com"
    };

    $scope.estimate = sample_estimate;
    
    /**
     * Print page
     */
    $scope.printInfo = function() {
      window.print();
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
      $scope.estimate.sections.items.push({id: 0, title: "", description: "", target: 0, min: 0, max: 0, mean: 0});
    }

    /**
     * Add empty section
     */
    $scope.addSection = function() {
      $scope.estimate.sections.push({id: 0, title: "", description: "", target: 0, min: 0, max: 0, mean: 0});
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
