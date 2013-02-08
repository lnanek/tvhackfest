var comments = {
  name: '',
  showTime: 0,
  commentList: null, 
  myComments: {},
  comments: {},
  addComment: function (comment) {
    var self = this;
    var _comment = $("<div>").html(comment.name + ': ' + comment.msg);  
    
    console.log('comment', comment);
    
    self.commentList.prepend(_comment);
    setTimeout(function () {
      _comment.fadeOut(1000);
    }, 5000);
  }, 
  populateComments: function (t) {
    var self = this;
    if (!_.size(self.comments)) return;
    if (self.comments[t] && self.comments[t].length) {
      for (var i = 0; i < self.comments[t].length; i++) {
        self.addComment(self.comments[t][i]);
      
      }
    }
  },
  sendComment: function (msg) {
    var self = this;
    var comment = {
      name: self.name,
      time: self.showTime,
      msg: msg
    };
    self.addComment(comment);
    
    $.ajax({
      dataType: "json",
      url: serverUrl + 'js/data/comments' + programTitle + '.json',
      data: comment,
      success: function (data) {
        console.log('save', data);
      }
    });
  },
  timer: function () {
    var self = this;
    
    self.showTime++;
    self.populateComments(self.showTime);
  },
  init: function () {
    var self = this;
    
    self.name = 'user'+Math.round(Math.random()*100);
    $('#myname').html(self.name);
    
    self.commentList = $('#commentList');
    
    $.ajax({
      dataType: "json",
      url: serverUrl + 'js/data/comments' + programTitle + '.json',
      //  data: data,
      success: function (data) {
        //        self.comments = data;
        self.comments = {};
        for (var i = 0; i < data.length; i++) {
          var comment = data[i];
          if (!self.comments[comment.time]) {
            self.comments[comment.time] = [];
          }
          self.comments[comment.time].push(comment);
          
        //          console.log('self.comments', self.comments);
        }
      }
    });
    
    setInterval(_.bind(self.timer, self), 1000);
  }
};

//$(document).ready(function() {
  
//});
//
$(document).on('ready', function () {
  var commentField = $('#commentMsg');
  var submit = function (str) {
    alert(str);
  };
  console.log('commentField', commentField);
  
  // comments.init();
  commentField.on('keypress', function(e,d) {
    if (e.charCode == 13) { // enter pressed
      
      comments.sendComment.call(comments, commentField.val());
      setTimeout(function () {
        commentField.val('');
      }, 10);
    }
});
  
  $('#comment').swipe( {
    swipe:function(event, direction, distance, duration, fingerCount) {
      if (direction == 'right') {
        $.ajax({
          dataType: "json",
          url: serverUrl + 'js/data/comments' + programTitle + '.json',
          data: {
            clean:1
          },
          success: function (data) {
            console.log('clean', data);
          }
        });
      }
    },
    threshold:0
  });

  commentField.on('blur', function () {
    commentField.val(''); 
  });

});