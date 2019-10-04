'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var userModal = document.querySelector('.setup');
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
    userModal.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onWizardSetupClose = function () {
    userModal.classList.add('hidden');
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

    userModal.style.left = (userModal.offsetLeft - shift.x) + 'px';
    userModal.style.top = (userModal.offsetTop - shift.y) + 'px';
  };

  var omMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', omMouseUp);

    if (dragged) {
      var onPreventDefault = function (evtClick) {
        evtClick.preventDefault();
        userModal.removeEventListener('click', onPreventDefault);
      };
      userModal.addEventListener('click', onPreventDefault);
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

  window.dialog = {
    'userModal': userModal
  };
})();
