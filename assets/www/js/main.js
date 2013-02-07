
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

function onDeviceReady() {
    console.log("onDocumentReady()");
    
    document.addEventListener("backbutton", onBackButtonDown, true);

	var cw = Raphael.colorwheel($("#input_example .colorwheel")[0],150);
	cw.color("#FF0000");

    cw.onchange(function(c){
        $("#colorDisplay").css("background-color",c.hex);
    	$("#colorDisplay").val(c.hex)
    });
    
}

