// ==========================================
// VÉRA FASHION - SCRIPT.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // CART
    // ==============================

    let cart = JSON.parse(localStorage.getItem("veraCart")) || [];

    const cartButton = document.querySelector(
        "#cartButton, .cart-button, [data-cart]"
    );

    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);

        // Find cart number
        const cartElements = document.querySelectorAll(
            "#cartCount, .cart-count, [data-cart-count]"
        );

        cartElements.forEach(element => {
            element.textContent = count;
        });
    }

    function saveCart() {
        localStorage.setItem("veraCart", JSON.stringify(cart));
        updateCartCount();
    }

    // ==============================
    // ADD TO CART
    // ==============================

    document.querySelectorAll("button").forEach(button => {

        const text = button.textContent.trim().toLowerCase();

        if (text.includes("add to cart")) {

            button.addEventListener("click", () => {

                const productCard =
                    button.closest(
                        ".product-card, .product, .product-item, article"
                    );

                let name = "Fashion Product";
                let price = 0;

                if (productCard) {

                    const nameElement =
                        productCard.querySelector(
                            "h2, h3, h4, .product-name, .product-title"
                        );

                    const priceElement =
                        productCard.querySelector(
                            ".price, .product-price"
                        );

                    if (nameElement) {
                        name = nameElement.textContent.trim();
                    }

                    if (priceElement) {
                        price = parseInt(
                            priceElement.textContent.replace(/[^\d]/g, "")
                        ) || 0;
                    }
                }

                // Check if product already exists
                const existingProduct = cart.find(
                    item => item.name === name
                );

                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push({
                        name: name,
                        price: price,
                        quantity: 1
                    });
                }

                saveCart();

                alert(
                    `${name} added to cart!\n\nCart items: ${cart.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                    )}`
                );
            });
        }
    });


    // ==============================
    // CART BUTTON
    // ==============================

    document.querySelectorAll("button").forEach(button => {

        const text = button.textContent.trim();

        if (
            text.includes("🛒") ||
            text.toLowerCase().includes("cart")
        ) {

            button.addEventListener("click", () => {

                if (cart.length === 0) {
                    alert("Your cart is empty.");
                    return;
                }

                let message = "Your Cart:\n\n";
                let total = 0;

                cart.forEach(item => {

                    const itemTotal =
                        item.price * item.quantity;

                    total += itemTotal;

                    message +=
                        `${item.name} × ${item.quantity} - ₹${itemTotal}\n`;
                });

                message += `\nTotal: ₹${total}`;

                alert(message);
            });
        }
    });


    // ==============================
    // SEARCH
    // ==============================

    const searchButtons = document.querySelectorAll(
        "#searchButton, .search-button, [data-search]"
    );

    searchButtons.forEach(button => {

        button.addEventListener("click", () => {

            let searchBox =
                document.querySelector(
                    "#searchInput, .search-input, input[type='search']"
                );

            if (!searchBox) {

                searchBox = document.createElement("input");

                searchBox.type = "search";
                searchBox.placeholder = "Search products...";
                searchBox.id = "searchInput";

                searchBox.style.display = "block";
                searchBox.style.margin = "10px auto";
                searchBox.style.padding = "10px";
                searchBox.style.width = "80%";

                button.parentElement.appendChild(searchBox);
            }

            searchBox.focus();
        });
    });


    // ==============================
    // PRODUCT SEARCH
    // ==============================

    document.addEventListener("input", event => {

        if (
            event.target.matches(
                "#searchInput, .search-input, input[type='search']"
            )
        ) {

            const searchText =
                event.target.value.toLowerCase().trim();

            const products = document.querySelectorAll(
                ".product-card, .product, .product-item, article"
            );

            products.forEach(product => {

                const text =
                    product.textContent.toLowerCase();

                if (text.includes(searchText)) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }
            });
        }
    });


    // ==============================
    // WISHLIST ❤️
    // ==============================

    let wishlist =
        JSON.parse(localStorage.getItem("veraWishlist")) || [];

    document.querySelectorAll(
        ".wishlist, .heart, .wishlist-button, [data-wishlist]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const productCard =
                button.closest(
                    ".product-card, .product, .product-item, article"
                );

            let productName = "Product";

            if (productCard) {

                const nameElement =
                    productCard.querySelector(
                        "h2, h3, h4, .product-name, .product-title"
                    );

                if (nameElement) {
                    productName =
                        nameElement.textContent.trim();
                }
            }

            if (wishlist.includes(productName)) {

                wishlist =
                    wishlist.filter(
                        item => item !== productName
                    );

                button.classList.remove("active");

            } else {

                wishlist.push(productName);

                button.classList.add("active");
            }

            localStorage.setItem(
                "veraWishlist",
                JSON.stringify(wishlist)
            );
        });
    });


    // ==============================
    // NAVIGATION
    // ==============================

    document.querySelectorAll("nav a, header a").forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (
                href &&
                href.startsWith("#") &&
                href.length > 1
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


    // ==============================
    // SHOP NOW / EXPLORE NOW
    // ==============================

    document.querySelectorAll("a").forEach(link => {

        const text =
            link.textContent.trim().toLowerCase();

        if (
            text.includes("shop now") ||
            text.includes("explore now")
        ) {

            link.addEventListener("click", event => {

                const shopSection =
                    document.querySelector(
                        "#shop, #products, .products, .shop-section"
                    );

                if (shopSection) {

                    event.preventDefault();

                    shopSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            });
        }
    });


    // ==============================
    // INITIAL CART COUNT
    // ==============================

    updateCartCount();

    console.log("VÉRA Fashion website loaded successfully.");
});
