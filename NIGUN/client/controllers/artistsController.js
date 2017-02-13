function artistsController($scope, $http){
    $scope.artists={};
    $scope.onLoad=onLoad;
    onLoad();
console.log("in client ctrl");

    function onLoad() {
        $http.get('artistsController/loadArtists')
            .success(function (data) {
                $scope.artists = data;
                console.log("Succeed loading");
            })
            .error(function (data) {
                console.log("Error: " + data);
            });
    }
    //===========================================================
    //search  ---- Start

    var contentSearch = document.getElementById("searchInput"); //content search
    $scope.contentSearch = contentSearch.value;

    $scope.onClickSearch = function () { //onClick

        var contentSearch = document.getElementById("searchInput");
        $scope.contentSearch = contentSearch.value;
        var flag = 0;
        $scope.songsSearch = {};  //list of songs
        var songName = $scope.contentSearch;

        if (contentSearch.value == "") {
            alert("נא להזין שם אמן או שיר לחיפוש");
            window.location = "/#";
        }
        else {
            for (var i = 0; i < $scope.artists.length; i++) { //look-up an artist
                if ($scope.artists[i].name == contentSearch.value) {  //if the artist exist
                    flag = 1;
                    //alert("אתה בתוך הפור ונמצא אמן תואם");
                }
            }
            if (flag == 0) { //the artist not exist
                //function listOfSongSearch() {  //find the song with this name
                    var contentSearch = document.getElementById("searchInput");
                    $scope.contentSearch = contentSearch.value;
                    var songName = $scope.contentSearch;

                    $http.get('songsController/loadChords/' + songName)
                        .success(function (data) {
                            $scope.songsSearch = data;
                            //alert(JSON.stringify(data));
                            if ($scope.songsSearch.length > 0) { //if the song exist
                                //alert($scope.songsSearch.length);
                                $scope.searchInputModel = "";
                                window.location = "#/showSearch";
                                flag = 2;
                            }
                            if (flag != 2) { //not found artist or song
                                alert("שם אמן/שיר לא חוקי. נא להזין שם אמן/שיר לחיפוש");
                                $scope.searchInputModel = "";
                                window.location = "/#";
                            }
                        })
                        .error(function (data) {
                            console.log("Error: " + data);
                            //$scope.songsSearch = {};
                        });
                //}
            }
            else{ //artist found!
                $scope.searchInputModel = "";
                window.location = "#/showSearch";
            }
        }

        //search ----- End
        //===========================================================
    }

}

