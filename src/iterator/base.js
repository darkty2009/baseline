(function() {
    // Iterator
    patch(function(argv) {
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
                var value = this.iterator[this.current];
                if(this.current >= this.length) {
                    throw new Error("stop iterate");
                }
                return [this.current++, value];
                // return {
                // value:value,
                // done:this.current >= this.length
                // };
            };
        };

        return new _Iterator(argv);
    }, window, "Iterator");
})();