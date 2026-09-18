/* =========================================
   VÉRA FASHION - SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // CART
    // =====================================

    let cart = JSON.parse(localStorage.getItem("veraCart")) || [];

    const cartCount = document.querySelector(".cart-count");

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    function saveCart() {
        localStorage.setItem("veraCart", JSON.stringify(cart));
        updateCartCount();
    }

    // =====================================
    // ADD TO CART
    // =====================================

    const addCartButtons = document.querySelectorAll(
        ".add-cart, .add-to-cart"
    );

    addCartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const productCard = button.closest(
                ".product-card, .product"
            );

            if (!productCard) return;

            const nameElement = productCard.querySelector(
                "h3, .product-name"
            );

            const priceElement = productCard.querySelector(
                ".price"
            );

            const imageElement = productCard.querySelector("img");

            const product = {
                id: Date.now(),
                name: nameElement
                    ? nameElement.textContent.trim()
                    : "VÉRA Product",

                price: priceElement
                    ? priceElement.textContent.trim()
                    : "Price unavailable",

                image: imageElement
                    ? imageElement.src
                    : ""
            };

            cart.push(product);
            saveCart();

            button.textContent = "✓ Added";

            setTimeout(() => {
                button.textContent = "Add to Cart";
            }, 1200);

        });

    });

    updateCartCount();


    // =====================================
    // WISHLIST
    // =====================================

    let wishlist = JSON.parse(
        localStorage.getItem("veraWishlist")
    ) || [];

    const wishlistButtons = document.querySelectorAll(
        ".wishlist, .wishlist-btn"
    );

    wishlistButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const productCard = button.closest(
                ".product-card, .product"
            );

            if (!productCard) return;

            const nameElement = productCard.querySelector(
                "h3, .product-name"
            );

            const name = nameElement
                ? nameElement.textContent.trim()
                : "Product";

            if (wishlist.includes(name)) {

                wishlist = wishlist.filter(
                    item => item !== name
                );

                button.textContent = "♡";

            } else {

                wishlist.push(name);
                button.textContent = "♥";

            }

            localStorage.setItem(
                "veraWishlist",
                JSON.stringify(wishlist)
            );

        });

    });


    // =====================================
    // PRODUCT SEARCH
    // =====================================

    const searchInput = document.querySelector(
        ".search-box input, #searchInput"
    );

    const products = document.querySelectorAll(
        ".product-card, .product"
    );

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchText =
                searchInput.value.toLowerCase().trim();

            products.forEach((product) => {

                const productText =
                    product.textContent.toLowerCase();

                if (productText.includes(searchText)) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }

            });

        });

    }


    // =====================================
    // NAVIGATION
    // =====================================

    const navLinks = document.querySelectorAll(
        'nav a[href^="#"]'
    );

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // SHOP NOW BUTTONS
    // =====================================

    const shopButtons = document.querySelectorAll(
        ".btn, .special-btn"
    );

    shopButtons.forEach((button) => {

        const text =
            button.textContent.toLowerCase();

        if (
            text.includes("shop") ||
            text.includes("explore")
        ) {

            button.addEventListener("click", () => {

                const productSection =
                    document.querySelector(
                        "#shop, .products-section"
                    );

                if (productSection) {

                    productSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            });

        }

    });


    // =====================================
    // IMAGE ERROR HANDLING
    // =====================================

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.style.display = "none";

        });

    });


    // =====================================
    // CURRENT YEAR
    // =====================================

    const yearElement =
        document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    // =====================================
    // CONSOLE MESSAGE
    // =====================================

    console.log(
        "VÉRA Fashion website loaded successfully."
    );

});
