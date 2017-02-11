function adminController($scope, $http) {

    $scope.allSongs={};
    $scope.onLoad=onLoad;
    onLoad();
    console.log("in admin ctrl");

    function onLoad() {
        $http.get('songsController/loadAllSongs')
            .success(function (data) {
                $scope.allSongs = data;
                console.log("Succeed loading all songs that exist in database now");
            })
            .error(function (data) {
                console.log("Error: " + data);
            });
    }

    $scope.deleteSong=function(name,artistName) {
        if (confirm('האם אתה בטוח שאתה רוצה למחוק את השיר ' +"'"+name+"'" + " של " + artistName + " ממאגר השירים?")) {

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
            $http.post('songsController/deleteSong/', data, config)
                .success(function (data, status, headers, config) {
                    $scope.responData = data;
                    console.log("Succeed delet song");
                    alert(data);
                })
                .error(function (data, status, header, config) {
                    console.log("Error: " + data);
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
            $scope.onLoad();

        }
    }
}