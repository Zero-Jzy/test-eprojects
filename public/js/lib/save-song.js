// var validater = $('#song-form').validate({
//
//     submitHandler: function (form, event) {
//         event.preventDefault();
//         var senderObject = {
//             name: $(form['name']).val(),
//             singer: $(form['singer']).val(),
//             description: $(form['description']).val(),
//             author: $(form['author']).val(),
//             thumbnail: $(form['thumbnail']).val(),
//             link: $(form['link']).val(),
//         };
//         $.ajax({
//             url: CREATE_SONG_API,
//             type: 'POST',
//             contentType: 'application/json; charset=utf-8',
//             data: JSON.stringify(senderObject),
//             headers: {'authorization': "Basic " + localStorage.getItem('my-token')},
//             success: function (data, textStatus, jqXHR) {
//                 alert(`Lưu thành công bài hát ${data.name}`);
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
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
//
// function formatDate(date) {
//     var d = new Date(date),
//         month = ' ' + (d.getMonth() + 1),
//         day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
//         year = d.getFullYear();
//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;
//     return [year, month, day].join('-');
// }
