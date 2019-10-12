'use strict';

(function () {
  var form = window.dialog.userModal.querySelector('.setup-wizard-form');
  var userNameInput = document.querySelector('.setup-user-name');
  var wizards = [];
  var coatColor = '';
  var eyesColor = '';
  var lastTimeout;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render.appendSimilarWizard(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onSuccess = function (arr) {
    wizards = arr;
    window.render.appendSimilarWizard(wizards);
    window.dialog.userModal.querySelector('.setup-similar').classList.remove('hidden');
    updateWizards();
  };

  var onSuccessSave = function () {
    window.dialog.userModal.classList.add('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var init = function () {
    window.backend.load(onSuccess, onError);
    userNameInput.addEventListener('invalid', function () {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else {
        userNameInput.setCustomValidity('');
      }
    });
  };

  init();

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessSave, onError);
    evt.preventDefault();
  });

  window.setup = {
    updateWizards: updateWizards
  };
})();


