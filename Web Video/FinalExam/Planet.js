function Planet(radius, distance, selfRot, parent, tex, form, name, emission) {
  this.radius = radius;
  this.distance = distance;
  this.orbitLength = distance * 2 * PI;
  this.angle = random(2 * PI);
  this.tex = tex;
  this.form = form;
  this.name = name;
  this.emission = emission;
  this.children = [];
  this.parent = parent;
  this.selfRot = selfRot;
  if (parent) {
    parent.children.push(this);
  }
}

Planet.prototype.update = function() {
  if (this.orbitLength > 0) {
    let speed = pow((width - this.distance) / (width), 0.5);
    if (motion) {
      this.angle += (speed / this.orbitLength) * (2 * PI) * sliderSpeed.value();
    }
  }
  for (let body of this.children) {
    body.update();
  }
}

Planet.prototype.draw = function() {
  push();
  {
    push();
    {
      // Orbits
      if (theEnd) {
        noStroke();
      } else {
        strokeWeight(0.05);
        stroke(255);
        noFill();
        ellipse(0, 0, this.distance * 2);
      }
    }
    pop();
    
    // Light
    if (this.emission) {
      fill(this.emission);
      scale(100);
      pointLight(this.emission, drag.x, drag.y, 0);
      scale(0.01);
    }
    rotate(-this.angle);
    translate(this.distance, 0);
    if (this.emission) {
      ambientLight(this.emission);
    }
    ambientMaterial(255);
    texture(this.tex);
    push();

    // Saturn Torus
    if (this.form == "t") {
      speed = 0;
      torus(this.radius, this.radius/4, 32, 2);
    
    // Round Planet (Sphere)
    } else if (this.form == "s") {
      rotateZ(this.selfRot);
      sphere(this.radius);

      if (realSize) {
        push();
        fill("white");
        rotateX(-PI/2);
        textSize(20/zoom);
        rotateY(-this.angle+this.selfRot);
        text(this.name, 0, -5);
        pop();
      }

    }
    pop();

    for (let body of this.children) {
      body.draw();
    }
  }
  pop();
}
