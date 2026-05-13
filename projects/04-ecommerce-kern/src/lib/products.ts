// src/lib/products.ts
// Mock product data for portfolio purposes.
// For production: replace with Shopify Storefront API client.request(PRODUCTS_QUERY)

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number; // in paise
  description: string;
  details: string[];
  sizes: string[];
  care: string;
  images: string[];
  collection: string;
  available: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "overshirt-01",
    name: "Overshirt 01",
    category: "Overshirts",
    price: 1650000,
    description:
      "A structured overshirt in brushed cotton. Worn as a shirt or light jacket. The piece that lives between seasons.",
    details: [
      "100% brushed cotton",
      "Structured fit",
      "Corozo buttons",
      "Two chest pockets",
      "Made in India",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Machine wash cold. Hang dry.",
    images: [
      "/Overshirt01.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: true,
  },
  {
    id: "2",
    slug: "trouser-01",
    name: "Trouser 01",
    category: "Trousers",
    price: 1450000,
    description:
      "A wide-leg trouser in Japanese wool-blend. High-rise. Pleated front. The kind of trouser that changes how you carry yourself.",
    details: [
      "62% wool, 38% polyester",
      "Wide leg, high rise",
      "Two pleat front",
      "Side adjusters",
      "Made in India",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    care: "Dry clean recommended. Steam to refresh.",
    images: [
      "/Trousers01.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: true,
  },
  {
    id: "3",
    slug: "overcoat-01",
    name: "Overcoat 01",
    category: "Outerwear",
    price: 4200000,
    description:
      "A mid-length overcoat in double-faced Italian wool. Structured shoulders. Single button. The coat you keep for twenty years.",
    details: [
      "100% Italian double-faced wool",
      "Structured shoulder",
      "Single button closure",
      "Full lining in cupro",
      "Made in India",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Dry clean only. Store on a wide hanger.",
    images: [
      "/Overcoat01.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: false,
  },
  {
    id: "4",
    slug: "oxford-shirt-01",
    name: "Oxford Shirt 01",
    category: "Shirts",
    price: 950000,
    description:
      "A classic oxford in Portuguese cotton. Slightly boxy. The shirt that works with everything and improves with every wash.",
    details: [
      "100% Portuguese cotton oxford",
      "Slightly boxy fit",
      "Button-down collar",
      "Single chest pocket",
      "Made in India",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    care: "Machine wash cold. Tumble dry low.",
    images: [
      "/OxfordShirt01.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: false,
  },
  {
    id: "5",
    slug: "overshirt-02",
    name: "Overshirt 02",
    category: "Overshirts",
    price: 1750000,
    description:
      "A refined overshirt in heavyweight cotton twill. Structured silhouette with workwear details. The layer that elevates any outfit.",
    details: [
      "100% heavyweight cotton twill",
      "Structured fit",
      "Corozo buttons",
      "Two chest pockets with flaps",
      "Made in India",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Machine wash cold. Hang dry.",
    images: [
      "/Overshirt02.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: false,
  },
  {
    id: "6",
    slug: "trousers-02-new",
    name: "Trousers 02",
    category: "Trousers",
    price: 1550000,
    description:
      "A tailored trouser in premium wool-blend. Mid-rise with clean lines. The essential pant for modern dressing.",
    details: [
      "65% wool, 35% polyester",
      "Tailored fit, mid rise",
      "Clean front",
      "Hidden waistband adjusters",
      "Made in India",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    care: "Dry clean recommended. Steam to refresh.",
    images: [
      "/Trousers02.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: false,
  },
  {
    id: "7",
    slug: "overcoat-02",
    name: "Overcoat 02",
    category: "Outerwear",
    price: 4500000,
    description:
      "A full-length overcoat in charcoal wool. Double-breasted with peak lapels. The statement coat for winter elegance.",
    details: [
      "100% premium wool",
      "Double-breasted",
      "Peak lapels",
      "Full lining in satin",
      "Made in India",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Dry clean only. Store on a wide hanger.",
    images: [
      "/Overcoat02.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: false,
  },
  {
    id: "8",
    slug: "oxford-shirt-02",
    name: "Oxford Shirt 02",
    category: "Shirts",
    price: 1050000,
    description:
      "A crisp oxford in Egyptian cotton. Slim fit with a modern collar. The shirt for important meetings.",
    details: [
      "100% Egyptian cotton oxford",
      "Slim fit",
      "Modern spread collar",
      "French placket",
      "Made in India",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    care: "Machine wash cold. Tumble dry low.",
    images: [
      "/OxfordShirt02.jpg",
    ],
    collection: "AW 2025",
    available: true,
    featured: false,
  },
];

export const formatPrice = (paise: number): string =>
  `₹${(paise / 100).toLocaleString("en-IN")}`;
