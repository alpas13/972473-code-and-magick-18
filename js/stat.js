'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var FONT__Y = 40;
var GAP__CLOUD = 10;
var GAP__FONT = 20;
var LEGEND__Y = 250;
var BAR__WIDTH = 40;
var BAR__HEIGHT = 150;
var BAR__Y = 80;
var GAP__BAR = 50;
var generateColor = {
  name: 'hsl', hue: 236, saturation: function () {
    return Math.floor(Math.random() * 101);
  }, lightness: 50
};

var playerColor = function () {
  return generateColor.name + '(' + generateColor.hue + ', ' + generateColor.saturation() + '%' + ', ' + generateColor.lightness + '%' + ')';
};


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxTime = function (arr) {
  var maxElement = 0;
  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }

  return Math.floor(maxElement);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP__CLOUD, CLOUD_Y + GAP__CLOUD, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP__FONT, FONT__Y);
  ctx.fillText('Список результатов:', CLOUD_X + GAP__FONT, FONT__Y + GAP__FONT);

  var maxTime = getMaxTime(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + GAP__BAR + (BAR__WIDTH + GAP__BAR) * i, LEGEND__Y);

    ctx.fillStyle = playerColor();

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(CLOUD_X + GAP__BAR + (BAR__WIDTH + GAP__BAR) * i, BAR__Y + (BAR__HEIGHT - BAR__HEIGHT * (Math.floor(times[i]) / maxTime)), BAR__WIDTH, BAR__HEIGHT * (Math.floor(times[i]) / maxTime));
  }
};
