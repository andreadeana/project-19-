
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl,girlImg;
var boy,boyImg;
var road,roadImg;
var rock,rockImg;
var pot,potImg;
var gameO,gameOImg

var potGroup,pot;
var rockGroup,rock;
 

var distance=0

function preload(){
  girlImg = loadImage("girl.png");
  roadImg = loadImage("road.png");
  boyImg = loadImage("boy.png");
  rockImg = loadImage("rock.png");
  potImg = loadImage("pot.png");
  gameOImg = loadImage("GAME OVER.png");
}

function setup(){
  
  createCanvas(1200,300);

  road =createSprite(100,150);
  road.addImage("road",roadImg);
  road.velocityX = -5;
  road.scale=1.25;

  girl  = createSprite(70,150);
  girl.addImage("girl",girlImg);
  girl.scale=0.3;
  girl.setCollider("circle",70,180,35)
 
  boy  = createSprite(120,150);
  boy.addImage("boy",boyImg);
  boy.scale=0.5;

  gameO  = createSprite(1200/2,300/2);
  gameO.addImage("gameO",gameOImg);
  gameO.scale=1;

  rockGroup = createGroup();
  potGroup = createGroup();
  
  createRock();
  createPot();
    
}

function draw() {
  background(0);
  drawSprites();
  textSize(20);
  fill("white")
  text("DISTANCE: "+ distance,1000,50);
  
  if (gameState===PLAY){ 
    distance =distance+ Math.round(getFrameRate()/60);
    road.velocityX = -(6 + 3*distance/100);
    createRock .velocityX = -(6 + 3*distance/100);
    createPot.velocityX = -(6 + 3*distance/100);
    
    
  
    edges= createEdgeSprites();
    girl .collide(edges);  
    
    if(road.x < 0 ){
      road.x = width/2;
  }
  
 
  createRock();
  createPot();

if(keyDown("down_arrow")) {
  girl.y+=5;  
}
if(keyDown("up_arrow")) {
  girl.y-=5;  
}

if(rockGroup.isTouching(girl)){
  gameState = END;
  girl.destroy();
}
if(potGroup.isTouching(girl)){
  gameState = END;
  girl.destroy();
}
gameO.visible = false;
boy.visible = false;

  }

  else if (gameState === END) {
    gameO.visible = true;
    boy.visible = true;
    girl.invisible = true;
 
    road.velocityX = 0;

    girl.changeAnimation("boy", boyImg);

    rockGroup.setLifetimeEach(1);
    potGroup.setLifetimeEach(1);
     
    rockGroup.setVelocityXEach(0);
    potGroup.setVelocityXEach(0);

    if(mousePressedOver(gameO)){
      reset();
    }
  }
  }
  
  
function createRock() {
  if (frameCount % 80 === 0) {
    var rock = createSprite(width+20,height-300,40,10);
    rock.y = Math.round(random(5,295));
  rock .addImage(rockImg);
  rock.scale=0.12;
  rock.velocityX = -(6 + 3*distance/100);
  rock.lifetime = 250;

  rock.depth = girl.depth;
    girl.depth = girl.depth+1;

    rockGroup.add(rock);
  }
  
}

function createPot() {
  if (frameCount % 125 === 0) {
    var pot = createSprite(width+20,height-300,40,10);
    pot.y = Math.round(random(5,295));
    pot .addImage(potImg);
    pot.scale=0.75;
    pot.velocityX = -(6 + 3*distance/100);
    pot.lifetime = 250;

    pot.depth = girl.depth;
    girl.depth = girl.depth+1;
  
    pot.setCollider("circle",0,0,40)
    potGroup.add(pot);

  }
  
}

function reset () {
  distance=0;
  gameState=PLAY;
  rockGroup.destroyEach();
  potGroup.destroyEach();
  
  girl  = createSprite(70,150);
  girl.addImage("girl",girlImg);
  girl.scale=0.3;
  girl.setCollider("circle",70,180,35)
 

 
}




