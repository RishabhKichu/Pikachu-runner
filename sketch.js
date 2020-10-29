var bg,bgImg,bg2;

var gameState;

var pikachu,pikachuImg;

var coins,coinsImg,coinsGroup;

var pokeball,pokeballImg,pokeballGroup;

var b;

var score;

function preload(){
    bgImg=loadImage("bg0.png");
    pikachuImg=loadAnimation("pikachu10.png", "pikachu11.png","pikachu12.png","pikachu13.png");
    coinsImg=loadImage("download.png");
    pokeballImg=loadImage("pokeball.png");
}

function setup(){

    createCanvas(600,300);

    gameState="play";

    score=0;

    bg=createSprite(300,20,600,600);
    bg.scale=4.7;
    bg.addImage(bgImg);
    bg.velocityX=-4;

    bg2=createSprite(300,300,1000,70);
    bg2.visible=false;

    b=createSprite(300,0,1000,10);
    b.visible=false;

    pikachu=createSprite(50,200,10,10);
    pikachu.addAnimation("running",pikachuImg);
    pikachu.scale=0.07;

    coinsGroup=new Group();
    pokeballGroup=new Group();


}

function draw(){
    textSize(20);
    stroke("black");
    fill("black");

    background(0);
    createEdgeSprites();
    pikachu.velocityY=pikachu.velocityY+0.8;
    pikachu.collide(bg2);
    if(gameState==="play"){
    pikachu.collide(b);


    if(keyDown("space") && pikachu.y>150){
        pikachu.velocityY=-10;
    }
    if(bg.x<0){
        bg.x=bg.width/2;
    }

    spawnCoins();
    spawnPokeballs();

    if(pikachu.isTouching(coinsGroup)){
        coinsGroup.destroyEach();
        score = score + 1;
    }
   
    if(pikachu.isTouching(pokeballGroup)){
        gameState="end";
    } 
    }
    drawSprites();
    if(gameState==="end"){
        pokeballGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);
        coinsGroup.setLifetimeEach(-1);
        pokeballGroup.setLifetimeEach(-1);
        text("GAME OVER",200,150);
        bg.velocityX=0;
    }
    text("score : " + score,510,30);

}

function spawnCoins(){
    if(frameCount % 70===0){
        coins=createSprite(670,Math.round(random(70,180),10,10));
        coins.addImage(coinsImg);
        coins.scale=0.2;
        coins.lifetime=154;
        coins.velocityX=-5;
        coinsGroup.add(coins);
    }
}

function spawnPokeballs(){
    if(frameCount%150===0){
        
        pokeball=createSprite(670,240,10,10);
        pokeball.addImage(pokeballImg);
        pokeball.depth=pikachu.depth-1;
        pokeball.velocityX=-5;
        pokeball.lifetime=154;
        pokeball.scale=0.4;
        pokeball.setCollider("circle",0,0,60);
        pokeballGroup.add(pokeball);
    }
}