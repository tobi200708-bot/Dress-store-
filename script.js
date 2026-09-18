// ==========================================
// VÉRA FASHION - SCRIPT.JS
// ==========================================

// Cart
let cart = JSON.parse(localStorage.getItem("veraCart")) || [];

// Wishlist
let wishlist = JSON.parse(localStorage.getItem("veraWishlist")) || [];


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();
    setupAddToCart();
    setupWishlist();
    setupSearch();
    setupNavigation();

});


// ==========================================
// ADD TO CART
// ==========================================

function setupAddToCart() {

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {

        const text = button.innerText.trim().toLowerCase();

        if (text.includes("add to cart")) {

            button.addEventListener("click", function () {

                const productCard = button.closest(
                    ".product-card, .product, .product-item, article"
                );

                let productName = "Fashion Product";
                let price = "0";

                if (productCard) {

                    const nameElement = productCard.querySelector(
                        "h1, h2, h3, h4, .product-name, .product-title"
                    );

                    const priceElement = productCard.querySelector(
                        ".price, .product-price"
                    );

                    if (nameElement) {
                        productName = nameElement.innerText.trim();
                    }

                    if (priceElement) {
                        price = priceElement.innerText.trim();
                    }
                }

                cart.push({
                    name: productName,
                    price: price
                });

                localStorage.setItem(
                    "veraCart",
                    JSON.stringify(cart)
                );

                updateCartCount();

                alert("🛒 Added to Cart!");

            });

        }

    });

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cartButtons = document.querySelectorAll(
        "#cartButton, .cart-button, [data-cart]"
    );

    cartButtons.forEach(function (button) {

        button.innerText = "🛒 " + cart.length;

    });

    // Find cart text if ID is not available
    const allElements = document.querySelectorAll("button");

    allElements.forEach(function (element) {

        if (
            element.innerText.includes("🛒") ||
            element.innerText.includes("Cart")
        ) {

            if (!element.innerText.toLowerCase().includes("add to cart")) {
                element.innerText = "🛒 " + cart.length;
            }

        }

    });

}


// ==========================================
// CART BUTTON
// ==========================================

document.addEventListener("click", function (event) {

    const button = event.target.closest(
        "#cartButton, .cart-button, [data-cart]"
    );

    if (!button) return;

    showCart();

});


// ==========================================
// SHOW CART
// ==========================================

function showCart() {

    if (cart.length === 0) {

        alert("🛒 Your cart is empty.");

        return;
    }

    let message = "🛒 YOUR VÉRA CART\n\n";

    cart.forEach(function (item, index) {

        message +=
            (index + 1) +
            ". " +
            item.name +
            " - " +
            item.price +
            "\n";

    });

    message +=
        "\nTotal Items: " +
        cart.length;

    alert(message);

}


// ==========================================
// WISHLIST
// ==========================================

function setupWishlist() {

    const heartButtons = document.querySelectorAll(
        ".wishlist, .heart, .wishlist-button, [data-wishlist]"
    );

    heartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                button.dataset.product ||
                button.closest(".product-card")?.innerText ||
                Math.random();

            if (wishlist.includes(productId)) {

                wishlist = wishlist.filter(
                    item => item !== productId
                );

                button.classList.remove("active");

                button.innerText = "♡";

            } else {

                wishlist.push(productId);

                button.classList.add("active");

                button.innerText = "♥";

            }

            localStorage.setItem(
                "veraWishlist",
                JSON.stringify(wishlist)
            );

        });

    });

}


// ==========================================
// SEARCH
// ==========================================

function setupSearch() {

    const searchInput = document.querySelector(
        "#searchInput, .search-input, input[type='search']"
    );

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const products = document.querySelectorAll(
            ".product-card, .product, .product-item, article"
        );

        products.forEach(function (product) {

            const productText =
                product.innerText.toLowerCase();

            if (
                searchText === "" ||
                productText.includes(searchText)
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}


// ==========================================
// SEARCH BUTTON
// ==========================================

document.addEventListener("click", function (event) {

    const searchButton = event.target.closest(
        "#searchButton, .search-button, [data-search]"
    );

    if (!searchButton) return;

    const searchInput = document.querySelector(
        "#searchInput, .search-input, input[type='search']"
    );

    if (searchInput) {

        searchInput.focus();

    }

});


// ==========================================
// NAVIGATION
// ==========================================

function setupNavigation() {

    const links = document.querySelectorAll(
        "nav a, header a"
    );

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href = link.getAttribute("href");

            if (
                href &&
                href.startsWith("#")
            ) {

                event.preventDefault();

                const section =
                    document.querySelector(href);

                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });

}


// ==========================================
// SHOP NOW BUTTON
// ==========================================

document.addEventListener("click", function (event) {

    const link = event.target.closest(
        ".shop-now, #shopNow, [data-shop]"
    );

    if (!link) return;

    const shopSection =
        document.querySelector("#shop, .shop-section");

    if (shopSection) {

        event.preventDefault();

        shopSection.scrollIntoView({
            behavior: "smooth"
        });

    }

});


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    cart = [];

    localStorage.removeItem("veraCart");

    updateCartCount();

    alert("🗑️ Cart cleared!");

}


// ==========================================
// CLEAR WISHLIST
// ==========================================

function clearWishlist() {

    wishlist = [];

    localStorage.removeItem("veraWishlist");

    alert("♡ Wishlist cleared!");

}


// ==========================================
// VÉRA READY
// ==========================================

console.log("VÉRA Fashion website loaded successfully.");
