/* jshint node:true */
'use strict';

/**
Gets a value for a property path.
@module object-get
@typicalname o
@example
var g = require("object-get")
*/
exports.get = get;


/**
Returns the value at the given property.
@param {object} - the input object
@param {string} - the property accessor expression
@returns {*}
@static
@since 1.4.0
*/
function get (object, expression) {
  return expression.trim().split('.').reduce(function (prev, curr) {
    return prev && prev[curr];
  }, object);
}
