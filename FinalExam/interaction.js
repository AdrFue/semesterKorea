function mouseWheel(event) {

  if (event.delta > 0) {
    zoom -= zoom * 0.1;

    if (zoom < 0.25) {
      zoom = 0.25;
    }

  } else {
    if (zoom > 7) {
      zoom = 7;
    }
    zoom += zoom *0.1;
  }

}

function inputs(blResize) {

  if (blResize) {
    btnResize.remove();
    btnMotion.remove();
    btnSpeed.remove();
    sliderSpeed.remove();
    btnSound.remove();
    btnVolume.remove();
    sliderVolume.remove();
    btnStart.remove();
    btnBtw.remove();
    btnWAH.remove();
    btnWAHText.remove();
    btnEnd.remove();
  }

  
  if (afterBB) {
    //You are here Part 1
    btnYAHText = createButton("You are here");
    btnYAHText.style('background', 'rgb(33, 33, 33)');
    btnYAHText.position(85, windowHeight-175);
    btnYAHText.size(150, 100);
    btnYAHText.style('color', 'white');
    btnYAHText.style('border', 'none');
    btnYAHText.style('font-size', '20px');

    //You are here Part 2
    btnYAH = createButton("");
    // btnYAH.style('border-radius', '50%');
    btnYAH.style('background', 'green');
    btnYAH.position(150, windowHeight-87.5);
    btnYAH.size(10, 50);

    btnAfterBBText = createButton("It all happened in an instant.");
    btnAfterBBText.style('background', 'transparent');
    btnAfterBBText.position(0, 0);
    btnAfterBBText.size(windowWidth, windowHeight);
    btnAfterBBText.style('color', 'white');
    btnAfterBBText.style('border', 'none');
    btnAfterBBText.style('font-size', '20px');
   
    btnAfterBB = createButton("Back to the present");
    btnAfterBB.mouseOver(() => btnAfterBB.style('cursor', 'pointer'));
    btnAfterBB.position(windowWidth/2-67.5, windowHeight/1.8);
    btnAfterBB.size(125, 75);
    btnAfterBB.style('font-size', '20px');
    btnAfterBB.mousePressed(restoreNormal);

  }

  if (theStart) {
    btnInitBB = createButton("Initialize Big Bang");
    btnInitBB.style('font-size', '20px');
    btnInitBB.mouseOver(() => btnInitBB.style('cursor', 'pointer'));
    btnInitBB.position(windowWidth/2-67.5, windowHeight/1.8);
    btnInitBB.size(125, 75);
    btnInitBB.mousePressed(initBigBang);
  }

  if (!theEnd && !theStart) {
    // Resize Button
    btnResize = createButton('Resize Planets');
    btnResize.style('font-size', '20px');
    btnResize.position(10, 10);
    btnResize.size(125, 75);
    btnResize.mousePressed(changeSizes);

    // Motion Button
    btnMotion = createButton("Motion Play / Pause");
    btnMotion.style('font-size', '20px');
    btnMotion.position(150, 10);
    btnMotion.size(125, 75);
    btnMotion.mousePressed(motionSystem);

    // Speed slider
    btnSpeed = createButton("Speed");
    btnSpeed.style('background', 'rgb(33, 33, 33)');
    btnSpeed.position(300, -5);
    btnSpeed.size(125, 75);
    btnSpeed.style('color', 'white');
    btnSpeed.style('border', 'none');
    btnSpeed.style('font-size', '20px');
    sliderSpeed = createSlider(0, 5, 1, 0.01);
    sliderSpeed.position(300, 55);

    // Sound Button
    btnSound = createButton("Sound Play / Pause");
    btnSound.style('font-size', '20px');
    btnSound.position(450, 10);
    btnSound.size(125, 75);
    btnSound.mousePressed(soundSystem);

    // Volume slider
    btnVolume = createButton("Volume");
    btnVolume.style('background', 'rgb(33, 33, 33)');
    btnVolume.position(600, -5);
    btnVolume.size(125, 75);
    btnVolume.style('color', 'white');
    btnVolume.style('border', 'none');
    btnVolume.style('font-size', '20px');
    sliderVolume = createSlider(0, 1, 0.5, 0.01);
    sliderVolume.position(600, 55);


    // Start Button
    btnStart = createButton("Big Bang");
    btnStart.style('font-size', '30px');
    btnStart.position(25, windowHeight-100);
    btnStart.size(125, 75);
    btnStart.mousePressed(startStart);


    // We are here
    btnWAHText = createButton("We are here");
    btnWAHText.style('background', 'rgb(33, 33, 33)');
    btnWAHText.position(windowWidth*(14/24)-60, windowHeight-175);
    btnWAHText.size(125, 100);
    btnWAHText.style('color', 'white');
    btnWAHText.style('border', 'none');
    btnWAHText.style('font-size', '20px');

    btnWAH = createButton("");
    // btnWAH.style('border-radius', '50%');
    btnWAH.style('background',  'blue');
    btnWAH.position(windowWidth*(14/24), windowHeight-87.5);
    btnWAH.size(10, 50);

    // Ending Button
    btnEnd = createButton("Sun dies");
    btnEnd.style('font-size', '30px');
    btnEnd.position(windowWidth-150, windowHeight-100);
    btnEnd.size(125, 75);
    btnEnd.mousePressed(startEnd);


    // Between line
    btnBtw = createButton("");
    btnBtw.position(150, windowHeight-75);
    btnBtw.size(windowWidth-300, 20);
  }


}

function changeCursor(elem) {
  elem.style('cursor', 'pointer');
}


function motionSystem() {
  motion = !motion;
}

function soundSystem() {
  sound = !sound;
  if (sound) {
    sound1.play();
    sound2.play();
  } else {
    sound1.pause();
    sound2.pause();
  }
}

function startStart() {
  if (realSize) return;

  theStart = true;
  tv.setVolume(0.7);
  tv.play();
  
  // stop all other current sounds
  sound1.stop();
  sound2.stop();
  // remove all inputs
  inputs(true);

  btnStartText = createButton("");
  crtStartBtn("You just called the Start.<br>Before the Big Bang was nothing.");
}

function startEnd() {
  if (realSize) return;
  theEnd = true; 
  endCnt = 0;
}

function endText() {
    btnEndText = createButton("You just called the end.<br><br>After the sun's death will be nothing.");
    btnEndText.style('background', 'transparent');
    btnEndText.position(0, 0);
    btnEndText.size(windowWidth, windowHeight*0.8);
    btnEndText.style('color', 'white');
    btnEndText.style('border', 'none');
    btnEndText.style('font-size', '20px');
}

function initBigBang() {
  boolInitBB = true;
}

function crtStartBtn(text) {
  btnStartText.remove();
  btnStartText = createButton(text);
  btnStartText.style('background', 'white');
  btnStartText.position(windowWidth*(1/3), windowHeight*(1/2)-50);
  btnStartText.size(windowWidth*(1/3), 100);
  btnStartText.style('color', 'black');
  btnStartText.style('border', 'none');
  btnStartText.style('font-size', '20px');
}