// Main JavaScript functionality

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeSearch();
  loadHomePageContent();
  initializeProductPages();
  initializeProductDetail();
  initializeCartPage();
  initializeCheckoutPage();
});

// Navigation functionality
function initializeNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

// Search functionality
function initializeSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('active');
      if (searchBar.classList.contains('active') && searchInput) {
        searchInput.focus();
      }
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchBar.classList.remove('active');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}

// Home page content
function loadHomePageContent() {
  const featuredContainer = document.getElementById('featuredProducts');
  const newArrivalsContainer = document.getElementById('newArrivals');

  if (featuredContainer) {
    const featured = getFeaturedProducts().slice(0, 6);
    featuredContainer.innerHTML = featured.map(product => createProductCard(product)).join('');
  }

  if (newArrivalsContainer) {
    const newArrivals = getNewArrivals().slice(0, 6);
    newArrivalsContainer.innerHTML = newArrivals.map(product => createProductCard(product)).join('');
  }
}

// Create product card HTML
function createProductCard(product) {
  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <div class="product-image">${product.image}</div>
      <div class="product-info">
        <div class="product-category">${categories[product.category] || product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
    </a>
  `;
}

// Product listing page
function initializeProductPages() {
  if (!document.getElementById('productsContainer')) return;

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const subcategory = urlParams.get('subcategory');
  const search = urlParams.get('search');

  let filteredProducts = [];

  if (search) {
    filteredProducts = searchProducts(search);
    document.getElementById('productsTitle').textContent = `Search Results for "${search}"`;
  } else if (subcategory) {
    filteredProducts = getProductsBySubcategory(category, subcategory);
    const subcategories = getSubcategories(category);
    document.getElementById('productsTitle').textContent = subcategories[subcategory] || subcategory;
  } else if (category) {
    filteredProducts = getProductsByCategory(category);
    document.getElementById('productsTitle').textContent = categories[category] || category;
  } else {
    filteredProducts = products;
    document.getElementById('productsTitle').textContent = 'All Products';
  }

  renderProducts(filteredProducts);
  renderFilters(category);
}

// Render products
function renderProducts(productsList) {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  if (productsList.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 3rem; color: var(--text-light);">No products found.</p>';
    return;
  }

  container.innerHTML = productsList.map(product => createProductCard(product)).join('');
}

// Render filters
function renderFilters(selectedCategory) {
  const filtersContainer = document.getElementById('filtersContainer');
  if (!filtersContainer) return;

  // Category filter
  let filtersHTML = `
    <div class="filter-group">
      <h3>Category</h3>
      <div class="filter-option">
        <input type="radio" name="category" value="" id="cat-all" ${!selectedCategory ? 'checked' : ''}>
        <label for="cat-all">All Categories</label>
      </div>
  `;

  Object.entries(categories).forEach(([key, name]) => {
    filtersHTML += `
      <div class="filter-option">
        <input type="radio" name="category" value="${key}" id="cat-${key}" ${selectedCategory === key ? 'checked' : ''}>
        <label for="cat-${key}">${name}</label>
      </div>
    `;
  });

  filtersHTML += '</div>';

  // Subcategory filter (if category is selected)
  if (selectedCategory) {
    const subcategories = getSubcategories(selectedCategory);
    if (Object.keys(subcategories).length > 0) {
      filtersHTML += `
        <div class="filter-group">
          <h3>Type</h3>
      `;
      Object.entries(subcategories).forEach(([key, name]) => {
        filtersHTML += `
          <div class="filter-option">
            <input type="checkbox" name="subcategory" value="${key}" id="sub-${key}">
            <label for="sub-${key}">${name}</label>
          </div>
        `;
      });
      filtersHTML += '</div>';
    }
  }

  filtersContainer.innerHTML = filtersHTML;

  // Add event listeners
  document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      window.location.href = e.target.value ? `products.html?category=${e.target.value}` : 'products.html';
    });
  });

  document.querySelectorAll('input[name="subcategory"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selected = Array.from(document.querySelectorAll('input[name="subcategory"]:checked'))
        .map(cb => cb.value);
      const url = new URL(window.location);
      if (selected.length > 0) {
        url.searchParams.set('subcategory', selected[0]);
      } else {
        url.searchParams.delete('subcategory');
      }
      window.location.href = url.toString();
    });
  });
}

// Product detail page
function initializeProductDetail() {
  if (!document.getElementById('productDetail')) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    window.location.href = 'products.html';
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    window.location.href = 'products.html';
    return;
  }

  renderProductDetail(product);
}

function renderProductDetail(product) {
  const container = document.getElementById('productDetail');
  if (!container) return;

  container.innerHTML = `
    <div class="product-detail-container">
      <div class="product-gallery">
        <div class="gallery-thumbnails">
          <img src="${product.image}" alt="${product.name}" class="thumbnail active" onclick="changeMainImage(this)">
          <img src="${product.image}" alt="${product.name}" class="thumbnail" onclick="changeMainImage(this)">
          <img src="${product.image}" alt="${product.name}" class="thumbnail" onclick="changeMainImage(this)">
        </div>
        <div class="gallery-main">
          <div style="font-size: 8rem;">${product.image}</div>
        </div>
      </div>
      <div class="product-details">
        <div class="product-category">${categories[product.category] || product.category}</div>
        <h1>${product.name}</h1>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-description">${product.description}</div>
        <div class="quantity-selector">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" min="1" value="1">
        </div>
        <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id})">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
    </div>
  `;
}

function changeMainImage(thumbnail) {
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  thumbnail.classList.add('active');
  const mainImage = document.querySelector('.gallery-main div');
  if (mainImage) {
    mainImage.textContent = thumbnail.alt;
  }
}

function addToCart(productId) {
  const quantity = parseInt(document.getElementById('quantity').value) || 1;
  cart.addItem(productId, quantity);
}

// Cart page
function initializeCartPage() {
  if (!document.getElementById('cartItems')) return;

  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  
  if (!container) return;

  if (cart.items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart</p>
        <a href="products.html" class="btn btn-primary">Continue Shopping</a>
      </div>
    `;
    if (summary) summary.innerHTML = '';
    return;
  }

  container.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">${item.image}</div>
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Quantity: <input type="number" value="${item.quantity}" min="1" 
           onchange="updateCartQuantity(${item.id}, this.value)" style="width: 60px; padding: 0.25rem;"></p>
      </div>
      <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
      <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Remove item">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');

  if (summary) {
    const subtotal = cart.getTotal();
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    summary.innerHTML = `
      <h2>Order Summary</h2>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary checkout-btn">Proceed to Checkout</a>
    `;
  }
}

function updateCartQuantity(productId, quantity) {
  cart.updateQuantity(productId, parseInt(quantity));
  renderCart();
}

function removeFromCart(productId) {
  cart.removeItem(productId);
  renderCart();
}

// Checkout page
function initializeCheckoutPage() {
  if (!document.getElementById('checkoutForm')) return;

  if (cart.items.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  renderCheckoutSummary();
  
  const form = document.getElementById('checkoutForm');
  form.addEventListener('submit', handleCheckout);
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutSummary');
  if (!container) return;

  const subtotal = cart.getTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  container.innerHTML = `
    <h2>Order Summary</h2>
    ${cart.items.map(item => `
      <div class="summary-row">
        <span>${item.name} x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('')}
    <div class="summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
}

function handleCheckout(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (!data.name || !data.email || !data.address || !data.city || !data.zip || !data.cardNumber) {
    alert('Please fill in all required fields');
    return;
  }

  // In a real application, you would send this data to a server
  alert('Thank you for your order! Your order has been placed successfully.');
  cart.clear();
  window.location.href = 'index.html';
}

// Product detail initialization is called in main DOMContentLoaded handler
