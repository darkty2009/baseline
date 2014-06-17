test("Array", function() {
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
	
	ok(_, "Array");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+", test[i])");
	}
});

test("Boolean", function() {
	var _ = Boolean;
	
	var test = [
		"_.prototype.toString",
		"_.prototype.valueOf"
	];
	
	ok(_, "Boolean");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+", test[i])");
	}
});

test("Date", function() {
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
	
	ok(_, "Date");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+", test[i])");
	}
});

test("decodeURI()", function() {
	ok(decodeURI, 'decodeURI()');
});

test("decodeURIComponent()", function() {
	ok(decodeURIComponent, 'decodeURIComponent()');
});

test("encodeURI()", function() {
	ok(encodeURI, 'encodeURI()');
});

test("encodeURIComponent()", function() {
	ok(encodeURIComponent, 'encodeURIComponent()');
});

test("Error", function() {
	var _ = Error;
	
	var test = [
		"_.prototype.message",
		"_.prototype.name",
		"_.prototype.toString"
	];
	
	ok(_, "Error");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("escape()", function() {
	ok(escape, 'escape()');
});

test("eval()", function() {
	ok(eval, 'eval()');
});

test("EvalError", function() {
	var _ = EvalError;
	
	var test = [
		"_.prototype.message",
		"_.prototype.name",
		"_.prototype.toString"
	];
	
	ok(_, "EvalError");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("Function", function() {
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
	
	ok(_, "Function");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" !== undefined, test[i])");
	}
});

test("Infinity", function() {
	ok(Infinity, 'Infinity');
});

test("isFinite()", function() {
	ok(isFinite, 'isFinite()');
});

test("isNaN()", function() {
	ok(isNaN, 'isNaN()');
});

test("Iterator()", function() {
	ok(Iterator, "Iterator()");
	ok(Iterator({}).next, "next");
	
	var ite = Iterator(["q", "w", {}]);
	ok(ite.next(), [0, 'q'], "next.value");
	ok(ite.next(), [1, 'w'], "next.done");
	ok(ite.next(), [2], {}, "next over");
});

test("JSON", function() {
	var _ = JSON;
	
	var test = [
		'_.parse',
		'_.stringify'
	];
	
	ok(_, "JSON");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" !== undefined, test[i])");
	}
});

test("Map", function() {
	var _ = Map;

	var test = [
		'_.prototype.clear',
		'_.prototype["delete"]',
		'_.prototype.entries',
		'_.prototype.forEach',
		'_.prototype.get',
		'_.prototype.has',
		'_.prototype.keys',
		'_.prototype.set',
		'_.prototype.values'
	];
	
	ok(_, "Map");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" !== undefined, test[i])");
	}
});

test("Math", function() {
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
	
	ok(_, "Math");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" !== undefined, test[i])");
	}
});

test("Number", function() {
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
	
	ok(_, "Number");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" !== undefined, test[i])");
	}
});

test("Object", function() {
	var _ = Object;
	
	var test = [
		"_.create",
//		"_.defineProperties",
		"_.defineProperty",
//		"_.freeze",
		"_.getOwnPropertyDescriptor",
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
		"_.setPrototypeOf",
		"_.prototype.watch",
		"_.prototype.unwatch"
	];
	
	ok(_, "Object");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+", test[i])");
	}
});

test("parseFloat()", function() {
	ok(parseFloat, 'parseFloat()');
});

test("parseInt()", function() {
	ok(parseInt, 'parseInt()');
});

test("Proxy", function() {
	ok(Proxy, 'Proxy');
});

test("RangeError", function() {
	var _ = RangeError;
	
	var test = [
		"_.prototype.message",
		"_.prototype.name",
		"_.prototype.toString"
	];
	
	ok(_, "RangeError");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("ReferenceError", function() {
	var _ = ReferenceError;
	
	var test = [
		"_.prototype.message",
		"_.prototype.name",
		"_.prototype.toString"
	];
	
	ok(_, "ReferenceError");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("RegExp", function() {
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
	
	ok(_, "RegExp");
	var $ = new RegExp("^$");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("Set", function() {
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
	
	ok(_, "Set");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("String", function() {
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
	
	ok(_, "String");
	var $ = new String("1234567890");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("SyntaxError", function() {
	var _ = SyntaxError;
	
	var test = [
		"_.prototype.message",
		"_.prototype.name",
		"_.prototype.toString"
	];
	
	ok(_, "SyntaxError");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("TypeError", function() {
	var _ = TypeError;
	
	var test = [
		"_.prototype.message",
		"_.prototype.name",
		"_.prototype.toString"
	];
	
	ok(_, "TypeError");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("unescape()", function() {
	ok(unescape, 'unescape()');
});

test("URIError", function() {
	var _ = URIError;
	
	var test = [
		"_.prototype.message",
		"_.prototype.name",
		"_.prototype.toString"
	];
	
	ok(_, "URIError");
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});

test("Promise", function() {
	var _ = Promise;
	
	var test = [
		"$.then",
		"$['catch']",
		"_.resolve",
		"_.reject",
		"_.all",
		"_.race"
	];
	
	ok(_, "Promise");
	var $ = new Promise(function() {}, function() {});
	for(var i=0;i<test.length;i++) {
		eval("ok("+test[i]+" != undefined, test[i])");
	}
});
