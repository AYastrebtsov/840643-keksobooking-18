'use strict';

(function () {

  var roomsForGuestsMap = {
    0: ['для 1 гостя'],
    1: ['для 1 гостя', 'для 2 гостей'],
    2: ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
    3: ['не для гостей']
  };

  var priceForAccomodationMap = {
    0: 0,
    1: 1000,
    2: 5000,
    3: 10000
  };

  var guests = document.querySelectorAll('#capacity option');

  var getRidOfSelected = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].hasAttribute('selected')) {
        array[i].selected = false;
      }
    }
  };

  var getSelected = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (!array[i].hasAttribute('disabled')) {
        array[i].selected = true;
      }
    }
  };

  var getDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (!array[i].hasAttribute('selected')) {
        array[i].disabled = true;
      }
    }
  };

  var getRoomsChanged = function () {
    var selectedRoom = document.querySelector('#room_number').selectedIndex;
    var avaliableOptions = roomsForGuestsMap[selectedRoom];

    for (var i = 0; i < guests.length; i++) {
      if (avaliableOptions.includes(guests[i].innerText)) {
        guests[i].disabled = false;
      } else {
        guests[i].disabled = true;
      }
    }

    getRidOfSelected(guests);
    getSelected(guests);

  };

  var synchronizeTimes = function (evt) {
    var checkInTime = document.querySelector('#timein');
    var checkOutTime = document.querySelector('#timeout');

    var checkInTimes = Array.from(document.querySelectorAll('#timein option'));
    var checkOutTimes = Array.from(document.querySelectorAll('#timeout option'));

    var selectedCheckIn = checkInTime.options[checkInTime.selectedIndex].value;
    var selectedCheckOut = checkOutTime.options[checkOutTime.selectedIndex].value;

    getRidOfSelected(checkInTimes);
    getRidOfSelected(checkOutTimes);

    if (evt.target.id === 'timein') {

      if (selectedCheckIn !== selectedCheckOut) {
        for (var i = 0; i < checkInTimes.length; i++) {
          if (checkOutTimes[i].value === selectedCheckIn) {
            checkOutTimes[i].selected = true;
            checkInTimes[i].selected = true;
          }
        }
      }
    } else {
      if (selectedCheckOut !== selectedCheckIn) {
        for (var k = 0; k < checkOutTimes.length; k++) {
          if (checkInTimes[k].value === selectedCheckOut) {
            checkInTimes[k].selected = true;
            checkOutTimes[k].selected = true;
          }
        }
      }
    }
  };

  var getAccomodationChanged = function () {
    var selectedAccomodation = document.querySelector('#type').selectedIndex;
    var accomodationPrice = document.querySelector('#price');

    accomodationPrice.min = priceForAccomodationMap[selectedAccomodation];
    accomodationPrice.placeholder = priceForAccomodationMap[selectedAccomodation];
  };

  var room = document.querySelector('#room_number');
  room.addEventListener('change', getRoomsChanged);
  getDisabled(guests);

  var accomodation = document.querySelector('#type');
  accomodation.addEventListener('change', getAccomodationChanged);


  document.querySelector('#timein').addEventListener('change', synchronizeTimes);
  document.querySelector('#timeout').addEventListener('change', synchronizeTimes);


  window.validation = {
    priceForAccomodationMap: priceForAccomodationMap
  };

}());
