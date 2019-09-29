'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
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

  var randomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var renderWizard = function (arr) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arr.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = arr.eyesColor;

    return wizardElement;
  };

  window.appendSimilarWizard = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    return fragment;
  };

  window.getWizardsData = function () {
    var wizards = [];
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizards.push({
        name: NAMES[randomIndex(NAMES)] + ' ' + SURNAMES[randomIndex(SURNAMES)],
        coatColor: COAT_COLORS[randomIndex(COAT_COLORS)],
        eyesColor: EYES_COLOR[randomIndex(EYES_COLOR)]
      });
    }
    return wizards;
  };

  var wizardColorChange = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var init = function () {
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
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  init();
})();


