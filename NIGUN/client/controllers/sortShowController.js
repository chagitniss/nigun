function sortShowController($scope, $routeParams, $http){

    $scope.songs={};
    var name = ($routeParams.name || "");
    console.log("name: " + name);
    $scope.onLoad=onLoad;
    console.log("in sortShowController");
    onLoad();


    function onLoad(){
        $http.get('songsController/loadSort/'+name)
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
