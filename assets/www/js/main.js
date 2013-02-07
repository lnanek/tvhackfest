
console.log("main.js ran");

function onBackButtonDown(e) { 
    console.log("onBackButtonDown()");
    
    if($.mobile.activePage.is('#formPage')){
        e.preventDefault();
        navigator.app.exitApp();
    } else {
        navigator.app.backHistory();
    }
}

function onload() {
    console.log("onload()");
    
    document.addEventListener("backbutton", onBackButtonDown, true);

    //var lastTime = new Date();
    var counter = 0;
    var updateTimer = function() {
    	counter++;
    	$('#showTimer').text("Time: " + counter);
    	setTimeout(updateTimer, 100);
    };
    updateTimer();    
}

