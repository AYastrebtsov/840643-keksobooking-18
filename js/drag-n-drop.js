'use strict';

(function () {

  var minPin = document.querySelector('.map__pin--main');

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
    document.addEventListener('mousemove', window.pageCondition.writeDownCoordinates);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', window.pageCondition.writeDownCoordinates);

  });
})();
