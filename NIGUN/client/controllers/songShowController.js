function songShowController($scope, $routeParams, $http, $sce){
    var x;
    $scope.song=x;
    var name = ($routeParams.name || "");
    var artistName = ($routeParams.artistName || "");
   // var artistName = ($routeParams.artistsName || "");
    console.log("name: " + name);
    console.log("artistName: " + artistName);
    //console.log("artistName: " + artistName);
    $scope.onLoad=onLoad;
    console.log("in songShowController");
    onLoad();

    var baseUrl = "https://www.youtube.com/embed/"



    function onLoad(){
        $http.get('songsController/loadChords/'+name)
            .success(function(data){
                for(i in data)//sent the correct song of the specific artist
                {
                    if(data[i].artistsName==artistName)
                      $scope.song = data[i];
                      var link = baseUrl + $scope.song.link;
                      $scope.youtubeLink = $sce.trustAsResourceUrl(link);
                }
//*************************************************************************
                console.log("Succeed loading");
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+data);
            });

      /*  $scope.video = {
            youtubeid: 'song.link'
        }
        $scope.getUrl = function (id) {
            return '//www.youtube.com/embed/'+id+'?rel=0'
        }
        $scope.url = $scope.getUrl('song.link')*/

    }
}

// function AppCtrl($scope, $sce) {
//     // ...
//         $scope.setProject = function (id) {
//               $scope.currentProject = $scope.projects[id];
//                     $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject.url);
//                         }
//                         }
