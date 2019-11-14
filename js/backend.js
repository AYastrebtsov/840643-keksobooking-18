'use strict';

(function () {

  var get = function (success, message, load, activator) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        success(xhr.response);
        load(xhr.response);
        activator();
      } else {
        message('error');

      }
    });

    xhr.addEventListener('error', function () {
      message('error');
    });
    xhr.addEventListener('timeout', function () {
      message('error');
    });

    xhr.timeout = 1000;

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  var send = function (url, data, message) {
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

    xhr.addEventListener('error', function () {
      message('error');
    });
    xhr.addEventListener('timeout', function () {
      message('error');
    });

    xhr.timeout = 1000;

    xhr.open('POST', url);
    xhr.send(data);
  };

  var form = document.querySelector('.ad-form');
  var url = 'https://js.dump.academy/keksobooking';

  form.addEventListener('submit', function (evt) {
    send(url, new FormData(form), window.pageCondition.getMessage);
    evt.preventDefault();
  });

  window.backend = {
    get: get
  };

})();
