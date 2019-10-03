'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  window.userDialog = document.querySelector('.setup');
  var userAvatar = document.querySelector('.setup-open');
  var closeWizardSetupWindow = document.querySelector('.setup-close');
  var dialogHandle = document.querySelector('.upload');
  var startCoords = {};
  var dragged = false;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      onWizardSetupClose();
    }
  };

  var onWizardSetupOpen = function () {
    window.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onWizardSetupClose = function () {
    window.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onMouseMove = function (moveEvt) {
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

    window.userDialog.style.left = (window.userDialog.offsetLeft - shift.x) + 'px';
    window.userDialog.style.top = (window.userDialog.offsetTop - shift.y) + 'px';
  };

  var omMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', omMouseUp);

    if (dragged) {
      var onPreventDefault = function (evtClick) {
        evtClick.preventDefault();
        window.userDialog.removeEventListener('click', onPreventDefault);
      };
      window.userDialog.addEventListener('click', onPreventDefault);
    }
  };

  var init = function () {
    userAvatar.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ENTER) {
        onWizardSetupOpen();
      }
    });

    closeWizardSetupWindow.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCode.ENTER) {
        onWizardSetupClose();
      }
    });

    userAvatar.addEventListener('click', function () {
      onWizardSetupOpen();
    });

    closeWizardSetupWindow.addEventListener('click', function () {
      onWizardSetupClose();
    });

    dialogHandle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', omMouseUp);
    });
  };

  init();
})();
