'use strict';

(function () {

  var serverData = [];

  var loader = function (data) {
    serverData = data;
    return serverData;
  };


  var housing = document.querySelector('#housing-type');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');

  var updatedData = function () {
    window.pageCondition.deletePins();

    var filteredData = serverData;

    if (housing.value === 'any') {
      filteredData = filteredData;
    } else {
      var sameHousing = filteredData.filter(function (currentElement) {
        return currentElement.offer.type === housing.value;
      });
      filteredData = sameHousing;
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

    return window.place.visualizePins(filteredData.splice(0, 5));
  };


  housing.addEventListener('change', updatedData);
  rooms.addEventListener('change', updatedData);
  guests.addEventListener('change', updatedData);


  window.filter = {
    loader: loader
  };
})();
