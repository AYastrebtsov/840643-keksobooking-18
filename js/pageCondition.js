'use strict';

(function () {

  var MAIN_PIN_INITIAL_X = 570;
  var MAIN_PIN_INITIAL_Y = 375;
  var MAIN_PIN_OFFSET = 33;
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
    document.querySelector('.map__filters').reset();
    resetMainPin();
    writeDownInitialCoordinates();
    window.pageCondition.listenToPinMovement();
  };

  var activatePage = function (data) {
    window.place.visualizePins(data);
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    enableArray(FIELDSETS);
    enableArray(SELECTS);
  };

  var activationCaller = function () {
    window.get(activatePage, getMessage);
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
    var map = document.querySelector('.map__pins');
    var soughtPin = document.querySelector('.map__pin--main');

    if (pinLocation[0] < -MAIN_PIN_OFFSET) {
      soughtPin.style.left = '-33px';
    } else if (pinLocation[0] > map.offsetWidth - MAIN_PIN_OFFSET) {
      soughtPin.style.left = map.offsetWidth - MAIN_PIN_OFFSET + 'px';
    }

    if (pinLocation[1] < 130 - MAIN_PIN_OFFSET) {
      soughtPin.style.top = 130 - MAIN_PIN_OFFSET + 'px';
    } else if (pinLocation[1] > 630 - MAIN_PIN_OFFSET) {
      soughtPin.style.top = 630 - MAIN_PIN_OFFSET + 'px';
    }

    var coordinatesField = document.querySelector('#address');
    coordinatesField.value = (pinLocation[0] + MAIN_PIN_OFFSET) + ', ' + (pinLocation[1] + MAIN_PIN_OFFSET) + ',';
  };


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

  var getMessage = function (pageElement) {
    var element = pageElement;
    var messageTemplate = document.querySelector('#' + element).content.querySelector('.' + element);
    var message = messageTemplate.cloneNode(true);
    var page = document.querySelector('main');
    page.appendChild(message);
    var massageText = document.querySelector('.' + element + '__message');

    var closeMessage = function (evt) {
      if (evt.target !== massageText) {
        message.removeEventListener('click', closeMessage);
        page.removeChild(message);
        document.querySelector('.map__pin--main').addEventListener('mousedown', activationCaller, {once: true});
        document.querySelector('.map__pin--main').addEventListener('keydown', activationCaller, {once: true});
      }
    };

    message.addEventListener('click', closeMessage);
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27 && document.querySelector('.' + element)) {
        message.remove();
        document.querySelector('.map__pin--main').addEventListener('mousedown', activationCaller, {once: true});
        document.querySelector('.map__pin--main').addEventListener('keydown', activationCaller, {once: true});
      }
    });
  };


  var listenToPinMovement = function () {

    var deleteActivator = function (evt) {
      if (evt.type === 'keydown') {
        document.querySelector('.map__pin--main').removeEventListener('mousedown', activationCaller, {once: true});
      } else {
        document.querySelector('.map__pin--main').removeEventListener('keydown', activationCaller, {once: true});
      }
    };

    document.querySelector('.map__pin--main').addEventListener('mousedown', activationCaller, {once: true});
    document.querySelector('.map__pin--main').addEventListener('keydown', activationCaller, {once: true});
    document.querySelector('.map__pin--main').addEventListener('mousedown', writeDownCoordinates);
    document.querySelector('.map__pin--main').addEventListener('mousedown', deleteActivator);
    document.querySelector('.map__pin--main').addEventListener('keydown', deleteActivator);

  };


  document.addEventListener('DOMContentLoaded', writeDownInitialCoordinates);
  disableArray(FIELDSETS);
  disableArray(SELECTS);
  listenToPinMovement();

  document.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    window.pageCondition.disablePage();
  });

  window.pageCondition = {
    deletePins: deletePins,
    disablePage: disablePage,
    getMessage: getMessage,
    listenToPinMovement: listenToPinMovement,
    writeDownCoordinates: writeDownCoordinates,
    listenPins: listenPins

  };

}());


