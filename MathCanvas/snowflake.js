function Koch(n, p1, p2) {

    if (n == 0) {
        drawLine(p1.x, p1.y, p2.x, p2.y);
        return;
    }
    else{
        var p3 = {}, p4 = {}, p5 = {};
        var Lx, Ly;

        p3.x = (2 * p1.x + p2.x) / 3;
        p3.y = (2 * p1.y + p2.y) / 3;
        p5.x = (p1.x + 2 * p2.x) / 3;
        p5.y = (p1.y + 2 * p2.y) / 3;

        Lx = (p2.x - p1.x) / 3;
        Ly = (p2.y - p1.y) / 3;

        p4.x = p3.x + Lx * Math.cos(Math.PI / 3) + Ly * Math.sin(Math.PI / 3);
        p4.y = p3.y - Lx * Math.sin(Math.PI / 3) + Ly * Math.cos(Math.PI / 3);
        
        Koch(n-1, p1, p3);
        Koch(n-1, p3, p4);
        Koch(n-1, p4, p5);
        Koch(n-1, p5, p2); 
    }
}

function Draw(number) {
    var depth = number;

    var x0 = { 
        x: 0, y: sfCanvas.offsetHeight / 2 
        };
    var y0 = { 
        x: sfCanvas.offsetWidth, y: sfCanvas.offsetHeight / 2 
        };

    Koch(depth, x0, y0);
}

function drawLine(x0, y0, x1, y1) {
  setTimeout(function() {
    sfContext.beginPath();
    sfContext.moveTo(x0, y0);
    sfContext.lineTo(x1, y1);
    sfContext.stroke();
  }, 100);
}

function sfSubmit() {
    var color = document.getElementById("color").value;
    var curves = document.getElementById("curves").value;

    sfContext.clearRect(0, 0, sfCanvas.width, sfCanvas.height);
    sfContext.strokeStyle= color;
    Draw(curves);
}

var sfCanvas = document.getElementById("sfCanvas");
var sfContext = sfCanvas.getContext("2d");
sfContext.strokeStyle= "white";
Draw(5);
