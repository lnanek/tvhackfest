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
    
    likeTimes.push(comment.time*10);
  }, 
  populateComments: function (e, t) {
//    console.log(t, 'populateComments');
    //    if (t == )
    
    var self = this;
    self.showTime = t;
    
    if (!_.size(self.comments)) return;
    if (self.comments[t] && self.comments[t].length) {
//      var comment = self.comments[t].shift();
      
      for (var i = 0; i < self.comments[t].length; i++) {
        self.addComment(self.comments[t][i]);
      }
    }
  },
  sendComment: function () {
    var self = this;
    var myComment = $('#myComment');
    var comment = {
      name: 'me',
      time: self.showTime,
      msg: myComment.val()
    };
    self.addComment(comment);
    myComment.val('');
    
    $.ajax({
      dataType: "json",
      url: serverUrl + 'js/data/comments.json',
      data: comment,
      success: function (data) {
        console.log('save', data);
      }
    });
  },
  init: function () {
    var self = this;
    
    self.commentList = $('#commentList');
    
    $(document).on('showTimeUpdate', _.bind(self.populateComments, self));
    $('#sendComment').click(_.bind(self.sendComment, self));
    
    $.ajax({
      dataType: "json",
      url: serverUrl + 'js/data/comments.json',
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
//    $.ajax({
//      url: 'http://tvhackfest.workatplay.com/server.php',
//      //  data: data,
//      success: function (data) {
//        alert(data);
//      }
//    });
  }
};

//$(document).ready(function() {
  
//});