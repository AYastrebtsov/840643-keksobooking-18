'use strict';

(function () {

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var randomArrayLength = function (array) {

    var featuresSet = [];
    var randomLength = getRandomNumber(1, array.length);

    while (featuresSet.length < randomLength) {
      var elementNumber = getRandomNumber(0, array.length);
      if (!featuresSet.includes(array[elementNumber])) {
        featuresSet.push(array[elementNumber]);
      }
    }
    return featuresSet;

  };

  window.generateRandom = {
    randomArrayLength: randomArrayLength,
    getRandomNumber: getRandomNumber
  };
}());
