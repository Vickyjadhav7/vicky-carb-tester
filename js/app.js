// ============================================
// LUMIÈRE JEWELS - Main Application
// ============================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});

// Main Application Object
const App = {
  cart: [],
  wishlist: [],
  
  init: function() {
    this.loadCart();
    this.loadWishlist();
    this.initHeader();
    this.initSearch();
    this.initMobileNav();
    this.initCart();
    this.initHeroSlider();
    this.initProductSliders();
    this.renderFeaturedProducts();
    this.renderNewArrivals();
    this.initQuickView();
    this.initNewsletter();
    this.initAccordion();
    this.updateCartCount();
    this.updateWishlistCount();
  },

  // ==========================================
  // Local Storage
  // ==========================================
  loadCart: function() {
    const savedCart = localStorage.getItem('lumiere_cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  },

  saveCart: function() {
    localStorage.setItem('lumiere_cart', JSON.stringify(this.cart));
  },

  loadWishlist: function() {
    const savedWishlist = localStorage.getItem('lumiere_wishlist');
    if (savedWishlist) {
      this.wishlist = JSON.parse(savedWishlist);
    }
  },

  saveWishlist: function() {
    localStorage.setItem('lumiere_wishlist', JSON.stringify(this.wishlist));
  },

  // ==========================================
  // Header
  // ==========================================
  initHeader: function() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  },

  // ==========================================
  // Search
  // ==========================================
  initSearch: function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchBtn || !searchOverlay) return;
    
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput.focus(), 300);
      this.renderSearchSuggestions();
    });
    
    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
    });
    
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `pages/category.html?search=${encodeURIComponent(query)}`;
      }
    });

    // Live search suggestions
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      this.renderSearchSuggestions(query);
    });
  },

  renderSearchSuggestions: function(query = '') {
    const container = document.getElementById('searchSuggestions');
    if (!container) return;

    if (query.length > 1) {
      const results = searchProducts(query).slice(0, 5);
      if (results.length > 0) {
        container.innerHTML = `
          <h4>Products</h4>
          <div class="search-results">
            ${results.map(p => `
              <a href="pages/product.html?id=${p.id}" class="search-result-item">
                <span class="result-name">${p.name}</span>
                <span class="result-price">${formatPrice(p.price)}</span>
              </a>
            `).join('')}
          </div>
        `;
      } else {
        container.innerHTML = '<p style="color: var(--color-text-muted);">No products found</p>';
      }
    } else {
      container.innerHTML = `
        <h4>Popular Searches</h4>
        <a href="pages/category.html?category=silver&subcategory=mens-kade">Mens Kade</a>
        <a href="pages/category.html?category=moissanite">Moissanite</a>
        <a href="pages/category.html?category=silver&subcategory=van-cleef-set">Van Cleef</a>
        <a href="pages/category.html?category=gold-plated">Gold Plated</a>
        <a href="pages/category.html?category=silver&subcategory=ladies-rings">Ladies Rings</a>
      `;
    }
  },

  // ==========================================
  // Mobile Navigation
  // ==========================================
  initMobileNav: function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const closeMobileNav = document.getElementById('closeMobileNav');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (!mobileMenuToggle || !mobileNav) return;
    
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      cartOverlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    closeMobileNav.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
    
    cartOverlay.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      this.closeCart();
    });
  },

  initAccordion: function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
      });
    });
  },

  // ==========================================
  // Cart
  // ==========================================
  initCart: function() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const continueShopping = document.getElementById('continueShopping');
    
    if (!cartBtn || !cartSidebar) return;
    
    cartBtn.addEventListener('click', () => {
      this.openCart();
    });
    
    closeCart.addEventListener('click', () => {
      this.closeCart();
    });
    
    if (continueShopping) {
      continueShopping.addEventListener('click', () => {
        this.closeCart();
      });
    }
  },

  openCart: function() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.classList.add('cart-open');
    
    this.renderCart();
  },

  closeCart: function() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.classList.remove('cart-open');
  },

  addToCart: function(productId, size = null, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = this.cart.find(item => 
      item.id === productId && item.size === size
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        size: size || product.sizes[0],
        quantity: quantity,
        image: product.images[0]
      });
    }
    
    this.saveCart();
    this.updateCartCount();
    this.renderCart();
    this.showToast('Item added to cart');
    this.openCart();
  },

  removeFromCart: function(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.updateCartCount();
    this.renderCart();
  },

  updateCartQuantity: function(index, change) {
    const item = this.cart[index];
    item.quantity += change;
    
    if (item.quantity <= 0) {
      this.removeFromCart(index);
    } else {
      this.saveCart();
      this.renderCart();
    }
  },

  updateCartCount: function() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    countElements.forEach(el => {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
  },

  getCartTotal: function() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  renderCart: function() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.querySelector('.cart-footer');
    const subtotalAmount = document.getElementById('subtotalAmount');
    
    if (!cartItems) return;
    
    if (this.cart.length === 0) {
      cartItems.style.display = 'none';
      cartFooter.style.display = 'none';
      cartEmpty.classList.add('show');
      return;
    }
    
    cartItems.style.display = 'block';
    cartFooter.style.display = 'block';
    cartEmpty.classList.remove('show');
    
    cartItems.innerHTML = this.cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-image">
          <i class="fas fa-${item.image}"></i>
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-variant">Size: ${item.size}</p>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-actions">
            <div class="quantity-selector">
              <button onclick="App.updateCartQuantity(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="App.updateCartQuantity(${index}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="App.removeFromCart(${index})">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
    
    subtotalAmount.textContent = formatPrice(this.getCartTotal());
  },

  // ==========================================
  // Wishlist
  // ==========================================
  toggleWishlist: function(productId) {
    const index = this.wishlist.indexOf(productId);
    
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast('Removed from wishlist');
    } else {
      this.wishlist.push(productId);
      this.showToast('Added to wishlist');
    }
    
    this.saveWishlist();
    this.updateWishlistCount();
  },

  isInWishlist: function(productId) {
    return this.wishlist.includes(productId);
  },

  updateWishlistCount: function() {
    const countElements = document.querySelectorAll('.wishlist-count');
    const totalItems = this.wishlist.length;
    
    countElements.forEach(el => {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
  },

  // ==========================================
  // Hero Slider
  // ==========================================
  initHeroSlider: function() {
    const slider = document.getElementById('heroSlider');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    const dots = document.querySelectorAll('#heroDots .dot');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let autoplayInterval;
    
    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };
    
    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);
    
    const startAutoplay = () => {
      autoplayInterval = setInterval(nextSlide, 5000);
    };
    
    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
      stopAutoplay();
      prevSlide();
      startAutoplay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
      stopAutoplay();
      nextSlide();
      startAutoplay();
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        showSlide(index);
        startAutoplay();
      });
    });
    
    startAutoplay();
  },

  // ==========================================
  // Product Sliders
  // ==========================================
  initProductSliders: function() {
    const sliders = [
      { container: 'newArrivalsSlider', prev: 'newArrivalsPrev', next: 'newArrivalsNext' }
    ];
    
    sliders.forEach(({ container, prev, next }) => {
      const slider = document.getElementById(container);
      const prevBtn = document.getElementById(prev);
      const nextBtn = document.getElementById(next);
      
      if (!slider) return;
      
      const scrollAmount = 300;
      
      if (prevBtn) prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      
      if (nextBtn) nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    });
  },

  // ==========================================
  // Render Products
  // ==========================================
  createProductCard: function(product) {
    const badgeHTML = product.badge ? `
      <span class="product-badge ${product.badge}">${product.badge === 'new' ? 'New' : product.badge === 'sale' ? 'Sale' : 'Bestseller'}</span>
    ` : '';
    
    const originalPriceHTML = product.originalPrice ? `
      <span class="original-price">${formatPrice(product.originalPrice)}</span>
    ` : '';
    
    const categoryLabel = CATEGORIES[product.category]?.name || product.category;
    const heartClass = this.isInWishlist(product.id) ? 'fas' : 'far';
    
    // Determine placeholder style based on category
    let placeholderClass = 'silver';
    if (product.category === 'gold-plated') placeholderClass = 'gold';
    if (product.category === 'moissanite') placeholderClass = 'moissanite';
    
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <div class="product-image-placeholder ${placeholderClass}">
            <i class="fas fa-${product.images[0]}"></i>
            <span>${product.category}</span>
          </div>
          <div class="product-badges">
            ${badgeHTML}
          </div>
          <div class="product-actions">
            <button class="product-action-btn" onclick="App.openQuickView('${product.id}')">
              <i class="fas fa-eye"></i> Quick View
            </button>
            <button class="product-action-btn icon-only" onclick="App.toggleWishlist('${product.id}')" title="Add to Wishlist">
              <i class="${heartClass} fa-heart"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${categoryLabel}</span>
          <h3 class="product-name">
            <a href="pages/product.html?id=${product.id}">${product.name}</a>
          </h3>
          <div class="product-price">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${originalPriceHTML}
          </div>
        </div>
      </div>
    `;
  },

  renderFeaturedProducts: function() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featured = getFeaturedProducts().slice(0, 8);
    container.innerHTML = featured.map(p => this.createProductCard(p)).join('');
  },

  renderNewArrivals: function() {
    const container = document.getElementById('newArrivalsSlider');
    if (!container) return;
    
    const newProducts = getNewArrivals();
    container.innerHTML = newProducts.map(p => this.createProductCard(p)).join('');
  },

  // ==========================================
  // Quick View
  // ==========================================
  initQuickView: function() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.getElementById('closeQuickView');
    
    if (!modal || !closeBtn) return;
    
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });
  },

  openQuickView: function(productId) {
    const modal = document.getElementById('quickViewModal');
    const container = document.getElementById('quickViewContainer');
    const product = getProductById(productId);
    
    if (!modal || !container || !product) return;
    
    const categoryLabel = CATEGORIES[product.category]?.name || product.category;
    const originalPriceHTML = product.originalPrice ? `
      <span class="original-price">${formatPrice(product.originalPrice)}</span>
    ` : '';
    
    // Determine placeholder style
    let placeholderClass = '';
    if (product.category === 'gold-plated') placeholderClass = 'gold';
    if (product.category === 'moissanite') placeholderClass = 'moissanite';
    
    container.innerHTML = `
      <div class="quick-view-gallery">
        <div class="quick-view-main-image ${placeholderClass}">
          <i class="fas fa-${product.images[0]}"></i>
        </div>
        <div class="quick-view-thumbnails">
          ${product.images.map((img, i) => `
            <div class="quick-view-thumb ${i === 0 ? 'active' : ''}" data-image="${img}">
              <i class="fas fa-${img}"></i>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="quick-view-details">
        <span class="quick-view-category">${categoryLabel}</span>
        <h2 class="quick-view-title">${product.name}</h2>
        <div class="quick-view-price">
          <span class="current-price">${formatPrice(product.price)}</span>
          ${originalPriceHTML}
        </div>
        <p class="quick-view-description">${product.description}</p>
        
        <div class="quick-view-options">
          <div class="option-label">Size</div>
          <div class="size-options">
            ${product.sizes.map((size, i) => `
              <button class="size-option ${i === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
            `).join('')}
          </div>
        </div>
        
        <div class="quick-view-quantity">
          <span class="option-label">Quantity</span>
          <div class="quantity-selector">
            <button onclick="App.quickViewQuantity(-1)">-</button>
            <span id="quickViewQty">1</span>
            <button onclick="App.quickViewQuantity(1)">+</button>
          </div>
        </div>
        
        <div class="quick-view-actions">
          <button class="btn btn-primary" onclick="App.addToCartFromQuickView('${product.id}')">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <a href="pages/product.html?id=${product.id}" class="btn btn-outline">View Details</a>
        </div>
      </div>
    `;
    
    // Size selection
    container.querySelectorAll('.size-option').forEach(btn => {
      btn.addEventListener('click', function() {
        container.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Thumbnail selection
    container.querySelectorAll('.quick-view-thumb').forEach(thumb => {
      thumb.addEventListener('click', function() {
        container.querySelectorAll('.quick-view-thumb').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const icon = this.dataset.image;
        container.querySelector('.quick-view-main-image i').className = `fas fa-${icon}`;
      });
    });
    
    modal.classList.add('active');
  },

  quickViewQuantity: function(change) {
    const qtyEl = document.getElementById('quickViewQty');
    if (!qtyEl) return;
    
    let qty = parseInt(qtyEl.textContent) + change;
    if (qty < 1) qty = 1;
    if (qty > 10) qty = 10;
    qtyEl.textContent = qty;
  },

  addToCartFromQuickView: function(productId) {
    const modal = document.getElementById('quickViewModal');
    const qtyEl = document.getElementById('quickViewQty');
    const activeSize = modal.querySelector('.size-option.active');
    
    const quantity = parseInt(qtyEl?.textContent || '1');
    const size = activeSize?.dataset.size || null;
    
    this.addToCart(productId, size, quantity);
    modal.classList.remove('active');
  },

  // ==========================================
  // Newsletter
  // ==========================================
  initNewsletter: function() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      
      // Simulate subscription
      this.showToast('Thank you for subscribing!');
      form.reset();
    });
  },

  // ==========================================
  // Toast Notification
  // ==========================================
  showToast: function(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
};

// ==========================================
// Category Page Functions
// ==========================================
const CategoryPage = {
  products: [],
  filteredProducts: [],
  currentFilters: {
    category: null,
    subcategory: null,
    sort: 'featured',
    minPrice: null,
    maxPrice: null
  },

  init: function() {
    this.parseURLParams();
    this.loadProducts();
    this.initFilters();
    this.renderProducts();
  },

  parseURLParams: function() {
    const params = new URLSearchParams(window.location.search);
    this.currentFilters.category = params.get('category');
    this.currentFilters.subcategory = params.get('subcategory');
    
    const searchQuery = params.get('search');
    if (searchQuery) {
      this.products = searchProducts(searchQuery);
      this.updatePageTitle(`Search Results: ${searchQuery}`);
    }
  },

  loadProducts: function() {
    if (this.products.length > 0) return; // Already loaded from search
    
    if (this.currentFilters.subcategory) {
      this.products = getProductsBySubcategory(this.currentFilters.subcategory);
      const subcat = SUBCATEGORIES[this.currentFilters.subcategory];
      if (subcat) this.updatePageTitle(subcat.name);
    } else if (this.currentFilters.category) {
      this.products = getProductsByCategory(this.currentFilters.category);
      const cat = CATEGORIES[this.currentFilters.category];
      if (cat) this.updatePageTitle(cat.name);
    } else {
      this.products = [...PRODUCTS];
      this.updatePageTitle('All Products');
    }
    
    this.filteredProducts = [...this.products];
  },

  updatePageTitle: function(title) {
    const titleEl = document.querySelector('.page-title');
    if (titleEl) titleEl.textContent = title;
    document.title = `${title} | Lumière Jewels`;
  },

  initFilters: function() {
    const sortSelect = document.getElementById('sortSelect');
    const filterTags = document.querySelectorAll('.filter-tag');
    
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentFilters.sort = e.target.value;
        this.applyFilters();
      });
    }
    
    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        this.applyFilters();
      });
    });
  },

  applyFilters: function() {
    this.filteredProducts = sortProducts(this.products, this.currentFilters.sort);
    this.renderProducts();
  },

  renderProducts: function() {
    const container = document.getElementById('categoryProducts');
    const countEl = document.getElementById('resultsCount');
    
    if (!container) return;
    
    if (countEl) {
      countEl.textContent = `${this.filteredProducts.length} products`;
    }
    
    if (this.filteredProducts.length === 0) {
      container.innerHTML = `
        <div class="no-products">
          <i class="fas fa-search"></i>
          <h3>No products found</h3>
          <p>Try adjusting your filters or browse our categories</p>
          <a href="category.html" class="btn btn-primary">View All Products</a>
        </div>
      `;
      return;
    }
    
    container.innerHTML = this.filteredProducts.map(p => App.createProductCard(p)).join('');
  }
};

