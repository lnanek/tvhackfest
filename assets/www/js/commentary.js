function onload() {
  var base = window.location.href;
  
  console.log("onload()");
  $.ajax({
    dataType: "json",
    url: base + 'js/data/comments.json',
    //  data: data,
    success: function (data) {
      console.log(data);
    }
  });
}

