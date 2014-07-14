
var CalculatorNS = CalculatorNS || {};

CalculatorNS.createNS = function (namespace) {
    var nsparts = namespace.split(".");
    var parent = CalculatorNS;

    if (nsparts[0] === "CalculatorNS") {
        nsparts = nsparts.slice(1);
    }

    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];

        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }

        parent = parent[partname];
    }

    return parent;
};

CalculatorNS.createNS("CalculatorNS.Calculator");

CalculatorNS.Calculator = function (cacheSettings) {
    var api = {};
    var cache = {};
    var funcArray = [];

    function initialize() {
        cache = new CalculatorNS.Calculator.Cache(cacheSettings);
        funcArray.push(sum, sub, mul, div);

        api = {
            sum: sum,
            sub: sub,
            mul: mul,
            div: div,
            toggleCaching: toggleCaching,
            registerFunc: registerFunc,
            resetCache: resetCache
        };
    };

    function memoize(func) {
        var slice = Array.prototype.slice;

        return function() {
            var args = slice.call(arguments);
            var tag = args.slice(0);

            tag.unshift(func.name);

            if (cache.contains(tag)) {
                console.log('cache hit');
                return cache.getValue(tag);
            }
            else {
                console.log('cache miss, adding new row in cache');
                cache.add(tag, func.apply(this, args));
                return cache.getValue(tag);
            }
        };
    };
    function registerFunc(func) {
        if (typeof func !== 'function') {
            throw new TypeError('argument "func" is invalid');
        }

        if (!api[func.name]) {
            api[func.name] = func;
            funcArray.push(func);
            return true;
        }

        return false;
    };
    function toggleCaching(funcName, isCaching) {
        if (!funcName) {
            throw new TypeError('argument "funcName" is invalid');
        }
        isCaching = typeof isCaching !== 'boolean' ? true : isCaching;

        var fn = null;
        for (var i = 0; i < funcArray.length; i++) {
            if (funcArray[i].name === funcName) {
                fn = funcArray[i];
                break;
            }
        }

        if (fn) {
            throw new TypeError('there is no such function: ' + funcName);
        }

        api[funcName] = isCaching ? memoize(fn) : fn;
    };
    function resetCache() {
        cache.reset();
    }

    function sum(op1, op2) {
        return op1 + op2;
    };
    function sub(op1, op2) {
        return op1 - op2;
    };
    function mul(op1, op2) {
        return op1 * op2;
    };
    function div(op1, op2) {
        return op1 / op2;
    };

    initialize();

    return api;
};

CalculatorNS.createNS("CalculatorNS.Calculator.Cache");

CalculatorNS.Calculator.Cache = function(options) {
    var api = {};
    var cache = [];
    var settings = {};
    var defaultSettings = {
        size: Number.MAX_VALUE
    };
    var oldest = 0;

    function initialize() {
        settings = options || clone(defaultSettings);

        api = {
            add: add,
            getValue: getValue,
            contains: contains,
            reset: reset,
            options: settings
        };
    };

    function add(tag, value) {
        var row = {};
        row[tag] = value;

        if (cache.length < settings.size) {
            cache.push(row);
        }
        else {
            cache[oldest++] = row;
            oldest = oldest === settings.size ? 0 : oldest;
            console.log('overwriting cache row');
        }
    };
    function getValue(tag) {
        for (var i = 0; i < cache.length; i++) {
            if (tag in cache[i]) {
                return cache[i][tag];
            }
        }
    };
    function contains(tag) {
        for (var i = 0; i < cache.length; i++) {
            if (tag in cache[i]) {
                return true;
            }
        }
        return false;
    };
    function reset() {
        cache = [];
        oldest = 0;
        options = settings = clone(defaultSettings);
    }

    function clone(o) {
        if(!o || 'object' !== typeof o)  {
            return o;
        }

        var c = 'function' === typeof o.pop ? [] : {};
        var p, v;
        for(p in o) {
            if(o.hasOwnProperty(p)) {
                v = o[p];
                if(v && 'object' === typeof v) {
                    c[p] = clone(v);
                }
                else {
                    c[p] = v;
                }
            }
        }
        return c;
    };

    initialize();

    return api;
};