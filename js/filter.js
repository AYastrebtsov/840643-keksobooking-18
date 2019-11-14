'use strict';

(function () {

  var serverData = [];

  var saveData = function (data) {
    serverData = data;
    return serverData;
  };

  var priceLimitMap = {
    low: 10000,
    high: 50000
  };

  var housing = document.querySelector('#housing-type');
  var pricing = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('input[type=checkbox]');


  var updateData = function () {

    var filteredData = serverData.concat();

    var filtered = filteredData.filter(function (item) {
      var priceFilterValues = {
        'middle': item.offer.price >= priceLimitMap.low && item.offer.price <= priceLimitMap.high,
        'low': item.offer.price <= priceLimitMap.low,
        'high': item.offer.price >= priceLimitMap.high
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
