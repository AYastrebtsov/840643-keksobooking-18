'use strict';

var MAP_ROOMS_TO_GUESTS = {
  0: ['для 1 гостя'],
  1: ['для 1 гостя', 'для 2 гостей'],
  2: ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  3: ['не для гостей']
};

var guestsSelector = document.querySelector('#capacity');
var guests = document.querySelectorAll('#capacity option');

var getRidOfSelected = function (array) {
  for (var s = 0; s < array.length; s++) {
    if (array[s].hasAttribute('selected')) {
      array[s].removeAttribute('selected', 'selected');
    }
  }
};

var getSelected = function (array) {
  for (var d = 0; d < array.length; d++) {
    if (!array[d].hasAttribute('disabled')) {
      array[d].setAttribute('selected', 'selected');
      break;
    }
  }
};

var onChangeRoomsSelectHandler = function () {
  var selectedRoom = document.querySelector('#room_number').selectedIndex;
  var avaliableOptions = MAP_ROOMS_TO_GUESTS[selectedRoom];

  for (var i = 0; i < guests.length; i++) {
    if (avaliableOptions.includes(guests[i].innerText)) {
      guests[i].removeAttribute('disabled', 'disabled');
    } else {
      guests[i].setAttribute('disabled', 'disabled');
    }
  }

  for (var m = 0; m < guests.length; m++) {
    if (guests[m].hasAttribute('disabled')) {
      guestsSelector.setCustomValidity('Такой вариант аренды недоступен');
      break;
    } else {
      guestsSelector.setCustomValidity('');
      break;
    }
  }

  getRidOfSelected(guests);
  getSelected(guests);

};

var rooms = document.querySelector('#room_number');
rooms.addEventListener('change', onChangeRoomsSelectHandler);


