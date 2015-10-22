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

    if(isIE68) {
        Object.defineProperty = (function() {
            var prototypeFallback = Object.prototype;
            var ERR_NON_OBJECT_DESC = 'Porperty desc must be an object.';
            var ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object.';
            var ERR_ACCESSORS_NOT_SUPPORTED = 'getters & setters can not be defined on this javascript engine.';

            var defineGetter;
            var defineSetter;
            var lookupGetter;
            var lookupSetter;
            var supportsAccessors = !!Object.prototype.hasOwnProperty;
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
        })();
    }

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