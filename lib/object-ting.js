"use strict";
var a = require("array-ting"),
    t = require("typical");

/**
Useful functions for working with objects
@module
@alias o
@example
```js
var o = require("object-ting");
```
*/

exports.extend = extend;
exports.clone = clone;
exports.defined = defined;
exports.every = every;
exports.each = each;
exports.omit = omit;
exports.queryFoundInObject = queryFoundInObject;
exports.without = without;

/**
Merge a list of objects, left to right, into one. 
@param {...Object} object - a sequence of Object instances to be extended
@example
```js
> w.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
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
Clones any non-primative object
@param {Object|Array} input - the input to clone
@returns {Object|Array}
@example
```js
> date = new Date()
Fri May 09 2014 13:54:34 GMT+0200 (CEST)
> w.clone(date)
{}  // a Date instance doesn't own any properties
> date.clive = "hater"
'hater'
> w.clone(date)
{ clive: 'hater' }
> array = [1,2,3]
[ 1, 2, 3 ]
> newArray = w.clone(array)
[ 1, 2, 3 ]
> array === newArray
false
```
*/
function clone(input){
    if (t.isPlainObject(input)){
        var output = {};
        for (var prop in input){
            output[prop] = input[prop];
        }
        return output;
    } else if (Array.isArray(input)){
        var output = [];
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
> w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
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
> w.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
true
> w.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
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
> w.each({ eggs: 3, celery: 2, carrots: 1 }, addToTotal)
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
returns true if the key/value pairs in `b` also exist identically in `a`
@param a {Object} - the object to examine
@param b {Object} - the key/value pairs to look for
@returns {boolean}
*/
function queryFoundInObject(a, b){
    var found = true;
    for (var prop in b){
        found = b[prop] === a[prop];
        if (!found) break;
    }
    return found;
}

/**
If the input is an array, returns the input minus the specified values.
If the input is an object, it returns a clone of the object minus the specified properties. 
@param {Array|Object} - the input array or object
@param {*} - a single, or array of values to omit
@returns {Array|Object}
@example
```js
> w.without([ 1, 2, 3 ], 2)
[ 1, 3 ]
> w.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]
```
*/
function without(input, toRemove){
    toRemove = a.arrayify(toRemove);
	if (Array.isArray(input)){
	    return input.filter(function(item){
	        return !a.exists(toRemove, item);
	    });
	} else {
		var output = clone(input);
		toRemove.forEach(function(remove){
			delete output[remove];
		});
		return output;
	}
}


function defined(object){
    var output = {};
    for (var prop in object){
        if (object[prop] !== undefined) output[prop] = object[prop];
    }
    return output;
}