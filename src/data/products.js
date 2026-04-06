const products = [
  {
    id: 1,
    slug: "rolex-submariner-black",
    name: "Rolex Submariner Black",
    brand: "Rolex",
    category: "Luxury",
    type: "image",
    price: 129999,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80",
    description:
      "A bold luxury watch with a premium black dial, polished steel body, and timeless styling for formal and statement wear.",
    shortDescription: "Bold black luxury watch with timeless styling.",
    tags: ["rolex", "black", "luxury", "premium", "formal", "steel"],
  },
  {
    id: 2,
    slug: "omega-seamaster-blue",
    name: "Omega Seamaster Blue",
    brand: "Omega",
    category: "Luxury",
    type: "image",
    price: 114999,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    description:
      "An elegant luxury watch with a blue dial, premium bracelet finish, and refined styling for modern everyday sophistication.",
    shortDescription: "Elegant blue dial watch with premium finish.",
    tags: ["omega", "blue", "luxury", "premium", "steel", "analog"],
  },
  {
    id: 3,
    slug: "tissot-classic-silver",
    name: "Tissot Classic Silver",
    brand: "Tissot",
    category: "Classic",
    type: "image",
    price: 24999,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80",
    description:
      "A clean silver watch designed for office wear, meetings, and elegant everyday use with classic timeless appeal.",
    shortDescription: "Minimal silver watch with classic office styling.",
    tags: ["tissot", "silver", "classic", "minimal", "office", "formal"],
  },
  {
    id: 4,
    slug: "cartier-roman-gold",
    name: "Cartier Roman Gold",
    brand: "Cartier",
    category: "Luxury",
    type: "image",
    price: 89999,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    description:
      "A refined gold-toned watch with Roman numeral styling and elegant luxury details built for premium fashion lovers.",
    shortDescription: "Gold luxury watch with Roman numeral elegance.",
    tags: ["cartier", "gold", "luxury", "roman", "elegant", "premium"],
  },
  {
    id: 5,
    slug: "fossil-brown-leather",
    name: "Fossil Brown Leather",
    brand: "Fossil",
    category: "Casual",
    type: "image",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=900&q=80",
    description:
      "A stylish brown leather watch that pairs perfectly with casual and smart-casual outfits for daily wear.",
    shortDescription: "Casual brown leather watch for daily styling.",
    tags: ["fossil", "brown", "leather", "casual", "daily", "analog"],
  },
  {
    id: 6,
    slug: "apple-watch-ultra-black",
    name: "Apple Watch Ultra Black",
    brand: "Apple",
    category: "Smartwatch",
    type: "image",
    price: 79999,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    description:
      "A premium smartwatch with modern black styling, fitness-focused features, and a bold design made for tech lovers.",
    shortDescription: "Advanced black smartwatch with premium design.",
    tags: ["apple", "smartwatch", "black", "fitness", "digital", "modern"],
  },
  {
    id: 7,
    slug: "samsung-galaxy-watch-sport",
    name: "Samsung Galaxy Watch Sport",
    brand: "Samsung",
    category: "Smartwatch",
    type: "image",
    price: 22999,
    image:
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=900&q=80",
    description:
      "A sporty smartwatch built for active lifestyles, smart notifications, and all-day comfort with a modern look.",
    shortDescription: "Sporty smartwatch for active everyday use.",
    tags: ["samsung", "smartwatch", "sport", "fitness", "digital", "black"],
  },
  {
    id: 8,
    slug: "casio-vintage-digital",
    name: "Casio Vintage Digital",
    brand: "Casio",
    category: "Vintage",
    type: "image",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80",
    description:
      "A retro-inspired digital watch with lightweight comfort, classic appeal, and iconic everyday styling.",
    shortDescription: "Retro digital watch with vintage everyday appeal.",
    tags: ["casio", "digital", "vintage", "retro", "casual", "daily"],
  },
  {
    id: 9,
    slug: "citizen-eco-drive-green",
    name: "Citizen Eco Drive Green",
    brand: "Citizen",
    category: "Modern",
    type: "image",
    price: 18999,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    description:
      "A fresh modern watch with a rich green dial and polished design for users who want something stylish and unique.",
    shortDescription: "Modern green dial watch with premium feel.",
    tags: ["citizen", "green", "modern", "stylish", "premium", "analog"],
  },
  {
    id: 10,
    slug: "seiko-heritage-white",
    name: "Seiko Heritage White",
    brand: "Seiko",
    category: "Classic",
    type: "image",
    price: 15999,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80",
    description:
      "A refined white dial watch with classic styling, elegant balance, and excellent versatility for formal or daily wear.",
    shortDescription: "Elegant white dial watch with classic charm.",
    tags: ["seiko", "white", "classic", "formal", "clean", "analog"],
  },
  {
    id: 11,
    slug: "tag-heuer-carbon-sport",
    name: "Tag Heuer Carbon Sport",
    brand: "Tag Heuer",
    category: "Sport",
    type: "image",
    price: 67999,
    image:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=900&q=80",
    description:
      "A bold sport-inspired watch with dark detailing, strong presence, and premium finishing for energetic styling.",
    shortDescription: "Performance-inspired sport watch with bold look.",
    tags: ["tag heuer", "sport", "carbon", "black", "premium", "bold"],
  },
  {
    id: 12,
    slug: "armani-exchange-blue-steel",
    name: "Armani Exchange Blue Steel",
    brand: "Armani Exchange",
    category: "Fashion",
    type: "image",
    price: 13999,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80",
    description:
      "A fashion-forward blue steel watch with polished details and sleek modern styling for standout looks.",
    shortDescription: "Blue steel fashion watch with sleek styling.",
    tags: ["armani", "blue", "fashion", "steel", "modern", "analog"],
  },
];

export default products;
