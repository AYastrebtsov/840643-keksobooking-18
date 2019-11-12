'use strict';

var MAP_ROOMS_TO_GUESTS = {
  0: ['для 1 гостя'],
  1: ['для 1 гостя', 'для 2 гостей'],
  2: ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  3: ['не для гостей']
};

var ACCOMODATION_TO_PRICE = {
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

var onChangeRoomsSelectHandler = function () {
  var selectedRoom = document.querySelector('#room_number').selectedIndex;
  var avaliableOptions = MAP_ROOMS_TO_GUESTS[selectedRoom];

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

var timesSynchronizer = function (evt) {
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

var onChangeAccomodationSelectHandler = function () {
  var selectedAccomodation = document.querySelector('#type').selectedIndex;
  var accomodationPrice = document.querySelector('#price');

  accomodationPrice.min = ACCOMODATION_TO_PRICE[selectedAccomodation];
  accomodationPrice.placeholder = ACCOMODATION_TO_PRICE[selectedAccomodation];
};

var rooms = document.querySelector('#room_number');
rooms.addEventListener('change', onChangeRoomsSelectHandler);
getDisabled(guests);

var accomodation = document.querySelector('#type');
accomodation.addEventListener('change', onChangeAccomodationSelectHandler);


document.querySelector('#timein').addEventListener('change', timesSynchronizer);
document.querySelector('#timeout').addEventListener('change', timesSynchronizer);


window.validation = {
  ACCOMODATION_TO_PRICE: ACCOMODATION_TO_PRICE
};
