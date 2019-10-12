'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similarListElement = document.querySelector('.setup-similar-list');

  var renderWizard = function (arr) {
    var wizardElement = similarWizardTemplate.content.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arr.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = arr.colorEyes;

    return wizardElement;
  };

  var appendSimilarWizard = function (arr) {
    similarListElement.innerHTML = '';
    var takeNumber = arr.length > WIZARDS_COUNT ? WIZARDS_COUNT : arr.length;
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(arr[i]));
    }
  };

  window.render = {
    appendSimilarWizard: appendSimilarWizard
  };
})();
