'use strict';

(function () {

  var visualizePins = function (locations) {

    var fragment = document.createDocumentFragment();

    for (var f = 0; f < window.place.LOCATIONS_AMOUNT; f++) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pin = pinTemplate.cloneNode(true);
      pin.style.left = locations[f].location.x;
      pin.style.top = locations[f].location.y;

      pin.querySelector('.map__pin img').setAttribute('src', locations[f].author.avatar);
      pin.querySelector('.map__pin img').setAttribute('alt', locations[f].offer.title);
      fragment.appendChild(pin);
    }

    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.renderPlace = {
    visualizePins: visualizePins
  };

}());
