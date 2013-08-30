app.loadNowPlaying = function() {
    $.ajax({
        url: domain + "/api/getOnAir.js",
        dataType: "jsonp",
        type: "GET",
        processData: false,
        contentType: "application/json",
        success: function(data) {
            var html = '';
            if ( data != null ) {
                var name = '<a href="/show/?id=' + data['show']['id'] + '"><p style="text-align:center;">' + data['show']['title'] + '</p>';
                var photo = '<img class="now-playing-image" src="' + data['show']['photo_small'] + '" /></a>';
                if (data['show']['genres'] != '') {
                    genres = '<p>' + data['show']['genres'] + '</p>';
                } else {
                    genres = 'N/A'
                }
                var hosts = "<ul>";
                for (var i = 0; i < data['show']['hosts'].length; i++) {
                    hosts += '<a href="/person/?id=' + data['show']['hosts'][i]['id'] + '"><li style="height:50px;background: url(' + data['show']['hosts'][i]['photo_thumb'] + ') top right no-repeat;"><p>' + data['show']['hosts'][i]['name'] + '</p></li></a>';
                }
                hosts += '</ul>';

                html += name + photo + genres + hosts + '</ul></div>';    
                $('#now_playing img').replaceWith(html);
//                $(html).appendTo('#now_playing');
            }
            else { 
                $("<p>Data Unavailable</p>").appendTo('#sidebar #now_playing'); 
            }
        }
    });
}

app.loadNowPlaying();