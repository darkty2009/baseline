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