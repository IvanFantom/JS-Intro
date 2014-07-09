
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
    var tempSum = {};

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
    function registerFunc(func, cacheSettings) {
        
    };
    function applyCaching(funcName) {
        switch (funcName) {
            case 'sum':
                api.sum = memoize(sum);
                break;
            case 'sub':
                api.sub = memoize(sub);
                break;
            case 'mul':
                api.mul = memoize(mul);
                break;
            case 'div':
                api.div = memoize(div);
                break;
            default:
        }
    };
    function cancelCaching(funcName) {
        switch (funcName) {
            case 'sum':
                api.sum = sum;
                break;
            case 'sub':
                api.sub = sub;
                break;
            case 'mul':
                api.mul = mul;
                break;
            case 'div':
                api.div = div;
                break;
            default:
        }
    };

    function sum (op1, op2) {
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

    var api = {
        sum: sum,
        sub: sub,
        mul: mul,
        div: div,
        applyCaching: applyCaching,
        cancelCaching: cancelCaching,
        registerFunc: registerFunc,
    };

    return api;
};