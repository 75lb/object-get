#!/usr/bin/env node
"use strict";
var tr = require("transform-tools");
var o = require("../");

process.argv.splice(0, 2);
var method = process.argv.shift();
var value = process.argv.shift();

process.stdin
    .pipe(tr.collectJson({ transform: function(json){
        var result = o[method](json, value);
        return JSON.stringify(result, null, "  ") + "\n";
    }}))
    .pipe(process.stdout);