// ==========================================
// Product Page Functions
// ==========================================
const ProductPage = {
  product: null,
  selectedSize: null,
  quantity: 1,

  init: function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (!productId) {
      window.location.href = 'category.html';
      return;
    }
    
    this.product = getProductById(productId);
    
    if (!this.product) {
      window.location.href = 'category.html';
      return;
    }
    
    this.selectedSize = this.product.sizes[0];
    this.renderProduct();
    this.initGallery();
    this.initOptions();
    this.renderRelatedProducts();
  },

  renderProduct: function() {
    const container = document.getElementById('productContainer');
    if (!container) return;
    
    const categoryLabel = CATEGORIES[this.product.category]?.name || this.product.category;
    const subcatLabel = SUBCATEGORIES[this.product.subcategory]?.name || this.product.subcategory;
    
    const originalPriceHTML = this.product.originalPrice ? `
      <span class="original-price">${formatPrice(this.product.originalPrice)}</span>
    ` : '';
    
    // Update page title
    document.title = `${this.product.name} | Lumière Jewels`;
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <a href="../index.html">Home</a>
        <i class="fas fa-chevron-right"></i>
        <a href="category.html?category=${this.product.category}">${categoryLabel}</a>
        <i class="fas fa-chevron-right"></i>
        <span>${this.product.name}</span>
      `;
    }
    
    // Determine placeholder style
    let placeholderClass = '';
    if (this.product.category === 'gold-plated') placeholderClass = 'gold';
    if (this.product.category === 'moissanite') placeholderClass = 'moissanite';
    
    container.innerHTML = `
      <div class="product-layout">
        <div class="product-gallery">
          <div class="main-image ${placeholderClass}" id="mainImage">
            <i class="fas fa-${this.product.images[0]}"></i>
          </div>
          <div class="thumbnail-gallery">
            ${this.product.images.map((img, i) => `
              <div class="thumbnail ${i === 0 ? 'active' : ''}" data-image="${img}">
                <i class="fas fa-${img}"></i>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="product-details">
          <span class="product-category">${categoryLabel} / ${subcatLabel}</span>
          <h1 class="product-name">${this.product.name}</h1>
          
          <div class="product-rating">
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <span class="rating-count">(24 reviews)</span>
          </div>
          
          <div class="product-price">
            <span class="current-price">${formatPrice(this.product.price)}</span>
            ${originalPriceHTML}
          </div>
          
          <p class="product-description">${this.product.description}</p>
          
          <div class="product-options">
            <div class="option-label">Size: <strong id="selectedSizeLabel">${this.selectedSize}</strong></div>
            <div class="size-options">
              ${this.product.sizes.map((size, i) => `
                <button class="size-option ${i === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
              `).join('')}
            </div>
          </div>
          
          <div class="product-quantity">
            <span class="option-label">Quantity</span>
            <div class="quantity-selector">
              <button onclick="ProductPage.updateQuantity(-1)">-</button>
              <span id="productQty">1</span>
              <button onclick="ProductPage.updateQuantity(1)">+</button>
            </div>
          </div>
          
          <div class="product-actions-main">
            <button class="btn btn-primary" onclick="ProductPage.addToCart()">
              <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
            <button class="btn btn-outline" onclick="App.toggleWishlist('${this.product.id}')">
              <i class="${App.isInWishlist(this.product.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
          </div>
          
          <div class="product-meta">
            <div class="meta-item">
              <span>SKU:</span>
              <span>${this.product.id}</span>
            </div>
            <div class="meta-item">
              <span>Category:</span>
              <span>${categoryLabel}</span>
            </div>
            <div class="meta-item">
              <span>Features:</span>
              <span>${this.product.features.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initGallery: function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const icon = this.dataset.image;
        mainImage.querySelector('i').className = `fas fa-${icon}`;
      });
    });
  },

  initOptions: function() {
    const sizeOptions = document.querySelectorAll('.size-option');
    const sizeLabel = document.getElementById('selectedSizeLabel');
    
    sizeOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeOptions.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedSize = btn.dataset.size;
        if (sizeLabel) sizeLabel.textContent = this.selectedSize;
      });
    });
  },

  updateQuantity: function(change) {
    this.quantity += change;
    if (this.quantity < 1) this.quantity = 1;
    if (this.quantity > 10) this.quantity = 10;
    
    const qtyEl = document.getElementById('productQty');
    if (qtyEl) qtyEl.textContent = this.quantity;
  },

  addToCart: function() {
    App.addToCart(this.product.id, this.selectedSize, this.quantity);
  },

  renderRelatedProducts: function() {
    const container = document.getElementById('relatedProducts');
    if (!container) return;
    
    const related = getProductsByCategory(this.product.category)
      .filter(p => p.id !== this.product.id)
      .slice(0, 4);
    
    container.innerHTML = related.map(p => App.createProductCard(p)).join('');
  }
};

// ==========================================
// Checkout Page Functions
// ==========================================
const CheckoutPage = {
  init: function() {
    App.loadCart();
    this.renderOrderSummary();
    this.initForm();
  },

  renderOrderSummary: function() {
    const itemsContainer = document.getElementById('orderItems');
    const subtotalEl = document.getElementById('orderSubtotal');
    const shippingEl = document.getElementById('orderShipping');
    const totalEl = document.getElementById('orderTotal');
    
    if (!itemsContainer) return;
    
    if (App.cart.length === 0) {
      window.location.href = '../index.html';
      return;
    }
    
    itemsContainer.innerHTML = App.cart.map(item => `
      <div class="order-item">
        <div class="order-item-image">
          <i class="fas fa-${item.image}"></i>
        </div>
        <div class="order-item-details">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-variant">Size: ${item.size} × ${item.quantity}</div>
        </div>
        <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
      </div>
    `).join('');
    
    const subtotal = App.getCartTotal();
    const shipping = subtotal >= 2999 ? 0 : 99;
    const total = subtotal + shipping;
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);
  },

  initForm: function() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate order processing
      App.showToast('Order placed successfully!');
      App.cart = [];
      App.saveCart();
      
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 2000);
    });
  }
};
