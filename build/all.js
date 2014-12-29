(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if(typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        root.baseline = factory();
    }
})(this, function() {

(function(win) {
    var isIE=!!win.ActiveXObject;
    var isIE6=isIE&&!win.XMLHttpRequest;
    var isIE8=isIE&&(win.document && !!win.document.documentMode);
    var isIE7=isIE&&!isIE6&&!isIE8;
    var isIE68 = isIE6 || isIE7 || isIE8;

    win._hack = {
        ie:isIE,
        ie6:isIE6,
        ie7:isIE7,
        ie8:isIE8,
        ie68:isIE68
    };

    var bs_patch = (function() {
        // IE8 window.hasOwnProperty
        win.hasOwnProperty = win.hasOwnProperty || Object.prototype.hasOwnProperty;

        if(Object.defineProperty && !isIE68) {
            return function(impl, obj, method, condition) {
                if((method && typeof obj[method] == "undefined") || condition) {
                    Object.defineProperty(obj, method, {
                        enumerable: false,
                        configurable: true,
                        writable: false,
                        value: impl
                    });
                }
            };
        }else {
            return function(impl, obj, method, condition) {
                if((method && typeof obj[method] == "undefined") || condition) {
                    obj[method] = impl;
                }
            };
        }
    })();

    var bs_patches = function(impl, obj) {
        for(var key in impl) {
            if(impl !== win && impl.hasOwnProperty(key)) {
                bs_patch(impl[key], obj, key);
            }
        }
    };

    win.patch = {
        one:bs_patch,
        some:bs_patches
    };
})(this);
(function(win) {
    var patch = win.patch;

    patch.some({
        'of':function() {
            return Array.prototype.slice.call(arguments);
        },
        isArray:function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
    }, Array);

    patch.some({
        entries:function() {
            return Iterator(this);
        },
        every:function(fun) {
            'use strict';
            if (this === void 0 || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== 'function')
                throw new TypeError();
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t && !fun.call(thisArg, t[i], i, t))
                    return false;
            }
            return true;
        },
        fill:function(value) {
            var O = Object(this);
            var len = parseInt(O.length);
            var start = arguments[1];
            var relativeStart = parseInt(start) || 0;
            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
            var end = arguments[2];
            var relativeEnd = end === undefined ? len  : (parseInt(end) || 0);
            var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
            for (; k < final; k++) {
                O[k] = value;
            }
            return O;
        },
        filter:function(fun) {
            "use strict";
            if (this === void 0 || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
                throw new TypeError();
            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (fun.call(thisArg, val, i, t))
                        res.push(val);
                }
            }
            return res;
        },
        find:function(filter, context) {
            var index = this.findIndex(filter, context);
            if(index >= 0) {
                return this[index];
            }else {
                return undefined;
            }
        },
        findIndex:function(filter, context) {
            if(typeof filter != 'function') {
                throw new TypeError('filter must be a function');
            }
            var list = Object(this);
            var len = list.length >>> 0;
            var value;
            for(var i=0;i<len;i++) {
                if(i in list) {
                    value = list[i];
                    if(filter.call(context, value, i, list)) {
                        return i;
                    }
                }
            }
            return -1;
        },
        keys:function() {
            var ite = Iterator(this);
            ite.next = function() {
                var value = this.iterator[this.current++];
                if(this.current > this.length) {
                    throw new Error("stop iterate");
                }
                return {
                    value:value[0],
                    done:this.current >= this.length
                };
            };
            return ite;
        },
        forEach:function(callback, thisArgs) {
            var t, k;
            if(this == null) {
                throw new TypeError('this is null or undefined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if(typeof callback != 'function') {
                throw new TypeError('callback is not a function');
            }
            if(thisArgs)
                t = thisArgs;
            k = 0;
            while(k < len) {
                var kValue;
                if(k in o) {
                    kValue = o[k];
                    callback.call(t, kValue, k, o);
                }
                k++;
            }
        },
        copyWithin:function(target, start) {
            var O = Object(this);
            var len = parseInt(O.length);
            var relativeTarget = parseInt(target);
            var to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);
            var relativeStart = parseInt(start);
            var from = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
            var end = arguments[2];
            var relativeEnd = end === undefined ? len : parseInt(end);
            var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
            var count = Math.min(final - from, len - to);

            if (from < to && to < (from + count)) {
                from = from + count - 1;
                to = to + count - 1;
                while (count > 0) {
                    if ( from in O)
                        O[to] = O[from];
                    else
                        delete O[to];
                    from--;
                    to--;
                    count--;
                }
            } else {
                while (count > 0) {
                    if ( from in O)
                        O[to] = O[from];
                    else
                        delete O[to];

                    from++;
                    to++;
                    count--;
                }
            }
            return O;
        },
        indexOf: function (searchElement, fromIndex) {
            if (this === undefined || this === null) {
                throw new TypeError('"this" is null or not defined');
            }
            var length = this.length >>> 0;
            fromIndex = +fromIndex || 0;
            if (Math.abs(fromIndex) === Infinity) {
                fromIndex = 0;
            }
            if (fromIndex < 0) {
                fromIndex += length;
                if (fromIndex < 0) {
                    fromIndex = 0;
                }
            }
            for (; fromIndex < length; fromIndex++) {
                if (this[fromIndex] === searchElement && fromIndex in this) {
                    return fromIndex;
                }
            }
            return -1;
        },
        lastIndexOf: function(searchElement) {
            'use strict';
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var n, k,
                t = Object(this),
                len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            n = len - 1;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) {
                    n = 0;
                }
                else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        },
        map:function(callback, thisArg) {
            var T, A, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            if (thisArg) {
                T = thisArg;
            }
            A = new Array(len);
            k = 0;
            while (k < len) {
                var kValue, mappedValue;
                if (k in O) {
                    var Pk = k.toString();
                    kValue = O[Pk];
                    mappedValue = callback.call(T, kValue, k, O);
                    A[Pk] = mappedValue;
                }
                k++;
            }
            return A;
        },
        reduce:function(callback) {
            'use strict';
            if (null === this || 'undefined' === typeof this) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }
            var t = Object(this), len = t.length >>> 0, k = 0, value;
            if (arguments.length >= 2) {
                value = arguments[1];
            } else {
                while (k < len && !k in t) k++;
                if (k >= len)
                    throw new TypeError('Reduce of empty array with no initial value');
                value = t[ k++ ];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        },
        reduceRight:function(callback) {
            'use strict';
            if (null === this || 'undefined' === typeof this) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }
            var t = Object(this), len = t.length >>> 0, k = len - 1, value;
            if (arguments.length >= 2) {
                value = arguments[1];
            } else {
                while (k >= 0 && !k in t) k--;
                if (k < 0)
                    throw new TypeError('Reduce of empty array with no initial value');
                value = t[ k-- ];
            }
            for (; k >= 0; k--) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        },
        some:function(fun) {
            'use strict';
            if (this === void 0 || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== 'function')
                throw new TypeError();
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(thisArg, t[i], i, t))
                    return true;
            }
            return false;
        }
    }, Array.prototype);

    patch.one((function() {
        var unshift = Array.prototype.unshift;
        return function() {
            unshift.apply(this, arguments);
            return this.length;
        }
    })(), Array.prototype, 'unshift', win._hack.ie68);

    patch.one((function() {
        var join = Array.prototype.join;
        return function(spec) {
            if(typeof spec == 'undefined')
                spec = ',';
            return join.apply(this, [spec]);
        }
    })(), Array.prototype, 'join', win._hack.ie68);
})(this);
// Date
(function(win) {
    var patch = win.patch;

    patch.some({
        now:function() {
            return new Date().getTime();
        }
    }, Date);

    patch.some({
        parse:(function() {
            var REGEX_ISO_8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
            var superParse = Date.parse;
            var localOffset = -(new Date().getTimezoneOffset());
            var localHours = Math.floor(localOffset / 60);
            var localMinutes = localOffset % 60;

            return function(v) {
                var matches = REGEX_ISO_8601.exec(v);
                if(matches) {
                    return Date.UTC(
                        matches[1],
                        (matches[2] || 1) - 1,
                        matches[3] || 1,
                        matches[4] - (matches[8] ? matches[9] ? matches[9] + matches[10] : 0 : localHours) || 0,
                        matches[5] - (matches[8] ? matches[9] ? matches[9] + matches[11] : 0 : localMinutes) || 0,
                        matches[6] || 0,
                        ((matches[7] || 0) + '00').substr(0, 3)
                    );
                }

                return superParse.apply(this, arguments);
            };
        })()
    }, Date, 'parse', win._hack.ie);

    patch.some({
        toISOString:(function() {
            function pad(number) {
                if ( number < 10 ) {
                    return '0' + number;
                }
                return number;
            }
            return function() {
                return this.getUTCFullYear() +
                    '-' + pad(this.getUTCMonth() + 1) +
                    '-' + pad(this.getUTCDate()) +
                    'T' + pad(this.getUTCHours()) +
                    ':' + pad(this.getUTCMinutes()) +
                    ':' + pad(this.getUTCSeconds()) +
                    '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                    'Z';
            };
        })(),
        toJSON:function() {
            return this.toISOString();
        }
    }, Date.prototype);
})(this);
// Function
(function(win) {
    var patch = win.patch;

    patch.one(function(oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    }, Function.prototype, 'bind');
})(this);
// Iterator
(function(win) {
    var patch = win.patch;

    patch.one(function(argv) {
        var _Iterator = function() {
            this.length = 0;
            this.current = 0;

            this.source = arguments[0] || [];
            this.iterator = [];
            for(var key in this.source) {
                if(this.source.hasOwnProperty(key))
                    this.iterator.push([key, this.source[key]]);
            }

            this.length = this.iterator.length;

            this.next = function() {
                var value = this.iterator[this.current];
                if(this.current >= this.length) {
                    throw new Error("stop iterate");
                }
                return [this.current++, value];
                // return {
                // value:value,
                // done:this.current >= this.length
                // };
            };
        };

        return new _Iterator(argv);
    }, win, "Iterator");
})(this);
// JSON
(function(win) {
    var patch = win.patch;

    patch.one({}, win, 'JSON');
    patch.some({
        parse:function(json) {
            return eval("1," + json);
        },
        stringify:(function() {
            var ARRAY_STR = '[object Array]';
            var OBJECT_STR = '[object Object]';
            var STRING_STR = '[object String]';

            function arrayParser(json) {
                var result = '[';
                for(var i=0;i<json.length;i++) {
                    var type = Object.prototype.toString.call(json[i]);
                    if(type == ARRAY_STR) {
                        result += arrayParser(json[i]);
                    }
                    else if(type == OBJECT_STR) {
                        result += objectParser(json[i]);
                    }
                    else if(type == STRING_STR) {
                        result += '"'+json[i]+'"';
                    }
                    else {
                        result += json[i];
                    }
                    if(i < (json.length-1)) {
                        result += ',';
                    }
                }
                result += ']';
                return result;
            }

            function objectParser(json) {
                var result = '{';
                for(var key in json) {
                    if(json.hasOwnProperty(key)) {
                        result += '"'+key+'":';
                        var type = Object.prototype.toString.call(json[key]);
                        if(type == ARRAY_STR) {
                            result += arrayParser(json[key]);
                        }
                        else if(type == OBJECT_STR) {
                            result += objectParser(json[key]);
                        }
                        else if(type == STRING_STR) {
                            result += '"'+json[key]+'"';
                        }
                        else {
                            result += json[key];
                        }
                        result += ',';
                    }
                }
                result = (result.length > 1 ? result.substring(0, result.length - 1) : result) + '}';
                return result;
            }

            return function(json) {
                var result = '';
                var type = Object.prototype.toString.call(json);
                if(type == ARRAY_STR) {
                    return arrayParser(json);
                }
                if(type == OBJECT_STR) {
                    return objectParser(json);
                }
                if(type == STRING_STR) {
                    return '"'+json+'"';
                }
                return result += json, result;
            }
        })()
    }, win.JSON);
})(this);
(function(win) {
    var patch = win.patch;

    patch.one((function() {
        // Plan One: use two hashmaps to store id-value and id-key
        // Plan Two: use array to simulate map, but performance
        var _Map = function() {
            this.__source__ = [];
            this.size = 0;
        };

        return _Map;
    })(), win, "Map");

    patch.some({
        'delete':function(key) {
            var index = this.__source__findIndex(function(item) {
                return item[0] === key;
            });
            if(index >= 0) {
                this.__source__.splice(index, 1);
            }
            this.size = this.__source__.length;
            return this;
        },
        clear:function() {
            this.__source__ = [];
            this.size = 0;
            return this;
        },
        entries:function() {
            return Iterator(this);
        },
        forEach:function(func, argv) {
            this.__source__.forEach(func, argv);
            return this;
        },
        get:function(key) {
            var index = this.__source__.findIndex(function(item) {
                return item[0] === key;
            });
            return index>=0 ? this.__source__[index][1] : undefined;
        },
        has:function(key) {
            return this.__source__.findIndex(function(item) {
                return item[0] === key;
            }) >= 0;
        },
        keys:function() {
            var ite = Iterator(this);
            ite.current = 0;
            ite.next = function _iterator_() {
                var value = this.iterator[this.current++];
                if(this.current > this.length) {
                    throw new Error("stop iterate");
                }
                return {
                    value:value[0],
                    done:this.current >= this.length
                };
            };
            return ite;
        },
        set:function(key, value) {
            var pair = [key, value];
            var index = this.__source__.findIndex(function(item) {
                return item[0] === key;
            });
            if(index >= 0) {
                this.__source__[index] = pair;
            }else {
                this.__source__.push(pair);
            }
            this.size = this.__source__.length;
            return this;
        },
        values:function() {
            var ite = Iterator(this);
            ite.current = 0;
            ite.next = function _iterator_() {
                var value = this.iterator[this.current++];
                if(this.current > this.length) {
                    throw new Error("stop iterate");
                }
                return {
                    value:value[1],
                    done:this.current >= this.length
                };
            };
            return ite;
        }
    }, win.Map.prototype);
})(this);
(function(win) {
    var patch = win.patch;

    patch.some({
        acosh:function(x) {
            return Math.log(x + Math.sqrt(x * x - 1));
        },
        asinh:function(x) {
            return Math.log(x + Math.sqrt(x * x + 1));
        },
        atanh:function(x) {
            return Math.log((1+x)/(1-x)) / 2;
        },
        cbrt:function(x) {
            var y = Math.pow(Math.abs(x), 1/3);
            return x < 0 ? -y : y;
        },
        clz32:function(value) {
            var value = Number(value) >>> 0;
            return value ? 32 - value.toString(2).length : 32;
        },
        cosh:function(x) {
            return (Math.exp(x) + Math.exp(-x)) / 2;
        },
        expm1:function(x) {
            return Math.exp(x) - 1;
        },
        fround:(function() {
            if(typeof win.Float32Array != 'undefined') {
                return function(x) {
                    var f32 = new Float32Array(1);
                    return f32[0] = x, f32[0];
                };
            }else {
                return function(x) {
                    var byteArray = [];
                    var byteString = x.toString(2);
                    var sign = x < 0 ? 1 : 0;
                    var pointIndex = byteString.indexOf('.');
                    var exp = byteString.charAt(0) == '0' ? Math.max(byteString.indexOf('1', pointIndex) - pointIndex, 0) : 0;
                    var sigma = 0;
                    for(var i=Math.max(byteString.indexOf('1'), 0);i<byteString.length && byteArray.length<23;i++) {
                        var ch = byteString.charAt(i);
                        if(ch == '1' || ch == '0') {
                            byteArray.push(ch * 1);
                        }
                    }
                    for(var i=1;i<byteArray.length;i++) {
                        sigma += byteArray[i] * Math.pow(2, -1 * i);
                    }
                    return Math.pow(-1, sign) * (byteArray[0] * 1 + sigma) * Math.pow(2, -1 * exp);
                };
            }
        })(),
        hypot:function() {
            var y = 0;
            var length = arguments.length;

            for (var i = 0; i < length; i++) {
                y += arguments[i] * arguments[i];
            }
            return Math.sqrt(y);
        },
        imul:function(a, b) {
            var ah  = (a >>> 16) & 0xffff;
            var al = a & 0xffff;
            var bh  = (b >>> 16) & 0xffff;
            var bl = b & 0xffff;
            return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
        },
        log10:function(x) {
            return Math.log(x) / Math.LN10;
        },
        log1p:function(x) {
            return Math.log(1 + x);
        },
        log2:function(x) {
            return Math.log(x) / Math.LN2;
        },
        sign:function(x) {
            x = x*1;
            if( +x === x ) {
                return (x === 0) ? x : (x > 0) ? 1 : -1;
            }
            return NaN;
        },
        sinh:function(x) {
            return (Math.exp(x) - Math.exp(-x)) / 2;
        },
        tanh:function(x) {
            if(x == Infinity)
                return 1;
            return  (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
        },
        trunc:function(x) {
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        }

    }, Math);
})(this);
(function(win) {
    var patch = win.patch;

    patch.some({
        EPSILON:2.220446049250313e-16,
        MAX_VALUE:1.7976931348623157e+308,
        MIN_VALUE:5e-324,
        MAX_SAFE_VALUE:9007199254740992,
        MIN_SAFE_VALUE:-9007199254740992,
        NEGATIVE_INFINITY:-Infinity,
        POSITIVE_INFINITY:Infinity,
        "NaN":NaN,
        isFinite:function(val) {
            if(typeof val == 'number') {
                return win.isFinite(val);
            }
            return false;
        },
        isInteger:function isInteger (val) {
            return typeof val === "number" && isFinite(val) && val > Number.MIN_SAFE_VALUE && val < Number.MAX_SAFE_VALUE && Math.floor(val) === val;
        },
        isNaN:isNaN,
        parseFloat:parseFloat,
        parseInt:parseInt,
        toInteger:function(val) {
            return val | 0;
        }
    }, Number);
})(this);
(function(win) {
    var patch = win.patch;

    patch.some({
        seal:function(obj) {
            return obj;
        },
        freeze:function(obj) {
            return obj;
        },
        preventExtensions:function(obj) {
            return obj;
        },
        isSealed:function(obj) {
            return false;
        },
        isFrozen:function(obj) {
            return false;
        },
        setPrototypeOf:function(obj, proto) {
            obj.__proto__ = proto;
            return obj;
        },
        is:function(v1, v2) {
            if (v1 === 0 && v2 === 0) {
                return 1 / v1 === 1 / v2;
            }
            if (v1 !== v1) {
                return v2 !== v2;
            }
            return v1 === v2;
        },
        create:(function() {
            var createEmpty;
            var hasProto = !({__proto__:null} instanceof Object);
            if(hasProto || typeof document === 'undefined') {
                createEmpty = function() {
                    return {'__proto__':null};
                };
            }else {
                createEmpty = function() {
                    var iframe = document.createElement('iframe');
                    var parent = document.body || document.documentElement;
                    iframe.style.display = "none";
                    parent.appendChild(iframe);
                    iframe.src = "javascript:;";
                    var empty = iframe.contentWindow.Object.prototype;
                    parent.removeChild(iframe);
                    iframe = null;

                    delete empty.constructor;
                    delete empty.hasOwnProperty;
                    delete empty.proprtyIsEnumerable;
                    delete empty.isPrototypeOf;
                    delete empty.toLocaleString;
                    delete empty.toString;
                    delete empty.valueOf;
                    empty.__proto__ = null;

                    function Empty() {};
                    Empty.prototype = empty;

                    createEmpty = function() {
                        return new Empty();
                    }
                    return new Empty();
                };
            }

            return function(prototype, properties) {
                var object;
                function Type() {}
                if(prototype === null) {
                    object = createEmpty();
                }else {
                    if(typeof prototype !== 'object' && typeof prototype !== 'function') {
                        throw new Error('prototype must be an Object');
                    }
                    Type.prototype = prototype;
                    object = new Type();
                    object.__proto__ = prototype;
                }

                if(properties !== void 0) {
                    patches(properties, object);
                }
                return object;
            }
        })(),
        getOwnPropertyNames:function(instance) {
            var result = [];
            for(var key in instance) {
                if(instance.hasOwnProperty(key)) {
                    result.push(key);
                }
            }
            return result;
        },
        getPrototypeOf:(function() {
            if(typeof "test".__proto__ == 'object') {
                return function(instance) {
                    return instance.__proto__;
                };
            }else {
                return function(instance) {
                    return instance.constructor.prototype;
                };
            }
        })()
    }, Object);

    patch.one((function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString : null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if ( typeof obj !== 'object' && ( typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for ( i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    })(), Object, 'keys');

    patch.one((function() {
        var _Proxy;
        _Proxy = function () {

        };

        return _Proxy;
    })(), win, 'Proxy');
})(this);
(function(win) {
    var patch = win.patch;

    patch.one((function() {
        var _Promise = function(handler) {
            var queue = [];

            function next(i, val) {
                setTimeout(function() {
                    while (queue.length) {
                        var arr = queue.shift()
                        if (typeof arr[i] === 'function') {
                            // try {
                            var chain = arr[i](val)
                            // } catch (e) {
                            //     return reject(e)
                            // }
                            if (chain && typeof chain.then === 'function') {
                                return chain.then(resolve, reject)
                            } else {
                                return _Promise.resolve(chain).then(resolve, reject)
                            }
                        }
                    }
                }, 1);
            }

            function resolve(value) {
                next(0, value);
            }

            function reject(message) {
                next(1, message);
            }

            handler(resolve, reject);

            this.then = function(resolve, reject) {
                queue.push([resolve, reject]);
                return this;
            };
            this.chain = this.then;

            this['catch'] = function(reject) {
                return this.then(undefined, reject);
            };
        };

        _Promise.deferred = function() {
            var result = [];
            result.promise = new _Promise(function(resolve, reject) {
                result.resolve = resolve;
                result.reject = reject;
            });
            return result;
        };

        _Promise.resolve = _Promise.cast = function(value) {
            return new _Promise(function(resolve) {
                resolve(value)
            });
        };

        _Promise.reject = function(message) {
            return new _Promise(function(resolve, reject) {
                reject(message);
            });
        };

        _Promise.all = function(values) {
            var defer = _Promise.deferred();
            var len = values.length;
            var result = [];

            function resolve(value, i) {
                result[i] = value;
                len--;

                if(len == 0) {
                    defer.resolve(result);
                }
            }

            function reject(message) {
                defer.reject(message);
            }

            values.forEach(function(item, i) {
                if(!(item instanceof _Promise)) {
                    resolve(item, i);
                    return;
                }

                item.then(function(value) {
                    resolve(value, i);
                }, function(message) {
                    reject(message);
                });
            });

            return defer.promise;
        };

        _Promise.race = function(values) {
            var defer = _Promise.deferred();
            var first = true;

            function resolve(value, i) {
                if(first) {
                    defer.resolve(value);
                    first = false;
                }
            }

            function reject(message) {
                if(first) {
                    defer.reject(message);
                    first = false;
                }
            }

            values.forEach(function(item, i) {
                if(!(item instanceof _Promise)) {
                    resolve(item, i);
                    return;
                }

                item.then(function(value) {
                    resolve(value, i);
                }, function(message) {
                    reject(message);
                });
            });

            return defer.promise;
        };

        return _Promise;
    })(), win, 'Promise');

    patch.some({
        defer:win.Promise.deferred
    }, win.Promise);
})(this);
(function(win) {
    var patch = win.patch;

    patch.one((function() {
        var _Set = function() {
            this.__source__ = [];
            this.size = 0;
        };

        patch.some({
            'delete':function(key) {
                var index = this.__source__findIndex(function(item) {
                    return item === key;
                });
                if(index >= 0) {
                    this.__source__.splice(index, 1);
                }
                this.size = this.__source__.length;
                return this;
            },
            clear:function() {
                this.__source__ = [];
                this.size = 0;
                return this;
            },
            entries:function() {
                return Iterator(this);
            },
            forEach:function(func, argv) {
                this.__source__.forEach(func, argv);
                return this;
            },
            has:function(key) {
                return this.__source__.findIndex(function(item) {
                    return item === key;
                }) >= 0;
            },
            add:function(value) {
                this.__source__.push(value);
                return this;
            },
            values:function() {
                var ite = Iterator(this);
                ite.current = 0;
                ite.next = function _iterator_() {
                    var value = this.iterator[this.current++];
                    if(this.current > this.length) {
                        throw new Error("stop iterate");
                    }
                    return {
                        value:value,
                        done:this.current >= this.length
                    };
                };
                return ite;
            }
        }, _Set.prototype);

        return _Set;
    })(), win, 'Set');

    patch.some({
        codePointAt:function(position) {
            'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            var size = string.length;

            var index = position ? Number(position) : 0;
            if (index != index) { // better `isNaN`
                index = 0;
            }
            if (index < 0 || index >= size) {
                return undefined;
            }

            var first = string.charCodeAt(index);
            var second;
            if ( first >= 0xD800 && first <= 0xDBFF && size > index + 1 ) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
            }
            return first;
        },
        contains:function() {
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        },
        endsWith:(function() {
            'use strict';
            var toString = {}.toString;
            return function endsWith(search) {
                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                if (search && toString.call(search) == '[object RegExp]') {
                    throw TypeError();
                }
                var stringLength = string.length;
                var searchString = String(search);
                var searchLength = searchString.length;
                var pos = stringLength;
                if (arguments.length > 1) {
                    var position = arguments[1];
                    if (position !== undefined) {
                        // `ToInteger`
                        pos = position ? Number(position) : 0;
                        if (pos != pos) { // better `isNaN`
                            pos = 0;
                        }
                    }
                }
                var end = Math.min(Math.max(pos, 0), stringLength);
                var start = end - searchLength;
                if (start < 0) {
                    return false;
                }
                var index = -1;
                while (++index < searchLength) {
                    if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                        return false;
                    }
                }
                return true;
            };
        })(),
        repeat:function(count) {
            if(typeof count != 'number') {
                throw new TypeError();
            }
            if(!isFinite(count) || count < 0) {
                throw new RangeError();
            }
            count = count | 0;

            var result = "";
            for(var i=0;i<count;i++) {
                result += this.toString();
            }
            return result;
        },
        startsWith:function(search) {
            var toString = {}.toString;
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            if (search && toString.call(search) == '[object RegExp]') {
                throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            var pos = position ? Number(position) : 0;
            if (pos != pos) {
                pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            if (searchLength + start > stringLength) {
                return false;
            }
            var index = -1;
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                    return false;
                }
            }
            return true;
        },
        trim:function() {
            return this.trimLeft().trimRight();
        },
        trimLeft:function() {
            return this.replace(/^\s+/g, '');
        },
        trimRight:function() {
            return this.replace(/\s+$/g, '');
        }
    }, String.prototype);

    patch.some({
        fromCodePoint: (function() {
            var stringFromCharCode = String.fromCharCode;
            var floor = Math.floor;
            return function fromCodePoint() {
                var MAX_SIZE = 0x4000;
                var codeUnits = [];
                var highSurrogate;
                var lowSurrogate;
                var index = -1;
                var length = arguments.length;
                if (!length) {
                    return '';
                }
                var result = '';
                while (++index < length) {
                    var codePoint = Number(arguments[index]);
                    if (
                        !isFinite(codePoint) ||
                            codePoint < 0 ||
                            codePoint > 0x10FFFF ||
                            floor(codePoint) != codePoint
                        ) {
                        throw RangeError('Invalid code point: ' + codePoint);
                    }
                    if (codePoint <= 0xFFFF) {
                        codeUnits.push(codePoint);
                    } else {
                        codePoint -= 0x10000;
                        highSurrogate = (codePoint >> 10) + 0xD800;
                        lowSurrogate = (codePoint % 0x400) + 0xDC00;
                        codeUnits.push(highSurrogate, lowSurrogate);
                    }
                    if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                        result += stringFromCharCode.apply(null, codeUnits);
                        codeUnits.length = 0;
                    }
                }
                return result;
            };
        })()
    }, String);
})(this);
patches({
    unique:function() {
        for(var i=0;i<this.length;i++) {
            var it = this[i];
            for(var j=this.length - 1;j>i;j--) {
                if(this[j] == it) {
                    this.splice(j, 1);
                }
            }
        }
        return this;
    },
    max:function() {
        return this.reduce(function(prep, next) {
            return prep > next ? prep : next;
        });
    },
    min:function() {
        return this.reduce(function(prep, next) {
            return prep < next ? prep : next;
        });
    },
    // a new array contain the key
    pluck:function(key) {
        var result = [];
        this.forEach(function(item) {
            if(item.hasOwnProperty(key)) {
                result.push(item[key]);
            }
        });
        return result;
    },
    group:function(key) {
        var result = {};
        this.pluck(key).forEach(function(item) {
            if(item.hasOwnProperty(key)) {
                if(!result.hasOwnProperty(item[key])) {
                    result[item[key]] = [];
                }
                result[item[key]].push(item);
            }
        });
        return result;
    },
    // all in a array
    flatten:function() {
        return this.reduce(function(prep, next) {
            if(!prep.is("Array")) {
                prep = [prep];
            }
            if(next.is("Array")) {
                next = next.flatten();
            }
            return prep.concat(next);
        });
    },
    contain:function(item) {
        for(var i=0;i<this.length;i++) {
            if(this[i] === item)
                return true;
        }
        return false;
    },
    // random get the len data
    sample:function(len) {
        len = len * 1 || 1;
        var data = [].concat(this),result = [];
        len = len > data.length ? data.length : len;
        while(len > 0) {
            var rand = Number.random(0, data.length);
            data.swap(rand, data.length - 1);
            result.push(data.pop());
        }

        return result;
    },
    // random all data
    shuffle:function() {
        return this.sample(this.length);
    },
    eq:function(index) {
        return this[index];
    },
    compact:function() {
        return this.filter(function(item) {
            return !!item;
        });
    },
    swap:function(pos1, pos2) {
        var temp = this[pos1];
        this[pos1] = this[pos2];
        this[pos2] = temp;
        return this;
    },
    first:function() {
        return this[0];
    },
    last:function() {
        return this[this.length - 1 > -1 ? this.length - 1 : 0];
    }
}, Array.prototype);
patches({
    getDaysInMonth:function(year, month) {
        return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    compare:function(date1, date2) {
        if(isNaN(date1) || isNaN(date2))
            throw new TypeError(date1 + "-" + date2);

        if(date1 instanceof Date && date2 instanceof Date) {
            if(date1 < date2) {
                return -1;
            }
            else if(date1 > date2) {
                return 1;
            }else {
                return 0;
            }
        }else {
            throw new TypeError(date1 + "-" + date2);
        }
    },
    equal:function(date1, date2) {
        return !(Date.compare(date1, date2));
    },
    today:function() {
        return new Date().clearTime();
    },
    isLeapYear:function(year) {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }
}, Date);

patches({
    clearTime:function() {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    },
    clone:function() {
        return new Date(this.getTime());
    },
    compareTo:function(target) {
        return Date.compare(this, target);
    },
    isEqual:function(target) {
        return Date.equal(this, target);
    },
    isAfter:function(target) {
        return Date.compare(this, target) > 0;
    },
    isBefore:function(target) {
        return Date.compare(this, target) < 0;
    },
    getWeek:function() {
        var a, b, c, d, e, f, g, n, s, w;
        var $y, $m, $d;

        $y = (!$y) ? this.getFullYear() : $y;
        $m = (!$m) ? this.getMonth() + 1 : $m;
        $d = (!$d) ? this.getDate() : $d;

        if ($m <= 2) {
            a = $y - 1;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = 0;
            f = $d - 1 + (31 * ($m - 1));
        } else {
            a = $y;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = s + 1;
            f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
        }

        g = (a + b) % 7;
        d = (f + g - e) % 7;
        n = (f + 3 - d) | 0;

        if (n < 0) {
            w = 53 - ((g - s) / 5 | 0);
        } else if (n > 364 + s) {
            w = 1;
        } else {
            w = (n / 7 | 0) + 1;
        }

        $y = $m = $d = null;

        return w;
    },
    addSeconds:function(value) {
        this.setSeconds(this.getSeconds() + value);
        return this;
    },
    addMinutes:function(value) {
        return this.addSeconds(value * 60);
    },
    addHours:function(value) {
        return this.addMinutes(value * 60);
    },
    addDays:function(value) {
        return this.addHours(value * 24);
    },
    addWeeks:function(value) {
        return this.addDays(value * 7);
    },
    addMonths:function(value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value * 1);
        this.setDate(Math.min(n, Date.getDaysInMonth(this.getFullYear(), this.getMonth())));
        return this;
    },
    addYears:function(value) {
        return this.addMonths(value * 12);
    },
    add:function(config) {
        if (typeof config == "number") {
            return this;
        }

        var x = config;

        if (x.seconds) {
            this.addSeconds(x.seconds);
        }
        if (x.minutes) {
            this.addMinutes(x.minutes);
        }
        if (x.hours) {
            this.addHours(x.hours);
        }
        if (x.weeks) {
            this.addWeeks(x.weeks);
        }
        if (x.months) {
            this.addMonths(x.months);
        }
        if (x.years) {
            this.addYears(x.years);
        }
        if (x.days) {
            this.addDays(x.days);
        }
        return this;
    }
}, Date.prototype);
// debounce
// throttle
// cut
// timeout
// interval
// defer
patches({
    memoize:function(hasher) {
        var mem = {};
        var _this = this;
        hasher = hasher || function(obj) {
            return obj;
        };

        return function() {
            var key = hasher.apply(this, arguments);
            return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : (mem[key] = _this.apply(this, arguments));
        };
    },
    debounce:function(time) {
        var callback = this,cid;
        return function() {
            cid = this.__debounce_id__;
            clearTimeout(cid);
            this.__debounce_id__ = callback.timeout(time);
            return this;
        };
    },
    throttle:function(time) {
        var callback = this,cid;
        return function() {
            var _this = this;
            cid = _this.__throttle_id__;
            if(!cid) {
                _this.__throttle_id__ = callback.cut({
                    after:function() {
                        _this.__throttle_id__ = 0;
                    }
                }).timeout(time);
            }
            return this;
        };
    },
    cut:function(option) {
        var callback = this;
        return function() {
            option && option.before && option.before.call(null);
            callback.apply(null, arguments);
            option && option.after && option.after.call(null);
        };
    },
    timeout:function(time) {
        return setTimeout(this, time);
    },
    interval:function(time) {
        return setInterval(this, time);
    },
    defer:function() {
        return this.timeout(1);
    },
    singleton:function() {
        if(typeof this.__initialize__ == 'undefined') {
            var args = arguments || [];
            this.__initialize__ = this.apply(null, args);
        }

        return this.__initialize__;
    }
}, Function.prototype);
// guid
// step

