var isIE=!!window.ActiveXObject;
var isIE6=isIE&&!window.XMLHttpRequest;
var isIE8=isIE&&!!document.documentMode;
var isIE7=isIE&&!isIE6&&!isIE8;
var isIE68 = isIE6 || isIE7 || isIE8;

window.bs_patch = (function() {
    // IE8 window.hasOwnProperty
    window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty;

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
var patch = window.bs_patch;

window.bs_patches = function(impl, obj) {
    for(var key in impl) {
        if(impl !== window && impl.hasOwnProperty(key)) {
            patch(impl[key], obj, key);
        }
    }
}
var patches = window.bs_patches;