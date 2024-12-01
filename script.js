document.addEventListener("DOMContentLoaded", () => {
  // Clear Search Input Functionality
  const clearButton = document.getElementById('clearButton');
  const searchInput = document.getElementById('searchInput');

  if (clearButton && searchInput) {
    clearButton.addEventListener('click', () => {
      searchInput.value = ''; // Clear the input field
    });
  }

  // Load cart from localStorage (if any)
  loadCart();

  // Set up event listeners for all 'Add to Cart' buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const itemName = e.target.getAttribute('data-name');
      const itemPrice = parseFloat(e.target.getAttribute('data-price'));
      const itemImage = e.target.getAttribute('data-image');
      addToCart(itemName, itemPrice, itemImage);
    });
  });
});

// Initialize cart and total price
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage
let totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

// Function to add item to cart
function addToCart(itemName, itemPrice, itemImage) {
  // Create item object
  const item = { name: itemName, price: itemPrice, image: itemImage };

  // Add item to cart array
  cart.push(item);

  // Update total price
  totalPrice += itemPrice;

  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart display
  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  // Clear previous cart items
  cartItemsContainer.innerHTML = '';

  // Display cart items
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <section class="item-info">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <p class="cart-item-name">${item.name}</p>
      </section>
      <section class="item-price">
        <span class="price">$${item.price.toFixed(2)}</span>
        <button class="remove-item" onclick="removeItem(${index})">X</button>
      </section>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  // Update total price
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to remove a single item from the cart
function removeItem(index) {
  const item = cart[index];

  // Remove item from cart
  cart.splice(index, 1);

  // Update total price
  totalPrice -= item.price;

  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart display
  updateCart();
}

// Clear all cart items
document.getElementById("clear-all").addEventListener("click", function() {
  cart = []; // Clear the cart array
  totalPrice = 0; // Reset total price

  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart display
  updateCart();
});

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
  } else {
    alert("Proceeding to checkout...");
    // Implement checkout functionality here (e.g., payment gateway)
  }
});

// Load cart and total price on page load
function loadCart() {
  if (cart.length > 0) {
    updateCart(); // Call updateCart to render items and total price
  } else {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>'; // Display empty message if no items
  }
}
