'use strict';

(function () {
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
    arr.slice(0, 4).forEach(function (value) {
      similarListElement.appendChild(renderWizard(value));
    });
  };

  window.render = {
    appendSimilarWizard: appendSimilarWizard
  };
})();
