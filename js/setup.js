'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  var WIZARD_COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var WIZARD_EYES_COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var WIZARD_FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var similarListElement = document.querySelector('.setup-similar-list');
  var form = window.dialog.userModal.querySelector('.setup-wizard-form');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item');
  var userNameInput = document.querySelector('.setup-user-name');
  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var inputWizardCoat = document.querySelector('[name=coat-color]');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var inputWizardEyes = document.querySelector('[name=eyes-color]');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputWizardFireball = setupWizardFireball.querySelector('[name=fireball-color]');

  var renderWizard = function (arr) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arr.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = arr.eyesColor;

    return wizardElement;
  };

  var appendSimilarWizard = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    return fragment;
  };

  var wizardColorChange = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var onSuccess = function (wizards) {
    similarListElement.appendChild(appendSimilarWizard(wizards.slice(0, WIZARDS_COUNT)));
    window.dialog.userModal.querySelector('.setup-similar').classList.remove('hidden');
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

    setupWizardCoat.addEventListener('click', function () {
      var color = wizardColorChange(WIZARD_COAT_COLOR);
      setupWizardCoat.style.fill = color;
      inputWizardCoat.value = color;
    });

    setupWizardEyes.addEventListener('click', function () {
      var color = wizardColorChange(WIZARD_EYES_COLOR);
      setupWizardEyes.style.fill = color;
      inputWizardEyes.value = color;
    });

    setupWizardFireball.addEventListener('click', function () {
      var color = wizardColorChange(WIZARD_FIREBALL_COLOR);
      setupWizardFireball.style.background = color;
      inputWizardFireball.value = color;
    });
  };

  init();

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessSave, onError);
    evt.preventDefault();
  });
})();


