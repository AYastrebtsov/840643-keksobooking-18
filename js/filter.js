'use strict';

(function () {

  var serverData = [];

  var saveData = function (data) {
    serverData = data;
    return serverData;
  };

  var PriceLimit = {
    LOW: 10000,
    HIGHT: 50000
  };

  var filters = document.querySelector('.map__filters');

  var housing = filters.querySelector('#housing-type');
  var pricing = filters.querySelector('#housing-price');
  var rooms = filters.querySelector('#housing-rooms');
  var guests = filters.querySelector('#housing-guests');
  var features = filters.querySelectorAll('input[type=checkbox]');


  var updateData = function () {

    var filteredData = serverData.concat();

    var filtered = filteredData.filter(function (item) {
      var priceFilterValues = {
        'middle': item.offer.price >= PriceLimit.LOW && item.offer.price <= PriceLimit.HIGHT,
        'low': item.offer.price <= PriceLimit.LOW,
        'high': item.offer.price >= PriceLimit.HIGHT
      };
      var featuresCheked = document.querySelectorAll('input[type=checkbox]:checked');

      return (housing.value === 'any' || item.offer.type === housing.value) &&
    (pricing.value === 'any' || priceFilterValues[pricing.value]) &&
    (rooms.value === 'any' || parseInt(rooms.value, 10) === item.offer.rooms) &&
    (guests.value === 'any' || parseInt(guests.value, 10) === item.offer.guests) &&
    (Array.from(featuresCheked).every(function (elem) {
      return item.offer.features.includes(elem.value);
    }));
    });

    window.pageCondition.deletePins();
    window.place.visualizePins(filtered.splice(0, 5));
  };


  housing.addEventListener('change', window.debounce(updateData));
  rooms.addEventListener('change', window.debounce(updateData));
  guests.addEventListener('change', window.debounce(updateData));
  pricing.addEventListener('change', window.debounce(updateData));
  features.forEach(function (featuresElement) {
    featuresElement.addEventListener('click', window.debounce(updateData));
  });

  window.filter = {
    saveData: saveData
  };
})();
