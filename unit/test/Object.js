var _ = QUnit.deepEqual;

test("Object Unit Test", function() {
	// "_.create",
	_(Object.create(Object.prototype), {}, 'create normal');
	var create2 = Object.create(Object.prototype, {
		a:{value:1},
		b:{value:2}
	});
	_(create2.a, 1, 'create with properties');
	_(Object.create([]) instanceof Array, true, 'create array');
	_(typeof Object.create(function() {}), 'object', 'create function');
	
	// "_.defineProperties",
	// "_.defineProperty",
	// "_.freeze",
	// "_.getOwnPropertyDescriptor",
	// "_.getOwnPropertyNames",
	// "_.getPrototypeOf",
	// "_.isExtensible",
	// "_.isFrozen",
	// "_.isSealed",
	// "_.keys",
	_(Object.keys({a:1,b:2,c:3,d:4}), ['a', 'b', 'c', 'd'], 'keys normal');
	
	// "_.preventExtensions",
	// "_.hasOwnProperty",
	// "_.isPrototypeOf",
	// "_.propertyIsEnumerable",
	// "_.toLocaleString",
	// "_.toString",
	// "_.valueOf",
	// "_.seal",
	// "_.is",
	var object = {};
	_(Object.is(object, object), true);
	_(Object.is(object, {}), false);

	_(Object.is(NaN, NaN), true);
	_(Object.is(0, 0), true);
	_(Object.is(1, 1), true);
	_(Object.is(-1, -1), true);
	_(Object.is(123, 123), true);
	_(Object.is(0, -0), false);
	_(Object.is(-0, 0), false);
	_(Object.is(0, 1), false);

	_(Object.is(true, true), true);
	_(Object.is(false, false), true);
	_(Object.is(true, false), false);
	_(Object.is(false, true), false);

	_(Object.is('', ''), true);
	_(Object.is('a', 'a'), true);
	_(Object.is('', 'a'), false);
	_(Object.is('a', ''), false);
	_(Object.is('a', 'b'), false);

	_(Object.is(true, 'true'), false);
	_(Object.is('true', true), false);
	_(Object.is(false, 'false'), false);
	_(Object.is('false', false), false);
	_(Object.is(0, '0'), false);
	_(Object.is('0', 0), false); 
	
	// "_.setPrototypeOf",
	// "_.prototype.watch",
    var watchObj = {x:2};
    watchObj.watch('x', function(key, oldVal, newVal) {
       return oldVal + newVal;
    });
    watchObj.x = 3;
    _(watchObj.x, 5, 'watch normal');

	// "_.prototype.unwatch"
    watchObj.unwatch('x');
    watchObj.x = 3;
    _(watchObj.x, 3, 'unwatch normal');
});
