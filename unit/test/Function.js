var _ = QUnit.deepEqual;

test("Function Unit Test", function() {
    this.x = 9;
    var module = {
        x: 81,
        getX: function() { return this.x; }
    };
    _(module.getX(), 81);
    var getX = module.getX;
    var boundGetX = getX.bind(module);
    _(boundGetX(), 81);
});
