var _ = QUnit.deepEqual;

test("Number Unit Test", function() {
    //    '_.EPSILON',
    //    '_.MAX_VALUE',
    //    '_.MIN_VALUE',
    //    '_.NEGATIVE_INFINITY',
    //    '_.NaN',
    //    '_.POSITIVE_INFINITY',
    //    '_.prototype.toExponential',
    //    '_.prototype.toFixed',
    var numObj = 12345.6789;
    _(numObj.toFixed(), "12346");
    _(numObj.toFixed(1), "12345.7");
    _(numObj.toFixed(6), "12345.678900");
    _((1.23e+20).toFixed(2), "123000000000000000000.00");
    _((1.23e-10).toFixed(2), "0.00");
    _(2.34.toFixed(1), "2.3");
    _(-2.34.toFixed(1), -2.3);
    _((-2.34).toFixed(1), "-2.3");

    //    '_.prototype.toLocaleString',
    //    '_.prototype.toPrecision',
    var numObj = 5.123456;
    _(numObj.toPrecision(), "5.123456");
    _(numObj.toPrecision(5), "5.1235");
    _(numObj.toPrecision(2), "5.1");
    _(numObj.toPrecision(1), "5");
    _((1234.5).toPrecision(2), "1.2e+3");

    //    '_.prototype.toString',
    //    '_.prototype.valueOf',
    //    '_.isFinite',
    _(Number.isFinite(Infinity), false);
    _(Number.isFinite(NaN), false);
    _(Number.isFinite(-Infinity), false);
    _(Number.isFinite(0), true);
    _(Number.isFinite(2e64), true);
    _(Number.isFinite("0"), false);

    //    '_.isInteger',
    _(Number.isInteger(0.1), false);
    _(Number.isInteger(1), true);
    _(Number.isInteger(Math.PI), false);

    //    '_.isNaN',
    //    '_.parseFloat',
    //    '_.parseInt',
    //    '_.toInteger'
    _(Number.toInteger(0.1), 0);
    _(Number.toInteger(1), 1);
    _(Number.toInteger(Math.PI), 3);
    _(Number.toInteger(null), 0);
    _(Number.toInteger("0"), 0);
    _(Number.toInteger("09"), 9);
    _(Number.toInteger("0910.04"), 910);
});
