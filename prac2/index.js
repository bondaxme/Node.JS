// TASK 1
function add(x) {
    let sum = x;
    function innerAdd(y) {
        if (y === undefined) {
            return sum;
        } else {
            sum += y;
            return innerAdd;
        }
    }
    return innerAdd;
}

console.log(add(5)(6)())

// TASK 2
function anagrams_check(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }

    let str1_char_list = str1.split('').sort();
    let str2_char_list = str2.split('').sort();

    for (let i= 0; i < str1_char_list; i++){
        if (str1_char_list[i] !== str2_char_list[i]) {
            return false;
        }
    }

    return true;
}

console.log(anagrams_check("klio", "liiok"));
console.log(anagrams_check("klio", "liok"));

// TASK 3
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const clone = Array.isArray(obj) ? [] : {};

    for (let i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
            clone[i] = deepClone(obj[i]);
        }
    }

    return clone;
}

obj1 = { name: "test1", number: 23 };

console.log(obj1)
const obj2 = deepClone(obj1);
console.log(obj2)

// TASK 4
const calc = (a, b, c) => a+b+c;
const wrapper = (func) => {
    const results = new Map();
    return function(...args) {
        const argsString = args.join(",");
        if (results.has(argsString)) {
            console.log(`Result for (${argsString}) from cache`);
            return results.get(argsString);
        }
        const result = func(...args);
        console.log(`Result for (${argsString}) calculated`);
        results.set(argsString, result);
        return result;
    }
};

const cachedCalc = wrapper(calc);

console.log(cachedCalc(2,2,3)); // 7 calculated
console.log(cachedCalc(5,8,1)); // 14 calculated
console.log(cachedCalc(2,2,3)); // 7 from cache
