function add(x) {
    var sum = x;
    function innerAdd(y) {
        if (y === undefined) {
            return sum;
        }
        else {
            sum += y;
            return innerAdd;
        }
    }
    return innerAdd;
}
console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
// TASK 2
function anagrams_check(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    var str1CharList = str1.split('').sort();
    var str2CharList = str2.split('').sort();
    for (var i = 0; i < str1CharList.length; i++) {
        if (str1CharList[i] !== str2CharList[i]) {
            return false;
        }
    }
    return true;
}
console.log(anagrams_check("klio", "liiok"));
console.log(anagrams_check("klio", "liok"));
// TASK 3
function deepClone(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    var clone = Array.isArray(obj) ? [] : {};
    for (var i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
            clone[i] = deepClone(obj[i]);
        }
    }
    return clone;
}
var obj1 = { name: "test1", number: 23 };
console.log(obj1);
var obj2 = deepClone(obj1);
console.log(obj2);
var calc = function (a, b, c) { return a + b + c; };
function wrapper(func) {
    var results = new Map();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argsString = args.join(',');
        if (results.has(argsString)) {
            console.log("Result for (".concat(argsString, ") from cache"));
            return results.get(argsString);
        }
        console.log("Result for (".concat(argsString, ") calculated"));
        var result = func.apply(void 0, args);
        results.set(argsString, result);
        return result;
    };
}
var cachedCalc = wrapper(calc);
console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache
