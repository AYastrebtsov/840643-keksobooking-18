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
    window.renderPlace.visualizePins(window.place.getLocations());
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

  var pinMovementHandler = function () {
    var minPin = document.querySelector('.map__pin--main');

    minPin.addEventListener('mousedown', activatePage, {once: true});
    minPin.addEventListener('mousedown', writeDownCoordinates);
    minPin.addEventListener('keydown', activatePage, {once: true});
    minPin.addEventListener('keydown', writeDownCoordinates);
  };

  window.pageCondition = {
    disablePage: disablePage,
    pinMovementHandler: pinMovementHandler,
  };

}());

window.pageCondition.disablePage();
window.pageCondition.pinMovementHandler();
