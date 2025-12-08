// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  initializeNavigation();
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (currentPage === 'index.html' || currentPage === '') {
    loadHomePage();
  } else if (currentPage === 'products.html') {
    loadProductsPage();
  } else if (currentPage === 'product-detail.html') {
    loadProductDetailPage();
  } else if (currentPage === 'cart.html') {
    loadCartPage();
  } else if (currentPage === 'checkout.html') {
    loadCheckoutPage();
  } else if (currentPage === 'contact.html') {
    initializeContactForm();
  }
});

// Navigation
function initializeNavigation() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const searchInputs = document.querySelectorAll('#searchInput');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      navMenu.classList.remove('active');
    }
  });
  
  // Search functionality
  searchInputs.forEach(input => {
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = input.value.trim();
          if (query) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
          }
        }
      });
    }
  });
}

// Cart Functions
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      type: product.type,
      quantity: quantity
    });
  }
  
  saveCart();
  updateCartCount();
  showNotification('Product added to cart!');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  if (window.location.pathname.includes('cart.html')) {
    loadCartPage();
  }
}

function updateCartQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart();
      updateCartCount();
      if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
      }
    }
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('#cartCount');
  cartCountElements.forEach(el => {
    if (el) el.textContent = cartCount;
  });
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    box-shadow: var(--shadow-hover);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Home Page
function loadHomePage() {
  loadFeaturedProducts();
  loadNewArrivals();
}

function loadFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;
  
  const featured = products.filter(p => p.featured).slice(0, 6);
  container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function loadNewArrivals() {
  const container = document.getElementById('newArrivals');
  if (!container) return;
  
  const newProducts = products.filter(p => p.newArrival).slice(0, 6);
  container.innerHTML = newProducts.map(product => createProductCard(product)).join('');
}

// Product Card
function createProductCard(product) {
  return `
    <a href="product-detail.html?id=${product.id}" class="product-card">
      <div class="product-image">
        <i class="fas fa-gem"></i>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${categories[product.category]} - ${product.type}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    </a>
  `;
}

// Products Page
function loadProductsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category');
  const searchQuery = urlParams.get('search');
  
  let filteredProducts = [...products];
  
  // Apply category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }
  
  // Apply filters from sidebar
  applyFilters(filteredProducts);
  
  // Setup filter listeners
  setupFilters();
  
  // Setup sort
  setupSort();
}

function setupFilters() {
  const categoryFilters = document.querySelectorAll('.category-filter');
  const priceRange = document.getElementById('priceRange');
  const clearFiltersBtn = document.getElementById('clearFilters');
  
  // Load product type filters
  loadProductTypeFilters();
  
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      filterProducts();
    });
  });
  
  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      document.getElementById('maxPrice').textContent = `$${e.target.value}`;
      filterProducts();
    });
  }
  
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      clearFilters();
    });
  }
}

function loadProductTypeFilters() {
  const container = document.getElementById('productTypeFilters');
  if (!container) return;
  
  const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
    .map(cb => cb.value);
  
  const types = new Set();
  products.forEach(product => {
    if (selectedCategories.length === 0 || selectedCategories.includes(product.category)) {
      types.add(product.type);
    }
  });
  
  container.innerHTML = Array.from(types).sort().map(type => `
    <label class="filter-checkbox">
      <input type="checkbox" value="${type}" class="type-filter">
      <span>${type}</span>
    </label>
  `).join('');
  
  // Add event listeners to new type filters
  document.querySelectorAll('.type-filter').forEach(filter => {
    filter.addEventListener('change', () => {
      filterProducts();
    });
  });
}

function filterProducts() {
  const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
    .map(cb => cb.value);
  const selectedTypes = Array.from(document.querySelectorAll('.type-filter:checked'))
    .map(cb => cb.value);
  const maxPrice = parseInt(document.getElementById('priceRange').value);
  
  let filtered = products.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) {
      return false;
    }
    if (product.price > maxPrice) {
      return false;
    }
    return true;
  });
  
  // Apply URL search if present
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }
  
  displayProducts(filtered);
  loadProductTypeFilters();
}

function clearFilters() {
  document.querySelectorAll('.category-filter, .type-filter').forEach(cb => {
    cb.checked = false;
  });
  document.getElementById('priceRange').value = 5000;
  document.getElementById('maxPrice').textContent = '$5000';
  filterProducts();
}

function setupSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortProducts(e.target.value);
    });
  }
}

function sortProducts(sortBy) {
  const container = document.getElementById('productsGrid');
  if (!container) return;
  
  const productCards = Array.from(container.children);
  const sorted = productCards.sort((a, b) => {
    const aId = parseInt(a.querySelector('a').href.split('id=')[1]);
    const bId = parseInt(b.querySelector('a').href.split('id=')[1]);
    const aProduct = products.find(p => p.id === aId);
    const bProduct = products.find(p => p.id === bId);
    
    switch(sortBy) {
      case 'price-low':
        return aProduct.price - bProduct.price;
      case 'price-high':
        return bProduct.price - aProduct.price;
      case 'name':
        return aProduct.name.localeCompare(bProduct.name);
      default:
        return 0;
    }
  });
  
  container.innerHTML = '';
  sorted.forEach(card => container.appendChild(card));
}

