'use strict';

(function () {

  window.send = function (url, data, message) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        message('success');
        window.pageCondition.disablePage();
      } else {
        message('error');
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.tet = function (success, message) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var locations = [];

    var loadedData = function () {
      if (xhr.status === 200) {
        locations = success(xhr.response);
      } else {
        message('error');
      }
      console.log('обработчик Load выполнился');
      return locations;
    };

    var lo = xhr.addEventListener('load', loadedData);

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
    console.log('функция tet');
    return locations;

  };

  window.tet(window.place.getLocations, window.pageCondition.getMessage);


  var form = document.querySelector('.ad-form');
  var url = 'https://js.dump.academy/keksobooking';

  form.addEventListener('submit', function (evt) {
    window.send(url, new FormData(form), window.pageCondition.getMessage);
    evt.preventDefault();
  });

})();
