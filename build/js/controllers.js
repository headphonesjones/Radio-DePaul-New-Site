"use strict";var controllers=angular.module("radio.controllers",[]);controllers.controller("navCtrl",["$scope","$location","$rootScope",function(e,t,n){e.navClass=function(e){var n=t.path().substring(1)||"home";return e===n?"active":""},e.isHome=function(){var e=t.path().substring(1)||"home";return"home"===e},e.playMusic=function(){n.$broadcast("player","play")},e.$on("player",function(t,n){n=="playing"&&(e.playing=!0),n=="paused"&&(e.playing=!1)})}]),controllers.controller("sidebarController",["$scope",function(e){e.twitter="radiodepauldjs"}]),controllers.controller("HomeController",["$scope","News","Events","Page",function(e,t,n,r){r.setTitle("Home"),e.page="Radio DePaul",t.query(function(t){e.news=t}),n.query(function(t){e.events=t})}]),controllers.controller("NewsListController",["$scope","News","Page",function(e,t,n){n.setTitle("News"),t.query(function(t){e.news=t})}]),controllers.controller("NewsStoryController",["$scope","News","Page",function(e,t,n){t.get(function(t){e.news=t,n.setTitle(e.news.headline)})}]),controllers.controller("ScheduleController",["$scope","Schedule","Page",function(e,t,n){n.setTitle("Schedule"),t.query(function(t){e.schedule=t}),e.days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],e.selected=e.days[(new Date).getDay()]}]),controllers.controller("OnAirController",["$scope","$rootScope","Shows",function(e,t,n){e.playing=!1,n.onair(function(t){e.show=t}),e.$on("player",function(t,n){n=="play"&&e.playing==0&&e.playMusic()}),e.playMusic=function(){e.soundObject?e.soundObject.play():e.loadSM2(),e.playing=!0,t.$broadcast("player","playing")},e.pauseMusic=function(){e.soundObject.pause(),e.playing=!1,t.$broadcast("player","paused")},e.loadSM2=function(){soundManager.setup({url:"/js/lib/swf/",flashVersion:9,onready:function(){e.soundObject=soundManager.createSound({id:"mySound",url:"http://rock.radio.depaul.edu:8000/stream.mp3&137714603810",autoLoad:!0,autoPlay:!0,volume:100})}})}}]),controllers.controller("AboutController",["$scope","Managers","Awards","$routeParams","Page",function(e,t,n,r,i){i.setTitle("About");var s=r.tab||"managers";e.tabs=["Managers","Contact","Mission Statement","Join Radio DePaul","Sponsor Radio DePaul","Awards and Recognition"];for(var o=0;o<e.tabs.length;o++)e.tabs[o].toLowerCase().replace(/ /g,"_")==s&&(e.tabs.active=e.tabs[o]);t.query(function(t){e.managers=t}),n.query(function(t){e.awards=t})}]),controllers.controller("MediaController",["$scope","Flickr","$http","Page",function(e,t,n,r){r.setTitle("Media"),e.photosets=["72157627431049317","72157627556017792","72157627638190531","72157627555308552","72157627431314949","72157627431238035"]}]),controllers.controller("ShowListController",["$scope","Shows","Page",function(e,t,n){n.setTitle("Shows"),t.query(function(t){e.shows=t}),e.showSearchFilter=function(t){var n=new RegExp(e.showSearchText,"i");return!e.showSearchText||n.test(t.title)}}]),controllers.controller("ShowController",["$scope","Shows","Page",function(e,t,n){t.get(function(t){e.show=t,n.setTitle(e.show.title)})}]),controllers.controller("StaffListController",["$scope","Staff","Page",function(e,t,n){n.setTitle("Staff"),e.currentPage=0,e.pageSize=10,e.filter=function(){e.currentPage=0},t.query(function(t){e.staff=t,e.numberOfPages=function(){return Math.ceil(e.staff.length/e.pageSize)}}),e.staffSearchFilter=function(t){var n=new RegExp(e.staffSearchText,"i");return e.numberOfPages=function(){return Math.ceil(e.filteredItems.length/e.pageSize)},!e.staffSearchText||n.test(t.name)}}]),controllers.controller("StaffController",["$scope","Staff","Page",function(e,t,n){t.get(function(t){e.person=t,n.setTitle(e.person.name)})}]),controllers.controller("ChatController",["$scope","$sce",function(e,t){e.trustSrc=function(e){return t.trustAsResourceUrl(e)},e.chatURL=null,e.showChat=!1,e.toggleChat=function(){e.showChat=!e.showChat,e.chatURL||(e.chatURL="http://cdn.livestream.com/embed/radiodepaulchannel?layout=6&amp;height=300&amp;width=250&amp;showTimestamp=true")}}]),controllers.controller("PopUpPlayerController",["$scope","PopupPlayer",function(e,t){t.get(function(t){e.show=t}),e.popuplayer=data}]),controllers.controller("HeadController",["$scope","Page",function(e,t){e.Page=t}]),controllers.controller("WebcamController",["$scope",function(e){loadJS("http://jwpsrv.com/library/GgcroA5wEeOwaBIxOUCPzg.js",function(){jwplayer("webcam-player").setup({file:"rtmp://ec2-67-202-3-106.compute-1.amazonaws.com/rtplive/mp4:camera.stream",title:"Radio DePaul Webcam",width:"100%",aspectratio:"16:9",fallback:"false",primary:"flash"})})}]);