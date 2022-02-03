var mbCanvas = document.getElementById("mbCanvas");
var mbContext = mbCanvas.getContext("2d");

var maxiterations = 500;

function mbDraw(mb1, mb2) {
  var imgData = mbContext.getImageData(0,0, mbCanvas.width, mbCanvas.height);
  for (var x = 0; x < mbCanvas.width; x++) {
    for (var y = 0; y < mbCanvas.height; y++) {
      
      var a = mapRange(x, 0, mbCanvas.width, mb1, mb2);
      var b = mapRange(y, 0, mbCanvas.height, mb1, mb2);

      var ca = a;
      var cb = b;

      var n = 0;

      while (n < maxiterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }

      var bright = n * 1/maxiterations;
      bright = Math.sqrt(bright) * 255;

      if (n == maxiterations) {
        bright = 0;
      }

      var pix = (x + y * mbCanvas.width) * 4;
      imgData.data[pix + 0] = bright;
      imgData.data[pix + 1] = bright;
      imgData.data[pix + 2] = bright;
      imgData.data[pix + 3] = 255;
    }

  }

  mbContext.putImageData(imgData, 0, 0);
}

function mapRange (value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}

function mbSubmit() {
  var mb1 = parseFloat(document.getElementById("mb1").value);
  var mb2 = parseFloat(document.getElementById("mb2").value);
  mbContext.clearRect(0, 0, mbCanvas.width, mbCanvas.height);
  mbDraw(mb1, mb2);
}

function ps(mb1, mb2) {
  document.getElementById("mb1").value = mb1;
  document.getElementById("mb2").value = mb2;
  mbContext.clearRect(0, 0, mbCanvas.width, mbCanvas.height);
  mbDraw(mb1, mb2);
}


mbDraw(-1.5, 1.5);