// ================================
// VÉRA DRESS STORE
// script.js
// ================================

let cartCount = 0;

// ADD TO CART
const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    cartCount++;

    alert("Product added to cart! 🛒");

    console.log("Cart Items:", cartCount);
  });
});


// NAVIGATION
const navLinks = document.querySelectorAll(".navbar nav a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    console.log("Opening:", link.textContent);
  });
});


// SHOP BUTTON
const shopButtons = document.querySelectorAll(".shop-btn");

shopButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    console.log("Shop Now clicked");
  });
});


// PAGE LOAD
window.addEventListener("load", function () {
  console.log("VÉRA Fashion Store loaded successfully!");
});
