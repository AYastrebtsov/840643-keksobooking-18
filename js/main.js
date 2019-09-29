'use strict';

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLocationsAmount() {
  return 8;
}

var getParameters = function () {

  var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];

  var featuresItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var gallery = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var locations = [];

  for (var j = 0; j < getLocationsAmount(); j++) {
    locations.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
      },
      offer: {
        title: 'заголовок объявления',
        address: (getRandomNumber(0, 600) + getRandomNumber(0, 350)),
        price: getRandomNumber(0, 1000),
        type: ACCOMODATION_TYPE[getRandomNumber(1, 4)],
        rooms: getRandomNumber(1, 30),
        guests: getRandomNumber(1, 30),
        checkin: CHECKIN_TIMES[getRandomNumber(1, 3)],
        checkout: CHECKIN_TIMES[getRandomNumber(1, 3)],
        features: featuresItems.slice(getRandomNumber(0, 7), getRandomNumber(0, 7)),
        description: 'описание',
        photos: gallery.slice(getRandomNumber(0, 4), getRandomNumber(0, 4))
      },
      location: {
        x: getRandomNumber(0, 100) + '%',
        y: getRandomNumber(130, 630) + 'px'
      }
    });
  }
  return locations;
};

getParameters();

var visualizePins = function (locations) {

  var fragment = document.createDocumentFragment();

  for (var f = 0; f < getLocationsAmount(); f++) {
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

visualizePins();
