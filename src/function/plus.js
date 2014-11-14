// debounce
// throttle
// cut
// timeout
// interval
// defer
patches({
    memoize:function(hasher) {
        var mem = {};
        var _this = this;
        hasher = hasher || function(obj) {
            return obj;
        };

        return function() {
            var key = hasher.apply(this, arguments);
            return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : (mem[key] = _this.apply(this, arguments));
        };
    },
    debounce:function(time) {
        var callback = this,cid;
        return function() {
            cid = this.__debounce_id__;
            clearTimeout(cid);
            this.__debounce_id__ = callback.timeout(time);
            return this;
        };
    },
    throttle:function(time) {
        var callback = this,cid;
        return function() {
            var _this = this;
            cid = _this.__throttle_id__;
            if(!cid) {
                _this.__throttle_id__ = callback.cut({
                    after:function() {
                        _this.__throttle_id__ = 0;
                    }
                }).timeout(time);
            }
            return this;
        };
    },
    cut:function(option) {
        var callback = this;
        return function() {
            option && option.before && option.before.call(null);
            callback.apply(null, arguments);
            option && option.after && option.after.call(null);
        };
    },
    timeout:function(time) {
        return setTimeout(this, time);
    },
    interval:function(time) {
        return setInterval(this, time);
    },
    defer:function() {
        return this.timeout(1);
    },
    singleton:function() {
        if(typeof this.__initialize__ == 'undefined') {
            var args = arguments || [];
            this.__initialize__ = this.apply(null, args);
        }

        return this.__initialize__;
    }
}, Function.prototype);