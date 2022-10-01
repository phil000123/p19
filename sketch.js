var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var score;
var gameState = "play"


function preload(){
  towerImg = loadImage("t.png");
  doorImg = loadImage("d.png");
  climberImg = loadImage("c.png");
  ghostImg = loadImage("gr.png");
 doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale=0.5;
  ghost.addImage("ghost",ghostImg);

  score = 0;

}

function draw() {
  background(200);
  
  text("Score: "+ score, 500,50);

  if(gameState==="play"){

   

  
  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+20;
 
   }
    
   if(keyDown("LEFT_ARROW")){
     ghost.x=ghost.x-20;
 
   }

  if(keyDown("UP_ARROW")){

    ghost.velocityY=-10;
  
  } 
  
  

  ghost.velocityY=ghost.velocityY+0.8;


  if(climbersGroup.isTouching(ghost)){

    ghost.velocityY=0;

  }



      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
       ghost.destroy()
       gameState="end";
      
      };

     score = score + Math.round(frameCount/80);
    


    spawnDoors();
    drawSprites();
  }

  if (gameState === "end"){
     stroke("yellow");
      fill("yellow");
       textSize(30);
       text("Game Over", 230,250)
       }
}

function spawnDoors(){
    if(frameCount%240===0){

      door = createSprite(200,-50)
      door.addImage("door",doorImg);
      door.x=Math.round(random(120,380));
      door.velocityY=1;
      door.lifetime=320;
      
      doorsGroup.add(door);

      climber = createSprite(200,10)
      climber.addImage("climber",climberImg);
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      climber.x=door.x;
      climber.velocityY=1;
      invisibleBlock.x=door.x;
      invisibleBlock.velocityY=1;
      climber.lifetime=320;
      invisibleBlock.lifetime=320;

      climbersGroup.add(climber);
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);


      
      
     
      ghost.depth=door.depth;
      ghost.depth+=1;

      
    
    }

    

}
