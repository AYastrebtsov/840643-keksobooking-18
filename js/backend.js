'use strict';

(function () {

  window.get = function (success, message) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        success(xhr.response.splice(0, 5));
        window.filter.loader(xhr.response);
      } else {
        message('error');
      }
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

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

  var form = document.querySelector('.ad-form');
  var url = 'https://js.dump.academy/keksobooking';

  form.addEventListener('submit', function (evt) {
    window.send(url, new FormData(form), window.pageCondition.getMessage);
    evt.preventDefault();
  });

})();