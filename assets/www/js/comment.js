$(document).on('ready', function () {
  var commentField = $('#commentMsg');
  
  var submit = function (str) {
    alert(str);
  };
  console.log('commentField', commentField);
  commentField.on('keypress', function(e,d) {
    if (e.charCode == 13) { // enter pressed
      submit(commentField.val());
      setTimeout(function () {
        commentField.val('');
      }, 10);
    }
  });
});