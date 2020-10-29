const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var  bg="day.jpg";;
var backgroundImg;
var ship,ship_1;
var bomb,catpult;
var pillar1,pillar2;
var gate;
var roof;
var ground;
var score=0;
var gs="sling";
function preload(){
 getBackgroundImg();
  ship_1=loadImage("bandook.png");
}

function setup() {
  createCanvas(800,600);
  engine = Engine.create();
  world = engine.world;
ship=createSprite(150,300);
ship.addImage(ship_1);
  ship.scale=1.5;
  bomb=new Bomb(133,191,50);
  pillar2=new Pillar(733,222,50,400);
  pillar1=new Pillar(455,222,50,400);
 gate=new Gate();
 roof=new Roof();
 ground=new Ground();
  catapult=new Catapult(bomb.body,{x:133,y:191});
  Engine.run(engine)
}

function draw() {
  if(backgroundImg){
    background(backgroundImg)}
else{
    background(bg);
}
  bomb.display();
  pillar1.display();
  pillar1.score();
  pillar2.display();
  pillar2.score();
  roof.display();
  roof.score();
  gate.display();
  gate.score();
  ground.display();
catapult.display();
detectCollision(bomb,pillar1);
detectCollision(bomb,pillar2);
detectCollision(bomb,gate);
detectCollision(bomb,roof);
detectCollision(bomb,ground);


textSize(35)
        fill("yellow")
        text("Score  " + score, width-300, 50)
  drawSprites();
}
function mouseDragged(){
  if(gs!=="launched"){
  Matter.Body.setPosition(bomb.body,{x:mouseX,y:mouseY});
}
}
function mouseReleased(){
  if(gs!=="launched"){
 catapult.fly();
  }
 gs="launched";
}
function keyPressed(){
  if((keyCode===32)&&gs==="launched"){
    Matter.Body.setPosition(bomb.body,{x:180,y:200});
   
    catapult.attach(bomb.body);
    gs="sling";
  }
}
function detectCollision(obj1,obj2){
  pos1=obj1.body.position;
  pos2=obj2.body.position;
  if(pos1.x-pos2.x<obj1.r+obj2.width
    &&pos2.x-pos1.x<obj1.r+obj2.width
    &&pos1.y-pos2.y<obj1.r+obj2.height
    &&pos2.y-pos1.y<obj1.r+obj2.height)
    {
      Matter.Body.setStatic(obj2.body,false);
    }
}
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=0600 && hour<=1800){
      bg = "day.png";
  }
  else{
      bg = "night.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
