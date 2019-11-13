'use strict';

(function () {

  var OfferTypeMap = {
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

    function writeDownFeatures() {
      var generatedList = locations[f].offer.features;
      var finalFeatures = [];

      for (var q = 0; q < generatedList.length; q++) {
        var templateItems = card.querySelectorAll('.popup__features .popup__feature');
        var generatedItem = card.querySelector('.popup__feature--' + generatedList[q]);

        for (var g = 0; g < templateItems.length; g++) {
          if (generatedItem.classList === templateItems[g].classList) {
            finalFeatures.push(templateItems[g]);
          }
        }
      }
      card.querySelector('.popup__features').innerHTML = '';

      for (var x = 0; x < finalFeatures.length; x++) {
        card.querySelector('.popup__features').appendChild(finalFeatures[x]);
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

    if (typeof (locations) !== 'undefined') {
      var cardFragment = document.createDocumentFragment();
      var fragment = document.createDocumentFragment();

      for (var f = 0; f < locations.length; f++) {
        if (Object.keys(locations[f]).length !== 0) {
          var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
          var pin = pinTemplate.cloneNode(true);

          var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
          var card = cardTemplate.cloneNode(true);

          pin.style.left = locations[f].location.x + 'px';
          pin.style.top = locations[f].location.y + 'px';

          if (locations[f].offer.title) {
            card.querySelector('.popup__title').textContent = locations[f].offer.title;
          } else {
            card.querySelector('.popup__title').style.display = 'none';
          }
          if (locations[f].offer.address) {
            card.querySelector('.popup__text--address').textContent = locations[f].offer.address;
          } else {
            card.querySelector('.popup__text--address').style.display = 'none';
          }
          if (locations[f].offer.price) {
            card.querySelector('.popup__text--price').textContent = locations[f].offer.price + '₽/ночь.';
          } else {
            card.querySelector('.popup__text--price').style.display = 'none';
          }
          if (locations[f].offer.type) {
            card.querySelector('.popup__type').textContent = OfferTypeMap[locations[f].offer.type];
          } else {
            card.querySelector('.popup__type').style.display = 'none';
          }
          if (locations[f].offer.rooms && locations[f].offer.guests) {
            card.querySelector('.popup__text--capacity').textContent = locations[f].offer.rooms + ' комнаты для ' + locations[f].offer.guests + ' гостей';
          } else {
            card.querySelector('.popup__text--capacity').style.display = 'none';
          }
          if (locations[f].offer.checkin !== '0:00' && locations[f].offer.checkout !== '0:00') {
            card.querySelector('.popup__text--time').textContent = 'Заезд после ' + locations[f].offer.checkin + ', выезд до ' + locations[f].offer.checkout;
          } else {
            card.querySelector('.popup__text--time').style.display = 'none';
          }
          if (locations[f].offer.features.length !== 0) {
            writeDownFeatures();
          } else {
            card.querySelector('.popup__features').style.display = 'none';
          }
          if (locations[f].offer.description) {
            card.querySelector('.popup__description').textContent = locations[f].offer.description;
          } else {
            card.querySelector('.popup__description').style.display = 'none';
          }
          if (locations[f].offer.photos.length !== 0) {
            writeDownPhotos();
          } else {
            card.querySelector('.popup__photos').style.display = 'none';
          }
          if (locations[f].author.avatar) {
            card.querySelector('.popup__avatar').src = locations[f].author.avatar;
          } else {
            card.querySelector('.popup__avatar').style.display = 'none';
          }
          card.classList.add('hidden');

          pin.querySelector('.map__pin img').setAttribute('src', locations[f].author.avatar);
          pin.querySelector('.map__pin img').setAttribute('alt', locations[f].offer.title);
          fragment.appendChild(pin);
          cardFragment.appendChild(card);
        }
      }

      document.querySelector('.map').classList.remove('map--faded');
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
    Y_OFFSET: Y_OFFSET
  };

}());
