
function selectionSort(arr) {
  let i, j;
  const ERR_MSG_NaN = () => {
    console.log(`--~~**!!>ERROR<!!**~~-- index ${i} of [${arr}] is NaN! --~~**!!>ERROR<!!**~~--`);
    console.log(`--~~**!!>ERROR<!!**~~-- [${arr}] <-- ${arr[i]} --~~**!!>ERROR<!!**~~--`);
  }
  const ERR_MSG_EMPTY = `--~~**!!>ERROR<!!**~~-- The array is empty! --~~**!!>ERROR<!!**~~--`;
  // debugger;
  if (arr.length < 1) return ERR_MSG_EMPTY;
  for (i = 0; i < arr.length; i++) {
    for (j = (i+1); j < arr.length; j++ ) {
      if (isNaN(+arr[i]) || arr[i] === '') return ERR_MSG_NaN();
      if (+arr[j] === -Infinity) {
        [arr[i], arr[j]] = [+arr[j], +arr[i]];
        break;
      }
      if (+arr[i] >= +arr[j]) [arr[i], arr[j]] = [+arr[j], +arr[i]];
    }
  }
  return arr;
}


if (require.main === module) {

  console.log("Expecting: [-1, 2, 3, 5]");
  console.log("=>", selectionSort([3, -1, 5, 2]));

  console.log("");

  console.log("Expecting: [-1, 2, 3, 5]");
  console.log("=>", selectionSort([3, -1, 5, 2, -100, 100]));

  console.log("");

  console.log("Expecting: [-1, 2, 2, 3, 5, 5, 5] -- parseInt()");
  console.log("=>", selectionSort([3, 2, 5, -1, 5, 2, 5]));

  console.log("");

  console.log("Expecting: [-1, 2, 3, 5] -- parseInt()");
  console.log("=>", selectionSort(['3', -1, 5, 2]));

  console.log("");

  console.log("Expecting: error message for NaN");
  console.log("=>", selectionSort(['three', -1, 5, 2]));

  console.log("");

  console.log("Expecting: error message for NaN");
  console.log("=>", selectionSort([3, NaN, 5, 2]));

  console.log("");

  console.log("Expecting: [-1, 2, 3, Infinity]");
  console.log("=>", selectionSort([3, -1, Infinity, 2]));

  console.log("");

  console.log("Expecting: [-Infinity, -1, 2, 3]");
  console.log("=>", selectionSort([3, -1, -Infinity, 2]));

  console.log("");

  console.log("Expecting: error message for empty arr");
  console.log("=>", selectionSort([]));

  console.log("");

  console.log("Expecting: 0");
  console.log("=>", selectionSort([0]));

  console.log("");

  console.log("Expecting: 1");
  console.log("=>", selectionSort([1]));


//  BENCHMARK HERE, and print the average runtime
  const longInput = [];
  for (let i = 0; i < 100; ++i) {
    longInput.push(Math.random());
  }
  const shortInput = [Math.random(), Math.random(), Math.random()];
  const startTime = Date.now();
  for (let i = 0; i < 1000; i++) selectionSort(longInput);
  for (let i = 0; i < 1000; i++) selectionSort(shortInput);
  const avgTime = (Date.now() - startTime) / 2000;
  console.log("");
  console.log("average time = ", avgTime, "ms");
}

module.exports = selectionSort;

/*
pseudo-code:
  a) loop through each element in array( arr ) : index ( i )
  b) for each element, loop through the rest of the elements : index ( j )
    c) compare each element(arr[i]) with each element(arr[j]), swapping values if arr[i] < arr[j]
  d) after both loops have finished, return arr, sorted from lowest to highest



explanation:
  Selection sorting is OofN^2, meaning for each element in arr, I'll have to loop through every element ahead of it.
  I setup 2 simple for loops using 'i' & 'j' as index variable names. After that, all I needed to pass the lab was line 18:
          [-code->  if (+arr[i] >= +arr[j]) [arr[i], arr[j]] = [+arr[j], +arr[i]]  <-]
  
  The guard clauses make the function more functional by allowing any numbers inside a string to be parsed automatically, 
  like in (1 + "1" === 2). Also, the program won't break due of type errors, because every value is being passed
  through parseInt() resulting in a number type with a value of either NaN or any real number.
  There is a side effect or edge case. Since everything is being coerced into a number, an empty string
  will be coerced into a 0, not NaN. There is a guard clause for that too.

  Obviously, checking for -Infinity, just to be able to break out early, is too much. I just wanted to get as many
  things working as possible to practice and explore Javascript.


*/