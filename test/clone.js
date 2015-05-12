var test = require("tape");
var o = require("../");

test(".clone()", function(t){
    var date = new Date();
    t.deepEqual(o.clone(date), {});
    date.one = 1;
    t.deepEqual(o.clone(date), { one: 1 });
    t.deepEqual(o.clone({ clive: "yeah" }), { clive: "yeah" });
    t.deepEqual(o.clone([ 1, 2, 3 ]), [ 1, 2, 3 ]);
    t.end();
});
