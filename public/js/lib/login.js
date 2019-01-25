// var validater = $('#login-form').validate({
//     submitHandler: function (form, event) {
//         event.preventDefault();
//         var senderObject = {
//             password: $(form['password']).val(),
//             email: $(form['email']).val(),
//         };
//         $.ajax({
//             url: LOGIN_API,
//             type: 'POST',
//             contentType: 'application/json; charset=utf-8',
//             data: JSON.stringify(senderObject),
//             success: function (data) {
//                 alert('dang nhap thanh cong');
//                localStorage.setItem('my-token',data.token);
//                 console.log(data);
//                 // $('#avatar').attr('src',data.responseJSON.avatar);
//                 // $('#user-name').html(data.responseJSON.firstName);
//             },
//             error: function (jqXHR) {
//                 alert('dang ki that bai');
//                 if (Object.keys(jqXHR.responseJSON.error).length > 0) {
//                     $('#summary')
//                         .text(`please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
//                     validater.showErrors(jqXHR.responseJSON.error);
//                     console.log(jqXHR.responseJSON.error);
//                     console.log(jqXHR)
//                 }
//
//             }
//         });
//         return false;
//     }
// });
var app = angular.module("module", []);
app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0].name;
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);

app.controller('upLoadSong', function ($scope,$rootScope, $http) {
    $(document).ready(function () {
        $scope.songShow = 10;
        $scope.showMore = function () {
            $scope.songShow += 10;
            if($scope.songShow >= listSong.length) {
                $('#btn-showmore').removeClass('d-flex').addClass('d-none')
            }
        };
        $scope.playSong = function (a) {
            $('#spin-img').attr('src', listSong[a].thumbnail);
            $('#music').attr('src', listSong[a].link);
            $('#song-name').html(listSong[a].name);
            $('#singer-name').html(listSong[a].singer);
            console.log(listSong[a]);
            b = parseInt(a);

        };
        $http({
            method: "POST",
            url: LIST_SONG_API,
            contentType: 'application/json; charset=utf-8',
        }).then(function mySuccess(response) {
            $scope.listSong = response.data;
            listSong = $scope.listSong;
            console.log($scope.listSong);
        }, function myError(response) {
            alert('sdlfjsdkjf');
        });

    });

});
app.controller('loginController', function ($scope, $http) {

    $scope.doLogin = function () {
        console.log(JSON.stringify($scope.login));
        // $http({
        //     method: "POST",
        //     url: LOGIN_API,
        //     headers: {
        //         'Content-Type': 'application/json; charset=utf-8'
        //     },
        //     data: JSON.stringify($scope.login)
        // }).then(function mySuccess(response) {
        //     alert('đăng nhập thành công!');
        //     localStorage.setItem('my-token', response.data.token);
        // }, function myError(response) {
        //     alert('sai cmmr');
        // });
    };

});
app.controller('createSongController', function ($scope, $http) {

    $scope.create = function () {
        console.log(JSON.stringify($scope.createIf));
        $http({
            method: "POST",
            url: CREATE_SONG_API,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'authorization': "Basic " + localStorage.getItem('my-token')
            },
            // headers: {'authorization': "Basic " + localStorage.getItem('my-token')},
            data: JSON.stringify($scope.createIf)
        }).then(function mySuccess(response) {
            alert('success');
        }, function myError(response) {
            alert('sai cmmr');
        });
    };

});
app.controller('registerController', function ($scope, $http) {
    $scope.doSignup = function () {
        console.log(JSON.stringify($scope.register));
        $http({
            method: "POST",
            url: REGISTER_API,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: JSON.stringify($scope.register)
        }).then(function mySuccess(response) {
            alert('đăng kí thành công!');
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
            alert('ádsad');
        });
    };

});