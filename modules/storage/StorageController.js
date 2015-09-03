FarmClickerApp.controller('StorageController', ['$scope', '$http', 'harvest', 'storage', function($scope, $http, harvest, storage){

  $scope.storageUpgrades = {};

  $http.get('/modules/storage/StorageUpgrades.js').success(function(data) {
    $scope.storageUpgrades = data;
  });

  $scope.getMaxStorage = function(){
    return storage.getMaxStorage();
  };

  $scope.increaseMaxStorage = function(amount){
    storage.increaseMaxStorage(amount);
  };

  //TODO: This is very similar to the one in productivity controller. abstract into application controller?
  $scope.clickSilo = function(upgrade){
    if (harvest.getCropsHarvested() >= upgrade.price) {
            harvest.deductFromHarvest(upgrade.price);
            storage.increaseMaxStorage(upgrade.increaseStorageBy);

            upgrade.bought += 1;
            upgrade.price += Math.floor(upgrade.price * upgrade.increase)
        }
  };

}]);