// isNaN
// isFinite
// isZero
// pretty
// fill
// clearTimeout
// clearInterval
// between

var prettyNumber = function(value, decimal, spacer) {
    spacer = spacer || ',';
    decimal = decimal || 2;

    var result = "";
    if(value.isNaN() || value.isFinite()) {
        result = "N/A";
    }else {
        var temp = value.valueOf().toFixed(decimal);
        var decimalString = decimal ? temp.substring(temp.indexOf('.')): "";
        var intPart = parseInt(value, 10);
        var counter = 1000;

        result = [];
        while(intPart >= counter) {
            var item = intPart % counter;
            result.unshift(item.fill(3));
            intPart = (intPart - item) / counter;
        }
        if(intPart) {
            result.unshift(intPart);
        }

        result = result.join(spacer);
        result += decimalString;
    }
    return result;
};

var prettyTime = function(value, texts) {
    texts = texts || ['s', 'm', 'h', 'd'];
    var now = Date.now();
    var diff = Math.abs(Math.round((now - value)/1000));

    var data = [
        diff % 60,
        Math.floor((diff%3600)/60),
        Math.floor((diff%86400)/3600),
        Math.floor(diff/86400)
    ];

    if(data[4] > 3) {
        data[4] = 3;
    }

    while(data.length && typeof data[data.length-1] != 'undefined') {
        if(data[data.length-1] <= 0) {
            data.splice(data.length-1, 1);
        }else {
            break;
        }
    }

    var result = "";
    data.forEach(function(item, i) {
        result = item + texts[i] + result;
    });

    return result;
};

