
console.log("===== 1. Standard Function =====");
function rectangleArea(length = 10, width = 5) {
    return length * width;
}

console.log("Area with default values:", rectangleArea());
console.log("Area with custom values:", rectangleArea(8, 4));

console.log("\n===== 2. Arrow Function =====");

const calculateArea = (length = 10, width = 5) => length * width;

console.log("Area with default values:", calculateArea());
console.log("Area with custom values:", calculateArea(6, 3));

console.log("\n===== 3. Function Scope =====");

function showFunctionScope() {
    var functionVariable = "I am inside the function";
    console.log(functionVariable);
}

showFunctionScope();

console.log("\n===== 4. Block Scope =====");

{
    let blockLet = "I am a block-scoped let variable";
    const blockConst = "I am a block-scoped const variable";
    var blockVar = "I am a var variable";

    console.log(blockLet);
    console.log(blockConst);
    console.log(blockVar);
}

console.log("Outside block:", blockVar);
