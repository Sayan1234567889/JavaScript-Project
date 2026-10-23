
"use strict";
const inventory = [
    { id: 1, name: "Keyboard", price: 450 },
    { id: 2, name: "Mouse", price: 300 },
    { id: 3, name: "Headphones", price: 1200 },
    { id: 4, name: "Monitor", price: 8500 },
    { id: 5, name: "USB Drive", price: 250 },
    { id: 6, name: "Webcam", price: 1800 }
];

let nextId = 7;
let displayedProducts = [...inventory];

const $ = (id) => document.getElementById(id);

const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(amount);

function getCategory(price) {
    let category;

    switch (true) {
        case price <= 500:
            category = "Budget";
            break;

        case price <= 2000:
            category = "Standard";
            break;

        default:
            category = "Premium";
            break;
    }

    return category;
}

function validateProduct(name, price) {
    if (name.trim() === "") {
        return "Product name cannot be empty.";
    } else if (!Number.isFinite(price) || price <= 0) {
        return "Price must be a valid number greater than zero.";
    } else if (name.trim().length > 60) {
        return "Product name must be 60 characters or fewer.";
    } else {
        return "";
    }
}

function findProduct(searchTerm) {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
        return null;
    }

    for (let i = 0; i < inventory.length; i++) {
        const product = inventory[i];

        if (!product || !product.name) {
            continue;
        }

        if (product.name.toLowerCase().includes(query)) {
            return product;
        }
    }

    return null;
}

function calculateTotal(products) {
    let total = 0;

    for (const product of products) {
        total += product.price;
    }

    return total;
}

const countCategory = (products, category) =>
    products.filter(
        product => getCategory(product.price) === category
    ).length;

const calculateFinalPrice = (subtotal, taxRate = 5, discountRate = 0) => {

    const discount = subtotal * (discountRate / 100);
    const discountedPrice = subtotal - discount;
    const tax = discountedPrice * (taxRate / 100);
    const finalPrice = discountedPrice + tax;

    return { subtotal, discount, tax, finalPrice };
};

function printInventory(products) {
    console.clear();
    console.log("===== INVENTORY SHEET =====");

    products.forEach(product => {
        console.log(
            `ID: ${product.id} | ${product.name} | ` +
            `${money(product.price)} | ${getCategory(product.price)}`
        );
    });

    console.log("Total inventory value:", money(calculateTotal(products)));
}

function filterByPrice(maxPrice) {
    return inventory.filter(product => product.price <= maxPrice);
}

function createSummary(products) {
    return products.map(product =>
        `${product.name} - ${money(product.price)} - ` +
        `${getCategory(product.price)}`
    );
}

function renderProducts(products) {
    const table = $("productTable");
    table.replaceChildren();


    products.forEach(product => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = product.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = money(product.price);

        const categoryCell = document.createElement("td");
        const badge = document.createElement("span");
        const category = getCategory(product.price);

        badge.classList.add(
            "badge",
            category.toLowerCase()
        );
        badge.textContent = category;

        categoryCell.appendChild(badge);

        row.append(idCell, nameCell, priceCell, categoryCell);
        table.appendChild(row);
    });

    $("resultCount").textContent =
        `${products.length} product${products.length === 1 ? "" : "s"}`;
}

function renderSummary(products) {
    const list = $("summaryList");
    list.replaceChildren();

    const summaries = createSummary(products);

    summaries.forEach(summary => {
        const item = document.createElement("li");
        item.textContent = summary;
        list.appendChild(item);
    });

    if (summaries.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No products to display.";
        list.appendChild(item);
    }
}

function renderFiltered(products) {
    const list = $("filteredList");
    list.replaceChildren();

    const report = products.map(product =>
        `${product.name} — ${money(product.price)}`
    );

    report.forEach(line => {
        const item = document.createElement("li");
        item.textContent = line;
        list.appendChild(item);
    });

    if (report.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No matching products found.";
        list.appendChild(item);
    }
}

