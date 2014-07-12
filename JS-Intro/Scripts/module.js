
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

CalculatorNS.Calculator = function () {
    var cache = {};
    var api = {};
    var funcArray = [];

    function initialize() {
        funcArray.push(sum, sub, mul, div);

        api = {
            sum: sum,
            sub: sub,
            mul: mul,
            div: div,
            toggleCaching: toggleCaching,
            registerFunc: registerFunc,
        };
    };

    function memoize(func) {
        var slice = Array.prototype.slice;

        return function() {
            var args = slice.call(arguments);

            if (args in cache)
                return cache[args];
            else
                return (cache[args] = func.apply(this, args));
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
        if (funcName === '' || funcName === undefined) {
            throw new TypeError('argument "funcName" is invalid');
        }
        isCaching = typeof isCaching !== 'boolean' ? true : isCaching;

        for (var i = 0; i < funcArray.length; i++) {
            if (funcArray[i].name === funcName) {
                var fn = funcArray[i];
                break;
            }
        }

        if (fn === undefined) {
            throw new TypeError('there is no such function: ' + funcName);
        }

        isCaching ? api[funcName] = memoize(fn) : api[funcName] = fn;;
    };

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