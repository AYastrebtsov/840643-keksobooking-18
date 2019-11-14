'use strict';

(function () {

  var MAIN_PIN_INITIAL_X = 570;
  var MAIN_PIN_INITIAL_Y = 375;
  var HORIZONTAL_CAP = 130;
  var VERTICAL_CAP = 630;
  var MAIN_PIN_OFFSET = 33;


  var mapContainer = document.querySelector('.map');
  var mapFieldsets = mapContainer.querySelectorAll('fieldset');
  var mapSelects = mapContainer.querySelectorAll('select');

  var noticeContainer = document.querySelector('.notice');
  var noticeFieldsets = noticeContainer.querySelectorAll('fieldset');
  var noticeSelects = noticeContainer.querySelectorAll('select');

  var disableArray = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableArray = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = false;
    }
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    var cards = document.querySelectorAll('.map__card');

    for (var i = 0; i < cards.length; i++) {
      cards[i].remove();
    }

    for (var k = 0; k < pins.length; k++) {
      if (!pins[k].classList.contains('map__pin--main')) {
        pins[k].remove();
      }
    }
  };

  var disablePage = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.map__filters').classList.add('ad-form--disabled');
    document.querySelector('#price').min = window.validation.priceForAccomodationMap[1];
    document.querySelector('#price').placeholder = window.validation.priceForAccomodationMap[1];

    deletePins();
    disableArray(mapFieldsets);
    disableArray(mapSelects);

    disableArray(noticeFieldsets);
    disableArray(noticeSelects);

    document.querySelector('.ad-form').reset();
    document.querySelector('.map__filters').reset();
    resetMainPin();
    writeDownInitialCoordinates();
    window.pageCondition.listenToPinMovement();
  };

  var activateFilter = function () {
    enableArray(mapFieldsets);
    enableArray(mapSelects);
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
  };

  var activatePage = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    enableArray(noticeFieldsets);
    enableArray(noticeSelects);
    window.backend.get(window.place.visualizePins, getMessage, window.filter.saveData, activateFilter);
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
    var locatePin = getPosition();
    var coordinatesField = document.querySelector('#address');
    coordinatesField.value = locatePin[0] + '; ' + locatePin[1] + ';';
  };

  var writeDownCoordinates = function () {
    var locatePin = getPosition();
    var map = document.querySelector('.map__pins');
    var soughtPin = document.querySelector('.map__pin--main');

    if (locatePin[0] < -MAIN_PIN_OFFSET) {
      soughtPin.style.left = '-33px';
    } else if (locatePin[0] > map.offsetWidth - MAIN_PIN_OFFSET) {
      soughtPin.style.left = map.offsetWidth - MAIN_PIN_OFFSET + 'px';
    }

    if (locatePin[1] < HORIZONTAL_CAP - MAIN_PIN_OFFSET) {
      soughtPin.style.top = HORIZONTAL_CAP - MAIN_PIN_OFFSET + 'px';
    } else if (locatePin[1] > VERTICAL_CAP - MAIN_PIN_OFFSET) {
      soughtPin.style.top = VERTICAL_CAP - MAIN_PIN_OFFSET + 'px';
    }

    var coordinatesField = document.querySelector('#address');
    coordinatesField.value = (locatePin[0] + MAIN_PIN_OFFSET) + ', ' + (locatePin[1] + MAIN_PIN_OFFSET) + ',';
  };

  var listenPins = function () {
    var clickedPins = Array.from(document.querySelectorAll('.map__pin'));
    clickedPins.shift();
    var cardsList = document.querySelectorAll('.map__card');
    var closeButtons = document.querySelectorAll('.popup__close');

    var onPinClick = function (evt) {
      var onCloseCrossClick = function () {
        closeButtons[targetedCard].parentNode.classList.add('hidden');
        clickedPins[targetedCard].classList.remove('map__pin--active');
        if (evt.keyCode === 27) {
          closeButtons[targetedCard].parentNode.classList.add('hidden');
        }
      };

      for (var i = 0; i < cardsList.length; i++) {
        if (!cardsList[i].classList.contains('hidden') && clickedPins[i].classList.contains('map__pin--active')) {
          cardsList[i].classList.add('hidden');
          clickedPins[i].classList.remove('map__pin--active');
        }
      }

      var targetedCard = clickedPins.indexOf(evt.currentTarget);
      clickedPins[targetedCard].classList.add('map__pin--active');
      cardsList[targetedCard].classList.remove('hidden');
      closeButtons[targetedCard].addEventListener('click', onCloseCrossClick);
      document.addEventListener('keydown', onCloseCrossClick);
    };

    for (var k = 0; k < clickedPins.length; k++) {
      if (!clickedPins[k].classList.contains('map__pin--main')) {
        clickedPins[k].addEventListener('click', onPinClick);
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
        window.removeEventListener('keydown', onEscPress);
        page.removeChild(message);
      }
    };

    var onEscPress = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === 27 && document.querySelector('.' + element)) {
        message.removeEventListener('click', closeMessage);
        window.removeEventListener('keydown', onEscPress);
        message.remove();
      }
    };

    message.addEventListener('click', closeMessage);
    window.addEventListener('keydown', onEscPress);
  };

  var listenToPinMovement = function () {

    var deleteActivator = function (evt) {
      if (evt.type === 'keydown') {
        document.querySelector('.map__pin--main').removeEventListener('mousedown', activatePage, {once: true});
      } else {
        document.querySelector('.map__pin--main').removeEventListener('keydown', activatePage, {once: true});
      }
    };

    document.querySelector('.map__pin--main').addEventListener('mousedown', activatePage, {once: true});
    document.querySelector('.map__pin--main').addEventListener('keydown', activatePage, {once: true});
    document.querySelector('.map__pin--main').addEventListener('mousedown', writeDownCoordinates);
    document.querySelector('.map__pin--main').addEventListener('mousedown', deleteActivator);
    document.querySelector('.map__pin--main').addEventListener('keydown', deleteActivator);

  };

  document.addEventListener('DOMContentLoaded', writeDownInitialCoordinates);
  disableArray(mapFieldsets);
  disableArray(mapSelects);

  disableArray(noticeFieldsets);
  disableArray(noticeSelects);
  document.querySelector('.map__filters').classList.add('ad-form--disabled');
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
    listenPins: listenPins,
  };

}());


