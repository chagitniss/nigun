function updateSongController($scope,$routeParams, $http) {

    var name = ($routeParams.name || "");
    var artistName = ($routeParams.artistName || "");
    $scope.name = name;
    console.log($scope.name);
    console.log("name: " + name);
    console.log("artistName: " + artistName);
    $scope.onLoad = onLoad;
    onLoad();


    function onLoad() {
        var data = $.param({
            name: name,
            artistName: artistName,
        });
        console.log(data);


        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post('songsController/loadSongByNames/', data, config)
            .success(function (data, status, headers, config) {
                $scope.songToUpdate = data;
                console.log("Succeed get song");
                console.log(data);
            })
            .error(function (data, status, header, config) {
                console.log("Error: " + data);
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
    }
}


