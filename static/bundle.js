(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Speck = require('speck-renderer');


window.onerror = function (msg, url, lineNo, columnNo, e) {
    let error = document.getElementById("error-alert");
    error.style.display = "block";
    error.innerHTML = " <strong>Ops!</strong> error at: Line #" + lineNo + ": " + msg;
}

window.onload = function () {
    let ctabTab = document.getElementById("ctab-text");
    let xyzTab = document.getElementById("xyz-text");
    let smilesTab = document.getElementById("smiles-text");

    ctabTab.innerText = ctab;
    xyzTab.innerText = xyz;
    smilesTab.innerText = smiles;

    $('#smile-button').on('click', function (event) {
        event.preventDefault();
        onSmileButton();
    });

    speck = new Speck({
        canvasContainerID: "render-container",
        canvasID: "renderer-canvas"
    });
    speck.loadStructure(xyz);

    function onSmileButton() {

        let error = document.getElementById("error-alert");
        error.style.display = "none";

        let smileField = document.getElementById("smile-field");
        if (smileField.value !== null && smileField.value !== '') {
            smileToCtab(smileField.value);
            return;
        }

        alert("Can't go if its empty!");
        return
    }
}

function smileToCtab(smile) {
    $.ajax({
        url: 'https://www.ebi.ac.uk/chembl/api/utils/smiles2ctab',
        type: 'POST',
        data: smile,
    }).done(function (data) {
        CtabToXYZ(data);
        smiles = smile;
        ctab = data;
    }).fail(function (xhr) {
        console.log("ERROR at fetching CTAB file from SMILE", xhr);
        throw xhr;
    });
}

function CtabToXYZ(ctab) {
    $.ajax({
        url: 'https://www.ebi.ac.uk/chembl/api/utils/ctab2xyz',
        type: 'POST',
        data: ctab,
    }).done(function (data) {
        console.log(data);
        xyz = data;
        speck.loadStructure(data);
        updateTabs();

    }).fail(function (xhr) {
        console.log("ERROR getting XYZ file from CTAB ", xhr);
        throw xhr;
    });
}

function updateTabs() {
    let ctabTab = document.getElementById("ctab-text");
    let xyzTab = document.getElementById("xyz-text");
    let smilesTab = document.getElementById("smiles-text");

    ctabTab.innerText = ctab;
    xyzTab.innerText = xyz;
    smilesTab.innerText = smiles;
}


var xyz =
    `24

C	3.27251073693	0.652580837101	-0.0920566983111
N	2.13505268964	-0.259269423977	-0.157526852756
C	2.1745907765	-1.60207434441	-0.340182064122
N	0.943321668184	-2.17626501368	-0.352638418671
C	0.120100095853	-1.12439220996	-0.166868420019
C	0.826179021318	0.0229082068553	-0.0481934686952
C	0.175605934326	1.23251992901	0.156464924168
O	0.832534254873	2.30601992798	0.244545266029
N	-1.19718158378	1.2238831449	0.259210455506
C	-1.90009086897	0.0387553590214	0.111738911438
O	-3.16190849742	0.0449353475265	0.181646792027
N	-1.23932920086	-1.15038111288	-0.112114269907
C	-1.9745133747	-2.41733764529	-0.223623061491
C	-1.92600271476	2.48819894965	0.456373742064
H	4.22502631393	0.0947972903249	-0.216659600226
H	3.19413524101	1.40793154262	-0.901836489861
H	3.28612802291	1.16437176065	0.89301628853
H	3.09092066506	-2.16475947477	-0.464373265853
H	-1.37109322257	-3.19380604346	-0.740246714158
H	-2.24051525952	-2.78309920102	0.790374726733
H	-2.90282339249	-2.27845211525	-0.817994479068
H	-2.84206433025	2.33084253708	1.06489564183
H	-2.21085225451	2.9108439496	-0.530019001329
H	-1.3097307207	3.23124780238	1.00606605614
`

var ctab =
    `     RDKit          2D

14 15  0  0  0  0  0  0  0  0999 V2000
   3.3789   -1.3434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   2.4408   -0.1729    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
   2.8364    1.2740    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   1.5825    2.0973    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
   0.4120    1.1592    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   0.9425   -0.2439    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  -0.0074   -1.4048    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   0.5231   -2.8079    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
  -1.4877   -1.1627    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
  -2.0182    0.2404    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  -3.4985    0.4825    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
  -1.0683    1.4013    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
  -1.5988    2.8044    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  -2.4375   -2.3236    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
 1  2  1  0
 2  3  1  0
 3  4  2  0
 4  5  1  0
 5  6  2  0
 6  7  1  0
 7  8  2  0
 7  9  1  0
 9 10  1  0
10 11  2  0
10 12  1  0
12 13  1  0
 9 14  1  0
 6  2  1  0
12  5  1  0
M  END
$$$$
`

var smiles = `CN1C=NC2=C1C(=O)N(C(=O)N2C)C`
},{"speck-renderer":3}],2:[function(require,module,exports){
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.dat = {})));
}(this, (function (exports) { 'use strict';

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (!this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRowName) {
          titleRowName.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    params.closed = false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var _titleRowName = document.createTextNode(params.name);
    dom.addClass(_titleRowName, 'controller-name');
    var titleRow = addRow(_this, _titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};

exports.color = color;
exports.controllers = controllers;
exports.dom = dom$1;
exports.gui = gui;
exports.GUI = GUI$1;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));


},{}],3:[function(require,module,exports){
'use strict';

var _main = require('./src/main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export { load, setStructure } from "./src/main0.js";

module.exports = _main2.default;
window.Speck = _main2.default;
},{"./src/main.js":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "preset": "Default",
  "remembered": {
    "Default": {
      "0": {
        "atomRadius": 60,
        "relativeAtomRadius": 100,
        "bondRadius": 50,
        "ambientOcclusion": 75,
        "brightness": 50,
        "outlineStrength": 1,
        "samplesPerFrame": 32,
        "bonds": false,
        "bondThreshold": 1.2,
        "bondShade": 50,
        "atomShade": 50,
        "depthOfFieldStrength": 0,
        "depthOfFieldPosition": 50,
        "antialiasingPasses": 1
      }
    },
    "BallAndStick": {
      "0": {
        "atomRadius": 24,
        "relativeAtomRadius": 64,
        "bondRadius": 50,
        "bonds": true,
        "bondThreshold": 1.2,
        "outlineStrength": 1
      }
    },
    "Licorice": {
      "0": {
        "atomRadius": 10,
        "relativeAtomRadius": 0,
        "bondRadius": 100,
        "bonds": true,
        "bondThreshold": 1.2,
        "outlineStrength": 1
      }
    },
    "Cartoon": {
      "0": {
        "ambientOcclusion": 0,
        "samplesPerFrame": 0,
        "brightness": 50,
        "outlineStrength": 100
      }
    }
  },
  "folders": {}
};
},{}],5:[function(require,module,exports){
"use strict";

var elements = require("./elements");

var MIN_ATOM_RADIUS = Infinity;
var MAX_ATOM_RADIUS = -Infinity;
for (var i = 0; i <= 118; i++) {
    MIN_ATOM_RADIUS = Math.min(MIN_ATOM_RADIUS, elements[i].radius);
    MAX_ATOM_RADIUS = Math.max(MAX_ATOM_RADIUS, elements[i].radius);
}

module.exports.MIN_ATOM_RADIUS = MIN_ATOM_RADIUS;
module.exports.MAX_ATOM_RADIUS = MAX_ATOM_RADIUS;
},{"./elements":7}],6:[function(require,module,exports){
"use strict";

var n = -1;
var p = 1;

module.exports = {

	position: [

	// -X
	n, n, n, n, n, p, n, p, p, n, n, n, n, p, p, n, p, n,

	// +X
	p, n, p, p, n, n, p, p, n, p, n, p, p, p, n, p, p, p,

	// -Y
	n, n, n, p, n, n, p, n, p, n, n, n, p, n, p, n, n, p,

	// +Y
	n, p, p, p, p, p, p, p, n, n, p, p, p, p, n, n, p, n,

	// -Z
	p, n, n, n, n, n, n, p, n, p, n, n, n, p, n, p, p, n,

	// +Z
	n, n, p, p, n, p, p, p, p, n, n, p, p, p, p, n, p, p],

	normal: [

	// -X
	n, 0, 0, n, 0, 0, n, 0, 0, n, 0, 0, n, 0, 0, n, 0, 0,

	// +X
	p, 0, 0, p, 0, 0, p, 0, 0, p, 0, 0, p, 0, 0, p, 0, 0,

	// -Y
	0, n, 0, 0, n, 0, 0, n, 0, 0, n, 0, 0, n, 0, 0, n, 0,

	// +Y
	0, p, 0, 0, p, 0, 0, p, 0, 0, p, 0, 0, p, 0, 0, p, 0,

	// -Z
	0, 0, n, 0, 0, n, 0, 0, n, 0, 0, n, 0, 0, n, 0, 0, n,

	// +Z
	0, 0, p, 0, 0, p, 0, 0, p, 0, 0, p, 0, 0, p, 0, 0, p]

};
},{}],7:[function(require,module,exports){
'use strict';

module.exports = {};
module.exports[0] = module.exports['Xx'] = { 'symbol': 'Xx', 'name': 'unknown', 'mass': 1.00000000, 'radius': 1.0000, 'color': [1.000, 0.078, 0.576], 'number': 0 };
module.exports[1] = module.exports['H'] = { 'symbol': 'H', 'name': 'hydrogen', 'mass': 1.00794000, 'radius': 0.3100, 'color': [1.000, 1.000, 1.000], 'number': 1 };
module.exports[2] = module.exports['He'] = { 'symbol': 'He', 'name': 'helium', 'mass': 4.00260200, 'radius': 0.2800, 'color': [0.851, 1.000, 1.000], 'number': 2 };
module.exports[3] = module.exports['Li'] = { 'symbol': 'Li', 'name': 'lithium', 'mass': 6.94100000, 'radius': 1.2800, 'color': [0.800, 0.502, 1.000], 'number': 3 };
module.exports[4] = module.exports['Be'] = { 'symbol': 'Be', 'name': 'beryllium', 'mass': 9.01218200, 'radius': 0.9600, 'color': [0.761, 1.000, 0.000], 'number': 4 };
module.exports[5] = module.exports['B'] = { 'symbol': 'B', 'name': 'boron', 'mass': 10.81100000, 'radius': 0.8400, 'color': [1.000, 0.710, 0.710], 'number': 5 };
module.exports[6] = module.exports['C'] = { 'symbol': 'C', 'name': 'carbon', 'mass': 12.01070000, 'radius': 0.7300, 'color': [0.565, 0.565, 0.565], 'number': 6 };
module.exports[7] = module.exports['N'] = { 'symbol': 'N', 'name': 'nitrogen', 'mass': 14.00670000, 'radius': 0.7100, 'color': [0.188, 0.314, 0.973], 'number': 7 };
module.exports[8] = module.exports['O'] = { 'symbol': 'O', 'name': 'oxygen', 'mass': 15.99940000, 'radius': 0.6600, 'color': [1.000, 0.051, 0.051], 'number': 8 };
module.exports[9] = module.exports['F'] = { 'symbol': 'F', 'name': 'fluorine', 'mass': 18.99840320, 'radius': 0.5700, 'color': [0.565, 0.878, 0.314], 'number': 9 };
module.exports[10] = module.exports['Ne'] = { 'symbol': 'Ne', 'name': 'neon', 'mass': 20.17970000, 'radius': 0.5800, 'color': [0.702, 0.890, 0.961], 'number': 10 };
module.exports[11] = module.exports['Na'] = { 'symbol': 'Na', 'name': 'sodium', 'mass': 22.98976928, 'radius': 1.6600, 'color': [0.671, 0.361, 0.949], 'number': 11 };
module.exports[12] = module.exports['Mg'] = { 'symbol': 'Mg', 'name': 'magnesium', 'mass': 24.30500000, 'radius': 1.4100, 'color': [0.541, 1.000, 0.000], 'number': 12 };
module.exports[13] = module.exports['Al'] = { 'symbol': 'Al', 'name': 'aluminum', 'mass': 26.98153860, 'radius': 1.2100, 'color': [0.749, 0.651, 0.651], 'number': 13 };
module.exports[14] = module.exports['Si'] = { 'symbol': 'Si', 'name': 'silicon', 'mass': 28.08550000, 'radius': 1.1100, 'color': [0.941, 0.784, 0.627], 'number': 14 };
module.exports[15] = module.exports['P'] = { 'symbol': 'P', 'name': 'phosphorus', 'mass': 30.97376200, 'radius': 1.0700, 'color': [1.000, 0.502, 0.000], 'number': 15 };
module.exports[16] = module.exports['S'] = { 'symbol': 'S', 'name': 'sulfur', 'mass': 32.06500000, 'radius': 1.0500, 'color': [1.000, 1.000, 0.188], 'number': 16 };
module.exports[17] = module.exports['Cl'] = { 'symbol': 'Cl', 'name': 'chlorine', 'mass': 35.45300000, 'radius': 1.0200, 'color': [0.122, 0.941, 0.122], 'number': 17 };
module.exports[18] = module.exports['Ar'] = { 'symbol': 'Ar', 'name': 'argon', 'mass': 39.94800000, 'radius': 1.0600, 'color': [0.502, 0.820, 0.890], 'number': 18 };
module.exports[19] = module.exports['K'] = { 'symbol': 'K', 'name': 'potassium', 'mass': 39.09830000, 'radius': 2.0300, 'color': [0.561, 0.251, 0.831], 'number': 19 };
module.exports[20] = module.exports['Ca'] = { 'symbol': 'Ca', 'name': 'calcium', 'mass': 40.07800000, 'radius': 1.7600, 'color': [0.239, 1.000, 0.000], 'number': 20 };
module.exports[21] = module.exports['Sc'] = { 'symbol': 'Sc', 'name': 'scandium', 'mass': 44.95591200, 'radius': 1.7000, 'color': [0.902, 0.902, 0.902], 'number': 21 };
module.exports[22] = module.exports['Ti'] = { 'symbol': 'Ti', 'name': 'titanium', 'mass': 47.86700000, 'radius': 1.6000, 'color': [0.749, 0.761, 0.780], 'number': 22 };
module.exports[23] = module.exports['V'] = { 'symbol': 'V', 'name': 'vanadium', 'mass': 50.94150000, 'radius': 1.5300, 'color': [0.651, 0.651, 0.671], 'number': 23 };
module.exports[24] = module.exports['Cr'] = { 'symbol': 'Cr', 'name': 'chromium', 'mass': 51.99610000, 'radius': 1.3900, 'color': [0.541, 0.600, 0.780], 'number': 24 };
module.exports[25] = module.exports['Mn'] = { 'symbol': 'Mn', 'name': 'manganese', 'mass': 54.93804500, 'radius': 1.3900, 'color': [0.611, 0.478, 0.780], 'number': 25 };
module.exports[26] = module.exports['Fe'] = { 'symbol': 'Fe', 'name': 'iron', 'mass': 55.84500000, 'radius': 1.3200, 'color': [0.878, 0.400, 0.200], 'number': 26 };
module.exports[27] = module.exports['Co'] = { 'symbol': 'Co', 'name': 'cobalt', 'mass': 58.69340000, 'radius': 1.2600, 'color': [0.941, 0.565, 0.627], 'number': 27 };
module.exports[28] = module.exports['Ni'] = { 'symbol': 'Ni', 'name': 'nickel', 'mass': 58.93319500, 'radius': 1.2400, 'color': [0.314, 0.816, 0.314], 'number': 28 };
module.exports[29] = module.exports['Cu'] = { 'symbol': 'Cu', 'name': 'copper', 'mass': 63.54600000, 'radius': 1.3200, 'color': [0.784, 0.502, 0.200], 'number': 29 };
module.exports[30] = module.exports['Zn'] = { 'symbol': 'Zn', 'name': 'zinc', 'mass': 65.38000000, 'radius': 1.2200, 'color': [0.490, 0.502, 0.690], 'number': 30 };
module.exports[31] = module.exports['Ga'] = { 'symbol': 'Ga', 'name': 'gallium', 'mass': 69.72300000, 'radius': 1.2200, 'color': [0.761, 0.561, 0.561], 'number': 31 };
module.exports[32] = module.exports['Ge'] = { 'symbol': 'Ge', 'name': 'germanium', 'mass': 72.64000000, 'radius': 1.2000, 'color': [0.400, 0.561, 0.561], 'number': 32 };
module.exports[33] = module.exports['As'] = { 'symbol': 'As', 'name': 'arsenic', 'mass': 74.92160000, 'radius': 1.1900, 'color': [0.741, 0.502, 0.890], 'number': 33 };
module.exports[34] = module.exports['Se'] = { 'symbol': 'Se', 'name': 'selenium', 'mass': 78.96000000, 'radius': 1.2000, 'color': [1.000, 0.631, 0.000], 'number': 34 };
module.exports[35] = module.exports['Br'] = { 'symbol': 'Br', 'name': 'bromine', 'mass': 79.90400000, 'radius': 1.2000, 'color': [0.651, 0.161, 0.161], 'number': 35 };
module.exports[36] = module.exports['Kr'] = { 'symbol': 'Kr', 'name': 'krypton', 'mass': 83.79800000, 'radius': 1.1600, 'color': [0.361, 0.722, 0.820], 'number': 36 };
module.exports[37] = module.exports['Rb'] = { 'symbol': 'Rb', 'name': 'rubidium', 'mass': 85.46780000, 'radius': 2.2000, 'color': [0.439, 0.180, 0.690], 'number': 37 };
module.exports[38] = module.exports['Sr'] = { 'symbol': 'Sr', 'name': 'strontium', 'mass': 87.62000000, 'radius': 1.9500, 'color': [0.000, 1.000, 0.000], 'number': 38 };
module.exports[39] = module.exports['Y'] = { 'symbol': 'Y', 'name': 'yttrium', 'mass': 88.90585000, 'radius': 1.9000, 'color': [0.580, 1.000, 1.000], 'number': 39 };
module.exports[40] = module.exports['Zr'] = { 'symbol': 'Zr', 'name': 'zirconium', 'mass': 91.22400000, 'radius': 1.7500, 'color': [0.580, 0.878, 0.878], 'number': 40 };
module.exports[41] = module.exports['Nb'] = { 'symbol': 'Nb', 'name': 'niobium', 'mass': 92.90638000, 'radius': 1.6400, 'color': [0.451, 0.761, 0.788], 'number': 41 };
module.exports[42] = module.exports['Mo'] = { 'symbol': 'Mo', 'name': 'molybdenum', 'mass': 95.96000000, 'radius': 1.5400, 'color': [0.329, 0.710, 0.710], 'number': 42 };
module.exports[43] = module.exports['Tc'] = { 'symbol': 'Tc', 'name': 'technetium', 'mass': 98.00000000, 'radius': 1.4700, 'color': [0.231, 0.620, 0.620], 'number': 43 };
module.exports[44] = module.exports['Ru'] = { 'symbol': 'Ru', 'name': 'ruthenium', 'mass': 101.07000000, 'radius': 1.4600, 'color': [0.141, 0.561, 0.561], 'number': 44 };
module.exports[45] = module.exports['Rh'] = { 'symbol': 'Rh', 'name': 'rhodium', 'mass': 102.90550000, 'radius': 1.4200, 'color': [0.039, 0.490, 0.549], 'number': 45 };
module.exports[46] = module.exports['Pd'] = { 'symbol': 'Pd', 'name': 'palladium', 'mass': 106.42000000, 'radius': 1.3900, 'color': [0.000, 0.412, 0.522], 'number': 46 };
module.exports[47] = module.exports['Ag'] = { 'symbol': 'Ag', 'name': 'silver', 'mass': 107.86820000, 'radius': 1.4500, 'color': [0.753, 0.753, 0.753], 'number': 47 };
module.exports[48] = module.exports['Cd'] = { 'symbol': 'Cd', 'name': 'cadmium', 'mass': 112.41100000, 'radius': 1.4400, 'color': [1.000, 0.851, 0.561], 'number': 48 };
module.exports[49] = module.exports['In'] = { 'symbol': 'In', 'name': 'indium', 'mass': 114.81800000, 'radius': 1.4200, 'color': [0.651, 0.459, 0.451], 'number': 49 };
module.exports[50] = module.exports['Sn'] = { 'symbol': 'Sn', 'name': 'tin', 'mass': 118.71000000, 'radius': 1.3900, 'color': [0.400, 0.502, 0.502], 'number': 50 };
module.exports[51] = module.exports['Sb'] = { 'symbol': 'Sb', 'name': 'antimony', 'mass': 121.76000000, 'radius': 1.3900, 'color': [0.620, 0.388, 0.710], 'number': 51 };
module.exports[52] = module.exports['Te'] = { 'symbol': 'Te', 'name': 'tellurium', 'mass': 127.60000000, 'radius': 1.3800, 'color': [0.831, 0.478, 0.000], 'number': 52 };
module.exports[53] = module.exports['I'] = { 'symbol': 'I', 'name': 'iodine', 'mass': 126.90470000, 'radius': 1.3900, 'color': [0.580, 0.000, 0.580], 'number': 53 };
module.exports[54] = module.exports['Xe'] = { 'symbol': 'Xe', 'name': 'xenon', 'mass': 131.29300000, 'radius': 1.4000, 'color': [0.259, 0.620, 0.690], 'number': 54 };
module.exports[55] = module.exports['Cs'] = { 'symbol': 'Cs', 'name': 'cesium', 'mass': 132.90545190, 'radius': 2.4400, 'color': [0.341, 0.090, 0.561], 'number': 55 };
module.exports[56] = module.exports['Ba'] = { 'symbol': 'Ba', 'name': 'barium', 'mass': 137.32700000, 'radius': 2.1500, 'color': [0.000, 0.788, 0.000], 'number': 56 };
module.exports[57] = module.exports['La'] = { 'symbol': 'La', 'name': 'lanthanum', 'mass': 138.90547000, 'radius': 2.0700, 'color': [0.439, 0.831, 1.000], 'number': 57 };
module.exports[58] = module.exports['Ce'] = { 'symbol': 'Ce', 'name': 'cerium', 'mass': 140.11600000, 'radius': 2.0400, 'color': [1.000, 1.000, 0.780], 'number': 58 };
module.exports[59] = module.exports['Pr'] = { 'symbol': 'Pr', 'name': 'praseodymium', 'mass': 140.90765000, 'radius': 2.0300, 'color': [0.851, 1.000, 0.780], 'number': 59 };
module.exports[60] = module.exports['Nd'] = { 'symbol': 'Nd', 'name': 'neodymium', 'mass': 144.24200000, 'radius': 2.0100, 'color': [0.780, 1.000, 0.780], 'number': 60 };
module.exports[61] = module.exports['Pm'] = { 'symbol': 'Pm', 'name': 'promethium', 'mass': 145.00000000, 'radius': 1.9900, 'color': [0.639, 1.000, 0.780], 'number': 61 };
module.exports[62] = module.exports['Sm'] = { 'symbol': 'Sm', 'name': 'samarium', 'mass': 150.36000000, 'radius': 1.9800, 'color': [0.561, 1.000, 0.780], 'number': 62 };
module.exports[63] = module.exports['Eu'] = { 'symbol': 'Eu', 'name': 'europium', 'mass': 151.96400000, 'radius': 1.9800, 'color': [0.380, 1.000, 0.780], 'number': 63 };
module.exports[64] = module.exports['Gd'] = { 'symbol': 'Gd', 'name': 'gadolinium', 'mass': 157.25000000, 'radius': 1.9600, 'color': [0.271, 1.000, 0.780], 'number': 64 };
module.exports[65] = module.exports['Tb'] = { 'symbol': 'Tb', 'name': 'terbium', 'mass': 158.92535000, 'radius': 1.9400, 'color': [0.189, 1.000, 0.780], 'number': 65 };
module.exports[66] = module.exports['Dy'] = { 'symbol': 'Dy', 'name': 'dysprosium', 'mass': 162.50000000, 'radius': 1.9200, 'color': [0.122, 1.000, 0.780], 'number': 66 };
module.exports[67] = module.exports['Ho'] = { 'symbol': 'Ho', 'name': 'holmium', 'mass': 164.93032000, 'radius': 1.9200, 'color': [0.000, 1.000, 0.612], 'number': 67 };
module.exports[68] = module.exports['Er'] = { 'symbol': 'Er', 'name': 'erbium', 'mass': 167.25900000, 'radius': 1.8900, 'color': [0.000, 0.902, 0.459], 'number': 68 };
module.exports[69] = module.exports['Tm'] = { 'symbol': 'Tm', 'name': 'thulium', 'mass': 168.93421000, 'radius': 1.9000, 'color': [0.000, 0.831, 0.322], 'number': 69 };
module.exports[70] = module.exports['Yb'] = { 'symbol': 'Yb', 'name': 'ytterbium', 'mass': 173.05400000, 'radius': 1.8700, 'color': [0.000, 0.749, 0.220], 'number': 70 };
module.exports[71] = module.exports['Lu'] = { 'symbol': 'Lu', 'name': 'lutetium', 'mass': 174.96680000, 'radius': 1.8700, 'color': [0.000, 0.671, 0.141], 'number': 71 };
module.exports[72] = module.exports['Hf'] = { 'symbol': 'Hf', 'name': 'hafnium', 'mass': 178.49000000, 'radius': 1.7500, 'color': [0.302, 0.761, 1.000], 'number': 72 };
module.exports[73] = module.exports['Ta'] = { 'symbol': 'Ta', 'name': 'tantalum', 'mass': 180.94788000, 'radius': 1.7000, 'color': [0.302, 0.651, 1.000], 'number': 73 };
module.exports[74] = module.exports['W'] = { 'symbol': 'W', 'name': 'tungsten', 'mass': 183.84000000, 'radius': 1.6200, 'color': [0.129, 0.580, 0.839], 'number': 74 };
module.exports[75] = module.exports['Re'] = { 'symbol': 'Re', 'name': 'rhenium', 'mass': 186.20700000, 'radius': 1.5100, 'color': [0.149, 0.490, 0.671], 'number': 75 };
module.exports[76] = module.exports['Os'] = { 'symbol': 'Os', 'name': 'osmium', 'mass': 190.23000000, 'radius': 1.4400, 'color': [0.149, 0.400, 0.588], 'number': 76 };
module.exports[77] = module.exports['Ir'] = { 'symbol': 'Ir', 'name': 'iridium', 'mass': 192.21700000, 'radius': 1.4100, 'color': [0.090, 0.329, 0.529], 'number': 77 };
module.exports[78] = module.exports['Pt'] = { 'symbol': 'Pt', 'name': 'platinum', 'mass': 195.08400000, 'radius': 1.3600, 'color': [0.816, 0.816, 0.878], 'number': 78 };
module.exports[79] = module.exports['Au'] = { 'symbol': 'Au', 'name': 'gold', 'mass': 196.96656900, 'radius': 1.3600, 'color': [1.000, 0.820, 0.137], 'number': 79 };
module.exports[80] = module.exports['Hg'] = { 'symbol': 'Hg', 'name': 'mercury', 'mass': 200.59000000, 'radius': 1.3200, 'color': [0.722, 0.722, 0.816], 'number': 80 };
module.exports[81] = module.exports['Tl'] = { 'symbol': 'Tl', 'name': 'thallium', 'mass': 204.38330000, 'radius': 1.4500, 'color': [0.651, 0.329, 0.302], 'number': 81 };
module.exports[82] = module.exports['Pb'] = { 'symbol': 'Pb', 'name': 'lead', 'mass': 207.20000000, 'radius': 1.4600, 'color': [0.341, 0.349, 0.380], 'number': 82 };
module.exports[83] = module.exports['Bi'] = { 'symbol': 'Bi', 'name': 'bismuth', 'mass': 208.98040000, 'radius': 1.4800, 'color': [0.620, 0.310, 0.710], 'number': 83 };
module.exports[84] = module.exports['Po'] = { 'symbol': 'Po', 'name': 'polonium', 'mass': 210.00000000, 'radius': 1.4000, 'color': [0.671, 0.361, 0.000], 'number': 84 };
module.exports[85] = module.exports['At'] = { 'symbol': 'At', 'name': 'astatine', 'mass': 210.00000000, 'radius': 1.5000, 'color': [0.459, 0.310, 0.271], 'number': 85 };
module.exports[86] = module.exports['Rn'] = { 'symbol': 'Rn', 'name': 'radon', 'mass': 220.00000000, 'radius': 1.5000, 'color': [0.259, 0.510, 0.588], 'number': 86 };
module.exports[87] = module.exports['Fr'] = { 'symbol': 'Fr', 'name': 'francium', 'mass': 223.00000000, 'radius': 2.6000, 'color': [0.259, 0.000, 0.400], 'number': 87 };
module.exports[88] = module.exports['Ra'] = { 'symbol': 'Ra', 'name': 'radium', 'mass': 226.00000000, 'radius': 2.2100, 'color': [0.000, 0.490, 0.000], 'number': 88 };
module.exports[89] = module.exports['Ac'] = { 'symbol': 'Ac', 'name': 'actinium', 'mass': 227.00000000, 'radius': 2.1500, 'color': [0.439, 0.671, 0.980], 'number': 89 };
module.exports[90] = module.exports['Th'] = { 'symbol': 'Th', 'name': 'thorium', 'mass': 231.03588000, 'radius': 2.0600, 'color': [0.000, 0.729, 1.000], 'number': 90 };
module.exports[91] = module.exports['Pa'] = { 'symbol': 'Pa', 'name': 'protactinium', 'mass': 232.03806000, 'radius': 2.0000, 'color': [0.000, 0.631, 1.000], 'number': 91 };
module.exports[92] = module.exports['U'] = { 'symbol': 'U', 'name': 'uranium', 'mass': 237.00000000, 'radius': 1.9600, 'color': [0.000, 0.561, 1.000], 'number': 92 };
module.exports[93] = module.exports['Np'] = { 'symbol': 'Np', 'name': 'neptunium', 'mass': 238.02891000, 'radius': 1.9000, 'color': [0.000, 0.502, 1.000], 'number': 93 };
module.exports[94] = module.exports['Pu'] = { 'symbol': 'Pu', 'name': 'plutonium', 'mass': 243.00000000, 'radius': 1.8700, 'color': [0.000, 0.420, 1.000], 'number': 94 };
module.exports[95] = module.exports['Am'] = { 'symbol': 'Am', 'name': 'americium', 'mass': 244.00000000, 'radius': 1.8000, 'color': [0.329, 0.361, 0.949], 'number': 95 };
module.exports[96] = module.exports['Cm'] = { 'symbol': 'Cm', 'name': 'curium', 'mass': 247.00000000, 'radius': 1.6900, 'color': [0.471, 0.361, 0.890], 'number': 96 };
module.exports[97] = module.exports['Bk'] = { 'symbol': 'Bk', 'name': 'berkelium', 'mass': 247.00000000, 'radius': 1.6600, 'color': [0.541, 0.310, 0.890], 'number': 97 };
module.exports[98] = module.exports['Cf'] = { 'symbol': 'Cf', 'name': 'californium', 'mass': 251.00000000, 'radius': 1.6800, 'color': [0.631, 0.212, 0.831], 'number': 98 };
module.exports[99] = module.exports['Es'] = { 'symbol': 'Es', 'name': 'einsteinium', 'mass': 252.00000000, 'radius': 1.6500, 'color': [0.702, 0.122, 0.831], 'number': 99 };
module.exports[100] = module.exports['Fm'] = { 'symbol': 'Fm', 'name': 'fermium', 'mass': 257.00000000, 'radius': 1.6700, 'color': [0.702, 0.122, 0.729], 'number': 100 };
module.exports[101] = module.exports['Md'] = { 'symbol': 'Md', 'name': 'mendelevium', 'mass': 258.00000000, 'radius': 1.7300, 'color': [0.702, 0.051, 0.651], 'number': 101 };
module.exports[102] = module.exports['No'] = { 'symbol': 'No', 'name': 'nobelium', 'mass': 259.00000000, 'radius': 1.7600, 'color': [0.741, 0.051, 0.529], 'number': 102 };
module.exports[103] = module.exports['Lr'] = { 'symbol': 'Lr', 'name': 'lawrencium', 'mass': 262.00000000, 'radius': 1.6100, 'color': [0.780, 0.000, 0.400], 'number': 103 };
module.exports[104] = module.exports['Rf'] = { 'symbol': 'Rf', 'name': 'rutherfordium', 'mass': 261.00000000, 'radius': 1.5700, 'color': [0.800, 0.000, 0.349], 'number': 104 };
module.exports[105] = module.exports['Db'] = { 'symbol': 'Db', 'name': 'dubnium', 'mass': 262.00000000, 'radius': 1.4900, 'color': [0.820, 0.000, 0.310], 'number': 105 };
module.exports[106] = module.exports['Sg'] = { 'symbol': 'Sg', 'name': 'seaborgium', 'mass': 266.00000000, 'radius': 1.4300, 'color': [0.851, 0.000, 0.271], 'number': 106 };
module.exports[107] = module.exports['Bh'] = { 'symbol': 'Bh', 'name': 'bohrium', 'mass': 264.00000000, 'radius': 1.4100, 'color': [0.878, 0.000, 0.220], 'number': 107 };
module.exports[108] = module.exports['Hs'] = { 'symbol': 'Hs', 'name': 'hassium', 'mass': 277.00000000, 'radius': 1.3400, 'color': [0.902, 0.000, 0.180], 'number': 108 };
module.exports[109] = module.exports['Mt'] = { 'symbol': 'Mt', 'name': 'meitnerium', 'mass': 268.00000000, 'radius': 1.2900, 'color': [0.922, 0.000, 0.149], 'number': 109 };
module.exports[110] = module.exports['Ds'] = { 'symbol': 'Ds', 'name': 'Ds', 'mass': 271.00000000, 'radius': 1.2800, 'color': [0.922, 0.000, 0.149], 'number': 110 };
module.exports[111] = module.exports['Uuu'] = { 'symbol': 'Uuu', 'name': 'Uuu', 'mass': 272.00000000, 'radius': 1.2100, 'color': [0.922, 0.000, 0.149], 'number': 111 };
module.exports[112] = module.exports['Uub'] = { 'symbol': 'Uub', 'name': 'Uub', 'mass': 285.00000000, 'radius': 1.2200, 'color': [0.922, 0.000, 0.149], 'number': 112 };
module.exports[113] = module.exports['Uut'] = { 'symbol': 'Uut', 'name': 'Uut', 'mass': 284.00000000, 'radius': 1.3600, 'color': [0.922, 0.000, 0.149], 'number': 113 };
module.exports[114] = module.exports['Uuq'] = { 'symbol': 'Uuq', 'name': 'Uuq', 'mass': 289.00000000, 'radius': 1.4300, 'color': [0.922, 0.000, 0.149], 'number': 114 };
module.exports[115] = module.exports['Uup'] = { 'symbol': 'Uup', 'name': 'Uup', 'mass': 288.00000000, 'radius': 1.6200, 'color': [0.922, 0.000, 0.149], 'number': 115 };
module.exports[116] = module.exports['Uuh'] = { 'symbol': 'Uuh', 'name': 'Uuh', 'mass': 292.00000000, 'radius': 1.7500, 'color': [0.922, 0.000, 0.149], 'number': 116 };
module.exports[117] = module.exports['Uus'] = { 'symbol': 'Uus', 'name': 'Uus', 'mass': 294.00000000, 'radius': 1.6500, 'color': [0.922, 0.000, 0.149], 'number': 117 };
module.exports[118] = module.exports['Uuo'] = { 'symbol': 'Uuo', 'name': 'Uuo', 'mass': 296.00000000, 'radius': 1.5700, 'color': [0.922, 0.000, 0.149], 'number': 118 };
},{}],8:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.2
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

