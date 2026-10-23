
let billAmount = Number(prompt("Enter your bill amount:"));
let tipPercentage = Number(prompt("Enter tip percentage:"));
let tipAmount = billAmount * tipPercentage / 100;
let totalAmount = billAmount;
totalAmount += tipAmount;

console.log("----- Bill Summary -----");
console.log(`Bill Amount: ₹${billAmount.toFixed(2)}`);
console.log(`Tip Percentage: ${tipPercentage}%`);
console.log(`Tip Amount: ₹${tipAmount.toFixed(2)}`);
console.log(`Total Amount: ₹${totalAmount.toFixed(2)}`);
