// Product Data
const products = [
  // Silver Jewellery - Kids Kade
  {
    id: 1,
    name: "Kids Silver Kade Set",
    category: "silver",
    type: "Kids Kade",
    price: 45.00,
    description: "Beautiful silver kade set designed especially for kids. Lightweight and comfortable, perfect for special occasions.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 2,
    name: "Kids Floral Kade",
    category: "silver",
    type: "Kids Kade",
    price: 38.00,
    description: "Delicate floral pattern silver kade for kids. Elegant and charming design.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Silver Jewellery - Ladies Kade & Chudiyan
  {
    id: 3,
    name: "Ladies Traditional Kade Set",
    category: "silver",
    type: "Ladies Kade & Chudiyan",
    price: 125.00,
    description: "Exquisite traditional silver kade set for ladies. Intricate designs that reflect timeless elegance.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 4,
    name: "Ladies Designer Chudiyan",
    category: "silver",
    type: "Ladies Kade & Chudiyan",
    price: 95.00,
    description: "Stylish silver chudiyan with modern design elements. Perfect for both traditional and contemporary looks.",
    images: [],
    featured: false,
    newArrival: true
  },
  {
    id: 5,
    name: "Ladies Antique Kade",
    category: "silver",
    type: "Ladies Kade & Chudiyan",
    price: 150.00,
    description: "Antique-inspired silver kade with intricate detailing. A statement piece for special occasions.",
    images: [],
    featured: true,
    newArrival: false
  },
  
  // Silver Jewellery - Mens Kade
  {
    id: 6,
    name: "Men's Classic Silver Kade",
    category: "silver",
    type: "Mens Kade",
    price: 110.00,
    description: "Classic silver kade for men. Bold and masculine design with excellent craftsmanship.",
    images: [],
    featured: false,
    newArrival: false
  },
  {
    id: 7,
    name: "Men's Designer Kade",
    category: "silver",
    type: "Mens Kade",
    price: 135.00,
    description: "Contemporary silver kade design for the modern gentleman. Sleek and sophisticated.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Silver Jewellery - Baliyan (Hoops)
  {
    id: 8,
    name: "Classic Silver Hoops",
    category: "silver",
    type: "Baliyan (Hoops)",
    price: 55.00,
    description: "Timeless silver hoop earrings. Versatile design that complements any outfit.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 9,
    name: "Designer Silver Hoops",
    category: "silver",
    type: "Baliyan (Hoops)",
    price: 75.00,
    description: "Elegant designer silver hoops with intricate patterns. A perfect blend of tradition and modernity.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Silver Jewellery - Payal (Anklets) - Kids
  {
    id: 10,
    name: "Kids Silver Payal",
    category: "silver",
    type: "Payal (Anklets) – Kids",
    price: 32.00,
    description: "Adorable silver payal for kids. Lightweight and comfortable for little feet.",
    images: [],
    featured: false,
    newArrival: false
  },
  
  // Silver Jewellery - Payal (Anklets) - Ladies
  {
    id: 11,
    name: "Ladies Traditional Payal",
    category: "silver",
    type: "Payal (Anklets) – Ladies",
    price: 65.00,
    description: "Traditional silver payal for ladies. Beautifully crafted with delicate patterns.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 12,
    name: "Ladies Designer Payal",
    category: "silver",
    type: "Payal (Anklets) – Ladies",
    price: 85.00,
    description: "Modern designer silver payal. Elegant and sophisticated design.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Silver Jewellery - Mens Bracelet
  {
    id: 13,
    name: "Men's Silver Bracelet",
    category: "silver",
    type: "Mens Bracelet",
    price: 95.00,
    description: "Sturdy silver bracelet for men. Classic design with excellent durability.",
    images: [],
    featured: false,
    newArrival: false
  },
  {
    id: 14,
    name: "Men's Link Bracelet",
    category: "silver",
    type: "Mens Bracelet",
    price: 120.00,
    description: "Contemporary link bracelet design. Perfect for the modern man.",
    images: [],
    featured: true,
    newArrival: false
  },
  
  // Silver Jewellery - Mens Chains
  {
    id: 15,
    name: "Men's Silver Chain",
    category: "silver",
    type: "Mens Chains",
    price: 140.00,
    description: "Classic silver chain for men. Versatile and timeless design.",
    images: [],
    featured: false,
    newArrival: false
  },
  {
    id: 16,
    name: "Men's Designer Chain",
    category: "silver",
    type: "Mens Chains",
    price: 175.00,
    description: "Elegant designer silver chain. A statement piece for any occasion.",
    images: [],
    featured: true,
    newArrival: true
  },
  
  // Silver Jewellery - Mens Rings
  {
    id: 17,
    name: "Men's Silver Ring",
    category: "silver",
    type: "Mens Rings",
    price: 60.00,
    description: "Classic silver ring for men. Simple yet elegant design.",
    images: [],
    featured: false,
    newArrival: false
  },
  {
    id: 18,
    name: "Men's Signet Ring",
    category: "silver",
    type: "Mens Rings",
    price: 85.00,
    description: "Traditional signet ring in silver. Bold and masculine design.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Silver Jewellery - Ladies Rings
  {
    id: 19,
    name: "Ladies Silver Ring",
    category: "silver",
    type: "Ladies Rings",
    price: 55.00,
    description: "Delicate silver ring for ladies. Elegant and feminine design.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 20,
    name: "Ladies Designer Ring",
    category: "silver",
    type: "Ladies Rings",
    price: 75.00,
    description: "Beautiful designer silver ring. Intricate patterns and modern elegance.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Silver Jewellery - Ladies Bracelets
  {
    id: 21,
    name: "Ladies Silver Bracelet",
    category: "silver",
    type: "Ladies Bracelets",
    price: 70.00,
    description: "Elegant silver bracelet for ladies. Delicate and sophisticated design.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 22,
    name: "Ladies Charm Bracelet",
    category: "silver",
    type: "Ladies Bracelets",
    price: 95.00,
    description: "Charming silver bracelet with decorative elements. Perfect for everyday wear.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Silver Jewellery - Designer Inspired - Van Cleef Set
  {
    id: 23,
    name: "Van Cleef Inspired Bracelet",
    category: "silver",
    type: "Van Cleef Set (Bracelet, Chain, Ring)",
    price: 250.00,
    description: "Designer-inspired silver bracelet. Elegant and luxurious design.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 24,
    name: "Van Cleef Inspired Chain",
    category: "silver",
    type: "Van Cleef Set (Bracelet, Chain, Ring)",
    price: 280.00,
    description: "Designer-inspired silver chain. Statement piece with intricate detailing.",
    images: [],
    featured: false,
    newArrival: false
  },
  {
    id: 25,
    name: "Van Cleef Inspired Ring",
    category: "silver",
    type: "Van Cleef Set (Bracelet, Chain, Ring)",
    price: 220.00,
    description: "Designer-inspired silver ring. Luxurious and elegant design.",
    images: [],
    featured: true,
    newArrival: true
  },
  
  // Silver Jewellery - Designer Inspired - Gold Plated Cartier Bracelet
  {
    id: 26,
    name: "Cartier Inspired Gold-Plated Bracelet",
    category: "silver",
    type: "Gold Plated Cartier Bracelet",
    price: 195.00,
    description: "Designer-inspired gold-plated bracelet. Elegant and sophisticated design inspired by Cartier.",
    images: [],
    featured: true,
    newArrival: false
  },
  
  // Gold-Plated Jewellery - Ladies Sets
  {
    id: 27,
    name: "Ladies Gold-Plated Set",
    category: "gold-plated",
    type: "Ladies Sets",
    price: 180.00,
    description: "Complete gold-plated jewelry set for ladies. Includes necklace, earrings, and bracelet.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 28,
    name: "Ladies Premium Gold-Plated Set",
    category: "gold-plated",
    type: "Ladies Sets",
    price: 250.00,
    description: "Premium gold-plated set with intricate designs. Perfect for special occasions.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Gold-Plated Jewellery - Ladies Bracelet
  {
    id: 29,
    name: "Ladies Gold-Plated Bracelet",
    category: "gold-plated",
    type: "Ladies Bracelet",
    price: 95.00,
    description: "Elegant gold-plated bracelet for ladies. Luxurious finish and comfortable wear.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 30,
    name: "Ladies Designer Gold-Plated Bracelet",
    category: "gold-plated",
    type: "Ladies Bracelet",
    price: 125.00,
    description: "Designer gold-plated bracelet with modern elements. A perfect statement piece.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Moissanite Jewellery - Cuban Chain
  {
    id: 31,
    name: "Moissanite Cuban Chain",
    category: "moissanite",
    type: "Cuban Chain",
    price: 450.00,
    description: "Stunning moissanite Cuban chain. Brilliant stones set in elegant design.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 32,
    name: "Premium Moissanite Cuban Chain",
    category: "moissanite",
    type: "Cuban Chain",
    price: 650.00,
    description: "Premium moissanite Cuban chain with larger stones. Maximum brilliance and elegance.",
    images: [],
    featured: false,
    newArrival: true
  },
  
  // Moissanite Jewellery - Cuban Bracelet
  {
    id: 33,
    name: "Moissanite Cuban Bracelet",
    category: "moissanite",
    type: "Cuban Bracelet",
    price: 380.00,
    description: "Beautiful moissanite Cuban bracelet. Sparkling stones in classic Cuban link design.",
    images: [],
    featured: true,
    newArrival: false
  },
  {
    id: 34,
    name: "Designer Moissanite Cuban Bracelet",
    category: "moissanite",
    type: "Cuban Bracelet",
    price: 520.00,
    description: "Designer moissanite Cuban bracelet with enhanced detailing. A luxurious statement piece.",
    images: [],
    featured: false,
    newArrival: true
  }
];

// Category mapping
const categories = {
  silver: "Silver Jewellery",
  "gold-plated": "Gold-Plated Jewellery",
  moissanite: "Moissanite Jewellery"
};

// Product types by category
const productTypes = {
  silver: [
    "Kids Kade",
    "Ladies Kade & Chudiyan",
    "Mens Kade",
    "Baliyan (Hoops)",
    "Payal (Anklets) – Kids",
    "Payal (Anklets) – Ladies",
    "Mens Bracelet",
    "Mens Chains",
    "Mens Rings",
    "Ladies Rings",
    "Ladies Bracelets",
    "Van Cleef Set (Bracelet, Chain, Ring)",
    "Gold Plated Cartier Bracelet"
  ],
  "gold-plated": [
    "Ladies Sets",
    "Ladies Bracelet"
  ],
  moissanite: [
    "Cuban Chain",
    "Cuban Bracelet"
  ]
};
