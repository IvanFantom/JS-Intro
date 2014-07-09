(function () {
    var operand1 = document.getElementsByName('operand1')[0];
    var operand2 = document.getElementsByName('operand2')[0];
    var operationType = document.getElementsByName('operation-type')[0];
    var isCache = document.getElementsByName('is-cache')[0];
    var equalsBtn = document.getElementsByName('btn-equals')[0];
    var resultInput = document.getElementsByName('result')[0];
    var cacheStatus = document.getElementsByName('cache-status')[0];

    var calc = new CalculatorNS.Calculator();

    function equalsClickHandler() {
        var op1 = +operand1.value;
        var op2 = +operand2.value;
        var funcName = operationType.options[operationType.selectedIndex].value;
        var result = 0;

        switch (funcName) {
            case 'sum':
                result = calc.sum(op1, op2);
                break;
            case 'sub':
                result = calc.sub(op1, op2);
                break;
            case 'mul':
                result = calc.mul(op1, op2);
                break;
            case 'div':
                result = calc.div(op1, op2);
                break;
            default:
        }

        resultInput.value = result;
    };

    function isCacheChangeHandler() {
        var funcName = operationType.options[operationType.selectedIndex].value;
        var status = '';

        if (isCache.checked) {
            calc.applyCaching(funcName);
            status = 'Cache is on';
        }
        else {
            calc.cancelCaching(funcName);
            status = 'Cache is off';
        }
        
        cacheStatus.innerHTML = status;
    };

    isCache.addEventListener('change', isCacheChangeHandler);
    equalsBtn.addEventListener('click', equalsClickHandler);
    
    //var r = calc.sum(3, 4);
    //console.log(r);

    //r = calc.sum(3, 4);
    //console.log(r);

    //calc.applyCaching(calc.sum);

    //r = calc.sum(3, 4);
    //console.log(r);

    //r = calc.sum(3, 4);
    //console.log(r);

    //calc.cancelCaching('sum');

    //r = calc.sum(3, 5);
    //console.log(r);
})();
