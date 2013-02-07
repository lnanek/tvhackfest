
console.log("main.js ran");

document.addEventListener('deviceready', onDeviceReady, false);

function onBackButtonDown(e) { 
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
    cordova.exec(callback, function(err) {
      callback('Nothing to echo.');
    }, "Echo", "echo", [str]);
  }
};

function onDeviceReady() {
  console.log("onDeviceReady()");
    
  document.addEventListener("backbutton", onBackButtonDown, true);

  //var lastTime = new Date();
  var counter = 0;
  var updateTimer = function() {
    counter++;
    $('#showTimer').text("Time: " + (counter/10) + 's');
  };
  setInterval(updateTimer, 100);    
    
  window.echo("echome", function(echoValue) {
    alert(echoValue == "echome"); // should alert true.
  });
}


$(document).ready(function() {
  onDeviceReady();
});