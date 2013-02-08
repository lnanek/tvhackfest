$(document).on('pageinit', function () {
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
  $(document).on('swipeleft', function () {
    toggleContent(true);
  });
  $(document).on('swiperight', function () {
    toggleContent(false);
  });
  
  setsize();
  $(window).resize(setsize);
});