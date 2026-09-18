// ========================================
// VÉRA FASHION STORE - script.js
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // CART
    // ========================================

    let cart = JSON.parse(
        localStorage.getItem("veraCart") || "[]"
    );

    function updateCartCount() {
        const count = cart.reduce(
            (total, item) => total + (item.quantity || 1),
            0
        );

        document.querySelectorAll(
            "#cartCount, .cart-count"
        ).forEach(element => {
            element.textContent = count;
        });
    }

    function addToCart(product) {

        const existingProduct = cart.find(
            item => item.name === product.name
        );

        if (existingProduct) {
            existingProduct.quantity =
                (existingProduct.quantity || 1) + 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem(
            "veraCart",
            JSON.stringify(cart)
        );

        updateCartCount();

        alert(product.name + " added to cart.");
    }


    // ========================================
    // ADD TO CART BUTTON
    // ========================================

    document.querySelectorAll(
        ".add-to-cart, [data-add-to-cart]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(
                ".product-card, .product, article, .product-item"
            );

            const name =
                button.dataset.name ||
                card?.dataset.name ||
                card?.querySelector(
                    ".product-name, h3, h2"
                )?.textContent?.trim() ||
                "Fashion Product";

            const priceText =
                button.dataset.price ||
                card?.dataset.price ||
                card?.querySelector(
                    ".price"
                )?.textContent ||
                "0";

            const price =
                Number(
                    String(priceText)
                        .replace(/[^\d.]/g, "")
                ) || 0;

            addToCart({
                name: name,
                price: price
            });
        });
    });

    updateCartCount();


    // ========================================
    // WISHLIST
    // ========================================

    const wishlist = new Set(
        JSON.parse(
            localStorage.getItem("veraWishlist") || "[]"
        )
    );

    document.querySelectorAll(
        ".wishlist, [data-wishlist]"
    ).forEach(button => {

        const productName =
            button.dataset.name ||
            button.closest(
                ".product-card"
            )?.dataset.name ||
            "";

        if (
            productName &&
            wishlist.has(productName)
        ) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            const name =
                button.dataset.name ||
                button.closest(
                    ".product-card"
                )?.dataset.name ||
                "Product";

            if (wishlist.has(name)) {

                wishlist.delete(name);
                button.classList.remove("active");

            } else {

                wishlist.add(name);
                button.classList.add("active");

            }

            localStorage.setItem(
                "veraWishlist",
                JSON.stringify(
                    [...wishlist]
                )
            );
        });
    });


    // ========================================
    // PRODUCT SEARCH
    // ========================================

    const searchInputs = document.querySelectorAll(
        "#productSearch, .product-search, input[placeholder*='Search products']"
    );

    searchInputs.forEach(input => {

        input.addEventListener("input", () => {

            const query =
                input.value
                    .toLowerCase()
                    .trim();

            document.querySelectorAll(
                ".product-card, .product, .product-item, article"
            ).forEach(card => {

                const text =
                    card.textContent.toLowerCase();

                card.style.display =
                    !query ||
                    text.includes(query)
                        ? ""
                        : "none";
            });
        });
    });


    // ========================================
    // SMOOTH NAVIGATION
    // ========================================

    document.querySelectorAll(
        "a[href^='#']"
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    });


    // ========================================
    // MOBILE MENU
    // ========================================

    const menuButton =
        document.querySelector(
            "#menuButton, .menu-button, .mobile-menu-button"
        );

    const mobileMenu =
        document.querySelector(
            "#mobileMenu, .mobile-menu, nav"
        );

    if (
        menuButton &&
        mobileMenu
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "open"
                );
            }
        );
    }


    // ========================================
    // IMAGE ERROR HANDLING
    // ========================================

    document.querySelectorAll(
        "img"
    ).forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.visibility =
                    "hidden";
            }
        );
    });


    // ========================================
    // WEBSITE LOADED
    // ========================================

    console.log(
        "VÉRA Fashion Store loaded successfully."
    );

});
