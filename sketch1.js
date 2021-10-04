var balloon , database ;
var position ;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png",
   "Images/HotAirBallon03.png","Images/HotAirBallon03.png");
}


function setup(){
 database = firebase.database();
 console.log(database);

 createCanvas(1000,700);

 balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on('value', readPosition,showError);
}

function draw(){
    background(bg);
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
          writePosition(-10,0);
          balloon.addAnimation("hotAirBalloon",balloonImage2);
        }
        else if(keyDown(RIGHT_ARROW)){
          writePosition(10,0);
           balloon.addAnimation("hotAirBalloon",balloonImage2);
        }
        
        else if(keyDown(UP_ARROW)){
          writePosition(0,-10);
          balloon.scale=balloon.scale -0.005;
          balloon.addAnimation("hotAirBalloon",balloonImage2);
        }
        else if(keyDown(DOWN_ARROW)){
          writePosition(0,+10);
          balloon.scale=balloon.scale+0.005;
          balloon.addAnimation("hotAirBalloon",balloonImage2);
        }
        drawSprites();
         fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
    }    
}

function writePosition(x,y){

 database.ref('balloon/position').set({ 
  'x' : position.x + x ,
  'y' : position.y + y  })
}

function readPosition(data){
    position = data.val();
    console.log(position.x);
    balloon.x = position.x;
    balloon.y = position.y;
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
