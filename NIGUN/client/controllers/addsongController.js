function addsongController($scope, $http) {

    var x;
    $scope.data=x;

    $scope.uploadSong=function(add){
        console.log(add);

        var data = $.param({
            name : add.name,
            artistName : add.artistName,
            link : add.link,
            chords : add.chords,
        });
        console.log(data);
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('songsController/addsong/', data, config)
        .success(function (data, status, headers, config) {
        $scope.data = data;
        console.log("Succeed post addsong");
    })
    .error(function (data, status, header, config) {
        console.log("Error: "+data);
        $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
    });
}

}
