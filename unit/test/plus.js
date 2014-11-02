var _ = QUnit.deepEqual;

test("Plus Temp Unit Test", function() {
    var count = 1;
    function DebounceTest() {
        console.log(new Date().getTime(), count);
        count++;
    }

    console.log(new Date().getTime());
    var cid = setInterval(DebounceTest.debounce(100), 50);
    setTimeout(function() {
        clearInterval(cid);
    }, 500);

    setTimeout(function() {
        console.log('----------------------------');

        console.log(new Date().getTime());
        count = 1;
        var tid = setInterval(DebounceTest.throttle(100), 50);
        setTimeout(function() {
            clearInterval(tid);
        }, 500);
    }, 700);

    _(1, 1);
});