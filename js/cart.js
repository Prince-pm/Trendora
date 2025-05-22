// Define your products
const products = {
    "minimalist-watch": {
      title: "Minimalist Watch",
      price: 149,
      image: "assets/icons/minimalist-watch.jpg"
    },
    "bluetooth-headphones": {
      title: "Bluetooth Headphones",
      price: 89,
      image: "assets/icons/bluetooth-headphones.jpg"
    },
    "modern-lamp": {
      title: "Modern Lamp",
      price: 59,
      image: "assets/icons/modern-lamp.jpg"
    }
  };
  
  // Load cart from localStorage
  function loadCart() {
    return JSON.parse(localStorage.getItem("trendora_cart")) || [];
  }
  
  // Save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem("trendora_cart", JSON.stringify(cart));
  }
  
  // Render the cart items
  function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");
    const cart = loadCart();
    cartContainer.innerHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "0";
      return;
    }
  
    cart.forEach(item => {
      const product = products[item.productKey];
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
  
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <div class="item-details">
          <h3>${product.title}</h3>
          <p class="price">Price: ₹${product.price}</p>
          <label>
            Qty:
            <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-product-key="${item.productKey}" />
          </label>
          <button class="remove-btn" data-product-key="${item.productKey}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });
  
    cartTotal.textContent = total;
  }
  
  // Update quantity
  function updateQuantity(productKey, newQuantity) {
    const cart = loadCart();
    const item = cart.find(i => i.productKey === productKey);
    if (item) {
      item.quantity = newQuantity;
      saveCart(cart);
      renderCart();
    }
  }
  
  // Remove item from cart
  function removeItem(productKey) {
    let cart = loadCart();
    cart = cart.filter(i => i.productKey !== productKey);
    saveCart(cart);
    renderCart();
  }
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    renderCart();
  
    document.getElementById("cart-container").addEventListener("input", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        const productKey = e.target.dataset.productKey;
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
          updateQuantity(productKey, newQuantity);
        }
      }
    });
  
    document.getElementById("cart-container").addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const productKey = e.target.dataset.productKey;
        removeItem(productKey);
      }
    });
  });
  