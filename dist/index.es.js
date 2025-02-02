import { useState } from 'react';
import html2canvas from 'html2canvas';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * @module Main_Hook
 * Hook return
 * @typedef {Array} HookReturn
 * @property {string} HookReturn[0] - image string
 * @property {string} HookReturn[1] - take screen shot string
 * @property {object} HookReturn[2] - errors
 */

/**
 * hook for creating screenshot from html node
 * @returns {HookReturn}
 */

var useScreenshot = function useScreenshot() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      type = _ref.type,
      quality = _ref.quality,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? 1 : _ref$scale;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      image = _useState2[0],
      setImage = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];
  /**
   * convert html node to image
   * @param {HTMLElement} node
   */


  var takeScreenShot = function takeScreenShot(node) {
    if (!node) {
      throw new Error('You should provide correct html node.');
    }

    return html2canvas(node, {
      scale: window.devicePixelRatio * scale
    }).then(function (canvas) {
      var croppedCanvas = document.createElement('canvas');
      var croppedCanvasContext = croppedCanvas.getContext('2d'); // init data

      var cropPositionTop = 0;
      var cropPositionLeft = 0;
      var cropWidth = canvas.width;
      var cropHeight = canvas.height;
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);
      var base64Image = croppedCanvas.toDataURL(type, quality);
      setImage(base64Image);
      return base64Image;
    })["catch"](setError);
  };

  return [image, takeScreenShot, {
    error: error
  }];
};
/**
 * creates name of file
 * @param {string} extension
 * @param  {string[]} parts of file name
 */


var createFileName = function createFileName() {
  var extension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (!extension) {
    return '';
  }

  for (var _len = arguments.length, names = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  return "".concat(names.join(''), ".").concat(extension);
};

export { createFileName, useScreenshot };
//# sourceMappingURL=index.es.js.map
