// ==========================================
// VÉRA FASHION STORE - SCRIPT.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // VARIABLES
    // ==========================================

    let cart = JSON.parse(localStorage.getItem("veraCart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("veraWishlist")) || [];

    const cartCount = document.querySelector(".cart-count");
    const cartButton = document.querySelector(".cart-icon");
    const searchButton = document.querySelector(".search-icon");
    const searchInput = document.querySelector(".search-input");

    // ==========================================
    // PRODUCT DATA
    // ==========================================

    const products = [
        {
            id: 1,
            name: "Floral Dress",
            price: 1499,
            category: "Women"
        },
        {
            id: 2,
            name: "Green Party Dress",
            price: 1799,
            category: "Women"
        },
        {
            id: 3,
            name: "Classic Blue Shirt",
            price: 999,
            category: "Men"
        },
        {
            id: 4,
            name: "Summer Floral Dress",
            price: 1599,
            category: "Women"
        }
    ];

    // ==========================================
    // UPDATE CART COUNT
    // ==========================================

    function updateCartCount() {

        if (!cartCount) return;

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;
    }

    // ==========================================
    // SAVE CART
    // ==========================================

    function saveCart() {
        localStorage.setItem("veraCart", JSON.stringify(cart));
        updateCartCount();
    }

    // ==========================================
    // ADD TO CART
    // ==========================================

    function addToCart(productId) {

        const product = products.find(
            item => item.id === productId
        );

        if (!product) return;

        const existingProduct = cart.find(
            item => item.id === productId
        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        saveCart();

        alert(
            product.name +
            " added to cart 🛒"
        );
    }

    // ==========================================
    // REMOVE FROM CART
    // ==========================================

    function removeFromCart(productId) {

        cart = cart.filter(
            item => item.id !== productId
        );

        saveCart();

        showCart();
    }

    // ==========================================
    // CHANGE QUANTITY
    // ==========================================

    function changeQuantity(productId, change) {

        const item = cart.find(
            product => product.id === productId
        );

        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {

            cart = cart.filter(
                product => product.id !== productId
            );
        }

        saveCart();

        showCart();
    }

    // ==========================================
    // SHOW CART
    // ==========================================

    function showCart() {

        if (cart.length === 0) {

            alert("Your cart is empty 🛒");

            return;
        }

        let message = "Your Cart:\n\n";

        let total = 0;

        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            message +=
                item.name +
                " × " +
                item.quantity +
                " = ₹" +
                itemTotal +
                "\n";
        });

        message +=
            "\n------------------\n" +
            "Total = ₹" +
            total;

        alert(message);
    }

    // ==========================================
    // WISHLIST
    // ==========================================

    function toggleWishlist(productId) {

        const index = wishlist.indexOf(productId);

        if (index === -1) {

            wishlist.push(productId);

            alert("Added to wishlist ❤️");

        } else {

            wishlist.splice(index, 1);

            alert("Removed from wishlist 💔");
        }

        localStorage.setItem(
            "veraWishlist",
            JSON.stringify(wishlist)
        );
    }

    // ==========================================
    // ADD TO CART BUTTONS
    // ==========================================

    const addButtons =
        document.querySelectorAll(
            ".add-to-cart, .addCart, [data-add-cart]"
        );

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productName =
                button.closest(".product-card")
                    ?.querySelector(".product-name")
                    ?.textContent
                    ?.trim();

            if (productName) {

                const product =
                    products.find(
                        item =>
                            item.name.toLowerCase() ===
                            productName.toLowerCase()
                    );

                if (product) {
                    addToCart(product.id);
                }

            } else {

                const id =
                    Number(
                        button.dataset.productId
                    );

                if (id) {
                    addToCart(id);
                }
            }
        });
    });

    // ==========================================
    // CART BUTTON
    // ==========================================

    if (cartButton) {

        cartButton.addEventListener(
            "click",
            showCart
        );
    }

    // ==========================================
    // WISHLIST BUTTONS
    // ==========================================

    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist, .wishlist-btn, .heart"
        );

    wishlistButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(
                        button.dataset.productId
                    );

                if (id) {
                    toggleWishlist(id);
                }
            }
        );
    });

    // ==========================================
    // SEARCH
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const searchText =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                const cards =
                    document.querySelectorAll(
                        ".product-card"
                    );

                cards.forEach(card => {

                    const text =
                        card.textContent
                            .toLowerCase();

                    if (
                        text.includes(searchText)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";
                    }
                });
            }
        );
    }

    // ==========================================
    // SEARCH ICON
    // ==========================================

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.focus();

                    searchInput.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            }
        );
    }

    // ==========================================
    // NAVIGATION
    // ==========================================

    const navLinks =
        document.querySelectorAll(
            "nav a, .nav-link"
        );

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    link.getAttribute("href");

                if (
                    target &&
                    target.startsWith("#")
                ) {

                    const section =
                        document.querySelector(
                            target
                        );

                    if (section) {

                        event.preventDefault();

                        section.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            }
        );
    });

    // ==========================================
    // SHOP NOW / EXPLORE NOW
    // ==========================================

    const shopButtons =
        document.querySelectorAll(
            ".shop-now, .shop-btn, .explore-btn"
        );

    shopButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const shopSection =
                    document.querySelector(
                        "#shop, #products, .products-section"
                    );

                if (shopSection) {

                    shopSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    });

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    updateCartCount();

    console.log(
        "VÉRA Fashion website loaded successfully."
    );

});