function updateDashboard() {
    $("totalProducts").textContent = inventory.length;
    $("totalValue").textContent = money(calculateTotal(inventory));

    $("budgetCount").textContent =
        countCategory(inventory, "Budget");

    $("premiumCount").textContent =
        countCategory(inventory, "Premium");

    renderProducts(displayedProducts);
    renderSummary(displayedProducts);
}

function addProduct() {
    const nameInput = prompt("Enter the new product name:");


    if (nameInput === null) {
        $("message").textContent = "Product addition cancelled.";
        return;
    }

    const name = nameInput.trim();

    if (name === "") {
        $("message").textContent = "Product name cannot be empty.";
        return;
    }

    if (name.length > 60) {
        $("message").textContent =
            "Product name must be 60 characters or fewer.";
        return;
    }

    const priceInput = prompt("Enter product price in rupees:");

    if (priceInput === null || priceInput.trim() === "") {
        $("message").textContent = "Price input cancelled or empty.";
        return;
    }


    const price = Number(priceInput);

    const error = validateProduct(name, price);

    if (error) {
        $("message").textContent = error;
        return;
    }


    const duplicate = inventory.some(
        product => product.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
        $("message").textContent = "This product already exists.";
        return;
    }

    inventory.push({
        id: nextId++,
        name: name,
        price: price
    });

    displayedProducts = [...inventory];

    $("message").textContent =
        `${name} added successfully as ${getCategory(price)}.`;

    updateDashboard();
    printInventory(inventory);
    updateCalculation();
}

function searchProducts() {
    const query = $("searchInput").value.trim();

    if (query === "") {
        displayedProducts = [...inventory];
        $("message").textContent =
            "Enter a product name to search. Showing all products.";
    } else {
        const found = findProduct(query);

        if (found) {
            displayedProducts = inventory.filter(
                product =>
                    product.name.toLowerCase().includes(query.toLowerCase())
            );

            $("message").textContent =
                `Found ${displayedProducts.length} matching product(s).`;
        } else {
            displayedProducts = [];
            $("message").textContent = "No matching product found.";
        }
    }

    updateDashboard();
}

function showAllProducts() {
    displayedProducts = [...inventory];
    $("message").textContent = "Showing all inventory products.";
    updateDashboard();
}

function applyPriceFilter() {
    const rawValue = $("maxPrice").value.trim();

    if (rawValue === "") {
        $("message").textContent = "Please enter a maximum price.";
        return;
    }

    const maxPrice = Number(rawValue);

    if (!Number.isFinite(maxPrice) || maxPrice < 0) {
        $("message").textContent =
            "Enter a valid maximum price of zero or more.";
        return;
    }


    const filteredProducts = filterByPrice(maxPrice);

    displayedProducts = filteredProducts;
    renderFiltered(filteredProducts);

    $("message").textContent =
        `${filteredProducts.length} product(s) priced at or below ` +
        `${money(maxPrice)}.`;

    updateDashboard();
}

function updateCalculation() {
    const taxRate = Number($("taxRate").value);
    const discountRate = Number($("discountRate").value);

    if (
        $("taxRate").value.trim() === "" ||
        $("discountRate").value.trim() === "" ||
        !Number.isFinite(taxRate) ||
        !Number.isFinite(discountRate) ||
        taxRate < 0 || taxRate > 100 ||
        discountRate < 0 || discountRate > 100
    ) {
        $("message").textContent =
            "Tax and discount must each be between 0 and 100.";
        return;
    }

    const result = calculateFinalPrice(
        calculateTotal(inventory),
        taxRate,
        discountRate
    );

    $("subtotal").textContent = money(result.subtotal);
    $("discountAmount").textContent = money(result.discount);
    $("taxAmount").textContent = money(result.tax);
    $("finalAmount").textContent = money(result.finalPrice);
}

$("addBtn").addEventListener("click", addProduct);
$("searchBtn").addEventListener("click", searchProducts);
$("showAllBtn").addEventListener("click", showAllProducts);
$("filterBtn").addEventListener("click", applyPriceFilter);
$("calculateBtn").addEventListener("click", updateCalculation);

$("searchInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchProducts();
    }
});

updateDashboard();
renderFiltered([]);
updateCalculation();
printInventory(inventory);

console.log("Dashboard initialized successfully!");
