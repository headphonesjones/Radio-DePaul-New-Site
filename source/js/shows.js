app.loadShows = function() {
    $.ajax({
        url: domain + "/api/shows/getList.js",
        dataType: "jsonp",
        type: "GET",
        processData: false,
        contentType: "application/json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var hosts = "";
                if (data[i]['hosts'].length > 0) {
                    hosts += " with "
                }
                for (var j = 0; j < data[i]['hosts'].length; j++) {
                    if (j != data[i]['hosts'].length - 1) {
                        if (data[i]['hosts'].length > 2) {
                            hosts += " " + data[i]['hosts'][j]['name'] + ',';
                        } else { hosts += data[i]['hosts'][j]['name']; }
                    } else if ( data[i]['hosts'].length == 1) {
                        hosts += data[i]['hosts'][j]['name'];
                    } else { hosts += ' and ' + data[i]['hosts'][j]['name']; }
                }
                $('#shows ul').append('<li><a class="big" href="/show/?id=' + data[i]['id'] + '"><div class="smallBar"><img src="' + data[i]['photo_thumb'] + '" />  <span class="show-name">' + data[i]['title'] + '</span><span class="show-hosts">' + hosts + '</span<</div></a></li>');
            }
            $('#shows .loader-img').remove();
            var pagingOptions = {
              innerWindow: 10,
			  outerWindow: 1
			};
			var options = {
			    page: 16,
			    plugins: [[ 'paging', pagingOptions ]],
			    valueNames: [ 'show-name', 'show-hosts' ],
			    innerWindow: 5
			};
			var showsList = new List('shows', options);
			
        }
    });
}



app.loadShows();

$( document ).ready(function() {
    $("#shows-nav").addClass("left-side-nav-active");
});