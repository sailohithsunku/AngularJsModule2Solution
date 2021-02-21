(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy= this;

  toBuy.toBuyItems = ShoppingListCheckOffService.getBuyItems();

  toBuy.markAsBought = function(itemIndex){
    try{
    ShoppingListCheckOffService.markAsBought(itemIndex);
    }catch (error) {
      toBuy.errorMessage = error.message;
    }
  }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
     var alreadyBought = this;

     try{
       alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
     }catch(error){
       alreadyBought.errorMessage = error.message;
     }
    }

    function ShoppingListCheckOffService(){
      var service = this;
      var toBuyItems = [];
      var boughtItems = [];

      var item = { name: "cookies", quantity: 10 };
      toBuyItems.push(item);

      var item = { name: "Chocolates", quantity: 5 };
      toBuyItems.push(item);

      var item = { name: "Candies", quantity: 4 };
      toBuyItems.push(item);

      var item = { name: "Soft Drinks", quantity: 8 };
      toBuyItems.push(item);

      service.markAsBought = function(itemIndex){

        var item = toBuyItems[itemIndex];
        boughtItems.push(item);

        toBuyItems.splice(itemIndex,1);

        // if(toBuyItems.length < 1){
        //   throw new Error("Everything is bought!");
        // }

      }

      service.getBuyItems = function(){
        return toBuyItems;
      }

      service.getBoughtItems = function(){
        // if(boughtItems < 1){
        //   throw new Error("Nothing bought yet.");
        // }
        return boughtItems;
      }

    }



})();
