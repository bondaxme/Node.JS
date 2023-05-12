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

