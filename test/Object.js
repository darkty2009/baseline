require("../build/baseline");
var _ = require("assert").deepEqual;

var win = this;

describe("Object", function () {
    // "_.create",
    describe("#create", function () {
        it("create normal", function () {
            _(Object.create(Object.prototype), {}, 'create normal');
        });
        it("create with properties", function () {
            try {
                Object.create({}, {});
                var create2 = Object.create(Object.prototype, {
                    a: {value: 1},
                    b: {value: 2}
                });
                _(create2.a, 1, 'create with properties');
            } catch (e) {
                _(1, 1);
            }
        });
        it("create array", function () {
            _(Object.create([]) instanceof Array, true, 'create array');
        });
        it("create function", function () {
            _(typeof Object.create(function () {
            }), 'object', 'create function');
        });
    });

    // "_.defineProperties",
    // "_.defineProperty",
    // "_.freeze",
    // "_.getOwnPropertyDescriptor",
    // "_.getOwnPropertyNames",
    // "_.getPrototypeOf",
    // "_.isExtensible",
    // "_.isFrozen",
    // "_.isSealed",
    // "_.keys",
    describe("#keys", function () {
        it("normal", function () {
            _(Object.keys({a: 1, b: 2, c: 3, d: 4}), ['a', 'b', 'c', 'd'], 'keys normal');
        });
        it("with Array", function () {
            _(Object.keys([1, 2, 3, 4]), ["0", "1", "2", "3"]);
        });
        it("with Function", function () {
            var func = function () {
                this.a = 1;
                this.b = 2;
            };
            _(Object.keys(new func()), ["a", "b"]);
        });
        it("with String", function () {
            _(Object.keys(new String("abcd")), ["0", "1", "2", "3"]);
        });
    });

    // "_.preventExtensions",
    // "_.hasOwnProperty",
    // "_.isPrototypeOf",
    // "_.propertyIsEnumerable",
    // "_.toLocaleString",
    // "_.toString",
    // "_.valueOf",
    // "_.seal",
    // "_.is",
    describe("#is", function () {
        var object = {};
        it("object is object", function () {
            _(Object.is(object, object), true);
        });
        it("object is not {}", function () {
            _(Object.is(object, {}), false);
        });
        it("NaN is NaN", function () {
            _(Object.is(NaN, NaN), true);
        });
        it("0 is 0", function () {
            _(Object.is(0, 0), true);
        });
        it("1 is 1", function () {
            _(Object.is(1, 1), true);
        });
        it("-1 is -1", function () {
            _(Object.is(-1, -1), true);
        });
        it("123 is 123", function () {
            _(Object.is(123, 123), true);
        });
        it("0 is not -0", function () {
            _(Object.is(0, -0), false);
        });
        it("-0 is not 0", function () {
            _(Object.is(-0, 0), false);
        });
        it("0 is not 1", function () {
            _(Object.is(0, 1), false);
        });
        it("true is true", function () {
            _(Object.is(true, true), true);
        });
        it("false is false", function () {
            _(Object.is(false, false), true);
        });
        it("true is not false", function () {
            _(Object.is(true, false), false);
        });
        it("false is not true", function () {
            _(Object.is(false, true), false);
        });
        it("\'\' is \'\'", function () {
            _(Object.is('', ''), true, 'Object.is empty string');
        });
        it("\'a\' is \'a\'", function () {
            _(Object.is('a', 'a'), true);
        });
        it("\'\' is \'a\'", function () {
            _(Object.is('', 'a'), false);
        });
        it("\'a\' is \'\'", function () {
            _(Object.is('a', ''), false);
        });
        it("\'a\' is not \'b\'", function () {
            _(Object.is('a', 'b'), false);
        });
        it("true is not \'true\'", function () {
            _(Object.is(true, 'true'), false);
        });
        it("\'true\' is not true", function () {
            _(Object.is('true', true), false);
        });
        it("false is not \'false\'", function () {
            _(Object.is(false, 'false'), false);
        });
        it("\'false\' is false", function () {
            _(Object.is('false', false), false, 'Object.is false string');
        });
        it("0 is not \'0\'", function () {
            _(Object.is(0, '0'), false);
        });
        it("\'0\' is not 0", function () {
            _(Object.is('0', 0), false);
        });
    });

    // "_.setPrototypeOf",
});
