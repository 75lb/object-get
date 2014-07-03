[![view on npm](http://img.shields.io/npm/v/object-tools.svg)](https://www.npmjs.org/package/object-tools)
[![npm module downloads per month](http://img.shields.io/npm/dm/object-tools.svg)](https://www.npmjs.org/package/object-tools)
[![Build Status](https://travis-ci.org/75lb/object-tools.svg?branch=master)](https://travis-ci.org/75lb/object-tools)
[![Dependency Status](https://david-dm.org/75lb/object-tools.svg)](https://david-dm.org/75lb/object-tools)


#object-tools
Useful functions for working with objects

####Example
```js
var o = require("object-tools");
```



**Contents**
* [extend(...object)](#module_object-tools.extend)
* [clone(input)](#module_object-tools.clone)
* [omit(object, toOmit)](#module_object-tools.omit)
* [every(object, iterator)](#module_object-tools.every)
* [each(object, callback)](#module_object-tools.each)
* [exists(object, query)](#module_object-tools.exists)
* [without(object, toRemove)](#module_object-tools.without)







<a name="module_object-tools.extend"></a>
###extend(...object)
Merge a list of objects, left to right, into one.


- ...object `Object` a sequence of Object instances to be extended  


**Returns**: `Object`

####Example
```js
> o.extend({ one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
{ one: 'one',
  three: 3,
  two: 2,
  four: 4 }
```



<a name="module_object-tools.clone"></a>
###clone(input)
Clones an object or array


- input `Object | Array` the input to clone  


**Returns**: `Object | Array`

####Example
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



<a name="module_object-tools.omit"></a>
###omit(object, toOmit)
Returns a clone of the input object, minus the specified properties


- object `Object` the object to clone  
- toOmit `Array.<string>` an array of property names to omit from the clone  


**Returns**: `Object`

####Example
```js
> o.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
{ one: 1, three: 3 }
```



<a name="module_object-tools.every"></a>
###every(object, iterator)
Returns true if the supplied iterator function returns true for every property in the object


- object `Object` the object to inspect  
- iterator `function` the iterator function to run against each key/value pair, the args are `(value, key)`.  


**Returns**: `Boolean`

####Example
```js
> function aboveTen(input){ return input > 10; }
undefined
> o.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
true
> o.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
false
```



<a name="module_object-tools.each"></a>
###each(object, callback)
Runs the iterator function against every key/value pair in the input object


- object `Object` the object to iterate  
- callback `function` the iterator function to run against each key/value pair, the args are `(value, key)`.  




####Example
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



<a name="module_object-tools.exists"></a>
###exists(object, query)
returns true if the key/value pairs in `query` also exist identically in `object`.
Also supports RegExp values in `query`. If the `query` property begins with `!` then test is negated.


- object `Object` the object to examine  
- query `Object` the key/value pairs to look for  


**Returns**: `boolean`

####Example
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



<a name="module_object-tools.without"></a>
###without(object, toRemove)
returns a clone of the object minus the specified properties.


- object `Object` the input object  
- toRemove `string | Array.<string>` a single property, or array of properties to omit  


**Returns**: `Object`

####Example
```js
> o.without({ a: 1, b: 2, c: 3}, "b")
{ a: 1, c: 3 }
> o.without({ a: 1, b: 2, c: 3}, ["b", "a"])
{ c: 3 }
```









