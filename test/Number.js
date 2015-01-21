require("../build/baseline");
var _ = require("assert").deepEqual;

var win = this;

describe("Number", function () {
    //    '_.EPSILON',
    //    '_.MAX_VALUE',
    //    '_.MIN_VALUE',
    //    '_.NEGATIVE_INFINITY',
    //    '_.NaN',
    //    '_.POSITIVE_INFINITY',
    //    '_.prototype.toExponential',
    //    '_.prototype.toFixed',

    describe("#prototype.toFixed", function () {
        var numObj = 12345.6789;
        it("normal", function () {
            _(numObj.toFixed(), "12346");
        });
        it("less 1", function () {
            _(numObj.toFixed(1), "12345.7");
        });
        it("less 6", function () {
            _(numObj.toFixed(6), "12345.678900");
        });
        it("big number", function () {
            _((1.23e+20).toFixed(2), "123000000000000000000.00");
        });
        it("too small", function () {
            _((1.23e-10).toFixed(2), "0.00");
        });
        it("normal to valueOf number", function () {
            _(2.34.toFixed(1), "2.3");
        });
        it("nagetive to valueOf number", function () {
            _(-2.34.toFixed(1), -2.3);
        });
        it("negative to valueOf Object", function () {
            _((-2.34).toFixed(1), "-2.3");
        });
    });

    //    '_.prototype.toLocaleString',
    //    '_.prototype.toPrecision',
    describe("#prototype.toPrecision", function () {
        var numObj = 5.123456;
        it("normal", function () {
            _(numObj.toPrecision(), "5.123456");
        });
        it("normal param with 5", function () {
            _(numObj.toPrecision(5), "5.1235");
        });
        it("normal param with 2", function () {
            _(numObj.toPrecision(2), "5.1");
        });
        it("normal param with 1", function () {
            _(numObj.toPrecision(1), "5");
        });
        it("normal to valueOf Object", function () {
            _((1234.5).toPrecision(2), "1.2e+3");
        });
    });

    //    '_.prototype.toString',
    //    '_.prototype.valueOf',
    //    '_.isFinite',
    describe("#isFinite", function () {
        it("Infinity => false", function () {
            _(Number.isFinite(Infinity), false);
        });
        it("NaN => false", function () {
            _(Number.isFinite(NaN), false);
        });
        it("-Infinity => false", function () {
            _(Number.isFinite(-Infinity), false);
        });
        it("0 => true", function () {
            _(Number.isFinite(0), true);
        });
        it("2e64 => true", function () {
            _(Number.isFinite(2e64), true);
        });
        it("\"0\" => false", function () {
            _(Number.isFinite("0"), false);
        });
    });

    //    '_.isInteger',
    describe("#isInteger", function () {
        it("0.1 => false", function () {
            _(Number.isInteger(0.1), false);
        });
        it("1 => true", function () {
            _(Number.isInteger(1), true);
        });
        it("Math.PI => false", function () {
            _(Number.isInteger(Math.PI), false);
        });
        it("\"1\" => false", function () {
            _(Number.isInteger("1"), false);
        });
    });

    //    '_.isNaN',
    //    '_.parseFloat',
    //    '_.parseInt',
    //    '_.toInteger'
    describe("#toInteger", function () {
        it("0.1 => 0", function () {
            _(Number.toInteger(0.1), 0);
        });
        it("1 => 1", function () {
            _(Number.toInteger(1), 1);
        });
        it("Math.PI => 3", function () {
            _(Number.toInteger(Math.PI), 3);
        });
        it("null => 0", function () {
            _(Number.toInteger(null), 0);
        });
        it("\"0\" => 0", function () {
            _(Number.toInteger("0"), 0);
        });
        it("\"09\" => 9", function () {
            _(Number.toInteger("09"), 9);
        });
        it("\"0910.04\" => 910", function () {
            _(Number.toInteger("0910.04"), 910);
        });
    });
});
