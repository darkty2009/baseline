(function(win) {
    var patch = win.patch;

    patch.some({
        unique:function() {
            for(var i=0;i<this.length;i++) {
                var it = this[i];
                for(var j=this.length - 1;j>i;j--) {
                    if(this[j] == it) {
                        this.splice(j, 1);
                    }
                }
            }
            return this;
        },
        max:function() {
            return this.reduce(function(prep, next) {
                return prep > next ? prep : next;
            });
        },
        min:function() {
            return this.reduce(function(prep, next) {
                return prep < next ? prep : next;
            });
        },
        // a new array contain the key
        pluck:function(key) {
            var result = [];
            this.forEach(function(item) {
                if(item.hasOwnProperty(key)) {
                    result.push(item[key]);
                }
            });
            return result;
        },
        group:function(key) {
            var result = {};
            this.pluck(key).forEach(function(item) {
                if(item.hasOwnProperty(key)) {
                    if(!result.hasOwnProperty(item[key])) {
                        result[item[key]] = [];
                    }
                    result[item[key]].push(item);
                }
            });
            return result;
        },
        // all in a array
        flatten:function() {
            return this.reduce(function(prep, next) {
                if(!prep.is("Array")) {
                    prep = [prep];
                }
                if(next.is("Array")) {
                    next = next.flatten();
                }
                return prep.concat(next);
            });
        },
        contain:function(item) {
            for(var i=0;i<this.length;i++) {
                if(this[i] === item)
                    return true;
            }
            return false;
        },
        // random get the len data
        sample:function(len) {
            len = len * 1 || 1;
            var data = [].concat(this),result = [];
            len = len > data.length ? data.length : len;
            while(len > 0) {
                var rand = Number.random(0, data.length);
                data.swap(rand, data.length - 1);
                result.push(data.pop());
            }

            return result;
        },
        // random all data
        shuffle:function() {
            return this.sample(this.length);
        },
        eq:function(index) {
            return this[index];
        },
        compact:function() {
            return this.filter(function(item) {
                return !!item;
            });
        },
        swap:function(pos1, pos2) {
            var temp = this[pos1];
            this[pos1] = this[pos2];
            this[pos2] = temp;
            return this;
        },
        first:function() {
            return this[0];
        },
        last:function() {
            return this[this.length - 1 > -1 ? this.length - 1 : 0];
        }
    }, Array.prototype);
})(this);