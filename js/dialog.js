'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var userDialog = document.querySelector('.setup');
  var userAvatar = document.querySelector('.setup-open');
  var similarListElement = document.querySelector('.setup-similar-list');
  var closeWizardSetupWindow = document.querySelector('.setup-close');
  var dialogHandle = document.querySelector('.upload');
  var startCoords = {};
  var dragged = false;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      wizardSetupCloseHandler();
    }
  };

  var wizardSetupOpenHandler = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var wizardSetupCloseHandler = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    if (dragged) {
      var clickPreventDefaultHandler = function (evtClick) {
        evtClick.preventDefault();
        userDialog.removeEventListener('click', clickPreventDefaultHandler);
      };
      userDialog.addEventListener('click', clickPreventDefaultHandler);
    }
  };

  var init = function () {
    similarListElement.appendChild(window.appendSimilarWizard(window.getWizardsData()));
    userAvatar.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ENTER) {
        wizardSetupOpenHandler();
      }
    });

    closeWizardSetupWindow.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ENTER) {
        wizardSetupCloseHandler();
      }
    });

    userAvatar.addEventListener('click', function () {
      wizardSetupOpenHandler();
    });

    closeWizardSetupWindow.addEventListener('click', function () {
      wizardSetupCloseHandler();
    });

    dialogHandle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };

  init();
})();