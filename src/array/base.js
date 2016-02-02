(function(win) {
    var patch = win.patch;

    patch.some({
        'of':function() {
            return Array.prototype.slice.call(arguments);
        },
        isArray:function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        },
        from:(function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = Number.toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            return function from(arrayLike/*, mapFn, thisArg */) {
                var C = this;

                var items = Object(arrayLike);

                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }

                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }
                var len = toLength(items.length);
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                var k = 0;
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                A.length = len;
                return A;
            };
        }())
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