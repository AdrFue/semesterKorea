let zoom = 1;
let drag;
let prevMouse;
// radius 1:1; distance 1:1,000,000
let scalerR = 500 * 1/1000000, sunMin, scalerD;
let sunR;
let mercuryR, mercuryD;
let venusR, venusD;
let earthR, earthD;
let moonR, moonD;
let marsR, marsD;
let jupiterR, jupiterD;
let saturnR, saturnD;
let saturn2R;
let uranusR, uranusD;
let neptuneR, neptuneD;
let sunT, mercuryT, venusT, earthT, moonT, marsT, jupiterT, saturnT, saturn2T, uranusT, neptuneT;
let sun, mercury, venus, earth, moon, mars, jupiter, saturn, saturn2, uranus, neptune;
let sunSR, mercurySR, venusSR, earthSR, moonSR, marsSR, jupiterSR, saturnSR, saturn2SR, uranusSR, neptuneSR;
let test = 0;
let starPos = [];
let x, y, z;
let realSize = true;
let galaxy;
let planetR = [], planetD = [], planetSR = [];
let scalerSR;

let selfRot = 0;
let motion = true;
let sound1, sound2, sound = true;

let theStart = false;
let theEnd = false, endCnt;
let heartbeat;

let cntInitBB = 0, boolInitBB = false;
let afterBB = false;
let distortionPlayed = false, endTextAppeared = false;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inputs(true);
}

function preload() {
  // Planets
  sunT = loadImage("textures/sun.jpg");
  mercuryT = loadImage("textures/mercury.jpg");
  venusT = loadImage("textures/venus.jpg");
  earthT = loadImage("textures/earth.jpg");
  moonT = loadImage("textures/moon.jpg");
  marsT = loadImage("textures/mars.jpg");
  jupiterT = loadImage("textures/jupiter.jpg");
  saturnT = loadImage("textures/saturn.jpg");
  saturn2T = loadImage("textures/saturn2.jpg");
  uranusT = loadImage("textures/uranus.jpg");
  neptuneT = loadImage("textures/neptune.jpg");

  // Easter Eggs
  galaxy = loadImage("textures/galaxy.png");
  arial = loadFont("textures/Arial.otf");
  
  aethan = loadImage("textures/aethan.jpg");
  aethanO = loadModel("textures/Aethan.obj");

  rocket = loadImage("textures/rocket.jpg");
  rocketO = loadModel("textures/Rocket.obj");

  ufo = loadImage("textures/ufo.jpg");
  ufoO = loadModel("textures/Ufo.obj");

  // Sounds
  sound1 = loadSound("sounds/sound1.mp3");
  sound2 = loadSound("sounds/sound2.mp3");

  heartbeat = loadSound("sounds/heartbeat.mp3");
  tv = loadSound("sounds/tv.mp3");

  distortion = loadSound("sounds/distortion.mp3");
  collapse = loadSound("sounds/collapse.mp3");

}

function setup() {
  drag = createVector(0, 0);
  createCanvas(windowWidth, windowHeight, WEBGL);
  scalerD = 1;
  scalerSR = 0.000001;
  inputs(false);

  textFont(arial);
  textAlign(CENTER);
  textSize(25);

  changeSizes();
  createPlanets();

  // Star positions
  for (let i = 0; i < 100; i++) {
    x = random(-neptuneD*2, neptuneD*2);
    y = random(-neptuneD*2, neptuneD*2);
    z = random(-neptuneD*2, neptuneD*2);
    starPos.push(createVector(x, y, z));
  }


  sound1.loop();
  sound1.pan(0.5);
  sound2.loop();

  planetSR[0] = 0;
  planetSR[1] = 0;
  planetSR[2] = 0;
  planetSR[3] = 0;
  planetSR[4] = 0;
  planetSR[5] = 0;
  planetSR[6] = 0;
  planetSR[7] = 0;
  planetSR[8] = 0;
  planetSR[9] = 0;
  planetSR[10] = 0;
  
}

function draw() {

  background(33);
  sound1.setVolume(0.2*sliderVolume.value()); 
  sound2.setVolume(0.1*sliderVolume.value());

  // Stars
  for (let i = 0; i < starPos.length; i++){
    fill(255);
    stroke(255);
    strokeWeight(2);
    point(starPos[i].x, starPos[i].y, starPos[i].z);
  }

  noStroke();

  // Planet self-rotation
  if (motion) {
    selfRot -= 0.01*sliderSpeed.value();
  }

  // Galaxies
  galaxies(-5000, -2500);
  galaxies(5000, 2500);
  galaxies(-3000, 4000);

  if (!theEnd && !afterBB) {
    // Aethan
    aethans(0, 50, -650);
    aethans(-300, -50, 800);

    // Rocket
    push();
    rotateX(selfRot);
    rotateY(selfRot);
    translate(400, 0, 0);
    ambientLight(255);
    scale(0.1*zoom);
    texture(rocket);
    model(rocketO);
    pop();

    // UFO
    push();
    rotateX(PI/2);
    rotateZ(selfRot);
    translate(1300*zoom, 0, 0);
    ambientLight(255);
    scale(zoom*0.01);
    texture(ufo);
    model(ufoO);
    pop();
  }

  // System Setup
  ambientMaterial(255);
  ambientLight(42);
  
  orbitControl();
  translate(drag.x, drag.y);
  rotateX(PI/2);
  scale(zoom);

  // Animating Planet Resizing
  aniRadius();
  // checking if End
  initEnd();
  // checking if Start
  initStart();

  // Drawing Planets
  if (!afterBB) {
    sun.update();
    sun.draw();
  }

  if (theStart) {
    background(255);
  }

}

