var b;

function playSong(a) {
    $('#spin-img').attr('src', listSong[a].thumbnail);
    $('#music').attr('src', listSong[a].link);
    $('#song-name').html(listSong[a].name);
    $('#singer-name').html(listSong[a].singer);
    console.log(listSong[a]);
    b = parseInt(a);

}

var listSong = '';

// $(document).ready(function () {
//     $.ajax({
//         url: LIST_SONG_API,
//         type: 'POST',
//         contentType: 'application/json; charset=utf-8',
//         success: function (data) {
//             listSong = data;
//             var content = '';
//             for (var i = 0; i < listSong.length; i++) {
//                 // content += '<div class="border-bottom">';
//                 // content += '<a href="#" style="border: none" class="list-group-item list-group-item-action">';
//                 // content += '<div class="song-item row p-2">';
//                 // content += '<div class="d-flex align-items-center h3 col-1">' + (i + 1) + '</div>';
//                 // content += '<div class="song-thumbnail col-2">';
//                 // content += '<img class="w-100" src="' + listSong[i].thumbnail + '" alt="">';
//                 // content += '</div>';
//                 // content += '<div class="d-flex align-content-center col-5">';
//                 // content += '<div class="song-name">' + listSong[i].name + '</div>';
//                 // content += '<div class="song-singer">' + listSong[i].singer + '</div>';
//                 // content += '</div>';
//                 // content += '<div class="song-control d-flex align-items-center col-2" onclick="playSong(\'' + listSong[i].link + '\', \'' + listSong[i].name + '\', \'' + listSong[i].singer + '\')"><button class="btn btn-outline-dark rounded-circle"><i class="fa fa-play" aria-hidden="true"></i></button></div>';
//                 // content += '<div class=""><button class="btn" href="song-detail.html?id=' + listSong[i].id + '">Detail</button></div>';
//                 // content += '</div>';
//                 // content += '</a>';
//                 // content += '</div>';
//
//                 content+='<div class="m-3 z-depth-1 p-0 rounded bg-white">';
//                 content+='<div  style="width: 300px;height: 250px" class="view overlay border-bottom"  onclick="playSong(\'' + i + '\')">';
//                 content+='<div class="border">';
//                 content+='<img class="card-img-top p-0" src="' + listSong[i].thumbnail + '" alt="Mấy tội đồ lười không up ảnh"></div>';
//                 content+='<a><div class="mask rgba-white-slight waves-effect waves-light flex-center rgba-green-slight"><button style="font-size: 64px;color: rgba(0,0,0,0.69);" ><i class="fa fa-play-circle" aria-hidden="true"></i></div></a>';
//                 content+='</div>';
//                 content+=' <div style="width: 300px" class="card-body">';
//                 content+='<h4 class="card-title">' + listSong[i].name + '</h4>';
//                 content+=' <p class="card-text">' + listSong[i].singer + '</p>';
//                 content+=' </div>';
//                 content+='</div>';
//
//             }
//             $('#list-song').html(content);
//         },
//         error: function (jqXHR) {
//             alert(data.token);
//             if (Object.keys(jqXHR.responseJSON.error).length > 0) {
//
//                 $('#summary')
//                     .text(`please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
//                 validater.showErrors(jqXHR.responseJSON.error);
//                 console.log(jqXHR.responseJSON.error);
//                 console.log(jqXHR)
//             }
//
//         }
//     });
//     return false;
//
//
// });



var player = document.getElementById('music'); // id for audio element
var duration; // Duration of audio clip
btnPlayPause = document.getElementById('btnPlayPause');
btnMute = document.getElementById('btnMute');
progressBar = document.getElementById('progress-bar');
volumeBar = document.getElementById('volume-bar');
source = document.getElementById('audioSource');

// Update the video volume
volumeBar.addEventListener("change", function (evt) {
    function displayMessage(message, canPlay) {
        var element = document.querySelector('#message');
        element.innerHTML = message;
        element.className = canPlay ? 'info' : 'error';
    }

    player.volume = parseInt(evt.target.value) / 10;
});


player.addEventListener('timeupdate', updateProgressBar, false);

player.addEventListener('play', function () {
    changeButtonType(btnPlayPause, '<i class="fa fa-pause" style="font-size: 32px" aria-hidden="true">');
    document.getElementById("spin-img").classList.add('spin');
}, false);

player.addEventListener('pause', function () {
    changeButtonType(btnPlayPause, '<i class="fa fa-play" style="font-size: 32px" aria-hidden="true">');
    document.getElementById("spin-img").classList.remove('spin');
}, false);


player.addEventListener('volumechange', function (e) {
    if (player.muted) changeButtonType(btnMute, '<i class="fa fa-volume-off" aria-hidden="true"></i>');
    else changeButtonType(btnMute, '<i class="fa fa-volume-up" aria-hidden="true"></i>');
}, false);

player.addEventListener('ended', function () {
    this.pause();
}, false);

progressBar.addEventListener("click", seek);

function seek(e) {
    if (player.src) {
        var percent = e.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        e.target.value = Math.floor(percent / 100);
        e.target.innerHTML = progressBar.value + '% played';
    }
}

function playPauseAudio() {
    if (player.src) {
        if (player.paused || player.ended) {
            changeButtonType(btnPlayPause, '<i class="fa fa-pause" style="font-size: 32px" aria-hidden="true"></i>');
            player.play();
        }
        else {
            changeButtonType(btnPlayPause, '<i class="fa fa-play" style="font-size: 32px" aria-hidden="true"></i>');
            player.pause();
        }
    }
}

function nextBtn() {
    playSong(b += 1)
}

function prevBtn() {
    playSong(b -= 1)

}

function muteVolume() {
    if (player.src) {
        if (player.muted) {
            // Change the button to a mute button
            changeButtonType(btnMute, '<i class="fa fa-volume-up" aria-hidden="true"></i>');
            player.muted = false;
        }
        else {
            // Change the button to an unmute button
            changeButtonType(btnMute, '<i class="fa fa-volume-off" aria-hidden="true"></i>');
            player.muted = true;
        }
    }
}


function convertTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    sec = (sec < 10) ? "0" + sec : sec;
    document.getElementById('currentTime').innerHTML = min + ":" + sec;
    totalTime(Math.round(player.duration));
}

function totalTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    document.getElementById('currentTime').innerHTML += " / " + min + ":" + sec;
}

function updateProgressBar() {
    var percentage = Math.floor((100 / player.duration) * player.currentTime);
    progressBar.value = percentage;
    progressBar.innerHTML = progressBar.title = percentage + '% played';
    convertTime(Math.round(player.currentTime));
}

function changeButtonType(btn, value) {
    btn.title = value;
    btn.innerHTML = value;
}

function resetPlayer() {
    progressBar.value = 0;

    player.src = '';

    player.currentTime = 0;

    changeButtonType(btnPlayPause, 'play');
}

function displayMessage(message, canPlay) {
    var element = document.querySelector('#message');
    element.innerHTML = message;
    element.className = canPlay ? 'info' : 'error';
}


