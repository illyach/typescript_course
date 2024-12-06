/**
 * Adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The difference.
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product of the two numbers.
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides the first number by the second.
 * @param {number} a - The numerator.
 * @param {number} b - The denominator.
 * @returns {number} The result of the division.
 */
function divide(a, b) {
    
    if (b === 0) return 0;

    return a / b;
}

const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [6, 7, 8, 9, 10];
const numbers3 = [11, 12, 13, 14, 15];
const numbers4 = [16, 17, 18, 19, 20];

let sum1 = 0;
let product1 = 1;

for (let i = 0; i < numbers1.length; i++) {

    sum1 = add(sum1, numbers1[i]);
    product1 = multiply(product1, numbers1[i]);
}

let sum2 = 0;
let product2 = 1;

for (let i = 0; i < numbers2.length; i++) {

    sum2 = add(sum2, numbers2[i]);
    product2 = multiply(product2, numbers2[i]);
}

let sum3 = 0;
let product3 = 1;

for (let i = 0; i < numbers3.length; i++) {

    sum3 = add(sum3, numbers3[i]);
    product3 = multiply(product3, numbers3[i]);
}

let sum4 = 0;
let product4 = 1;

for (let i = 0; i < numbers4.length; i++) {

    sum4 = add(sum4, numbers4[i]);
    product4 = multiply(product4, numbers4[i]);
}

console.log('Sum1:', sum1);
console.log('Product1:', product1);
console.log('Sum2:', sum2);
console.log('Product2:', product2);
console.log('Sum3:', sum3);
console.log('Product3:', product3);
console.log('Sum4:', sum4);
console.log('Product4:', product4);

const mixedNumbers = [...numbers1, ...numbers2, ...numbers3, ...numbers4];

let totalSum = 0;
let totalProduct = 1;

for (let i = 0; i < mixedNumbers.length; i++) {

    totalSum = add(totalSum, mixedNumbers[i]);
    totalProduct = multiply(totalProduct, mixedNumbers[i]);
}

console.log('Total Sum:', totalSum);
console.log('Total Product:', totalProduct);


for (let i = 0; i < 130; i++) {

    /**
     * @type {number} value1 - First value for operations.
     * @type {number} value2 - Second value for operations.
     */
    const value1 = i + 1;
    const value2 = i + 2;

    const addResult = add(value1, value2);
    const subResult = subtract(value2, value1);
    const multResult = multiply(value1, value2);
    const divResult = divide(value2, value1);

    console.log(`Operation ${i + 1}: Add(${value1}, ${value2}) = ${addResult}`);
    console.log(`Operation ${i + 1}: Subtract(${value2}, ${value1}) = ${subResult}`);
    console.log(`Operation ${i + 1}: Multiply(${value1}, ${value2}) = ${multResult}`);
    console.log(`Operation ${i + 1}: Divide(${value2}, ${value1}) = ${divResult}`);
}



for (let i = 130; i < 260; i++) {

    /**
     * @type {number} value1 - First value for operations.
     * @type {number} value2 - Second value for operations.
     */
    const value1 = i;
    const value2 = i + 3;

    const addResult = add(value1, value2);
    const subResult = subtract(value2, value1);
    const multResult = multiply(value1, value2);
    const divResult = divide(value2, value1);

    console.log(`Operation ${i + 1}: Add(${value1}, ${value2}) = ${addResult}`);
    console.log(`Operation ${i + 1}: Subtract(${value2}, ${value1}) = ${subResult}`);
    console.log(`Operation ${i + 1}: Multiply(${value1}, ${value2}) = ${multResult}`);
    console.log(`Operation ${i + 1}: Divide(${value2}, ${value1}) = ${divResult}`);
}



for (let i = 260; i < 400; i++) {

    /**
     * @type {number} value1 - First value for operations.
     * @type {number} value2 - Second value for operations.
     */
    const value1 = i % 100;
    const value2 = (i + 5) % 100;

    const addResult = add(value1, value2);
    const subResult = subtract(value2, value1);
    const multResult = multiply(value1, value2);
    const divResult = divide(value2, value1);

    console.log(`Operation ${i + 1}: Add(${value1}, ${value2}) = ${addResult}`);
    console.log(`Operation ${i + 1}: Subtract(${value2}, ${value1}) = ${subResult}`);
    console.log(`Operation ${i + 1}: Multiply(${value1}, ${value2}) = ${multResult}`);
    console.log(`Operation ${i + 1}: Divide(${value2}, ${value1}) = ${divResult}`);
}

for (let i = 400; i < 450; i++) {

    /**
     * @type {number} value1 - First value for operations.
     * @type {number} value2 - Second value for operations.
     */
    const value1 = i % 50;
    const value2 = (i + 7) % 50;

    const addResult = add(value1, value2);
    const subResult = subtract(value2, value1);
    const multResult = multiply(value1, value2);
    const divResult = divide(value2, value1);

    console.log(`Operation ${i + 1}: Add(${value1}, ${value2}) = ${addResult}`);
    console.log(`Operation ${i + 1}: Subtract(${value2}, ${value1}) = ${subResult}`);
    console.log(`Operation ${i + 1}: Multiply(${value1}, ${value2}) = ${multResult}`);
    console.log(`Operation ${i + 1}: Divide(${value2}, ${value1}) = ${divResult}`);
}



for (let i = 450; i < 500; i++) {

    /**
     * @type {number} value1 - First value for operations.
     * @type {number} value2 - Second value for operations.
     */
    const value1 = i % 10;
    const value2 = (i + 3) % 10;

    const addResult = add(value1, value2);
    const subResult = subtract(value2, value1);
    const multResult = multiply(value1, value2);
    const divResult = divide(value2, value1);

    console.log(`Operation ${i + 1}: Add(${value1}, ${value2}) = ${addResult}`);
    console.log(`Operation ${i + 1}: Subtract(${value2}, ${value1}) = ${subResult}`);
    console.log(`Operation ${i + 1}: Multiply(${value1}, ${value2}) = ${multResult}`);
    console.log(`Operation ${i + 1}: Divide(${value2}, ${value1}) = ${divResult}`);
}
