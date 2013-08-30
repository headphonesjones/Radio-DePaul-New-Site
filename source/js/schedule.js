app.loadSchedule = function() {
    $.ajax({
        url: domain + "/api/getSchedule.js",
        dataType: "jsonp",
        type: "GET",
        processData: false,
        contentType: "application/json",
        success: function(data) {
            var html = "<ul class='schedule-days'>";
            for (var i = 0; i < data.length; i++) {
                var hosts = "";
                if (data[i]['show']['hosts'].length != 0) {
                    hosts = " with "
                }
                for (var j = 0; j < data[i]['show']['hosts'].length; j++) {
                    if (j != data[i]['show']['hosts'].length - 1) {
                        hosts += '<a href="/person/?id=' + data[i]['show']['hosts'][j]['id'] + '">' + data[i]['show']['hosts'][j]['name'] + '</a>, ';
                    } else {
                        hosts += '<a href="/person/?id=' + data[i]['show']['hosts'][j]['id'] + '">' + data[i]['show']['hosts'][j]['name'] + '</a>';
                    }
                }
                for (var k = 0; k < data[i]['days'].length; k++) {
                    html += '<li class="' + data[i]['days'][k] + '" style="display:none;">\
                                <div class="time">\
                                    <p class="scheduleBar startTime">' + data[i]['start_time'] + '</p>\
                                    <p class="scheduleBar endTime">' + data[i]['end_time'] + '</p>\
                                </div>\
                                <a href="/show/?id=' + data[i]['show']['id'] + '"><img src="' + data[i]['show']['photo_small'] + '" /></a>\
                                <p class="showName"><a href="/show/?id=' + data[i]['show']['id'] + '">' + data[i]['show']['title'] + '</a><span> | ' + data[i]['show']['genres'] + '</span></p>\
                                <p class="showDJs">' + hosts + '</p>';
                    if ( data[i]['show']['short_description'] != '' ) {
                        html += '<p class="showBio">' + data[i]['show']['short_description'] + '</p>';
                    }
                    html += '</li>';
                }
            }
            html += "</ul>";
            var d = new Date();
            var weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
            $('#schedule').append('<h1>' + weekday[d.getDay()] + '</h1>');
            $('#schedule').append(html);
            $('#schedule .loader-img').remove();

            $('.' + weekday[d.getDay()]).show();			
        }
    });
}

app.loadSchedule();

$(document).ready( function() {
    $('.schedulebar .tabs li a').click(function() {
       $('.schedulebar .tabs li a').removeClass('selected');
       $(this).addClass('selected');
       $('.schedule-days li').hide(); 
       $('.schedule-days li.' + $(this).data('target')).show();
       $('#schedule h1').text($(this).data('target'));
       if($('.schedule-days li.' + $(this).data('target')).size() < 1) {
         $('.schedule-days').append('<li class="'+ $(this).data('target') +'"><p class="showName">No shows today</p></li>');
       }
    });
});

$( document ).ready(function() {
    $("#schedule-nav").addClass("left-side-nav-active");
});