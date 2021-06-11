var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var gameState="play";
var preferred_score=0;
var score=0;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  redGroup = new Group();
  greenGroup = new Group();
  pinkGroup = new Group();
  blueGroup = new Group();
  arrowGroup = new Group();
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  score = 0    
  
}

function draw() {
 background(0);
  // moving ground
  if (gameState==="play"){
     
    //moving bow
    bow.y = World.mouseY
  
   // release arrow when space key is pressed
    if (keyDown("space")) {
      createArrow();
    
    }
   
    //creating continous enemies
    var select_balloon = Math.round(random(1,4));

    if (World.frameCount % 100 == 0) {
      if (select_balloon == 1) {
        redBalloon();
      } else if (select_balloon == 2) {
        greenBalloon();
      } else if (select_balloon == 3) {
        blueBalloon();
      } else {
        pinkBalloon();
      }
    }}
    scene.velocityX = -3
    if (scene.x < 0){
     scene.x = scene.width/2;
     }
    
    console.log(frameCount);
    
    if (frameCount%100==99){
      if (score<preferred_score){
        gameState="end"
      }
    }
    
  
   
   drawSprites();
   text("Score: "+ score, 300,50);
   if (gameState==="end"){
      text("You missed a balloon. Press s to play again.",         50,200);
      bow.y=200
    
    if (keyDown("s")){
      gameState="play";
      score=0;
      preferred_score=0;
    }
  }
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  if (arrowGroup.isTouching(blueGroup)){
    blueGroup.destroyEach();
    arrowGroup.destroyEach();
    score+=4
  }
  if (arrowGroup.isTouching(pinkGroup)){
    pinkGroup.destroyEach();
    arrowGroup.destroyEach();
    score+=2

  }
  if (arrowGroup.isTouching(greenGroup)){
    greenGroup.destroyEach();
    arrowGroup.destroyEach();
    score+=3

  }
  if (arrowGroup.isTouching(redGroup)){
    redGroup.destroyEach();
    arrowGroup.destroyEach();
    score+=5
  }
}       

function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 5;
  red.lifetime = 80;
  red.scale = 0.1;
  preferred_score+=5
  redGroup.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 4;
  blue.lifetime = 100;
  blue.scale = 0.1;
  blueGroup.add(blue);
  preferred_score+=4
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenGroup.add(green);
  preferred_score+=3
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 2;
  pink.lifetime = 200;
  pink.scale = 1
  pinkGroup.add(pink);
  preferred_score+=2
}
