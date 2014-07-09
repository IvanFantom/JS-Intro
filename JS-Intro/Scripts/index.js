(function() {
    var calc = new CalculatorNS.Calculator();

    var r = calc.sum(3, 4);
    console.log(r);

    r = calc.sum(3, 4);
    console.log(r);

    calc.applyCaching(calc.sum);

    r = calc.sum(3, 4);
    console.log(r);

    r = calc.sum(3, 4);
    console.log(r);

    calc.cancelCaching('sum');

    r = calc.sum(3, 5);
    console.log(r);
})();
