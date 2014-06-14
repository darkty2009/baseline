var _ = QUnit.deepEqual;

test("String Unit Test", function() {
    _(String.fromCodePoint(42), "*");
    _(String.fromCodePoint(65, 90), "AZ");
    _(String.fromCodePoint(0x404), "\u0404");
    _(String.fromCodePoint(0x2F804), "\uD87E\uDC04");
    _(String.fromCodePoint(194564), "\uD87E\uDC04");
    _(String.fromCodePoint(0x1D306, 0x61, 0x1D307), "\uD834\uDF06a\uD834\uDF07");
    try {
        String.fromCodePoint('_')       // RangeError
    }catch(e) {
        _(e instanceof RangeError, true);
    }
    try {
        String.fromCodePoint(Infinity); // RangeError
    }catch(e) {
        _(e instanceof RangeError, true);
    }
    try {
        String.fromCodePoint(-1);       // RangeError
    }catch(e) {
        _(e instanceof RangeError, true);
    }
    try {
        String.fromCodePoint(3.14);     // RangeError
    }catch(e) {
        _(e instanceof RangeError, true);
    }
    try {
        String.fromCodePoint(3e-2);     // RangeError
    }catch(e) {
        _(e instanceof RangeError, true);
    }
    try {
        String.fromCodePoint(NaN);      // RangeError
    }catch(e) {
        _(e instanceof RangeError, true);
    }

    _('ABC'.codePointAt(1), 66);
    _('\uD800\uDC00'.codePointAt(0), 65536);
    _('XYZ'.codePointAt(42), undefined);

    var str = "To be, or not to be, that is the question.";
    _(str.contains("To be"), true);
    _(str.contains("question"), true);
    _(str.contains("nonexistent"), false);
    _(str.contains("To be", 1), false);
    _(str.contains("TO BE"), false)

    _(str.endsWith("question."), true);
    _(str.endsWith("to be"), false);
    _(str.endsWith("to be", 19), true);

    try {
        "abc".repeat(-1);
    }catch(e) {
        _(e instanceof RangeError, true);
    }
    _("abc".repeat(0), "");
    _("abc".repeat(1), "abc");
    _("abc".repeat(2), "abcabc");
    _("abc".repeat(3.5), "abcabcabc");
    try {
        "abc".repeat(1/0);
    }catch(e) {
        _(e instanceof RangeError, true);
    }
    try {
        "abc".repeat("3");
    }catch(e) {
        _(e instanceof TypeError, true);
    }
	
	var str = "To be, or not to be, that is the question.";
	_(str.startsWith("To be"), true);
	_(str.startsWith("not to be"), false);
	_(str.startsWith("not to be", 10), true);
});
