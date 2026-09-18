document.addEventListener("DOMContentLoaded", function () {

    // CART
    let cart = JSON.parse(localStorage.getItem("veraCart") || "[]");

    function updateCartCount() {
        let total = 0;

        cart.forEach(function (item) {
            total += item.quantity || 1;
        });

        const cartCount = document.getElementById("cartCount");

        if (cartCount) {
            cartCount.textContent = total;
        }
    }

    // ADD TO CART
    document.querySelectorAll(".cart-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name || "Fashion Product";
            const price = Number(button.dataset.price) || 0;

            const existing = cart.find(function (item) {
                return item.name === name;
            });

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            localStorage.setItem(
                "veraCart",
                JSON.stringify(cart)
            );

            updateCartCount();

            alert(name + " added to cart!");
        });

    });

    updateCartCount();


    // WISHLIST
    let wishlist = JSON.parse(
        localStorage.getItem("veraWishlist") || "[]"
    );

    document.querySelectorAll(".wishlist").forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name || "Product";

            if (wishlist.includes(name)) {

                wishlist = wishlist.filter(function (item) {
                    return item !== name;
                });

                button.classList.remove("active");

            } else {

                wishlist.push(name);
                button.classList.add("active");

            }

            localStorage.setItem(
                "veraWishlist",
                JSON.stringify(wishlist)
            );
        });

    });


    // SEARCH
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();

            document.querySelectorAll(".product-card").forEach(
                function (product) {

                    const productName =
                        product.dataset.name.toLowerCase();

                    if (
                        productName.includes(searchText)
                    ) {
                        product.style.display = "";
                    } else {
                        product.style.display = "none";
                    }
                }
            );
        });
    }


    // SEARCH BUTTON
    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn && searchInput) {

        searchBtn.addEventListener("click", function () {

            searchInput.focus();

            searchInput.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });
    }


    // CART BUTTON
    const cartBtn = document.getElementById("cartBtn");

    if (cartBtn) {

        cartBtn.addEventListener("click", function () {

            if (cart.length === 0) {

                alert("Your cart is empty.");

            } else {

                let message = "Your Cart:\n\n";

                cart.forEach(function (item) {

                    message +=
                        item.name +
                        " × " +
                        item.quantity +
                        " - ₹" +
                        (item.price * item.quantity) +
                        "\n";

                });

                alert(message);
            }
        });
    }


    // WISHLIST BUTTON
    const wishlistBtn =
        document.getElementById("wishlistBtn");

    if (wishlistBtn) {

        wishlistBtn.addEventListener("click", function () {

            if (wishlist.length === 0) {

                alert("Your wishlist is empty.");

            } else {

                alert(
                    "Wishlist:\n\n" +
                    wishlist.join("\n")
                );
            }

        });
    }


    // SMOOTH SCROLL
    document.querySelectorAll("a[href^='#']").forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                const id =
                    link.getAttribute("href");

                if (id && id !== "#") {

                    const target =
                        document.querySelector(id);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            });
        }
    );


    console.log("VÉRA Fashion Store loaded successfully.");

});
