function artistsController($scope, $http){

    $scope.artists={};
    $scope.onLoad=onLoad;
    onLoad();
console.log("in client ctrl");

    function onLoad() {
        $http.get('artistsController/loadArtists')
            .success(function (data) {
                $scope.artists = data;
                console.log("Succeed loading");
            })
            .error(function (data) {
                console.log("Error: " + data);
            });
    }
    //===========================================================
    //search!!----Tali
    var contentSearch = document.getElementById("searchInput");
    $scope.contentSearch = contentSearch.value;

    $scope.onClickSearch = function(){
       //alert(contentSearch.value);
        $http.get('artistsController/loadArtists')
            .success(function (data) {
                $scope.artistsSearch = data;
                console.log("Succeed loading");
            })
            .error(function (data) {
                console.log("Error: " + data);
            });
        //alert($scope.artistsSearch[2].name);
    };
    //===========================================================
}

