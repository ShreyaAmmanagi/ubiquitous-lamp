var dog,sadDog,happyDog
var database;
var feedPet,addFood,feedPet1;
var foodObj,foodCount;
var Food
var State;
var PLAY,END;
var name1,name2
var flower,flower1
var bark;
function preload(){
  database = firebase.database()
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  flower1 = loadImage("8cGEd556i.png")
}

function setup() {
  createCanvas(1000,400);
  foodObj = new food()
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  var nice = database.ref('food')
  nice.on("value",readStock,showError)
  bark = loadSound("Dog Woof-SoundBible.com-457935112.mp3")

}

function draw() {
  background(46,139,87);
   foodObj.display()
  addFood = createButton('ADD FOOD')
  addFood.position(600,100);
  addFood.mousePressed(addFoodStock);
  
  name1 = createButton('Sweetie')
  name1.position(900,150);
  name1.mousePressed(name11);
  
  name2 = createButton('Cyrus')
  name2.position(970,150);
  name2.mousePressed(name21);
  drawSprites();
  stroke("white")
  textSize(20)
  fill("white")
  text("Give your pet a name",670,50)
}

//function to read food Stock
function readStock(data){
  foodCount = data.val();
  foodObj.updateFoodStock(foodCount);
}
function writeStock(carsh){
  if(carsh>0){
    carsh = carsh-1
  }
  else{
    carsh = 0
  }
  database.ref('/').set({
    'food':foodCount
  })
}

function showError(){
  console.log("error")
}
//function to update food stock and last fed time
function updateFood(){
  if(foodCount>0){
    foodCount = foodCount-1
    dog.addImage(happyDog)
    dog.x = 600
    flower.x = 600
    flower.y = 211
    State = END
  }
  else{
    dog.addImage(sadDog);
  }
    if(foodObj.getFoodStock()<=0){
      foodObj.updateFoodStock(foodObj.getFoodStock()*0);

    }
    else{  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }

}
//function to add food in stock
function addFoodStock(){
  foodCount = foodCount+1
   database.ref('/').update({
   food:foodCount
  })
  dog.x = 800;
  dog.y = 200
  flower.x = 800;
  flower.y = 201;
  State = PLAY
  dog.addImage(sadDog)
  if(dog.x ==600){
   flower.x = 600;
   flower.y = 211
  }
  else{
    return false;
  }
}
function name11(){
  feedPet = createButton('FEED Sweetie');
  feedPet.position(500,100);
  feedPet.mousePressed(updateFood);
  flower = createSprite(800,201,30,30);
  flower.addImage("adding",flower1)
  flower.scale =0.04;
}
function name21(){
  bark.play();
  feedPet1 = createButton('FEED   CYRUS');
  feedPet1.position(500,100);
  feedPet1.mousePressed(updateFood);
  flower.visible = false
}
