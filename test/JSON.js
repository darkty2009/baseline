require("../build/baseline");
var _ = require("assert").deepEqual;

describe("JSON", function () {
    //    '_.parse',
    describe("#parse", function () {
        it("parse object", function () {
            _(JSON.parse('{}'), {});
        });
        it("parse boolean", function () {
            _(JSON.parse('true'), true);
        });
        it("parse string", function () {
            _(JSON.parse('"foo"'), "foo");
        });
        it("parse array", function () {
            _(JSON.parse('[1, 5, "false"]'), [1, 5, "false"]);
        });
        it("parse null", function () {
            _(JSON.parse('null'), null);
        });
    });

    //    '_.stringify'
    describe("#stringify", function () {
        it("stringify empty objet", function () {
            _(JSON.stringify({}), '{}');
        });
        it("stringify boolean", function () {
            _(JSON.stringify(true), 'true');
        });
        it("stringify string", function () {
            _(JSON.stringify("foo"), '"foo"');
        });
        it("stringify array", function () {
            _(JSON.stringify([1, "false", false]), '[1,"false",false]');
        });
        it("stringify object", function () {
            _(JSON.stringify({ x: 5 }), '{"x":5}');
        });
        it("stringify multi keys object", function () {
            _(JSON.stringify({x: 5, y: 6}), '{"x":5,"y":6}');
        });
    });
});
