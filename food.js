class Food{
    constructor(){
        this.image = loadImage("Milk.png");
        this.lastFed;
    }
    display(){
        var x, y = -50;

        imageMode(CENTER);

         if(foodS != 0){
            for(var i = 0; i < foodS; i++){
                if(i % 5 === 0){
                    x = 60;
                    y += 200;
                }
                image(this.image, x, y, 200, 200);
                x += 100;
            }
        }
    }
    getFoodStock(){
        var gFood = database.ref("Food");
        gFood.on("value", function(data){
            gFood = data.val();
        });
    }
    updateFoodStock(food){
        database.ref('/').update({
            Food: food
        });
    }
    deductFood(food){
        database.ref('/').set({
            Food: food - 1
        });
    }
}