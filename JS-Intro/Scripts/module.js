
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

    var sum = function(op1, op2) {
        return op1 + op2;
    };
    var sub = function(op1, op2) {
        return op1 - op2;
    };
    var mul = function(op1, op2) {
        return op1 * op2;
    };
    var div = function(op1, op2) {
        return op1 / op2;
    };
    
    return {
        sum: sum,
        sub: sub,
        mul: mul,
        div: div,
    };
};

CalculatorNS.createNS('CalculatorNS.FuncRegister');

CalculatorNS.FuncRegister = function () {
    var funcArray = [];

    var registerFunc = function(func, cacheSettings) {
        
    };

    return {
        registerFunc: registerFunc
    };
};