function changeSizes() {
  realSize = !realSize;
  if (!realSize) {
    sunMin = 0.1;
  }
  calcSizes();
}

function calcSizes() {
  sunR = 696340;
  mercuryR = 2439.7, mercuryD = 58.9*scalerD;
  venusR = 6051.8, venusD = 108.2*scalerD;
  earthR = 6371, earthD = 149.6*scalerD;
  moonR = 1737.1, moonD = 25*scalerD;
  marsR = 3389.5, marsD = 227.9*scalerD;
  jupiterR = 69911, jupiterD = 778.5*scalerD;
  saturnR = 58232, saturnD = 1434*scalerD;
  saturn2R = 100000;
  uranusR = 25362, uranusD = 1500*scalerD;
  neptuneR = 24622, neptuneD = 1600*scalerD;

  sunSR = 7000;
  mercurySR = 10.83;
  venusSR = 6.52;
  earthSR = 1574;
  moonSR = 3683;
  marsSR = 866;
  jupiterSR = 45583;
  saturnSR = 36840;
  saturn2SR = 1;
  uranusSR = -14794;
  neptuneSR = 9719;
  
  planetSR[0] += sunSR * sliderSpeed.value() * scalerSR;
  planetSR[1] += mercurySR * sliderSpeed.value() * scalerSR;
  planetSR[2] += venusSR * sliderSpeed.value() * scalerSR;
  planetSR[3] += earthSR * sliderSpeed.value() * scalerSR;
  planetSR[4] += moonSR * sliderSpeed.value() * scalerSR;
  planetSR[5] += marsSR * sliderSpeed.value() * scalerSR;
  planetSR[6] += jupiterSR * sliderSpeed.value() * scalerSR;
  planetSR[7] += saturnSR * sliderSpeed.value() * scalerSR;
  planetSR[8] += saturn2SR * sliderSpeed.value() * scalerSR;
  planetSR[9] += uranusSR * sliderSpeed.value() * scalerSR;
  planetSR[10] += neptuneSR * sliderSpeed.value() * scalerSR;


  planetR[0] = sunR * scalerR * sunMin;
  planetR[1] = mercuryR * scalerR;
  planetR[2] = venusR * scalerR;
  planetR[3] = earthR * scalerR;
  planetR[4] = moonR * scalerR;
  planetR[5] = marsR * scalerR;
  planetR[6] = jupiterR * scalerR;
  planetR[7] = saturnR * scalerR;
  planetR[8] = saturn2R * scalerR;
  planetR[9] = uranusR * scalerR;
  planetR[10] = neptuneR * scalerR;

  planetD[1] = mercuryD * scalerD;
  planetD[2] = venusD * scalerD;
  planetD[3] = earthD * scalerD;
  planetD[4] = moonD * scalerD;
  planetD[5] = marsD * scalerD;
  planetD[6] = jupiterD * scalerD;
  planetD[7] = saturnD * scalerD;
  planetD[9] = uranusD * scalerD;
  planetD[10] = neptuneD * scalerD;
}

function createPlanets() {
  sun = new Planet(planetR[0], 0, planetSR[0], null, sunT, "s", "Sun", color(255));
  mercury = new Planet(planetR[1], planetD[1], planetSR[1], sun, mercuryT, "s", "Mercury");
  venus = new Planet(planetR[2], planetD[2], planetSR[2], sun, venusT, "s", "Venus");
  earth = new Planet(planetR[3], planetD[3], planetSR[3], sun, earthT, "s", "Earth");
  moon = new Planet(planetR[4], planetD[4], planetSR[4], earth, moonT, "s", "Moon");
  mars = new Planet(planetR[5], planetD[5], planetSR[5], sun, marsT, "s", "Mars");
  jupiter = new Planet(planetR[6], planetD[6], planetSR[6], sun, jupiterT, "s", "Jupiter");
  saturn = new Planet(planetR[7], planetD[7], planetSR[7], sun, saturnT, "s", "Saturn");
  saturn2 = new Planet(planetR[8], 0, null, saturn, saturn2T, "t", "Saturn2");
  uranus = new Planet(planetR[9], planetD[9], planetSR[9], sun, uranusT, "s", "Uranus");
  neptune = new Planet(planetR[10], planetD[10], planetSR[10], sun, neptuneT, "s");
}


