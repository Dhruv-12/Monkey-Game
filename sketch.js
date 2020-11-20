
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var obstacleGroup;
var score;
var ground;
var bananaGroup;
var survivalTime; 
var PLAY=1;
var END=0;
var gameState=1;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  

  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  
  createCanvas(600,300);
  
  monkey = createSprite(50,250,10,40);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1
   

  
  ground = createSprite(300,290,1200,20);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0;
    monkey.debug = false ;

}


function draw() {
background("lightBlue");
    
  stroke("black");
  textSize(20);
  fill("black");
  
  text("survival Time: "+ survivalTime, 400,50);
  
  
  if (gameState === PLAY){
    
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
    if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
    
    if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
      spawnObstacles();
  spawnBananas();
    ground.velocityX = -5;
  }else if (gameState === END){
    

    
    monkey.velocityX = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
   
  }
  
  
  
  
  
  
  
  
  if (ground.x<0){
    ground.x = 300;
  }
  
  if (keyDown("space")&& monkey.y>=249.3){
    monkey.velocityY = -12;
    
  }
  
  monkey.velocityY+= 0.5;
  monkey.collide (ground);
  
  

  
  drawSprites();
  
}

function spawnObstacles() {
  if (frameCount%300===0){
    obstacle = createSprite(600,265,20,20)
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
  
}

function spawnBananas(){
  if (frameCount%100===0){
    banana = createSprite(600,150,20,20);
    banana.velocityX  = -3;
    banana.addImage(bananaImage);
    banana.y = random(120,200);
    banana.scale = 0.1;  
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}






