function addsongController($scope, $http) {

    $scope.lyrics = '';


    $scope.lyricsToLines = function () {
        var text_lines = $scope.lyrics.split("\n");
        $scope.lines = [];
        text_lines.forEach(function (text_line) {
            line_object = {};
            line_object.words = text_line
            line_object.chords = ''
            $scope.lines.push(line_object);
        });

    }


    $scope.uploadSong = function () {
        console.log(add.name.value);
        var results = [];
        for (var i = 0; i < add.chords.length; i++) {
            //console.log(add.words[i].textContent);
            line_object = {};
            line_object.words = add.words[i].text;
            line_object.chords = add.chords[i].value;
            console.log(line_object);
            results.push(line_object);
            console.log(add.chords[i].value);
            //console.log(add.words[i].value);
        }

        var data = $.param({
            name: add.name.value,
            artistName: add.artistName.value,
            link: add.link.value,
            lines: results,
        });

       // console.log(data);
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }


        /*  function constructLines() {
         var text_lines = $scope.lyrics.split("\n");
         $scope.lines = [];
         text_lines.forEach(function (text_line) {
         line_object = {};
         line_object.words = text_line
         line_object.chords = ''
         $scope.lines.push(line_object);
         });
         $scope.lines[0].chords = "AAAA";
         console.log($scope.lines[0].chords);
         //console.log($scope.lines[0]);


         //return $scope.lines;
         }*/





        /*
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



         } */

    }
}