function displayProducts(productsToShow) {
  const container = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  
  if (!container) return;
  
  if (productsToShow.length === 0) {
    container.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  } else {
    container.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
  }
}

function applyFilters(filteredProducts) {
  displayProducts(filteredProducts);
}

// Product Detail Page
function loadProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (!productId) {
    window.location.href = 'products.html';
    return;
  }
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    window.location.href = 'products.html';
    return;
  }
  
  displayProductDetail(product);
  loadRelatedProducts(product);
  
  // Update breadcrumb
  const breadcrumbProduct = document.getElementById('breadcrumbProduct');
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = product.name;
  }
}

function displayProductDetail(product) {
  const container = document.getElementById('productDetail');
  if (!container) return;
  
  container.innerHTML = `
    <div class="product-gallery">
      <div class="main-image" id="mainImage">
        <i class="fas fa-gem"></i>
      </div>
      <div class="thumbnail-images">
        <div class="thumbnail active" onclick="changeMainImage(0)">
          <i class="fas fa-gem"></i>
        </div>
        <div class="thumbnail" onclick="changeMainImage(1)">
          <i class="fas fa-gem"></i>
        </div>
        <div class="thumbnail" onclick="changeMainImage(2)">
          <i class="fas fa-gem"></i>
        </div>
      </div>
    </div>
    <div class="product-details">
      <h1>${product.name}</h1>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <p class="product-category">${categories[product.category]} - ${product.type}</p>
      <p class="product-description">${product.description}</p>
      <div class="quantity-selector">
        <button class="quantity-btn" onclick="decreaseQuantity()">-</button>
        <input type="number" id="productQuantity" class="quantity-input" value="1" min="1">
        <button class="quantity-btn" onclick="increaseQuantity()">+</button>
      </div>
      <button class="btn btn-primary" onclick="addProductToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}

function changeMainImage(index) {
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function increaseQuantity() {
  const input = document.getElementById('productQuantity');
  input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
  const input = document.getElementById('productQuantity');
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function addProductToCart(productId) {
  const quantity = parseInt(document.getElementById('productQuantity').value) || 1;
  addToCart(productId, quantity);
}

function loadRelatedProducts(product) {
  const container = document.getElementById('relatedProducts');
  if (!container) return;
  
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  container.innerHTML = related.map(p => createProductCard(p)).join('');
}

// Cart Page
function loadCartPage() {
  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartContainer = document.querySelector('.cart-container');
  
  if (cart.length === 0) {
    if (cartItemsContainer) cartItemsContainer.style.display = 'none';
    if (cartContainer) cartContainer.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'block';
    return;
  }
  
  if (cartItemsContainer) cartItemsContainer.style.display = 'block';
  if (cartContainer) cartContainer.style.display = 'grid';
  if (emptyCart) emptyCart.style.display = 'none';
  
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <i class="fas fa-gem"></i>
        </div>
        <div class="cart-item-info">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-category">${categories[item.category]} - ${item.type}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-selector">
            <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span style="padding: 0 1rem;">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.id})">
            <i class="fas fa-trash"></i> Remove
          </button>
        </div>
      </div>
    `).join('');
  }
  
  updateCartSummary();
}

function updateCartItemQuantity(productId, quantity) {
  updateCartQuantity(productId, quantity);
  loadCartPage();
}

function updateCartSummary() {
  const subtotal = getCartTotal();
  const shipping = 10.00;
  const total = subtotal + shipping;
  
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');
  
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  
  // Disable checkout if cart is empty
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.style.pointerEvents = cart.length === 0 ? 'none' : 'auto';
    checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
  }
}

// Checkout Page
function loadCheckoutPage() {
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }
  
  loadOrderSummary();
  initializeCheckoutForm();
}

function loadOrderSummary() {
  const container = document.getElementById('orderItems');
  const subtotalEl = document.getElementById('orderSubtotal');
  const shippingEl = document.getElementById('orderShipping');
  const totalEl = document.getElementById('orderTotal');
  
  if (container) {
    container.innerHTML = cart.map(item => `
      <div class="order-item">
        <span class="order-item-name">${item.name}</span>
        <span class="order-item-quantity">x${item.quantity}</span>
        <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
  }
  
  const subtotal = getCartTotal();
  const shipping = 10.00;
  const total = subtotal + shipping;
  
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function initializeCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleCheckout();
    });
  }
}

function handleCheckout() {
  // In a real application, this would send data to a server
  alert('Thank you for your order! Your order has been placed successfully.');
  cart = [];
  saveCart();
  updateCartCount();
  window.location.href = 'index.html';
}

// Contact Form
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
  }
}
