'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();

  var getLocations = function () {

    if (xhr.status === 200) {
      var locations = xhr.response;
    } else {
      window.pageCondition.getError();
    }
    return locations;
  };


  window.backend = {
    getLocations: getLocations
  };

})();

