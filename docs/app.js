(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function repeat() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (typeof str !== 'string') {
      throw new SyntaxError('Invalid or unexpected token');
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count === Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length === 0 || count === 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (var i = 0; i < count; i++) {
      rpt += str;
    }
    return rpt;
  }

  var digitMove = function digitMove(numStr) {
    var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var numStrArr = numStr.replace(/^0/, '').replace(/\.+$/, '').split('');
    var decimalIndex = numStrArr.indexOf('.') !== -1 ? numStrArr.indexOf('.') : numStrArr.length;
    numStrArr.splice(decimalIndex, 1);
    if (digits > 0) {
      if (decimalIndex + digits <= numStrArr.length) {
        numStrArr.splice(decimalIndex + digits, 0, '.');
      } else {
        numStrArr.splice(decimalIndex + digits, 0, repeat('0', decimalIndex + digits - numStrArr.length));
      }
    } else if (digits < 0) {
      if (decimalIndex + digits > 0) {
        numStrArr.splice(decimalIndex + digits, 0, '.');
      } else {
        numStrArr.splice(0, 0, '0.' + repeat('0', Math.abs(decimalIndex + digits)));
      }
    } else {
      numStrArr = numStr.replace(/^0/, '').replace(/\.+$/, '').split('');
    }
    return numStrArr.join('').replace(/^(0+)/, '').replace(/\.+$/, '').replace(/^\./, '0.');
  };

  var percentage = function percentage(numStr) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0%';

    var percentageStr = digitMove(numStr, 2);
    if (type === '0%') {
      percentageStr += '%';
    } else if (type === '0.00%') {
      var decimalIndex = percentageStr.indexOf('.') !== -1 ? percentageStr.indexOf('.') : percentageStr.length;
      if (percentageStr.length - decimalIndex === 0) {
        percentageStr += '.00%';
      } else if (percentageStr.length - decimalIndex === 2) {
        percentageStr += '0%';
      } else {
        percentageStr += '%';
      }
    }
    return percentageStr;
  };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Long = function () {
    function Long(numStr) {
      _classCallCheck(this, Long);

      this.numStr = numStr;
      this.enabled = true;
      this._init();
    }

    _createClass(Long, [{
      key: '_init',
      value: function _init() {
        if (!isNumeric(this.numStr)) {
          console.error('"' + this.numStr + '" is not a number!');
          this.enabled = false;
        }
      }
    }, {
      key: 'digitMove',
      value: function digitMove$$1() {
        var digits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.enabled) {
          return digitMove(this.numStr, digits);
        } else {
          return this.numStr;
        }
      }
    }, {
      key: 'format',
      value: function format(type) {
        if (this.enabled) {
          switch (type) {
            case '0%':
              this.numStr = percentage(this.numStr, '0%');
              break;
            case '0.00%':
              this.numStr = percentage(this.numStr, '0.00%');
              break;
            default:
              break;
          }
        }
        return this.numStr;
      }
    }]);

    return Long;
  }();

  function longNum(str) {
    return new Long(str);
  }

  var num = longNum('123456.7').digitMove(4);

  console.log(num);

})));
