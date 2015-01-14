require("../build/baseline");
var _ = require("assert").deepEqual;

describe("Function", function () {
    describe("#normal", function () {
        this.x = 9;
        var module = {
            x: 81,
            getX: function () {
                return this.x;
            }
        };
        it("define function", function () {
            _(module.getX(), 81);
        });
        it("bind success", function () {
            var getX = module.getX;
            var boundGetX = getX.bind(module);
            _(boundGetX(), 81);
        });
    });
});
