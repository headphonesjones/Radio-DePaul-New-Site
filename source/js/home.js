 app.loadStationNews = function() {
    $.ajax({
        url: domain + "/api/news_posts/getList.js",
        dataType: "jsonp",
        type: "GET",
        processData: false,
        contentType: "application/json",
        success: function(data) {
            var html = '';
            $.each(data, function(i, news_post) {
        			html += '<li>\
                    <a class="news_headline" href="/station_news/post/?id=' + news_post.id + '"><p>' + news_post.headline + '<span class="news_time">' + news_post.published_at + '</span></p></a>\
                    <div class="post_content">' + news_post.snippet + '</div><a class="read_more" href="/station_news/post/?id=' + news_post.id + '">Read more ..</a>\
                    </li>';
    		});
            $('#news_widget .loader-img').remove();
			$(html).prependTo('#news_widget ul');
			
        }
    });
}

app.loadStationEvents = function() {
    $.ajax({
        url: domain + "/api/events/getList.js",
        dataType: "jsonp",
        type: "GET",
        processData: false,
        contentType: "application/json",
        success: function(data) {
    var html = '';
            for (var i=0;i<data.length;i++)
            {
              html += '<li class="comingup-list">' +
                        '<p class="comingup-title">' + data[i].title + '</p>' +
                        '<p>' + data[i].first_line + ' - ' + data[i].second_line + '</p>' +
                        '<p>' + data[i].location + '</p>' +
                        '<p>' + data[i].description + '</p></li>';
            }
    html += '</ul></div>';
            $('#events .loader-img').remove();
            $(html).prependTo('#events ul');
            
        }
    });
}

app.loadStationNews();
app.loadStationEvents();

$( document ).ready(function() {
    $("#home").addClass("left-side-nav-active");
});