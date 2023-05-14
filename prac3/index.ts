// TASK 1
type AddFunction = (x: number) => AddFunction | number;

function add(x: number): AddFunction {
  let sum: number = x;

  function innerAdd(y: number): AddFunction | number {
    if (y === undefined) {
      return sum;
    } else {
      sum += y;
      return innerAdd;
    }
  }

  return innerAdd;
}

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

// TASK 2
function anagrams_check(str1: string, str2: string): boolean {
  if (str1.length !== str2.length) {
    return false;
  }

  const str1CharList = str1.split('').sort();
  const str2CharList = str2.split('').sort();

  for (let i: number = 0; i < str1CharList.length; i++) {
    if (str1CharList[i] !== str2CharList[i]) {
      return false;
    }
  }

  return true;
}

console.log(anagrams_check("klio", "liiok"));
console.log(anagrams_check("klio", "liok"));

// TASK 3
function deepClone<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const clone: object = Array.isArray(obj) ? [] : {};

  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      clone[i] = deepClone(obj[i]);
    }
  }

  return clone as T;
}

const obj1: object = { name: "test1", number: 23 };

console.log(obj1);
const obj2: object = deepClone(obj1);
console.log(obj2);

// TASK 4
type Args = Array<number>;
type CacheKey = string;

const calc = (a: number, b: number, c: number) => a + b + c;

function wrapper(func: (...args: Args) => number): (...args: Args) => number {
  const results: Map<CacheKey, number> = new Map();

  return (...args: Args) => {
    const argsString: CacheKey = args.join(',');

    if (results.has(argsString)) {
      console.log(`Result for (${argsString}) from cache`);
      return results.get(argsString)!;
    }

    console.log(`Result for (${argsString}) calculated`);
    const result = func(...args);
    results.set(argsString, result);
    return result;
  };
}

const cachedCalc = wrapper(calc);

console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache