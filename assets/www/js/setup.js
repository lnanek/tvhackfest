var clientMode = 0; // 0 - phone, 1 - tv, 2 - smarttv


  var toggleContent = function (comment) {
    $('.content').removeClass('active');
    if (comment) {
      $('#comment').addClass('active');
      $('#commentMsg').focus();
    } else {
      $('#clap').addClass('active');
    }
  }
  
$(document).on('ready', function () {
  if (navigator.userAgent.indexOf('GoogleTV')>0) {
    clientMode = 1;
  }
  
  if (clientMode == 1) {
    $('body').addClass('tv');
  } else if (clientMode == 1) {
    $('body').addClass('tv');
  }
  
  var setsize = function() {
    var height = $(window).height();
    $('.content').css('height', height-200);
  };
  
  $('.content').swipe( {
    swipe:function(event, direction, distance, duration, fingerCount) {
      if (direction == 'left') {
        toggleContent(true);
      } else {
        toggleContent(false);
      }
    },
    threshold:0
  });
  
  setsize();
  $(window).resize(setsize);
});