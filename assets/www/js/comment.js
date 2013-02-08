$(document).on('pageinit', function () {
  var commentField = $('#commentMsg');
  
  var submit = function (str) {
    alert(str);
  };
  
  commentField.on('keypress', function(e,d) {
//    console.log(e,d);
    if (e.charCode == 13) { // enter pressed
      submit(commentField.val());
      commentField.val('');
    }
  });
});