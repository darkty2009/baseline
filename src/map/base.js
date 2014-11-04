patch((function() {
    // Plan One: use two hashmaps to store id-value and id-key
    // Plan Two: use array to simulate map, but performance
    var _Map = function() {
        this.__source__ = [];
        this.size = 0;
    };

    return _Map;
})(), window, "Map");

patches({
    'delete':function(key) {
        var index = this.__source__findIndex(function(item) {
            return item[0] === key;
        });
        if(index >= 0) {
            this.__source__.splice(index, 1);
        }
        this.size = this.__source__.length;
        return this;
    },
    clear:function() {
        this.__source__ = [];
        this.size = 0;
        return this;
    },
    entries:function() {
        return Iterator(this);
    },
    forEach:function(func, argv) {
        this.__source__.forEach(func, argv);
        return this;
    },
    get:function(key) {
        var index = this.__source__.findIndex(function(item) {
            return item[0] === key;
        });
        return index>=0 ? this.__source__[index][1] : undefined;
    },
    has:function(key) {
        return this.__source__.findIndex(function(item) {
            return item[0] === key;
        }) >= 0;
    },
    keys:function() {
        var ite = Iterator(this);
        ite.current = 0;
        ite.next = function _iterator_() {
            var value = this.iterator[this.current++];
            if(this.current > this.length) {
                throw new Error("stop iterate");
            }
            return {
                value:value[0],
                done:this.current >= this.length
            };
        };
        return ite;
    },
    set:function(key, value) {
        var pair = [key, value];
        var index = this.__source__.findIndex(function(item) {
            return item[0] === key;
        });
        if(index >= 0) {
            this.__source__[index] = pair;
        }else {
            this.__source__.push(pair);
        }
        this.size = this.__source__.length;
        return this;
    },
    values:function() {
        var ite = Iterator(this);
        ite.current = 0;
        ite.next = function _iterator_() {
            var value = this.iterator[this.current++];
            if(this.current > this.length) {
                throw new Error("stop iterate");
            }
            return {
                value:value[1],
                done:this.current >= this.length
            };
        };
        return ite;
    }
}, Map.prototype);