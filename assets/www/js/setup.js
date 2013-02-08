var clientMode = 0; // 0 - phone, 1 - tv, 2 - smarttv


$(document).on('ready', function () {
  var setsize = function() {
    var height = $(window).height();
    $('.content').css('height', height-200);
  };
  
  var toggleContent = function (comment) {
    $('.content').removeClass('active');
    if (comment) {
      $('#comment').addClass('active');
    } else {
      $('#clap').addClass('active');
    }
  }
  
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