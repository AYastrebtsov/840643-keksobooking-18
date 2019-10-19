'use strict';


(function () {

  var mapOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };


  var visualizeCard = function (locations) {

    function writeDownFeatures() {
      var generatedList = locations[c].offer.features;
      var finalList = [];

      for (var f = 0; f < generatedList.length; f++) {
        var templateItems = card.querySelectorAll('.popup__features .popup__feature');
        var generatedItem = card.querySelector('.popup__feature--' + generatedList[f]);

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
      var generatedPhotos = locations[c].offer.photos;
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

    for (var c = 0; c < window.place.LOCATIONS_AMOUNT; c++) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var card = cardTemplate.cloneNode(true);

      card.querySelector('.popup__title').textContent = locations[c].offer.title;
      card.querySelector('.popup__text--address').textContent = locations[c].offer.address;
      card.querySelector('.popup__text--price').textContent = locations[c].offer.price + '₽/ночь.';
      card.querySelector('.popup__type').textContent = mapOfferType[locations[c].offer.type];
      card.querySelector('.popup__text--capacity'). textContent = locations[c].offer.rooms + ' комнаты для ' + locations[c].offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + locations[c].offer.checkin + ', выезд до ' + locations[c].offer.checkout;
      writeDownFeatures();
      card.querySelector('.popup__description').textContent = locations[c].offer.description;
      writeDownPhotos();
      card.querySelector('.popup__avatar').src = locations[c].author.avatar;


      cardFragment.appendChild(card);
    }

    document.querySelector('.map').appendChild(cardFragment);

  };

  visualizeCard(window.place.getLocations());

})();


