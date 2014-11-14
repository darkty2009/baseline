patch((function() {
    var _Promise = function(handler) {
        var queue = [];

        function next(i, val) {
            setTimeout(function() {
                while (queue.length) {
                    var arr = queue.shift()
                    if (typeof arr[i] === 'function') {
                        // try {
                            var chain = arr[i](val)
                        // } catch (e) {
                        //     return reject(e)
                        // }
                        if (chain && typeof chain.then === 'function') {
                            return chain.then(resolve, reject)
                        } else {
                            return _Promise.resolve(chain).then(resolve, reject)
                        }
                    }
                }
            }, 1);
        }

        function resolve(value) {
            next(0, value);
        }

        function reject(message) {
            next(1, message);
        }

        handler(resolve, reject);

        this.then = function(resolve, reject) {
            queue.push([resolve, reject]);
            return this;
        };
        this.chain = this.then;

        this['catch'] = function(reject) {
            return this.then(undefined, reject);
        };
    };

    _Promise.deferred = function() {
        var result = [];
        result.promise = new _Promise(function(resolve, reject) {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    };

    _Promise.resolve = _Promise.cast = function(value) {
        return new _Promise(function(resolve) {
            resolve(value)
        });
    };

    _Promise.reject = function(message) {
        return new _Promise(function(resolve, reject) {
            reject(message);
        });
    };

    _Promise.all = function(values) {
        var defer = _Promise.deferred();
        var len = values.length;
        var result = [];

        function resolve(value, i) {
            result[i] = value;
            len--;

            if(len == 0) {
                defer.resolve(result);
            }
        }

        function reject(message) {
            defer.reject(message);
        }

        values.forEach(function(item, i) {
            if(!(item instanceof _Promise)) {
                resolve(item, i);
                return;
            }

            item.then(function(value) {
                resolve(value, i);
            }, function(message) {
                reject(message);
            });
        });

        return defer.promise;
    };

    _Promise.race = function(values) {
        var defer = _Promise.deferred();
        var first = true;

        function resolve(value, i) {
            if(first) {
                defer.resolve(value);
                first = false;
            }
        }

        function reject(message) {
            if(first) {
                defer.reject(message);
                first = false;
            }
        }

        values.forEach(function(item, i) {
            if(!(item instanceof _Promise)) {
                resolve(item, i);
                return;
            }

            item.then(function(value) {
                resolve(value, i);
            }, function(message) {
                reject(message);
            });
        });

        return defer.promise;
    };

    return _Promise;
})(), window, 'Promise');

patches({
    defer:window.Promise.deferred
}, window.Promise);