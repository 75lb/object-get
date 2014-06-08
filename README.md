[![view on npm](http://img.shields.io/npm/v/object-ting.svg)](https://www.npmjs.org/package/object-ting)
[![npm module downloads per month](http://img.shields.io/npm/dm/object-ting.svg)](https://www.npmjs.org/package/object-ting)
[![Build Status](https://travis-ci.org/75lb/object-ting.svg?branch=master)](https://travis-ci.org/75lb/object-ting)
[![Dependency Status](https://david-dm.org/75lb/object-ting.svg)](https://david-dm.org/75lb/object-ting)


#object-ting
Useful functions for working with objects

####Example
```js
var o = require("object-ting");
```









<a name="module_object-ting.extend"></a>
###o.extend(object)
Merge a list of objects, left to right, into one.


- object `Object` a sequence of Object instances to be extended  




####Example
```js
> w.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
{ one: 'one',
  three: 3,
  two: 2,
  four: 4 }
```



<a name="module_object-ting.clone"></a>
###o.clone(input)
Clones any non-primative object


- input `Object | Array` the input to clone  


**Returns**: `Object | Array`

####Example
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



<a name="module_object-ting.omit"></a>
###o.omit(object, toOmit)
Returns a clone of the input object, minus the specified properties


- object `Object` the object to clone  
- toOmit `string[]` an array of property names to omit from the clone  


**Returns**: `Object`

####Example
```js
> w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
{ one: 1, three: 3 }
```



<a name="module_object-ting.every"></a>
###o.every(object, iterator)
Returns true if the supplied iterator function returns true for every property in the object


- object `Object` the object to inspect  
- iterator `function` the iterator function to run against each key/value pair, the args are `(value, key)`.  


**Returns**: `Boolean`

####Example
```js
> function aboveTen(input){ return input > 10; }
undefined
> w.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
true
> w.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
false
```



<a name="module_object-ting.each"></a>
###o.each(object, callback)
Runs the iterator function against every key/value pair in the input object


- object `Object` the object to iterate  
- callback `function` the iterator function to run against each key/value pair, the args are `(value, key)`.  




####Example
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



<a name="module_object-ting.queryFoundInObject"></a>
###o.queryFoundInObject(a, b)
returns true if the key/value pairs in `b` also exist identically in `a`


- a `Object` the object to examine  
- b `Object` the key/value pairs to look for  


**Returns**: `boolean`




<a name="module_object-ting.without"></a>
###o.without(input, toRemove)
If the input is an array, returns the input minus the specified values.
If the input is an object, it returns a clone of the object minus the specified properties.


- input `Array | Object` the input array or object  
- toRemove `*` a single, or array of values to omit  


**Returns**: `Array | Object`

####Example
```js
> w.without([ 1, 2, 3 ], 2)
[ 1, 3 ]
> w.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]
```









