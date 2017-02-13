function updateSongController($scope,$routeParams, $http) {

    var name = ($routeParams.name || "");
    var artistName = ($routeParams.artistName || "");
    $scope.name=name;
    console.log($scope.name);
    console.log("name: " + name);
    console.log("artistName: " + artistName);
    $scope.onLoad=onLoad;
    onLoad();


    function onLoad(){
        $http.get('songsController/loadSongs/'+name)
            .success(function(data){
                $scope.songs = data;
                console.log("Succeed loading");
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+data);
            });
    }









}
