function songShowController($scope, $routeParams, $http){
    var x;
    $scope.song=x;
    var name = ($routeParams.name || "");
   // var artistName = ($routeParams.artistsName || "");
    console.log("name: " + name);
    //console.log("artistName: " + artistName);
    $scope.onLoad=onLoad;
    console.log("in songShowController");
    onLoad();


    function onLoad(){
        $http.get('songsController/loadChords/'+name)
            .success(function(data){
                $scope.song = data;
                console.log("Succeed loading");
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+data);
            });
    }
}
