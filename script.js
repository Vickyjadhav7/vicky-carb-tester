// ===================================
// Product Data
// ===================================
const products = [
    // Silver Jewellery
    { id: 1, name: "Kids Silver Kade", category: "silver", type: "kids-kade", price: 45.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.5, reviews: 23, badge: "new", description: "Beautiful handcrafted silver kade perfect for kids. Made with pure 925 sterling silver." },
    { id: 2, name: "Ladies Silver Kade Set", category: "silver", type: "ladies-kade", price: 89.99, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500", rating: 5, reviews: 45, badge: "featured", description: "Elegant ladies kade and chudiyan set in sterling silver with intricate designs." },
    { id: 3, name: "Mens Silver Kade", category: "silver", type: "mens-kade", price: 79.99, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500", rating: 4.8, reviews: 34, description: "Bold and sophisticated mens silver kade with modern finish." },
    { id: 4, name: "Silver Hoop Earrings", category: "silver", type: "baliyan", price: 39.99, image: "https://images.unsplash.com/photo-1629394486011-c5bc2b447ca9?w=500", rating: 4.7, reviews: 67, badge: "sale", description: "Classic silver hoop earrings that complement any outfit." },
    { id: 5, name: "Ladies Silver Payal", category: "silver", type: "payal", price: 65.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500", rating: 4.6, reviews: 28, badge: "new", description: "Traditional silver anklets with delicate bells and detailed work." },
    { id: 6, name: "Mens Silver Bracelet", category: "silver", type: "mens-bracelet", price: 99.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.9, reviews: 52, description: "Heavy-duty silver bracelet with premium quality and unique design." },
    { id: 7, name: "Mens Silver Chain", category: "silver", type: "mens-chains", price: 129.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", rating: 4.8, reviews: 41, badge: "featured", description: "Thick silver chain perfect for everyday wear or special occasions." },
    { id: 8, name: "Mens Silver Ring", category: "silver", type: "mens-rings", price: 54.99, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500", rating: 4.5, reviews: 38, description: "Stylish mens silver ring with contemporary design elements." },
    { id: 9, name: "Ladies Silver Ring", category: "silver", type: "ladies-rings", price: 49.99, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500", rating: 4.7, reviews: 73, badge: "new", description: "Delicate ladies silver ring with elegant craftsmanship." },
    { id: 10, name: "Ladies Silver Bracelet", category: "silver", type: "ladies-bracelets", price: 69.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.8, reviews: 56, description: "Elegant silver bracelet featuring intricate patterns and smooth finish." },
    
    // Designer Inspired
    { id: 11, name: "Van Cleef Complete Set", category: "designer", type: "vancleef", price: 299.99, originalPrice: 399.99, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500", rating: 5, reviews: 89, badge: "featured", description: "Complete Van Cleef inspired set including bracelet, chain, and ring. Premium gold plating." },
    { id: 12, name: "Van Cleef Bracelet", category: "designer", type: "vancleef", price: 129.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.9, reviews: 67, description: "Iconic clover design bracelet inspired by Van Cleef & Arpels." },
    { id: 13, name: "Cartier Love Bracelet", category: "designer", type: "cartier", price: 159.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.8, reviews: 94, badge: "new", description: "Gold plated Cartier inspired love bracelet with screw motif." },
    { id: 14, name: "Van Cleef Necklace", category: "designer", type: "vancleef", price: 139.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", rating: 4.9, reviews: 71, description: "Elegant necklace featuring the iconic four-leaf clover design." },
    
    // Gold-Plated
    { id: 15, name: "Gold Plated Ladies Set", category: "gold-plated", type: "ladies-sets", price: 179.99, originalPrice: 229.99, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500", rating: 4.7, reviews: 48, badge: "sale", description: "Complete ladies jewelry set in stunning gold plating. Includes necklace, earrings, and bracelet." },
    { id: 16, name: "Gold Plated Bracelet Set", category: "gold-plated", type: "ladies-bracelet", price: 89.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.6, reviews: 52, description: "Set of three stackable gold plated bracelets with various designs." },
    { id: 17, name: "Gold Plated Chain Set", category: "gold-plated", type: "ladies-sets", price: 149.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", rating: 4.8, reviews: 39, badge: "new", description: "Delicate gold plated chain set with matching pendant." },
    { id: 18, name: "Gold Plated Bangle Set", category: "gold-plated", type: "ladies-bracelet", price: 119.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.7, reviews: 44, description: "Set of four elegant gold plated bangles with intricate patterns." },
    
    // Moissanite
    { id: 19, name: "Moissanite Cuban Chain", category: "moissanite", type: "cuban-chain", price: 399.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", rating: 5, reviews: 112, badge: "featured", description: "Stunning moissanite Cuban link chain that sparkles brilliantly. VVS quality stones." },
    { id: 20, name: "Moissanite Cuban Bracelet", category: "moissanite", type: "cuban-bracelet", price: 349.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.9, reviews: 98, badge: "featured", description: "Premium moissanite Cuban bracelet with exceptional fire and brilliance." },
    { id: 21, name: "Iced Cuban Chain", category: "moissanite", type: "cuban-chain", price: 449.99, originalPrice: 599.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", rating: 5, reviews: 87, badge: "sale", description: "Fully iced moissanite Cuban chain with premium setting and maximum shine." },
    { id: 22, name: "Mini Cuban Bracelet", category: "moissanite", type: "cuban-bracelet", price: 279.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", rating: 4.8, reviews: 65, badge: "new", description: "Sleek mini Cuban link moissanite bracelet perfect for layering." }
];

// ===================================
// Cart Management
// ===================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ===================================
// Product Rendering
// ===================================
function createProductCard(product) {
    const badgeHTML = product.badge ? `<span class="product-badge ${product.badge === 'sale' ? 'sale' : ''}">${product.badge}</span>` : '';
    const originalPriceHTML = product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
    
    return `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${badgeHTML}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.replace('-', ' ')}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${originalPriceHTML}
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function renderProducts(container, productsToRender) {
    if (!container) return;
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">No products found.</p>';
        return;
    }
    
    container.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
}

// ===================================
// Homepage
// ===================================
function initHomepage() {
    const featuredContainer = document.getElementById('featuredProducts');
    const newArrivalsContainer = document.getElementById('newArrivals');
    
    if (featuredContainer) {
        const featuredProducts = products.filter(p => p.badge === 'featured').slice(0, 4);
        renderProducts(featuredContainer, featuredProducts);
    }
    
    if (newArrivalsContainer) {
        const newProducts = products.filter(p => p.badge === 'new').slice(0, 4);
        renderProducts(newArrivalsContainer, newProducts);
    }
}

// ===================================
// Products Page
// ===================================
function initProductsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const type = urlParams.get('type');
    
    let filteredProducts = [...products];
    
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (type) {
        filteredProducts = filteredProducts.filter(p => p.type === type);
    }
    
    const productsContainer = document.querySelector('.products-grid');
    const productsCount = document.querySelector('.products-count');
    const pageTitle = document.querySelector('.products-header h1');
    
    if (productsCount) {
        productsCount.textContent = `Showing ${filteredProducts.length} products`;
    }
    
    if (pageTitle) {
        if (type) {
            pageTitle.textContent = type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        } else if (category) {
            pageTitle.textContent = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
    }
    
    renderProducts(productsContainer, filteredProducts);
    
    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            let sortedProducts = [...filteredProducts];
            
            switch(sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    sortedProducts.sort((a, b) => b.rating - a.rating);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }
            
            renderProducts(productsContainer, sortedProducts);
        });
    }
    
    // Filter functionality
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            applyFilters();
        });
    });
    
    function applyFilters() {
        const selectedCategories = Array.from(document.querySelectorAll('.filter-option input[name="category"]:checked')).map(cb => cb.value);
        const minPrice = parseFloat(document.querySelector('input[name="min-price"]')?.value || 0);
        const maxPrice = parseFloat(document.querySelector('input[name="max-price"]')?.value || 999999);
        
        let filtered = [...products];
        
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }
        
        filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
        
        if (productsCount) {
            productsCount.textContent = `Showing ${filtered.length} products`;
        }
        
        renderProducts(productsContainer, filtered);
    }
}

// ===================================
// Product Detail Page
// ===================================
function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.querySelector('.product-detail').innerHTML = '<div class="container"><h2>Product not found</h2></div>';
        return;
    }
    
    document.title = `${product.name} - Luxe Jewels`;
    
    // Render product details
    const detailContainer = document.querySelector('.product-detail-grid');
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}" id="mainImage">
                </div>
                <div class="thumbnail-gallery">
                    <div class="thumbnail active" onclick="changeMainImage('${product.image}', this)">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="thumbnail" onclick="changeMainImage('${product.image}', this)">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="thumbnail" onclick="changeMainImage('${product.image}', this)">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="thumbnail" onclick="changeMainImage('${product.image}', this)">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                </div>
            </div>
            <div class="product-detail-info">
                <div class="product-category">${product.category.replace('-', ' ')}</div>
                <h1>${product.name}</h1>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <div class="product-meta-item">
                        <strong>Category:</strong>
                        <span>${product.category.replace('-', ' ')}</span>
                    </div>
                    <div class="product-meta-item">
                        <strong>Product Type:</strong>
                        <span>${product.type.replace('-', ' ')}</span>
                    </div>
                    <div class="product-meta-item">
                        <strong>Availability:</strong>
                        <span style="color: #27ae60;">In Stock</span>
                    </div>
                </div>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity()">-</button>
                        <input type="number" id="quantityInput" value="1" min="1" max="10">
                        <button onclick="increaseQuantity()">+</button>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCartFromDetail()">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="window.location.href='products.html'">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;
    }
}

function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    if (thumbnail) {
        thumbnail.classList.add('active');
    }
}

function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (input) {
        const current = parseInt(input.value);
        if (current < 10) {
            input.value = current + 1;
        }
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (input) {
        const current = parseInt(input.value);
        if (current > 1) {
            input.value = current - 1;
        }
    }
}

function addToCartFromDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const quantity = parseInt(document.getElementById('quantityInput').value);
    addToCart(productId, quantity);
}

// ===================================
// Cart Page
// ===================================
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartDiv = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');
    
    if (cart.length === 0) {
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }
    
    if (emptyCartDiv) emptyCartDiv.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="product-category">${item.category.replace('-', ' ')}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" readonly>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    const summaryHTML = `
        <h2>Order Summary</h2>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary" onclick="window.location.href='checkout.html'">
            Proceed to Checkout
        </button>
        <button class="btn btn-secondary" onclick="window.location.href='products.html'">
            Continue Shopping
        </button>
    `;
    
    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) {
        cartSummary.innerHTML = summaryHTML;
    }
}

// ===================================
// Checkout Page
// ===================================
function initCheckoutPage() {
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    const orderItemsContainer = document.querySelector('.order-items');
    if (orderItemsContainer) {
        orderItemsContainer.innerHTML = cart.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <p class="quantity">Qty: ${item.quantity}</p>
                </div>
                <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }
    
    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    const summaryHTML = `
        <h2>Order Summary</h2>
        <div class="order-items"></div>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button type="submit" form="checkoutForm" class="btn btn-primary">
            Place Order
        </button>
    `;
    
    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary) {
        orderSummary.innerHTML = summaryHTML;
        // Re-add order items
        const orderItemsContainer = orderSummary.querySelector('.order-items');
        if (orderItemsContainer) {
            orderItemsContainer.innerHTML = cart.map(item => `
                <div class="order-item">
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="order-item-details">
                        <h4>${item.name}</h4>
                        <p class="quantity">Qty: ${item.quantity}</p>
                    </div>
                    <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `).join('');
        }
    }
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Order placed successfully! Thank you for your purchase.', 'success');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
}

// ===================================
// Navigation & UI
// ===================================
function initNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('active');
        });
    }
    
    // Dropdown for mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.parentElement.classList.toggle('active');
            }
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for subscribing!', 'success');
            newsletterForm.reset();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// ===================================
// Notifications
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        backgroundColor: type === 'success' ? '#27ae60' : '#3498db',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initNavigation();
    
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        initHomepage();
    } else if (path.includes('products.html')) {
        initProductsPage();
    } else if (path.includes('product-detail.html')) {
        initProductDetailPage();
    } else if (path.includes('cart.html')) {
        renderCart();
    } else if (path.includes('checkout.html')) {
        initCheckoutPage();
    }
});
