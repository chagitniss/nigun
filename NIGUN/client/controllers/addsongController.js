function addsongController($scope, $http) {



    $scope.uploadSong=function(add){
        console.log(add);

        var data = $.param({
            name : add.name,
            artistName : add.artistName,
            link : add.link,
            lines : constructLines(add.text),
        });
        console.log(data);
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        function constructLines(text) {
            var lines=text.split("\n");
            var results = [];
            for (line in lines){
                object = {};
                object.words = line;
                object.chords = "";
                results.push(object);
            }
             return results;
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
