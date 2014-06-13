var _ = QUnit.deepEqual;

test("Math Unit Test", function() {
    function floorCompare(val1, val2) {
        return Math.abs(val1 - val2) < 1e-15;
    }

    _(Math.acosh(-1), NaN);
    _(Math.acosh(0), NaN);
    _(Math.acosh(0.5), NaN);
    _(Math.acosh(1), 0);
    _(floorCompare(Math.acosh(2), 1.3169578969248166), true);

    _(floorCompare(Math.asinh(1), 0.8813735870195429), true);
    _(Math.asinh(0), 0);

    _(Math.atanh(-2), NaN);
    _(Math.atanh(-1), -Infinity);
    _(Math.atanh(0), 0);
    _(floorCompare(Math.atanh(0.5), 0.5493061443340549), true);
    _(Math.atanh(1), Infinity);
    _(Math.atanh(2), NaN);

    _(Math.tanh(0), 0);
    _(Math.tanh(Infinity), 1);
    _(floorCompare(Math.tanh(1), 0.7615941559557649), true);

    _(Math.cbrt(-1), -1);
    _(Math.cbrt(0), 0);
    _(Math.cbrt(1), 1);
    _(floorCompare(Math.cbrt(2), 1.2599210498948732), true);

    _(Math.clz32(1), 31);
    _(Math.clz32(1000), 22);
    _(Math.clz32(), 32);
    _(Math.clz32(true), 31);
    _(Math.clz32(3.5), 30);

    _(Math.cosh(0), 1);
    _(floorCompare(Math.cosh(1), 1.5430806348152437), true);
    _(floorCompare(Math.cosh(-1), 1.5430806348152437), true);

    _(floorCompare(Math.expm1(-1), -0.6321205588285577), true);
    _(Math.expm1(0), 0);
    _(floorCompare(Math.expm1(1), 1.718281828459045), true);

    _(Math.acosh(-1), NaN);
    _(Math.acosh(0), NaN);
    _(Math.acosh(0.5), NaN);
    _(Math.acosh(1), 0);
    _(floorCompare(Math.acosh(2), 1.3169578969248166), true);

    _(Math.fround(0), 0);
    _(Math.fround(1), 1);
    _(floorCompare(Math.fround(1.337), 1.3370000123977661), true);
    _(floorCompare(Math.fround(1.5), 1.5), true);
    _(Math.fround(NaN), NaN);

    _(Math.hypot(3, 4), 5);
    _(floorCompare(Math.hypot(3, 4, 5), 7.0710678118654755), true);
    _(Math.hypot(), 0);
    _(Math.hypot(NaN), NaN);
    _(Math.hypot(3, 4, "foo"), NaN);
    _(floorCompare(Math.hypot(3, 4, "5"), 7.0710678118654755), true);
    _(Math.hypot(-3), 3);

    _(Math.imul(2, 4), 8);
    _(Math.imul(-1, 8), -8);
    _(Math.imul(-2, -2), 4);
    _(Math.imul(0xffffffff, 5), -5);
    _(Math.imul(0xfffffffe, 5), -10);

    _(floorCompare(Math.log10(2), 0.30102999566398114), true);
    _(Math.log10(1), 0);
    _(Math.log10(0), -Infinity);
    _(Math.log10(-2), NaN);
    _(Math.log10(100000), 5);

    _(floorCompare(Math.log1p(1), 0.6931471805599453), true);
    _(Math.log1p(0), 0);
    _(Math.log1p(-1), -Infinity);
    _(Math.log1p(-2), NaN);

    _(floorCompare(Math.log2(3), 1.5849625007211563), true);
    _(Math.log2(2), 1);
    _(Math.log2(1), 0);
    _(Math.log2(0), -Infinity);
    _(Math.log2(-2), NaN);
    _(Math.log2(1024), 10);

    _(Math.sign(3), 1);
    _(Math.sign(-3), -1);
    _(Math.sign("-3"), -1);
    _(Math.sign(0), 0);
    _(Math.sign(-0), -0);
    _(Math.sign(NaN), NaN);
    _(Math.sign("foo"), NaN);
    _(Math.sign(), NaN);

    _(Math.sinh(0),  0);
    _(floorCompare(Math.sinh(1), 1.1752011936438014), true);

    _(Math.trunc(13.37), 13);
    _(Math.trunc(42.84), 42);
    _(Math.trunc(0.123), 0);
    _(Math.trunc(-0.123), -0);
    _(Math.trunc("-1.123"), -1);
    _(Math.trunc(NaN), NaN);
    _(Math.trunc("foo"), NaN);
    _(Math.trunc(), NaN);
});
