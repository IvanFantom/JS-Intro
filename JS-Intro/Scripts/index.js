(function () {
    var operands = document.getElementsByName('operand');
    var newFunc = document.getElementsByName('newFunc')[0];
    var addFuncBtn = document.getElementsByName('addFuncBtn')[0];
    var operationType = document.getElementsByName('operationType')[0];
    var isCache = document.getElementsByName('isCache')[0];
    var equalsBtn = document.getElementsByName('equalsBtn')[0];
    var resultInput = document.getElementsByName('result')[0];
    var cacheStatus = document.getElementsByName('cacheStatus')[0];

    var calc = new CalculatorNS.Calculator();

    function sumSquare(a, b) {
        return a * a + 2 * a * b + b * b;
    };

    function addFuncBtnClickHandler() {
        var text = newFunc.value;

        if (calc.registerFunc(sumSquare)) {
            var option = document.createElement('option');
            var funcName = sumSquare.name;

            option.setAttribute('value', funcName);
            option.innerHTML = funcName;
            operationType.appendChild(option);
        }
    };
    function equalsClickHandler() {
        var args = [];

        for (var i = 0; i < operands.length; i++) {
            args.push(+operands[i].value);
        }

        var funcName = operationType.options[operationType.selectedIndex].value;
        var result = calc[funcName].apply(null, args);

        resultInput.value = result;
    };
    function isCacheChangeHandler() {
        var funcName = operationType.options[operationType.selectedIndex].value;
        var status = '';

        if (isCache.checked) {
            calc.toggleCaching(funcName);
            status = 'Cache is on';
        }
        else {
            calc.toggleCaching(funcName, false);
            status = 'Cache is off';
        }
        
        cacheStatus.innerHTML = status;
    };

    addFuncBtn.addEventListener('click', addFuncBtnClickHandler);
    isCache.addEventListener('change', isCacheChangeHandler);
    equalsBtn.addEventListener('click', equalsClickHandler);
    
    //var r = calc.sum(3, 4);
    //console.log(r);

    //r = calc.sum(3, 4);
    //console.log(r);

    //calc.toggleCaching('sum');

    //r = calc.sum(3, 4);
    //console.log(r);

    //r = calc.sum(3, 4);
    //console.log(r);

    //calc.toggleCaching('sum', false);

    //r = calc.sum(3, 5);
    //console.log(r);
})();
