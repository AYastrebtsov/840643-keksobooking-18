'use strict';

(function () {

  var RoomsForGuestsMap = {
    0: ['для 1 гостя'],
    1: ['для 1 гостя', 'для 2 гостей'],
    2: ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
    3: ['не для гостей']
  };

  var PriceForAccomodationMap = {
    0: 0,
    1: 1000,
    2: 5000,
    3: 10000
  };

  var guests = document.querySelectorAll('#capacity option');

  var getRidOfSelected = function (array) {
    for (var s = 0; s < array.length; s++) {
      if (array[s].hasAttribute('selected')) {
        array[s].selected = false;
      }
    }
  };

  var getSelected = function (array) {
    for (var d = 0; d < array.length; d++) {
      if (!array[d].hasAttribute('disabled')) {
        array[d].selected = true;
      }
    }
  };

  var getDisabled = function (array) {
    for (var d = 0; d < array.length; d++) {
      if (!array[d].hasAttribute('selected')) {
        array[d].disabled = true;
      }
    }
  };

  var getRoomsChanged = function () {
    var selectedRoom = document.querySelector('#room_number').selectedIndex;
    var avaliableOptions = RoomsForGuestsMap[selectedRoom];

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
        for (var q = 0; q < checkInTimes.length; q++) {
          if (checkOutTimes[q].value === selectedCheckIn) {
            checkOutTimes[q].selected = true;
            checkInTimes[q].selected = true;
          }
        }
      }
    } else {
      if (selectedCheckOut !== selectedCheckIn) {
        for (var w = 0; w < checkOutTimes.length; w++) {
          if (checkInTimes[w].value === selectedCheckOut) {
            checkInTimes[w].selected = true;
            checkOutTimes[w].selected = true;
          }
        }
      }
    }
  };

  var getAccomodationChanged = function () {
    var selectedAccomodation = document.querySelector('#type').selectedIndex;
    var accomodationPrice = document.querySelector('#price');

    accomodationPrice.min = PriceForAccomodationMap[selectedAccomodation];
    accomodationPrice.placeholder = PriceForAccomodationMap[selectedAccomodation];
  };

  var room = document.querySelector('#room_number');
  room.addEventListener('change', getRoomsChanged);
  getDisabled(guests);

  var accomodation = document.querySelector('#type');
  accomodation.addEventListener('change', getAccomodationChanged);


  document.querySelector('#timein').addEventListener('change', synchronizeTimes);
  document.querySelector('#timeout').addEventListener('change', synchronizeTimes);


  window.validation = {
    ACCOMODATION_TO_PRICE: PriceForAccomodationMap
  };

}());
