// Iterator
(function(win) {
    var patch = win.patch;

    patch.one(function(argv) {
        var _Iterator = function() {
            this.length = 0;
            this.current = 0;

            this.source = arguments[0] || [];
            this.iterator = [];
            for(var key in this.source) {
                if(this.source.hasOwnProperty(key))
                    this.iterator.push([key, this.source[key]]);
            }

            this.length = this.iterator.length;

            this.next = function() {
                if(this.current >= this.length) {
                    throw new Error("stop iterate");
                }
                //return [this.current++, value];
                return this.current < this.length ? {
                    value:this.source[this.current++],
                    done:false
                } : {
                    done:true
                };
            };
        };

        return new _Iterator(argv);
    }, win, "Iterator");
})(this);