var prettyTraffic = function(value, texts) {
    texts = texts || ['b', 'kb', 'mb', 'gb', 'tb'];

    var data = [];
    for(var i=0;i<texts.length;i++) {
        data.push(Math.round(value / Math.pow(1000, i)));
    }

    var result = "0" + texts[0];
    while(data.length && typeof data[data.length-1] != 'undefined') {
        if(data[data.length -1] > 0) {
            result = data[data.length -1] + texts[data.length-1];
            break;
        }
        data.pop();
    }

    return result;
};

patches({
    min:function(target) {
        return Math.min(this, target);
    },
    max:function(target) {
        return Math.max(this, target);
    },
    step:function(to, func) {
        var min = this.min(to);
        var max = this.max(to);

        if(func && typeof func == 'function') {
            for(var i=min;i<=max;i++) {
                func.call(this, i);
            }
        }

        return this;
    },
    isNaN:function() {
        return Number.isNaN(this);
    },
    isFinite:function() {
        return Number.isFinite(this);
    },
    isZero:function() {
        return this.isNaN() || this.isFinite() || !!this.valueOf();
    },
    pretty:function(type) {
        // number, time, traffic
        var args = [this];

        for(var i=1;i<arguments.length;i++) {
            args.push(arguments[i]);
        }

        type = type || 'number';

        var result = this.toString();
        switch(type) {
            case "number":result = prettyNumber.apply(null, args);break;
            case "time":result = prettyTime.apply(null, args);break;
            case "traffic":result = prettyTraffic.apply(null, args);break;
        }

        return result;
    },
    fill:function(len, prefix) {
        prefix = prefix || '0';
        var result = this.toString();
        while(result.length < len) {
            result = prefix + result;
        }
        return result;
    },
    clearTimeout:function() {
        return clearTimeout(this);
    },
    clearInterval:function() {
        return clearInterval(this);
    },
    isBetween:function(min, max) {
        var real_min = min.min(max);
        var real_max = min.max(max);
        return this >= real_min && this <= real_max;
    }
}, Number.prototype);

