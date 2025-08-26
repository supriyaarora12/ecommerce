import { db } from "./src/lib/firebase";  
import { collection, addDoc } from "firebase/firestore";

const products = [
  // ---------- WOMEN'S FASHION ----------
  // Dresses
  {
    name: "Floral Summer Dress",
    price: 1299,
    category: "dresses",
    imageUrl: "/ui/homepage/coat.svg",
    stock: 15,
    description: "Beautiful floral print summer dress perfect for warm weather. Made from lightweight, breathable fabric with a comfortable fit.",
  },
  {
    name: "Evening Gown",
    price: 3499,
    category: "dresses",
    imageUrl: "/ui/homepage/bag.svg",
    stock: 8,
  },
  {
    name: "Casual Maxi Dress",
    price: 899,
    category: "dresses",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 20,
  },
  {
    name: "Cocktail Dress",
    price: 2199,
    category: "dresses",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 12,
  },

  // Tops
  {
    name: "Silk Blouse",
    price: 1499,
    category: "tops",
    imageUrl: "/ui/newrelease/dslr.svg",
    stock: 18,
  },
  {
    name: "Crop Top",
    price: 699,
    category: "tops",
    imageUrl: "/ui/newrelease/laptopfhd.svg",
    stock: 25,
  },
  {
    name: "Turtleneck Sweater",
    price: 1899,
    category: "tops",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 14,
  },
  {
    name: "Off-Shoulder Top",
    price: 999,
    category: "tops",
    imageUrl: "/ui/newrelease/usb.svg",
    stock: 22,
  },

  // Bottoms
  {
    name: "High Waist Skinny Jeans",
    price: 1499,
    category: "bottoms",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 25,
  },
  {
    name: "Pleated Skirt",
    price: 1199,
    category: "bottoms",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 16,
  },
  {
    name: "Wide Leg Pants",
    price: 1799,
    category: "bottoms",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 12,
  },
  {
    name: "Shorts",
    price: 799,
    category: "bottoms",
    imageUrl: "/ui/homepage/jbl.svg",
    stock: 30,
  },

  // Accessories
  {
    name: "Statement Necklace",
    price: 899,
    category: "accessories",
    imageUrl: "/ui/homepage/playsttaion.svg",
    stock: 35,
  },
  {
    name: "Silk Scarf",
    price: 599,
    category: "accessories",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 40,
  },
  {
    name: "Oversized Sunglasses",
    price: 1299,
    category: "accessories",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 20,
  },
  {
    name: "Leather Belt",
    price: 799,
    category: "accessories",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 28,
  },

  // Bags
  {
    name: "Classic Leather Handbag",
    price: 2499,
    category: "bags",
    imageUrl: "/ui/homepage/bag.svg",
    stock: 20,
  },
  {
    name: "Crossbody Bag",
    price: 1599,
    category: "bags",
    imageUrl: "/ui/homepage/coat.svg",
    stock: 15,
  },
  {
    name: "Tote Bag",
    price: 999,
    category: "bags",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 25,
  },
  {
    name: "Clutch Bag",
    price: 1299,
    category: "bags",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 18,
  },

  // ---------- MEN'S FASHION ----------
  // Shirts
  {
    name: "Slim Fit Formal Shirt",
    price: 1099,
    category: "shirts",
    imageUrl: "/ui/newrelease/dslr.svg",
    stock: 30,
  },
  {
    name: "Casual Polo Shirt",
    price: 899,
    category: "shirts",
    imageUrl: "/ui/newrelease/laptopfhd.svg",
    stock: 35,
  },
  {
    name: "Oxford Button-Down",
    price: 1299,
    category: "shirts",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 22,
  },
  {
    name: "Hawaiian Shirt",
    price: 799,
    category: "shirts",
    imageUrl: "/ui/newrelease/usb.svg",
    stock: 18,
  },

  // Pants
  {
    name: "Blue Denim Jeans",
    price: 1599,
    category: "pants",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 22,
  },
  {
    name: "Chino Pants",
    price: 1399,
    category: "pants",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 20,
  },
  {
    name: "Cargo Pants",
    price: 1199,
    category: "pants",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 16,
  },
  {
    name: "Dress Pants",
    price: 1799,
    category: "pants",
    imageUrl: "/ui/homepage/jbl.svg",
    stock: 14,
  },

  // Suits
  {
    name: "Classic Business Suit",
    price: 8999,
    category: "suits",
    imageUrl: "/ui/homepage/playsttaion.svg",
    stock: 8,
  },
  {
    name: "Wedding Suit",
    price: 12999,
    category: "suits",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 5,
  },
  {
    name: "Casual Blazer",
    price: 3999,
    category: "suits",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 12,
  },

  // Accessories
  {
    name: "Leather Wallet",
    price: 799,
    category: "accessories",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 40,
  },
  {
    name: "Tie Collection",
    price: 599,
    category: "accessories",
    imageUrl: "/ui/homepage/Category-Gamepad.svg",
    stock: 45,
  },
  {
    name: "Cufflinks",
    price: 899,
    category: "accessories",
    imageUrl: "/ui/homepage/Category-Headphone.svg",
    stock: 25,
  },

  // Watches
  {
    name: "Classic Analog Watch",
    price: 2999,
    category: "watches",
    imageUrl: "/ui/homepage/Category-SmartWatch.svg",
    stock: 15,
  },
  {
    name: "Smart Watch",
    price: 8999,
    category: "watches",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 10,
  },
  {
    name: "Luxury Watch",
    price: 24999,
    category: "watches",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 3,
  },

  // ---------- ELECTRONICS ----------
  // Smartphones
  {
    name: "iPhone 15 Pro",
    price: 99999,
    category: "smartphones",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 12,
    description: "Latest iPhone with advanced camera system, A17 Pro chip, and titanium design. Features 48MP main camera and USB-C connectivity.",
  },
  {
    name: "Samsung Galaxy S24",
    price: 79999,
    category: "smartphones",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 15,
  },
  {
    name: "OnePlus 12",
    price: 59999,
    category: "smartphones",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 18,
  },
  {
    name: "Google Pixel 8",
    price: 69999,
    category: "smartphones",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 10,
  },

  // Laptops
  {
    name: "MacBook Pro M3",
    price: 199999,
    category: "laptops",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 8,
    description: "Powerful laptop with Apple M3 chip, perfect for professionals. Features stunning Retina display and all-day battery life.",
  },
  {
    name: "Dell XPS 13",
    price: 89999,
    category: "laptops",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 12,
  },
  {
    name: "HP Spectre x360",
    price: 79999,
    category: "laptops",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 10,
  },
  {
    name: "Lenovo ThinkPad",
    price: 69999,
    category: "laptops",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 15,
  },

  // Tablets
  {
    name: "iPad Pro 12.9",
    price: 89999,
    category: "tablets",
    imageUrl: "/ui/newrelease/laptopfhd.svg",
    stock: 10,
  },
  {
    name: "Samsung Galaxy Tab S9",
    price: 59999,
    category: "tablets",
    imageUrl: "/ui/newrelease/laptopfhd.svg",
    stock: 12,
  },
  {
    name: "Microsoft Surface Pro",
    price: 79999,
    category: "tablets",
    imageUrl: "/ui/newrelease/laptopfhd.svg",
    stock: 8,
  },

  // Cameras
  {
    name: "Canon EOS R5",
    price: 299999,
    category: "cameras",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 5,
  },
  {
    name: "Sony A7 IV",
    price: 199999,
    category: "cameras",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 7,
  },
  {
    name: "Nikon Z6 II",
    price: 179999,
    category: "cameras",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 6,
  },
  {
    name: "GoPro Hero 11",
    price: 39999,
    category: "cameras",
    imageUrl: "/ui/newrelease/dslr.svg",
    stock: 20,
  },

  // Gaming
  {
    name: "PlayStation 5",
    price: 49999,
    category: "gaming",
    imageUrl: "/ui/homepage/playsttaion.svg",
    stock: 15,
  },
  {
    name: "Xbox Series X",
    price: 44999,
    category: "gaming",
    imageUrl: "/ui/homepage/Category-Gamepad.svg",
    stock: 12,
  },
  {
    name: "Nintendo Switch OLED",
    price: 29999,
    category: "gaming",
    imageUrl: "/ui/homepage/Category-Gamepad.svg",
    stock: 25,
  },
  {
    name: "Gaming Laptop RTX 4080",
    price: 199999,
    category: "gaming",
    imageUrl: "/ui/newrelease/laptopfhd.svg",
    stock: 8,
  },

  // ---------- HOME & LIFESTYLE ----------
  // Furniture
  {
    name: "Wooden Coffee Table",
    price: 7999,
    category: "furniture",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 5,
  },
  {
    name: "Sofa Set",
    price: 25999,
    category: "furniture",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 3,
  },
  {
    name: "Dining Table Set",
    price: 15999,
    category: "furniture",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 4,
  },
  {
    name: "Bookshelf",
    price: 5999,
    category: "furniture",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 8,
  },

  // Decor
  {
    name: "Wall Art Canvas",
    price: 2999,
    category: "decor",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 12,
  },
  {
    name: "Vase Set",
    price: 1499,
    category: "decor",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 20,
  },
  {
    name: "Throw Pillows",
    price: 799,
    category: "decor",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 30,
  },
  {
    name: "Mirror",
    price: 3999,
    category: "decor",
    imageUrl: "/ui/newrelease/dslr.svg",
    stock: 10,
  },

  // Kitchen
  {
    name: "Kitchen Cookware Set",
    price: 3499,
    category: "kitchen",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 20,
  },
  {
    name: "Blender",
    price: 1999,
    category: "kitchen",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 15,
  },
  {
    name: "Coffee Maker",
    price: 2499,
    category: "kitchen",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 12,
  },
  {
    name: "Toaster",
    price: 899,
    category: "kitchen",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 25,
  },

  // Bath
  {
    name: "Bath Towel Set",
    price: 999,
    category: "bath",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 40,
  },
  {
    name: "Shower Curtain",
    price: 599,
    category: "bath",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 35,
  },
  {
    name: "Bath Mat",
    price: 399,
    category: "bath",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 30,
  },
  {
    name: "Toothbrush Holder",
    price: 299,
    category: "bath",
    imageUrl: "/ui/newrelease/usb.svg",
    stock: 50,
  },

  // Lighting
  {
    name: "Bedside Lamp",
    price: 1299,
    category: "lighting",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 12,
  },
  {
    name: "Wall Clock",
    price: 899,
    category: "lighting",
    imageUrl: "/ui/homepage/Category-Computer.svg",
    stock: 16,
  },
  {
    name: "Chandelier",
    price: 8999,
    category: "lighting",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 3,
  },
  {
    name: "LED Strip Lights",
    price: 699,
    category: "lighting",
    imageUrl: "/ui/homepage/Category-Gamepad.svg",
    stock: 25,
  },

  // ---------- MEDICINE ----------
  // Prescription
  {
    name: "Prescription Glasses",
    price: 2999,
    category: "prescription",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 20,
  },
  {
    name: "Contact Lenses",
    price: 1499,
    category: "prescription",
    imageUrl: "/ui/homepage/Category-CellPhone.svg",
    stock: 50,
  },

  // Vitamins
  {
    name: "Multivitamin Tablets",
    price: 599,
    category: "vitamins",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 100,
  },
  {
    name: "Vitamin D3",
    price: 399,
    category: "vitamins",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 80,
  },
  {
    name: "Omega-3 Fish Oil",
    price: 799,
    category: "vitamins",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 60,
  },

  // First Aid
  {
    name: "First Aid Kit",
    price: 899,
    category: "first-aid",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 30,
  },
  {
    name: "Bandages",
    price: 199,
    category: "first-aid",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 200,
  },
  {
    name: "Antiseptic Solution",
    price: 299,
    category: "first-aid",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 150,
  },

  // Personal Care
  {
    name: "Electric Toothbrush",
    price: 1999,
    category: "personal-care",
    imageUrl: "/ui/newrelease/usb.svg",
    stock: 40,
  },
  {
    name: "Hair Dryer",
    price: 1999,
    category: "personal-care",
    imageUrl: "/ui/homepage/Category-Headphone.svg",
    stock: 15,
  },
  {
    name: "Electric Razor",
    price: 2999,
    category: "personal-care",
    imageUrl: "/ui/newrelease/usb.svg",
    stock: 25,
  },

  // Medical Devices
  {
    name: "Blood Pressure Monitor",
    price: 2999,
    category: "medical-devices",
    imageUrl: "/ui/homepage/Category-SmartWatch.svg",
    stock: 20,
  },
  {
    name: "Thermometer",
    price: 599,
    category: "medical-devices",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 50,
  },
  {
    name: "Pulse Oximeter",
    price: 1499,
    category: "medical-devices",
    imageUrl: "/ui/homepage/Category-SmartWatch.svg",
    stock: 30,
  },

  // ---------- SPORTS & OUTDOOR ----------
  // Fitness
  {
    name: "Yoga Mat",
    price: 899,
    category: "fitness",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 60,
  },
  {
    name: "Dumbbells Set",
    price: 2499,
    category: "fitness",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 25,
  },
  {
    name: "Treadmill",
    price: 29999,
    category: "fitness",
    imageUrl: "/ui/homepage/playsttaion.svg",
    stock: 8,
  },
  {
    name: "Resistance Bands",
    price: 399,
    category: "fitness",
    imageUrl: "/ui/newrelease/usb.svg",
    stock: 100,
  },

  // Outdoor Gear
  {
    name: "Hiking Boots",
    price: 3999,
    category: "outdoor-gear",
    imageUrl: "/ui/homepage/coat.svg",
    stock: 20,
  },
  {
    name: "Backpack",
    price: 1999,
    category: "outdoor-gear",
    imageUrl: "/ui/homepage/bag.svg",
    stock: 30,
  },
  {
    name: "Water Bottle",
    price: 599,
    category: "outdoor-gear",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 80,
  },

  // Camping
  {
    name: "Tent 4-Person",
    price: 5999,
    category: "camping",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 12,
  },
  {
    name: "Sleeping Bag",
    price: 1999,
    category: "camping",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 25,
  },
  {
    name: "Camping Stove",
    price: 1499,
    category: "camping",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 18,
  },

  // Hiking
  {
    name: "Hiking Poles",
    price: 899,
    category: "hiking",
    imageUrl: "/ui/newrelease/usb.svg",
    stock: 35,
  },
  {
    name: "GPS Device",
    price: 8999,
    category: "hiking",
    imageUrl: "/ui/homepage/Category-SmartWatch.svg",
    stock: 8,
  },
  {
    name: "Compass",
    price: 299,
    category: "hiking",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 50,
  },

  // Water Sports
  {
    name: "Kayak",
    price: 19999,
    category: "water-sports",
    imageUrl: "/ui/homepage/playsttaion.svg",
    stock: 5,
  },
  {
    name: "Life Jacket",
    price: 1499,
    category: "water-sports",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 20,
  },
  {
    name: "Swimming Goggles",
    price: 399,
    category: "water-sports",
    imageUrl: "/ui/homepage/Category-Camera.svg",
    stock: 60,
  },

  // ---------- BABY'S & TOYS ----------
  // Clothing
  {
    name: "Baby Onesie Set",
    price: 899,
    category: "clothing",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 40,
  },
  {
    name: "Baby Socks",
    price: 299,
    category: "clothing",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 80,
  },
  {
    name: "Baby Hat",
    price: 199,
    category: "clothing",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 60,
  },

  // Diapers
  {
    name: "Diaper Pack",
    price: 999,
    category: "diapers",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 100,
  },
  {
    name: "Baby Wipes",
    price: 399,
    category: "diapers",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 150,
  },

  // Feeding
  {
    name: "Baby Bottle Set",
    price: 699,
    category: "feeding",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 50,
  },
  {
    name: "Bib Set",
    price: 299,
    category: "feeding",
    imageUrl: "/ui/newrelease/jacket.svg",
    stock: 70,
  },
  {
    name: "High Chair",
    price: 3999,
    category: "feeding",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 15,
  },

  // Toys
  {
    name: "Remote Control Car",
    price: 1299,
    category: "toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 20,
  },
  {
    name: "Building Blocks Set",
    price: 999,
    category: "toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 40,
  },
  {
    name: "Doll House",
    price: 1799,
    category: "toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 12,
  },
  {
    name: "Action Figure",
    price: 699,
    category: "toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 30,
  },
  {
    name: "Stuffed Teddy Bear",
    price: 899,
    category: "toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 25,
  },

  // Books
  {
    name: "Children's Storybook",
    price: 299,
    category: "books",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 100,
  },
  {
    name: "Educational Book Set",
    price: 599,
    category: "books",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 60,
  },
  {
    name: "Coloring Book",
    price: 199,
    category: "books",
    imageUrl: "/ui/homepage/bookshelf.svg",
    stock: 80,
  },

  // ---------- GROCERIES & PETS ----------
  // Pantry
  {
    name: "Organic Rice",
    price: 199,
    category: "pantry",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 200,
  },
  {
    name: "Pasta Pack",
    price: 149,
    category: "pantry",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 150,
  },
  {
    name: "Cooking Oil",
    price: 299,
    category: "pantry",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 100,
  },

  // Beverages
  {
    name: "Coffee Beans",
    price: 399,
    category: "beverages",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 80,
  },
  {
    name: "Green Tea",
    price: 199,
    category: "beverages",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 120,
  },
  {
    name: "Juice Pack",
    price: 299,
    category: "beverages",
    imageUrl: "/ui/homepage/cooler.svg",
    stock: 90,
  },

  // Pet Food
  {
    name: "Dog Food",
    price: 899,
    category: "pet-food",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 60,
  },
  {
    name: "Cat Food",
    price: 699,
    category: "pet-food",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 70,
  },
  {
    name: "Bird Seed",
    price: 299,
    category: "pet-food",
    imageUrl: "/ui/newrelease/breed.svg",
    stock: 40,
  },

  // Pet Toys
  {
    name: "Dog Toy",
    price: 399,
    category: "pet-toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 50,
  },
  {
    name: "Cat Toy",
    price: 299,
    category: "pet-toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 60,
  },
  {
    name: "Chew Toy",
    price: 199,
    category: "pet-toys",
    imageUrl: "/ui/newrelease/toy.svg",
    stock: 80,
  },

  // ---------- HEALTH & BEAUTY ----------
  // Skincare
  {
    name: "Face Cream",
    price: 699,
    category: "skincare",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 60,
  },
  {
    name: "Sunscreen",
    price: 499,
    category: "skincare",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 80,
  },
  {
    name: "Face Mask",
    price: 299,
    category: "skincare",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 100,
  },
  {
    name: "Moisturizer",
    price: 599,
    category: "skincare",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 70,
  },

  // Makeup
  {
    name: "Matte Lipstick",
    price: 499,
    category: "makeup",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 50,
  },
  {
    name: "Foundation",
    price: 899,
    category: "makeup",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 40,
  },
  {
    name: "Mascara",
    price: 399,
    category: "makeup",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 60,
  },
  {
    name: "Eyeshadow Palette",
    price: 1299,
    category: "makeup",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 30,
  },

  // Fragrances
  {
    name: "Perfume Bottle",
    price: 1499,
    category: "fragrances",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 35,
  },
  {
    name: "Cologne",
    price: 1299,
    category: "fragrances",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 40,
  },
  {
    name: "Body Spray",
    price: 399,
    category: "fragrances",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 80,
  },

  // Hair Care
  {
    name: "Shampoo & Conditioner Set",
    price: 899,
    category: "hair-care",
    imageUrl: "/ui/homepage/Category-Headphone.svg",
    stock: 25,
  },
  {
    name: "Hair Dryer",
    price: 1999,
    category: "hair-care",
    imageUrl: "/ui/homepage/Category-Headphone.svg",
    stock: 15,
  },
  {
    name: "Hair Straightener",
    price: 2499,
    category: "hair-care",
    imageUrl: "/ui/homepage/Category-Headphone.svg",
    stock: 20,
  },
  {
    name: "Hair Brush",
    price: 299,
    category: "hair-care",
    imageUrl: "/ui/homepage/Category-Headphone.svg",
    stock: 100,
  },

  // Bath & Body
  {
    name: "Body Wash",
    price: 399,
    category: "bath-body",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 90,
  },
  {
    name: "Hand Cream",
    price: 299,
    category: "bath-body",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 120,
  },
  {
    name: "Bath Salt",
    price: 199,
    category: "bath-body",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 80,
  },
  {
    name: "Deodorant",
    price: 249,
    category: "bath-body",
    imageUrl: "/ui/newrelease/Copa_Sense 1.svg",
    stock: 150,
  },
];

async function seedData() {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), product);
      console.log(`Added: ${product.name}`);
    }
    console.log("🎉 All products added successfully!");
  } catch (e) {
    console.error("❌ Error adding products: ", e);
  }
}

seedData();