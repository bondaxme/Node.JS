// TASK 2
function arrayChangeDelete(array, rule) {
    var deletedElements = [];
    var i = 0;
    while (i < array.length) {
        var item = array[i];
        if (rule(item)) {
            deletedElements.push(array.splice(i, 1)[0]);
        }
        else {
            i++;
        }
    }
    return deletedElements;
}
var array = [1, 2, 3, 6, 7, 9];
var deletedElements = arrayChangeDelete(array, function (item) { return item % 2 === 0; });
console.log(array); // [1, 3, 7, 9]
console.log(deletedElements); // [2, 6]
