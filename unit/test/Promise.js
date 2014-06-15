var _ = QUnit.deepEqual;

asyncTest("Promise Unit Test", function() {
    var p = new Promise(function(resolve, reject) { resolve(3); });
    Promise.all([true, p]).then(function(values) {
        _(values, [ true, 3 ], 'normal');
    });
    
	var p1 = new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve("one");
		}, 500);
	});
	var p2 = new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve("two");
		}, 100);
	}); 

    Promise.race([p1, p2]).then(function(value) {
        _(value, "two", 'p1 p2');
    });

	var p3 = new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve("three");
		}, 100, "three");
	});
	var p4 = new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject("four");
		}, 500);
	}); 

    Promise.race([p3, p4]).then(function(value) {
        _(value, "three", 'p3 p4');
    }, function(reason) {
        // Not called
        throw new Error("p3 p4");
    });

	var p5 = new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve("five");
		}, 500);
	});
	var p6 = new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject("six");
		}, 100);
	}); 

    Promise.race([p5, p6]).then(function(value) {
        // Not called
        throw new Error("p5 p6");
    }, function(reason) {
        _(reason, "six", 'p5 p6');
        start();
    });
});
