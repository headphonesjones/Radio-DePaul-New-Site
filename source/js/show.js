app.loadShow = function() {
    var showId = getURLParameter('id');
    $.ajax({
        url: domain + "/api/shows/getShow.js?id=" + showId,
        dataType: "jsonp",
        type: "GET",
        processData: false,
        contentType: "application/json",
        success: function(data) {
            if ( data != null ) {
                    document.title = 'Radio DePaul | ' + data['title'];
                    var html = '<div class="contentBox"><div class="bar">Error</div><p>Sorry. The show you requested cannot be found.</p></div>', photo = "", tweet = "", twitter = "", podcasts = "", title = "", facebook = "", email = "", description = "", stats = "", slots = "", social = "", facebook_fanbox = "", genres = "", hosts = "", disqus_embed = '<div id="comments" class="contentBox clear"><div class="bar">Posts</div><div id="disqus_thread" class="dsq-widget"></div></div>', photo_url = "'" + data['photo_medium'] + "'";
					window.disqus_title = 'Radio DePaul | ' + data['title'], window.disqus_identifier = 'Radio DePaul | ' + data['title'], window.disqus_url = 'http://radio.depaul.edu/show/?id=' + data['id'], window.disqus_shortname = 'radiod                    ';

                    $('#name').text(data['title']);

                    $('.photoBox').css("background", "url("+data['photo_medium']+")"); 

                    $('.genre-box p').text(data['genres']);

                    var hostList = $('ul#hostlist')

                    if (data['scheduled_slots'].length > 0) {
                        slots = '<li><p>Scheduled At</p>'
                        for (var i = 0; i < data['scheduled_slots'].length; i++) {
                                slots += '<p>' + data['scheduled_slots'][i]['slot'] + '</p>';
                        }
                         slots += '</li>';
                    }
                    stats += genres + slots + '</ul></div>';

                if ( data['twitter'] != '' ) {
                    twitter = '<li class="twitter"><a href="http://twitter.com/' + data['twitter'] + '" target="_blank"></a></li>';
                } else { twitter = '<li class="twitter"><a href="http://twitter.com/radiodepauldjs" target="_blank"></a></li>'; }

                if ( data['facebook'] != '' ) {
                    facebook = '<li class="facebook"><a href="http://facebook.com/' + data['facebook'] + '" target="_blank"></a></li>';
                    facebook_fanbox = '<div class="right contentBox clear"><div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like-box href="http://www.facebook.com/' + data['facebook'] + '" width="340" height="272" show_faces="true" border_color="#F6F2F5" stream="true" header="false"></fb:like-box></div>';
                } else { 
                        facebook = '<li class="facebook"><a href="http://facebook.com/radiodepaul" target="_blank"><img src="/img/social/facebook.png" /></a></li>';
                        facebook_fanbox = '<div class="right contentBox clear" style="height:320px"><div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like-box href="http://www.facebook.com/radiodepaul" width="330" height="290" show_faces="true" border_color="#F6F2F5" stream="false" header="false"></fb:like-box></div>';
                    }

                if ( data['email'] != '' ) {
                    email = '<li class="email"><a href="mailto:' + data['email'] + '" target="_blank"></a></li>';
                }

                social = '<div class="right contentBox social-box"><div class="bar">Follow ' + data['title'] + '</div><ul id="personshowSocial">' + twitter + facebook + email + '</ul></div>';

                if (data['long_description'] != '') {
                    description = '<div class="contentBox clear"><div class="bar">Description</div><p>' + data['long_description'] + '</p></div>';
                }



                html = title + photo + social + stats + tweet + hosts + description + podcasts + disqus_embed;        
                $(html).appendTo('#show');
                $.getScript("http://disqus.com/forums/" + disqus_shortname + "/embed.js");

            }
        }
    });
}
app.loadShow();

$( document ).ready(function() {
    $("#shows-nav").addClass("left-side-nav-active");
});