(function () {
    var cacheSettings = {
        size: 3,
    };
    var calc = new CalculatorNS.Calculator(cacheSettings);

    var r = calc.sum(3, 4);
    console.log(r);

    r = calc.sum(9, 8);
    console.log(r);

    calc.toggleCaching('sum');
    calc.toggleCaching('mul');
    calc.toggleCaching('div');

    r = calc.sum(1, 25);
    console.log(r);

    r = calc.sum(2, 55);
    console.log(r);

    r = calc.sum(3, 55);
    console.log(r);

    r = calc.sum(4, 55);
    console.log(r);

    r = calc.sum(5, 55);
    console.log(r);

    r = calc.sum(6, 55);
    console.log(r);

    calc.toggleCaching('sum', false);
    calc.toggleCaching('mul', false);
    calc.toggleCaching('div', false);

    r = calc.sum(3, 5);
    console.log(r);
})();
