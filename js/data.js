// Product Data
const products = [
  // Silver Jewellery
  {
    id: 1,
    name: "Kids Kade - Silver",
    category: "silver",
    subcategory: "kids-kade",
    price: 29.99,
    image: "💍",
    description: "Beautiful silver kade designed for kids, perfect for special occasions.",
    featured: true,
    newArrival: false
  },
  {
    id: 2,
    name: "Ladies Kade & Chudiyan Set",
    category: "silver",
    subcategory: "ladies-kade-chudiyan",
    price: 89.99,
    image: "💎",
    description: "Elegant matching set of kade and chudiyan for ladies, crafted in premium silver.",
    featured: true,
    newArrival: true
  },
  {
    id: 3,
    name: "Mens Kade - Silver",
    category: "silver",
    subcategory: "mens-kade",
    price: 79.99,
    image: "👔",
    description: "Classic silver kade for men, timeless design and superior craftsmanship.",
    featured: false,
    newArrival: false
  },
  {
    id: 4,
    name: "Baliyan (Hoops) - Silver",
    category: "silver",
    subcategory: "baliyan",
    price: 39.99,
    image: "⭕",
    description: "Stylish silver hoops, perfect for everyday wear or special occasions.",
    featured: false,
    newArrival: true
  },
  {
    id: 5,
    name: "Kids Payal (Anklets)",
    category: "silver",
    subcategory: "payal-kids",
    price: 24.99,
    image: "🔔",
    description: "Adorable silver anklets for kids, comfortable and beautifully designed.",
    featured: false,
    newArrival: false
  },
  {
    id: 6,
    name: "Ladies Payal (Anklets)",
    category: "silver",
    subcategory: "payal-ladies",
    price: 49.99,
    image: "✨",
    description: "Elegant silver anklets for ladies, featuring intricate designs.",
    featured: true,
    newArrival: false
  },
  {
    id: 7,
    name: "Mens Bracelet - Silver",
    category: "silver",
    subcategory: "mens-bracelet",
    price: 69.99,
    image: "🔗",
    description: "Sophisticated silver bracelet for men, bold and modern design.",
    featured: false,
    newArrival: false
  },
  {
    id: 8,
    name: "Mens Chain - Silver",
    category: "silver",
    subcategory: "mens-chains",
    price: 99.99,
    image: "⛓️",
    description: "Premium silver chain for men, strong and elegant.",
    featured: false,
    newArrival: true
  },
  {
    id: 9,
    name: "Mens Ring - Silver",
    category: "silver",
    subcategory: "mens-rings",
    price: 59.99,
    image: "💍",
    description: "Classic silver ring for men, available in various sizes.",
    featured: false,
    newArrival: false
  },
  {
    id: 10,
    name: "Ladies Ring - Silver",
    category: "silver",
    subcategory: "ladies-rings",
    price: 54.99,
    image: "💎",
    description: "Beautiful silver ring for ladies, delicate and elegant.",
    featured: true,
    newArrival: false
  },
  {
    id: 11,
    name: "Ladies Bracelet - Silver",
    category: "silver",
    subcategory: "ladies-bracelets",
    price: 64.99,
    image: "✨",
    description: "Charming silver bracelet for ladies, perfect for any occasion.",
    featured: false,
    newArrival: false
  },
  {
    id: 12,
    name: "Designer Inspired Set",
    category: "silver",
    subcategory: "designer-inspired",
    price: 149.99,
    image: "👑",
    description: "Exquisite designer-inspired silver set, featuring bracelet, chain, and ring.",
    featured: true,
    newArrival: true
  },
  {
    id: 13,
    name: "Van Cleef Set - Bracelet",
    category: "silver",
    subcategory: "van-cleef",
    price: 199.99,
    image: "💫",
    description: "Luxurious Van Cleef inspired bracelet in premium silver.",
    featured: true,
    newArrival: false
  },
  {
    id: 14,
    name: "Van Cleef Set - Chain",
    category: "silver",
    subcategory: "van-cleef",
    price: 219.99,
    image: "🌟",
    description: "Elegant Van Cleef inspired chain, statement piece.",
    featured: false,
    newArrival: false
  },
  {
    id: 15,
    name: "Van Cleef Set - Ring",
    category: "silver",
    subcategory: "van-cleef",
    price: 189.99,
    image: "💍",
    description: "Sophisticated Van Cleef inspired ring, timeless elegance.",
    featured: false,
    newArrival: true
  },
  {
    id: 16,
    name: "Gold Plated Cartier Bracelet",
    category: "silver",
    subcategory: "cartier",
    price: 249.99,
    image: "👑",
    description: "Stunning gold-plated Cartier inspired bracelet, luxury design.",
    featured: true,
    newArrival: true
  },
  
  // Gold-Plated Jewellery
  {
    id: 17,
    name: "Ladies Set - Gold Plated",
    category: "gold-plated",
    subcategory: "ladies-sets",
    price: 179.99,
    image: "✨",
    description: "Complete gold-plated set for ladies, includes necklace, earrings, and bracelet.",
    featured: true,
    newArrival: false
  },
  {
    id: 18,
    name: "Ladies Bracelet - Gold Plated",
    category: "gold-plated",
    subcategory: "ladies-bracelet",
    price: 89.99,
    image: "💎",
    description: "Elegant gold-plated bracelet for ladies, premium finish.",
    featured: false,
    newArrival: true
  },
  {
    id: 19,
    name: "Gold Plated Necklace Set",
    category: "gold-plated",
    subcategory: "ladies-sets",
    price: 159.99,
    image: "👑",
    description: "Luxurious gold-plated necklace set with matching earrings.",
    featured: true,
    newArrival: false
  },
  {
    id: 20,
    name: "Gold Plated Earrings",
    category: "gold-plated",
    subcategory: "ladies-bracelet",
    price: 69.99,
    image: "💫",
    description: "Beautiful gold-plated earrings, perfect for special occasions.",
    featured: false,
    newArrival: false
  },
  
  // Moissanite Jewellery
  {
    id: 21,
    name: "Cuban Chain - Moissanite",
    category: "moissanite",
    subcategory: "cuban-chain",
    price: 399.99,
    image: "💎",
    description: "Stunning moissanite Cuban chain, brilliant and eye-catching.",
    featured: true,
    newArrival: true
  },
  {
    id: 22,
    name: "Cuban Bracelet - Moissanite",
    category: "moissanite",
    subcategory: "cuban-bracelet",
    price: 349.99,
    image: "✨",
    description: "Elegant moissanite Cuban bracelet, premium quality stones.",
    featured: true,
    newArrival: false
  },
  {
    id: 23,
    name: "Moissanite Ring Set",
    category: "moissanite",
    subcategory: "cuban-chain",
    price: 449.99,
    image: "👑",
    description: "Luxurious moissanite ring set, featuring brilliant stones.",
    featured: false,
    newArrival: true
  },
  {
    id: 24,
    name: "Moissanite Pendant",
    category: "moissanite",
    subcategory: "cuban-bracelet",
    price: 299.99,
    image: "💫",
    description: "Beautiful moissanite pendant, perfect centerpiece for any necklace.",
    featured: false,
    newArrival: false
  }
];

