'use strict';

var Calculator = Calculator || {};

Calculator.createNamespace = function (namespace) {
    var parts = namespace.split(".");
    var parent = Calculator;

    //if (parts[0] === 'Calculator') {
    //    parts = parts.slice(1);
    //}

    for (var i = 0; i < parts.length; i++) {
        var partname = parts[i];

        if (typeof parent[partname] === 'undefined') {
            parent[partname] = {};
        }

        parent = parent[partname];
    }

    return parent;
};

Calculator.createNamespace('Calculator.Calculator');

Calculator.Calculator = function (cacheSettings) {
    var self = {};
    var cache = {};
    var functionArray = [];

    function _initialize() {
        cache = new Calculator.Calculator.Cache(cacheSettings);
        functionArray.push(self.sum, self.sub, self.mul, self.div);
    }

    function _memoize(func) {
        var slice = Array.prototype.slice;

        return function () {
            var args = slice.call(arguments);
            var tag = args.slice(0);
            
            tag.unshift(func.name);

            if (cache.contains(tag)) {
                console.log('cache hit');
                return cache.getValue(tag);
            } else {
                console.log('cache miss, adding new row in cache');
                cache.add(tag, func.apply(this, args));
                return cache.getValue(tag);
            }
        };
    }

    self.registerFunction = function registerFunction(func) {
        if (typeof func !== 'function') {
            throw new TypeError('argument "func" is invalid');
        }

        if (!self[func.name]) {
            self[func.name] = func;
            functionArray.push(func);
            return true;
        }

        return false;
    };

    self.toggleCaching = function toggleCaching(funcName, isCaching) {
        if (!funcName) {
            throw new TypeError('argument "funcName" is invalid');
        }
        isCaching = typeof isCaching !== 'boolean' ? true : isCaching;

        var fn = null;
        for (var i = 0; i < functionArray.length; i++) {
            if (functionArray[i].name === funcName) {
                fn = functionArray[i];
                break;
            }
        }

        if (!fn) {
            throw new TypeError('there is no such function: ' + funcName);
        }

        self[funcName] = isCaching ? _memoize(fn) : fn;
    };

    self.resetCache = function resetCache() {
        cache.reset();
    };

    self.sum = function sum(op1, op2) {
        return op1 + op2;
    };

    self.sub = function sub(op1, op2) {
        return op1 - op2;
    };

    self.mul = function mul(op1, op2) {
        return op1 * op2;
    };

    self.div = function div(op1, op2) {
        return op1 / op2;
    };

    _initialize();

    return self;
};

Calculator.createNamespace("Calculator.Calculator.Cache");

Calculator.Calculator.Cache = function (options) {
    var self = {};
    var cache = [];
    var defaultSettings = {
        size: Number.MAX_VALUE
    };
    var oldest = 0;

    self.options = options || _clone(defaultSettings);

    self.add = function add(tag, value) {
        var cacheSize = self.options.size;
        var row = {};
        row[tag] = value;
        
        if (cache.length < cacheSize) {
            cache.push(row);
        } else {
            cache[oldest++] = row;
            oldest = oldest === cacheSize ? 0 : oldest;
            console.log('overwriting cache row');
        }
    };

    self.getValue = function getValue(tag) {
        for (var i = 0; i < cache.length; i++) {
            if (tag in cache[i]) {
                return cache[i][tag];
            }
        }
    };

    self.contains = function contains(tag) {
        for (var i = 0; i < cache.length; i++) {
            if (tag in cache[i]) {
                return true;
            }
        }
        return false;
    };

    self.reset = function reset() {
        cache = [];
        oldest = 0;
        self.options = _clone(defaultSettings);
    };

    function _clone(object) {
        if (!object || typeof object !== 'object') {
            return object;
        }

        var copy = typeof object.pop === 'function' ? [] : {};
        var property, value;
        for (property in object) {
            if (object.hasOwnProperty(property)) {
                value = object[property];
                if (value && typeof value === 'object') {
                    copy[property] = _clone(value);
                } else {
                    copy[property] = value;
                }
            }
        }

        return copy;
    }
    
    return self;
};