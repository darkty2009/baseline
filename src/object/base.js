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
        var prototypeFallback = Object.prototype;
        var ERR_NON_OBJECT_DESC = 'Porperty desc must be an object.';
        var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object.';
        var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine.';

        var defineGetter;
        var defineSetter;
        var lookupGetter;
        var lookupSetter;
        var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
        var call = Function.prototype.call;
        if (supportsAccessors) {
            defineGetter = call.bind(prototypeFallback.__defineGetter__);
            defineSetter = call.bind(prototypeFallback.__defineSetter__);
            lookupGetter = call.bind(prototypeFallback.__lookupGetter__);
            lookupSetter = call.bind(prototypeFallback.__lookupSetter__);
        }

        return function(object, property, desc) {
            if(object === null || (typeof object != 'object' && typeof object != 'function')) {
                throw new Error(ERR_NON_OBJECT_TARGET);
            }
            if(desc === null || (typeof desc != 'object' && typeof desc != 'function')) {
                throw new Error(ERR_NON_OBJECT_DESC);
            }

            if('value' in desc) {
                if(supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
                    var prototype = object.__proto__;
                    object.__proto__ = prototypeFallback;
                    delete object[property];
                    object[property] = desc.value;
                    object.__proto__ = prototype;
                }else {
                    object[property] = desc.value;
                }
            }else {
                if(!supportsAccessors && (('get' in desc) || ('set' in desc))) {
                    throw new Error(ERR_ACCESSORS_NOT_SUPPORTED);
                }

                if('get' in desc) {
                    defineGetter(object, property, desc.get);
                }

                if('set' in desc) {
                    defineSetter(object, property, desc.set);
                }
            }

            return object;
        };
    })(), Object, 'defineProperty', win._hack.ie68);

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

    patch.one((function() {
        var _Float32Array = function (array) {
            if (typeof array === 'number') {
                this.length = array;
            } else if ('length' in array) {
                this.length = array.length;
                for (var i = 0, len = array.length; i < len; i++) {
                    this[i] = +array[i];
                }
            }
        };

        _Float32Array.prototype = [];
        return _Float32Array;
    })(), win, 'Float32Array');
})(this);