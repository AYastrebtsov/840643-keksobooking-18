'use strict';

(function () {

  var MAIN_PIN_INITIAL_X = 570;
  var MAIN_PIN_INITIAL_Y = 375;
  var FIELDSETS = document.querySelectorAll('fieldset');
  var SELECTS = document.querySelectorAll('select');

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

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    var cards = document.querySelectorAll('.map__card');

    for (var v = 0; v < cards.length; v++) {
      cards[v].remove();
    }

    for (var d = 0; d < pins.length; d++) {
      if (!pins[d].classList.contains('map__pin--main')) {
        pins[d].remove();
      }
    }
  };

  var disablePage = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.map__filters').classList.add('ad-form--disabled');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('#price').min = window.validation.ACCOMODATION_TO_PRICE[1];
    document.querySelector('#price').placeholder = window.validation.ACCOMODATION_TO_PRICE[1];

    deletePins();
    disableArray(FIELDSETS);
    disableArray(SELECTS);

    document.querySelector('.ad-form').reset();
    resetMainPin();
    writeDownInitialCoordinates();
    window.pageCondition.listenToPinMovement();

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

  var resetMainPin = function () {
    var soughtPin = document.querySelector('.map__pin--main');
    soughtPin.style.left = MAIN_PIN_INITIAL_X + 'px';
    soughtPin.style.top = MAIN_PIN_INITIAL_Y + 'px';
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

    minPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var initialCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: initialCoordinates.x - moveEvt.clientX,
          y: initialCoordinates.y - moveEvt.clientY
        };

        initialCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        minPin.style.top = (minPin.offsetTop - shift.y) + 'px';
        minPin.style.left = (minPin.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousemove', writeDownCoordinates);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseup', writeDownCoordinates);

    });

    minPin.addEventListener('mousedown', activatePage, {once: true});
    minPin.addEventListener('keydown', activatePage, {once: true});
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

window.pageCondition.listenToPinMovement();

document.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
  evt.preventDefault();
  window.pageCondition.disablePage();
});
