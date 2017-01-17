function artistShowController($scope, $routeParams, $http){

    $scope.songs={};
    var name = ($routeParams.name || "");
    console.log("name: " + name);
    $scope.onLoad=onLoad;
    console.log("in artistShowController");
    onLoad();


    function onLoad(){
        $http.get('artistsController/loadSongs/'+name)
            .success(function(data){
                $scope.songs = data;
                console.log("Succeed loading");
                console.log(data.songs);
            })
            .error(function(data){
                console.log("Error: "+data);
            });
    }
}
