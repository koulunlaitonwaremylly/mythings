// Define the `thingsApp` module
var thingsApp = angular.module('missleApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
thingsApp.controller('ThingListController', function ThingListController($scope, $http) {

  // View and Model communicate through $scope attributes, for instance $scope.phones
  $scope.title = "My things app";  // jne
  
  $http.get("/api/things")
    .then(function(response) {
        $scope.things = response.data;
    });
  
  $scope.markers = [];
  
  $scope.initMarkers = function() {
    if ($scope.things != undefined) {
        for (var i = 0; i < $scope.things.length; i++ ) {
        var thing = $scope.things[i];
        $scope.markers.push(
          new google.maps.Marker({
            position: thing.location,
            map: $scope.map,
            title: thing.name
          })
        );
      };
    } else {
      setTimeout(function() { $scope.initMarkers(); }, 250);
    }
  }
  
});

// Init google maps
// bind to main window window (body id=MainWrap)
var map;
function initMap() {

          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 62.581204, lng: 29.839987},
            zoom: 15,
    				center: myLatLng,
						mapTypeId: 'satellite'
          });
  
  angular.element(document.getElementById('MainWrap')).scope().map = map;
  
  angular.element(document.getElementById('MainWrap')).scope().initMarkers();

};