patches({
    guid:function(len) {
        var str = "", len = len || 32;
        while(len--) {
            str += Math.floor(Math.random()*16).toString(16);
        }
        return str;
    },
    unique:function(prefix) {

    },
    step:function(from, to, func) {
        return from.step(to, func);
    },
    random:function(min, max) {
        min = min || 0;
        max = max || 0;
        var real_min = min.min(max);
        var real_max = min.max(max);
        return Math.floor(real_min + Math.random() * (real_max - real_min));
    }
}, Number);

// extend
// into
// defaults
// serialize
var eq = function(a, b, aStack, bStack) {
    if (a === b)
        return a !== 0 || 1 / a == 1 / b;
    if (a == null || b == null)
        return a === b;
    var className = Object.prototype.toString.call(a);
    if (className != Object.prototype.toString.call(b))
        return false;

    switch (className) {
        case '[object String]':
            return a == String(b);
        case '[object Number]':
            return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
            return +a == +b;
        case '[object RegExp]':
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
    }
    if ( typeof a != 'object' || typeof b != 'object')
        return false;
    var length = aStack.length;
    while (length--) {
        if (aStack[length] == a)
            return bStack[length] == b;
    }
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && ( aCtor instanceof aCtor) && _.isFunction(bCtor) && ( bCtor instanceof bCtor)) && ('constructor' in a && 'constructor' in b)) {
        return false;
    }
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    if (className == '[object Array]') {
        size = a.length;
        result = size == b.length;
        if (result) {
            while (size--) {
                if (!( result = eq(a[size], b[size], aStack, bStack)))
                    break;
            }
        }
    } else {
        for (var key in a) {
            if (a.hasOwnProperty(key)) {
                size++;
                if (!( result = b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack)))
                    break;
            }
        }
        if (result) {
            for (key in b) {
                if (b.hasOwnProperty(key) && !(size--))
                    break;
            }
            result = !size;
        }
    }
    aStack.pop();
    bStack.pop();
    return result;
};

