'use strict';

(function () {
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

  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var inputWizardCoat = document.querySelector('[name=coat-color]');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var inputWizardEyes = document.querySelector('[name=eyes-color]');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputWizardFireball = setupWizardFireball.querySelector('[name=fireball-color]');

  var wizard = {
    // eslint-disable-next-line no-unused-vars
    onEyesChange: function (color) {
    },
    // eslint-disable-next-line no-unused-vars
    onCoatChange: function (color) {
    }
  };

  var wizardColorChange = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var init = function () {
    setupWizardCoat.addEventListener('click', function () {
      var newCoatColor = wizardColorChange(WIZARD_COAT_COLOR);
      setupWizardCoat.style.fill = newCoatColor;
      inputWizardCoat.value = newCoatColor;
      wizard.onCoatChange(newCoatColor);
    });

    setupWizardEyes.addEventListener('click', function () {
      var newEyesColor = wizardColorChange(WIZARD_EYES_COLOR);
      setupWizardEyes.style.fill = newEyesColor;
      inputWizardEyes.value = newEyesColor;
      wizard.onEyesChange(newEyesColor);
    });

    setupWizardFireball.addEventListener('click', function () {
      var newFireballColor = wizardColorChange(WIZARD_FIREBALL_COLOR);
      setupWizardFireball.style.background = newFireballColor;
      inputWizardFireball.value = newFireballColor;
    });
  };

  init();

  window.wizard = wizard;
})();
