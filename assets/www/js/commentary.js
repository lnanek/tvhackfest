var comments = {
  commentList: null, 
  myComments: [],
  comments: [],
  addComment: function (msg) {
    
  }, 
  populateComments: function (e, t) {
//    if (t == )
    
    var self = this;
    
    if (!self.comments.length) return;
    
    var comment = self.comments[0];
    if (comment.time == t) {
      console.log(comment);
      self.comments.shift();
      
      var _comment = $("<div>").html(comment.name + ': ' + comment.msg);  
      self.commentList.append(_comment);
      setTimeout(function () {
        _comment.fadeOut(1000);
      }, 3000);
    }
  },
  init: function () {
    var self = this;
    var base = window.location.href;
    
    self.commentList = $('#commentList');
    
    $(document).on('showTimeUpdate', _.bind(self.populateComments, self));
  
    $.ajax({
      dataType: "json",
      url: base + 'js/data/comments.json',
      //  data: data,
      success: function (data) {
        self.comments = data;
        console.log('comments', data);
      }
    });

  }
};

$(document).ready(function() {
  comments.init();
});