Meteor.methods({
  "getRecipe":
  function(search){
    console.dir("here");
  //  const dish = Session.get("dish");
    //const number = Session.get("number");
    const dish = search.recipe;
    console.dir("dish2 = " + dish);
    const number = search.number;
    console.dir("number = " + number);
    //const offset = search.offset;
    //console.dir("offset = " + offset);
    var apikey = Meteor.settings.spoonacular;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number="+number+"&offset=0&query="+dish;
    //const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+dish+"&limitLicense=false&number=10&ranking=1";
    console.log(url);
    const z = HTTP.call("GET",
      url,
     {headers: {
       "X-Mashape-Key": apikey,
       "Accept": "application/json"
      }}/*, function(error, result) {
        if(!error) {
          console.log("successful");
          console.log("result");
          console.dir(result.content);
          console.dir("end");
          return result.content;
        }
      } */
      );
     console.dir(z);
     return z.content;
  },
  "getMeal":
  function(search){
    const mealType = search.mealType;
    const number = search.number;
    var apikey = Meteor.settings.spoonacular;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?limitLicense=false&number="+number+"&offset=0&query="+mealType+"&ranking=1&type="+mealType;
    const z = HTTP.call("GET",
      url,
     {headers: {
       "X-Mashape-Key": apikey,
       "Accept": "application/json"
      }}
    );
    console.dir(z);
    return z.content;

  },
  "advancedGet":
  function(search){
    console.dir("hi");
    var apikey = Meteor.settings.spoonacular;
    //console.log('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?cuisine=american&excludeIngredients=coconut%2C+mango&fillIngredients=false&includeIngredients=onions%2C+lettuce%2C+tomato&intolerances=peanut%2C+shellfish&limitLicense=false&maxCalories=1500&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=10&offset=0&query=burger&ranking=1&type=main+course');

  /*  var i;
    var diets = "";
    for (i = 0; i <	diet.length; i++) {
      diets+diet[i];
    }
    */
  //  const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?cuisine="+encodeURIComponent(cuisine)+"&excludeIngredients="+encodeURIComponent(allergies)+"&fillIngredients=false&includeIngredients="+encodeURIComponent(ingr)+"&intolerances="+encodeURIComponent(allergies)+"&limitLicense=false&maxCalories="+maxCal+"&maxCarbs="+maxCarb+"&maxFat="+maxFat+"&maxProtein="+maxProtein+"&minCalories="+minCal+"&minCarbs="+minCarb+"&minFat="+minFat+""&minProtein="+minProtein+"&number=10&offset=0&query="+encodeURIComponent(recipe)+"&ranking=1&type="+encodeURIComponent(mealType);
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?";
    console.log("original url: ");
    console.log(url);
    console.log(search.cuisine);
   if(search.cuisine){
     url += "cuisine=";
     url += encodeURIComponent(search.cuisine);
   }

   if(search.diet){
     url += "&diet=";
     url += encodeURIComponent(search.diet);
   }

   if(search.allergies){
     url +="&excludeIngredients=";
     url += encodeURIComponent(search.allergies);
   }

   if(search.ingr){
     url += "&fillIngredients=false&includeIngredients=";
     url += encodeURIComponent(search.ingr);
   }

   if(search.allergies){
     url += "&intolerances=";
     url += encodeURIComponent(search.allergies);
   }

   if(search.maxCal){
     url += "&limitLicense=false&maxCalories=";
     url += search.maxCal;
   }

   if(search.maxCarb){
     url += "&maxCarbs=";
     url += search.maxCarb;
   }

   if(search.maxFat){
     url += "&maxFat=";
     url += search.maxFat;
   }

   if(search.maxProtein){
     url += "&maxProtein=";
     url += search.maxProtein;
   }

   if(search.minCal){
     url += "&minCalories="
     url += search.minCal;
   }

   if(search.minCarb){
     url += "&minCarbs=";
     url += search.minCarb;
   }

   if(search.minFat){
     url += "&minFat=";
     url += search.minFat;
   }

   if(search.minProtein){
     url += "&minProtein=";
     url += search.minProtein;
   }

   if(search.number){
     url += "&number=";
     url += search.number;
   }
   /*if(search.offset){
     url += "&offset=";
     url += search.offset;
   }
   */
   if(search.recipe){
     url += "&offset=0&query=";
     url += encodeURIComponent(search.recipe);
   }

   if(search.mealType){
     url += "&ranking=1&type=";
     url += encodeURIComponent(search.mealType);
   }
   console.log("URL");
    console.log(url);
    const y = HTTP.call("GET",
      url,
      {headers: {
       "X-Mashape-Key": apikey,
       "Accept": "application/json"
      }}
    );

    console.dir(y);
    return y.content;
  },
  //--------------SHOPPING LIST-------------------------
  "addShoppingTalk":function(shopping_obj,item){
    console.dir(item);
    console.log("clicked the button");
    var apiKey = Meteor.settings.apiSpeechKey;
    const url = "https://api.api.ai/v1/query?v=20150910&query="+item+"&lang=en&contexts=shoppingList&sessionId="+Meteor.userId();
    //const url = "https://api.api.ai/v1/intents/?v=20150910"
    //const url = "https://api.api.ai/v1/query?v=20150910";
    console.log(url);
    const z = HTTP.call("GET",
      url,
      {
        headers:{
          "Authorization": "Bearer" + apiKey,
          "Content-type": "application/json"
        }
      },
      /*function(error,result){
        console.log("result");
        console.dir(result);
        return result.content;
      }*/
      );
    return z.content;
  },
  "getRecipeTalk":function(dish){
    console.dir(dish);
    console.log("clicked the button");
    var apiKey = Meteor.settings.apiSpeechKey;
    const url = "https://api.api.ai/v1/query?v=20150910&query="+dish+"&lang=en&sessionId="+Meteor.userId();
    console.log(url);
    const z = HTTP.call("GET",
      url,
      {
        headers: {
          "Authorization": "Bearer" + apiKey,
          "Content-type": "application/json"
        }
      },
      /*, function(error, result) {
        if(!error) {
          console.log("successful");
          console.log("result");
          console.dir(result.content);
          console.dir("end");
          return result.content;
        }
      } */
      );
    console.dir("z");
    console.dir(z);
    return z.content;
  },
  "removeShopping":function(item){
    console.dir(item);
    console.log("clicked the x");
    Shopping.remove(item);
  },
  "addShopping":function(item){
    console.log("item");
    console.dir(item);
    Shopping.insert(item);
  },

  //--------------FAVORITES LIST-------------------------
  "removeFavorite":function(favorite){
    console.dir(favorite);
    console.log("clicked the x");
    Favorites.remove(favorite);
  },
  "addFavorite":function(favorite){
    console.log("favorite");
    console.dir(favorite);
    Favorites.insert(favorite);
  },
/*
  "addFavoriteTalk":function(fridge_obj,item){
    console.dir(item);
    console.log("clicked the button");
    var apiKey = Meteor.settings.apiSpeechKey;
    const url = "https://api.api.ai/v1/query?v=20150910&query="+item+"&lang=en&contexts=shoppingList&sessionId="+Meteor.userId();
    console.log(url);
    const z = HTTP.call("GET",
      url,
      {
        headers:{
          "Authorization": "Bearer" + apiKey,
          "Content-type": "application/json"
        }
      },

      );

    return z.content;
  },
  */
  //--------------FRIDGE LIST-------------------------
  "removeFridge":function(fridgeItem){
    console.dir(fridgeItem);
    console.log("clicked the x");
    Fridge.remove(fridgeItem);
  },
  "addFridge":function(fridgeItem){
    console.log("fridge");
    console.dir(fridgeItem);
    Fridge.insert(fridgeItem);
  },
  "removeIns": function(){
    return Ins.remove({});
  },
  "removeRec": function(){
    return Rec.remove({});
  },
  "getInstructions": function(recId){
    var apikey = Meteor.settings.spoonacular;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+recId+"/analyzedInstructions?stepBreakdown=true";
    const z = HTTP.call("GET",
      url,
      {headers: {
        "X-Mashape-Key": apikey,
        "Accept": "application/json"
      }}
      );
    console.dir(z);
    return z.content;
  },
  "insertIns":function(item){
    Ins.insert(item);
  },
  "getRecipeIngredients":function(recId){
    var apikey = Meteor.settings.spoonacular;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+recId+"/information?includeNutrition=true";
    const z = HTTP.call("GET",
      url,
      {headers: {
        "X-Mashape-Key": apikey,
        "Accept": "application/json"
      }}
      );
    console.dir(z);
    return z.content;
  },
  "removeHealth":function(){
    Health.remove({});
  },
  "insertWeekly":function(planobj){
    Weekly.insert(planobj);
  },
  "removeWeekly":function(){
    Weekly.remove({});
  },
  "insertTotalM":function(){
    Mon.remove({});
    
    var a = Weekly.find({day:"Monday"},{fields:{cal:1}}).fetch();
    var b = Weekly.find({day:"Monday"},{fields:{fat:1}}).fetch();
    var c = Weekly.find({day:"Monday"},{fields:{carbs:1}}).fetch();
    var cal = 0;
    var carbs = 0;
    var fats = 0;
    for(var i=0; i<a.length; i++){
      cal = cal + a[i].cal; 
    }
    for(var i=0; i<a.length; i++){
      fats = fats + b[i].fat; 
    }
    for(var i=0; i<a.length; i++){
      carbs = carbs + c[i].carbs; 
    }
    fa = fats.toFixed(2);
    const num = {c:cal, f:fa, car:carbs}
    Mon.remove({c:0});
    Mon.insert(num);
  },
  "insertTotalTu":function(){
    Tues.remove({});
    
    var a = Weekly.find({day:"Tuesday"},{fields:{cal:1}}).fetch();
    var b = Weekly.find({day:"Tuesday"},{fields:{fat:1}}).fetch();
    var c = Weekly.find({day:"Tuesday"},{fields:{carbs:1}}).fetch();
    var cal = 0;
    var carbs = 0;
    var fats = 0;
    for(var i=0; i<a.length; i++){
      cal = cal + a[i].cal; 
    }
    for(var i=0; i<a.length; i++){
      fats = fats + b[i].fat; 
    }
    for(var i=0; i<a.length; i++){
      carbs = carbs + c[i].carbs; 
    }

    const num = {c:cal, f:fats, car:carbs}
    Tues.remove({c:0});
    Tues.insert(num);
  },
  "insertTotalW":function(){
    Wed.remove({});
    
    var a = Weekly.find({day:"Wednesday"},{fields:{cal:1}}).fetch();
    var b = Weekly.find({day:"Wednesday"},{fields:{fat:1}}).fetch();
    var c = Weekly.find({day:"Wednesday"},{fields:{carbs:1}}).fetch();
    var cal = 0;
    var carbs = 0;
    var fats = 0;
    for(var i=0; i<a.length; i++){
      cal = cal + a[i].cal; 
    }
    for(var i=0; i<a.length; i++){
      fats = fats + b[i].fat; 
    }
    for(var i=0; i<a.length; i++){
      carbs = carbs + c[i].carbs; 
    }

    const num = {c:cal, f:fats, car:carbs}
    Wed.remove({c:0});
    Wed.insert(num);
  },
  "insertTotalTh":function(){
    Thur.remove({});
    var a = Weekly.find({day:"Thursday"},{fields:{cal:1}}).fetch();
    var b = Weekly.find({day:"Thursday"},{fields:{fat:1}}).fetch();
    var c = Weekly.find({day:"Thursday"},{fields:{carbs:1}}).fetch();
    var cal = 0;
    var carbs = 0;
    var fats = 0;
    for(var i=0; i<a.length; i++){
      cal = cal + a[i].cal; 
    }
    for(var i=0; i<a.length; i++){
      fats = fats + b[i].fat; 
    }
    for(var i=0; i<a.length; i++){
      carbs = carbs + c[i].carbs; 
    }

    const num = {c:cal, f:fats, car:carbs}
    Thur.remove({c:0});
    Thur.insert(num);
  },
  "insertTotalF":function(){
    Fri.remove({});
    var a = Weekly.find({day:"Friday"},{fields:{cal:1}}).fetch();
    var b = Weekly.find({day:"Friday"},{fields:{fat:1}}).fetch();
    var c = Weekly.find({day:"Friday"},{fields:{carbs:1}}).fetch();
    var cal = 0;
    var carbs = 0;
    var fats = 0;
    for(var i=0; i<a.length; i++){
      cal = cal + a[i].cal; 
    }
    for(var i=0; i<a.length; i++){
      fats = fats + b[i].fat; 
    }
    for(var i=0; i<a.length; i++){
      carbs = carbs + c[i].carbs; 
    }

    const num = {c:cal, f:fats, car:carbs}
    Fri.remove({c:0});
    Fri.insert(num);
  },
  "insertTotalSa":function(){
    Sat.remove({});
    var a = Weekly.find({day:"Saturday"},{fields:{cal:1}}).fetch();
    var b = Weekly.find({day:"Saturday"},{fields:{fat:1}}).fetch();
    var c = Weekly.find({day:"Saturday"},{fields:{carbs:1}}).fetch();
    var cal = 0;
    var carbs = 0;
    var fats = 0;
    for(var i=0; i<a.length; i++){
      cal = cal + a[i].cal; 
    }
    for(var i=0; i<a.length; i++){
      fats = fats + b[i].fat; 
    }
    for(var i=0; i<a.length; i++){
      carbs = carbs + c[i].carbs; 
    }

    const num = {c:cal, f:fats, car:carbs}
    Sat.remove({c:0});
    Sat.insert(num);
  },
  "insertTotalSu":function(){
    Sun.remove({});
    var a = Weekly.find({day:"Sunday"},{fields:{cal:1}}).fetch();
    var b = Weekly.find({day:"Sunday"},{fields:{fat:1}}).fetch();
    var c = Weekly.find({day:"Sunday"},{fields:{carbs:1}}).fetch();
    var cal = 0;
    var carbs = 0;
    var fats = 0;
    for(var i=0; i<a.length; i++){
      cal = cal + a[i].cal; 

    }
    for(var i=0; i<a.length; i++){
      fats = fats + b[i].fat; 
    }
    for(var i=0; i<a.length; i++){
      carbs = carbs + c[i].carbs; 
    }

    const num = {c:cal, f:fats, car:carbs}
    Sun.remove({c:0});
    Sun.insert(num);
  },
  "updateWeekly":function(day, time, id, image, title, calories, fat, carbs){
    Weekly.update({day:day, time:time}, {$set: {title:title, image:image, cal:calories, fat:fat, carbs:carbs}});
    console.log("checked")
  }

})
