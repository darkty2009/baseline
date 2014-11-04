// extend
// into
// defaults
// serialize
var eq = function(a, b, aStack, bStack) {
    if (a === b)
        return a !== 0 || 1 / a == 1 / b;
    if (a == null || b == null)
        return a === b;
    var className = Object.prototype.toString.call(a);
    if (className != Object.prototype.toString.call(b))
        return false;

    switch (className) {
        case '[object String]':
            return a == String(b);
        case '[object Number]':
            return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
            return +a == +b;
        case '[object RegExp]':
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
    }
    if ( typeof a != 'object' || typeof b != 'object')
        return false;
    var length = aStack.length;
    while (length--) {
        if (aStack[length] == a)
            return bStack[length] == b;
    }
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && ( aCtor instanceof aCtor) && _.isFunction(bCtor) && ( bCtor instanceof bCtor)) && ('constructor' in a && 'constructor' in b)) {
        return false;
    }
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    if (className == '[object Array]') {
        size = a.length;
        result = size == b.length;
        if (result) {
            while (size--) {
                if (!( result = eq(a[size], b[size], aStack, bStack)))
                    break;
            }
        }
    } else {
        for (var key in a) {
            if (a.hasOwnProperty(key)) {
                size++;
                if (!( result = b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack)))
                    break;
            }
        }
        if (result) {
            for (key in b) {
                if (b.hasOwnProperty(key) && !(size--))
                    break;
            }
            result = !size;
        }
    }
    aStack.pop();
    bStack.pop();
    return result;
};

patches({
    is:function(type) {
        return Object.prototype.toString.call(this) == '[object ' + type + ']';
    },
    isEmpty:function() {
        if(this.is('Object')) {
            for(var key in this) {
                if(this.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
        else if(this.hasOwnProperty('length')) {
            if(!this.length) {
                return true;
            }
            return false;
        }

        return !!this.toString();
    },
    clone:function() {
        var objClone;
        if (this.constructor == Object){
            objClone = new this.constructor();
        }else{
            objClone = new this.constructor(this.valueOf());
        }
        for(var key in this){
            if ( objClone[key] != this[key] ){
                if ( typeof(this[key]) == 'object' ){
                    objClone[key] = this[key].clone();
                }else{
                    objClone[key] = this[key];
                }
            }
        }
        objClone.valueOf = this.valueOf;
        return objClone;
    },
    equal:function(desc) {
        return eq(this, desc, [], []);
    },
    extend:function(desc) {
        var Constructor = function(obj) {
            if(obj !== undefined) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key)) {
                        this[key] = obj[key];
                    }
                }
            }
        };

        Constructor.create = function(obj) {
            return new this(obj);
        };
        Constructor.extend = this.extend;
        Constructor.prototype = new this(desc);
        Constructor.prototype.constructor = Constructor;

        return Constructor;
    },
    into:function(desc) {
        desc.merge(this);
        return this;
    },
    merge:function(desc) {
        for(var key in desc) {
            if(desc.hasOwnProperty(key)) {
                this[key] = desc;
            }
        }
        return this;
    },
    serialize:function(pairsDelimeter, pairDelimeter) {
        pairsDelimeter = pairsDelimeter || ",";
        pairDelimeter = pairDelimeter || "=";

        var pairs = [];
        for(var key in this) {
            if(this.hasOwnProperty(key)) {
                pairs.push(key + pairDelimeter + this[key]);
            }
        }

        return pairs.join(pairsDelimeter);
    }
}, Object.prototype);