(function (_global) {
    "use strict";

    var shim = {};
    if (typeof exports === 'undefined') {
        if (typeof define == 'function' && _typeof(define.amd) == 'object' && define.amd) {
            shim.exports = {};
            define(function () {
                return shim.exports;
            });
        } else {
            // gl-matrix lives in a browser, define its namespaces in global
            shim.exports = typeof window !== 'undefined' ? window : _global;
        }
    } else {
        // gl-matrix lives in commonjs, define its namespaces in exports
        shim.exports = exports;
    }

    (function (exports) {
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        * Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation 
        and/or other materials provided with the distribution.
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 0.000001;
        }

        if (!GLMAT_ARRAY_TYPE) {
            var GLMAT_ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
        }

        if (!GLMAT_RANDOM) {
            var GLMAT_RANDOM = Math.random;
        }

        /**
         * @class Common utilities
         * @name glMatrix
         */
        var glMatrix = {};

        /**
         * Sets the type of array used when creating new vectors and matrices
         *
         * @param {Type} type Array type, such as Float32Array or Array
         */
        glMatrix.setMatrixArrayType = function (type) {
            GLMAT_ARRAY_TYPE = type;
        };

        if (typeof exports !== 'undefined') {
            exports.glMatrix = glMatrix;
        }

        var degree = Math.PI / 180;

        /**
        * Convert Degree To Radian
        *
        * @param {Number} Angle in Degrees
        */
        glMatrix.toRadian = function (a) {
            return a * degree;
        };
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2 Dimensional Vector
         * @name vec2
         */

        var vec2 = {};

        /**
         * Creates a new, empty vec2
         *
         * @returns {vec2} a new 2D vector
         */
        vec2.create = function () {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = 0;
            out[1] = 0;
            return out;
        };

        /**
         * Creates a new vec2 initialized with values from an existing vector
         *
         * @param {vec2} a vector to clone
         * @returns {vec2} a new 2D vector
         */
        vec2.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };

        /**
         * Creates a new vec2 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2} a new 2D vector
         */
        vec2.fromValues = function (x, y) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = x;
            out[1] = y;
            return out;
        };

        /**
         * Copy the values from one vec2 to another
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the source vector
         * @returns {vec2} out
         */
        vec2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };

        /**
         * Set the components of a vec2 to the given values
         *
         * @param {vec2} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2} out
         */
        vec2.set = function (out, x, y) {
            out[0] = x;
            out[1] = y;
            return out;
        };

        /**
         * Adds two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.subtract}
         * @function
         */
        vec2.sub = vec2.subtract;

        /**
         * Multiplies two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.multiply}
         * @function
         */
        vec2.mul = vec2.multiply;

        /**
         * Divides two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.divide}
         * @function
         */
        vec2.div = vec2.divide;

        /**
         * Returns the minimum of two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        };

        /**
         * Returns the maximum of two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        };

        /**
         * Scales a vec2 by a scalar number
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec2} out
         */
        vec2.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        };

        /**
         * Adds two vec2's after scaling the second operand by a scalar value
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec2} out
         */
        vec2.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} distance between a and b
         */
        vec2.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        };

        /**
         * Alias for {@link vec2.distance}
         * @function
         */
        vec2.dist = vec2.distance;

        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec2.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return x * x + y * y;
        };

        /**
         * Alias for {@link vec2.squaredDistance}
         * @function
         */
        vec2.sqrDist = vec2.squaredDistance;

        /**
         * Calculates the length of a vec2
         *
         * @param {vec2} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec2.length = function (a) {
            var x = a[0],
                y = a[1];
            return Math.sqrt(x * x + y * y);
        };

        /**
         * Alias for {@link vec2.length}
         * @function
         */
        vec2.len = vec2.length;

        /**
         * Calculates the squared length of a vec2
         *
         * @param {vec2} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec2.squaredLength = function (a) {
            var x = a[0],
                y = a[1];
            return x * x + y * y;
        };

        /**
         * Alias for {@link vec2.squaredLength}
         * @function
         */
        vec2.sqrLen = vec2.squaredLength;

        /**
         * Negates the components of a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to negate
         * @returns {vec2} out
         */
        vec2.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        };

        /**
         * Returns the inverse of the components of a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to invert
         * @returns {vec2} out
         */
        vec2.inverse = function (out, a) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            return out;
        };

        /**
         * Normalize a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to normalize
         * @returns {vec2} out
         */
        vec2.normalize = function (out, a) {
            var x = a[0],
                y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec2.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1];
        };

        /**
         * Computes the cross product of two vec2's
         * Note that the cross product must by definition produce a 3D vector
         *
         * @param {vec3} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec3} out
         */
        vec2.cross = function (out, a, b) {
            var z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        };

        /**
         * Performs a linear interpolation between two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec2} out
         */
        vec2.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec2} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec2} out
         */
        vec2.random = function (out, scale) {
            scale = scale || 1.0;
            var r = GLMAT_RANDOM() * 2.0 * Math.PI;
            out[0] = Math.cos(r) * scale;
            out[1] = Math.sin(r) * scale;
            return out;
        };

        /**
         * Transforms the vec2 with a mat2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat2 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y;
            out[1] = m[1] * x + m[3] * y;
            return out;
        };

        /**
         * Transforms the vec2 with a mat2d
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2d} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat2d = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out;
        };

        /**
         * Transforms the vec2 with a mat3
         * 3rd vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat3} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat3 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[3] * y + m[6];
            out[1] = m[1] * x + m[4] * y + m[7];
            return out;
        };

        /**
         * Transforms the vec2 with a mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat4 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out;
        };

        /**
         * Perform some operation over an array of vec2s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec2.forEach = function () {
            var vec = vec2.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 2;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];vec[1] = a[i + 1];
                    fn(vec, vec, arg);
                    a[i] = vec[0];a[i + 1] = vec[1];
                }

                return a;
            };
        }();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec2} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec2.str = function (a) {
            return 'vec2(' + a[0] + ', ' + a[1] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.vec2 = vec2;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 3 Dimensional Vector
         * @name vec3
         */

        var vec3 = {};

        /**
         * Creates a new, empty vec3
         *
         * @returns {vec3} a new 3D vector
         */
        vec3.create = function () {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            return out;
        };

        /**
         * Creates a new vec3 initialized with values from an existing vector
         *
         * @param {vec3} a vector to clone
         * @returns {vec3} a new 3D vector
         */
        vec3.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };

        /**
         * Creates a new vec3 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @returns {vec3} a new 3D vector
         */
        vec3.fromValues = function (x, y, z) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };

        /**
         * Copy the values from one vec3 to another
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the source vector
         * @returns {vec3} out
         */
        vec3.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };

        /**
         * Set the components of a vec3 to the given values
         *
         * @param {vec3} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @returns {vec3} out
         */
        vec3.set = function (out, x, y, z) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };

        /**
         * Adds two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.subtract}
         * @function
         */
        vec3.sub = vec3.subtract;

        /**
         * Multiplies two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.multiply}
         * @function
         */
        vec3.mul = vec3.multiply;

        /**
         * Divides two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.divide}
         * @function
         */
        vec3.div = vec3.divide;

        /**
         * Returns the minimum of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out;
        };

        /**
         * Returns the maximum of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out;
        };

        /**
         * Scales a vec3 by a scalar number
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec3} out
         */
        vec3.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out;
        };

        /**
         * Adds two vec3's after scaling the second operand by a scalar value
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec3} out
         */
        vec3.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} distance between a and b
         */
        vec3.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };

        /**
         * Alias for {@link vec3.distance}
         * @function
         */
        vec3.dist = vec3.distance;

        /**
         * Calculates the squared euclidian distance between two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec3.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2];
            return x * x + y * y + z * z;
        };

        /**
         * Alias for {@link vec3.squaredDistance}
         * @function
         */
        vec3.sqrDist = vec3.squaredDistance;

        /**
         * Calculates the length of a vec3
         *
         * @param {vec3} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec3.length = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };

        /**
         * Alias for {@link vec3.length}
         * @function
         */
        vec3.len = vec3.length;

        /**
         * Calculates the squared length of a vec3
         *
         * @param {vec3} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec3.squaredLength = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            return x * x + y * y + z * z;
        };

        /**
         * Alias for {@link vec3.squaredLength}
         * @function
         */
        vec3.sqrLen = vec3.squaredLength;

        /**
         * Negates the components of a vec3
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a vector to negate
         * @returns {vec3} out
         */
        vec3.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        };

        /**
         * Returns the inverse of the components of a vec3
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a vector to invert
         * @returns {vec3} out
         */
        vec3.inverse = function (out, a) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            out[2] = 1.0 / a[2];
            return out;
        };

        /**
         * Normalize a vec3
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a vector to normalize
         * @returns {vec3} out
         */
        vec3.normalize = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            var len = x * x + y * y + z * z;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec3.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        };

        /**
         * Computes the cross product of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.cross = function (out, a, b) {
            var ax = a[0],
                ay = a[1],
                az = a[2],
                bx = b[0],
                by = b[1],
                bz = b[2];

            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out;
        };

        /**
         * Performs a linear interpolation between two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec3} out
         */
        vec3.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1],
                az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec3} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec3} out
         */
        vec3.random = function (out, scale) {
            scale = scale || 1.0;

            var r = GLMAT_RANDOM() * 2.0 * Math.PI;
            var z = GLMAT_RANDOM() * 2.0 - 1.0;
            var zScale = Math.sqrt(1.0 - z * z) * scale;

            out[0] = Math.cos(r) * zScale;
            out[1] = Math.sin(r) * zScale;
            out[2] = z * scale;
            return out;
        };

        /**
         * Transforms the vec3 with a mat4.
         * 4th vector component is implicitly '1'
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec3} out
         */
        vec3.transformMat4 = function (out, a, m) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = m[3] * x + m[7] * y + m[11] * z + m[15];
            w = w || 1.0;
            out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
            out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
            out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
            return out;
        };

        /**
         * Transforms the vec3 with a mat3.
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {mat4} m the 3x3 matrix to transform with
         * @returns {vec3} out
         */
        vec3.transformMat3 = function (out, a, m) {
            var x = a[0],
                y = a[1],
                z = a[2];
            out[0] = x * m[0] + y * m[3] + z * m[6];
            out[1] = x * m[1] + y * m[4] + z * m[7];
            out[2] = x * m[2] + y * m[5] + z * m[8];
            return out;
        };

        /**
         * Transforms the vec3 with a quat
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {quat} q quaternion to transform with
         * @returns {vec3} out
         */
        vec3.transformQuat = function (out, a, q) {
            // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

            var x = a[0],
                y = a[1],
                z = a[2],
                qx = q[0],
                qy = q[1],
                qz = q[2],
                qw = q[3],


            // calculate quat * vec
            ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };

        /**
         * Rotate a 3D vector around the x-axis
         * @param {vec3} out The receiving vec3
         * @param {vec3} a The vec3 point to rotate
         * @param {vec3} b The origin of the rotation
         * @param {Number} c The angle of rotation
         * @returns {vec3} out
         */
        vec3.rotateX = function (out, a, b, c) {
            var p = [],
                r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];

            //perform rotation
            r[0] = p[0];
            r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
            r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];

            return out;
        };

        /**
         * Rotate a 3D vector around the y-axis
         * @param {vec3} out The receiving vec3
         * @param {vec3} a The vec3 point to rotate
         * @param {vec3} b The origin of the rotation
         * @param {Number} c The angle of rotation
         * @returns {vec3} out
         */
        vec3.rotateY = function (out, a, b, c) {
            var p = [],
                r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];

            //perform rotation
            r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
            r[1] = p[1];
            r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];

            return out;
        };

        /**
         * Rotate a 3D vector around the z-axis
         * @param {vec3} out The receiving vec3
         * @param {vec3} a The vec3 point to rotate
         * @param {vec3} b The origin of the rotation
         * @param {Number} c The angle of rotation
         * @returns {vec3} out
         */
        vec3.rotateZ = function (out, a, b, c) {
            var p = [],
                r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];

            //perform rotation
            r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
            r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
            r[2] = p[2];

            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];

            return out;
        };

        /**
         * Perform some operation over an array of vec3s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec3.forEach = function () {
            var vec = vec3.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 3;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
                    fn(vec, vec, arg);
                    a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
                }

                return a;
            };
        }();

        /**
         * Get the angle between two 3D vectors
         * @param {vec3} a The first operand
         * @param {vec3} b The second operand
         * @returns {Number} The angle in radians
         */
        vec3.angle = function (a, b) {

            var tempA = vec3.fromValues(a[0], a[1], a[2]);
            var tempB = vec3.fromValues(b[0], b[1], b[2]);

            vec3.normalize(tempA, tempA);
            vec3.normalize(tempB, tempB);

            var cosine = vec3.dot(tempA, tempB);

            if (cosine > 1.0) {
                return 0;
            } else {
                return Math.acos(cosine);
            }
        };

        /**
         * Returns a string representation of a vector
         *
         * @param {vec3} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec3.str = function (a) {
            return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.vec3 = vec3;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 4 Dimensional Vector
         * @name vec4
         */

        var vec4 = {};

        /**
         * Creates a new, empty vec4
         *
         * @returns {vec4} a new 4D vector
         */
        vec4.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            return out;
        };

        /**
         * Creates a new vec4 initialized with values from an existing vector
         *
         * @param {vec4} a vector to clone
         * @returns {vec4} a new 4D vector
         */
        vec4.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Creates a new vec4 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {vec4} a new 4D vector
         */
        vec4.fromValues = function (x, y, z, w) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };

        /**
         * Copy the values from one vec4 to another
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the source vector
         * @returns {vec4} out
         */
        vec4.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Set the components of a vec4 to the given values
         *
         * @param {vec4} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {vec4} out
         */
        vec4.set = function (out, x, y, z, w) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };

        /**
         * Adds two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.subtract}
         * @function
         */
        vec4.sub = vec4.subtract;

        /**
         * Multiplies two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            out[3] = a[3] * b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.multiply}
         * @function
         */
        vec4.mul = vec4.multiply;

        /**
         * Divides two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            out[3] = a[3] / b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.divide}
         * @function
         */
        vec4.div = vec4.divide;

        /**
         * Returns the minimum of two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            out[3] = Math.min(a[3], b[3]);
            return out;
        };

        /**
         * Returns the maximum of two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            out[3] = Math.max(a[3], b[3]);
            return out;
        };

        /**
         * Scales a vec4 by a scalar number
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec4} out
         */
        vec4.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        };

        /**
         * Adds two vec4's after scaling the second operand by a scalar value
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec4} out
         */
        vec4.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} distance between a and b
         */
        vec4.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2],
                w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };

        /**
         * Alias for {@link vec4.distance}
         * @function
         */
        vec4.dist = vec4.distance;

        /**
         * Calculates the squared euclidian distance between two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec4.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2],
                w = b[3] - a[3];
            return x * x + y * y + z * z + w * w;
        };

        /**
         * Alias for {@link vec4.squaredDistance}
         * @function
         */
        vec4.sqrDist = vec4.squaredDistance;

        /**
         * Calculates the length of a vec4
         *
         * @param {vec4} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec4.length = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };

        /**
         * Alias for {@link vec4.length}
         * @function
         */
        vec4.len = vec4.length;

        /**
         * Calculates the squared length of a vec4
         *
         * @param {vec4} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec4.squaredLength = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            return x * x + y * y + z * z + w * w;
        };

        /**
         * Alias for {@link vec4.squaredLength}
         * @function
         */
        vec4.sqrLen = vec4.squaredLength;

        /**
         * Negates the components of a vec4
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a vector to negate
         * @returns {vec4} out
         */
        vec4.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = -a[3];
            return out;
        };

        /**
         * Returns the inverse of the components of a vec4
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a vector to invert
         * @returns {vec4} out
         */
        vec4.inverse = function (out, a) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            out[2] = 1.0 / a[2];
            out[3] = 1.0 / a[3];
            return out;
        };

        /**
         * Normalize a vec4
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a vector to normalize
         * @returns {vec4} out
         */
        vec4.normalize = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            var len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
                out[3] = a[3] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec4.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        };

        /**
         * Performs a linear interpolation between two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec4} out
         */
        vec4.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec4} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec4} out
         */
        vec4.random = function (out, scale) {
            scale = scale || 1.0;

            //TODO: This is a pretty awful way of doing this. Find something better.
            out[0] = GLMAT_RANDOM();
            out[1] = GLMAT_RANDOM();
            out[2] = GLMAT_RANDOM();
            out[3] = GLMAT_RANDOM();
            vec4.normalize(out, out);
            vec4.scale(out, out, scale);
            return out;
        };

        /**
         * Transforms the vec4 with a mat4.
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec4} out
         */
        vec4.transformMat4 = function (out, a, m) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
            return out;
        };

        /**
         * Transforms the vec4 with a quat
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to transform
         * @param {quat} q quaternion to transform with
         * @returns {vec4} out
         */
        vec4.transformQuat = function (out, a, q) {
            var x = a[0],
                y = a[1],
                z = a[2],
                qx = q[0],
                qy = q[1],
                qz = q[2],
                qw = q[3],


            // calculate quat * vec
            ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };

        /**
         * Perform some operation over an array of vec4s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec4.forEach = function () {
            var vec = vec4.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 4;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min(count * stride + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
                    fn(vec, vec, arg);
                    a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
                }

                return a;
            };
        }();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec4} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec4.str = function (a) {
            return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.vec4 = vec4;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2x2 Matrix
         * @name mat2
         */

        var mat2 = {};

        /**
         * Creates a new identity mat2
         *
         * @returns {mat2} a new 2x2 matrix
         */
        mat2.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Creates a new mat2 initialized with values from an existing matrix
         *
         * @param {mat2} a matrix to clone
         * @returns {mat2} a new 2x2 matrix
         */
        mat2.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Copy the values from one mat2 to another
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Set a mat2 to the identity matrix
         *
         * @param {mat2} out the receiving matrix
         * @returns {mat2} out
         */
        mat2.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2];
                out[2] = a1;
            } else {
                out[0] = a[0];
                out[1] = a[2];
                out[2] = a[1];
                out[3] = a[3];
            }

            return out;
        };

        /**
         * Inverts a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.invert = function (out, a) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],


            // Calculate the determinant
            det = a0 * a3 - a2 * a1;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = a3 * det;
            out[1] = -a1 * det;
            out[2] = -a2 * det;
            out[3] = a0 * det;

            return out;
        };

        /**
         * Calculates the adjugate of a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.adjoint = function (out, a) {
            // Caching this value is nessecary if out == a
            var a0 = a[0];
            out[0] = a[3];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a0;

            return out;
        };

        /**
         * Calculates the determinant of a mat2
         *
         * @param {mat2} a the source matrix
         * @returns {Number} determinant of a
         */
        mat2.determinant = function (a) {
            return a[0] * a[3] - a[2] * a[1];
        };

        /**
         * Multiplies two mat2's
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the first operand
         * @param {mat2} b the second operand
         * @returns {mat2} out
         */
        mat2.multiply = function (out, a, b) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3];
            var b0 = b[0],
                b1 = b[1],
                b2 = b[2],
                b3 = b[3];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            return out;
        };

        /**
         * Alias for {@link mat2.multiply}
         * @function
         */
        mat2.mul = mat2.multiply;

        /**
         * Rotates a mat2 by the given angle
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat2} out
         */
        mat2.rotate = function (out, a, rad) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                s = Math.sin(rad),
                c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            return out;
        };

        /**
         * Scales the mat2 by the dimensions in the given vec2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat2} out
         **/
        mat2.scale = function (out, a, v) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                v0 = v[0],
                v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            return out;
        };

        /**
         * Returns a string representation of a mat2
         *
         * @param {mat2} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat2.str = function (a) {
            return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        /**
         * Returns Frobenius norm of a mat2
         *
         * @param {mat2} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat2.frob = function (a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2));
        };

        /**
         * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
         * @param {mat2} L the lower triangular matrix 
         * @param {mat2} D the diagonal matrix 
         * @param {mat2} U the upper triangular matrix 
         * @param {mat2} a the input matrix to factorize
         */

        mat2.LDU = function (L, D, U, a) {
            L[2] = a[2] / a[0];
            U[0] = a[0];
            U[1] = a[1];
            U[3] = a[3] - L[2] * U[1];
            return [L, D, U];
        };

        if (typeof exports !== 'undefined') {
            exports.mat2 = mat2;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2x3 Matrix
         * @name mat2d
         * 
         * @description 
         * A mat2d contains six elements defined as:
         * <pre>
         * [a, c, tx,
         *  b, d, ty]
         * </pre>
         * This is a short form for the 3x3 matrix:
         * <pre>
         * [a, c, tx,
         *  b, d, ty,
         *  0, 0, 1]
         * </pre>
         * The last row is ignored so the array is shorter and operations are faster.
         */

        var mat2d = {};

        /**
         * Creates a new identity mat2d
         *
         * @returns {mat2d} a new 2x3 matrix
         */
        mat2d.create = function () {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        };

        /**
         * Creates a new mat2d initialized with values from an existing matrix
         *
         * @param {mat2d} a matrix to clone
         * @returns {mat2d} a new 2x3 matrix
         */
        mat2d.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };

        /**
         * Copy the values from one mat2d to another
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the source matrix
         * @returns {mat2d} out
         */
        mat2d.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };

        /**
         * Set a mat2d to the identity matrix
         *
         * @param {mat2d} out the receiving matrix
         * @returns {mat2d} out
         */
        mat2d.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        };

        /**
         * Inverts a mat2d
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the source matrix
         * @returns {mat2d} out
         */
        mat2d.invert = function (out, a) {
            var aa = a[0],
                ab = a[1],
                ac = a[2],
                ad = a[3],
                atx = a[4],
                aty = a[5];

            var det = aa * ad - ab * ac;
            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = ad * det;
            out[1] = -ab * det;
            out[2] = -ac * det;
            out[3] = aa * det;
            out[4] = (ac * aty - ad * atx) * det;
            out[5] = (ab * atx - aa * aty) * det;
            return out;
        };

        /**
         * Calculates the determinant of a mat2d
         *
         * @param {mat2d} a the source matrix
         * @returns {Number} determinant of a
         */
        mat2d.determinant = function (a) {
            return a[0] * a[3] - a[1] * a[2];
        };

        /**
         * Multiplies two mat2d's
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the first operand
         * @param {mat2d} b the second operand
         * @returns {mat2d} out
         */
        mat2d.multiply = function (out, a, b) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                a4 = a[4],
                a5 = a[5],
                b0 = b[0],
                b1 = b[1],
                b2 = b[2],
                b3 = b[3],
                b4 = b[4],
                b5 = b[5];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            out[4] = a0 * b4 + a2 * b5 + a4;
            out[5] = a1 * b4 + a3 * b5 + a5;
            return out;
        };

        /**
         * Alias for {@link mat2d.multiply}
         * @function
         */
        mat2d.mul = mat2d.multiply;

        /**
         * Rotates a mat2d by the given angle
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat2d} out
         */
        mat2d.rotate = function (out, a, rad) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                a4 = a[4],
                a5 = a[5],
                s = Math.sin(rad),
                c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            out[4] = a4;
            out[5] = a5;
            return out;
        };

        /**
         * Scales the mat2d by the dimensions in the given vec2
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to translate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat2d} out
         **/
        mat2d.scale = function (out, a, v) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                a4 = a[4],
                a5 = a[5],
                v0 = v[0],
                v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            out[4] = a4;
            out[5] = a5;
            return out;
        };

        /**
         * Translates the mat2d by the dimensions in the given vec2
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to translate
         * @param {vec2} v the vec2 to translate the matrix by
         * @returns {mat2d} out
         **/
        mat2d.translate = function (out, a, v) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                a4 = a[4],
                a5 = a[5],
                v0 = v[0],
                v1 = v[1];
            out[0] = a0;
            out[1] = a1;
            out[2] = a2;
            out[3] = a3;
            out[4] = a0 * v0 + a2 * v1 + a4;
            out[5] = a1 * v0 + a3 * v1 + a5;
            return out;
        };

        /**
         * Returns a string representation of a mat2d
         *
         * @param {mat2d} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat2d.str = function (a) {
            return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
        };

        /**
         * Returns Frobenius norm of a mat2d
         *
         * @param {mat2d} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat2d.frob = function (a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1);
        };

        if (typeof exports !== 'undefined') {
            exports.mat2d = mat2d;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 3x3 Matrix
         * @name mat3
         */

        var mat3 = {};

        /**
         * Creates a new identity mat3
         *
         * @returns {mat3} a new 3x3 matrix
         */
        mat3.create = function () {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };

        /**
         * Copies the upper-left 3x3 values into the given mat3.
         *
         * @param {mat3} out the receiving 3x3 matrix
         * @param {mat4} a   the source 4x4 matrix
         * @returns {mat3} out
         */
        mat3.fromMat4 = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[4];
            out[4] = a[5];
            out[5] = a[6];
            out[6] = a[8];
            out[7] = a[9];
            out[8] = a[10];
            return out;
        };

        /**
         * Creates a new mat3 initialized with values from an existing matrix
         *
         * @param {mat3} a matrix to clone
         * @returns {mat3} a new 3x3 matrix
         */
        mat3.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Copy the values from one mat3 to another
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Set a mat3 to the identity matrix
         *
         * @param {mat3} out the receiving matrix
         * @returns {mat3} out
         */
        mat3.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a01 = a[1],
                    a02 = a[2],
                    a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            } else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }

            return out;
        };

        /**
         * Inverts a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.invert = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                b01 = a22 * a11 - a12 * a21,
                b11 = -a22 * a10 + a12 * a20,
                b21 = a21 * a10 - a11 * a20,


            // Calculate the determinant
            det = a00 * b01 + a01 * b11 + a02 * b21;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        };

        /**
         * Calculates the adjugate of a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.adjoint = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8];

            out[0] = a11 * a22 - a12 * a21;
            out[1] = a02 * a21 - a01 * a22;
            out[2] = a01 * a12 - a02 * a11;
            out[3] = a12 * a20 - a10 * a22;
            out[4] = a00 * a22 - a02 * a20;
            out[5] = a02 * a10 - a00 * a12;
            out[6] = a10 * a21 - a11 * a20;
            out[7] = a01 * a20 - a00 * a21;
            out[8] = a00 * a11 - a01 * a10;
            return out;
        };

        /**
         * Calculates the determinant of a mat3
         *
         * @param {mat3} a the source matrix
         * @returns {Number} determinant of a
         */
        mat3.determinant = function (a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8];

            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        };

        /**
         * Multiplies two mat3's
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the first operand
         * @param {mat3} b the second operand
         * @returns {mat3} out
         */
        mat3.multiply = function (out, a, b) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                b00 = b[0],
                b01 = b[1],
                b02 = b[2],
                b10 = b[3],
                b11 = b[4],
                b12 = b[5],
                b20 = b[6],
                b21 = b[7],
                b22 = b[8];

            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;

            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;

            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        };

        /**
         * Alias for {@link mat3.multiply}
         * @function
         */
        mat3.mul = mat3.multiply;

        /**
         * Translate a mat3 by the given vector
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to translate
         * @param {vec2} v vector to translate by
         * @returns {mat3} out
         */
        mat3.translate = function (out, a, v) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                x = v[0],
                y = v[1];

            out[0] = a00;
            out[1] = a01;
            out[2] = a02;

            out[3] = a10;
            out[4] = a11;
            out[5] = a12;

            out[6] = x * a00 + y * a10 + a20;
            out[7] = x * a01 + y * a11 + a21;
            out[8] = x * a02 + y * a12 + a22;
            return out;
        };

        /**
         * Rotates a mat3 by the given angle
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat3} out
         */
        mat3.rotate = function (out, a, rad) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a10 = a[3],
                a11 = a[4],
                a12 = a[5],
                a20 = a[6],
                a21 = a[7],
                a22 = a[8],
                s = Math.sin(rad),
                c = Math.cos(rad);

            out[0] = c * a00 + s * a10;
            out[1] = c * a01 + s * a11;
            out[2] = c * a02 + s * a12;

            out[3] = c * a10 - s * a00;
            out[4] = c * a11 - s * a01;
            out[5] = c * a12 - s * a02;

            out[6] = a20;
            out[7] = a21;
            out[8] = a22;
            return out;
        };

        /**
         * Scales the mat3 by the dimensions in the given vec2
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat3} out
         **/
        mat3.scale = function (out, a, v) {
            var x = v[0],
                y = v[1];

            out[0] = x * a[0];
            out[1] = x * a[1];
            out[2] = x * a[2];

            out[3] = y * a[3];
            out[4] = y * a[4];
            out[5] = y * a[5];

            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Copies the values from a mat2d into a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat2d} a the matrix to copy
         * @returns {mat3} out
         **/
        mat3.fromMat2d = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = 0;

            out[3] = a[2];
            out[4] = a[3];
            out[5] = 0;

            out[6] = a[4];
            out[7] = a[5];
            out[8] = 1;
            return out;
        };

        /**
        * Calculates a 3x3 matrix from the given quaternion
        *
        * @param {mat3} out mat3 receiving operation result
        * @param {quat} q Quaternion to create matrix from
        *
        * @returns {mat3} out
        */
        mat3.fromQuat = function (out, q) {
            var x = q[0],
                y = q[1],
                z = q[2],
                w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                yx = y * x2,
                yy = y * y2,
                zx = z * x2,
                zy = z * y2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - yy - zz;
            out[3] = yx - wz;
            out[6] = zx + wy;

            out[1] = yx + wz;
            out[4] = 1 - xx - zz;
            out[7] = zy - wx;

            out[2] = zx - wy;
            out[5] = zy + wx;
            out[8] = 1 - xx - yy;

            return out;
        };

        /**
        * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
        *
        * @param {mat3} out mat3 receiving operation result
        * @param {mat4} a Mat4 to derive the normal matrix from
        *
        * @returns {mat3} out
        */
        mat3.normalFromMat4 = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15],
                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,


            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

            return out;
        };

        /**
         * Returns a string representation of a mat3
         *
         * @param {mat3} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat3.str = function (a) {
            return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
        };

        /**
         * Returns Frobenius norm of a mat3
         *
         * @param {mat3} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat3.frob = function (a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
        };

        if (typeof exports !== 'undefined') {
            exports.mat3 = mat3;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 4x4 Matrix
         * @name mat4
         */

        var mat4 = {};

        /**
         * Creates a new identity mat4
         *
         * @returns {mat4} a new 4x4 matrix
         */
        mat4.create = function () {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };

        /**
         * Creates a new mat4 initialized with values from an existing matrix
         *
         * @param {mat4} a matrix to clone
         * @returns {mat4} a new 4x4 matrix
         */
        mat4.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Copy the values from one mat4 to another
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Set a mat4 to the identity matrix
         *
         * @param {mat4} out the receiving matrix
         * @returns {mat4} out
         */
        mat4.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a01 = a[1],
                    a02 = a[2],
                    a03 = a[3],
                    a12 = a[6],
                    a13 = a[7],
                    a23 = a[11];

                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            } else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }

            return out;
        };

        /**
         * Inverts a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.invert = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15],
                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,


            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

            return out;
        };

        /**
         * Calculates the adjugate of a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.adjoint = function (out, a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15];

            out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return out;
        };

        /**
         * Calculates the determinant of a mat4
         *
         * @param {mat4} a the source matrix
         * @returns {Number} determinant of a
         */
        mat4.determinant = function (a) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15],
                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32;

            // Calculate the determinant
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        };

        /**
         * Multiplies two mat4's
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the first operand
         * @param {mat4} b the second operand
         * @returns {mat4} out
         */
        mat4.multiply = function (out, a, b) {
            var a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11],
                a30 = a[12],
                a31 = a[13],
                a32 = a[14],
                a33 = a[15];

            // Cache only the current line of the second matrix
            var b0 = b[0],
                b1 = b[1],
                b2 = b[2],
                b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out;
        };

        /**
         * Alias for {@link mat4.multiply}
         * @function
         */
        mat4.mul = mat4.multiply;

        /**
         * Translate a mat4 by the given vector
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to translate
         * @param {vec3} v vector to translate by
         * @returns {mat4} out
         */
        mat4.translate = function (out, a, v) {
            var x = v[0],
                y = v[1],
                z = v[2],
                a00,
                a01,
                a02,
                a03,
                a10,
                a11,
                a12,
                a13,
                a20,
                a21,
                a22,
                a23;

            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            } else {
                a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
                a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
                a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

                out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
                out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
                out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }

            return out;
        };

        /**
         * Scales the mat4 by the dimensions in the given vec3
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to scale
         * @param {vec3} v the vec3 to scale the matrix by
         * @returns {mat4} out
         **/
        mat4.scale = function (out, a, v) {
            var x = v[0],
                y = v[1],
                z = v[2];

            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Rotates a mat4 by the given angle
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @param {vec3} axis the axis to rotate around
         * @returns {mat4} out
         */
        mat4.rotate = function (out, a, rad, axis) {
            var x = axis[0],
                y = axis[1],
                z = axis[2],
                len = Math.sqrt(x * x + y * y + z * z),
                s,
                c,
                t,
                a00,
                a01,
                a02,
                a03,
                a10,
                a11,
                a12,
                a13,
                a20,
                a21,
                a22,
                a23,
                b00,
                b01,
                b02,
                b10,
                b11,
                b12,
                b20,
                b21,
                b22;

            if (Math.abs(len) < GLMAT_EPSILON) {
                return null;
            }

            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;

            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;

            a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
            a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
            a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;

            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the X axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateX = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11];

            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the Y axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateY = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11];

            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the Z axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateZ = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7];

            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out;
        };

        /**
         * Creates a matrix from a quaternion rotation and vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, vec);
         *     var quatMat = mat4.create();
         *     quat4.toMat4(quat, quatMat);
         *     mat4.multiply(dest, quatMat);
         *
         * @param {mat4} out mat4 receiving operation result
         * @param {quat4} q Rotation quaternion
         * @param {vec3} v Translation vector
         * @returns {mat4} out
         */
        mat4.fromRotationTranslation = function (out, q, v) {
            // Quaternion math
            var x = q[0],
                y = q[1],
                z = q[2],
                w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;

            return out;
        };

        mat4.fromQuat = function (out, q) {
            var x = q[0],
                y = q[1],
                z = q[2],
                w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,
                xx = x * x2,
                yx = y * x2,
                yy = y * y2,
                zx = z * x2,
                zy = z * y2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;

            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;

            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;

            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;

            return out;
        };

        /**
         * Generates a frustum matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {Number} left Left bound of the frustum
         * @param {Number} right Right bound of the frustum
         * @param {Number} bottom Bottom bound of the frustum
         * @param {Number} top Top bound of the frustum
         * @param {Number} near Near bound of the frustum
         * @param {Number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.frustum = function (out, left, right, bottom, top, near, far) {
            var rl = 1 / (right - left),
                tb = 1 / (top - bottom),
                nf = 1 / (near - far);
            out[0] = near * 2 * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = near * 2 * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = far * near * 2 * nf;
            out[15] = 0;
            return out;
        };

        /**
         * Generates a perspective projection matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {number} fovy Vertical field of view in radians
         * @param {number} aspect Aspect ratio. typically viewport width/height
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.perspective = function (out, fovy, aspect, near, far) {
            var f = 1.0 / Math.tan(fovy / 2),
                nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
            return out;
        };

        /**
         * Generates a orthogonal projection matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {number} left Left bound of the frustum
         * @param {number} right Right bound of the frustum
         * @param {number} bottom Bottom bound of the frustum
         * @param {number} top Top bound of the frustum
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.ortho = function (out, left, right, bottom, top, near, far) {
            var lr = 1 / (left - right),
                bt = 1 / (bottom - top),
                nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out;
        };

        /**
         * Generates a look-at matrix with the given eye position, focal point, and up axis
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {vec3} eye Position of the viewer
         * @param {vec3} center Point the viewer is looking at
         * @param {vec3} up vec3 pointing up
         * @returns {mat4} out
         */
        mat4.lookAt = function (out, eye, center, up) {
            var x0,
                x1,
                x2,
                y0,
                y1,
                y2,
                z0,
                z1,
                z2,
                len,
                eyex = eye[0],
                eyey = eye[1],
                eyez = eye[2],
                upx = up[0],
                upy = up[1],
                upz = up[2],
                centerx = center[0],
                centery = center[1],
                centerz = center[2];

            if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) {
                return mat4.identity(out);
            }

            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;

            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;

            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }

            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;

            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }

            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;

            return out;
        };

        /**
         * Returns a string representation of a mat4
         *
         * @param {mat4} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat4.str = function (a) {
            return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
        };

        /**
         * Returns Frobenius norm of a mat4
         *
         * @param {mat4} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat4.frob = function (a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
        };

        if (typeof exports !== 'undefined') {
            exports.mat4 = mat4;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.
        
        Redistribution and use in source and binary forms, with or without modification,
        are permitted provided that the following conditions are met:
        
          * Redistributions of source code must retain the above copyright notice, this
            list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright notice,
            this list of conditions and the following disclaimer in the documentation 
            and/or other materials provided with the distribution.
        
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
        ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
        DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
        ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
        LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
        ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
        (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
        SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class Quaternion
         * @name quat
         */

        var quat = {};

        /**
         * Creates a new identity quat
         *
         * @returns {quat} a new quaternion
         */
        quat.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Sets a quaternion to represent the shortest rotation from one
         * vector to another.
         *
         * Both vectors are assumed to be unit length.
         *
         * @param {quat} out the receiving quaternion.
         * @param {vec3} a the initial vector
         * @param {vec3} b the destination vector
         * @returns {quat} out
         */
        quat.rotationTo = function () {
            var tmpvec3 = vec3.create();
            var xUnitVec3 = vec3.fromValues(1, 0, 0);
            var yUnitVec3 = vec3.fromValues(0, 1, 0);

            return function (out, a, b) {
                var dot = vec3.dot(a, b);
                if (dot < -0.999999) {
                    vec3.cross(tmpvec3, xUnitVec3, a);
                    if (vec3.length(tmpvec3) < 0.000001) vec3.cross(tmpvec3, yUnitVec3, a);
                    vec3.normalize(tmpvec3, tmpvec3);
                    quat.setAxisAngle(out, tmpvec3, Math.PI);
                    return out;
                } else if (dot > 0.999999) {
                    out[0] = 0;
                    out[1] = 0;
                    out[2] = 0;
                    out[3] = 1;
                    return out;
                } else {
                    vec3.cross(tmpvec3, a, b);
                    out[0] = tmpvec3[0];
                    out[1] = tmpvec3[1];
                    out[2] = tmpvec3[2];
                    out[3] = 1 + dot;
                    return quat.normalize(out, out);
                }
            };
        }();

        /**
         * Sets the specified quaternion with values corresponding to the given
         * axes. Each axis is a vec3 and is expected to be unit length and
         * perpendicular to all other specified axes.
         *
         * @param {vec3} view  the vector representing the viewing direction
         * @param {vec3} right the vector representing the local "right" direction
         * @param {vec3} up    the vector representing the local "up" direction
         * @returns {quat} out
         */
        quat.setAxes = function () {
            var matr = mat3.create();

            return function (out, view, right, up) {
                matr[0] = right[0];
                matr[3] = right[1];
                matr[6] = right[2];

                matr[1] = up[0];
                matr[4] = up[1];
                matr[7] = up[2];

                matr[2] = -view[0];
                matr[5] = -view[1];
                matr[8] = -view[2];

                return quat.normalize(out, quat.fromMat3(out, matr));
            };
        }();

        /**
         * Creates a new quat initialized with values from an existing quaternion
         *
         * @param {quat} a quaternion to clone
         * @returns {quat} a new quaternion
         * @function
         */
        quat.clone = vec4.clone;

        /**
         * Creates a new quat initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {quat} a new quaternion
         * @function
         */
        quat.fromValues = vec4.fromValues;

        /**
         * Copy the values from one quat to another
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the source quaternion
         * @returns {quat} out
         * @function
         */
        quat.copy = vec4.copy;

        /**
         * Set the components of a quat to the given values
         *
         * @param {quat} out the receiving quaternion
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {quat} out
         * @function
         */
        quat.set = vec4.set;

        /**
         * Set a quat to the identity quaternion
         *
         * @param {quat} out the receiving quaternion
         * @returns {quat} out
         */
        quat.identity = function (out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Sets a quat from the given angle and rotation axis,
         * then returns it.
         *
         * @param {quat} out the receiving quaternion
         * @param {vec3} axis the axis around which to rotate
         * @param {Number} rad the angle in radians
         * @returns {quat} out
         **/
        quat.setAxisAngle = function (out, axis, rad) {
            rad = rad * 0.5;
            var s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out;
        };

        /**
         * Adds two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {quat} out
         * @function
         */
        quat.add = vec4.add;

        /**
         * Multiplies two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {quat} out
         */
        quat.multiply = function (out, a, b) {
            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bx = b[0],
                by = b[1],
                bz = b[2],
                bw = b[3];

            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        };

        /**
         * Alias for {@link quat.multiply}
         * @function
         */
        quat.mul = quat.multiply;

        /**
         * Scales a quat by a scalar number
         *
         * @param {quat} out the receiving vector
         * @param {quat} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {quat} out
         * @function
         */
        quat.scale = vec4.scale;

        /**
         * Rotates a quaternion by the given angle about the X axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateX = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bx = Math.sin(rad),
                bw = Math.cos(rad);

            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out;
        };

        /**
         * Rotates a quaternion by the given angle about the Y axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateY = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                by = Math.sin(rad),
                bw = Math.cos(rad);

            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out;
        };

        /**
         * Rotates a quaternion by the given angle about the Z axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateZ = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bz = Math.sin(rad),
                bw = Math.cos(rad);

            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out;
        };

        /**
         * Calculates the W component of a quat from the X, Y, and Z components.
         * Assumes that quaternion is 1 unit in length.
         * Any existing W component will be ignored.
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate W component of
         * @returns {quat} out
         */
        quat.calculateW = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2];

            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return out;
        };

        /**
         * Calculates the dot product of two quat's
         *
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {Number} dot product of a and b
         * @function
         */
        quat.dot = vec4.dot;

        /**
         * Performs a linear interpolation between two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {quat} out
         * @function
         */
        quat.lerp = vec4.lerp;

        /**
         * Performs a spherical linear interpolation between two quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {quat} out
         */
        quat.slerp = function (out, a, b, t) {
            // benchmarks:
            //    http://jsperf.com/quaternion-slerp-implementations

            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3],
                bx = b[0],
                by = b[1],
                bz = b[2],
                bw = b[3];

            var omega, cosom, sinom, scale0, scale1;

            // calc cosine
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            // adjust signs (if necessary)
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            // calculate coefficients
            if (1.0 - cosom > 0.000001) {
                // standard case (slerp)
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            } else {
                // "from" and "to" quaternions are very close 
                //  ... so we can do a linear interpolation
                scale0 = 1.0 - t;
                scale1 = t;
            }
            // calculate final values
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;

            return out;
        };

        /**
         * Calculates the inverse of a quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate inverse of
         * @returns {quat} out
         */
        quat.invert = function (out, a) {
            var a0 = a[0],
                a1 = a[1],
                a2 = a[2],
                a3 = a[3],
                dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
                invDot = dot ? 1.0 / dot : 0;

            // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out;
        };

        /**
         * Calculates the conjugate of a quat
         * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate conjugate of
         * @returns {quat} out
         */
        quat.conjugate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Calculates the length of a quat
         *
         * @param {quat} a vector to calculate length of
         * @returns {Number} length of a
         * @function
         */
        quat.length = vec4.length;

        /**
         * Alias for {@link quat.length}
         * @function
         */
        quat.len = quat.length;

        /**
         * Calculates the squared length of a quat
         *
         * @param {quat} a vector to calculate squared length of
         * @returns {Number} squared length of a
         * @function
         */
        quat.squaredLength = vec4.squaredLength;

        /**
         * Alias for {@link quat.squaredLength}
         * @function
         */
        quat.sqrLen = quat.squaredLength;

        /**
         * Normalize a quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quaternion to normalize
         * @returns {quat} out
         * @function
         */
        quat.normalize = vec4.normalize;

        /**
         * Creates a quaternion from the given 3x3 rotation matrix.
         *
         * NOTE: The resultant quaternion is not normalized, so you should be sure
         * to renormalize the quaternion yourself where necessary.
         *
         * @param {quat} out the receiving quaternion
         * @param {mat3} m rotation matrix
         * @returns {quat} out
         * @function
         */
        quat.fromMat3 = function (out, m) {
            // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
            // article "Quaternion Calculus and Fast Animation".
            var fTrace = m[0] + m[4] + m[8];
            var fRoot;

            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0); // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot; // 1/(4w)
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            } else {
                // |w| <= 1/2
                var i = 0;
                if (m[4] > m[0]) i = 1;
                if (m[8] > m[i * 3 + i]) i = 2;
                var j = (i + 1) % 3;
                var k = (i + 2) % 3;

                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }

            return out;
        };

        /**
         * Returns a string representation of a quatenion
         *
         * @param {quat} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        quat.str = function (a) {
            return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        if (typeof exports !== 'undefined') {
            exports.quat = quat;
        }
        ;
    })(shim.exports);
})(undefined);
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dat = require('dat.gui/build/dat.gui');

var _dat2 = _interopRequireDefault(_dat);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _system = require('./system');

var _system2 = _interopRequireDefault(_system);

var _xyz = require('./xyz');

var _xyz2 = _interopRequireDefault(_xyz);

var _datGui = require('./config/dat-gui');

var _datGui2 = _interopRequireDefault(_datGui);

var _caffeine = require('./molecules/caffeine');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Speck = function () {
  function Speck(_ref) {
    var canvasContainerID = _ref.canvasContainerID,
        canvasID = _ref.canvasID,
        options = _ref.options;

    _classCallCheck(this, Speck);

    this.canvasContainer = document.getElementById(canvasContainerID);
    this.canvas = document.getElementById(canvasID);
    this.system = _system2.default.new();
    this.view = _view2.default.new();
    var defaultOptions = {
      zoomRatio: 1
    };
    this.options = _extends({}, defaultOptions, options);
    this.gui = new _dat2.default.GUI({ load: _datGui2.default });

    this.renderer = new Speck.Renderer({ canvas: this.canvas, canvasContainer: this.canvasContainer, system: this.system, view: this.view, options: this.options });

    this._init();
    this.loadStructure(_caffeine.caffeine);
    this.renderer.init();
  }

  _createClass(Speck, [{
    key: 'setOptions',
    value: function setOptions(options) {
      var newOptions = _extends({}, this.options, options);
      this.options = newOptions;
      this.renderer.options = newOptions;
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.options;
    }
  }, {
    key: '_init',
    value: function _init() {
      var _this = this;

      var speck = this.renderer;
      this.gui.remember(speck);
      var controllers = [];

      var atomsFolder = this.gui.addFolder('Atoms');
      controllers.push(atomsFolder.add(speck, 'atomRadius', 0, 100));
      controllers.push(atomsFolder.add(speck, 'relativeAtomRadius', 0, 100));
      controllers.push(atomsFolder.add(speck, 'atomShade', 0, 100));

      var bondsFolder = this.gui.addFolder('Bonds');
      controllers.push(bondsFolder.add(speck, 'displayBonds'));
      controllers.push(bondsFolder.add(speck, 'bondRadius', 0, 100));
      controllers.push(bondsFolder.add(speck, 'bondThreshold').min(0));
      controllers.push(bondsFolder.add(speck, 'bondShade', 0, 100));

      var shadingFolder = this.gui.addFolder('Shading');
      controllers.push(shadingFolder.add(speck, 'ambientOcclusion', 0, 100));
      controllers.push(shadingFolder.add(speck, 'brightness', 0, 100));
      controllers.push(shadingFolder.add(speck, 'AOResolution', [16, 64, 128, 256, 512, 1024, 2048]));
      controllers.push(shadingFolder.add(speck, 'samplesPerFrame', [0, 1, 2, 4, 8, 16, 32, 64, 128]));

      var depthOfFieldFolder = this.gui.addFolder('Depth of Field');
      controllers.push(depthOfFieldFolder.add(speck, 'depthOfFieldStrength', 0, 100));
      controllers.push(depthOfFieldFolder.add(speck, 'depthOfFieldPosition', 0, 100));

      var detailFolder = this.gui.addFolder('Detail');
      controllers.push(detailFolder.add(speck, 'outlineStrength', 0, 100));
      controllers.push(detailFolder.add(speck, 'antialiasingPasses').min(1).step(1));
      controllers.push(detailFolder.add(speck, 'resolution', [64, 128, 256, 512, 1024, 2048]));

      this.gui.add(speck, 'center');
      this.gui.add(speck, 'downloadImage');

      var _loop = function _loop(i, len) {
        var controller = controllers[i];
        controller.onChange(function (value) {
          switch (controller.property) {
            case "atomRadius":
              _this.renderer.view.atomScale = value / 100;
              break;
            case "relativeAtomRadius":
              _this.renderer.view.relativeAtomScale = value / 100;
              break;
            case "atomShade":
              _this.renderer.view.atomShade = value / 100;
              break;
            case "displayBonds":
              _this.renderer.view.bonds = value;
              _this.renderer.renderer.setSystem(_this.renderer.system, _this.renderer.view);
              break;
            case "bondRadius":
              _this.renderer.view.bondScale = value / 100;
              break;
            case "bondThreshold":
              _this.renderer.view.bondThreshold = value;
              _this.renderer.renderer.setSystem(_this.renderer.system, _this.renderer.view);
              break;
            case "bondShade":
              _this.renderer.view.bondShade = value / 100;
              break;
            case "ambientOcclusion":
              _this.renderer.view.ao = value / 100;
              break;
            case "brightness":
              _this.renderer.view.brightness = value / 100;
              break;
            case "AOResolution":
              _this.renderer.renderer.setResolution(speck.resolution, value);
              break;
            case "samplesPerFrame":
              _this.renderer.view.spf = value;
              break;
            case "depthOfFieldStrength":
              _this.renderer.view.dofStrength = value / 100;
              break;
            case "depthOfFieldPosition":
              _this.renderer.view.dofPosition = value / 100;
              break;
            case "outlineStrength":
              _this.renderer.view.outline = value / 100;
              break;
            case "antialiasingPasses":
              _this.renderer.view.fxaa = value;
              break;
            case "resolution":
              _this.renderer.renderer.setResolution(value, speck.AOResolution);
              break;
          }
          _view2.default.resolve(_this.renderer.view);
          _this.renderer.reset();
        });
      };

      for (var i = 0, len = controllers.length; i < len; i++) {
        _loop(i, len);
      }

      this.gui.closed = true;
    }
  }, {
    key: 'loadStructure',
    value: function loadStructure(molecule) {
      var structure = (0, _xyz2.default)(molecule)[0];
      this.system = _system2.default.new();
      for (var i = 0; i < structure.length; i++) {
        var a = structure[i];
        var x = a.position[0];
        var y = a.position[1];
        var z = a.position[2];
        _system2.default.addAtom(this.system, a.symbol, x, y, z);
      }
      _system2.default.center(this.system);
      _system2.default.calculateBonds(this.system);
      this.renderer.system = this.system;
      this.renderer.renderer.setSystem(this.system, this.view);
      _view2.default.center(this.view, this.system, this.options.zoomRatio);

      this.renderer.reset();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.gui.destroy();
      this.renderer.destroy();
    }
  }]);

  return Speck;
}();

Speck.Renderer = function () {
  function _class(_ref2) {
    var canvas = _ref2.canvas,
        canvasContainer = _ref2.canvasContainer,
        system = _ref2.system,
        view = _ref2.view,
        options = _ref2.options;

    _classCallCheck(this, _class);

    this.atomRadius = 60;
    this.relativeAtomRadius = 100;
    this.atomShade = 50;

    this.displayBonds = true;
    this.bondRadius = 50;
    this.bondThreshold = 1.2;
    this.bondShade = 50;

    this.ambientOcclusion = 75;
    this.brightness = 50;
    this.AOResolution = 512;
    this.samplesPerFrame = 32;

    this.depthOfFieldStrength = 0;
    this.depthOfFieldPosition = 50;

    this.outlineStrength = 0;
    this.antialiasingPasses = 1;
    this.resolution = 512;

    this.lastX = 0.0;
    this.lastY = 0.0;
    this.mouseDown = false;
    this.needReset = false;

    this.system = system;
    this.view = view;
    this.canvas = canvas;
    this.canvasContainer = canvasContainer;
    this.options = options;
    this.renderer = new _renderer2.default(this.canvas, this.view.resolution, this.view.aoRes);
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this._createListeners();
      this._loop();
      this.view.atomScale = this.atomRadius / 100;
      this.view.relativeAtomScale = this.relativeAtomRadius / 100;
      this.view.atomShade = this.atomShade / 100;
      this.view.bonds = this.displayBonds;
      this.view.bondScale = this.bondRadius / 100;
      this.view.bondThreshold = this.bondThreshold;
      this.view.bondShade = this.bondShade / 100;
      this.view.ao = this.ambientOcclusion / 100;
      this.view.brightness = this.brightness / 100;
      this.view.spf = this.samplesPerFrame;
      this.view.dofStrength = this.depthOfFieldStrength / 100;
      this.view.dofPosition = this.depthOfFieldPosition / 100;
      this.view.outline = this.outlineStrength / 100;
      this.view.fxaa = this.antialiasingPasses;
      this.renderer.setSystem(this.system, this.view);
      this.renderer.setResolution(this.resolution, this.AOResolution);
      _view2.default.resolve(this.view);
      this.reset();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.needReset = true;
    }
  }, {
    key: 'center',
    value: function center() {
      _view2.default.center(this.view, this.system, this.options.zoomRatio);
      this.needReset = true;
    }
  }, {
    key: 'downloadImage',
    value: function downloadImage() {
      this.renderer.render(this.view);
      var imgURL = this.canvas.toDataURL("image/png");
      var iframe = "<iframe width='100%' height='100%' style={border: none, overflow: auto} src='" + imgURL + "'></iframe>";
      var x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.body.style.margin = "0";
      x.document.body.style.height = "100%";
      x.document.body.style.width = "100%";
      x.document.close();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._destroyListeners();
      this._endLoop();
    }
  }, {
    key: '_canvasScrollListener',
    value: function _canvasScrollListener(event) {
      var wd = 0;
      if (event.deltaY < 0) {
        wd = 1;
      } else {
        wd = -1;
      }
      this.view.zoom = this.view.zoom * (wd === 1 ? 1 / 0.9 : 0.9);
      this.needReset = true;
      event.preventDefault();
    }
  }, {
    key: '_canvasMousedownListener',
    value: function _canvasMousedownListener(event) {
      document.body.style.cursor = "none";
      this.mouseDown = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }, {
    key: '_windowMouseupListener',
    value: function _windowMouseupListener(event) {
      document.body.style.cursor = "default";
      this.mouseDown = false;
    }
  }, {
    key: '_windowMousemoveListener',
    value: function _windowMousemoveListener(event) {
      if (!this.mouseDown) {
        return;
      }
      var dx = event.clientX - this.lastX;
      var dy = event.clientY - this.lastY;
      if (dx == 0 && dy == 0) {
        return;
      }
      if (event.shiftKey) {
        _view2.default.translate(this.view, dx, dy);
      } else {
        _view2.default.rotate(this.view, dx, dy);
      }
      this.needReset = true;

      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }, {
    key: '_createListeners',
    value: function _createListeners() {
      this.canvasContainer.addEventListener("wheel", this._canvasScrollListener.bind(this));
      this.canvasContainer.addEventListener("mousedown", this._canvasMousedownListener.bind(this));
      window.addEventListener("mouseup", this._windowMouseupListener.bind(this));
      window.addEventListener("mousemove", this._windowMousemoveListener.bind(this));

      this.mouseCheckInterval = setInterval(function () {
        if (!this.mouseDown) {
          document.body.style.cursor = "default";
        }
      }, 20);
    }
  }, {
    key: '_destroyListeners',
    value: function _destroyListeners() {
      this.canvasContainer.removeEventListener("wheel", this._canvasScrollListener.bind(this));
      this.canvasContainer.removeEventListener("mousedown", this._canvasMousedownListener.bind(this));
      window.removeEventListener("mouseup", this._windowMouseupListener.bind(this));
      window.removeEventListener("mousemove", this._windowMousemoveListener.bind(this));

      clearInterval(this.mouseCheckInterval);
    }
  }, {
    key: '_loop',
    value: function _loop() {
      // document.getElementById("ao-indicator").style.width = Math.min(100, (renderer.getAOProgress() * 100)) + "%";
      if (this.needReset) {
        this.renderer.reset();
      }
      this.needReset = false;
      this.renderer.render(this.view);
      this.reqAnimationFrame = requestAnimationFrame(this._loop.bind(this));
    }
  }, {
    key: '_endLoop',
    value: function _endLoop() {
      cancelAnimationFrame(this.reqAnimationFrame);
    }
  }, {
    key: 'dataURL',
    get: function get() {
      this.renderer.render(this.view);
      return this.canvas.toDataURL("image/png");
    }
  }]);

  return _class;
}();

exports.default = Speck;
},{"./config/dat-gui":4,"./molecules/caffeine":10,"./renderer":11,"./system":20,"./view":21,"./xyz":23,"dat.gui/build/dat.gui":2}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var caffeine = exports.caffeine = "24\nCaffeine\nH      -3.3804130    -1.1272367     0.5733036\nN       0.9668296    -1.0737425    -0.8198227\nC       0.0567293     0.8527195     0.3923156\nN      -1.3751742    -1.0212243    -0.0570552\nC      -1.2615018     0.2590713     0.5234135\nC      -0.3068337    -1.6836331    -0.7169344\nC       1.1394235     0.1874122    -0.2700900\nN       0.5602627     2.0839095     0.8251589\nO      -0.4926797    -2.8180554    -1.2094732\nC      -2.6328073    -1.7303959    -0.0060953\nO      -2.2301338     0.7988624     1.0899730\nH       2.5496990     2.9734977     0.6229590\nC       2.0527432    -1.7360887    -1.4931279\nH      -2.4807715    -2.7269528     0.4882631\nH      -3.0089039    -1.9025254    -1.0498023\nH       2.9176101    -1.8481516    -0.7857866\nH       2.3787863    -1.1211917    -2.3743655\nH       1.7189877    -2.7489920    -1.8439205\nC      -0.1518450     3.0970046     1.5348347\nC       1.8934096     2.1181245     0.4193193\nN       2.2861252     0.9968439    -0.2440298\nH      -0.1687028     4.0436553     0.9301094\nH       0.3535322     3.2979060     2.5177747\nH      -1.2074498     2.7537592     1.7203047";
},{}],11:[function(require,module,exports){
"use strict";

var _accumulatorGlsl = require('./shaders/accumulator.glsl.js');

var _accumulatorGlsl2 = _interopRequireDefault(_accumulatorGlsl);

var _aoGlsl = require('./shaders/ao.glsl.js');

var _aoGlsl2 = _interopRequireDefault(_aoGlsl);

var _atomsGlsl = require('./shaders/atoms.glsl.js');

var _atomsGlsl2 = _interopRequireDefault(_atomsGlsl);

var _blurGlsl = require('./shaders/blur.glsl.js');

var _blurGlsl2 = _interopRequireDefault(_blurGlsl);

var _bondsGlsl = require('./shaders/bonds.glsl.js');

var _bondsGlsl2 = _interopRequireDefault(_bondsGlsl);

var _dofGlsl = require('./shaders/dof.glsl.js');

var _dofGlsl2 = _interopRequireDefault(_dofGlsl);

var _fxaaGlsl = require('./shaders/fxaa.glsl.js');

var _fxaaGlsl2 = _interopRequireDefault(_fxaaGlsl);

var _texturedQuadGlsl = require('./shaders/textured-quad.glsl.js');

var _texturedQuadGlsl2 = _interopRequireDefault(_texturedQuadGlsl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var glm = require('./gl-matrix');
var webgl = require('./webgl.js');
var cube = require("./cube");
var elements = require("./elements");
var View = require("./view");
var System = require("./system");

module.exports = function (canvas, resolution, aoResolution) {

    var self = this;

    var range, samples, system;

    var gl, canvas;

    var rAtoms = null,
        rBonds = null,
        rDispQuad = null,
        rAccumulator = null,
        rAO = null,
        rDOF = null,
        rFXAA = null;

    var tSceneColor, tSceneNormal, tSceneDepth, tRandRotDepth, tRandRotColor, tAccumulator, tAccumulatorOut, tFXAA, tFXAAOut, tDOF, tAO;

    var fbSceneColor, fbSceneNormal, fbRandRot, fbAccumulator, fbFXAA, fbDOF, fbAO;

    var progAtoms, progBonds, progAccumulator, progAO, progFXAA, progDOF, progDisplayQuad;

    var ext;

    var sampleCount = 0,
        colorRendered = false,
        normalRendered = false;

    self.getAOProgress = function () {
        return sampleCount / 1024;
    };

    self.initialize = function () {

        // Initialize canvas/gl.
        canvas.width = canvas.height = resolution;

        gl = canvas.getContext('webgl');
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clearColor(0, 0, 0, 0);
        gl.clearDepth(1);
        gl.viewport(0, 0, resolution, resolution);

        window.gl = gl; //debug

        ext = webgl.getExtensions(gl, ["EXT_frag_depth", "WEBGL_depth_texture"]);

        self.createTextures();

        // Initialize shaders.
        progAtoms = loadProgram(gl, _atomsGlsl2.default);
        progBonds = loadProgram(gl, _bondsGlsl2.default);
        progDisplayQuad = loadProgram(gl, _texturedQuadGlsl2.default);
        progAccumulator = loadProgram(gl, _accumulatorGlsl2.default);
        progAO = loadProgram(gl, _aoGlsl2.default);
        progFXAA = loadProgram(gl, _fxaaGlsl2.default);
        progDOF = loadProgram(gl, _dofGlsl2.default);

        var position = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0];

        // Initialize geometry.
        var attribs = webgl.buildAttribs(gl, { aPosition: 3 });
        attribs.aPosition.buffer.set(new Float32Array(position));
        var count = position.length / 9;

        rDispQuad = new webgl.Renderable(gl, progDisplayQuad, attribs, count);
        rAccumulator = new webgl.Renderable(gl, progAccumulator, attribs, count);
        rAO = new webgl.Renderable(gl, progAO, attribs, count);
        rFXAA = new webgl.Renderable(gl, progFXAA, attribs, count);
        rDOF = new webgl.Renderable(gl, progDOF, attribs, count);

        samples = 0;
    };

    self.createTextures = function () {
        // fbRandRot
        tRandRotColor = new webgl.Texture(gl, 0, null, aoResolution, aoResolution);

        tRandRotDepth = new webgl.Texture(gl, 1, null, aoResolution, aoResolution, {
            internalFormat: gl.DEPTH_COMPONENT,
            format: gl.DEPTH_COMPONENT,
            type: gl.UNSIGNED_SHORT
        });

        fbRandRot = new webgl.Framebuffer(gl, [tRandRotColor], tRandRotDepth);

        // fbScene
        tSceneColor = new webgl.Texture(gl, 2, null, resolution, resolution);

        tSceneNormal = new webgl.Texture(gl, 3, null, resolution, resolution);

        tSceneDepth = new webgl.Texture(gl, 4, null, resolution, resolution, {
            internalFormat: gl.DEPTH_COMPONENT,
            format: gl.DEPTH_COMPONENT,
            type: gl.UNSIGNED_SHORT
        });

        fbSceneColor = new webgl.Framebuffer(gl, [tSceneColor], tSceneDepth);

        fbSceneNormal = new webgl.Framebuffer(gl, [tSceneNormal], tSceneDepth);

        // fbAccumulator
        tAccumulator = new webgl.Texture(gl, 5, null, resolution, resolution);
        tAccumulatorOut = new webgl.Texture(gl, 6, null, resolution, resolution);
        fbAccumulator = new webgl.Framebuffer(gl, [tAccumulatorOut]);

        // fbAO
        tAO = new webgl.Texture(gl, 7, null, resolution, resolution);
        fbAO = new webgl.Framebuffer(gl, [tAO]);

        // fbFXAA
        tFXAA = new webgl.Texture(gl, 8, null, resolution, resolution);
        tFXAAOut = new webgl.Texture(gl, 9, null, resolution, resolution);
        fbFXAA = new webgl.Framebuffer(gl, [tFXAAOut]);

        // fbDOF
        tDOF = new webgl.Texture(gl, 10, null, resolution, resolution);
        fbDOF = new webgl.Framebuffer(gl, [tDOF]);
    };

    self.setResolution = function (res, aoRes) {
        aoResolution = aoRes;
        resolution = res;
        canvas.width = canvas.height = resolution;
        gl.viewport(0, 0, resolution, resolution);
        self.createTextures();
    };

    self.setSystem = function (newSystem, view) {

        system = newSystem;

        function make36(arr) {
            var out = [];
            for (var i = 0; i < 36; i++) {
                out.push.apply(out, arr);
            }
            return out;
        }

        // Atoms
        var attribs = webgl.buildAttribs(gl, {
            aImposter: 3, aPosition: 3, aRadius: 1, aColor: 3
        });

        var imposter = [];
        var position = [];
        var radius = [];
        var color = [];

        for (var i = 0; i < system.atoms.length; i++) {
            imposter.push.apply(imposter, cube.position);
            var a = system.atoms[i];
            position.push.apply(position, make36([a.x, a.y, a.z]));
            radius.push.apply(radius, make36([elements[a.symbol].radius]));
            var c = elements[a.symbol].color;
            color.push.apply(color, make36([c[0], c[1], c[2]]));
        }

        attribs.aImposter.buffer.set(new Float32Array(imposter));
        attribs.aPosition.buffer.set(new Float32Array(position));
        attribs.aRadius.buffer.set(new Float32Array(radius));
        attribs.aColor.buffer.set(new Float32Array(color));

        var count = imposter.length / 9;

        rAtoms = new webgl.Renderable(gl, progAtoms, attribs, count);

        // Bonds

        if (view.bonds) {

            rBonds = null;

            if (system.bonds.length > 0) {

                var attribs = webgl.buildAttribs(gl, {
                    aImposter: 3,
                    aPosA: 3,
                    aPosB: 3,
                    aRadA: 1,
                    aRadB: 1,
                    aColA: 3,
                    aColB: 3
                });

                var imposter = [];
                var posa = [];
                var posb = [];
                var rada = [];
                var radb = [];
                var cola = [];
                var colb = [];

                for (var i = 0; i < system.bonds.length; i++) {
                    var b = system.bonds[i];
                    if (b.cutoff > view.bondThreshold) break;
                    imposter.push.apply(imposter, cube.position);
                    posa.push.apply(posa, make36([b.posA.x, b.posA.y, b.posA.z]));
                    posb.push.apply(posb, make36([b.posB.x, b.posB.y, b.posB.z]));
                    rada.push.apply(rada, make36([b.radA]));
                    radb.push.apply(radb, make36([b.radB]));
                    cola.push.apply(cola, make36([b.colA.r, b.colA.g, b.colA.b]));
                    colb.push.apply(colb, make36([b.colB.r, b.colB.g, b.colB.b]));
                }

                attribs.aImposter.buffer.set(new Float32Array(imposter));
                attribs.aPosA.buffer.set(new Float32Array(posa));
                attribs.aPosB.buffer.set(new Float32Array(posb));
                attribs.aRadA.buffer.set(new Float32Array(rada));
                attribs.aRadB.buffer.set(new Float32Array(radb));
                attribs.aColA.buffer.set(new Float32Array(cola));
                attribs.aColB.buffer.set(new Float32Array(colb));

                var count = imposter.length / 9;

                rBonds = new webgl.Renderable(gl, progBonds, attribs, count);
            }
        }
    };

    self.reset = function () {
        sampleCount = 0;
        colorRendered = false;
        normalRendered = false;
        tAccumulator.reset();
        tAccumulatorOut.reset();
    };

    self.render = function (view) {
        if (system === undefined) {
            return;
        }
        if (rAtoms == null) {
            return;
        }

        range = System.getRadius(system) * 2.0;

        if (!colorRendered) {
            color(view);
        } else if (!normalRendered) {
            normal(view);
        } else {
            for (var i = 0; i < view.spf; i++) {
                if (sampleCount > 1024) {
                    break;
                }
                sample(view);
                sampleCount++;
            }
        }
        display(view);
    };

    function color(view) {
        colorRendered = true;
        gl.viewport(0, 0, resolution, resolution);
        fbSceneColor.bind();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var rect = View.getRect(view);
        var projection = glm.mat4.create();
        glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, range);
        var viewMat = glm.mat4.create();
        glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
        var model = glm.mat4.create();
        glm.mat4.translate(model, model, [0, 0, -range / 2]);
        glm.mat4.multiply(model, model, view.rotation);
        progAtoms.setUniform("uProjection", "Matrix4fv", false, projection);
        progAtoms.setUniform("uView", "Matrix4fv", false, viewMat);
        progAtoms.setUniform("uModel", "Matrix4fv", false, model);
        progAtoms.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
        progAtoms.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
        progAtoms.setUniform("uAtomScale", "1f", 2.5 * view.atomScale);
        progAtoms.setUniform("uRelativeAtomScale", "1f", view.relativeAtomScale);
        progAtoms.setUniform("uRes", "1f", resolution);
        progAtoms.setUniform("uDepth", "1f", range);
        progAtoms.setUniform("uMode", "1i", 0);
        progAtoms.setUniform("uAtomShade", "1f", view.atomShade);
        rAtoms.render();

        if (view.bonds && rBonds != null) {
            fbSceneColor.bind();
            progBonds.setUniform("uProjection", "Matrix4fv", false, projection);
            progBonds.setUniform("uView", "Matrix4fv", false, viewMat);
            progBonds.setUniform("uModel", "Matrix4fv", false, model);
            progBonds.setUniform("uRotation", "Matrix4fv", false, view.rotation);
            progBonds.setUniform("uDepth", "1f", range);
            progBonds.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progBonds.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progBonds.setUniform("uRes", "1f", resolution);
            progBonds.setUniform("uBondRadius", "1f", 2.5 * View.getBondRadius(view));
            progBonds.setUniform("uBondShade", "1f", view.bondShade);
            progBonds.setUniform("uAtomScale", "1f", 2.5 * view.atomScale);
            progBonds.setUniform("uRelativeAtomScale", "1f", view.relativeAtomScale);
            progBonds.setUniform("uMode", "1i", 0);
            rBonds.render();
        }
    }

    function normal(view) {
        normalRendered = true;
        gl.viewport(0, 0, resolution, resolution);
        fbSceneNormal.bind();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var rect = View.getRect(view);
        var projection = glm.mat4.create();
        glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, range);
        var viewMat = glm.mat4.create();
        glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
        var model = glm.mat4.create();
        glm.mat4.translate(model, model, [0, 0, -range / 2]);
        glm.mat4.multiply(model, model, view.rotation);
        progAtoms.setUniform("uProjection", "Matrix4fv", false, projection);
        progAtoms.setUniform("uView", "Matrix4fv", false, viewMat);
        progAtoms.setUniform("uModel", "Matrix4fv", false, model);
        progAtoms.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
        progAtoms.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
        progAtoms.setUniform("uAtomScale", "1f", 2.5 * view.atomScale);
        progAtoms.setUniform("uRelativeAtomScale", "1f", view.relativeAtomScale);
        progAtoms.setUniform("uRes", "1f", resolution);
        progAtoms.setUniform("uDepth", "1f", range);
        progAtoms.setUniform("uMode", "1i", 1);
        progAtoms.setUniform("uAtomShade", "1f", view.atomShade);
        rAtoms.render();

        if (view.bonds && rBonds != null) {
            fbSceneNormal.bind();
            progBonds.setUniform("uProjection", "Matrix4fv", false, projection);
            progBonds.setUniform("uView", "Matrix4fv", false, viewMat);
            progBonds.setUniform("uModel", "Matrix4fv", false, model);
            progBonds.setUniform("uRotation", "Matrix4fv", false, view.rotation);
            progBonds.setUniform("uDepth", "1f", range);
            progBonds.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progBonds.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progBonds.setUniform("uRes", "1f", resolution);
            progBonds.setUniform("uBondRadius", "1f", 2.5 * View.getBondRadius(view));
            progBonds.setUniform("uBondShade", "1f", view.bondShade);
            progBonds.setUniform("uAtomScale", "1f", 2.5 * view.atomScale);
            progBonds.setUniform("uRelativeAtomScale", "1f", view.relativeAtomScale);
            progBonds.setUniform("uMode", "1i", 1);
            rBonds.render();
        }
    }

    function sample(view) {
        gl.viewport(0, 0, aoResolution, aoResolution);
        var v = View.clone(view);
        v.zoom = 1 / range;
        v.translation.x = 0;
        v.translation.y = 0;
        var rot = glm.mat4.create();
        for (var i = 0; i < 3; i++) {
            var axis = glm.vec3.random(glm.vec3.create(), 1.0);
            glm.mat4.rotate(rot, rot, Math.random() * 10, axis);
        }
        v.rotation = glm.mat4.multiply(glm.mat4.create(), rot, v.rotation);
        fbRandRot.bind();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var rect = View.getRect(v);
        var projection = glm.mat4.create();
        glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, range);
        var viewMat = glm.mat4.create();
        glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
        var model = glm.mat4.create();
        glm.mat4.translate(model, model, [0, 0, -range / 2]);
        glm.mat4.multiply(model, model, v.rotation);
        progAtoms.setUniform("uProjection", "Matrix4fv", false, projection);
        progAtoms.setUniform("uView", "Matrix4fv", false, viewMat);
        progAtoms.setUniform("uModel", "Matrix4fv", false, model);
        progAtoms.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
        progAtoms.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
        progAtoms.setUniform("uAtomScale", "1f", 2.5 * v.atomScale);
        progAtoms.setUniform("uRelativeAtomScale", "1f", view.relativeAtomScale);
        progAtoms.setUniform("uRes", "1f", aoResolution);
        progAtoms.setUniform("uDepth", "1f", range);
        progAtoms.setUniform("uMode", "1i", 0);
        progAtoms.setUniform("uAtomShade", "1f", view.atomShade);
        rAtoms.render();

        if (view.bonds && rBonds != null) {
            progBonds.setUniform("uProjection", "Matrix4fv", false, projection);
            progBonds.setUniform("uView", "Matrix4fv", false, viewMat);
            progBonds.setUniform("uModel", "Matrix4fv", false, model);
            progBonds.setUniform("uRotation", "Matrix4fv", false, v.rotation);
            progBonds.setUniform("uDepth", "1f", range);
            progBonds.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progBonds.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progBonds.setUniform("uRes", "1f", aoResolution);
            progBonds.setUniform("uBondRadius", "1f", 2.5 * View.getBondRadius(view));
            progBonds.setUniform("uBondShade", "1f", view.bondShade);
            progBonds.setUniform("uAtomScale", "1f", 2.5 * view.atomScale);
            progBonds.setUniform("uRelativeAtomScale", "1f", view.relativeAtomScale);
            progBonds.setUniform("uMode", "1i", 0);
            rBonds.render();
        }

        gl.viewport(0, 0, resolution, resolution);
        var sceneRect = View.getRect(view);
        var rotRect = View.getRect(v);
        var invRot = glm.mat4.invert(glm.mat4.create(), rot);
        fbAccumulator.bind();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        progAccumulator.setUniform("uSceneDepth", "1i", tSceneDepth.index);
        progAccumulator.setUniform("uSceneNormal", "1i", tSceneNormal.index);
        progAccumulator.setUniform("uRandRotDepth", "1i", tRandRotDepth.index);
        progAccumulator.setUniform("uAccumulator", "1i", tAccumulator.index);
        progAccumulator.setUniform("uSceneBottomLeft", "2fv", [sceneRect.left, sceneRect.bottom]);
        progAccumulator.setUniform("uSceneTopRight", "2fv", [sceneRect.right, sceneRect.top]);
        progAccumulator.setUniform("uRotBottomLeft", "2fv", [rotRect.left, rotRect.bottom]);
        progAccumulator.setUniform("uRotTopRight", "2fv", [rotRect.right, rotRect.top]);
        progAccumulator.setUniform("uRes", "1f", resolution);
        progAccumulator.setUniform("uDepth", "1f", range);
        progAccumulator.setUniform("uRot", "Matrix4fv", false, rot);
        progAccumulator.setUniform("uInvRot", "Matrix4fv", false, invRot);
        progAccumulator.setUniform("uSampleCount", "1i", sampleCount);
        rAccumulator.render();
        tAccumulator.activate();
        tAccumulator.bind();
        gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, resolution, resolution, 0);
    }

    function display(view) {
        gl.viewport(0, 0, resolution, resolution);
        if (view.fxaa > 0 || view.dofStrength > 0) {
            fbAO.bind();
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        progAO.setUniform("uSceneColor", "1i", tSceneColor.index);
        progAO.setUniform("uSceneDepth", "1i", tSceneDepth.index);
        progAO.setUniform("uAccumulatorOut", "1i", tAccumulatorOut.index);
        progAO.setUniform("uRes", "1f", resolution);
        progAO.setUniform("uAO", "1f", 2.0 * view.ao);
        progAO.setUniform("uBrightness", "1f", 2.0 * view.brightness);
        progAO.setUniform("uOutlineStrength", "1f", view.outline);
        rAO.render();

        if (view.fxaa > 0) {
            if (view.dofStrength > 0) {
                fbFXAA.bind();
            } else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            for (var i = 0; i < view.fxaa; i++) {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                if (i == 0) {
                    progFXAA.setUniform("uTexture", "1i", tAO.index);
                } else {
                    progFXAA.setUniform("uTexture", "1i", tFXAA.index);
                }
                progFXAA.setUniform("uRes", "1f", resolution);
                rFXAA.render();
                tFXAA.activate();
                tFXAA.bind();
                gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, resolution, resolution, 0);
            }
        }

        if (view.dofStrength > 0) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            if (view.fxaa > 0) {
                progDOF.setUniform("uColor", "1i", tFXAA.index);
            } else {
                progDOF.setUniform("uColor", "1i", tAO.index);
            }
            progDOF.setUniform("uDepth", "1i", tSceneDepth.index);
            progDOF.setUniform("uDOFPosition", "1f", view.dofPosition);
            progDOF.setUniform("uDOFStrength", "1f", view.dofStrength);
            progDOF.setUniform("uRes", "1f", resolution);
            rDOF.render();
        }

        // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // progDisplayQuad.setUniform("uTexture", "1i", tSceneColor.index);
        // progDisplayQuad.setUniform("uRes", "1f", resolution);
        // rDispQuad.render();
    }

    self.initialize();
};

function loadProgram(gl, src) {
    src = src.split('// __split__');
    return new webgl.Program(gl, src[0], src[1]);
}
},{"./cube":6,"./elements":7,"./gl-matrix":8,"./shaders/accumulator.glsl.js":12,"./shaders/ao.glsl.js":13,"./shaders/atoms.glsl.js":14,"./shaders/blur.glsl.js":15,"./shaders/bonds.glsl.js":16,"./shaders/dof.glsl.js":17,"./shaders/fxaa.glsl.js":18,"./shaders/textured-quad.glsl.js":19,"./system":20,"./view":21,"./webgl.js":22}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var accumulatorShader = "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uSceneDepth;\nuniform sampler2D uSceneNormal;\nuniform sampler2D uRandRotDepth;\nuniform sampler2D uAccumulator;\nuniform mat4 uRot;\nuniform mat4 uInvRot;\nuniform vec2 uSceneBottomLeft;\nuniform vec2 uSceneTopRight;\nuniform vec2 uRotBottomLeft;\nuniform vec2 uRotTopRight;\nuniform float uDepth;\nuniform float uRes;\nuniform int uSampleCount;\n\nvoid main() {\n\n    float dScene = texture2D(uSceneDepth, gl_FragCoord.xy/uRes).r;\n\n    vec3 r = vec3(uSceneBottomLeft + (gl_FragCoord.xy/uRes) * (uSceneTopRight - uSceneBottomLeft), 0.0);\n\n    r.z = -(dScene - 0.5) * uDepth;\n    r = vec3(uRot * vec4(r, 1));\n    float depth = -r.z/uDepth + 0.5;\n\n    vec2 p = (r.xy - uRotBottomLeft)/(uRotTopRight - uRotBottomLeft);\n\n    float dRandRot = texture2D(uRandRotDepth, p).r;\n\n    float ao = step(dRandRot, depth * 0.99);\n\n    vec3 normal = texture2D(uSceneNormal, gl_FragCoord.xy/uRes).rgb * 2.0 - 1.0;\n    vec3 dir = vec3(uInvRot * vec4(0, 0, 1, 0));\n    float mag = dot(dir, normal);\n    float sampled = step(0.0, mag);\n\n    ao *= sampled;\n\n    vec4 acc = texture2D(uAccumulator, gl_FragCoord.xy/uRes);\n\n    if (uSampleCount < 256) {\n        acc.r += ao/255.0;\n    } else if (uSampleCount < 512) {\n        acc.g += ao/255.0;\n    } else if (uSampleCount < 768) {\n        acc.b += ao/255.0;\n    } else {\n        acc.a += ao/255.0;\n    }\n\n    gl_FragColor = acc;\n\n}";

exports.default = accumulatorShader;
},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var aoShader = "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uSceneColor;\nuniform sampler2D uSceneDepth;\nuniform sampler2D uAccumulatorOut;\nuniform float uRes;\nuniform float uAO;\nuniform float uBrightness;\nuniform float uOutlineStrength;\n\nvoid main() {\n    vec2 p = gl_FragCoord.xy/uRes;\n    vec4 sceneColor = texture2D(uSceneColor, p);\n    if (uOutlineStrength > 0.0) {\n        float depth = texture2D(uSceneDepth, p).r;\n        float r = 1.0/511.0;\n        float d0 = abs(texture2D(uSceneDepth, p + vec2(-r,  0)).r - depth);\n        float d1 = abs(texture2D(uSceneDepth, p + vec2( r,  0)).r - depth);\n        float d2 = abs(texture2D(uSceneDepth, p + vec2( 0, -r)).r - depth);\n        float d3 = abs(texture2D(uSceneDepth, p + vec2( 0,  r)).r - depth);\n        float d = max(d0, d1);\n        d = max(d, d2);\n        d = max(d, d3);\n        sceneColor.rgb *= pow(1.0 - d, uOutlineStrength * 32.0);\n        sceneColor.a = max(step(0.003, d), sceneColor.a);\n    }\n    vec4 dAccum = texture2D(uAccumulatorOut, p);\n    float shade = max(0.0, 1.0 - (dAccum.r + dAccum.g + dAccum.b + dAccum.a) * 0.25 * uAO);\n    shade = pow(shade, 2.0);\n    gl_FragColor = vec4(uBrightness * sceneColor.rgb * shade, sceneColor.a);\n}";

exports.default = aoShader;
},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var atomsShader = "#version 100\nprecision highp float;\n\nattribute vec3 aImposter;\nattribute vec3 aPosition;\nattribute float aRadius;\nattribute vec3 aColor;\n\nuniform mat4 uView;\nuniform mat4 uProjection;\nuniform mat4 uModel;\nuniform float uAtomScale;\nuniform float uRelativeAtomScale;\nuniform float uAtomShade;\n\nvarying vec3 vColor;\nvarying vec3 vPosition;\nvarying float vRadius;\n\nvoid main() {\n    vRadius = uAtomScale * (1.0 + (aRadius - 1.0) * uRelativeAtomScale);\n    gl_Position = uProjection * uView * uModel * vec4(vRadius * aImposter + aPosition, 1.0);\n    vColor = mix(aColor, vec3(1,1,1), uAtomShade);\n    vPosition = vec3(uModel * vec4(aPosition, 1));\n}\n\n\n// __split__\n\n\n#version 100\n#extension GL_EXT_frag_depth: enable\nprecision highp float;\n\nuniform vec2 uBottomLeft;\nuniform vec2 uTopRight;\nuniform float uRes;\nuniform float uDepth;\nuniform int uMode;\n\nvarying vec3 vPosition;\nvarying float vRadius;\nvarying vec3 vColor;\n\nvec2 res = vec2(uRes, uRes);\n\nfloat raySphereIntersect(vec3 r0, vec3 rd) {\n    float a = dot(rd, rd);\n    vec3 s0_r0 = r0 - vPosition;\n    float b = 2.0 * dot(rd, s0_r0);\n    float c = dot(s0_r0, s0_r0) - (vRadius * vRadius);\n    float disc = b*b - 4.0*a*c;\n    if (disc <= 0.0) {\n        return -1.0;\n    }\n    return (-b - sqrt(disc))/(2.0*a);\n}\n\nvoid main() {\n    vec3 r0 = vec3(uBottomLeft + (gl_FragCoord.xy/res) * (uTopRight - uBottomLeft), 0.0);\n    vec3 rd = vec3(0, 0, -1);\n    float t = raySphereIntersect(r0, rd);\n    if (t < 0.0) {\n        discard;\n    }\n    vec3 coord = r0 + rd * t;\n    vec3 normal = normalize(coord - vPosition);\n    if (uMode == 0) {\n        gl_FragColor = vec4(vColor, 1);\n    } else if (uMode == 1) {\n        gl_FragColor = vec4(normal * 0.5 + 0.5, 1.0);\n    }\n    gl_FragDepthEXT = -coord.z/uDepth;\n}";

exports.default = atomsShader;
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var blurShader = "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uTexture;\nuniform float uRes;\nuniform int leftRight;\n\nvoid main() {\n    vec2 dir;\n    if (leftRight == 1) {\n        dir = vec2(1,0)/uRes;\n    } else {\n        dir = vec2(0,1)/uRes;\n    }\n    const int range = 16;\n    vec4 sample = vec4(0,0,0,0);\n    for (int i = -range; i <= range; i++) {\n        vec2 p = gl_FragCoord.xy/uRes + dir * float(i);\n        sample += texture2D(uTexture, p);\n    }\n    sample /= float(range) * 2.0 + 1.0;\n    gl_FragColor = sample;\n}";
exports.default = blurShader;
},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bondsShader = "#version 100\nprecision highp float;\n\nattribute vec3 aImposter;\nattribute vec3 aPosA;\nattribute vec3 aPosB;\nattribute float aRadA;\nattribute float aRadB;\nattribute vec3 aColA;\nattribute vec3 aColB;\n\nuniform mat4 uView;\nuniform mat4 uProjection;\nuniform mat4 uModel;\nuniform mat4 uRotation;\nuniform float uBondRadius;\nuniform float uAtomScale;\nuniform float uRelativeAtomScale;\n\nvarying vec3 vNormal;\nvarying vec3 vPosA, vPosB;\nvarying float vRadA, vRadB;\nvarying vec3 vColA, vColB;\nvarying float vRadius;\n\nmat3 alignVector(vec3 a, vec3 b) {\n    vec3 v = cross(a, b);\n    float s = length(v);\n    float c = dot(a, b);\n    mat3 I = mat3(\n        1, 0, 0,\n        0, 1, 0,\n        0, 0, 1\n    );\n    mat3 vx = mat3(\n        0, v.z, -v.y,\n        -v.z, 0, v.x,\n        v.y, -v.x, 0\n    );\n    return I + vx + vx * vx * ((1.0 - c) / (s * s));\n}\n\nvoid main() {\n    vRadius = uBondRadius;\n    vec3 pos = vec3(aImposter);\n    // Scale the box in x and z to be bond-radius.\n    pos = pos * vec3(vRadius, 1, vRadius);\n    // Shift the origin-centered cube so that the bottom is at the origin.\n    pos = pos + vec3(0, 1, 0);\n    // Stretch the box in y so that it is the length of the bond.\n    pos = pos * vec3(1, length(aPosA - aPosB) * 0.5, 1);\n    // Find the rotation that aligns vec3(0, 1, 0) with vec3(uPosB - uPosA) and apply it.\n    vec3 a = normalize(vec3(-0.000001, 1.000001, 0.000001));\n    vec3 b = normalize(aPosB - aPosA);\n    mat3 R = alignVector(a, b);\n    pos = R * pos;\n    // Shift the cube so that the bottom is centered at the middle of atom A.\n    pos = pos + aPosA;\n\n    vec4 position = uModel * vec4(pos, 1);\n    gl_Position = uProjection * uView * position;\n    vPosA = aPosA;\n    vPosB = aPosB;\n    vRadA = uAtomScale * (1.0 + (aRadA - 1.0) * uRelativeAtomScale);\n    vRadB = uAtomScale * (1.0 + (aRadB - 1.0) * uRelativeAtomScale);\n    vColA = aColA;\n    vColB = aColB;\n}\n\n\n// __split__\n\n\n#version 100\n#extension GL_EXT_frag_depth: enable\nprecision highp float;\n\nuniform mat4 uRotation;\nuniform vec2 uBottomLeft;\nuniform vec2 uTopRight;\nuniform float uDepth;\nuniform float uRes;\nuniform float uBondShade;\nuniform int uMode;\n\nvarying vec3 vPosA, vPosB;\nvarying float vRadA, vRadB;\nvarying vec3 vColA, vColB;\nvarying float vRadius;\n\nmat3 alignVector(vec3 a, vec3 b) {\n    vec3 v = cross(a, b);\n    float s = length(v);\n    float c = dot(a, b);\n    mat3 I = mat3(\n        1, 0, 0,\n        0, 1, 0,\n        0, 0, 1\n    );\n    mat3 vx = mat3(\n        0, v.z, -v.y,\n        -v.z, 0, v.x,\n        v.y, -v.x, 0\n    );\n    return I + vx + vx * vx * ((1.0 - c) / (s * s));\n}\n\nvoid main() {\n\n    vec2 res = vec2(uRes, uRes);\n    vec3 r0 = vec3(uBottomLeft + (gl_FragCoord.xy/res) * (uTopRight - uBottomLeft), uDepth/2.0);\n    vec3 rd = vec3(0, 0, -1);\n\n    vec3 i = normalize(vPosB - vPosA);\n         i = vec3(uRotation * vec4(i, 0));\n    vec3 j = normalize(vec3(-0.000001, 1.000001, 0.000001));\n    mat3 R = alignVector(i, j);\n\n    vec3 r0p = r0 - vec3(uRotation * vec4(vPosA, 0));\n    r0p = R * r0p;\n    vec3 rdp = R * rd;\n\n    float a = dot(rdp.xz, rdp.xz);\n    float b = 2.0 * dot(rdp.xz, r0p.xz);\n    float c = dot(r0p.xz, r0p.xz) - vRadius*vRadius;\n    float disc = b*b - 4.0*a*c;\n    if (disc <= 0.0) {\n        discard;\n    }\n    float t = (-b - sqrt(disc))/(2.0*a);\n    if (t < 0.0) {\n        discard;\n    }\n\n    vec3 coord = r0p + rdp * t;\n    if (coord.y < 0.0 || coord.y > length(vPosA - vPosB)) {\n        discard;\n    }\n\n    vec3 color;\n    if (coord.y < vRadA + 0.5 * (length(vPosA - vPosB) - (vRadA + vRadB))) {\n        color = vColA;\n    } else {\n        color = vColB;\n    }\n\n    color = mix(color, vec3(1,1,1), uBondShade);\n\n    R = alignVector(j, i);\n    vec3 normal = normalize(R * vec3(coord.x, 0, coord.z));\n\n    coord = r0 + rd * t;\n    if (uMode == 0) {\n        gl_FragColor = vec4(color, 1);\n    } else if (uMode == 1) {\n        gl_FragColor = vec4(normal * 0.5 + 0.5, 1.0);\n    }\n    gl_FragDepthEXT = -(coord.z - uDepth/2.0)/uDepth;\n}";
exports.default = bondsShader;
},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dofShader = "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uColor;\nuniform sampler2D uDepth;\nuniform float uRes;\nuniform float uDOFPosition;\nuniform float uDOFStrength;\nuniform int leftRight;\n\nvoid main() {\n\n    vec2 samples[64];\n    samples[0] = vec2(0.857612, 0.019885);\n    samples[1] = vec2(0.563809, -0.028071);\n    samples[2] = vec2(0.825599, -0.346856);\n    samples[3] = vec2(0.126584, -0.380959);\n    samples[4] = vec2(0.782948, 0.594322);\n    samples[5] = vec2(0.292148, -0.543265);\n    samples[6] = vec2(0.130700, 0.330220);\n    samples[7] = vec2(0.236088, 0.159604);\n    samples[8] = vec2(-0.305259, 0.810505);\n    samples[9] = vec2(0.269616, 0.923026);\n    samples[10] = vec2(0.484486, 0.371845);\n    samples[11] = vec2(-0.638057, 0.080447);\n    samples[12] = vec2(0.199629, 0.667280);\n    samples[13] = vec2(-0.861043, -0.370583);\n    samples[14] = vec2(-0.040652, -0.996174);\n    samples[15] = vec2(0.330458, -0.282111);\n    samples[16] = vec2(0.647795, -0.214354);\n    samples[17] = vec2(0.030422, -0.189908);\n    samples[18] = vec2(0.177430, -0.721124);\n    samples[19] = vec2(-0.461163, -0.327434);\n    samples[20] = vec2(-0.410012, -0.734504);\n    samples[21] = vec2(-0.616334, -0.626069);\n    samples[22] = vec2(0.590759, -0.726479);\n    samples[23] = vec2(-0.590794, 0.805365);\n    samples[24] = vec2(-0.924561, -0.163739);\n    samples[25] = vec2(-0.323028, 0.526960);\n    samples[26] = vec2(0.642128, 0.752577);\n    samples[27] = vec2(0.173625, -0.952386);\n    samples[28] = vec2(0.759014, 0.330311);\n    samples[29] = vec2(-0.360526, -0.032013);\n    samples[30] = vec2(-0.035320, 0.968156);\n    samples[31] = vec2(0.585478, -0.431068);\n    samples[32] = vec2(-0.244766, -0.906947);\n    samples[33] = vec2(-0.853096, 0.184615);\n    samples[34] = vec2(-0.089061, 0.104648);\n    samples[35] = vec2(-0.437613, 0.285308);\n    samples[36] = vec2(-0.654098, 0.379841);\n    samples[37] = vec2(-0.128663, 0.456572);\n    samples[38] = vec2(0.015980, -0.568170);\n    samples[39] = vec2(-0.043966, -0.771940);\n    samples[40] = vec2(0.346512, -0.071238);\n    samples[41] = vec2(-0.207921, -0.209121);\n    samples[42] = vec2(-0.624075, -0.189224);\n    samples[43] = vec2(-0.120618, 0.689339);\n    samples[44] = vec2(-0.664679, -0.410200);\n    samples[45] = vec2(0.371945, -0.880573);\n    samples[46] = vec2(-0.743251, 0.629998);\n    samples[47] = vec2(-0.191926, -0.413946);\n    samples[48] = vec2(0.449574, 0.833373);\n    samples[49] = vec2(0.299587, 0.449113);\n    samples[50] = vec2(-0.900432, 0.399319);\n    samples[51] = vec2(0.762613, -0.544796);\n    samples[52] = vec2(0.606462, 0.174233);\n    samples[53] = vec2(0.962185, -0.167019);\n    samples[54] = vec2(0.960990, 0.249552);\n    samples[55] = vec2(0.570397, 0.559146);\n    samples[56] = vec2(-0.537514, 0.555019);\n    samples[57] = vec2(0.108491, -0.003232);\n    samples[58] = vec2(-0.237693, -0.615428);\n    samples[59] = vec2(-0.217313, 0.261084);\n    samples[60] = vec2(-0.998966, 0.025692);\n    samples[61] = vec2(-0.418554, -0.527508);\n    samples[62] = vec2(-0.822629, -0.567797);\n    samples[63] = vec2(0.061945, 0.522105);\n\n    float invRes = 1.0/uRes;\n    vec2 coord = gl_FragCoord.xy * invRes;\n\n    float strength = uDOFStrength * uRes/768.0;\n\n    float depth = texture2D(uDepth, coord).r;\n    float range = uDOFPosition - depth;\n    float scale = abs(range);\n\n    vec4 sample = texture2D(uColor, coord);\n    float count = 1.0;\n    for(int i = 0; i < 64; i++) {\n        vec2 p = samples[i];\n        p = coord + scale * 64.0 * strength * p * invRes;\n        float d = texture2D(uDepth, p).r;\n        float r = uDOFPosition - d;\n        float s = abs(r);\n        sample += texture2D(uColor, p) * s;\n        count += s;\n    }\n\n    gl_FragColor = sample/count;\n}";
exports.default = dofShader;
},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fxaaShader = "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uTexture;\nuniform float uRes;\n\nvoid main() {\n    float FXAA_SPAN_MAX = 8.0;\n    float FXAA_REDUCE_MUL = 1.0/8.0;\n    float FXAA_REDUCE_MIN = 1.0/128.0;\n\n    vec2 texCoords = gl_FragCoord.xy/uRes;\n\n    vec4 rgbNW = texture2D(uTexture, texCoords + (vec2(-1.0, -1.0) / uRes));\n    vec4 rgbNE = texture2D(uTexture, texCoords + (vec2(1.0, -1.0) / uRes));\n    vec4 rgbSW = texture2D(uTexture, texCoords + (vec2(-1.0, 1.0) / uRes));\n    vec4 rgbSE = texture2D(uTexture, texCoords + (vec2(1.0, 1.0) / uRes));\n    vec4 rgbM  = texture2D(uTexture, texCoords);\n\n    vec4 luma = vec4(0.299, 0.587, 0.114, 1.0);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);\n\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) / uRes;\n\n    vec4 rgbA = (1.0/2.0) *\n        (texture2D(uTexture, texCoords.xy + dir * (1.0/3.0 - 0.5)) +\n         texture2D(uTexture, texCoords.xy + dir * (2.0/3.0 - 0.5)));\n    vec4 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) *\n        (texture2D(uTexture, texCoords.xy + dir * (0.0/3.0 - 0.5)) +\n         texture2D(uTexture, texCoords.xy + dir * (3.0/3.0 - 0.5)));\n    float lumaB = dot(rgbB, luma);\n\n    if((lumaB < lumaMin) || (lumaB > lumaMax)){\n        gl_FragColor = rgbA;\n    } else {\n        gl_FragColor = rgbB;\n    }\n\n}";
exports.default = fxaaShader;
},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var texturedQuadShader = "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uTexture;\nuniform float uRes;\n\nvoid main() {\n    gl_FragColor = texture2D(uTexture, gl_FragCoord.xy/uRes);\n}";
exports.default = texturedQuadShader;
},{}],20:[function(require,module,exports){
"use strict";

var glm = require("./gl-matrix");

var elements = require("./elements");
var consts = require("./const");

var newSystem = module.exports.new = function () {
    return {
        atoms: [],
        farAtom: undefined,
        bonds: []
    };
};

var calculateBonds = module.exports.calculateBonds = function (s) {
    var bonds = [];
    var sorted = s.atoms.slice();
    sorted.sort(function (a, b) {
        return a.z - b.z;
    });
    for (var i = 0; i < sorted.length; i++) {
        var a = sorted[i];
        var j = i + 1;
        while (j < sorted.length && sorted[j].z < sorted[i].z + 2.5 * 2 * consts.MAX_ATOM_RADIUS) {
            var b = sorted[j];
            var l = glm.vec3.fromValues(a.x, a.y, a.z);
            var m = glm.vec3.fromValues(b.x, b.y, b.z);
            var d = glm.vec3.distance(l, m);
            var ea = elements[a.symbol];
            var eb = elements[b.symbol];
            if (d < 2.5 * (ea.radius + eb.radius)) {
                bonds.push({
                    posA: {
                        x: a.x,
                        y: a.y,
                        z: a.z
                    },
                    posB: {
                        x: b.x,
                        y: b.y,
                        z: b.z
                    },
                    radA: ea.radius,
                    radB: eb.radius,
                    colA: {
                        r: ea.color[0],
                        g: ea.color[1],
                        b: ea.color[2]
                    },
                    colB: {
                        r: eb.color[0],
                        g: eb.color[1],
                        b: eb.color[2]
                    },
                    cutoff: d / (ea.radius + eb.radius)
                });
            }
            j++;
        }
    }
    bonds.sort(function (a, b) {
        return a.cutoff - b.cutoff;
    });
    s.bonds = bonds;
};

var addAtom = module.exports.addAtom = function (s, symbol, x, y, z) {
    s.atoms.push({
        symbol: symbol,
        x: x,
        y: y,
        z: z
    });
};

var getCentroid = module.exports.getCentroid = function (s) {
    var xsum = 0;
    var ysum = 0;
    var zsum = 0;
    for (var i = 0; i < s.atoms.length; i++) {
        xsum += s.atoms[i].x;
        ysum += s.atoms[i].y;
        zsum += s.atoms[i].z;
    }
    return {
        x: xsum / s.atoms.length,
        y: ysum / s.atoms.length,
        z: zsum / s.atoms.length
    };
};

var center = module.exports.center = function (s) {
    var shift = getCentroid(s);
    for (var i = 0; i < s.atoms.length; i++) {
        var atom = s.atoms[i];
        atom.x -= shift.x;
        atom.y -= shift.y;
        atom.z -= shift.z;
    }
};

var getFarAtom = module.exports.getFarAtom = function (s) {
    if (s.farAtom !== undefined) {
        return s.farAtom;
    }
    s.farAtom = s.atoms[0];
    var maxd = 0.0;
    for (var i = 0; i < s.atoms.length; i++) {
        var atom = s.atoms[i];
        var r = elements[atom.symbol].radius;
        var rd = Math.sqrt(r * r + r * r + r * r) * 2.5;
        var d = Math.sqrt(atom.x * atom.x + atom.y * atom.y + atom.z * atom.z) + rd;
        if (d > maxd) {
            maxd = d;
            s.farAtom = atom;
        }
    }
    return s.farAtom;
};

var getRadius = module.exports.getRadius = function (s) {
    var atom = getFarAtom(s);
    var r = consts.MAX_ATOM_RADIUS;
    var rd = Math.sqrt(r * r + r * r + r * r) * 2.5;
    return Math.sqrt(atom.x * atom.x + atom.y * atom.y + atom.z * atom.z) + rd;
};
},{"./const":5,"./elements":7,"./gl-matrix":8}],21:[function(require,module,exports){
"use strict";

var glm = require("./gl-matrix");
var elements = require("./elements");
var consts = require("./const");

function clamp(min, max, value) {
    return Math.min(max, Math.max(min, value));
}

var newView = module.exports.new = function () {
    return {
        aspect: 1.0,
        zoom: 0.125,
        translation: {
            x: 0.0,
            y: 0.0
        },
        atomScale: 0.6,
        relativeAtomScale: 1.0,
        bondScale: 0.5,
        rotation: glm.mat4.create(),
        ao: 0.75,
        aoRes: 256,
        brightness: 0.5,
        outline: 0.0,
        spf: 32,
        bonds: false,
        bondThreshold: 1.2,
        bondShade: 0.5,
        atomShade: 0.5,
        resolution: 768,
        dofStrength: 0.0,
        dofPosition: 0.5,
        fxaa: 1
    };
};

var center = module.exports.center = function (v, system) {
    var zoomRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var maxX = -Infinity;
    var minX = Infinity;
    var maxY = -Infinity;
    var minY = Infinity;
    for (var i = 0; i < system.atoms.length; i++) {
        var a = system.atoms[i];
        var r = elements[a.symbol].radius;
        r = 2.5 * v.atomScale * (1 + (r - 1) * v.relativeAtomScale);
        var p = glm.vec4.fromValues(a.x, a.y, a.z, 0);
        glm.vec4.transformMat4(p, p, v.rotation);
        maxX = Math.max(maxX, p[0] + r);
        minX = Math.min(minX, p[0] - r);
        maxY = Math.max(maxY, p[1] + r);
        minY = Math.min(minY, p[1] - r);
    }
    var cx = minX + (maxX - minX) / 2.0;
    var cy = minY + (maxY - minY) / 2.0;
    v.translation.x = cx;
    v.translation.y = cy;
    var scale = Math.max(maxX - minX, maxY - minY);
    v.zoom = zoomRatio / (scale * 1.01);
};

var override = module.exports.override = function (v, data) {
    for (var key in data) {
        v[key] = data[key];
    }
    resolve(v);
};

var clone = module.exports.clone = function (v) {
    return deserialize(serialize(v));
};

var serialize = module.exports.serialize = function (v) {
    return JSON.stringify(v);
};

var deserialize = module.exports.deserialize = function (v) {
    v = JSON.parse(v);
    v.rotation = glm.mat4.clone(v.rotation);
    return v;
};

var resolve = module.exports.resolve = function (v) {
    v.dofStrength = clamp(0, 1, v.dofStrength);
    v.dofPosition = clamp(0, 1, v.dofPosition);
    v.zoom = clamp(0.001, 2.0, v.zoom);
    v.atomScale = clamp(0, 1, v.atomScale);
    v.relativeAtomScale = clamp(0, 1, v.relativeAtomScale);
    v.bondScale = clamp(0, 1, v.bondScale);
    v.bondShade = clamp(0, 1, v.bondShade);
    v.atomShade = clamp(0, 1, v.atomShade);
    v.ao = clamp(0, 1, v.ao);
    v.brightness = clamp(0, 1, v.brightness);
    v.outline = clamp(0, 1, v.outline);
};

var translate = module.exports.translate = function (v, dx, dy) {
    v.translation.x -= dx / (v.resolution * v.zoom);
    v.translation.y += dy / (v.resolution * v.zoom);
    resolve(v);
};

var rotate = module.exports.rotate = function (v, dx, dy) {
    var m = glm.mat4.create();
    glm.mat4.rotateY(m, m, dx * 0.005);
    glm.mat4.rotateX(m, m, dy * 0.005);
    glm.mat4.multiply(v.rotation, m, v.rotation);
    resolve(v);
};

var getRect = module.exports.getRect = function (v) {
    var width = 1.0 / v.zoom;
    var height = width / v.aspect;
    var bottom = -height / 2 + v.translation.y;
    var top = height / 2 + v.translation.y;
    var left = -width / 2 + v.translation.x;
    var right = width / 2 + v.translation.x;
    return {
        bottom: bottom,
        top: top,
        left: left,
        right: right
    };
};

var getBondRadius = module.exports.getBondRadius = function (v) {
    return v.bondScale * v.atomScale * (1 + (consts.MIN_ATOM_RADIUS - 1) * v.relativeAtomScale);
};
},{"./const":5,"./elements":7,"./gl-matrix":8}],22:[function(require,module,exports){
"use strict";

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function buildAttribs(gl, layout) {
    var attribs = {};
    for (var key in layout) {
        attribs[key] = {
            buffer: new GLBuffer(gl),
            size: layout[key]
        };
    }
    return attribs;
}

module.exports.buildAttribs = buildAttribs;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function getExtensions(gl, extArray) {
    var ext = {};
    for (var i = 0; i < extArray.length; i++) {
        var e = gl.getExtension(extArray[i]);
        if (e === null) {
            throw "Extension " + extArray[i] + " not available.";
        }
        ext[extArray[i]] = e;
    }
    return ext;
};

module.exports.getExtensions = getExtensions;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function Framebuffer(gl, color, depth, ext) {

    var self = this;

    self.initialize = function () {
        self.fb = gl.createFramebuffer();
        self.bind();
        if (color.length > 1) {
            var drawBuffers = [];
            for (var i = 0; i < color.length; i++) {
                drawBuffers.push(ext["COLOR_ATTACHMENT" + i + "_WEBGL"]);
            }
            ext.drawBuffersWEBGL(drawBuffers);
            for (var i = 0; i < color.length; i++) {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, ext["COLOR_ATTACHMENT" + i + "_WEBGL"], gl.TEXTURE_2D, color[i].texture, 0);
            }
        } else {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color[0].texture, 0);
        }
        if (depth !== undefined) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depth.texture, 0);
        }
    };

    self.bind = function () {
        gl.bindFramebuffer(gl.FRAMEBUFFER, self.fb);
    };

    self.initialize();
};

module.exports.Framebuffer = Framebuffer;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function Texture(gl, index, data, width, height, options) {
    options = options || {};
    options.target = options.target || gl.TEXTURE_2D;
    options.mag = options.mag || gl.NEAREST;
    options.min = options.min || gl.NEAREST;
    options.wraps = options.wraps || gl.CLAMP_TO_EDGE;
    options.wrapt = options.wrapt || gl.CLAMP_TO_EDGE;
    options.internalFormat = options.internalFormat || gl.RGBA;
    options.format = options.format || gl.RGBA;
    options.type = options.type || gl.UNSIGNED_BYTE;

    var self = this;

    self.initialize = function () {
        self.index = index;
        self.activate();
        self.texture = gl.createTexture();
        self.bind();
        gl.texParameteri(options.target, gl.TEXTURE_MAG_FILTER, options.mag);
        gl.texParameteri(options.target, gl.TEXTURE_MIN_FILTER, options.min);
        gl.texParameteri(options.target, gl.TEXTURE_WRAP_S, options.wraps);
        gl.texParameteri(options.target, gl.TEXTURE_WRAP_T, options.wrapt);
        gl.texImage2D(options.target, 0, options.internalFormat, width, height, 0, options.format, options.type, data);
    };

    self.bind = function () {
        gl.bindTexture(options.target, self.texture);
    };

    self.activate = function () {
        gl.activeTexture(gl.TEXTURE0 + self.index);
    };

    self.reset = function () {
        self.activate();
        self.bind();
        gl.texImage2D(options.target, 0, options.internalFormat, width, height, 0, options.format, options.type, data);
    };

    self.initialize();
}

module.exports.Texture = Texture;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function GLBuffer(gl) {

    var self = this;

    self.initialize = function () {
        self.buffer = gl.createBuffer();
    };

    self.bind = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, self.buffer);
    };

    self.set = function (data) {
        self.bind();
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    };

    self.initialize();
};

module.exports.GLBuffer = GLBuffer;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function Renderable(gl, program, buffers, primitiveCount) {

    var self = this;

    self.primitiveCount = primitiveCount;

    self.initialize = function () {};

    self.render = function () {
        program.use();
        for (name in buffers) {
            var buffer = buffers[name].buffer;
            var size = buffers[name].size;
            try {
                var location = program.attribs[name].location;
            } catch (e) {
                console.log("Could not find location for", name);
                throw e;
            }
            buffer.bind();
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3 * primitiveCount);
        for (name in self.buffers) {
            gl.disableVertexAttribArray(program.attributes[name].location);
        }
    };

    self.initialize();
};

module.exports.Renderable = Renderable;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function InstancedRenderable(gl, program, buffers, primitiveCount, instancedExt) {

    var self = this;

    self.initialize = function () {};

    self.render = function () {
        program.use();
        for (name in buffers) {
            var buffer = buffers[name].buffer;
            var size = buffers[name].size;
            try {
                var location = program.attribs[name].location;
            } catch (e) {
                console.log("Could not find location for", name);
                throw e;
            }
            buffer.bind();
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
            instancedExt.vertexAttribDivisorANGLE(location, buffers[name].divisor);
        }
        instancedExt.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6 * 2 * 3, primitiveCount);
        for (name in self.buffers) {
            gl.disableVertexAttribArray(program.attributes[name].location);
        }
    };

    self.initialize();
};

module.exports.InstancedRenderable = InstancedRenderable;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function Program(gl, vertexSource, fragmentSource) {

    var self = this;

    self.initialize = function () {
        self.program = self.compileProgram(vertexSource, fragmentSource);
        self.attribs = self.gatherAttribs();
        self.uniforms = self.gatherUniforms();
    };

    self.use = function () {
        gl.useProgram(self.program);
    };

    self.compileProgram = function (vertexSource, fragmentSource) {
        var vertexShader = self.compileShader(vertexSource, gl.VERTEX_SHADER);
        var fragmentShader = self.compileShader(fragmentSource, gl.FRAGMENT_SHADER);
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(program));
            throw "Failed to compile program.";
        }
        return program;
    };

    self.compileShader = function (source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var err = gl.getShaderInfoLog(shader);
            var lineno = parseInt(err.split(':')[2]);
            var split = source.split("\n");
            for (var i in split) {
                var q = parseInt(i);
                console.log(q + "  " + split[i]);
                if (i == lineno - 1) {
                    console.warn(err);
                }
            }
            typeString = type == gl.VERTEX_SHADER ? "vertex" : "fragment";
            throw "Failed to compile " + typeString + " shader.";
        }
        return shader;
    };

    self.setUniform = function (name, type, value) {
        var args = Array.prototype.slice.call(arguments, 2);
        self.use(); // Make this idempotent. At the context level, perhaps?
        try {
            var location = self.uniforms[name].location;
        } catch (e) {
            console.log(name);
            throw e;
        }
        gl['uniform' + type].apply(gl, [location].concat(args));
    };

    self.gatherUniforms = function () {
        var uniforms = {};
        var nUniforms = gl.getProgramParameter(self.program, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < nUniforms; i++) {
            var uniform = gl.getActiveUniform(self.program, i);
            uniforms[uniform.name] = {
                name: uniform.name,
                location: gl.getUniformLocation(self.program, uniform.name),
                type: uniform.type,
                size: uniform.size
            };
        }
        return uniforms;
    };

    self.gatherAttribs = function () {
        var attribs = {};
        var nAttribs = gl.getProgramParameter(self.program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < nAttribs; i++) {
            var attrib = gl.getActiveAttrib(self.program, i);
            attribs[attrib.name] = {
                name: attrib.name,
                location: gl.getAttribLocation(self.program, attrib.name),
                type: attrib.type,
                size: attrib.size
            };
        }
        return attribs;
    };

    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    self.initialize();
};

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
module.exports.Program = Program;
},{}],23:[function(require,module,exports){
"use strict";

module.exports = function (data) {
    var lines = data.split('\n');
    var natoms = parseInt(lines[0]);
    var nframes = Math.floor(lines.length / (natoms + 2));
    var trajectory = [];
    for (var i = 0; i < nframes; i++) {
        var atoms = [];
        for (var j = 0; j < natoms; j++) {
            var line = lines[i * (natoms + 2) + j + 2].split(/\s+/);
            var atom = {};
            var k = 0;
            while (line[k] == "") {
                k++;
            }atom.symbol = line[k++];
            atom.position = [parseFloat(line[k++]), parseFloat(line[k++]), parseFloat(line[k++])];
            atoms.push(atom);
        }
        trajectory.push(atoms);
    }
    return trajectory;
};
},{}]},{},[1]);
