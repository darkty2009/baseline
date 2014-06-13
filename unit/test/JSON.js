var _ = QUnit.deepEqual;

test("JSON Unit Test", function() {
    //    '_.parse',
    _(JSON.parse('{}'), {});
    _(JSON.parse('true'), true);
    _(JSON.parse('"foo"'), "foo");
    _(JSON.parse('[1, 5, "false"]'), [1, 5, "false"]);
    _(JSON.parse('null'), null);

    //    '_.stringify'
    _(JSON.stringify({}), '{}');
    _(JSON.stringify(true), 'true');
    _(JSON.stringify("foo"), '"foo"');
    _(JSON.stringify([1, "false", false]), '[1,"false",false]');
    _(JSON.stringify({ x: 5 }), '{"x":5}');
    _(JSON.stringify({x: 5, y: 6}), '{"x":5,"y":6}');
});
