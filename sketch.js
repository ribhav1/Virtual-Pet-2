var  dog, happyDog, database, foodS, foodStock;
var dogSprite, happyDogSprite;
var foodObj;
var clicks = 0;
var fedTime, lastFed;
function preload() {
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  dogSprite = createSprite(720, 250, 50, 50);
  dogSprite.addImage(dog);
  dogSprite.scale = .4;

  foodS = database.ref("Food");
  foodS.on("value", function(data){
    foodS = data.val();
  });

  foodObj = new Food();
}


function draw() {  
  background(0, 120, 180);
  fill("black");
  textSize(34);
  text("Food Remaining: " + foodS, 570, 100);
  if(foodS === 10){
    dogSprite.addImage(dog);
    push();
    textSize(18);
    text("I'm Thirsty, Give Me More!", 750, 220);
    pop();
  }
  var feed = createButton("Feed the Dog");
  feed.position(635, 420);
  feed.mousePressed(feedDog);

  var addFood = createButton("Add Food");
  addFood.position(735, 420);
  addFood.mousePressed(addFoods);
  push();
  textSize(24);
  text("You have added food " + clicks + " times", 550, 475);
  pop();
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
  push();
  textSize(15);
  if(lastFed >= 12){
    text("Last Fed At " + (lastFed % 12) + "PM", 650, 450);
  }else if(lastFed === 0){
    text("Last Fed At 12AM", 650, 150);
  }else{
    text("Last Fed At " + lastFed + "AM", 650, 450);
  }
  pop();
  console.log(lastFed);
  drawSprites();
  foodObj.display();
}

function readPosition(data) {
  position = data.val();
}
function feedDog(){
  if(foodS > 0){
  dogSprite.addImage(happyDog);
  foodObj.updateFoodStock(foodS);
  database.ref('/').update({
    Food: foodS--,
    FeedTime: hour()
  });
}
}

function addFoods(){
  if(foodS < 10){
  foodS++;
  clicks++;
  database.ref('/').update({
    Food: foodS
  });
  }
}
