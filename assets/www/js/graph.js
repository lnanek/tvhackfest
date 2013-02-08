var width, height, center;
var points = 10;
var path = new Path();
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
path.fillColor = 'white';
initializePath();

function initializePath() {
  center = view.center;
  width = view.size.width;
  height = view.size.height;
  path.segments = [];
  path.add(view.bounds.bottomLeft);
  for (var i = 0; i < points; i++) {
    var point = new Point(width / (points - 1) * i, center.y);
    path.add(point);
  }
  path.add(view.bounds.bottomRight);
  path.fullySelected = false;
}

function onFrame(event) {
  // pathHeight += (center.y - mousePos.y - pathHeight) / 10;
  for (var i = points; i > 0; i--) {
    // var sinSeed = event.count + (i + i % 10) * 100;
    // var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
    // var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
    var yPos = height;
    if (claps.length - 1 - (points - i) > 0) {
      yPos -= claps[claps.length - 1 - (points - i)];
    }
    path.segments[i].point.y = yPos;
  }
  // path.smooth();
}

// function onMouseMove(event) {
//   mousePos = event.point;
// }

// function onMouseDown(event) {
// }

// Reposition the path whenever the window is resized:
function onResize(event) {
  initializePath();
}