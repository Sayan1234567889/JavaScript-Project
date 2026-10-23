
const products = [
    { name: "Laptop", price: 50000 },
    { name: "Mobile", price: 15000 },
    { name: "Headphones", price: 2000 },
    { name: "Keyboard", price: 1200 },
    { name: "Mouse", price: 500 }
];

console.log("===== All Products =====");

products.forEach(function(product) {
    console.log(`Product: ${product.name}, Price: ₹${product.price}`);
});

console.log("\n===== Products Under ₹5000 =====");

const affordableProducts = products.filter(function(product) {
    return product.price < 5000;
});

console.log(affordableProducts);

console.log("\n===== Formatted Product List =====");

const formattedProducts = products.map(function(product) {
    return `${product.name} - ₹${product.price}`;
});

console.log(formattedProducts);
