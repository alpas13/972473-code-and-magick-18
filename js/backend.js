'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var Url = {
    LOAD: 'https://js.dump.academy/code-and-magick/data',
    SAFE: 'https://js.dump.academy/code-and-magick'
  };

  var getXhr = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
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

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = getXhr(onSuccess, onError);

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = getXhr(onSuccess, onError);

    xhr.open('POST', Url.SAFE);
    xhr.send(data);
  };

  window.backend = {
    'load': load,
    'save': save
  };
})();
