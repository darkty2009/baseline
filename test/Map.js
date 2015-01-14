require("../build/baseline");
var _ = require("assert").deepEqual;

describe("Map", function () {
    var myMap = new Map();

    var keyObj = {},
        keyFunc = function () {
        },
        keyString = "a string";

    myMap.set(keyString, "value associated with 'a string'");
    myMap.set(keyObj, "value associated with keyObj");
    myMap.set(keyFunc, "value associated with keyFunc");

    describe("#size", function () {
        it("right length", function () {
            _(myMap.size, 3);
        });
    })

    describe("#get", function () {
        it("get set the key with string", function () {
            _(myMap.get(keyString), "value associated with 'a string'");
        });
        it("get set the key with object", function () {
            _(myMap.get(keyObj), "value associated with keyObj");
        });
        it("get set the key with function", function () {
            _(myMap.get(keyFunc), "value associated with keyFunc");
        });
        it("value is string", function () {
            _(myMap.get("a string"), "value associated with 'a string'");
        });
        it("new object to get", function () {
            _(myMap.get({}), undefined);
        });
        it("new function to get", function () {
            _(myMap.get(function () {
            }), undefined);
        });
    });

    describe("#has", function () {
        it("exist string", function () {
            _(myMap.has(keyString), true);
        });
        it("exist object-string", function () {
            _(myMap.has(keyString + keyObj), false);
        });
    });
});
