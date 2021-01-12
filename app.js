//Basics of matter js physics based on this tutorial on youtube
//https://www.youtube.com/watch?v=urR596FsU68&list=PLRqwX-V7Uu6bLh3T_4wtrmVHOrOEM1ig_

//resources
//https://www.freepik.com/free-vector/lovely-galaxy-background-with-flat-design_2888205.htm#page=1&query=space&position=31
//https://www.freepik.com/free-vector/space-universe-icon-set_9398415.htm#page=1&query=planets&position=31

var t;
var rotationn;
var engine;
var world;
var ball;
var ground = [];
let woodbackground;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;
var ballposx ;
var ballposy;
var ballsin = 0;
var txt = " ";
var objsarray = [];

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;
  var xg = map(beta, -180, 180, -1, 1);
  var yg = map(gamma, -90, 90, -1, 1);
  engine.world.gravity.x = yg;
  engine.world.gravity.y = xg;
}

function verticalText(input) {
  fill(255);
  textSize(30);
  push();
  translate(370,15);
  angleMode(DEGREES);
  rotate(90);
  text(input, 0,0);
  pop();


}
function preload() {
  // woodbackground = loadImage('/wood.jpg');
  // ballbg = loadImage('/ball.png');

  // spacebg = loadImage('./spacebg.png');
  // bhole = loadImage('./bhole.png');
  // obj1 = loadImage('./obj1.png');
  // obj2 = loadImage('./obj2.png');
  // obj3 = loadImage('./obj3.png');
  // obj4 = loadImage('./obj4.png');
  // obj5 = loadImage('./obj5.png');
  
  spacebg = loadImage('https://i.ibb.co/KNrK6dX/spacebg.png');
  bhole = loadImage('https://i.ibb.co/Gd4xbxr/bhole.png');
  obj1 = loadImage('https://i.ibb.co/CWy9JfX/obj1.png');
  obj2 = loadImage('https://i.ibb.co/Sv2ZB6r/obj2.png');
  obj3 = loadImage('https://i.ibb.co/YbY4mmz/obj3.png');
  obj4 = loadImage('https://i.ibb.co/yNxdvYv/obj4.png');
  obj5 = loadImage('https://i.ibb.co/stPrmXL/obj5.png');




  objsarray = [obj1, obj2, obj3, obj4, obj5]
  


}

function Ball(x,y) {
  this.body = Bodies.circle(x, y, 50);
  // Friction between 0 and 1
  this.body.friction = 10;
  this.body.restitution = 0;
  World.add(world, this.body);
  this.tempak = int(random(0, 5));


  this.show = function () {
    var pos = this.body.position;
    push();
    fill(200);
    ballposx = pos.x;
    ballposy = pos.y;
    translate(pos.x, pos.y);
    
    image(objsarray[this.tempak] , 0, 0);
    pop();
  };
  this.remove = function (){
    console.log("remove fired");
    Matter.Composite.remove(world, this.body);

  }
}



function setup() {
  t = 0;
  createCanvas(400, 660);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ground = [
    Bodies.rectangle(200, 0, 400, 10, { isStatic: true }),
    Bodies.rectangle(200, 660, 400, 10, { isStatic: true }),
    Bodies.rectangle(0, 350, 10, 660, { isStatic: true }),
    Bodies.rectangle(400, 350, 10, 660, { isStatic: true }),
  ];
  World.add(world, ground);
}

function mousePressed() {
  if(!ball){
    ball = new Ball(mouseX, mouseY);
  }
}



function draw() {
  background(spacebg);
  if(ballsin == 1){
    txt = `${ballsin} Object in the black hole`;
  } else {
    txt = `${ballsin} Objects in the black hole`;
  }
  verticalText(txt);
  if (ball) {
    ball.show();
  }
  var holex = width * noise(t);
  var holey = height * noise(t+5);
  image(bhole, holex, holey);
  t = t + 0.005;
if(ball){

  if (dist(holex, holey,ballposx, ballposy) < 50){
   
    ball.remove();
    ball = new Ball(random(0,width), random(0,height));
    ballsin = ballsin+1;
  }
}
}
