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