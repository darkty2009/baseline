patches({
    watch:(function() {
        return function(key, handler) {
            var _this = this;
            var oldVal = this[key], newVal = oldVal,
                getter = function() {
                    return newVal;
                },
                setter = function(val) {
                    oldval = newVal;
                    newVal = handler.call(_this, key, oldVal, val);
                    return newVal;
                };

            // key is writable
            if(key in _this && delete _this[key] && Object.defineProperty) {
                _this = Object.defineProperty(_this, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }

            return _this;
        }
    })(),
    unwatch:function(key) {
        if(Object.defineProperty) {
            var val = this[key];
            delete this[key];
            this[key] = val;
        }
        return this;
    }
}, Object.prototype);

patches({
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
        var F = function() {};
        return function(o) {
            if (arguments.length > 1) {
                throw Error('Second argument not supported');
            }
            if (o === null) {
                throw Error('Cannot set a null [[Prototype]]');
            }
            // if ( typeof o != 'object') {
            // throw TypeError('Argument must be an object');
            // }
            F.prototype = o;
            return new F();
        };
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

patch((function() {
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

patch((function() {
    var _Proxy;
    _Proxy = function () {

    };

    return _Proxy;
})(), window, 'Proxy');