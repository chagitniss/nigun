function updateSongController($scope,$routeParams, $http) {

    $scope.lyrics = '';
    $scope.lines = [];
    $scope.artists={};
    var name = ($routeParams.name || "");
    var artistName = ($routeParams.artistName || "");
    $scope.name = name;
    console.log($scope.name);
    console.log("name: " + name);
    console.log("artistName: " + artistName);
    $scope.onLoad = onLoad;
    onLoad();


    function onLoad() {
        $http.get('artistsController/celectArtists')
            .success(function (data) {
                $scope.artists = data;
                $scope.artists.sort();

            })
            .error(function (data) {
                console.log("Error: " + data);
            });

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
    //*******************************************************************************
    $scope.lyricsToLines = function() {
        var text_lines = $scope.lyrics.split("\n");
        $scope.lines = [];
        text_lines.forEach(function(text_line) {
            line_object = {};
            line_object.words = text_line
            line_object.chords = ''
            $scope.lines.push(line_object);

        });
        console.log($scope.lines);
    }
    //*******************************************************************************
    $scope.updateSong=function(add) {
        if (confirm('האם אתה בטוח שאתה רוצה למחוק את השיר הקיים ולהוסיף תחתיו שיר מעודכן?')) {

            console.log($scope.lines);
            var lines = angular.toJson($scope.lines);
            console.log("json:", lines);
            console.log(angular.toJson($scope.lines[0]));

            var data = $.param({
                name: add.name,
                artistName: add.artistName,
                type: add.type,
                link: add.link,
                lines: lines,
            });

            // console.log($scope.lines);
            console.log(data);
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }


            $http.post('songsController/updateSong/', data, config)
                .success(function (data, status, headers, config) {
                    $scope.data = data;
                    console.log("Succeed post addsong");
                    console.log(data);
                    alert(data);


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
}


