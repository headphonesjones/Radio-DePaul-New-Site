/*
  Copyright 2010 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
/**
 * @fileoverview Bookmark bubble library. This is meant to be included in the
 * main JavaScript binary of a mobile web application.
 *
 * Supported browsers: iPhone / iPod / iPad Safari 3.0+
 */
var google=google||{};google.bookmarkbubble=google.bookmarkbubble||{},google.bind=function(e,t){return function(){return e.apply(t,arguments)}},google.abstractMethod=function(){throw Error("Unimplemented abstract method.")},google.bookmarkbubble.Bubble=function(){this.boundScrollHandler_=google.bind(this.setPosition,this),this.element_=null,this.hasBeenDestroyed_=!1},google.bookmarkbubble.Bubble.prototype.showIfAllowed=function(){return this.isAllowedToShow_()?(this.show_(),!0):!1},google.bookmarkbubble.Bubble.prototype.showIfAllowedWhenLoaded=function(e){if(!this.isAllowedToShow_())return!1;var t=this,n=t.loadImg_=document.createElement("img");return n.src=t.getIconUrl_(),n.onload=function(){n.complete&&(delete t.loadImg_,n.onload=null,t.show_(),e&&e())},n.onload(),!0},google.bookmarkbubble.Bubble.prototype.setHashParameter=google.abstractMethod,google.bookmarkbubble.Bubble.prototype.hasHashParameter=google.abstractMethod,google.bookmarkbubble.Bubble.prototype.NUMBER_OF_TIMES_TO_DISMISS=2,google.bookmarkbubble.Bubble.prototype.TIME_UNTIL_AUTO_DESTRUCT=15e3,google.bookmarkbubble.Bubble.prototype.LOCAL_STORAGE_PREFIX="BOOKMARK_",google.bookmarkbubble.Bubble.prototype.DISMISSED_="DISMISSED_COUNT",google.bookmarkbubble.Bubble.prototype.IMAGE_ARROW_DATA_URL_="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAMAAABSrFY3AAABKVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAADf398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD09PQAAAAAAAAAAAC9vb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fUAAAAAAAAAAAAAAADq6uoAAAAAAAAAAAC8vLzU1NTT09MAAADg4OAAAADs7OwAAAAAAAAAAAD///+cueenwerA0vC1y+3a5fb5+/3t8vr4+v3w9PuwyOy3zO3h6vfh6vjq8Pqkv+mat+fE1fHB0/Cduuifu+iuxuuivemrxOvC1PDz9vzJ2fKpwuqmwOrb5vapw+q/0vDf6ffK2vLN3PPprJISAAAAQHRSTlMAAAEGExES7FM+JhUoQSxIRwMbNfkJUgXXBE4kDQIMHSA0Tw4xIToeTSc4Chz4OyIjPfI3QD/X5OZR6zzwLSUPrm1y3gAAAQZJREFUeF5lzsVyw0AURNE3IMsgmZmZgszQZoeZOf//EYlG5Yrhbs+im4Dj7slM5wBJ4OJ+undAUr68gK/Hyb6Bcp5yBR/w8jreNeAr5Eg2XE7g6e2/0z6cGw1JQhpmHP3u5aiPPnTTkIK48Hj9Op7bD3btAXTfgUdwYjwSDCVXMbizO0O4uDY/x4kYC5SWFnfC6N1a9RCO7i2XEmQJj2mHK1Hgp9Vq3QBRl9shuBLGhcNtHexcdQCnDUoUGetxDD+H2DQNG2xh6uAWgG2/17o1EmLqYH0Xej0UjHAaFxZIV6rJ/WK1kg7QZH8HU02zmdJinKZJaDV3TVMjM5Q9yiqYpUwiMwa/1apDXTNESjsAAAAASUVORK5CYII=",google.bookmarkbubble.Bubble.prototype.IMAGE_CLOSE_DATA_URL_="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEXM3fm+1Pfb5/rF2fjw9f23z/aavPOhwfTp8PyTt/L3+v7T4vqMs/K7zP////+qRWzhAAAAXElEQVQIW2O4CwUM996BwVskxtOqd++2rwMyPI+ve31GD8h4Madqz2mwms5jZ/aBGS/mHIDoen3m+DowY8/hOVUgxusz+zqPg7SvPA1UxQfSvu/du0YUK2AMmDMA5H1qhVX33T8AAAAASUVORK5CYII=",google.bookmarkbubble.Bubble.prototype.REL_ICON_="apple-touch-icon-precomposed",google.bookmarkbubble.Bubble.prototype.MOBILE_SAFARI_USERAGENT_REGEX_=/iPhone|iPod|iPad/,google.bookmarkbubble.Bubble.prototype.IPAD_USERAGENT_REGEX_=/iPad/,google.bookmarkbubble.Bubble.prototype.isAllowedToShow_=function(){return this.isMobileSafari_()&&!this.hasBeenDismissedTooManyTimes_()&&!this.isFullscreen_()&&!this.hasHashParameter()},google.bookmarkbubble.Bubble.prototype.show_=function(){this.element_=this.build_(),document.body.appendChild(this.element_),this.element_.style.WebkitTransform="translateY("+this.getHiddenYPosition_()+"px)",this.setHashParameter(),window.setTimeout(this.boundScrollHandler_,1),window.addEventListener("scroll",this.boundScrollHandler_,!1),window.setTimeout(google.bind(this.autoDestruct_,this),this.TIME_UNTIL_AUTO_DESTRUCT)},google.bookmarkbubble.Bubble.prototype.destroy=function(){if(this.hasBeenDestroyed_)return;window.removeEventListener("scroll",this.boundScrollHandler_,!1),this.element_&&this.element_.parentNode==document.body&&(document.body.removeChild(this.element_),this.element_=null),this.hasBeenDestroyed_=!0},google.bookmarkbubble.Bubble.prototype.rememberDismissal_=function(){if(window.localStorage)try{var e=this.LOCAL_STORAGE_PREFIX+this.DISMISSED_,t=Number(window.localStorage[e])||0;window.localStorage[e]=String(t+1)}catch(n){}},google.bookmarkbubble.Bubble.prototype.hasBeenDismissedTooManyTimes_=function(){if(!window.localStorage)return!0;try{var e=this.LOCAL_STORAGE_PREFIX+this.DISMISSED_,t=Number(window.localStorage[e])||0;return t>=this.NUMBER_OF_TIMES_TO_DISMISS}catch(n){return!0}},google.bookmarkbubble.Bubble.prototype.isFullscreen_=function(){return!!window.navigator.standalone},google.bookmarkbubble.Bubble.prototype.isMobileSafari_=function(){return this.MOBILE_SAFARI_USERAGENT_REGEX_.test(window.navigator.userAgent)},google.bookmarkbubble.Bubble.prototype.isIpad_=function(){return this.IPAD_USERAGENT_REGEX_.test(window.navigator.userAgent)},google.bookmarkbubble.Bubble.prototype.setPosition=function(){this.element_.style.WebkitTransition="-webkit-transform 0.7s ease-out",this.element_.style.WebkitTransform="translateY("+this.getVisibleYPosition_()+"px)"},google.bookmarkbubble.Bubble.prototype.closeClickHandler_=function(){this.destroy(),this.rememberDismissal_()},google.bookmarkbubble.Bubble.prototype.autoDestruct_=function(){if(this.hasBeenDestroyed_)return;this.element_.style.WebkitTransition="-webkit-transform 0.7s ease-in",this.element_.style.WebkitTransform="translateY("+this.getHiddenYPosition_()+"px)",window.setTimeout(google.bind(this.destroy,this),700)},google.bookmarkbubble.Bubble.prototype.getVisibleYPosition_=function(){return this.isIpad_()?window.pageYOffset+17:window.pageYOffset-this.element_.offsetHeight+window.innerHeight-17},google.bookmarkbubble.Bubble.prototype.getHiddenYPosition_=function(){return this.isIpad_()?window.pageYOffset-this.element_.offsetHeight:window.pageYOffset+window.innerHeight},google.bookmarkbubble.Bubble.prototype.iconUrl_,google.bookmarkbubble.Bubble.prototype.getIconUrl_=function(){if(!this.iconUrl_){var e=this.getLink(this.REL_ICON_);if(!e||!(this.iconUrl_=e.href))this.iconUrl_="data:image/png;base64,"}return this.iconUrl_},google.bookmarkbubble.Bubble.prototype.getLink=function(e){e=e.toLowerCase();var t=document.getElementsByTagName("link");for(var n=0;n<t.length;++n){var r=t[n];if(r.getAttribute("rel").toLowerCase()==e)return r}return null},google.bookmarkbubble.Bubble.prototype.build_=function(){var e=document.createElement("div"),t=this.isIpad_();e.style.position="absolute",e.style.zIndex=1e3,e.style.width="100%",e.style.left="0",e.style.top="0";var n=document.createElement("div");n.style.position="relative",n.style.width="214px",n.style.margin=t?"0 0 0 82px":"0 auto",n.style.border="2px solid #fff",n.style.padding="20px 20px 20px 10px",n.style.WebkitBorderRadius="8px",n.style.WebkitBoxShadow="0 0 8px rgba(0, 0, 0, 0.7)",n.style.WebkitBackgroundSize="100% 8px",n.style.backgroundColor="#b0c8ec",n.style.background="#cddcf3 -webkit-gradient(linear, left bottom, left top, "+t?"from(#cddcf3), to(#b3caed)) no-repeat top":"from(#b3caed), to(#cddcf3)) no-repeat bottom",n.style.font="13px/17px sans-serif",e.appendChild(n),n.innerHTML="Install this web app on your phone: tap <b style=\"font-size:15px\">+</b> and then <b>'Add to Home Screen'</b>";var r=document.createElement("div");r.style["float"]="left",r.style.width="55px",r.style.height="55px",r.style.margin="-2px 7px 3px 5px",r.style.background="#fff url("+this.getIconUrl_()+") no-repeat -1px -1px",r.style.WebkitBackgroundSize="57px",r.style.WebkitBorderRadius="10px",r.style.WebkitBoxShadow="0 2px 5px rgba(0, 0, 0, 0.4)",n.insertBefore(r,n.firstChild);var i=document.createElement("div");i.style.backgroundImage="url("+this.IMAGE_ARROW_DATA_URL_+")",i.style.width="25px",i.style.height="19px",i.style.position="absolute",i.style.left="111px",t?(i.style.WebkitTransform="rotate(180deg)",i.style.top="-19px"):i.style.bottom="-19px",n.appendChild(i);var s=document.createElement("a");return s.onclick=google.bind(this.closeClickHandler_,this),s.style.position="absolute",s.style.display="block",s.style.top="-3px",s.style.right="-3px",s.style.width="16px",s.style.height="16px",s.style.border="10px solid transparent",s.style.background="url("+this.IMAGE_CLOSE_DATA_URL_+") no-repeat",n.appendChild(s),e};