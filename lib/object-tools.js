"use strict";
var a = require("array-tools"),
    t = require("typical");

/**
Useful functions for working with objects
@module
@alias o
@example
```js
var o = require("object-tools");
```
*/

exports.extend = extend;
exports.clone = clone;
exports.defined = defined;
exports.every = every;
exports.each = each;
exports.omit = omit;
exports.exists = exists;
exports.without = without;

/**
Merge a list of objects, left to right, into one. 
@param {...Object} object - a sequence of Object instances to be extended
@returns {Object}
@example
```js
> o.extend({ one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
{ one: 'one',
  three: 3,
  two: 2,
  four: 4 }
```
*/
function extend(){
    var args = a.arrayify(arguments);
    return args.reduce(function(prev, curr){
        if (typeof curr !== "object") return prev;
        for (var prop in curr){
            prev[prop] = curr[prop];
        }
        return prev;
    }, {});
}

/**
Clones an object or array
@param {Object|Array} input - the input to clone
@returns {Object|Array}
@example
```js
> date = new Date()
Fri May 09 2014 13:54:34 GMT+0200 (CEST)
> o.clone(date)
{}  // a Date instance doesn't own any properties
> date.clive = "hater"
'hater'
> o.clone(date)
{ clive: 'hater' }
> array = [1,2,3]
[ 1, 2, 3 ]
> newArray = o.clone(array)
[ 1, 2, 3 ]
> array === newArray
false
```
*/
function clone(input){
    var output;
    if (t.isPlainObject(input)){
        output = {};
        for (var prop in input){
            output[prop] = input[prop];
        }
        return output;
    } else if (Array.isArray(input)){
        output = [];
        input.forEach(function(item){
            output.push(item);
        });
        return output;
    }
}

/**
Returns a clone of the input object, minus the specified properties
@param {Object} - the object to clone
@param {string[]} - an array of property names to omit from the clone
@returns {Object}
@example
```js
> o.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
{ one: 1, three: 3 }
```
*/
function omit(object, toOmit){
    toOmit = a.arrayify(toOmit);
    var output = clone(object);
    toOmit.forEach(function(omit){
        delete output[omit];
    });
    return output;
}

/**
Returns true if the supplied iterator function returns true for every property in the object
@param {Object} - the object to inspect
@param {Function} - the iterator function to run against each key/value pair, the args are `(value, key)`.
@returns {Boolean}
@example
```js
> function aboveTen(input){ return input > 10; }
undefined
> o.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
true
> o.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
false
```
*/
function every(object, iterator){
    var result = true;
    for (var prop in object){
        result = result && iterator(object[prop], prop);
    }
    return result;
}

/**
Runs the iterator function against every key/value pair in the input object
@param {Object} - the object to iterate
@param {Function} - the iterator function to run against each key/value pair, the args are `(value, key)`.
@example
```js
> var total = 0;
undefined
> function addToTotal(n){ total += n; }
undefined
> o.each({ eggs: 3, celery: 2, carrots: 1 }, addToTotal)
undefined
> total
6
```
*/
function each(object, callback){
    for (var prop in object){
        callback(object[prop], prop);
    }
}

/**
returns true if the key/value pairs in `query` also exist identically in `object`.
Also supports RegExp values in `query`. If the `query` property begins with `!` then test is negated. 
@param {Object} - the object to examine
@param {Object} - the key/value pairs to look for
@returns {boolean}
@example
```js
> o.exists({ a: 1, b: 2}, {a: 0})
false
> o.exists({ a: 1, b: 2}, {a: 1})
true
> o.exists({ a: 1, b: 2}, {"!a": 1})
false
> o.exists({ name: "clive hater" }, { name: /clive/ })
true
> o.exists({ name: "clive hater" }, { "!name": /ian/ })
true
```
*/
function exists(object, query){
    var found = true, queryValue, objectValue;
    for (var prop in query){
        var negated = prop[0] === "!";
        var queryValue = query[prop];
        var objectValue = negated ? object[prop.slice(1)] : object[prop];
        if (queryValue instanceof RegExp){
            found = negated 
                ? !queryValue.test(objectValue)
                : queryValue.test(objectValue);
        } else {
            found = negated 
                ? queryValue !== objectValue
                : queryValue === objectValue;
        }
        if (!found) break;
    }
    return found;
}

/**
returns a clone of the object minus the specified properties. 
@param {Object} - the input object
@param {string|string[]} - a single property, or array of properties to omit
@returns {Object}
@example
```js
> o.without({ a: 1, b: 2, c: 3}, "b")
{ a: 1, c: 3 }
> o.without({ a: 1, b: 2, c: 3}, ["b", "a"])
{ c: 3 }
```
*/
function without(object, toRemove){
    toRemove = a.arrayify(toRemove);
	var output = clone(object);
	toRemove.forEach(function(remove){
		delete output[remove];
	});
	return output;
}

function defined(object){
    var output = {};
    for (var prop in object){
        if (object[prop] !== undefined) output[prop] = object[prop];
    }
    return output;
}
