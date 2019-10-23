'use strict';

(function () {

  var mapOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

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

    function writeDownFeatures() {
      var generatedList = locations[f].offer.features;
      var finalList = [];

      for (var q = 0; q < generatedList.length; q++) {
        var templateItems = card.querySelectorAll('.popup__features .popup__feature');
        var generatedItem = card.querySelector('.popup__feature--' + generatedList[q]);

        for (var g = 0; g < templateItems.length; g++) {
          if (generatedItem.classList === templateItems[g].classList) {
            finalList.push(templateItems[g]);
          }
        }
      }
      card.querySelector('.popup__features').innerHTML = '';

      for (var x = 0; x < finalList.length; x++) {
        card.querySelector('.popup__features').appendChild(finalList[x]);
      }
    }

    function writeDownPhotos() {
      var generatedPhotos = locations[f].offer.photos;
      var photo = card.querySelector('.popup__photo');
      card.querySelector('.popup__photos').innerHTML = '';
      var photos = [];

      for (var m = 0; m < generatedPhotos.length; m++) {
        var copy = photo.cloneNode(true);
        photos.push(copy);
      }

      for (var p = 0; p < generatedPhotos.length; p++) {
        photos[p].src = generatedPhotos[p];
        card.querySelector('.popup__photos').appendChild(photos[p]);
      }
    }


    var cardFragment = document.createDocumentFragment();
    var fragment = document.createDocumentFragment();

    for (var f = 0; f < LOCATIONS_AMOUNT; f++) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pin = pinTemplate.cloneNode(true);

      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var card = cardTemplate.cloneNode(true);

      pin.style.left = locations[f].location.x;
      pin.style.top = locations[f].location.y;

      card.querySelector('.popup__title').textContent = locations[f].offer.title;
      card.querySelector('.popup__text--address').textContent = locations[f].offer.address;
      card.querySelector('.popup__text--price').textContent = locations[f].offer.price + '₽/ночь.';
      card.querySelector('.popup__type').textContent = mapOfferType[locations[f].offer.type];
      card.querySelector('.popup__text--capacity'). textContent = locations[f].offer.rooms + ' комнаты для ' + locations[f].offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + locations[f].offer.checkin + ', выезд до ' + locations[f].offer.checkout;
      writeDownFeatures();
      card.querySelector('.popup__description').textContent = locations[f].offer.description;
      writeDownPhotos();
      card.querySelector('.popup__avatar').src = locations[f].author.avatar;
      card.classList.add('hidden');

      pin.querySelector('.map__pin img').setAttribute('src', locations[f].author.avatar);
      pin.querySelector('.map__pin img').setAttribute('alt', locations[f].offer.title);
      fragment.appendChild(pin);
      cardFragment.appendChild(card);


    }

    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.map__pins').appendChild(fragment);
    document.querySelector('.map__filters-container').before(cardFragment);

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
