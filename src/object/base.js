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