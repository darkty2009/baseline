require("../build/baseline");
var assert = require("assert");

describe("Array", function() {
    describe("#[function and property]", function() {
        var _ = Array;

        var test = [
            "_.isArray",
            "_.of",
            // "_.from",
            "_.prototype.concat",
            "_.prototype.copyWithin",
            "_.prototype.every",
            "_.prototype.filter",
            "_.prototype.forEach",
            "_.prototype.indexOf",
            "_.prototype.join",
            "_.prototype.lastIndexOf",
            "_.prototype.map",
            "_.prototype.pop",
            "_.prototype.push",
            "_.prototype.reduce",
            "_.prototype.reduceRight",
            "_.prototype.reverse",
            "_.prototype.shift",
            "_.prototype.slice",
            "_.prototype.some",
            "_.prototype.sort",
            "_.prototype.splice",
            "_.prototype.toLocaleString",
            "_.prototype.toString",
            "_.prototype.unshift",
            "_.prototype.entries",
            "_.prototype.fill",
            "_.prototype.find",
            "_.prototype.findIndex",
            "_.prototype.keys"
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                    'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});


describe("Boolean", function() {
    describe("#[function and property]", function() {
        var _ = Boolean;

        var test = [
            "_.prototype.toString",
            "_.prototype.valueOf"
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Date", function() {
    describe("#[function and property]", function() {
        var _ = Date;

        var test = [
            '_.UTC',
            '_.now',
            '_.parse',
            '_.prototype.getDate',
            '_.prototype.getDay',
            '_.prototype.getFullYear',
            '_.prototype.getHours',
            '_.prototype.getMilliseconds',
            '_.prototype.getMinutes',
            '_.prototype.getMonth',
            '_.prototype.getSeconds',
            '_.prototype.getTime',
            '_.prototype.getTimezoneOffset',
            '_.prototype.getUTCDate',
            '_.prototype.getUTCDay',
            '_.prototype.getUTCFullYear',
            '_.prototype.getUTCHours',
            '_.prototype.getUTCMilliseconds',
            '_.prototype.getUTCMinutes',
            '_.prototype.getUTCMonth',
            '_.prototype.getUTCSeconds',
            '_.prototype.getYear',
            '_.prototype.setDate',
            '_.prototype.setFullYear',
            '_.prototype.setHours',
            '_.prototype.setMilliseconds',
            '_.prototype.setMinutes',
            '_.prototype.setMonth',
            '_.prototype.setSeconds',
            '_.prototype.setTime',
            '_.prototype.setUTCDate',
            '_.prototype.setUTCFullYear',
            '_.prototype.setUTCHours',
            '_.prototype.setUTCMilliseconds',
            '_.prototype.setUTCMinutes',
            '_.prototype.setUTCMonth',
            '_.prototype.setUTCSeconds',
            '_.prototype.setYear',
            '_.prototype.toDateString',
            '_.prototype.toGMTString',
            '_.prototype.toISOString',
            '_.prototype.toJSON',
            '_.prototype.toLocaleDateString',
            '_.prototype.toLocaleString',
            '_.prototype.toLocaleTimeString',
            '_.prototype.toString',
            '_.prototype.toUTCString',
            '_.prototype.valueOf'
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Function", function() {
    describe("#[function and property]", function() {
        var _ = Function;

        var $ = function() {};
        var test = [
            '_.length',
            '_.prototype.apply',
            '_.prototype.bind',
            '_.prototype.call',
            '_.prototype.toString',
            '$.caller'
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Infinity", function() {
    assert(true, typeof Infinity !== 'undefined');
});

describe("isFinite", function() {
    assert(true, typeof isFinite !== 'undefined');
});

describe("isNaN", function() {
    assert(true, typeof isNaN !== 'undefined');
});

describe("Iterator (todo: check the implement is right to nodejs ?)", function() {
    describe("#[function and property]", function() {
        it("all function and property is exist and no error", function() {
            assert.equal(true, (typeof Iterator !== 'undefined'));
            assert.equal(true, (typeof (Iterator({}).next) !== 'undefined'));

            var ite = Iterator(["q", "w", {}]);
            assert.deepEqual(ite.next(), {value:'q', done:false});
            assert.deepEqual(ite.next(), {value:'w', done:false});
            assert.deepEqual(ite.next(), {value:{}, done:false});
            assert.deepEqual(ite.next(), {done:true});
        });
    });
});

describe("JSON", function() {
    describe("#[function and property]", function() {
        it("all function and property is exist and no error", function() {
            assert.equal(true, (typeof JSON !== 'undefined'));
            assert.equal(true, (typeof JSON.parse !== 'undefined'));
            assert.equal(true, (typeof JSON.stringify !== 'undefined'));
        });
    });
});

describe("Map", function() {
    describe("#[function and property]", function() {
        var _ = Map;

        var test = [
            '_.prototype.clear',
            '_.prototype[\'delete\']',
            '_.prototype.entries',
            '_.prototype.forEach',
            '_.prototype.get',
            '_.prototype.has',
            '_.prototype.keys',
            '_.prototype.set',
            '_.prototype.values'
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Math", function() {
    describe("#[function and property]", function() {
        var _ = Math;

        var test = [
            '_.E',
            '_.LN10',
            '_.LN2',
            '_.LOG10E',
            '_.LOG2E',
            '_.PI',
            '_.SQRT1_2',
            '_.SQRT2',
            '_.abs',
            '_.acos',
            '_.asin',
            '_.atan',
            '_.atan2',
            '_.ceil',
            '_.cos',
            '_.exp',
            '_.floor',
            '_.log',
            '_.max',
            '_.min',
            '_.pow',
            '_.random',
            '_.round',
            '_.sin',
            '_.sqrt',
            '_.tan',
            '_.acosh',
            '_.asinh',
            '_.atanh',
            '_.cbrt',
            '_.clz32',
            '_.cosh',
            '_.expm1',
            '_.fround',
            '_.hypot',
            '_.imul',
            '_.log10',
            '_.log1p',
            '_.log2',
            '_.sign',
            '_.sinh',
            '_.tanh',
            '_.trunc'
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Number", function() {
    describe("#[function and property]", function() {
        var _ = Number;

        var test = [
            '_.EPSILON',
            '_.MAX_VALUE',
            '_.MIN_VALUE',
            '_.NEGATIVE_INFINITY',
            '_.NaN',
            '_.POSITIVE_INFINITY',
            '_.prototype.toExponential',
            '_.prototype.toFixed',
            '_.prototype.toLocaleString',
            '_.prototype.toPrecision',
            '_.prototype.toString',
            '_.prototype.valueOf',
            '_.isFinite',
            '_.isInteger',
            '_.isNaN',
            '_.parseFloat',
            '_.parseInt',
            '_.toInteger'
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Object", function() {
    describe("#[function and property]", function() {
        var _ = Object;

        var test = [
            "_.create",
    //		"_.defineProperties",
    //		"_.defineProperty",
    //		"_.freeze",
    //		"_.getOwnPropertyDescriptor",
            "_.getOwnPropertyNames",
            "_.getPrototypeOf",
    //		"_.isExtensible",
    //		"_.isFrozen",
    //		"_.isSealed",
            "_.keys",
    //		"_.preventExtensions",
            "_.hasOwnProperty",
            "_.isPrototypeOf",
            "_.propertyIsEnumerable",
            "_.toLocaleString",
            "_.toString",
            "_.valueOf",
    //		"_.seal",
            "_.is",
            "_.setPrototypeOf"
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("RegExp", function() {
    describe("#[function and property]", function() {
        var _ = RegExp;

        var test = [
            "$.lastIndex",
            "$.global",
            '$.ignoreCase',
            '$.multiline',
            '$.source',
            '$.exec',
            '$.test',
            '$.toString'
        ];

        var $ = new RegExp("^$");
        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Set", function() {
    describe("#[function and property]", function() {
        var _ = Set;

        var test = [
            "_.prototype.add",
            "_.prototype.clear",
            "_.prototype['delete']",
            "_.prototype.entries",
            "_.prototype.forEach",
            "_.prototype.has",
            "_.prototype.values"
        ];

        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("String", function() {
    describe("#[function and property]", function() {
        var _ = String;

        var test = [
            "$.length",
            '_.fromCharCode',
            '_.prototype.anchor',
            '_.prototype.big',
            '_.prototype.blink',
            '_.prototype.bold',
            '_.prototype.charAt',
            '_.prototype.charCodeAt',
            '_.prototype.concat',
            '_.prototype.fixed',
            '_.prototype.fontcolor',
            '_.prototype.fontsize',
            '_.prototype.indexOf',
            '_.prototype.italics',
            '_.prototype.lastIndexOf',
            '_.prototype.link',
            '_.prototype.localeCompare',
            '_.prototype.match',
            '_.prototype.replace',
            '_.prototype.search',
            '_.prototype.slice',
            '_.prototype.small',
            '_.prototype.split',
            '_.prototype.strike',
            '_.prototype.sub',
            '_.prototype.substr',
            '_.prototype.substring',
            '_.prototype.sup',
            '_.prototype.toLocaleLowerCase',
            '_.prototype.toLocaleUpperCase',
            '_.prototype.toLowerCase',
            '_.prototype.toString',
            '_.prototype.toUpperCase',
            '_.prototype.trim',
            '_.prototype.valueOf',
            '_.fromCodePoint',
            '_.prototype.codePointAt',
            '_.prototype.contains',
            '_.prototype.endsWith',
            '_.prototype.repeat',
            '_.prototype.startsWith',
            '_.prototype.trimLeft',
            '_.prototype.trimRight'
        ];

        var $ = new String("1234567890");
        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});

describe("Promise", function() {
    describe("#[function and property]", function() {
        var _ = Promise;

        var test = [
            "$.then",
            "$['catch']",
            "_.resolve",
            "_.reject",
            "_.all",
            "_.race"
        ];

        var $ = new Promise(function() {}, function() {});
        for(var i=0;i<test.length;i++) {
            eval([
                'it("'+test[i]+'", function() {',
                'assert.equal(true, typeof '+test[i]+' !== "undefined");',
                '});'
            ].join(""));
        }
    });
});