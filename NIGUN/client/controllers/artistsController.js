function artists($scope, $http){

    $scope.artists={};
    $scope.onLoad=onLoad;
    onLoad();
console.log("in client ctrl");
    function onLoad(){
        $http.get('/artists/loadArtists')
            .success(function(data){
                $scope.artists = data;
                console.log("Succeed loading");
            })
            .error(function(data){
                console.log("Error: "+data);
            });
    }
}
