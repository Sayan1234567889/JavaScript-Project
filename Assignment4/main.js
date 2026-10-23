
console.log("===== 1. Multiplication Table up to 5 =====");

for (let i = 1; i <= 5; i++) {
    console.log(`\nMultiplication Table of ${i}`);

    for (let j = 1; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}

console.log("\n===== 2. While Loop with Break =====");

let num = 11;

while (true) {
    if (num > 10 && num % 6 === 0) {
        console.log("First number greater than 10 divisible by 6:", num);
        break;
    }
    num++;
}

console.log("\n===== 3. Do...While Loop with Continue =====");

let count = 0;

do {
    count++;

    if (count % 2 === 0) {
        continue;
    }

    console.log("Number:", count);

} while (count < 10);
