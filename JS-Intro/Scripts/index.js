(function () {
    var cacheSettings = {
        size: 3,
    };
    var calc = new CalculatorNS.Calculator(cacheSettings);

    function sumSquare(a, b) {
        return a * a + 2 * a * b + b * b;
    }

    function factorial(x) {
        if (x < 0) {
            return -1;
        } else if (x === 0) {
            return 1;
        } else {
            return (x * factorial(x - 1));
        }
    }

    calc.registerFunc(sumSquare);
    calc.registerFunc(factorial);

    var r = calc.mul(3, 4);
    console.log(r);

    r = calc.sumSquare(3, 4);
    console.log(r);

    r = calc.factorial(5);
    console.log(r);
    
    calc.toggleCaching('sum');
    calc.toggleCaching('sub');
    calc.toggleCaching('mul');
    calc.toggleCaching('div');
    calc.toggleCaching('sumSquare');
    calc.toggleCaching('factorial');

    r = calc.sum(1, 25);
    console.log(r);

    r = calc.sub(2, 55);
    console.log(r);

    r = calc.mul(3, 55);
    console.log(r);

    r = calc.div(4, 55);
    console.log(r);

    r = calc.sum(5, 55);
    console.log(r);

    r = calc.sum(6, 55);
    console.log(r);

    r = calc.sumSquare(3, 4);
    console.log(r);

    r = calc.factorial(5);
    console.log(r);

    r = calc.factorial(5);
    console.log(r);

    calc.toggleCaching('sum', false);
    calc.toggleCaching('sub', false);
    calc.toggleCaching('mul', false);
    calc.toggleCaching('div', false);

    r = calc.sum(3, 5);
    console.log(r);
})();
