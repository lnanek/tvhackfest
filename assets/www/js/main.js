var serverUrl = "http://tvhackfest.workatplay.com/server.php?_url=";
var serverUrl = window.location.href + 'server.php?_url=';

var ready = false;

var getResult = function(callback) {
  if (cordova && cordova.exec) {
    cordova.exec(callback, $.noop, "Echo", "result", []);
  }
};

var resultObject;
// Default result values
var contentId = "c04a2c84-6e8d-11e2-a9cd-fa163e53d66f";
var programTitle = "the_simpsons_s24_e9";
var referenceOffset = 0;

var seconds = 0;
var data = {
  '0': {
    claps: 0,
    comments: []
  }
};
var claps = [];

var onDeviceReady = function() {
  ready = true;

  getResult(function(resultJson) {
    // alert(resultJson);
    resultObject = jQuery.parseJSON(resultJson);

    if (resultObject.content_id) {
      contentId = resultObject.content_id;
    }
    for(var i = 0; i < resultObject.content_attrs.length; i++) {
      var pair = resultObject.content_attrs[i];
      if (pair.name == "program_title" && pair.value) {
        programTitle = pair.value;
        $('#show-1').val(pair.value);
      } else if (pair.name == "reference_offset" && pair.value) {
        referenceOffset = parseInt(pair.value[0], 10);
      }
    }

    seconds = referenceOffset;
  });

  // comments.init();
};

// If not PhoneGap device, then run onload.
window.onload = function () {
	if(!window.device) {
		onDeviceReady();
	}
};
// If PhoneGap, run when ready.
document.addEventListener('deviceready', onDeviceReady, false);

// Clapping
$('body').on('click', function() {
  // console.log('clap', data[seconds].claps++);
  data[seconds].claps++;
  claps[claps.length - 1]++;
});
setInterval(function() {
  seconds = (parseInt(seconds, 10) + 5).toString();
  // TODO: Extend previos data
  data[seconds] = {
    claps: 0,
    comments: []
  };
  claps = _.last(_.pluck(data, 'claps'), 10); // TODO: Use global points var
}, 5000);