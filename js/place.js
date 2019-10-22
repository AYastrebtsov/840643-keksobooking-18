'use strict';

(function () {

  var LOCATIONS_AMOUNT = 8;
  var ADDRESS_X = 600;
  var ADDRESS_Y = 350;
  var PRICE = 1000;
  var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = 1;
  var AMOUNT = 30;
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var GALLERY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var X_MAX_COORDINATE = document.querySelector('.map__overlay').offsetWidth;
  var Y_MIN_COORDINATE = 130;
  var Y_MAX_COORDINATE = 630;
  var X_OFFSET = 25;
  var Y_OFFSET = 70;

  var createLocation = function () {
    return {
      author: {
        avatar: 'img/avatars/user0' + window.generateRandom.getRandomNumber(1, LOCATIONS_AMOUNT) + '.png'
      },
      offer: {
        title: 'заголовок объявления',
        address: window.generateRandom.getRandomNumber(0, ADDRESS_X) + ',' + window.generateRandom.getRandomNumber(0, ADDRESS_Y),
        price: window.generateRandom.getRandomNumber(0, PRICE),
        type: ACCOMODATION_TYPE[window.generateRandom.getRandomNumber(0, ACCOMODATION_TYPE.length - 1)],
        rooms: window.generateRandom.getRandomNumber(ROOMS, AMOUNT),
        guests: window.generateRandom.getRandomNumber(0, AMOUNT),
        checkin: CHECKIN_TIMES[window.generateRandom.getRandomNumber(0, CHECKIN_TIMES.length - 1)],
        checkout: CHECKIN_TIMES[window.generateRandom.getRandomNumber(0, CHECKIN_TIMES.length - 1)],
        features: window.generateRandom.randomArrayLength(FEATURES_ITEMS),
        description: 'описание',
        photos: window.generateRandom.randomArrayLength(GALLERY)
      },
      location: {
        x: window.generateRandom.getRandomNumber(0, X_MAX_COORDINATE) - X_OFFSET + 'px',
        y: window.generateRandom.getRandomNumber(Y_MIN_COORDINATE, Y_MAX_COORDINATE) - Y_OFFSET + 'px'
      }
    };
  };

  var getLocations = function () {

    var locations = [];

    for (var j = 0; j < LOCATIONS_AMOUNT; j++) {
      locations.push(createLocation());
    }
    return locations;
  };

  var visualizePins = function (locations) {

    var fragment = document.createDocumentFragment();


    for (var f = 0; f < LOCATIONS_AMOUNT; f++) {
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

  window.place = {
    getLocations: getLocations,
    visualizePins: visualizePins,
    LOCATIONS_AMOUNT: LOCATIONS_AMOUNT,
    ACCOMODATION_TYPE: ACCOMODATION_TYPE,
    X_OFFSET: X_OFFSET,
    Y_OFFSET: Y_OFFSET
  };

}());
