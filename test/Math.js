require("../build/baseline");
var _ = require("assert").deepEqual;

var win = this;

describe("Math", function () {
    function floorCompare(val1, val2) {
        val1 = val1 * 10e6;
        val2 = val2 * 10e6;
        return Math.abs(val1 - val2) < 10;
    }

    describe("#acosh", function () {
        it("-1 => NaN", function () {
            _(Math.acosh(-1) + "", "NaN")
        });
        it("0 => NaN", function () {
            _(Math.acosh(0) + "", "NaN")
        });
        it("0.5 => NaN", function () {
            _(Math.acosh(0.5) + "", "NaN")
        });
        it("1 => 0", function () {
            _(Math.acosh(1), 0)
        });
        it("2 => 1.31", function () {
            _(floorCompare(Math.acosh(2), 1.3169578969248166), true)
        });
    });

    describe("#asinh", function () {
        it("1 => 0.88", function () {
            _(floorCompare(Math.asinh(1), 0.8813735870195429), true)
        });
        it("0 => 0", function () {
            _(Math.asinh(0), 0)
        });
    });

    describe("#atanh", function () {
        it("-2 => NaN", function () {
            _(Math.atanh(-2) + "", "NaN")
        });
        it("-1 => -Infinity", function () {
            _(Math.atanh(-1), -Infinity)
        });
        it("0 => 0", function () {
            _(Math.atanh(0), 0)
        });
        it("0.5 => 0.54", function () {
            _(floorCompare(Math.atanh(0.5), 0.5493061443340549), true)
        });
        it("1 => Infinity", function () {
            _(Math.atanh(1), Infinity)
        });
        it("2 => NaN", function () {
            _(Math.atanh(2) + "", "NaN")
        });
    });

    describe("#tanh", function () {
        it("0 => 0", function () {
            _(Math.tanh(0), 0)
        });
        it("Infinity => 1", function () {
            _(Math.tanh(Infinity), 1)
        });
        it("1 => 0.76", function () {
            _(floorCompare(Math.tanh(1), 0.7615941559557649), true)
        });
    });

    describe("#cbrt", function () {
        it("-1 => -1", function () {
            _(Math.cbrt(-1), -1)
        });
        it("0 => 0", function () {
            _(Math.cbrt(0), 0)
        });
        it("1 => 1", function () {
            _(Math.cbrt(1), 1)
        });
        it("2 => 1.25", function () {
            _(floorCompare(Math.cbrt(2), 1.2599210498948732), true)
        });
    });

    describe("#clz32", function () {
        it("1 => 31", function () {
            _(Math.clz32(1), 31)
        });
        it("1000 => 22", function () {
            _(Math.clz32(1000), 22)
        });
        it("null => 32", function () {
            _(Math.clz32(), 32)
        });
        it("true => 31", function () {
            _(Math.clz32(true), 31)
        });
        it("3.5 => 30", function () {
            _(Math.clz32(3.5), 30)
        });
    });

    describe("#cosh", function () {
        it("0 => 1", function () {
            _(Math.cosh(0), 1)
        });
        it("1 => 1.54", function () {
            _(floorCompare(Math.cosh(1), 1.5430806348152437), true)
        });
        it("-1 => 1.54", function () {
            _(floorCompare(Math.cosh(-1), 1.5430806348152437), true)
        });
    });

    describe("#expm1", function () {
        it("-1 => -0.63", function () {
            _(floorCompare(Math.expm1(-1), -0.6321205588285577), true)
        });
        it("0 => 0", function () {
            _(Math.expm1(0), 0)
        });
        it("1 => 1.71", function () {
            _(floorCompare(Math.expm1(1), 1.718281828459045), true)
        });
    });

    describe("#acosh", function () {
        it("-1 => NaN", function () {
            _(Math.acosh(-1) + "", "NaN")
        });
        it("0 => NaN", function () {
            _(Math.acosh(0) + "", "NaN")
        });
        it("0.5 => NaN", function () {
            _(Math.acosh(0.5) + "", "NaN")
        });
        it("1 => NaN", function () {
            _(Math.acosh(1), 0)
        });
        it("2 => 1.31", function () {
            _(floorCompare(Math.acosh(2), 1.3169578969248166), true)
        });
    });

    describe("#fround", function () {
        it("0 => 0", function () {
            _(Math.fround(0), 0, 'Math.fround(0)')
        });
        it("1 => 1", function () {
            _(Math.fround(1), 1, 'Math.fround(1)')
        });
        var fround0117 = Math.fround(0.117);
        it("0.117 => 0.11699999", function () {
            _(floorCompare(fround0117, 0.11699999868869781), true, 'Math.fround(0.117)')
        });
        var fround1337 = Math.fround(1.337);
        if (typeof win.Float32Array != 'undefined')
            it("1.337 => 1.337 Float32Array", function () {
                _(floorCompare(fround1337, 1.3370000123977661), true, 'Math.fround(1.337) Float32Array')
            });
        else
            it("1.337 => 1.337 polyfill", function () {
                _(floorCompare(fround1337, 1.3369998931884765), true, 'Math.fround(1.337) polyfill')
            });
        it("1.5 => 1.5", function () {
            _(floorCompare(Math.fround(1.5), 1.5), true)
        });
        it("NaN => NaN", function () {
            _(Math.fround(NaN) + "", "NaN")
        });
    });

    describe("#hypot", function () {
        it("3,4 => 5", function () {
            _(Math.hypot(3, 4), 5)
        });
        it("3,4,5 => 7.07", function () {
            _(floorCompare(Math.hypot(3, 4, 5), 7.0710678118654755), true)
        });
        it("null => 0", function () {
            _(Math.hypot(), 0)
        });
        it("NaN => NaN", function () {
            _(Math.hypot(NaN) + "", "NaN")
        });
        it("3,4,foo => NaN", function () {
            _(Math.hypot(3, 4, "foo") + "", "NaN")
        });
        it("3,4,5 => 7.07", function () {
            _(floorCompare(Math.hypot(3, 4, "5"), 7.0710678118654755), true)
        });
        it("-3 => 3", function () {
            _(Math.hypot(-3), 3)
        });
    });

    describe("imul", function () {
        it("2,4 => 8", function () {
            _(Math.imul(2, 4), 8)
        });
        it("-1,8 => -8", function () {
            _(Math.imul(-1, 8), -8)
        });
        it("-2,-2 => 4", function () {
            _(Math.imul(-2, -2), 4)
        });
        it("0xffffffff,5 => -5", function () {
            _(Math.imul(0xffffffff, 5), -5)
        });
        it("0xfffffffe,5 => -10", function () {
            _(Math.imul(0xfffffffe, 5), -10)
        });
    });

    describe("#log10", function () {
        it("2 => 0.30", function () {
            _(floorCompare(Math.log10(2), 0.30102999566398114), true)
        });
        it("1 => 0", function () {
            _(Math.log10(1), 0)
        });
        it("0 => -Infinity", function () {
            _(Math.log10(0), -Infinity)
        });
        it("-2 => NaN", function () {
            _(Math.log10(-2) + "", "NaN")
        });
        it("100000 => 5", function () {
            _(Math.log10(100000), 5)
        });
    });

    describe("#log1p", function () {
        it("1 => 0.69", function () {
            _(floorCompare(Math.log1p(1), 0.6931471805599453), true)
        });
        it("0 => 0", function () {
            _(Math.log1p(0), 0)
        });
        it("-1 => -Infinity", function () {
            _(Math.log1p(-1), -Infinity)
        });
        it("-2 => NaN", function () {
            _(Math.log1p(-2) + "", "NaN")
        });
    });

    describe("#log2", function () {
        it("3 => 1.58", function () {
            _(floorCompare(Math.log2(3), 1.5849625007211563), true)
        });
        it("2 => 1", function () {
            _(Math.log2(2), 1)
        });
        it("1 => 0", function () {
            _(Math.log2(1), 0)
        });
        it("0 => -Infinity", function () {
            _(Math.log2(0), -Infinity)
        });
        it("-2 => NaN", function () {
            _(Math.log2(-2) + "", "NaN")
        });
        it("1024 => 10", function () {
            _(Math.log2(1024), 10)
        });
    });

    describe("#sign", function () {
        it("3 => 1", function () {
            _(Math.sign(3), 1)
        });
        it("-3 => -1", function () {
            _(Math.sign(-3), -1)
        });
        it("-3 => -1", function () {
            _(Math.sign("-3"), -1)
        });
        it("0 => 0", function () {
            _(Math.sign(0), 0)
        });
        it("-1 => -0", function () {
            _(Math.sign(-0), -0)
        });
        it("NaN => NaN", function () {
            _(Math.sign(NaN) + "", "NaN")
        });
        it("foo => NaN", function () {
            _(Math.sign("foo") + "", "NaN")
        });
        it("null => NaN", function () {
            _(Math.sign() + "", "NaN")
        });
    });

    describe("#sinh", function () {
        it("0 => 0", function () {
            _(Math.sinh(0), 0)
        });
        it("1 => 1.17", function () {
            _(floorCompare(Math.sinh(1), 1.1752011936438014), true)
        });
    });

    describe("#trunc", function () {
        it("13.37 => 13", function () {
            _(Math.trunc(13.37), 13)
        });
        it("42.84 => 42", function () {
            _(Math.trunc(42.84), 42)
        });
        it("0.123 => 0", function () {
            _(Math.trunc(0.123), 0)
        });
        it("-0.123 => -0", function () {
            _(Math.trunc(-0.123), -0)
        });
        it("-1.123 => -1", function () {
            _(Math.trunc("-1.123"), -1)
        });
        it("NaN => NaN", function () {
            _(Math.trunc(NaN) + "", "NaN")
        });
        it("foo => NaN", function () {
            _(Math.trunc("foo") + "", "NaN")
        });
        it("null => NaN", function () {
            _(Math.trunc() + "", "NaN")
        });
    });
});
