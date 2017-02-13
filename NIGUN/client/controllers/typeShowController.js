function typeShowController($scope, $routeParams, $http){

    $scope.songs={};
    var name = ($routeParams.name || "");
    $scope.type=name;
    console.log("name: " + name);
    $scope.onLoad=onLoad;
    console.log("in typeShowController");
    onLoad();


    function onLoad(){
        $http.get('songsController/loadType/'+name)
            .success(function(data){
                $scope.songs = data;
                console.log("Succeed loading");
                if(data[0]==null)
                    document.getElementById("null").innerHTML = "לא קיימים שירים מסוג ז'אנר זה!";
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+data);
            });
    }
}