patches({
    is:function(type) {
        return Object.prototype.toString.call(this) == '[object ' + type + ']';
    },
    isEmpty:function() {
        if(this.is('Object')) {
            for(var key in this) {
                if(this.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
        else if(this.hasOwnProperty('length')) {
            if(!this.length) {
                return true;
            }
            return false;
        }

        return !!this.toString();
    },
    clone:function() {
        var objClone;
        if (this.constructor == Object){
            objClone = new this.constructor();
        }else{
            objClone = new this.constructor(this.valueOf());
        }
        for(var key in this){
            if ( objClone[key] != this[key] ){
                if ( typeof(this[key]) == 'object' ){
                    objClone[key] = this[key].clone();
                }else{
                    objClone[key] = this[key];
                }
            }
        }
        objClone.valueOf = this.valueOf;
        return objClone;
    },
    equal:function(desc) {
        return eq(this, desc, [], []);
    },
    extend:function(desc) {
        var Constructor = function(obj) {
            if(obj !== undefined) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key)) {
                        this[key] = obj[key];
                    }
                }
            }
        };

        Constructor.create = function(obj) {
            return new this(obj);
        };
        Constructor.extend = this.extend;
        Constructor.prototype = new this(desc);
        Constructor.prototype.constructor = Constructor;

        return Constructor;
    },
    into:function(desc) {
        desc.merge(this);
        return this;
    },
    merge:function(desc) {
        for(var key in desc) {
            if(desc.hasOwnProperty(key)) {
                this[key] = desc;
            }
        }
        return this;
    },
    serialize:function(pairsDelimeter, pairDelimeter) {
        pairsDelimeter = pairsDelimeter || ",";
        pairDelimeter = pairDelimeter || "=";

        var pairs = [];
        for(var key in this) {
            if(this.hasOwnProperty(key)) {
                pairs.push(key + pairDelimeter + this[key]);
            }
        }

        return pairs.join(pairsDelimeter);
    }
}, Object.prototype);
patches({
    toCamelCase:function() {
        var result = this.trim().replace(/(\-|_|\s)+(.)?/g, function(match, sep, c) {
            return c ? c.toUpperCase() : '';
        });
    },
    isEmpty:function() {
        return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
    },
    repeat:function(count) {
        return new this.constructor(new Array(count + 1).join(this.toString()));
    },
    parse:function(pairsDelimeter, pairDelimeter) {
        var pairs = this.split(pairsDelimeter);
        var result = {};
        pairs.forEach(function(pair) {
            var query = pair.split(pairDelimeter);
            result[query[0]] = query[1];
        });
        return result;
    },
    byteslength:function() {
        var matches = this.match(/[^\x00-\xff]/g);
        return this.length + (!matches ? 0 : matches.length);
    },
    lines:function() {
        return this.replaceAll('\r\n', '\n').s.split('\n');
    },
    truncate:function(length, suffix) {
        var str = this;

        length = ~~length;
        suffix = suffix || '...';

        if (str.length <= length) return new this.constructor(str);

        var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
            template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

        if (template.slice(template.length-2).match(/\w\w/))
            template = template.replace(/\s*\S+$/, '');
        else
            template = template.slice(0, template.length-1).trimRight();

        return (template+suffix).length > str.length ? str : str.slice(0, template.length)+suffix;
    },
    pad:function(len, fix, type) {
        fix = fix || ' ';
        type = type || 'left';
        var result = this.toString();
        if(this.length > len) {
            return result;
        }
        len = len - this.length;
        var left = new Array((type == 'left' ? len : (type == 'right' ? 0 : Math.ceil(len / 2))) + 1).join(fix);
        var right = new Array((type == 'left' ? 0 : (type == 'right' ? len : Math.floor(len/ 2))) + 1).join(fix);
        return left + result + right;
    },
    lpad:function(len, fix) {
        return this.pad(len, fix, 'left');
    },
    rpad:function(len, fix) {
        return this.pad(len, fix, 'right');
    },
    lrpad:function(len, fix) {
        return this.pad(len, fix, 'center');
    },
    strip:function() {
        var result = this.toString();
        for(var i = 0;i<arguments.length;i++) {
            result = result.split(arguments[i]).join('');
        }
        return result;
    },
    wrapHTML:function(tag, opt) {
        var result = this.toString();
        var el = tag ? tag : 'span';
        var attrs = '';
        if(typeof opt == 'object') {
            for(var key in opt) {
                if(opt.hasOwnProperty(key)) {
                    attrs += ' ' + key + '="' + opt[key].escapeHTML() + '"';
                }
            }
        }
        result = '<' + el + ' ' + attrs + '>' + result + '</' + el + '>';
        return result;
    },
    escapeHTML:function() {
        var escapeChar = {
            '<':"lt",
            '>':"gt",
            '"':"quot",
            "'":"apos",
            '&':"amp"
        };
        return this.replace(/[&<>'"]/g, function(match) {
            return '&' + escapeChar[match] + ';';
        });
    }

}, String.prototype);


});