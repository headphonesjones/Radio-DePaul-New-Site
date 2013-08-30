"use strict";var directives=angular.module("radio.directives",[]);directives.directive("pagination",function(){return{template:'<div id="pagination-container"><ul class="pagination" ng-hide="numPages() < 2"><li ng-class="{disabled: currentPage == 0}" ng-click="gotoPage(1)">«</li><li ng-class="{disabled: currentPage == 0}" ng-click="prevPage()"><</li><li ng-repeat="page in pages" ng-class="{active: currentPage+1 == page}"" ng-click="gotoPage(page)">{{page}}</li><li ng-class="{disabled: currentPage>= numPages() - 1}" ng-click="nextPage()">></li><li ng-class="{disabled: currentPage>= numPages() - 1}" ng-click="gotoPage(numPages())">»</li></ul></div>',replace:"true",restrict:"EA",scope:{pageSize:"=",count:"="},link:function(e,t,n){e.$parent.currentPage=e.currentPage=0,e.$parent.pageSize=e.pageSize,e.$watch("count",function(){e.$parent.currentPage=e.currentPage=0;var t=[];for(var n=0;n<e.numPages();n++)t.push(n+1);e.pages=t}),e.numPages=function(){return Math.ceil(e.count/e.pageSize)},e.nextPage=function(){e.numPages()>e.currentPage+1&&(e.$parent.currentPage=e.currentPage=e.currentPage+1)},e.prevPage=function(){e.currentPage-1>0&&(e.$parent.currentPage=e.currentPage=e.currentPage-1)},e.gotoPage=function(t){e.$parent.currentPage=e.currentPage=t-1}}}}),directives.directive("twitter",function(){return{replace:!1,restrict:"EA",scope:{twitter:"="},link:function(e,t,n){t.addClass("ng-hide"),e.$watch("twitter",function(){e.twitter&&twttr.ready(function(r){r.widgets.createTimeline("363308094438133760",angular.element(t)[0],!1,{width:n.width||"700",height:n.height||"250",screenName:e.twitter}),t.removeClass("ng-hide")})},!0)}}}),directives.directive("flickr",function(){return{restrict:"E",controller:function(e){this.setPhotos=function(t){e.photos=t}}}}),directives.directive("lightbox",function(){return{require:"^flickr",replace:!0,restrict:"E",templateUrl:"partials/lightbox.html",link:function(e,t,n,r){e.setCurrentPhoto=function(t){e.currentPhoto=t}}}}),directives.directive("photoset",function(e){return{require:"^flickr",replace:!0,restrict:"E",template:'<div class="thumbnail"><h3>{{photoset.title._content}}</h3><div class="thumbnail-image" ng-click="showPhotoset(photoset);"><img ng-src="http://farm{{photoset.farm}}.static.flickr.com/{{photoset.server}}/{{photoset.primary}}_{{photoset.secret}}_m.jpg" width="215" /></div></div>',scope:{id:"@"},link:function(t,n,r,i){e.jsonp("http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getInfo&photoset_id="+t.id+"&api_key=8ba7f50062d534406009b45aeb73eb90&jsoncallback=JSON_CALLBACK").success(function(e,n,r,i){t.photoset=e.photoset}),t.showPhotoset=function(n){e.jsonp("http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id="+n.id+"&api_key=8ba7f50062d534406009b45aeb73eb90&jsoncallback=JSON_CALLBACK").success(function(e,n,r,s){console.log(e),t.photos=e.photoset.photo,i.setPhotos(e.photoset.photo)})}}}});