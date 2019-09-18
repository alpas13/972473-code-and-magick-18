'use strict';

var userDialog = document.querySelector('.setup');
var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS = new Array(4);
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

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

var appendSimilarWizard = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }

  return fragment;
};

for (var i = 0; i < WIZARDS.length; i++) {
  WIZARDS[i] = {
    name: NAMES[randomIndex(NAMES)] + ' ' + SURNAMES[randomIndex(SURNAMES)],
    coatColor: COAT_COLORS[randomIndex(COAT_COLORS)],
    eyesColor: EYES_COLOR[randomIndex(EYES_COLOR)]
  };
}

similarListElement.appendChild(appendSimilarWizard(WIZARDS));
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

