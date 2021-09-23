class myObject {
  
  inc = 0;

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  isLeft(that) {
    return this.x + this.w < that.x;
  }

  isRight(that) {
    return that.isLeft(this);
  }

  isAbove(that) {
    return (this.y + this.h < that.y);
  }

  isUnder(that) {
    return that.isAbove(this);
  }

  hit(that) {
    return !(this.isLeft(that) || this.isRight(that)
      || this.isAbove(that)|| this.isUnder(that));
  }
  
  checkHit() {
    this.inc = 0;
    for (let i = 0; i < objs.length; i++) {
      if (this == objs[i]) continue;

      if (this.hit(objs[i])) {
        this.inc = 30;
        break;
      } 
    }
  }

}

class mySquare extends myObject {

  xSpeed = 4;
  ySpeed = 6;

  constructor(x, y, w, h, c) {
    super(x, y, w, h);

    this.c = c;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 

    this.draw(this.c);
  }

  draw(c) {
    ctx.fillStyle = c;
    ctx.fillRect(this.x-this.inc/2, this.y-this.inc/2, this.w + this.inc, this.h + this.inc);
  }

  move() {
    this.edges();
    this.checkHit();

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.draw(this.c);
  }

  edges() {
    if (this.x  < 0 || this.x + this.w > myCanvas.width) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y < 0 || this.y + this.h > myCanvas.height) {
      this.ySpeed = -this.ySpeed;
    }
  }

}


class myCircle extends myObject {

  moveR = (myCanvas.width + myCanvas.height)/4 - (this.x + this.y) /2 - 150;
  xCenter = myCanvas.width/2;
  yCenter = myCanvas.height/2;
  theta = 0;
  
  speed = 0.05;
  xSpeed = this.speed * this.moveR;
  ySpeed = this.speed * this.moveR;

  constructor(x, y, r, c) {
    super(x-r, y-r, r*2, r*2);

    this.c = c;
    this.x = x;
    this.y = y;
    this.r = r;

    this.draw(this.c);
  }

  draw(c) {
    this.checkHit();

    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r+this.inc/2, 0, 2*Math.PI);
    ctx.fill();
  }

  move() {
    this.theta += this.speed;
    this.x = this.xCenter + Math.cos(this.theta) * this.moveR;
    this.y = this.yCenter + Math.sin(this.theta) * this.moveR;
    this.draw(this.c);
  }

}