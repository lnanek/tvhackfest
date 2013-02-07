var comments = {
  myComments: [],
  comments: [],
  init: function () {
    
    
    var base = window.location.href;
  
    $.ajax({
      dataType: "json",
      url: base + 'js/data/comments.json',
      //  data: data,
      success: function (data) {
        console.log('comments', data);
      }
    });

  }
};

$(document).ready(function() {
  comments.init();
});