function aniRadius() {
  if (!theEnd) {
    if (realSize) {
      if (scalerR > 1/1000000) {
        scalerR -= 5* 1/1000000;
      } else {
        scalerR = 1/1000000;
        sunMin = 1;   
      }
    } else {
      if (scalerR < 500 * 1/1000000) {
        scalerR += 5 * 1/1000000;
      } else {
        scalerR = 500 * 1/1000000;
      }
    }  
  }

  calcSizes();
  sun.radius = planetR[0];
  mercury.radius = planetR[1];
  venus.radius = planetR[2];
  earth.radius = planetR[3];
  moon.radius = planetR[4];
  mars.radius = planetR[5];
  jupiter.radius = planetR[6];
  saturn.radius = planetR[7];
  saturn2.radius = planetR[8];
  uranus.radius = planetR[9];
  neptune.radius = planetR[10];

  mercury.distance = planetD[1];
  venus.distance = planetD[2];
  earth.distance = planetD[3];
  moon.distance = planetD[4];
  mars.distance = planetD[5];
  jupiter.distance = planetD[6];
  saturn.distance = planetD[7];
  uranus.distance = planetD[9];
  neptune.distance = planetD[10];

  sun.selfRot = planetSR[0];
  mercury.selfRot = planetSR[1];
  venus.selfRot = planetSR[2];
  earth.selfRot = planetSR[3];
  moon.selfRot = planetSR[4];
  mars.selfRot = planetSR[5];
  jupiter.selfRot = planetSR[6];
  saturn.selfRot = planetSR[7];
  saturn2.selfRot = planetSR[8];
  uranus.selfRot = planetSR[9];
  neptune.selfRot = planetSR[10];

}

function aethans(x, y, z) {
  push();
  translate(x*zoom, y*zoom, z*zoom);
  rotateX(PI/2);
  rotateZ(selfRot*10);
  ambientLight(100);
  scale(0.1*zoom);
  texture(aethan);
  model(aethanO);
  pop();
}

function galaxies(x, y) {
  push();
  translate(x, y);
  ambientLight(150);
  rotateX(PI/2);
  rotateY(PI/2)
  texture(galaxy);
  plane(galaxy.width, galaxy.height);
  pop();
}

function initEnd() {
  // checking if planets are fake sizes and endButton pressed
  if (realSize || !theEnd) return;

  // stop all other current sounds
  sound1.stop();
  sound2.stop();
  // remove all inputs
  inputs(true);

  // Sun beats
  for (let i = 0; i < 5; i++) {
    if (endCnt == (i*100)) {
      heartbeat.play();
      heartbeat.setVolume(0.5 + i*0.1);
    }
    if (endCnt > (i*100) && endCnt < (i*100)+8) {
      sunMin += 0.001 * (i+1);
    }
    if (endCnt > (i*100)+8 && endCnt < (i*100)+16) {
      sunMin -=  0.001 * (i+1);
    }
  }

  // Sun becomes black hole
  if (endCnt > 500 && sunMin > 0) {
    if (!collapse.isPlaying()) {
      collapse.setVolume(0.5);
      collapse.play();
    }
    sunMin -= 0.01;
  }

  // Planets move towards black hole
  if (endCnt > 500 && sunMin <= 0) {
    if (!distortionPlayed) {
      distortion.setVolume(0.5);
      distortion.setLoop(false);
      distortion.play();
      distortionPlayed = true;
    }
    sunMin = 0;
    scalerD -= 0.001;
    fill(0);
    sphere(5);
  }

  // Planets become smaller
  if (endCnt > 1300) {
    if (scalerR > 1/1000000) {
      scalerR -= 5* 1/1000000;
    } else {
      scalerR = 1/1000000;
    }
  }

  if (scalerD <= 0) {
    scalerD = 0;
  }

  if (endCnt > 1500) {
    if (!endTextAppeared) {
      endText();
      endTextAppeared = true;
    }
  }

  endCnt++;

}

function initStart() {

  if (boolInitBB) {
    if (cntInitBB < 30) {
      crtStartBtn("3");
    } else if (cntInitBB < 60) {
      crtStartBtn("2");
    } else if (cntInitBB < 90) {
      crtStartBtn("1");
    } else {

      // reset everything
      theStart = false;
      boolInitBB = false; 
      btnStartText.remove();
      btnInitBB.remove();
      afterBB = true;
      inputs(false);
    }
    cntInitBB++;
  }

  if (afterBB) {
    cntInitBB++;
  }

}

function restoreNormal() {
  afterBB = false;
  cntInitBB = 0;
  btnAfterBBText.remove();
  btnAfterBB.remove();
  btnYAH.remove();
  btnYAHText.remove();
  sound1.loop();
  sound1.pan(0.5);
  sound2.loop();
}