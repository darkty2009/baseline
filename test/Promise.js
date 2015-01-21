require("../build/baseline");
var _ = require("assert").deepEqual;

var win = this;

describe("Promise", function () {
    it("normal", function(done) {
        new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 1);
        }).then(function(){
            done();
        });
    });

    it("normal to function", function(done) {
        function doSth() {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve();
                }, 1);
            });
        }

        doSth().then(function() {
            done();
        });
    });

    it("normal to defer", function(done) {
        function doSth() {
            var defer = Promise.defer();
            setTimeout(function() {
                defer.resolve();
            }, 1);

            return defer.promise;
        }

        doSth().then(function() {
            done();
        });
    });

    it("link", function(done) {
        function doSth() {
            var defer = Promise.defer();
            setTimeout(function() {
                defer.resolve();
            }, 1);

            return defer.promise;
        }

        function doSth2() {
            var defer = Promise.defer();
            setTimeout(function() {
                defer.resolve();
            }, 1);

            return defer.promise;
        }

        doSth().then(doSth2()).then(function() {
            done();
        });
    });

    describe("#all", function() {
        it("sync", function(done) {
            Promise.all([0, 1, 2]).then(function() {
                done();
            });
        });

        it("async", function(done) {
            function doA() {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 1);
                });
            }

            function doB() {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 2);
                });
            }

            Promise.all([doA(), doB()]).then(function() {
                done();
            });
        });
    });

    it("catch", function(done) {
        var count = 0;
        function doSth() {
            count++;
            return new Promise(function(resolve, reject) {
                if(count >= 2) {
                    reject();
                }else {
                    resolve();
                }
            });
        }

        Promise.resolve().then(doSth).then(doSth).catch(function(err) {
            done();
        });
    });

    it("#race", function(done) {
        function doA() {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(200);
                }, 200);
            });
        }

        function doB() {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(1);
                }, 1);
            });
        }

        Promise.race([doA(), doB()]).then(function(value) {
            if(value == 1) {
                done();
            }
        });
    });
});