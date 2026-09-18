/* ==========================================
   VÉRA FASHION - SCRIPT.JS
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       CART DATA
    ================================= */

    let cart = JSON.parse(localStorage.getItem("veraCart")) || [];

    function saveCart() {
        localStorage.setItem("veraCart", JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.querySelector(".cart-count");

        if (cartCount) {
            cartCount.textContent = cart.reduce(
                (total, item) => total + item.quantity,
                0
            );
        }
    }


    /* ================================
       GET PRICE
    ================================= */

    function getPrice(priceText) {
        return Number(
            priceText
                .replace(/[₹,\s]/g, "")
                .replace(/[^\d.]/g, "")
        ) || 0;
    }


    /* ================================
       ADD TO CART
    ================================= */

    const addButtons = document.querySelectorAll(
        ".add-cart, .add-to-cart, button"
    );

    addButtons.forEach(function (button) {

        const buttonText =
            button.textContent.trim().toLowerCase();

        if (!buttonText.includes("add to cart")) {
            return;
        }

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            const card = button.closest(
                ".product-card, .product, .product-item, article"
            );

            if (!card) return;

            const nameElement = card.querySelector(
                "h2, h3, h4, .product-name"
            );

            const priceElement = card.querySelector(
                ".price, .product-price"
            );

            const imageElement = card.querySelector("img");

            const name = nameElement
                ? nameElement.textContent.trim()
                : "VÉRA Product";

            const priceText = priceElement
                ? priceElement.textContent.trim()
                : "₹0";

            const price = getPrice(priceText);

            const image = imageElement
                ? imageElement.src
                : "";

            const existing = cart.find(
                item => item.name === name
            );

            if (existing) {
                existing.quantity++;
            } else {
                cart.push({
                    id: Date.now(),
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            saveCart();

            button.textContent = "✓ Added";

            setTimeout(function () {
                button.textContent = "Add to Cart";
            }, 1000);

        }, true);

    });


    /* ================================
       CART WINDOW
    ================================= */

    function openCart() {

        let oldCart = document.getElementById("veraCartWindow");

        if (oldCart) {
            oldCart.remove();
        }

        const cartWindow =
            document.createElement("div");

        cartWindow.id = "veraCartWindow";

        cartWindow.innerHTML = `
            <div class="vera-cart-overlay"></div>

            <div class="vera-cart-box">

                <div class="vera-cart-header">
                    <h2>Shopping Cart</h2>

                    <button id="closeVeraCart">
                        ×
                    </button>
                </div>

                <div id="veraCartItems"></div>

                <div class="vera-cart-footer">

                    <div class="vera-cart-total">
                        <span>Total</span>
                        <strong id="veraCartTotal">
                            ₹0
                        </strong>
                    </div>

                    <button id="veraCheckout">
                        Checkout →
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(cartWindow);

        renderCart();

        document
            .getElementById("closeVeraCart")
            .addEventListener("click", closeCart);

        document
            .querySelector(".vera-cart-overlay")
            .addEventListener("click", closeCart);

        document
            .getElementById("veraCheckout")
            .addEventListener("click", function () {

                if (cart.length === 0) {
                    alert("Your cart is empty.");
                    return;
                }

                alert(
                    "Checkout\n\n" +
                    "Total: ₹" +
                    calculateTotal() +
                    "\n\nThank you for shopping with VÉRA!"
                );

            });

    }


    /* ================================
       CLOSE CART
    ================================= */

    function closeCart() {

        const cartWindow =
            document.getElementById("veraCartWindow");

        if (cartWindow) {
            cartWindow.remove();
        }

    }


    /* ================================
       RENDER CART
    ================================= */

    function renderCart() {

        const itemsContainer =
            document.getElementById("veraCartItems");

        const totalElement =
            document.getElementById("veraCartTotal");

        if (!itemsContainer) return;

        if (cart.length === 0) {

            itemsContainer.innerHTML = `
                <div class="vera-empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to your cart.</p>
                </div>
            `;

            totalElement.textContent = "₹0";

            return;
        }


        itemsContainer.innerHTML = "";

        cart.forEach(function (item, index) {

            const itemElement =
                document.createElement("div");

            itemElement.className =
                "vera-cart-item";

            itemElement.innerHTML = `

                <div class="vera-cart-image">
                    ${
                        item.image
                        ? `<img src="${item.image}" alt="${item.name}">`
                        : ""
                    }
                </div>

                <div class="vera-cart-info">

                    <h3>${item.name}</h3>

                    <p>₹${item.price.toLocaleString("en-IN")}</p>

                    <div class="vera-quantity">

                        <button class="quantity-minus"
                            data-index="${index}">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button class="quantity-plus"
                            data-index="${index}">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="vera-remove"
                    data-index="${index}">
                    🗑️
                </button>

            `;

            itemsContainer.appendChild(itemElement);

        });


        totalElement.textContent =
            "₹" +
            calculateTotal().toLocaleString("en-IN");


        /* ================================
           PLUS
        ================================= */

        document
            .querySelectorAll(".quantity-plus")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const index =
                        Number(button.dataset.index);

                    cart[index].quantity++;

                    saveCart();

                    renderCart();

                });

            });


        /* ================================
           MINUS
        ================================= */

        document
            .querySelectorAll(".quantity-minus")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const index =
                        Number(button.dataset.index);

                    if (cart[index].quantity > 1) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(index, 1);

                    }

                    saveCart();

                    renderCart();

                });

            });


        /* ================================
           REMOVE
        ================================= */

        document
            .querySelectorAll(".vera-remove")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const index =
                        Number(button.dataset.index);

                    cart.splice(index, 1);

                    saveCart();

                    renderCart();

                });

            });

    }


    /* ================================
       TOTAL
    ================================= */

    function calculateTotal() {

        return cart.reduce(function (total, item) {

            return total +
                (item.price * item.quantity);

        }, 0);

    }


    /* ================================
       CART BUTTON
    ================================= */

    const cartButtons = document.querySelectorAll(
        ".cart, .cart-icon, .cart-button, #cartButton"
    );

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            openCart();

        });

    });


    /* ================================
       WISHLIST
    ================================= */

    let wishlist =
        JSON.parse(
            localStorage.getItem("veraWishlist")
        ) || [];


    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist, .wishlist-btn"
        );


    wishlistButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(
                ".product-card, .product, article"
            );

            if (!card) return;

            const nameElement =
                card.querySelector(
                    "h2, h3, h4, .product-name"
                );

            const name = nameElement
                ? nameElement.textContent.trim()
                : "Product";


            if (wishlist.includes(name)) {

                wishlist =
                    wishlist.filter(
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


    /* ================================
       SEARCH
    ================================= */

    const searchInput =
        document.querySelector(
            ".search-box input, #searchInput"
        );


    const productCards =
        document.querySelectorAll(
            ".product-card, .product, .product-item"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const text =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                productCards.forEach(
                    function (product) {

                        const productText =
                            product.textContent
                                .toLowerCase();


                        product.style.display =
                            productText.includes(text)
                            ? ""
                            : "none";

                    }
                );

            }
        );

    }


    /* ================================
       SMOOTH NAVIGATION
    ================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        link.getAttribute("href");

                    const target =
                        document.querySelector(id);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        });


    /* ================================
       START
    ================================= */

    updateCartCount();

    console.log(
        "VÉRA Fashion loaded successfully."
    );

});
