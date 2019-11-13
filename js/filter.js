'use strict';

(function () {

  var serverData = [];

  var load = function (data) {
    serverData = data;
    return serverData;
  };

  var PriceLimitMap = {
    low: 10000,
    high: 50000
  };

  var housing = document.querySelector('#housing-type');
  var pricing = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('input[type=checkbox]');


  var updateData = function () {
    window.pageCondition.deletePins();

    var filteredData = serverData.concat();

    if (housing.value === 'any') {
      filteredData = filteredData;
    } else {
      var sameHousing = filteredData.filter(function (currentElement) {
        return currentElement.offer.type === housing.value;
      });
      filteredData = sameHousing;
    }

    if (pricing.value === 'any') {
      filteredData = filteredData;
    } else {
      var samePricing = filteredData.filter(function (currentElement) {
        var priceFilterValues = {
          'middle': currentElement.offer.price >= PriceLimitMap.low && currentElement.offer.price <= PriceLimitMap.high,
          'low': currentElement.offer.price <= PriceLimitMap.low,
          'high': currentElement.offer.price >= PriceLimitMap.high
        };
        return priceFilterValues[pricing.value];
      });

      filteredData = samePricing;
    }

    if (rooms.value === 'any') {
      filteredData = filteredData;
    } else {
      var sameRooms = filteredData.filter(function (currentElement) {
        return currentElement.offer.rooms === parseInt(rooms.value, 10);
      });
      filteredData = sameRooms;
    }

    if (guests.value === 'any') {
      filteredData = filteredData;
    } else {
      var sameGuests = filteredData.filter(function (currentElement) {
        return currentElement.offer.guests === parseInt(guests.value, 10);
      });
      filteredData = sameGuests;
    }

    var selectedFeatures = document.querySelectorAll('input[type=checkbox]:checked');
    if (selectedFeatures.length === 0) {
      filteredData = filteredData;
    } else {
      selectedFeatures.forEach(function (currentElement) {
        filteredData = filterByFeatures(currentElement);
      });
    }

    function filterByFeatures(currentElement) {
      var sameFeatures = filteredData.filter(function (element) {
        return element.offer.features.indexOf(currentElement.value) >= 0;
      });
      return sameFeatures;
    }

    return window.place.visualizePins(filteredData.splice(0, 5));
  };

  housing.addEventListener('change', window.debounce(updateData));

  rooms.addEventListener('change', window.debounce(updateData));
  guests.addEventListener('change', window.debounce(updateData));
  pricing.addEventListener('change', window.debounce(updateData));
  features.forEach(function (featuresElement) {
    featuresElement.addEventListener('click', window.debounce(updateData));
  });

  window.filter = {
    loader: load
  };
})();
