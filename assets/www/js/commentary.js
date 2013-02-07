var comments = {
  showTime: 0,
  commentList: null, 
  myComments: {},
  comments: {},
  addComment: function (comment) {
    var self = this;
    
    var _comment = $("<div>").html(comment.name + ': ' + comment.msg);  
      
    self.commentList.append(_comment);
    setTimeout(function () {
      _comment.fadeOut(1000);
    }, 3000);
  }, 
  populateComments: function (e, t) {
    
    //    if (t == )
    
    var self = this;
    self.showTime = t;
    
    if (!_.size(self.comments)) return;
    if (self.comments[t] && self.comments[t].length) {
      var comment = self.comments[t].shift();
      
      self.addComment(comment);
    }
  },
  sendComment: function () {
    var self = this;
    var myComment = $('#myComment');
    
    self.addComment({
      name: 'me',
      time: self.showTime,
      msg: myComment.val()
    });
    myComment.val('');
  },
  init: function () {
    var self = this;
    var base = window.location.href;
    
    self.commentList = $('#commentList');
    
    $(document).on('showTimeUpdate', _.bind(self.populateComments, self));
    $('#sendComment').click(_.bind(self.sendComment, self));
    
    $.ajax({
      dataType: "json",
      url: base + 'js/data/comments.json',
      //  data: data,
      success: function (data) {
        //        self.comments = data;
        for (var i = 0; i < data.length; i++) {
          var comment = data[i];
          if (!self.comments[comment.time]) {
            self.comments[comment.time] = [];
          }
          self.comments[comment.time].push(comment);
        }
      }
    });

  }
};

$(document).ready(function() {
  comments.init();
});