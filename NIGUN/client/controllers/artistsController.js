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
    var contentSearch = document.getElementById("searchInput");
    $scope.contentSearch = contentSearch.value;

    $scope.onClickSearch = function(){

        var flag = 0;
        for(var i = 0; i < $scope.artists.length; i++){
            //alert($scope.artists[i].name);
            if($scope.artists[i].name == contentSearch.value){  //if the artist exist
                flag = 1;
            }
        }
        if(contentSearch.value == "") {
            alert("נא להזין שם אמן לחיפוש");
            window.location = "/#";
            //return false;
        }
        else if(flag == 1)  //if the artist exist
        {
            $http.get('artistsController/loadArtists')
                .success(function (data) {
                    $scope.artistsSearch = data;
                    console.log("Succeed loading");
                })
                .error(function (data) {
                    console.log("Error: " + data);
                });
            $scope.searchInputModel = "";
            window.location = "#/showSearch";
        }
        else{
            alert("שם אמן לא חוקי. נא להזין שם אמן לחיפוש");
            $scope.searchInputModel = "";
            window.location = "/#";
        }

        //alert($scope.artistsSearch[2].name);
    };
    
   //========================================לא גמור================ 
        $scope.onClickCharSearch = function(e){   //search by the chars
        var idEvent = e.target.text;
        $scope.charSearch = idEvent;
        //window.location = "#/charsSearch";
         //e.target.attributes.href = "#/charsSearch";
        //alert(idEvent);
    };
    
    //search ----- End
    //===========================================================
}

