patches({
    unique:function() {

    },
    max:function() {

    },
    min:function() {

    },
    // a new array contain the key
    pluck:function(key) {

    },
    group:function(key) {

    },
    // all in a array
    flatten:function() {

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
    range:function(start, end) {

    },
    diff:function(desc) {

    },
    without:function() {

    },
    compact:function() {

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