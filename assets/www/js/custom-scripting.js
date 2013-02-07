
console.log("custom-scripting.js ran");

$(document).bind("mobileinit", function(){
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.phonegapNavigationEnabled = true;
    $.mobile.pushStateEnabled = false;
    $.mobile.ajaxEnabled = false;
});


