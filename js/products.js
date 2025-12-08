// ============================================
// LUMIÈRE JEWELS - Product Data
// ============================================

const PRODUCTS = [
  // ==========================================
  // SILVER JEWELLERY
  // ==========================================
  
  // Kids Kade
  {
    id: 'SKK001',
    name: 'Kids Silver Kade - Traditional Design',
    category: 'silver',
    subcategory: 'kids-kade',
    price: 1299,
    originalPrice: 1599,
    description: 'Beautiful traditional silver kade designed specially for kids. Made with 925 sterling silver with intricate hand-carved patterns. Perfect for festivals and special occasions.',
    features: ['925 Sterling Silver', 'Adjustable Size', 'Hypoallergenic', 'Tarnish Resistant'],
    sizes: ['Small', 'Medium'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['gem', 'ring', 'gem', 'ring']
  },
  {
    id: 'SKK002',
    name: 'Kids Silver Kade - Floral Pattern',
    category: 'silver',
    subcategory: 'kids-kade',
    price: 1499,
    originalPrice: null,
    description: 'Elegant floral pattern silver kade for children. Lightweight and comfortable for daily wear.',
    features: ['925 Sterling Silver', 'Lightweight Design', 'Safe Clasp', 'Gift Box Included'],
    sizes: ['Small', 'Medium'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['gem', 'ring']
  },
  
  // Ladies Kade & Chudiyan
  {
    id: 'SLK001',
    name: 'Ladies Silver Kade - Classic Bangle Set',
    category: 'silver',
    subcategory: 'ladies-kade',
    price: 3499,
    originalPrice: 4299,
    description: 'Set of 4 classic silver bangles with traditional motifs. Perfect blend of tradition and elegance.',
    features: ['925 Sterling Silver', 'Set of 4', 'Rhodium Plated', 'Anti-Tarnish Coating'],
    sizes: ['2.4', '2.6', '2.8', '2.10'],
    badge: 'sale',
    isNew: false,
    isFeatured: true,
    images: ['gem', 'ring', 'gem']
  },
  {
    id: 'SLK002',
    name: 'Ladies Silver Chudiyan - Oxidized Set',
    category: 'silver',
    subcategory: 'ladies-kade',
    price: 2799,
    originalPrice: null,
    description: 'Beautiful oxidized silver chudiyan set with intricate tribal patterns. Makes a bold fashion statement.',
    features: ['925 Sterling Silver', 'Set of 6', 'Oxidized Finish', 'Comfortable Fit'],
    sizes: ['2.4', '2.6', '2.8'],
    badge: null,
    isNew: true,
    isFeatured: false,
    images: ['gem', 'ring']
  },
  {
    id: 'SLK003',
    name: 'Ladies Silver Kade - Contemporary Design',
    category: 'silver',
    subcategory: 'ladies-kade',
    price: 4299,
    originalPrice: 5199,
    description: 'Modern contemporary silver kade with sleek lines and minimal design. Perfect for office and casual wear.',
    features: ['925 Sterling Silver', 'Mirror Finish', 'Scratch Resistant', 'Elegant Gift Box'],
    sizes: ['2.4', '2.6', '2.8', '2.10'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['gem', 'ring', 'gem', 'ring']
  },

  // Mens Kade
  {
    id: 'SMK001',
    name: 'Mens Silver Kade - Heavy Kada',
    category: 'silver',
    subcategory: 'mens-kade',
    price: 5999,
    originalPrice: 7499,
    description: 'Heavy weight silver kada for men with traditional Punjabi design. Symbol of strength and tradition.',
    features: ['925 Sterling Silver', 'Heavy Weight 50g', 'Adjustable', 'Lifetime Warranty'],
    sizes: ['Standard', 'Large', 'XL'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['gem', 'ring', 'gem']
  },
  {
    id: 'SMK002',
    name: 'Mens Silver Kade - Slim Profile',
    category: 'silver',
    subcategory: 'mens-kade',
    price: 3499,
    originalPrice: null,
    description: 'Sleek and modern slim profile silver kada for the contemporary man. Lightweight and comfortable.',
    features: ['925 Sterling Silver', 'Slim Design', 'Brushed Finish', 'Daily Wear'],
    sizes: ['Standard', 'Large'],
    badge: 'new',
    isNew: true,
    isFeatured: true,
    images: ['gem', 'ring']
  },
  {
    id: 'SMK003',
    name: 'Mens Silver Kade - Braided Design',
    category: 'silver',
    subcategory: 'mens-kade',
    price: 4799,
    originalPrice: 5599,
    description: 'Unique braided pattern silver kada. A perfect fusion of traditional craft with modern aesthetics.',
    features: ['925 Sterling Silver', 'Braided Pattern', 'Medium Weight', 'Secure Closure'],
    sizes: ['Standard', 'Large', 'XL'],
    badge: null,
    isNew: false,
    isFeatured: false,
    images: ['gem', 'ring', 'gem']
  },

  // Baliyan (Hoops)
  {
    id: 'SB001',
    name: 'Silver Baliyan - Classic Hoops',
    category: 'silver',
    subcategory: 'baliyan',
    price: 1999,
    originalPrice: 2499,
    description: 'Classic silver hoop earrings with traditional bali design. Timeless elegance for any occasion.',
    features: ['925 Sterling Silver', 'Click-Top Closure', 'Lightweight', 'Hypoallergenic'],
    sizes: ['Small (20mm)', 'Medium (30mm)', 'Large (40mm)'],
    badge: null,
    isNew: false,
    isFeatured: true,
    images: ['circle-notch', 'gem']
  },
  {
    id: 'SB002',
    name: 'Silver Baliyan - Twisted Design',
    category: 'silver',
    subcategory: 'baliyan',
    price: 2499,
    originalPrice: null,
    description: 'Elegant twisted silver hoops with a modern twist on traditional bali design.',
    features: ['925 Sterling Silver', 'Twisted Pattern', 'Secure Lock', 'Mirror Polish'],
    sizes: ['Small', 'Medium', 'Large'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['circle-notch', 'gem']
  },

  // Payal (Anklets)
  {
    id: 'SP001',
    name: 'Kids Silver Payal - Ghungroo',
    category: 'silver',
    subcategory: 'kids-payal',
    price: 1799,
    originalPrice: null,
    description: 'Adorable silver anklets for kids with tiny ghungroos. Creates a sweet jingling sound.',
    features: ['925 Sterling Silver', 'Pair of 2', 'Tiny Bells', 'Safe Clasp'],
    sizes: ['Kids Small', 'Kids Medium'],
    badge: null,
    isNew: false,
    isFeatured: false,
    images: ['shoe-prints', 'gem']
  },
  {
    id: 'SP002',
    name: 'Ladies Silver Payal - Traditional Design',
    category: 'silver',
    subcategory: 'ladies-payal',
    price: 3299,
    originalPrice: 3999,
    description: 'Beautiful traditional silver anklets with intricate paisley patterns. Perfect for brides and festivals.',
    features: ['925 Sterling Silver', 'Pair of 2', 'Adjustable', 'Gift Ready'],
    sizes: ['8 inch', '9 inch', '10 inch'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['shoe-prints', 'gem', 'ring']
  },
  {
    id: 'SP003',
    name: 'Ladies Silver Payal - Minimalist Chain',
    category: 'silver',
    subcategory: 'ladies-payal',
    price: 1999,
    originalPrice: null,
    description: 'Minimalist silver chain anklet for daily wear. Subtle elegance for the modern woman.',
    features: ['925 Sterling Silver', 'Single Piece', 'Delicate Chain', 'Extension Chain'],
    sizes: ['Adjustable'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['shoe-prints', 'gem']
  },

  // Mens Bracelet
  {
    id: 'SMB001',
    name: 'Mens Silver Bracelet - Cuban Link',
    category: 'silver',
    subcategory: 'mens-bracelet',
    price: 4999,
    originalPrice: 5999,
    description: 'Bold Cuban link silver bracelet for men. Makes a powerful style statement.',
    features: ['925 Sterling Silver', 'Cuban Link', 'Box Clasp', 'Heavy Weight'],
    sizes: ['7 inch', '8 inch', '9 inch'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['link', 'gem']
  },
  {
    id: 'SMB002',
    name: 'Mens Silver Bracelet - Figaro Chain',
    category: 'silver',
    subcategory: 'mens-bracelet',
    price: 3799,
    originalPrice: null,
    description: 'Classic Figaro chain bracelet in sterling silver. Versatile and timeless.',
    features: ['925 Sterling Silver', 'Figaro Link', 'Lobster Clasp', 'Medium Weight'],
    sizes: ['7 inch', '8 inch', '9 inch'],
    badge: null,
    isNew: true,
    isFeatured: false,
    images: ['link', 'gem']
  },

  // Mens Chains
  {
    id: 'SMC001',
    name: 'Mens Silver Chain - Rope Design',
    category: 'silver',
    subcategory: 'mens-chains',
    price: 6999,
    originalPrice: 8499,
    description: 'Thick rope design silver chain for men. Bold and masculine.',
    features: ['925 Sterling Silver', 'Rope Design', 'Secure Clasp', '5mm Thickness'],
    sizes: ['20 inch', '22 inch', '24 inch'],
    badge: 'sale',
    isNew: false,
    isFeatured: true,
    images: ['link', 'gem', 'ring']
  },
  {
    id: 'SMC002',
    name: 'Mens Silver Chain - Box Link',
    category: 'silver',
    subcategory: 'mens-chains',
    price: 5499,
    originalPrice: null,
    description: 'Modern box link silver chain with a sleek finish. Perfect for pendants or solo wear.',
    features: ['925 Sterling Silver', 'Box Link', 'Mirror Finish', '3mm Thickness'],
    sizes: ['18 inch', '20 inch', '22 inch', '24 inch'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['link', 'gem']
  },

  // Mens Rings
  {
    id: 'SMR001',
    name: 'Mens Silver Ring - Band Style',
    category: 'silver',
    subcategory: 'mens-rings',
    price: 1999,
    originalPrice: 2499,
    description: 'Classic band style silver ring for men. Timeless and elegant.',
    features: ['925 Sterling Silver', 'Band Width 6mm', 'Comfort Fit', 'Polished Finish'],
    sizes: ['8', '9', '10', '11', '12'],
    badge: null,
    isNew: false,
    isFeatured: true,
    images: ['ring', 'gem']
  },
  {
    id: 'SMR002',
    name: 'Mens Silver Ring - Celtic Knot',
    category: 'silver',
    subcategory: 'mens-rings',
    price: 2799,
    originalPrice: null,
    description: 'Unique Celtic knot pattern silver ring. A symbol of eternity and interconnection.',
    features: ['925 Sterling Silver', 'Celtic Pattern', 'Oxidized Details', '8mm Width'],
    sizes: ['8', '9', '10', '11', '12'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['ring', 'gem']
  },

  // Ladies Rings
  {
    id: 'SLR001',
    name: 'Ladies Silver Ring - Solitaire Style',
    category: 'silver',
    subcategory: 'ladies-rings',
    price: 2499,
    originalPrice: 2999,
    description: 'Elegant solitaire style silver ring with cubic zirconia. Sparkling beauty.',
    features: ['925 Sterling Silver', 'CZ Stone', 'Rhodium Plated', 'Prong Setting'],
    sizes: ['5', '6', '7', '8', '9'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['ring', 'gem', 'star']
  },
  {
    id: 'SLR002',
    name: 'Ladies Silver Ring - Infinity Design',
    category: 'silver',
    subcategory: 'ladies-rings',
    price: 1899,
    originalPrice: null,
    description: 'Beautiful infinity symbol silver ring. Symbol of eternal love and friendship.',
    features: ['925 Sterling Silver', 'Infinity Symbol', 'Delicate Design', 'Gift Ready'],
    sizes: ['5', '6', '7', '8'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['ring', 'gem']
  },

  // Ladies Bracelets
  {
    id: 'SLB001',
    name: 'Ladies Silver Bracelet - Tennis Style',
    category: 'silver',
    subcategory: 'ladies-bracelets',
    price: 4999,
    originalPrice: 5999,
    description: 'Stunning tennis style silver bracelet with sparkling CZ stones. Red carpet ready.',
    features: ['925 Sterling Silver', 'CZ Stones', 'Box Clasp', 'Safety Chain'],
    sizes: ['6.5 inch', '7 inch', '7.5 inch'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['link', 'gem', 'star']
  },
  {
    id: 'SLB002',
    name: 'Ladies Silver Bracelet - Charm Style',
    category: 'silver',
    subcategory: 'ladies-bracelets',
    price: 3299,
    originalPrice: null,
    description: 'Delicate charm bracelet in sterling silver. Add your own charms to personalize.',
    features: ['925 Sterling Silver', 'Charm Compatible', 'Toggle Clasp', '3 Starter Charms'],
    sizes: ['7 inch', '8 inch'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['link', 'gem']
  },

  // Designer Inspired - Van Cleef Set
  {
    id: 'SDV001',
    name: 'Van Cleef Inspired Clover Bracelet',
    category: 'silver',
    subcategory: 'van-cleef-set',
    price: 4999,
    originalPrice: 6499,
    description: 'Elegant clover motif bracelet inspired by Van Cleef & Arpels. 18K gold plated silver.',
    features: ['925 Sterling Silver', '18K Gold Plated', 'Clover Motif', 'Mother of Pearl Inlay'],
    sizes: ['6.5 inch', '7 inch', '7.5 inch'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['gem', 'crown', 'star']
  },
  {
    id: 'SDV002',
    name: 'Van Cleef Inspired Clover Necklace',
    category: 'silver',
    subcategory: 'van-cleef-set',
    price: 5999,
    originalPrice: 7499,
    description: 'Stunning clover pendant necklace with mother of pearl. Luxury at an affordable price.',
    features: ['925 Sterling Silver', '18K Gold Plated', 'Adjustable Length', 'Lobster Clasp'],
    sizes: ['16-18 inch'],
    badge: null,
    isNew: false,
    isFeatured: true,
    images: ['gem', 'crown']
  },
  {
    id: 'SDV003',
    name: 'Van Cleef Inspired Clover Ring',
    category: 'silver',
    subcategory: 'van-cleef-set',
    price: 2999,
    originalPrice: 3999,
    description: 'Delicate clover ring with mother of pearl center. Matching piece for the set.',
    features: ['925 Sterling Silver', '18K Gold Plated', 'Mother of Pearl', 'Adjustable'],
    sizes: ['Adjustable'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['ring', 'gem']
  },
  {
    id: 'SDV004',
    name: 'Van Cleef Complete Set',
    category: 'silver',
    subcategory: 'van-cleef-set',
    price: 11999,
    originalPrice: 15999,
    description: 'Complete Van Cleef inspired set including bracelet, necklace, and ring. Best value bundle.',
    features: ['925 Sterling Silver', '18K Gold Plated', '3 Piece Set', 'Luxury Gift Box'],
    sizes: ['Standard'],
    badge: 'sale',
    isNew: false,
    isFeatured: true,
    images: ['gem', 'crown', 'star', 'ring']
  },

  // Designer Inspired - Cartier Bracelet
  {
    id: 'SDC001',
    name: 'Gold Plated Cartier Love Bracelet',
    category: 'silver',
    subcategory: 'cartier-bracelet',
    price: 5499,
    originalPrice: 6999,
    description: 'Iconic love bracelet design in 18K gold plated sterling silver. Includes screwdriver.',
    features: ['925 Sterling Silver', '18K Gold Plated', 'Screw Details', 'Screwdriver Included'],
    sizes: ['16cm', '17cm', '18cm', '19cm'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['circle', 'crown', 'gem']
  },
  {
    id: 'SDC002',
    name: 'Gold Plated Cartier Juste Un Clou',
    category: 'silver',
    subcategory: 'cartier-bracelet',
    price: 4999,
    originalPrice: null,
    description: 'Nail-inspired bracelet in gold plated sterling silver. Bold and edgy design.',
    features: ['925 Sterling Silver', '18K Gold Plated', 'Nail Design', 'Hinged Opening'],
    sizes: ['16cm', '17cm', '18cm'],
    badge: 'new',
    isNew: true,
    isFeatured: true,
    images: ['circle', 'gem']
  },

  // ==========================================
  // GOLD-PLATED JEWELLERY
  // ==========================================
  
  // Ladies Sets
  {
    id: 'GLS001',
    name: 'Gold Plated Necklace Set - Kundan Style',
    category: 'gold-plated',
    subcategory: 'ladies-sets',
    price: 3999,
    originalPrice: 4999,
    description: 'Exquisite Kundan style necklace set with matching earrings. Perfect for weddings and festivals.',
    features: ['Brass Base', '22K Gold Plated', 'Kundan Stones', 'Necklace + Earrings'],
    sizes: ['Standard'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['crown', 'gem', 'star']
  },
  {
    id: 'GLS002',
    name: 'Gold Plated Choker Set - Temple Design',
    category: 'gold-plated',
    subcategory: 'ladies-sets',
    price: 4499,
    originalPrice: 5499,
    description: 'Traditional temple design choker set with goddess motifs. South Indian inspired elegance.',
    features: ['Brass Base', '22K Gold Plated', 'Temple Design', 'Choker + Earrings'],
    sizes: ['Standard'],
    badge: null,
    isNew: false,
    isFeatured: true,
    images: ['crown', 'gem']
  },
  {
    id: 'GLS003',
    name: 'Gold Plated Bridal Set - Complete',
    category: 'gold-plated',
    subcategory: 'ladies-sets',
    price: 8999,
    originalPrice: 11999,
    description: 'Complete bridal jewelry set with necklace, earrings, maang tikka, and bangles.',
    features: ['Brass Base', '22K Gold Plated', '5 Piece Set', 'Bridal Quality'],
    sizes: ['Standard'],
    badge: 'sale',
    isNew: false,
    isFeatured: true,
    images: ['crown', 'gem', 'star', 'ring']
  },
  {
    id: 'GLS004',
    name: 'Gold Plated Pearl Set - Elegant',
    category: 'gold-plated',
    subcategory: 'ladies-sets',
    price: 2999,
    originalPrice: null,
    description: 'Elegant pearl necklace set with gold plated accents. Perfect for office and casual occasions.',
    features: ['Brass Base', '18K Gold Plated', 'Faux Pearls', 'Necklace + Earrings'],
    sizes: ['Standard'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['crown', 'gem']
  },

  // Ladies Bracelet
  {
    id: 'GLB001',
    name: 'Gold Plated Bangle Set - Traditional',
    category: 'gold-plated',
    subcategory: 'ladies-bracelet',
    price: 1999,
    originalPrice: 2499,
    description: 'Set of 4 traditional gold plated bangles with intricate meenakari work.',
    features: ['Brass Base', '22K Gold Plated', 'Set of 4', 'Meenakari Work'],
    sizes: ['2.4', '2.6', '2.8'],
    badge: null,
    isNew: false,
    isFeatured: true,
    images: ['circle', 'gem']
  },
  {
    id: 'GLB002',
    name: 'Gold Plated Tennis Bracelet',
    category: 'gold-plated',
    subcategory: 'ladies-bracelet',
    price: 2799,
    originalPrice: 3499,
    description: 'Stunning tennis bracelet with American diamond stones in 18K gold plating.',
    features: ['Brass Base', '18K Gold Plated', 'AD Stones', 'Box Clasp'],
    sizes: ['7 inch'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['link', 'gem', 'star']
  },
  {
    id: 'GLB003',
    name: 'Gold Plated Cuff Bracelet',
    category: 'gold-plated',
    subcategory: 'ladies-bracelet',
    price: 1799,
    originalPrice: null,
    description: 'Modern cuff bracelet with hammered texture finish. Adjustable and comfortable.',
    features: ['Brass Base', '18K Gold Plated', 'Hammered Finish', 'Adjustable'],
    sizes: ['One Size'],
    badge: 'new',
    isNew: true,
    isFeatured: false,
    images: ['circle', 'gem']
  },

  // ==========================================
  // MOISSANITE JEWELLERY
  // ==========================================
  
  // Cuban Chain
  {
    id: 'MCC001',
    name: 'Moissanite Cuban Chain - 8mm',
    category: 'moissanite',
    subcategory: 'cuban-chain',
    price: 14999,
    originalPrice: 18999,
    description: 'Stunning 8mm Cuban chain fully iced out with VVS moissanite stones. Maximum brilliance.',
    features: ['925 Sterling Silver', 'White Gold Plated', 'VVS Moissanite', '8mm Width'],
    sizes: ['18 inch', '20 inch', '22 inch', '24 inch'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['star', 'gem', 'link']
  },
  {
    id: 'MCC002',
    name: 'Moissanite Cuban Chain - 12mm',
    category: 'moissanite',
    subcategory: 'cuban-chain',
    price: 19999,
    originalPrice: 24999,
    description: 'Bold 12mm Cuban chain with premium moissanite stones. Ultimate statement piece.',
    features: ['925 Sterling Silver', 'White Gold Plated', 'VVS Moissanite', '12mm Width'],
    sizes: ['18 inch', '20 inch', '22 inch', '24 inch'],
    badge: null,
    isNew: false,
    isFeatured: true,
    images: ['star', 'gem', 'link']
  },
  {
    id: 'MCC003',
    name: 'Moissanite Cuban Chain - Gold Tone',
    category: 'moissanite',
    subcategory: 'cuban-chain',
    price: 17999,
    originalPrice: null,
    description: '18K gold plated Cuban chain with VVS moissanite. Luxury hip-hop style.',
    features: ['925 Sterling Silver', '18K Gold Plated', 'VVS Moissanite', '10mm Width'],
    sizes: ['20 inch', '22 inch', '24 inch'],
    badge: 'new',
    isNew: true,
    isFeatured: true,
    images: ['star', 'crown', 'link']
  },
  {
    id: 'MCC004',
    name: 'Moissanite Tennis Chain',
    category: 'moissanite',
    subcategory: 'cuban-chain',
    price: 12999,
    originalPrice: 15999,
    description: 'Classic tennis chain with round brilliant moissanite stones. Timeless elegance.',
    features: ['925 Sterling Silver', 'Rhodium Plated', 'VVS Moissanite', '4mm Stones'],
    sizes: ['16 inch', '18 inch', '20 inch', '22 inch'],
    badge: 'sale',
    isNew: false,
    isFeatured: false,
    images: ['star', 'gem']
  },

  // Cuban Bracelet
  {
    id: 'MCB001',
    name: 'Moissanite Cuban Bracelet - 8mm',
    category: 'moissanite',
    subcategory: 'cuban-bracelet',
    price: 8999,
    originalPrice: 10999,
    description: 'Matching 8mm Cuban bracelet to complete your set. Fully iced with VVS moissanite.',
    features: ['925 Sterling Silver', 'White Gold Plated', 'VVS Moissanite', '8mm Width'],
    sizes: ['7 inch', '8 inch', '9 inch'],
    badge: 'bestseller',
    isNew: false,
    isFeatured: true,
    images: ['star', 'gem', 'link']
  },
  {
    id: 'MCB002',
    name: 'Moissanite Cuban Bracelet - 12mm',
    category: 'moissanite',
    subcategory: 'cuban-bracelet',
    price: 11999,
    originalPrice: 14999,
    description: 'Bold 12mm Cuban bracelet with premium moissanite. Matching chain available.',
    features: ['925 Sterling Silver', 'White Gold Plated', 'VVS Moissanite', '12mm Width'],
    sizes: ['7 inch', '8 inch', '9 inch'],
    badge: null,
    isNew: false,
    isFeatured: true,
    images: ['star', 'gem', 'link']
  },
  {
    id: 'MCB003',
    name: 'Moissanite Tennis Bracelet',
    category: 'moissanite',
    subcategory: 'cuban-bracelet',
    price: 7999,
    originalPrice: 9999,
    description: 'Elegant tennis bracelet with round brilliant moissanite stones. Box clasp with safety.',
    features: ['925 Sterling Silver', 'Rhodium Plated', 'VVS Moissanite', 'Safety Chain'],
    sizes: ['7 inch', '7.5 inch', '8 inch'],
    badge: 'new',
    isNew: true,
    isFeatured: true,
    images: ['star', 'gem']
  },
  {
    id: 'MCB004',
    name: 'Moissanite Cuban Set - Chain + Bracelet',
    category: 'moissanite',
    subcategory: 'cuban-bracelet',
    price: 21999,
    originalPrice: 27999,
    description: 'Complete set with matching 10mm Cuban chain and bracelet. Best value bundle.',
    features: ['925 Sterling Silver', 'White Gold Plated', 'VVS Moissanite', '2 Piece Set'],
    sizes: ['Chain: 20inch + Bracelet: 8inch'],
    badge: 'sale',
    isNew: false,
    isFeatured: true,
    images: ['star', 'gem', 'link', 'crown']
  }
];

// Category and Subcategory Labels
const CATEGORIES = {
  'silver': {
    name: 'Silver Jewellery',
    icon: 'ring',
    description: 'Premium 925 Sterling Silver Collection'
  },
  'gold-plated': {
    name: 'Gold-Plated Jewellery',
    icon: 'crown',
    description: 'Luxurious 18K & 22K Gold Plated Designs'
  },
  'moissanite': {
    name: 'Moissanite Jewellery',
    icon: 'star',
    description: 'Brilliant VVS Moissanite Collection'
  }
};

const SUBCATEGORIES = {
  'kids-kade': { name: 'Kids Kade', category: 'silver' },
  'ladies-kade': { name: 'Ladies Kade & Chudiyan', category: 'silver' },
  'mens-kade': { name: 'Mens Kade', category: 'silver' },
  'baliyan': { name: 'Baliyan (Hoops)', category: 'silver' },
  'kids-payal': { name: 'Kids Payal (Anklets)', category: 'silver' },
  'ladies-payal': { name: 'Ladies Payal (Anklets)', category: 'silver' },
  'payal': { name: 'Payal (Anklets)', category: 'silver' },
  'mens-bracelet': { name: 'Mens Bracelet', category: 'silver' },
  'mens-chains': { name: 'Mens Chains', category: 'silver' },
  'mens-rings': { name: 'Mens Rings', category: 'silver' },
  'ladies-rings': { name: 'Ladies Rings', category: 'silver' },
  'ladies-bracelets': { name: 'Ladies Bracelets', category: 'silver' },
  'van-cleef-set': { name: 'Van Cleef Set', category: 'silver' },
  'cartier-bracelet': { name: 'Cartier Bracelet', category: 'silver' },
  'ladies-sets': { name: 'Ladies Sets', category: 'gold-plated' },
  'ladies-bracelet': { name: 'Ladies Bracelet', category: 'gold-plated' },
  'cuban-chain': { name: 'Cuban Chain', category: 'moissanite' },
  'cuban-bracelet': { name: 'Cuban Bracelet', category: 'moissanite' }
};

// Helper functions for products
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

function getProductsBySubcategory(subcategory) {
  return PRODUCTS.filter(p => p.subcategory === subcategory);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.isFeatured);
}

function getNewArrivals() {
  return PRODUCTS.filter(p => p.isNew);
}

function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm) ||
    p.subcategory.toLowerCase().includes(searchTerm)
  );
}

function filterProducts(products, filters) {
  let filtered = [...products];
  
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  
  if (filters.subcategory) {
    filtered = filtered.filter(p => p.subcategory === filters.subcategory);
  }
  
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }
  
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }
  
  if (filters.onSale) {
    filtered = filtered.filter(p => p.originalPrice !== null);
  }
  
  return filtered;
}

function sortProducts(products, sortBy) {
  const sorted = [...products];
  
  switch(sortBy) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      sorted.sort((a, b) => b.isNew - a.isNew);
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // featured - keep original order but prioritize featured
      sorted.sort((a, b) => b.isFeatured - a.isFeatured);
  }
  
  return sorted;
}

// Format price in INR
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PRODUCTS,
    CATEGORIES,
    SUBCATEGORIES,
    getProductById,
    getProductsByCategory,
    getProductsBySubcategory,
    getFeaturedProducts,
    getNewArrivals,
    searchProducts,
    filterProducts,
    sortProducts,
    formatPrice
  };
}
