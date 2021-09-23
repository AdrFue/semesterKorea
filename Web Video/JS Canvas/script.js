let myCanvas = document.getElementById("jsCanvas");
let ctx = myCanvas.getContext("2d");

let canvasAniId = requestAnimationFrame(canvasAnimation);

let cnt = 0;
let backRadius = 0;
let spotRadiusL = 0;
let spotRadiusM = 0;
let spotRadiusS = 0;
let spotRadiusXS = 0;

let objs = [];
objs[0] = new mySquare(10, 50, 20, 20, "blue");
objs[1] = new mySquare(400, 550, 20, 20, "red");
objs[2] = new mySquare(50, 400, 20, 20, "green");
objs[3] = new myCircle(50, 50, 30, "white");

function canvasAnimation() {
  clearCanvas();
  cnt++;
  aniAtStart();

  if (cnt > 110) {
    for (let i = 0; i < objs.length; i++) {
      objs[i].move();
    }
  }

  canvasAniId = requestAnimationFrame(canvasAnimation);
}

function clearCanvas() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

function aniAtStart() {
  ctx.fillStyle = "rgb(245, 188, 66)";
  ctx.beginPath();
  if (backRadius < myCanvas.width*2) backRadius = cnt*20;
  ctx.arc(myCanvas.width/2, myCanvas.height/1.5, backRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "black";
  if (50 < cnt && cnt < 100) {
    spotRadiusL = cnt;
    spotRadiusM = cnt*0.5;
    spotRadiusS = cnt*0.4;
    spotRadiusXS = cnt*0.2;
  }
  
  ctx.beginPath();
  ctx.arc(myCanvas.width/2, myCanvas.height/2, spotRadiusL, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(myCanvas.width/1.7, myCanvas.height/3.6, spotRadiusM, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(myCanvas.width/1.35, myCanvas.height/2.1, spotRadiusM, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(myCanvas.width/2.7, myCanvas.height/1.8, spotRadiusS, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(myCanvas.width/3.4, myCanvas.height/1.9, spotRadiusXS, 0, Math.PI * 2);
  ctx.fill();
}