var _ = QUnit.deepEqual;

test("Array Unit Test", function() {
	//	"_.isArray",
	_(Array.isArray([]), true, '[] is an Array');
	_(Array.isArray({}), false, '{} is not an Array');
	_(Array.isArray(function() {}), false, 'function is not an Array');
	_(Array.isArray(0), false, 'number is not an Array');
	_(Array.isArray(undefined), false, 'undefined is not an Array');
	_(Array.isArray(document.body.childNodes), false, 'DomList is not an Array');
	
	//	"_.of",
	_(Array.of(1, 2, 3, 4), [1, 2, 3, 4], 'create an Array');
	_(Array.of(1, "2", null, {}), [1, "2", null, {}], 'create an Array');
	_(Array.of({}), [{}], 'create an Array by one element');
	_(Array.of(), [], 'create an empty Array');
	
	//	"_.prototype.concat",
	_([1, 2, 3].concat([4, 5, 6]), [1, 2, 3, 4, 5, 6], 'concat two Array');
	_([1, 2, 3].concat(), [1, 2, 3], 'concat with nothing');
	_([1, 2, 3].concat(null), [1, 2, 3, null], 'concat with null');
	_([1, 2, 3].concat(undefined), [1, 2, 3, undefined], 'concat with undefined');
	_([1, 2, 3].concat(4), [1, 2, 3, 4], 'concat with an non-Array element');
	_([1, 2, 3].concat({0:4, 1:5, 2:6}), [1, 2, 3, {0:4, 1:5, 2:6}], 'concat with an indexed Object');
	
	//	"_.prototype.every",
	var every1 = [1, 2, 3].every(function(val, index, arr) {
		return val > 0;
	});
	var every2 = [1, 2, 3].every(function(val, index, arr) {
		return val > 1;
	});
	var every3 = [1, 2, 3].every(function(val, index, arr) {});
	var every5 = [].every(function(val, index, arr) {
		return val > 0;
	});
	var every6Obj = {
		minNum:5
	};
	var every6 = [6, 7, 8].every(function(val, index, arr) {
		return val > this.minNum;
	}, every6Obj);
	_(every1, true, 'every normal');
	_(every2, false, 'every some element is error');
	_(every3, false, 'every filter return nothing');
	
	try {
		var every4 = [1, 2, 3].every();
		_(1, 0, 'every has no filter throw error');
	}catch(e) {
		_(1, 1, 'every has no filter throw error');
	}
	_(every5, true, 'every nothing to filter');
	_(every6, true, 'every filter with context');
	
	//	"_.prototype.filter",
	_([1, 2, 3].filter(function(val, index, arr) {
		return val > 1;
	}), [2, 3], 'filter normal');
	var filter2 = [1, 2, 3, 4];
	delete filter2[1];
	delete filter2[3];
	_(filter2.filter(function(val, index, arr) {
		return val > 1;
	}), [3], 'filter after delete');
	var filter3 = [1, 2, 3, 4];
	_(filter3.filter(function(val, index, arr) {
		arr[index] = arr[index + 1];
		return val > 2;
	}), [3, 4], 'filter with dynamic modify data');
	
	//	"_.prototype.forEach",
	var foreach1 = ['a', 'b', 'c', 'd'];
	var result1 = '';
	foreach1.forEach(function(val, index, arr) {
		result1 += index + val + '';
	});
	_(result1, '0a1b2c3d', 'forEach normal');
	var foreach2 = new Array(100);
	var result2 = false;
	foreach2.forEach(function() {
		result2 = true;
	});
	_(result2, false, 'forEach with empty array');
	var foreach3 = new Array(100);
	var count3 = 0;
	foreach3[10] = undefined;	
	foreach3.forEach(function(val, index, arr) {
		count3++;
	});
	_(count3, 1, 'forEach with only signed index');
	var foreach4 = ['a', 'b', 'c', 'd', 'e'];
	var result4 = '';
	var count4 = 0;
	foreach4.forEach(function(val, index, arr) {
		result4 += index + val;
		delete arr[index + 1];
		count4++;
	});
	_(result4, '0a2c4e', 'foreach with dynamic delete');
	_(count4, 3, 'foreach with dynamic delete');
	var foreach5 = [1];
	var scope5 = {};
	foreach5.forEach(function() {
		_(scope5, this, 'foreach callback scope');
	}, scope5);
	
	//	"_.prototype.indexOf",
	_([0, 1, 2, 3].indexOf(1), 1, 'indexOf normal');
	_([0, 1, 1, 1].indexOf(1), 1, 'indexOf with duplicate element');
	_([0, 1, 2, 3].indexOf(4), -1, 'indexOf search fail');
	_([0, 1, 2, 3].indexOf(1, 1), 1, 'indexOf with start offset');
	_([0, 1, 2, 3].indexOf(1, 2), -1, 'indexOf with start offset');
	_([0, 1, 2, 3].indexOf(1, -3), 1, 'indexOf with start offset < 0');
	_([0, 1, 2, 3].indexOf(1, -2), -1, 'indexOf with start offset < 0');
	var indexOf1 = [0, 1, 2, 3];
	delete indexOf1[1];
	delete indexOf1[3];
	_(indexOf1.indexOf(undefined), -1, 'indexOf find undefined'); 
	
	//	"_.prototype.join",
	_([1, 2, 3, 4].join(), '1,2,3,4', 'join normal');
	_([1, 2, 3, 4].join('-'), '1-2-3-4', 'join with spacer');
	_([1, 2, 3, 4].join(undefined), '1,2,3,4', 'join with undefined');
	_([1, 2, 3, {1:'a'}].join(), '1,2,3,[object Object]', 'join with base object');
	
	//	"_.prototype.lastIndexOf",
	_([0, 1, 2, 3].lastIndexOf(1), 1, 'lastIndexOf normal');
    _([0, 1, 1, 1].lastIndexOf(1), 3, 'lastIndexOf with duplicate element');
    _([0, 1, 1, 1].lastIndexOf(1, 2), 2, 'lastIndexOf with start offset');
	var lastIndex1 = [0, 1, 2, 3];
	delete lastIndex1[1];
	delete lastIndex1[3];
	_(lastIndex1.lastIndexOf(undefined), -1, 'lastIndexOf find undefined');
  
	//	"_.prototype.map",
	var map1 = [0, 1, 2, 3];
	var result1 = map1.map(function(val, index, arr) {
		return val * val;
	});
	_(result1, [0, 1, 4, 9], 'map normal');
	var map2 = [0, 1, 2, 4];
	delete map2[1];
	delete map2[2];
	var result2 = map2.map(function(val, index, arr) {
		return val * val;
	});
	_(result2, [0, undefined, undefined, 16], 'map with dynamic delete');
	
	//	"_.prototype.pop",
	_([1, 2, 4].pop(), 4, 'pop normal');
	_([].pop(), undefined, 'pop null');
	
	//	"_.prototype.push",
	_([].push(1), 1, 'push normal');
	_([].push(undefined), 1, 'push with undefined');
	_([].push(), 0, 'push noop');
	_([].push(1, 2, 3, 4), 4, 'push multi element');
	
	//	"_.prototype.reduce",
	var reduce1 = [1, 2, 3, 4, 5];
	var result1 = reduce1.reduce(function(prep, curr, index, arr) {
		return prep + curr;
	});
	_(result1, 15, 'reduce normal');
	
	//	"_.prototype.reduceRight",
	var reduceRight1 = ['a', 'b', 'c', 'd'];
	var resultReduce1 = reduceRight1.reduceRight(function(prep, curr, index, arr) {
		return prep + curr;
	});
	_(resultReduce1, 'dcba', 'reduceRight normal');
	
	//	"_.prototype.reverse",
	_([1, 2, 3].reverse(), [3, 2, 1], 'reverse normal');
	_([1, 1, 2].reverse(), [2, 1, 1], 'reverse duplicate');
	_([].reverse(), [], 'reverse empty');
	
	//	"_.prototype.shift",
	_([1, 2, 3, 4].shift(), 1, 'shift normal');
	_([].shift(), undefined, 'shift empty');
	_([undefined].shift(), undefined, 'shift with undefined');
	
	//	"_.prototype.slice",
	var slice1 = [0, 1, 2, 3];
	slice1 = slice1.slice(1, 3);
	_(slice1, [1, 2], 'slice normal');
	var slice2 = [0, 1, 2, 3];
	slice2.slice(1, 6);
	_(slice2, [0, 1, 2, 3], 'slice with larger length');
	var slice3 = [0, 1, 2, 3];
	slice3 = slice3.slice(1, -1);
	_(slice3, [1, 2], 'slice with negative end');
	var slice4 = [0, 1, 2, 3];
	slice4 = slice4.slice(-2, 3);
	_(slice4, [2], 'slice with negative start');
	
	//	"_.prototype.some",
	var some1 = [0, 1, 2, 3];
	some1 = some1.some(function(val, index, arr) {
		return val > 1;
	});
	_(some1, true, 'some normal true');
	var some2 = [0, 1, 2, 3];
	some2 = some2.some(function(val, index, arr) {
		return val > 100;
	});
	_(some2, false, 'some normal false');
	
	//	"_.prototype.sort",
	var sort1 = [];
	sort1.sort();
	_(sort1, [], 'sort empty array is still an empty array');

	var sort2 = ['JUST', '1', 'test', 'Array', 'to', 'test', 'array', 'Sort', 'about', 'NOW', '!!'];
	var result2 = ['!!', '1', 'Array', 'JUST', 'NOW', 'Sort', 'about', 'array', 'test', 'test', 'to'];
	sort2.sort();
	_(sort2, result2, 'sort array of strings');
	sort2.sort();
	_(sort2, result2, 'sort array that already sorted');

	var sort3 = [100, 1, 2000, -1, 0, 1000023, 12312512, -12331, 123, 54325, -38104783, 93708, 908, -213, -4, 5423, 0];
	var result3 = [-38104783, -12331, -213, -4, -1, 0, 0, 1, 100, 123, 908, 2000, 5423, 54325, 93708, 1000023, 12312512];
	sort3.sort(function(a, b) {
		return a - b;
	});
	_(sort3, result3, 'sort array of integer');
	sort3.sort(function(a, b) {
		return a - b;
	});
	_(sort3, result3, 'sort array that already sorted');

	var sort4 = [-1321.3124, 0.31255, 54254, 0, 142.88888708, -321434.58758, -324, 453, 334, -3, 5, -9, 342, -897123.9];
	var result4 = [-897123.9, -321434.58758, -1321.3124, -324, -9, -3, 0, 0.31255, 5, 142.88888708, 334, 342, 453, 54254];
	sort4.sort(function(a, b) {
		return a - b;
	});
	_(sort4, result4, 'sort array of numbers');
	sort4.sort(function(a, b) {
		return a - b;
	});
	_(sort4, result4, 'sort array that already sorted');

	var sort5 = [-1321.3124, 0.31255, 54254, 0, 142.88888708, -321434.58758, -324, 453, 334, -3, 5, -9, 342, -897123.9];
	var result5 = [54254, 453, 342, 334, 142.88888708, 5, 0.31255, 0, -3, -9, -324, -1321.3124, -321434.58758, -897123.9];
	sort5.sort(function(a, b) {
		return b-a;
	});
	_(sort5, result5, 'sort array with function');

	function ComparedObject(value) {
		this.value = value;
	};

	ComparedObject.prototype.toString = function() {
		return this.value;
	};

	var co1 = new ComparedObject('a');
	var co2 = new ComparedObject('b');
	var co3 = new ComparedObject('c');
	var co4 = new ComparedObject('d');

	var sort6 = [co3, co4, co2, co1];
	var result6 = [co1, co2, co3, co4];
	sort6.sort();
	_(sort6, result6, 'sort array of objects');

	var sort7 = [co4, co2, co1, co3];
	var result7 = [co1, co2, co3, co4];
	sort7.sort(function(a, b) {
		return a.value > b.value ? 1 : a.value < b.value ? -1 : 0;
	});
	_(sort7, result7, 'sort array of objects with function');

	// Test sorting arrays of length 1
	var sort8 = ['one'];
	var result8 = ['one'];
	sort8.sort();
	_(sort8, result8, 'sort with one element');

	var sort9 = [1];
	var result9 = [1];
	sort9.sort();
	_(sort9, result9, 'sort with one element');

	var sort10 = [1.1];
	var result10 = [1.1];
	sort10.sort();
	_(sort10, result10, 'sort with one element');

	var sort11 = [co3];
	var result11 = [co3];
	sort11.sort();
	_(sort11, result11, 'sort with one element');

	var sort12 = [co2];
	var result12 = [co2];
	sort12.sort(function(a, b) {
		return a.value > b.value ? 1 : a.value < b.value ? -1 : 0;
	});
	_(sort12, result12, 'sort one element with function');
	
	//	"_.prototype.splice",
	var splice1 = [0, 1, 2, 3];
	splice1.splice(1, 0, 4);
	_([0, 4, 1, 2, 3], splice1, 'splice normal');
	splice1.splice(1, 1, 5);
	_([0, 5, 1, 2, 3], splice1, 'splice again');
	splice1.splice(1, 1);
	_([0, 1, 2, 3], splice1, 'splice tribble');
	splice1.splice(1, 1, 4, 5, 6);
	_([0, 4, 5, 6, 2, 3], splice1, 'splice final'); 
  
	//	"_.prototype.toLocaleString",
	//	"_.prototype.toString",
	_(['一', '二', '三'].toString(), '一,二,三', 'toString normal');
	
	//	"_.prototype.unshift",
	_([1, 2, 3].unshift(0), 4, 'unshift normal');
	_([1, 2, 3].unshift(), 3, 'unshift empty');
	var unshift1 = [1, 2, 3];
	unshift1.unshift(undefined);
	_(unshift1, [undefined, 1, 2, 3], 'unshift with undefined');
	
	//	"_.prototype.entries",
	//	"_.prototype.find",
	var find1 = [0, 1, 2, 3];
	find1 = find1.find(function(val, index, arr) {
		return val > 1;
	});
	_(find1, 2, 'find normal');
	var find2 = ['A', 'B', 'C', 'D'];
	find2 = find2.find(function(val, index, arr) {
		return val > 'B';
	});
	_(find2, 'C', 'find string');
	
	//	"_.prototype.findIndex",
	var fi1 = [0, 1, 2, 3];
	fi1 = fi1.findIndex(function(val, index, arr) {
		return val > 1;
	});
	_(fi1, 2, 'findIndex normal');
	var fi2 = ['A', 'B', 'C', 'D'];
	fi2 = fi2.findIndex(function(val, index, arr) {
		return val > 'B';
	});
	_(fi2, 2, 'findIndex string');
	var fi3 = ['A', 'B', 'C', 'D'];
	fi3 = fi3.findIndex(function(val, index, arr) {
		return val > 'Z';
	});
	_(fi3, -1, 'findIndex can\'t find');
	
	//	"_.prototype.keys"
});
