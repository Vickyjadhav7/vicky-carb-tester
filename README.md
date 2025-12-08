# Lumière Jewels - E-Commerce Website

A clean, mobile-responsive e-commerce website for a silver, gold-plated, and moissanite jewellery business.

![Lumière Jewels](https://img.shields.io/badge/Lumière-Jewels-gold)

## ✨ Features

### Homepage
- **Hero Slider** - Auto-rotating showcase with 3 slides featuring different collections
- **Featured Products** - Curated selection of top products
- **New Arrivals** - Horizontal scrollable slider of latest products
- **Shop by Category** - Quick access to Silver, Gold-Plated, and Moissanite collections
- **Designer Inspired** - Highlight section for Van Cleef and Cartier inspired pieces
- **Subcategories Grid** - Visual navigation to all product types
- **Customer Testimonials** - Reviews from satisfied customers
- **Instagram Feed** - Social media integration
- **Newsletter Signup** - Email subscription with discount offer

### Product Categories

#### Silver Jewellery
- Kids Kade
- Ladies Kade & Chudiyan
- Mens Kade
- Baliyan (Hoops)
- Payal (Anklets) - Kids and Ladies
- Mens Bracelet
- Mens Chains
- Mens Rings
- Ladies Rings
- Ladies Bracelets
- Van Cleef Set (Bracelet, Chain, Ring)
- Gold Plated Cartier Bracelet

#### Gold-Plated Jewellery
- Ladies Sets
- Ladies Bracelet

#### Moissanite Jewellery
- Cuban Chain
- Cuban Bracelet

### Shopping Experience
- **Product Listing** - Grid view with filtering and sorting
- **Quick View Modal** - Preview products without leaving the page
- **Product Details** - Full product page with image gallery, size selection, quantity picker
- **Shopping Cart** - Slide-out cart sidebar with quantity management
- **Wishlist** - Save favorite items
- **Search** - Search products with live suggestions
- **Checkout** - Complete checkout flow with shipping and payment options

### Additional Pages
- **About Us** - Company story, mission, and values
- **Contact Us** - Contact form, business info, WhatsApp support, FAQ

## 🎨 Design Features

- **Elegant Typography** - Cormorant Garamond for headings, Montserrat for body
- **Neutral Color Palette** - Warm tones with gold, silver, and subtle pastels
- **Jewelry-Themed Icons** - Font Awesome icons throughout
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Mobile-First Design** - Fully responsive from 320px to 1400px+

## 📱 Mobile Features

- **Hamburger Menu** - Accordion-style navigation
- **Touch-Friendly** - Large tap targets and swipeable sliders
- **Optimized Layout** - Single-column layout on mobile
- **Fast Loading** - Minimal dependencies, optimized assets

## 🛠 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript** - Vanilla JS, no frameworks
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **LocalStorage** - Cart and wishlist persistence

## 📁 Project Structure

```
/
├── index.html              # Homepage
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── products.js         # Product data and helpers
│   └── app.js              # Main application logic
├── pages/
│   ├── category.html       # Product listing page
│   ├── product.html        # Product detail page
│   ├── about.html          # About Us page
│   ├── contact.html        # Contact page
│   └── checkout.html       # Checkout page
├── images/                 # Image assets (placeholder)
└── README.md               # This file
```

## 🚀 Getting Started

1. Clone or download the repository
2. Open `index.html` in a web browser
3. No build process or dependencies required!

### Local Development Server (Optional)

For the best development experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📋 Product Management

Products are defined in `js/products.js`. Each product has:

```javascript
{
  id: 'SKK001',              // Unique ID
  name: 'Product Name',      // Display name
  category: 'silver',        // Main category
  subcategory: 'kids-kade',  // Subcategory
  price: 1299,               // Current price
  originalPrice: 1599,       // Original price (for sales)
  description: '...',        // Product description
  features: ['...'],         // Array of features
  sizes: ['S', 'M', 'L'],    // Available sizes
  badge: 'new',              // Badge: new, sale, bestseller
  isNew: true,               // Show in New Arrivals
  isFeatured: true,          // Show in Featured
  images: ['gem', 'ring']    // Icon placeholders
}
```

## 🔧 Customization

### Colors
Edit CSS custom properties in `css/styles.css`:

```css
:root {
  --color-primary: #8b7355;
  --color-gold: #d4af37;
  --color-silver: #c0c0c0;
  /* ... more variables */
}
```

### Adding Products
Add new product objects to the `PRODUCTS` array in `js/products.js`.

### Social Media Links
Update social media URLs in the footer and mobile nav sections of each HTML file.

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (4-column grid)
- **Tablet**: 768px - 1024px (3-column grid)
- **Mobile Large**: 480px - 768px (2-column grid)
- **Mobile Small**: < 480px (1-2 column grid)

## 🌟 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## 📝 License

This project is created for demonstration purposes. Feel free to use and modify for your own projects.

## 🤝 Contact

For questions or customization requests, reach out through the contact page or social media links on the website.

---

Made with ❤️ for Lumière Jewels
