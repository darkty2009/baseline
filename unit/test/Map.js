var _ = QUnit.deepEqual;

test("Map Unit Test", function() {
    var myMap = new Map();

    var keyObj = {},
        keyFunc = function () {},
        keyString = "a string";

    myMap.set(keyString, "value associated with 'a string'");
    myMap.set(keyObj, "value associated with keyObj");
    myMap.set(keyFunc, "value associated with keyFunc");

    _(myMap.size, 3);

    _(myMap.get(keyString), "value associated with 'a string'");
    _(myMap.get(keyObj), "value associated with keyObj");
    _(myMap.get(keyFunc), "value associated with keyFunc");

    _(myMap.get("a string"), "value associated with 'a string'");
    _(myMap.get({}), undefined);
    _(myMap.get(function() {}), undefined);

    _(myMap.has(keyString), true);
    _(myMap.has(keyString + keyObj), false);
});
