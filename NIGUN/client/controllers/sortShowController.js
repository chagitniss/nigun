function sortShowController($scope, $routeParams, $http){

    $scope.songs={};
    var name = ($routeParams.name || "");
    $scope.letter=name;
    console.log("name: " + name);
    $scope.onLoad=onLoad;
    console.log("in sortShowController");
    onLoad();


    function onLoad(){
        $http.get('songsController/loadSort/'+name)
            .success(function(data){
                console.log(data);

                $scope.songs = filter(data,0,name);
                console.log("Succeed loading");

            })
            .error(function(data){
                console.log("Error: "+data);
            });
    }

    function filter(names, index, letter) {
        var filteredNames = names.filter(function(word) {
            return word.name.charAt(index) === letter;
        });
        if(filteredNames[0]==null)
            document.getElementById("null").innerHTML = "לא קיימים שירים באות זאת";
        return filteredNames;
    }

}

