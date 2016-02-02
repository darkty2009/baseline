(function(win) {
    var patch = win.patch;

    patch.some({
        EPSILON:2.220446049250313e-16,
        MAX_VALUE:1.7976931348623157e+308,
        MIN_VALUE:5e-324,
        MAX_SAFE_VALUE:9007199254740991,
        MIN_SAFE_VALUE:-9007199254740991,
        NEGATIVE_INFINITY:-Infinity,
        POSITIVE_INFINITY:Infinity,
        "NaN":NaN,
        isSafeInteger:function(val) {
            return Number.isInteger(val) && val >= Number.MIN_SAFE_VALUE && val <= Number.MAX_SAFE_VALUE;
        },
        isFinite:function(val) {
            if(typeof val == 'number') {
                return win.isFinite(val);
            }
            return false;
        },
        isInteger:function isInteger (val) {
            return typeof val === "number" && isFinite(val) && Math.floor(val) === val;
        },
        isNaN:isNaN,
        parseFloat:parseFloat,
        parseInt:parseInt,
        toInteger:function(val) {
            return val | 0;
        }
    }, Number);
})(this);