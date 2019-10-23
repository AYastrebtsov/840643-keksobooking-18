'use strict';

(function () {

  var disableArray = function (array) {

    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableArray = function (array) {

    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled', 'disabled');
    }
  };

  var FIELDSETS = document.querySelectorAll('fieldset');
  var SELECTS = document.querySelectorAll('select');

  var disablePage = function () {
    document.querySelector('.map__filters').classList.add('ad-form--disabled');

    disableArray(FIELDSETS);
    disableArray(SELECTS);
  };

  var activatePage = function () {
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    enableArray(FIELDSETS);
    enableArray(SELECTS);
    window.place.visualizePins(window.place.getLocations());
  };

  var getPosition = function () {
    var soughtPin = document.querySelector('.map__pin--main');
    var pinCoordinateX = parseInt(soughtPin.style.left, 10);
    var pinCoordinateY = parseInt(soughtPin.style.top, 10);
    var coordinates = [pinCoordinateX, pinCoordinateY];

    return coordinates;
  };

  var writeDownInitialCoordinates = function () {
    var pinLocation = getPosition();
    var coordinatesField = document.querySelector('#address');
    coordinatesField.value = pinLocation[0] + '; ' + pinLocation[1] + ';';
  };

  var writeDownCoordinates = function () {
    var pinLocation = getPosition();
    var coordinatesField = document.querySelector('#address');
    coordinatesField.value = (pinLocation[0] - window.place.X_OFFSET) + ', ' + (pinLocation[1] - window.place.Y_OFFSET) + ',';
  };

  document.addEventListener('DOMContentLoaded', writeDownInitialCoordinates);

  var listenPins = function () {
    var clickedPin = Array.from(document.querySelectorAll('.map__pin'));
    var cardsList = document.querySelectorAll('.map__card');
    var closeBtns = document.querySelectorAll('.popup__close');


    var showCard = function (evt) {

      var hideCard = function () {
        closeBtns[targetedCard - 1].parentNode.classList.add('hidden');
        if (evt.keyCode === 27) {
          closeBtns[targetedCard - 1].parentNode.classList.add('hidden');
        }
      };

      for (var h = 0; h < cardsList.length; h++) {
        if (!cardsList[h].classList.contains('hidden')) {
          cardsList[h].classList.add('hidden');
        }
      }

      var targetedCard = clickedPin.indexOf(evt.currentTarget);
      cardsList[targetedCard - 1].classList.remove('hidden');
      closeBtns[targetedCard - 1].addEventListener('click', hideCard);
      document.addEventListener('keydown', hideCard);
    };

    for (var k = 0; k < clickedPin.length; k++) {
      if (!clickedPin[k].classList.contains('map__pin--main')) {
        clickedPin[k].addEventListener('click', showCard);
      }
    }
  };


  var listenToPinMovement = function () {
    var minPin = document.querySelector('.map__pin--main');

    var deleteActivator = function (evt) {
      if (evt.type === 'keydown') {
        minPin.removeEventListener('mousedown', activatePage, {once: true});
      } else {
        minPin.removeEventListener('keydown', activatePage, {once: true});
      }
    };

    minPin.addEventListener('mousedown', activatePage, {once: true});
    minPin.addEventListener('mousedown', writeDownCoordinates);
    minPin.addEventListener('keydown', activatePage, {once: true});
    minPin.addEventListener('keydown', writeDownCoordinates);

    minPin.addEventListener('mousedown', writeDownCoordinates);
    minPin.addEventListener('click', listenPins);

    minPin.addEventListener('mousedown', deleteActivator, {once: true});
    minPin.addEventListener('keydown', deleteActivator, {once: true});
  };

  window.pageCondition = {
    disablePage: disablePage,
    listenToPinMovement: listenToPinMovement,
  };

}());

window.pageCondition.disablePage();
window.pageCondition.listenToPinMovement();
