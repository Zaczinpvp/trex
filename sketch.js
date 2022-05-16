var chao;

var dino;

var dinom1;

var chao2_0;

var invchao;

var numalt;

var nuvenzinha;

var nuvemm1;

var juli2;

var cto1;

var cto2;

var cto3;

var cto4;

var cto5;

var cto6;

var timecto;

var timenvm;

var JOGANDO=1;

var PERDEU=0;

var estado=JOGANDO;

var colidedino;

var fimdejogo;

var recomese;

var fimdejogo12;

var recomese12;

var check;

var die;

var jump;

var points=0;

function criarnuvens(){
  if(frameCount%50==0){
    nuvenzinha=createSprite(610,numalt,10,10);
    nuvenzinha.velocityX=-3;
    nuvenzinha.addImage("nuvempassageira",nuvemm1);
    nuvenzinha.scale=0.7;
    nuvenzinha.depth=1;
    nuvenzinha.lifetime=300;
    timenvm.add(nuvenzinha);
}
  } 


function juliette(){
  if(frameCount%90==0){
      juli2=createSprite(610,155,10,10);
      juli2.velocityX=-5;
      juli2.scale=0.6;
      juli2.depth=1;
      juli2.lifetime=300;
      var numeroalt;
      numeroalt=Math.round(random(1,6));
      switch(numeroalt){
        case 1:
          juli2.addImage(cto1)
        
          break
        case 2:
          juli2.addImage(cto2)
          break
        case 3:
          juli2.addImage(cto3)
          break
        case 4:
          juli2.addImage(cto4)
          break
        case 5:
          juli2.addImage(cto5)
          
          break
        
        
          case 6:
          juli2.addImage(cto6)
        
          break
        default:
          break

  
  
        }
        timecto.add(juli2)
  }

}



function reiniciar(){
  points=0;
  dino.changeAnimation("dinossaurocorrendo",dinom1);
  estado=JOGANDO;
  timecto.destroyEach();
  fimdejogo.visible=false
  recomese.visible=false
  timenvm.destroyEach();
  chao.velocityX=-5;
}




function chaoinfinito(){
  if(chao.x<0){
    chao.x=chao.width/2;

  }


}

function pular(){
  if(keyDown("space") && dino.y>156 ){
    dino.velocityY=-12;
    jump.play();
  }
  dino.velocityY+=0.7;



}

function verposicao(){
  text("x:"+mouseX+" y:"+mouseY,mouseX,mouseY);

}

function pontuacao(){
  points=points+Math.round(getFrameRate()/60);
  if(points%100===0){
    check.play();

  }

}








function preload(){
  dinom1=loadAnimation("trex1.png","trex3.png","trex4.png");
  chao2_0=loadImage("ground2.png");
  nuvemm1=loadImage("cloud.png");
  cto1=loadImage("obstacle1.png");
  cto2=loadImage("obstacle2.png");
  cto3=loadImage("obstacle3.png");
  cto4=loadImage("obstacle4.png");
  cto5=loadImage("obstacle5.png");
  cto6=loadImage("obstacle6.png");
  colidedino=loadAnimation("trex_collided.png");
  recomese12=loadImage("restart.png");
  fimdejogo12=loadImage("gameOver.png");
  check=loadSound("checkpoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
}

function setup(){
  createCanvas(600,200);
  chao=createSprite(300,175,600,20);
  dino=createSprite(55,150,40,50);
  dino.addAnimation("dinossaurocorrendo",dinom1);
  dino.addAnimation("morreu",colidedino);
  dino.scale=0.5;
  chao.addImage(chao2_0);
  chao.x=chao.width/2;
  chao.velocityX=-5;
  invchao=createSprite(300,185,600,20);
  invchao.visible=false;
  dino.depth=2;
  timecto=new Group ();
  timenvm=new Group ();
  fimdejogo=createSprite(300,80);
  recomese=createSprite(300,110);
  fimdejogo.addImage("perdeeeeeeeeu",fimdejogo12)
  recomese.addImage("repeteeeeeee",recomese12)
  fimdejogo.scale=0.5;
  recomese.scale=0.5;
  recomese.visible=false;
  fimdejogo.visible=false;
  dino.setCollider("circle",0,0,35)

}





function draw(){
  background("white");
  drawSprites();
  dino.collide(invchao);
  console.log(dino.y);
  numalt=Math.round(random(50,95));
  verposicao();     
  if (estado===JOGANDO){
    chaoinfinito();
    pular();
    criarnuvens();
    juliette();
    if (dino.isTouching(timecto)){
      estado=PERDEU;
      die.play();
    }
    pontuacao();
  }
  if (estado===PERDEU){
    dino.velocityY=0;
    chao.velocityX=0;
    timenvm.setVelocityXEach(0);
    timecto.setVelocityXEach(0);
    dino.changeAnimation("morreu",colidedino);
    timenvm.setLifetimeEach(-1);
    timecto.setLifetimeEach(-1);
    fimdejogo.visible=true;
    recomese.visible=true;
    if (mousePressedOver(recomese)){
      reiniciar();

    }
  
  }
  text("pontuaçâo:"+points,300,36);
  
}




