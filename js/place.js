'use strict';

(function () {

  var offerTypeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var LOCATIONS_AMOUNT = 5;
  var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var X_OFFSET = 25;
  var Y_OFFSET = 70;


  var visualizePins = function (locations) {
    var shortenedLocations = locations.concat(0, 0).splice(0, 5);

    var writeDownFeatures = function () {
      var generatedList = shortenedLocations[i].offer.features;
      card.querySelector('.popup__features').innerHTML = '';

      for (var k = 0; k < generatedList.length; k++) {
        var clone = document.createElement('li');
        clone.classList.add('popup__feature');
        clone.classList.add('popup__feature--' + generatedList[k]);
        var finalItem = clone;

        card.querySelector('.popup__features').appendChild(finalItem);
      }
    };

    var writeDownPhotos = function () {
      var generatedPhotos = shortenedLocations[i].offer.photos;
      var photo = card.querySelector('.popup__photo');
      card.querySelector('.popup__photos').innerHTML = '';
      var photos = [];

      for (var k = 0; k < generatedPhotos.length; k++) {
        var copy = photo.cloneNode(true);
        photos.push(copy);
      }

      for (var l = 0; l < generatedPhotos.length; l++) {
        photos[l].src = generatedPhotos[l];
        card.querySelector('.popup__photos').appendChild(photos[l]);
      }
    };

    if (typeof (shortenedLocations) !== 'undefined') {
      var cardFragment = document.createDocumentFragment();
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < shortenedLocations.length; i++) {
        if (Object.keys(shortenedLocations[i]).length !== 0) {
          var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
          var pin = pinTemplate.cloneNode(true);

          var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
          var card = cardTemplate.cloneNode(true);

          pin.style.left = shortenedLocations[i].location.x + 'px';
          pin.style.top = shortenedLocations[i].location.y + 'px';

          if (shortenedLocations[i].offer.title) {
            card.querySelector('.popup__title').textContent = shortenedLocations[i].offer.title;
          } else {
            card.querySelector('.popup__title').style.display = 'none';
          }
          if (shortenedLocations[i].offer.address) {
            card.querySelector('.popup__text--address').textContent = shortenedLocations[i].offer.address;
          } else {
            card.querySelector('.popup__text--address').style.display = 'none';
          }
          if (shortenedLocations[i].offer.price) {
            card.querySelector('.popup__text--price').textContent = shortenedLocations[i].offer.price + '₽/ночь.';
          } else {
            card.querySelector('.popup__text--price').style.display = 'none';
          }
          if (shortenedLocations[i].offer.type) {
            card.querySelector('.popup__type').textContent = offerTypeMap[shortenedLocations[i].offer.type];
          } else {
            card.querySelector('.popup__type').style.display = 'none';
          }
          if (shortenedLocations[i].offer.rooms && shortenedLocations[i].offer.guests) {
            card.querySelector('.popup__text--capacity').textContent = shortenedLocations[i].offer.rooms + ' комнаты для ' + shortenedLocations[i].offer.guests + ' гостей';
          } else {
            card.querySelector('.popup__text--capacity').style.display = 'none';
          }
          if (shortenedLocations[i].offer.checkin !== '0:00' && shortenedLocations[i].offer.checkout !== '0:00') {
            card.querySelector('.popup__text--time').textContent = 'Заезд после ' + shortenedLocations[i].offer.checkin + ', выезд до ' + shortenedLocations[i].offer.checkout;
          } else {
            card.querySelector('.popup__text--time').style.display = 'none';
          }
          if (shortenedLocations[i].offer.features.length !== 0) {
            writeDownFeatures();
          } else {
            card.querySelector('.popup__features').style.display = 'none';
          }
          if (shortenedLocations[i].offer.description) {
            card.querySelector('.popup__description').textContent = shortenedLocations[i].offer.description;
          } else {
            card.querySelector('.popup__description').style.display = 'none';
          }
          if (shortenedLocations[i].offer.photos.length !== 0) {
            writeDownPhotos();
          } else {
            card.querySelector('.popup__photos').style.display = 'none';
          }
          if (shortenedLocations[i].author.avatar) {
            card.querySelector('.popup__avatar').src = shortenedLocations[i].author.avatar;
          } else {
            card.querySelector('.popup__avatar').style.display = 'none';
          }
          card.classList.add('hidden');

          pin.querySelector('.map__pin img').setAttribute('src', shortenedLocations[i].author.avatar);
          pin.querySelector('.map__pin img').setAttribute('alt', shortenedLocations[i].offer.title);
          fragment.appendChild(pin);
          cardFragment.appendChild(card);
        }
      }

      document.querySelector('.map__pins').appendChild(fragment);
      document.querySelector('.map__filters-container').before(cardFragment);
      window.pageCondition.listenPins();
    }

  };

  window.place = {
    visualizePins: visualizePins,
    LOCATIONS_AMOUNT: LOCATIONS_AMOUNT,
    ACCOMODATION_TYPE: ACCOMODATION_TYPES,
    X_OFFSET: X_OFFSET,
    Y_OFFSET: Y_OFFSET,
  };

}());
