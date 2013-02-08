//serverUrl = window.location.href + 'server.php?_url=';
//if (navigator.userAgent.indexOf('GoogleTV')>0 || navigator.userAgent.indexOf('Android')>0) {
  serverUrl = "http://tvhackfest.workatplay.com/server.php?_url=";
//}

ready = false;

window.result = function(callback) {
  if (cordova && cordova.exec) {
    cordova.exec(callback, $.noop, "Appplause", "result", []);
  }
};

var resultObject;
// Default result values
var contentId = "c04a2c84-6e8d-11e2-a9cd-fa163e53d66f";
var programTitle = "the_simpsons_s24_e9";
var referenceOffset = 0;
var ytids = ['5JO6tq-bCkc', 'MiBkjXOdWYY'];
var _index = Math.round(Math.random()*ytids.length)%ytids.length;
var ytid = ytids[_index];
if (ytid == '5JO6tq-bCkc') {
  programTitle = "30_rock_s7_e11";
}

var seconds = '0';
var data = {
  '0': {
    claps: 0,
    comments: []
  }
};
var claps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var maxClaps = 0;

function onDeviceReady() {
  ready = true;

  var myShowIsSet = false;

  window.result(function(jsonString) {
    // alert(jsonString);
    resultObject = jQuery.parseJSON(jsonString);

    if (resultObject.content_id) {
      window.contentId = resultObject.content_id;
    }
    
//    5JO6tq-bCkc
    
    for(var i = 0; i < resultObject.content_attrs.length; i++) {
      var pair = resultObject.content_attrs[i];
      if (pair.name == "program_title" && pair.value) {
        window.programTitle = pair.value;
        $('#myshow').text(programTitle);
        comments.init();
        myShowIsSet = true;
      } else if (pair.name == "reference_offset" && pair.value) {
        window.referenceOffset = parseInt(pair.value[0], 10);
        window.referenceOffset = Math.round(window.referenceOffset / 5) * 5;
      }
    }

    seconds = referenceOffset.toString();
    comments.showTime = referenceOffset;
  });

  setTimeout(function() {
    if (!myShowIsSet) {
      $('#myshow').text(programTitle);
      comments.init();
    }
  }, 2000);
}

// If not PhoneGap device, then run onload.
window.onload = function () {
	if(!window.device) {
		onDeviceReady();
	}
};

// If PhoneGap, run when ready.
document.addEventListener('deviceready', onDeviceReady, false);

var plause = $('#plause');
plause.css({ opacity: '0.3' });

// Clapping
$('body').on('click', function() {
  // console.log('clap', data[seconds].claps++);
  data[seconds].claps++;
  claps[claps.length - 1]++;
  if (maxClaps < claps[claps.length - 1]) {
    maxClaps = claps[claps.length - 1];
    plause.css({ opacity: '1' });
  }
});
setInterval(function() {
  var lastClaps = 0;
  if (data[seconds] && data[seconds].claps) {
    lastClaps = data[seconds].claps;
  }

  console.log('claps', lastClaps);

  seconds = (parseInt(seconds, 10) + 5).toString();
  // TODO: Extend previous data
  data[seconds] = {
    claps: 0,
    comments: []
  };
  if (clientMode > 1) {
    claps.shift();
    claps.push(_.random(0, 14));
  } else {
    claps = _.last(_.pluck(data, 'claps'), 10); // TODO: Use global points var
  }
  while (claps.length < 10) {
    claps.unshift(0);
  }
  maxClaps = _.max(claps);

  plause.css({ opacity: 0.3 + (lastClaps / maxClaps) * 0.7 });
}, 5000);