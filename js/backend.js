'use strict';

(function () {
  var getXhr = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = getXhr(onSuccess, onError);

    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';

    var xhr = getXhr(onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    'load': load,
    'save': save
  };
})();
