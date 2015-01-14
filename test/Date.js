require("../build/baseline");
var _ = require("assert").deepEqual;

(function (win) {
    describe("Date", function () {
        var date = new Date();
        // '_.UTC',
        describe("#now", function () {
            // '_.now',
            it("now normal", function () {
                _(Date.now(), new Date().getTime());
            });
        });

        // '_.parse',
        function getLocalTime() {
            var offset = new Date().getTimezoneOffset();
            return Date.UTC.apply(Date, arguments) + offset * 60 * 1000;
        }

        describe("#parse", function () {
            it("parse normal", function () {
                _(Date.parse("Aug 9, 1995"), getLocalTime(1995, 7, 9));
            });
            it("parse UTC", function () {
                _(Date.parse("Wed, 09 Aug 1995 00:00:00 GMT"), 807926400000);
            });
            it("parse standard", function () {
                _(Date.parse("Wed, 09 Aug 1995 00:00:00"), getLocalTime(1995, 7, 9, 0, 0, 0));
            });
            it("parse UTC 0", function () {
                _(Date.parse("Thu, 01 Jan 1970 00:00:00 GMT"), 0);
            });
            it("parse standard 0", function () {
                _(Date.parse("Thu, 01 Jan 1970 00:00:00"), getLocalTime(1970, 0, 1, 0, 0, 0));
            });
            it("parse full 0", function () {
                _(Date.parse("Thu, 01 Jan 1970 00:00:00 GMT-0400"), 14400000);
            });
        });
        // '_.prototype.getDate',
        // '_.prototype.getDay',
        // '_.prototype.getFullYear',
        // '_.prototype.getHours',
        // '_.prototype.getMilliseconds',
        // '_.prototype.getMinutes',
        // '_.prototype.getMonth',
        // '_.prototype.getSeconds',
        // '_.prototype.getTime',
        // '_.prototype.getTimezoneOffset',
        // '_.prototype.getUTCDate',
        // '_.prototype.getUTCDay',
        // '_.prototype.getUTCFullYear',
        // '_.prototype.getUTCHours',
        // '_.prototype.getUTCMilliseconds',
        // '_.prototype.getUTCMinutes',
        // '_.prototype.getUTCMonth',
        // '_.prototype.getUTCSeconds',
        // '_.prototype.getYear',
        // '_.prototype.setDate',
        // '_.prototype.setFullYear',
        // '_.prototype.setHours',
        // '_.prototype.setMilliseconds',
        // '_.prototype.setMinutes',
        // '_.prototype.setMonth',
        // '_.prototype.setSeconds',
        // '_.prototype.setTime',
        // '_.prototype.setUTCDate',
        // '_.prototype.setUTCFullYear',
        // '_.prototype.setUTCHours',
        // '_.prototype.setUTCMilliseconds',
        // '_.prototype.setUTCMinutes',
        // '_.prototype.setUTCMonth',
        // '_.prototype.setUTCSeconds',
        // '_.prototype.setYear',
        // '_.prototype.toDateString',
        // '_.prototype.toGMTString',
        // '_.prototype.toISOString',
        // '_.prototype.toJSON',
        // '_.prototype.toLocaleDateString',
        // '_.prototype.toLocaleString',
        // '_.prototype.toLocaleTimeString',
        // '_.prototype.toString',
        // '_.prototype.toUTCString',
        // '_.prototype.valueOf'
    });
})(this);
