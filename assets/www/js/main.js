<<<<<<< HEAD
serverUrl = "http://tvhackfest.workatplay.com/server.php?_url=";
serverUrl = window.location.href + 'server.php?_url=';

ready = false;
console.log("main.js ran");

function onBackButtonDown(e) { 
=======
function onBackButtonDown(e) {
>>>>>>> f27798df6ef4901a8b7935424e502a7c2cd52f9e
  console.log("onBackButtonDown()");
    
  if($.mobile.activePage.is('#formPage')){
    e.preventDefault();
    navigator.app.exitApp();
  } else {
    navigator.app.backHistory();
  }
}

window.echo = function(str, callback) {
  if (cordova && cordova.exec) {
    console.log("echo()");
    cordova.exec(callback, function(err) {
      callback('Nothing to echo.');
    }, "Echo", "echo", ["Message to Java."]);
  }
};

window.result = function(callback) {
  if (cordova && cordova.exec) {
    cordova.exec(callback, $.noop, "Echo", "result", []);
  }
};

var resultObject;
// Default result values
var contentId = "c04a2c84-6e8d-11e2-a9cd-fa163e53d66f";
var programTitle = "the_simpsons_s24_e9";
var referenceOffset = 11;

var counter = 0;
var likeTimes = [];

function onDeviceReady() {
  ready = true;
  console.log("onDeviceReady()");
    
  document.addEventListener("backbutton", onBackButtonDown, true);

  window.echo("echome", function(echoValue) {
    // console.log("echome()");
    // alert(echoValue); // should alert true.
  });

  window.result(function(jsonString) {
    alert("result()");
    alert(jsonString);
    
    resultObject = jQuery.parseJSON(jsonString);

    if (resultObject.content_id) {
      window.contentId = resultObject.content_id;
    }

    for(var i = 0; i < resultObject.content_attrs.length; i++) {
      var pair = resultObject.content_attrs[i];
      if (pair.name == "program_title" && pair.value) {
        window.programTitle = pair.value;
        $('#show-1').val(pair.value);
      } else if (pair.name == "reference_offset" && pair.value) {
        window.referenceOffset = parseInt(pair.value[0]);
      }
    }

    counter = referenceOffset;
  });
  
  //var lastTime = new Date();
<<<<<<< HEAD
  var timer = $('.showTimer');
  var updateTimer = function() {
    counter++;
    var sec = counter/10;
    timer.text("Time: " + sec + 's');
    if (sec == Math.round(sec)) {
      console.log(sec);
      $(document).trigger('showTimeUpdate', [sec]); // notify others 
    }
  };
  setInterval(updateTimer, 100);    
    
  window.echo("echome", function(echoValue) {
    alert(echoValue == "echome"); // should alert true.
  });
    
  heatmap.init();
  comments.init();
=======
  // var timer = $('.showTimer');
  // var updateTimer = function() {
  //   counter++;
  //   timer.text("Time: " + (counter / 10) + 's');
  //   $(document).trigger('showTimeUpdate', [Math.round((counter/10))]); // notify others
  // };
  // setInterval(updateTimer, 100);
        
>>>>>>> f27798df6ef4901a8b7935424e502a7c2cd52f9e
}

function onLikeThis() {
  likeTimes.push(counter / 10);
}

<<<<<<< HEAD
//var context = document.getElementById('heatmap').getContext('2d');

//window.requestAnimFrame = function(){
//    return (
//        window.requestAnimationFrame       || 
//        window.webkitRequestAnimationFrame || 
//        window.mozRequestAnimationFrame    || 
//        window.oRequestAnimationFrame      || 
//        window.msRequestAnimationFrame     || 
//        function(/* function */ callback){
//            window.setTimeout(callback, 1000 / 60);
//        }
//    );
//}();
//
//requestAnimFrame(update);
//
//function update() {
//  requestAnimFrame(update);
//	
//  context.fillStyle   = '#000';
//  context.strokeStyle = '#000';
//  context.lineWidth   = 4;
//  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
//    
//  for(var i = 0; i < likeTimes.length; i++) {
//    var likeTime = likeTimes[i];
//    context.fillStyle   = '#f00';
//    context.strokeStyle = '#f00';
//    context.lineWidth   = 4;
//    var time = (likeTime / counter) * context.canvas.width;
//    context.fillRect(time, 0, 10, context.canvas.height);
//  }
//    
//}
=======
// var context = document.getElementById('heatmap').getContext('2d');

// window.requestAnimFrame = function(){
//     return (
//         window.requestAnimationFrame       || 
//         window.webkitRequestAnimationFrame || 
//         window.mozRequestAnimationFrame    || 
//         window.oRequestAnimationFrame      || 
//         window.msRequestAnimationFrame     || 
//         function(/* function */ callback){
//             window.setTimeout(callback, 1000 / 60);
//         }
//     );
// }();

// requestAnimFrame(update);

// function update() {
//   requestAnimFrame(update);
	
//   context.fillStyle   = '#000';
//   context.strokeStyle = '#000';
//   context.lineWidth   = 4;
//   context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    
//   for(var i = 0; i < likeTimes.length; i++) {
//     var likeTime = likeTimes[i];
//     context.fillStyle   = '#f00';
//     context.strokeStyle = '#f00';
//     context.lineWidth   = 4;
//     var time = (likeTime / counter) * context.canvas.width;
//     context.fillRect(time, 0, 10, context.canvas.height);
//   }
    
// }
>>>>>>> f27798df6ef4901a8b7935424e502a7c2cd52f9e

// If not PhoneGap device, then run onload.
window.onload = function () {
	if(!window.device) {
		onDeviceReady();
	}
};

// If PhoneGap, run when ready.
document.addEventListener('deviceready', onDeviceReady, false);

$( document ).bind( "pageshow", function( event, data ){
  // var curPage = $(this).find('.ui-page-active');
  
  // data.prevPage.find('#footer').detach().appendTo(curPage);
  // data.prevPage.find('#heatmap').detach().appendTo(curPage.find('.content'));
  // console.log('pageshow', curPage, data.prevPage);
});

$('body').on('click', function() {
  console.log('click');
  likeTimes.push(counter / 10);
});
