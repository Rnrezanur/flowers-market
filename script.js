document.addEventListener('DOMContentLoaded', () => {
  // Cart State Variables
  let cartItems = [];

  // DOM Elements
  const cartButton = document.querySelector('.cart-btn');
  const cartDisplay = document.getElementById('cart-display') || document.querySelector('.cart-btn span:last-child');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .add-btn');

  // Modal Elements
  const cartModal = document.getElementById('cart-modal');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotalDisplay = document.getElementById('cart-total-display');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Helper: Update Navbar & Modal UI
  function updateCartUI() {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    // 1. Update Navbar Text
    if (cartDisplay) {
      cartDisplay.textContent = `Cart (${totalAmount} Tk)`;
    }

    // 2. Update Modal Total
    if (cartTotalDisplay) {
      cartTotalDisplay.textContent = `${totalAmount} Tk`;
    }

    // 3. Render Modal Items
    if (cartItemsList) {
      if (cartItems.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty 🌸</p>';
      } else {
        cartItemsList.innerHTML = cartItems
          .map(
            (item, index) => `
            <div class="cart-item-row">
              <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price} Tk</p>
              </div>
              <button class="remove-item-btn" data-index="${index}">Remove</button>
            </div>
          `
          )
          .join('');

        // Attach event listeners to all "Remove" buttons
        const removeButtons = cartItemsList.querySelectorAll('.remove-item-btn');
        removeButtons.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const itemIndex = parseInt(e.target.dataset.index, 10);
            cartItems.splice(itemIndex, 1);
            updateCartUI();
          });
        });
      }
    }
  }

  // 1. Add to Cart Button Click on Cards
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const card = button.closest('.flower-card');
      let flowerName = 'Flower';
      let price = 0;

      if (card) {
        const nameEl = card.querySelector('.flower-name');
        const priceEl = card.querySelector('.flower-price');

        if (nameEl) flowerName = nameEl.textContent.trim();
        if (priceEl) {
          price = parseInt(priceEl.textContent.replace(/\D/g, ''), 10) || 0;
        }
      }

      // Add to array
      cartItems.push({ name: flowerName, price: price });
      updateCartUI();

      // Notification Feedback
      alert(`"${flowerName}" added to cart!`);
    });
  });

  // 2. Open Cart Modal when clicking Navbar Cart button
  if (cartButton && cartModal) {
    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      cartModal.classList.add('active');
    });
  }

  // 3. Close Cart Modal
  if (closeCartBtn && cartModal) {
    closeCartBtn.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  // Close when clicking outside the modal box
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove('active');
      }
    });
  }

  // 4. Clear Cart Button
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cartItems.length > 0) {
        if (confirm('Are you sure you want to clear your cart?')) {
          cartItems = [];
          updateCartUI();
        }
      }
    });
  }

  // 5. Checkout Button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cartItems.length === 0) {
        alert('Your cart is empty! Please add some flowers before checking out.');
      } else {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
        alert(`💐 Order Placed Successfully!\n\nTotal Items: ${cartItems.length}\nTotal Amount: ${totalAmount} Tk\n\nThank you for shopping with Funky Flower Market!`);
        cartItems = [];
        updateCartUI();
        if (cartModal) cartModal.classList.remove('active');
      }
    });
  }

  // 6. Newsletter Form Handling
  const newsletterForm = document.getElementById('newsletterForm') || document.querySelector('.subscribe-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Flower Market!');
      newsletterForm.reset();
    });
  }
});