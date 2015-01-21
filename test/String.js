require("../build/baseline");
var _ = require("assert").deepEqual;

var win = this;

describe("String", function () {
    describe("#fromCodePoint", function () {
        it("42 => *", function () {
            _(String.fromCodePoint(42), "*");
        });
        it("65,90 => AZ", function () {
            _(String.fromCodePoint(65, 90), "AZ");
        });
        it("0x404 => \u0404", function () {
            _(String.fromCodePoint(0x404), "\u0404");
        });
        it("0x2F804 => \uD87E\uDC04", function () {
            _(String.fromCodePoint(0x2F804), "\uD87E\uDC04");
        });
        it("194564 => \uD87E\uDC04", function () {
            _(String.fromCodePoint(194564), "\uD87E\uDC04");
        });
        it("0x1D306,0x61,0x1D307 => \uD834\uDF06a\uD834\uDF07", function () {
            _(String.fromCodePoint(0x1D306, 0x61, 0x1D307), "\uD834\uDF06a\uD834\uDF07");
        });
        it("_ cause error", function () {
            try {
                String.fromCodePoint('_')       // RangeError
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
        it("Infinity cause error", function () {
            try {
                String.fromCodePoint(Infinity); // RangeError
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
        it("-1 cause error", function () {
            try {
                String.fromCodePoint(-1);       // RangeError
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
        it("3.14 cause error", function () {
            try {
                String.fromCodePoint(3.14);     // RangeError
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
        it("3e-2 cause error", function () {
            try {
                String.fromCodePoint(3e-2);     // RangeError
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
        it("NaN cause error", function () {
            try {
                String.fromCodePoint(NaN);      // RangeError
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
    });

    describe("#prototype.codePointAt", function () {
        it("ABC at 1 is 66", function () {
            _('ABC'.codePointAt(1), 66);
        });
        it("\uD800\uDC00 at 0 is 65536", function () {
            _('\uD800\uDC00'.codePointAt(0), 65536);
        });
        it("XYZ at 42 is undefined", function () {
            _('XYZ'.codePointAt(42), undefined);
        });
    });

    var str = "To be, or not to be, that is the question.";

    describe("#prototype.contains", function () {
        it("is contains To be", function () {
            _(str.contains("To be"), true);
        });
        it("is contains question", function () {
            _(str.contains("question"), true);
        });
        it("is not contains nonexistent", function () {
            _(str.contains("nonexistent"), false);
        });
        it("is not contains To be", function () {
            _(str.contains("To be", 1), false);
        });
        it("is not contains TO BE", function () {
            _(str.contains("TO BE"), false);
        });
    });

    describe("#prototype.endsWith", function () {
        it("is endsWith question", function () {
            _(str.endsWith("question."), true);
        });
        it("is not endsWith to be", function () {
            _(str.endsWith("to be"), false);
        });
        it("is endsWith to be at 19", function () {
            _(str.endsWith("to be", 19), true);
        });
    });

    describe("#prototype.repeat", function () {
        it("-1 cause error", function () {
            try {
                "abc".repeat(-1);
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
        it("0 => \"\"", function () {
            _("abc".repeat(0), "");
        });
        it("1 => abc", function () {
            _("abc".repeat(1), "abc");
        });
        it("2 => abcabc", function () {
            _("abc".repeat(2), "abcabc");
        });
        it("3 => abcabcabc", function () {
            _("abc".repeat(3.5), "abcabcabc");
        });
        it("1/0 cause error", function () {
            try {
                "abc".repeat(1 / 0);
            } catch (e) {
                _(e instanceof RangeError, true);
            }
        });
        it("\"3\" cause error", function () {
            try {
                "abc".repeat("3");
            } catch (e) {
                _(e instanceof TypeError, true);
            }
        });
    });

    describe("#startsWith", function () {
        var str = "To be, or not to be, that is the question.";
        it("is startsWith To be", function () {
            _(str.startsWith("To be"), true);
        });
        it("is not startsWith not to be", function () {
            _(str.startsWith("not to be"), false);
        });
        it("is startsWith not to be at 10", function () {
            _(str.startsWith("not to be", 10), true);
        });
    });
});
