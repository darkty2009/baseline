require("../build/baseline");
var _ = require("assert").deepEqual;

(function (win) {
    describe("Array", function () {
        //	"_.isArray",
        describe("#isArray", function () {
            it("[] is an Array", function () {
                _(Array.isArray([]), true);
            });
            it("{} is not an Array", function () {
                _(Array.isArray({}), false);
            });
            it("function is not an Array", function () {
                _(Array.isArray(function () {
                }), false);
            });
            it("number is not an Array", function () {
                _(Array.isArray(0), false);
            });
            it("undefined is not a function", function () {
                _(Array.isArray(undefined), false);
            });
            if (win.document) {
                it("DomList is not an Array", function () {
                    _(Array.isArray(document.body.childNodes), false);
                });

            }
        });

        describe("#of", function () {
            it("create an Array", function () {
                _(Array.of(1, 2, 3, 4), [1, 2, 3, 4]);
            });
            it("create an Array", function () {
                _(Array.of(1, '2', null, {}), [1, "2", null, {}]);
            });
            it("create an Array by one element", function () {
                _(Array.of({}), [
                    {}
                ]);
            });
            it("create an empty Array", function () {
                _(Array.of(), []);
            });
        });

        describe("#prototype.concat", function () {
            it("concat two Array", function () {
                _([1, 2, 3].concat([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
            });
            it("concat with nothing", function () {
                _([1, 2, 3].concat(), [1, 2, 3]);
            });
            it("concat with null", function () {
                _([1, 2, 3].concat(null), [1, 2, 3, null]);
            });
            it("concat with undefined", function () {
                _([1, 2, 3].concat(undefined), [1, 2, 3, undefined]);
            });
            it("concat with an non-Array element", function () {
                _([1, 2, 3].concat(4), [1, 2, 3, 4]);
            });
            it("concat with an indexded Object", function () {
                _([1, 2, 3].concat({0: 4, 1: 5, 2: 6}), [1, 2, 3, {0: 4, 1: 5, 2: 6}]);
            });
        });

        describe("#prototype.copyWithin", function () {
            it("within normal", function () {
                _([1, 2, 3, 4, 5].copyWithin(0, 3), [4, 5, 3, 4, 5]);
                _([1, 2, 3, 4, 5].copyWithin(0, 3, 4), [4, 2, 3, 4, 5]);
                _([1, 2, 3, 4, 5].copyWithin(0, -2, -1), [4, 2, 3, 4, 5]);
                _([].copyWithin.call({length: 5, 3: 1}, 0, 3), {0: 1, 3: 1, length: 5});
            });
        });

        describe("prototype.every", function () {
            var every1 = [1, 2, 3].every(function (val, index, arr) {
                return val > 0;
            });
            var every2 = [1, 2, 3].every(function (val, index, arr) {
                return val > 1;
            });
            var every3 = [1, 2, 3].every(function (val, index, arr) {
            });
            var every5 = [].every(function (val, index, arr) {
                return val > 0;
            });
            var every6Obj = {
                minNum: 5
            };
            var every6 = [6, 7, 8].every(function (val, index, arr) {
                return val > this.minNum;
            }, every6Obj);

            it("every normal", function () {
                _(every1, true);
            });
            it("every some element is error", function () {
                _(every2, false);
            });
            it("every filter return nothing", function () {
                _(every3, false);
            });

            it("every has no filter throw error", function () {
                try {
                    var every4 = [1, 2, 3].every();
                    _(1, 0);
                } catch (e) {
                    _(1, 1);
                }
            });
            it("every nothing to filter", function () {
                _(every5, true);
            });
            it("every filter with context", function () {
                _(every6, true);
            });
        });

        describe("#prototype.filter", function () {
            it("filter normal", function () {
                _([1, 2, 3].filter(function (val, index, arr) {
                    return val > 1;
                }), [2, 3]);
            });
            it("filter after delete", function () {
                var filter2 = [1, 2, 3, 4];
                delete filter2[1];
                delete filter2[3];
                _(filter2.filter(function (val, index, arr) {
                    return val > 1;
                }), [3]);
            });
            it("filter with dynamic modify data", function () {
                var filter3 = [1, 2, 3, 4];
                _(filter3.filter(function (val, index, arr) {
                    arr[index] = arr[index + 1];
                    return val > 2;
                }), [3, 4]);
            });
        });

        describe("#prototype.forEach", function () {
            it("forEach normal", function () {
                var foreach1 = ['a', 'b', 'c', 'd'];
                var result1 = '';
                foreach1.forEach(function (val, index, arr) {
                    result1 += index + val + '';
                });
                _(result1, '0a1b2c3d');
            });
            it("forEach with empty Array", function () {
                var foreach2 = new Array(100);
                var result2 = false;
                foreach2.forEach(function () {
                    result2 = true;
                });
                _(result2, false);
            });
            it("forEach with only signed index", function () {
                var foreach3 = new Array(100);
                var count3 = 0;
                foreach3[10] = undefined;
                foreach3.forEach(function (val, index, arr) {
                    count3++;
                });
                _(count3, 1);
            });

            var foreach4 = ['a', 'b', 'c', 'd', 'e'];
            var result4 = '';
            var count4 = 0;
            it("forEach with dynamic delete", function () {
                foreach4.forEach(function (val, index, arr) {
                    result4 += index + val;
                    delete arr[index + 1];
                    count4++;
                });
                _(result4, '0a2c4e', 'foreach with dynamic delete');
            });
            it("forEach with dynamic delete", function () {
                _(count4, 3);
            });
            it("forEach callback scope", function () {
                var foreach5 = [1];
                var scope5 = {};
                foreach5.forEach(function () {
                    _(scope5, this);
                }, scope5);
            });
        });

        describe("#prototype.indexOf", function () {
            //	"_.prototype.indexOf",
            it("indexOf normal", function () {
                _([0, 1, 2, 3].indexOf(1), 1, 'indexOf normal');
            });
            it("indexOf with duplicate element", function () {
                _([0, 1, 1, 1].indexOf(1), 1);
            });
            it('indexOf search fail', function () {
                _([0, 1, 2, 3].indexOf(4), -1);
            });
            it('indexOf with start offset', function () {
                _([0, 1, 2, 3].indexOf(1, 1), 1);
            });
            it('indexOf with start offset', function () {
                _([0, 1, 2, 3].indexOf(1, 2), -1);
            });
            it('indexOf with start offset < 0', function () {
                _([0, 1, 2, 3].indexOf(1, -3), 1);
            });
            it('indexOf with start offset < 0', function () {
                _([0, 1, 2, 3].indexOf(1, -2), -1);
            });
            it('indexOf find undefined', function () {
                var indexOf1 = [0, 1, 2, 3];
                delete indexOf1[1];
                delete indexOf1[3];
                _(indexOf1.indexOf(undefined), -1);
            });
        });

        describe("#prototype.join", function () {
            //	"_.prototype.join",
            it("join normal", function () {
                _([1, 2, 3, 4].join(), '1,2,3,4');
            });
            it('join with spacer', function () {
                _([1, 2, 3, 4].join('-'), '1-2-3-4');
            });
            it('join with undefined', function () {
                _([1, 2, 3, 4].join(undefined), '1,2,3,4');
            });
            it('join with base object', function () {
                _([1, 2, 3, {1: 'a'}].join(), '1,2,3,[object Object]');
            });
        });

        describe("#prototype.lastIndexOf", function () {
            //	"_.prototype.lastIndexOf",
            it('lastIndexOf normal', function () {
                _([0, 1, 2, 3].lastIndexOf(1), 1);
            });
            it('lastIndexOf with duplicate element', function () {
                _([0, 1, 1, 1].lastIndexOf(1), 3);
            });
            it('lastIndexOf with start offset', function () {
                _([0, 1, 1, 1].lastIndexOf(1, 2), 2);
            });
            it('lastIndexOf find undefined', function () {
                var lastIndex1 = [0, 1, 2, 3];
                delete lastIndex1[1];
                delete lastIndex1[3];
                _(lastIndex1.lastIndexOf(undefined), -1);
            });
        });

        describe("#prototype.map", function () {
            //	"_.prototype.map",
            it('map normal', function () {
                var map1 = [0, 1, 2, 3];
                var result1 = map1.map(function (val, index, arr) {
                    return val * val;
                });
                _(result1, [0, 1, 4, 9]);
            });
            it('map with dynamic delete', function () {
                var map2 = [0, 1, 2, 4];
                delete map2[1];
                delete map2[2];
                var result2 = map2.map(function (val, index, arr) {
                    return val * val;
                });
                _(result2.toString(), [0, undefined, undefined, 16].toString());
            });
        });

        describe("#prototype.pop", function () {
            //	"_.prototype.pop",
            it("pop normal", function () {
                _([1, 2, 4].pop(), 4, 'pop normal');
            });
            it("pop null", function () {
                _([].pop(), undefined, 'pop null');
            });
        });

        describe("#prototype.push", function () {
            //	"_.prototype.push",
            it("push normal", function () {
                _([].push(1), 1, 'push normal');
            });
            it("push with undefined", function () {
                _([].push(undefined), 1, 'push with undefined');
            });
            it("push noop", function () {
                _([].push(), 0, 'push noop');
            });
            it("push multi element", function () {
                _([].push(1, 2, 3, 4), 4, 'push multi element');
            });
        });

        describe("#prototype.reduce", function () {
            //	"_.prototype.reduce",
            it("reduce normal", function () {
                var reduce1 = [1, 2, 3, 4, 5];
                var result1 = reduce1.reduce(function (prep, curr, index, arr) {
                    return prep + curr;
                });
                _(result1, 15);
            });
        });

        describe("#prototype.reduceRight", function () {
            it("reduceRight normal", function () {
                //	"_.prototype.reduceRight",
                var reduceRight1 = ['a', 'b', 'c', 'd'];
                var resultReduce1 = reduceRight1.reduceRight(function (prep, curr, index, arr) {
                    return prep + curr;
                });
                _(resultReduce1, 'dcba', 'reduceRight normal');
            });
        });

        describe("#prototype.reverse", function () {
            it("reverse normal", function () {
                _([1, 2, 3].reverse(), [3, 2, 1], 'reverse normal');
            });
            it("reverse duplicate", function () {
                _([1, 1, 2].reverse(), [2, 1, 1], 'reverse duplicate');
            });
            it("reverse empty", function () {
                _([].reverse(), [], 'reverse empty');
            });
        });

        describe("#prototype.shift", function () {
            it("shift normal", function () {
                _([1, 2, 3, 4].shift(), 1, 'shift normal');
            });
            it("shift empty", function () {
                _([].shift(), undefined, 'shift empty');
            });
            it("shift with undefined", function () {
                _([undefined].shift(), undefined, 'shift with undefined');
            });
        });

        describe("#prototype.slice", function () {
            //	"_.prototype.slice",
            it("slice normal", function () {
                var slice1 = [0, 1, 2, 3];
                slice1 = slice1.slice(1, 3);
                _(slice1, [1, 2], 'slice normal');
            });
            it("slice with larger length", function () {
                var slice2 = [0, 1, 2, 3];
                slice2.slice(1, 6);
                _(slice2, [0, 1, 2, 3], 'slice with larger length');
            });
            it("slice with negative end", function () {
                var slice3 = [0, 1, 2, 3];
                slice3 = slice3.slice(1, -1);
                _(slice3, [1, 2], 'slice with negative end');
            });
            it("slice with negative start", function () {
                var slice4 = [0, 1, 2, 3];
                slice4 = slice4.slice(-2, 3);
                _(slice4, [2], 'slice with negative start');
            });
        });

        describe("#prototype.some", function () {
            //	"_.prototype.some",
            it("some normal true", function () {
                var some1 = [0, 1, 2, 3];
                some1 = some1.some(function (val, index, arr) {
                    return val > 1;
                });
                _(some1, true, 'some normal true');
            });
            it("some normal false", function () {
                var some2 = [0, 1, 2, 3];
                some2 = some2.some(function (val, index, arr) {
                    return val > 100;
                });
                _(some2, false, 'some normal false');
            });
        });

        describe("#prototype.sort", function () {
            //	"_.prototype.sort",
            it("sort empty array is still an empty array", function () {
                var sort1 = [];
                sort1.sort();
                _(sort1, [], 'sort empty array is still an empty array');
            });

            var sort2 = ['JUST', '1', 'test', 'Array', 'to', 'test', 'array', 'Sort', 'about', 'NOW', '!!'];
            var result2 = ['!!', '1', 'Array', 'JUST', 'NOW', 'Sort', 'about', 'array', 'test', 'test', 'to'];
            it("sort array of strings", function () {
                sort2.sort();
                _(sort2, result2, 'sort array of strings');
            });
            it("sort array that already sorted", function () {
                sort2.sort();
                _(sort2, result2, 'sort array that already sorted');
            });

            var sort3 = [100, 1, 2000, -1, 0, 1000023, 12312512, -12331, 123, 54325, -38104783, 93708, 908, -213, -4, 5423, 0];
            var result3 = [-38104783, -12331, -213, -4, -1, 0, 0, 1, 100, 123, 908, 2000, 5423, 54325, 93708, 1000023, 12312512];
            it("sort array of integer", function () {
                sort3.sort(function (a, b) {
                    return a - b;
                });
                _(sort3, result3, 'sort array of integer');
            });
            it("sort array that already sorted", function () {
                sort3.sort(function (a, b) {
                    return a - b;
                });
                _(sort3, result3, 'sort array that already sorted');
            });

            var sort4 = [-1321.3124, 0.31255, 54254, 0, 142.88888708, -321434.58758, -324, 453, 334, -3, 5, -9, 342, -897123.9];
            var result4 = [-897123.9, -321434.58758, -1321.3124, -324, -9, -3, 0, 0.31255, 5, 142.88888708, 334, 342, 453, 54254];
            it("sort array of numbers", function () {
                sort4.sort(function (a, b) {
                    return a - b;
                });
                _(sort4, result4, 'sort array of numbers');
            });
            it("sort array that already sorted", function () {
                sort4.sort(function (a, b) {
                    return a - b;
                });
                _(sort4, result4, 'sort array that already sorted');
            });

            var sort5 = [-1321.3124, 0.31255, 54254, 0, 142.88888708, -321434.58758, -324, 453, 334, -3, 5, -9, 342, -897123.9];
            var result5 = [54254, 453, 342, 334, 142.88888708, 5, 0.31255, 0, -3, -9, -324, -1321.3124, -321434.58758, -897123.9];
            it("sort array with function", function () {
                sort5.sort(function (a, b) {
                    return b - a;
                });
                _(sort5, result5, 'sort array with function');
            });

            function ComparedObject(value) {
                this.value = value;
            };

            ComparedObject.prototype.toString = function () {
                return this.value;
            };

            var co1 = new ComparedObject('a');
            var co2 = new ComparedObject('b');
            var co3 = new ComparedObject('c');
            var co4 = new ComparedObject('d');

            var sort6 = [co3, co4, co2, co1];
            var result6 = [co1, co2, co3, co4];
            it("sort array of objects", function () {
                sort6.sort();
                _(sort6, result6, 'sort array of objects');
            });

            var sort7 = [co4, co2, co1, co3];
            var result7 = [co1, co2, co3, co4];
            it("sort array of objects with function", function () {
                sort7.sort(function (a, b) {
                    return a.value > b.value ? 1 : a.value < b.value ? -1 : 0;
                });
                _(sort7, result7, 'sort array of objects with function');
            });

            // Test sorting arrays of length 1
            var sort8 = ['one'];
            var result8 = ['one'];
            it("sort with one element", function () {
                sort8.sort();
                _(sort8, result8, 'sort with one element');
            });

            var sort9 = [1];
            var result9 = [1];
            it("sort with one element", function () {
                sort9.sort();
                _(sort9, result9, 'sort with one element');
            });

            var sort10 = [1.1];
            var result10 = [1.1];
            it("sort with one element", function () {
                sort10.sort();
                _(sort10, result10, 'sort with one element');
            });

            var sort11 = [co3];
            var result11 = [co3];
            it("sort with one element", function () {
                sort11.sort();
                _(sort11, result11, 'sort with one element');
            });

            var sort12 = [co2];
            var result12 = [co2];
            it("sort one element with function", function () {
                sort12.sort(function (a, b) {
                    return a.value > b.value ? 1 : a.value < b.value ? -1 : 0;
                });
                _(sort12, result12, 'sort one element with function');
            });
        });

        describe("#prototype.splice", function () {
            //	"_.prototype.splice",
            var splice1 = [0, 1, 2, 3];
            splice1.splice(1, 0, 4);
            it("splice normal", function () {
                _([0, 4, 1, 2, 3], splice1, 'splice normal');
            });
            it("splice again", function () {
                splice1.splice(1, 1, 5);
                _([0, 5, 1, 2, 3], splice1, 'splice again');
            });
            it("splice tribble", function () {
                splice1.splice(1, 1);
                _([0, 1, 2, 3], splice1, 'splice tribble');
            });
            it("splice final", function () {
                splice1.splice(1, 1, 4, 5, 6);
                _([0, 4, 5, 6, 2, 3], splice1, 'splice final');
            });
        });

        //	"_.prototype.toLocaleString",
        describe("#prototype.toString", function () {
            //	"_.prototype.toString",
            it("toString normal", function () {
                _(['一', '二', '三'].toString(), '一,二,三', 'toString normal');
            });
        });

        describe("#prototype.unshift", function () {
            //	"_.prototype.unshift",
            it("unshift normal", function () {
                _([1, 2, 3].unshift(0), 4, 'unshift normal');
            });
            it("unshift empty", function () {
                _([1, 2, 3].unshift(), 3, 'unshift empty');
            });
            it("unshift with undefined", function () {
                var unshift1 = [1, 2, 3];
                unshift1.unshift(undefined);
                _(unshift1, [undefined, 1, 2, 3], 'unshift with undefined');
            });
        });

        //	"_.prototype.entries",
        describe("#prototype.find", function () {
            //	"_.prototype.find",
            it("find normal", function () {
                var find1 = [0, 1, 2, 3];
                find1 = find1.find(function (val, index, arr) {
                    return val > 1;
                });
                _(find1, 2, 'find normal');
            });
            it("find string", function () {
                var find2 = ['A', 'B', 'C', 'D'];
                find2 = find2.find(function (val, index, arr) {
                    return val > 'B';
                });
                _(find2, 'C', 'find string');
            });
        });

        describe("#prototype.findIndex", function () {
            //	"_.prototype.findIndex",
            it("findIndex normal", function () {
                var fi1 = [0, 1, 2, 3];
                fi1 = fi1.findIndex(function (val, index, arr) {
                    return val > 1;
                });
                _(fi1, 2, 'findIndex normal');
            });
            it("findIndex string", function () {
                var fi2 = ['A', 'B', 'C', 'D'];
                fi2 = fi2.findIndex(function (val, index, arr) {
                    return val > 'B';
                });
                _(fi2, 2, 'findIndex string');
            });
            it("findIndex can\'t find", function () {
                var fi3 = ['A', 'B', 'C', 'D'];
                fi3 = fi3.findIndex(function (val, index, arr) {
                    return val > 'Z';
                });
                _(fi3, -1, 'findIndex can\'t find');
            });
        });
        //	"_.prototype.keys"
    });
})(this);