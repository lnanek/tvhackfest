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
  height = view.size.height * 0.9;
  path.segments = [];
  path.add(view.bounds.bottomLeft);
  path.add(view.bounds.bottomLeft);
  for (var i = 0; i < points; i++) {
    var point = new Point(width / (points - 2)  * i, height);
    path.add(point);
  }
  path.add(view.bounds.bottomRight);
  path.add(view.bounds.bottomRight);
  path.add(view.bounds.bottomCenter);
  path.segments[0].point.x -= 50;
  path.segments[0].point.y += 50;
  path.segments[1].point.x -= 20;
  path.segments[12].point.x += 20;
  path.segments[13].point.x += 50;
  path.segments[13].point.y += 50;
  path.segments[14].point.y += 80;
  path.fullySelected = false;
}

function onFrame(event) {
  for (var i = 0; i < points; i++) {
    var sinSeed = event.count + (i + i % 10) * 100;
    var sinHeight = Math.sin(sinSeed / 200) * (maxClaps + 1) * 0.1;
    // var sinHeight = 0;
    // var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
    var yPos = (claps[i] + sinHeight) / ((maxClaps + 1) * 0.9);
    if (yPos < 0) {
      yPos = 0;
    }
    yPos = height - yPos * height;
    if (yPos < 100) {
      yPos = 100;
    }
    path.segments[i + 2].point.y = yPos;
  }
  path.segments[1].point.y = path.segments[2].point.y;
  path.segments[12].point.y = path.segments[11].point.y;
  path.smooth();
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