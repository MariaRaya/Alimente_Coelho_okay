const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var corda;
var fruta_con;
var fruta, frutaOptions;
var food, backgroundImg;
var rabbit, rabbitImg;
var button;
var blink, eat, sad;

function preload(){
  food = loadImage("melon.png");
  rabbitImg = loadImage("Rabbit-01.png");
  backgroundImg = loadImage("background.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  eat.looping = false;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,700,600,20);
  corda = new Rope(6,{x: 245,y: 30});

  frutaOptions = {
    density: 0.001
  };

  fruta = Bodies.circle(300,300,15,frutaOptions);
  

  Matter.Composite.add(corda.body,fruta);

  fruta_con = new Link(corda,fruta);

  rabbit = createSprite(250,620,100,100);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.25;

  button = createImg("cut_btn.png");
  button.position(220,30);
  button.size(50,50);

  button.mouseClicked(drop);

//Animação do Coelho

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit.addAnimation("piscando", blink);
  rabbit.addAnimation("comendo", eat);
  rabbit.addAnimation("chorando", sad);

  rabbit.changeAnimation("piscando");

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

function draw() 
{
  background(51);

  image(backgroundImg,250,350,500,700);

  ground.show();
  corda.show();

  // Condição para a fruta aparecer

  if(fruta != null){
  image(food,fruta.position.x,fruta.position.y,60,60);
  }

  if(collided(fruta,rabbit) == true){
    rabbit.changeAnimation("comendo");
  }

  if(collided(fruta, ground.body) == true){
    rabbit.changeAnimation("chorando");
  }

  Engine.update(engine);
  drawSprites();
}

function drop(){
  corda.break();
  fruta_con.separar();
  fruta_con = null;
}

function collided(body,sprite){
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);

        if(d <= 80){
          World.remove(engine.world,fruta);
          fruta = null;
          return true;
        } else{
          return false;
        }

  }
}
