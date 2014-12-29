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