// Category mapping
const categories = {
  'silver': 'Silver Jewellery',
  'gold-plated': 'Gold-Plated Jewellery',
  'moissanite': 'Moissanite Jewellery'
};

// Subcategory mapping for Silver
const silverSubcategories = {
  'kids-kade': 'Kids Kade',
  'ladies-kade-chudiyan': 'Ladies Kade & Chudiyan',
  'mens-kade': 'Mens Kade',
  'baliyan': 'Baliyan (Hoops)',
  'payal-kids': 'Payal (Anklets) - Kids',
  'payal-ladies': 'Payal (Anklets) - Ladies',
  'mens-bracelet': 'Mens Bracelet',
  'mens-chains': 'Mens Chains',
  'mens-rings': 'Mens Rings',
  'ladies-rings': 'Ladies Rings',
  'ladies-bracelets': 'Ladies Bracelets',
  'designer-inspired': 'Designer Inspired',
  'van-cleef': 'Van Cleef Set',
  'cartier': 'Gold Plated Cartier Bracelet'
};

// Subcategory mapping for Gold-Plated
const goldPlatedSubcategories = {
  'ladies-sets': 'Ladies Sets',
  'ladies-bracelet': 'Ladies Bracelet'
};

// Subcategory mapping for Moissanite
const moissaniteSubcategories = {
  'cuban-chain': 'Cuban Chain',
  'cuban-bracelet': 'Cuban Bracelet'
};

// Get all subcategories for a category
function getSubcategories(category) {
  switch(category) {
    case 'silver':
      return silverSubcategories;
    case 'gold-plated':
      return goldPlatedSubcategories;
    case 'moissanite':
      return moissaniteSubcategories;
    default:
      return {};
  }
}

// Get product by ID
function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
  if (!category) return products;
  return products.filter(p => p.category === category);
}

// Get products by subcategory
function getProductsBySubcategory(category, subcategory) {
  const categoryProducts = getProductsByCategory(category);
  if (!subcategory) return categoryProducts;
  return categoryProducts.filter(p => p.subcategory === subcategory);
}

// Get featured products
function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

// Get new arrivals
function getNewArrivals() {
  return products.filter(p => p.newArrival);
}

// Search products
function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.subcategory.toLowerCase().includes(lowerQuery)
  );
}
