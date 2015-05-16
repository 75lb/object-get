var test = require("tape");
var o = require("../");

test(".extend, the original input object is not extended", function(t){
    var input = {};
    var output = o.extend(input, { one: 1 });
    t.deepEqual(output, { one: 1 });
    t.notStrictEqual(output, input);
    t.end();
});

test(".extend, primative type property values", function(t){
    var output = o.extend({}, { one: 1 });
    t.deepEqual(output, { one: 1 });

    output = o.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
    t.deepEqual(output, { one: "one", two: 2, three: 3, four: 4 });

    t.end();
});

test(".extend, object type property values", function(t){
    var input = { peas: { } };
    var pie = { pie: { content: "steak and ale" } };
    var chips = { chips: { compliments: "fish" } };
    var expected = {
        peas: {},
        pie: { content: "steak and ale" },
        chips: { compliments: "fish" }
    };

    var output = o.extend(input, pie, chips);
    t.deepEqual(output, expected);
    t.notStrictEqual(output.pie, pie.pie);
    t.notStrictEqual(output.chips, chips.chips);

    t.end();
});

test(".extend, none 'object' input is ignored", function(t){
    var output = o.extend({}, { one: 1 });
    t.deepEqual(output, { one: 1 });

    output = o.extend({}, "clive", { one: 1 });
    t.deepEqual(output, { one: 1 });

    output = o.extend({}, undefined, { one: 1 });
    t.deepEqual(output, { one: 1 });

    t.end();
});

test(".extend(), deep", function(t){
    var input = {
        one: {
            clive: "yeah?",
            three: {
                seven: 7
            }
        }
    };
    var extendWith = {
        one: {
            two: 2,
            three: {
                four: [ 5, 6 ]
            }
        }
    };
    var expected = {
        one: {
            clive: "yeah?",
            two: 2,
            three: {
                four: [ 5, 6 ],
                seven: 7
            }
        }
    };

    var output = o.extend(input, extendWith);
    t.deepEqual(output, expected);
    t.end();
});
