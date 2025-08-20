import { db } from "./src/lib/firebase";  
import { collection, addDoc } from "firebase/firestore";

const products = [
  // ---------- WOMEN'S FASHION ----------
  // Dresses
  {
    name: "Floral Summer Dress",
    price: 1299,
    category: "dresses",
    imageUrl: "https://picsum.photos/id/1011/400/500",
    stock: 15,
  },
  {
    name: "Evening Gown",
    price: 3499,
    category: "dresses",
    imageUrl: "https://picsum.photos/id/1012/400/500",
    stock: 8,
  },
  {
    name: "Casual Maxi Dress",
    price: 899,
    category: "dresses",
    imageUrl: "https://picsum.photos/id/1013/400/500",
    stock: 20,
  },
  {
    name: "Cocktail Dress",
    price: 2199,
    category: "dresses",
    imageUrl: "https://picsum.photos/id/1014/400/500",
    stock: 12,
  },

  // Tops
  {
    name: "Silk Blouse",
    price: 1499,
    category: "tops",
    imageUrl: "https://picsum.photos/id/1015/400/500",
    stock: 18,
  },
  {
    name: "Crop Top",
    price: 699,
    category: "tops",
    imageUrl: "https://picsum.photos/id/1016/400/500",
    stock: 25,
  },
  {
    name: "Turtleneck Sweater",
    price: 1899,
    category: "tops",
    imageUrl: "https://picsum.photos/id/1017/400/500",
    stock: 14,
  },
  {
    name: "Off-Shoulder Top",
    price: 999,
    category: "tops",
    imageUrl: "https://picsum.photos/id/1018/400/500",
    stock: 22,
  },

  // Bottoms
  {
    name: "High Waist Skinny Jeans",
    price: 1499,
    category: "bottoms",
    imageUrl: "https://picsum.photos/id/1019/400/500",
    stock: 25,
  },
  {
    name: "Pleated Skirt",
    price: 1199,
    category: "bottoms",
    imageUrl: "https://picsum.photos/id/1020/400/500",
    stock: 16,
  },
  {
    name: "Wide Leg Pants",
    price: 1799,
    category: "bottoms",
    imageUrl: "https://picsum.photos/id/1021/400/500",
    stock: 12,
  },
  {
    name: "Shorts",
    price: 799,
    category: "bottoms",
    imageUrl: "https://picsum.photos/id/1022/400/500",
    stock: 30,
  },

  // Accessories
  {
    name: "Statement Necklace",
    price: 899,
    category: "accessories",
    imageUrl: "https://picsum.photos/id/1023/400/500",
    stock: 35,
  },
  {
    name: "Silk Scarf",
    price: 599,
    category: "accessories",
    imageUrl: "https://picsum.photos/id/1024/400/500",
    stock: 40,
  },
  {
    name: "Oversized Sunglasses",
    price: 1299,
    category: "accessories",
    imageUrl: "https://picsum.photos/id/1025/400/500",
    stock: 20,
  },
  {
    name: "Leather Belt",
    price: 799,
    category: "accessories",
    imageUrl: "https://picsum.photos/id/1026/400/500",
    stock: 28,
  },

  // Bags
  {
    name: "Classic Leather Handbag",
    price: 2499,
    category: "bags",
    imageUrl: "https://picsum.photos/id/1027/400/500",
    stock: 20,
  },
  {
    name: "Crossbody Bag",
    price: 1599,
    category: "bags",
    imageUrl: "https://picsum.photos/id/1028/400/500",
    stock: 15,
  },
  {
    name: "Tote Bag",
    price: 999,
    category: "bags",
    imageUrl: "https://picsum.photos/id/1029/400/500",
    stock: 25,
  },
  {
    name: "Clutch Bag",
    price: 1299,
    category: "bags",
    imageUrl: "https://picsum.photos/id/1030/400/500",
    stock: 18,
  },

  // ---------- MEN'S FASHION ----------
  // Shirts
  {
    name: "Slim Fit Formal Shirt",
    price: 1099,
    category: "shirts",
    imageUrl: "https://picsum.photos/id/1031/400/500",
    stock: 30,
  },
  {
    name: "Casual Polo Shirt",
    price: 899,
    category: "shirts",
    imageUrl: "https://picsum.photos/id/1032/400/500",
    stock: 35,
  },
  {
    name: "Oxford Button-Down",
    price: 1299,
    category: "shirts",
    imageUrl: "https://picsum.photos/id/1033/400/500",
    stock: 22,
  },
  {
    name: "Hawaiian Shirt",
    price: 799,
    category: "shirts",
    imageUrl: "https://picsum.photos/id/1034/400/500",
    stock: 18,
  },

  // Pants
  {
    name: "Blue Denim Jeans",
    price: 1599,
    category: "pants",
    imageUrl: "https://picsum.photos/id/1035/400/500",
    stock: 22,
  },
  {
    name: "Chino Pants",
    price: 1399,
    category: "pants",
    imageUrl: "https://picsum.photos/id/1036/400/500",
    stock: 20,
  },
  {
    name: "Cargo Pants",
    price: 1199,
    category: "pants",
    imageUrl: "https://picsum.photos/id/1037/400/500",
    stock: 16,
  },
  {
    name: "Dress Pants",
    price: 1799,
    category: "pants",
    imageUrl: "https://picsum.photos/id/1038/400/500",
    stock: 14,
  },

  // Suits
  {
    name: "Classic Business Suit",
    price: 8999,
    category: "suits",
    imageUrl: "https://picsum.photos/id/1039/400/500",
    stock: 8,
  },
  {
    name: "Wedding Suit",
    price: 12999,
    category: "suits",
    imageUrl: "https://picsum.photos/id/1040/400/500",
    stock: 5,
  },
  {
    name: "Casual Blazer",
    price: 3999,
    category: "suits",
    imageUrl: "https://picsum.photos/id/1041/400/500",
    stock: 12,
  },

  // Accessories
  {
    name: "Leather Wallet",
    price: 799,
    category: "accessories",
    imageUrl: "https://picsum.photos/id/1042/400/500",
    stock: 40,
  },
  {
    name: "Tie Collection",
    price: 599,
    category: "accessories",
    imageUrl: "https://picsum.photos/id/1043/400/500",
    stock: 45,
  },
  {
    name: "Cufflinks",
    price: 899,
    category: "accessories",
    imageUrl: "https://picsum.photos/id/1044/400/500",
    stock: 25,
  },

  // Watches
  {
    name: "Classic Analog Watch",
    price: 2999,
    category: "watches",
    imageUrl: "https://picsum.photos/id/1045/400/500",
    stock: 15,
  },
  {
    name: "Smart Watch",
    price: 8999,
    category: "watches",
    imageUrl: "https://picsum.photos/id/1046/400/500",
    stock: 10,
  },
  {
    name: "Luxury Watch",
    price: 24999,
    category: "watches",
    imageUrl: "https://picsum.photos/id/1047/400/500",
    stock: 3,
  },

  // ---------- ELECTRONICS ----------
  // Smartphones
  {
    name: "iPhone 15 Pro",
    price: 99999,
    category: "smartphones",
    imageUrl: "https://picsum.photos/id/1048/400/500",
    stock: 12,
  },
  {
    name: "Samsung Galaxy S24",
    price: 79999,
    category: "smartphones",
    imageUrl: "https://picsum.photos/id/1049/400/500",
    stock: 15,
  },
  {
    name: "OnePlus 12",
    price: 59999,
    category: "smartphones",
    imageUrl: "https://picsum.photos/id/1050/400/500",
    stock: 18,
  },
  {
    name: "Google Pixel 8",
    price: 69999,
    category: "smartphones",
    imageUrl: "https://picsum.photos/id/1051/400/500",
    stock: 10,
  },

  // Laptops
  {
    name: "MacBook Pro M3",
    price: 199999,
    category: "laptops",
    imageUrl: "https://picsum.photos/id/1052/400/500",
    stock: 8,
  },
  {
    name: "Dell XPS 13",
    price: 89999,
    category: "laptops",
    imageUrl: "https://picsum.photos/id/1053/400/500",
    stock: 12,
  },
  {
    name: "HP Spectre x360",
    price: 79999,
    category: "laptops",
    imageUrl: "https://picsum.photos/id/1054/400/500",
    stock: 10,
  },
  {
    name: "Lenovo ThinkPad",
    price: 69999,
    category: "laptops",
    imageUrl: "https://picsum.photos/id/1055/400/500",
    stock: 15,
  },

  // Tablets
  {
    name: "iPad Pro 12.9",
    price: 89999,
    category: "tablets",
    imageUrl: "https://picsum.photos/id/1056/400/500",
    stock: 10,
  },
  {
    name: "Samsung Galaxy Tab S9",
    price: 59999,
    category: "tablets",
    imageUrl: "https://picsum.photos/id/1057/400/500",
    stock: 12,
  },
  {
    name: "Microsoft Surface Pro",
    price: 79999,
    category: "tablets",
    imageUrl: "https://picsum.photos/id/1058/400/500",
    stock: 8,
  },

  // Cameras
  {
    name: "Canon EOS R5",
    price: 299999,
    category: "cameras",
    imageUrl: "https://picsum.photos/id/1059/400/500",
    stock: 5,
  },
  {
    name: "Sony A7 IV",
    price: 199999,
    category: "cameras",
    imageUrl: "https://picsum.photos/id/1060/400/500",
    stock: 7,
  },
  {
    name: "Nikon Z6 II",
    price: 179999,
    category: "cameras",
    imageUrl: "https://picsum.photos/id/1061/400/500",
    stock: 6,
  },
  {
    name: "GoPro Hero 11",
    price: 39999,
    category: "cameras",
    imageUrl: "https://picsum.photos/id/1062/400/500",
    stock: 20,
  },

  // Gaming
  {
    name: "PlayStation 5",
    price: 49999,
    category: "gaming",
    imageUrl: "https://picsum.photos/id/1063/400/500",
    stock: 15,
  },
  {
    name: "Xbox Series X",
    price: 44999,
    category: "gaming",
    imageUrl: "https://picsum.photos/id/1064/400/500",
    stock: 12,
  },
  {
    name: "Nintendo Switch OLED",
    price: 29999,
    category: "gaming",
    imageUrl: "https://picsum.photos/id/1065/400/500",
    stock: 25,
  },
  {
    name: "Gaming Laptop RTX 4080",
    price: 199999,
    category: "gaming",
    imageUrl: "https://picsum.photos/id/1066/400/500",
    stock: 8,
  },

  // ---------- HOME & LIFESTYLE ----------
  // Furniture
  {
    name: "Wooden Coffee Table",
    price: 7999,
    category: "furniture",
    imageUrl: "https://picsum.photos/id/1067/400/500",
    stock: 5,
  },
  {
    name: "Sofa Set",
    price: 25999,
    category: "furniture",
    imageUrl: "https://picsum.photos/id/1068/400/500",
    stock: 3,
  },
  {
    name: "Dining Table Set",
    price: 15999,
    category: "furniture",
    imageUrl: "https://picsum.photos/id/1069/400/500",
    stock: 4,
  },
  {
    name: "Bookshelf",
    price: 5999,
    category: "furniture",
    imageUrl: "https://picsum.photos/id/1070/400/500",
    stock: 8,
  },

  // Decor
  {
    name: "Wall Art Canvas",
    price: 2999,
    category: "decor",
    imageUrl: "https://picsum.photos/id/1071/400/500",
    stock: 12,
  },
  {
    name: "Vase Set",
    price: 1499,
    category: "decor",
    imageUrl: "https://picsum.photos/id/1072/400/500",
    stock: 20,
  },
  {
    name: "Throw Pillows",
    price: 799,
    category: "decor",
    imageUrl: "https://picsum.photos/id/1073/400/500",
    stock: 30,
  },
  {
    name: "Mirror",
    price: 3999,
    category: "decor",
    imageUrl: "https://picsum.photos/id/1074/400/500",
    stock: 10,
  },

  // Kitchen
  {
    name: "Kitchen Cookware Set",
    price: 3499,
    category: "kitchen",
    imageUrl: "https://picsum.photos/id/1075/400/500",
    stock: 20,
  },
  {
    name: "Blender",
    price: 1999,
    category: "kitchen",
    imageUrl: "https://picsum.photos/id/1076/400/500",
    stock: 15,
  },
  {
    name: "Coffee Maker",
    price: 2499,
    category: "kitchen",
    imageUrl: "https://picsum.photos/id/1077/400/500",
    stock: 12,
  },
  {
    name: "Toaster",
    price: 899,
    category: "kitchen",
    imageUrl: "https://picsum.photos/id/1078/400/500",
    stock: 25,
  },

  // Bath
  {
    name: "Bath Towel Set",
    price: 999,
    category: "bath",
    imageUrl: "https://picsum.photos/id/1079/400/500",
    stock: 40,
  },
  {
    name: "Shower Curtain",
    price: 599,
    category: "bath",
    imageUrl: "https://picsum.photos/id/1080/400/500",
    stock: 35,
  },
  {
    name: "Bath Mat",
    price: 399,
    category: "bath",
    imageUrl: "https://picsum.photos/id/1081/400/500",
    stock: 30,
  },
  {
    name: "Toothbrush Holder",
    price: 299,
    category: "bath",
    imageUrl: "https://picsum.photos/id/1082/400/500",
    stock: 50,
  },

  // Lighting
  {
    name: "Bedside Lamp",
    price: 1299,
    category: "lighting",
    imageUrl: "https://picsum.photos/id/1083/400/500",
    stock: 12,
  },
  {
    name: "Wall Clock",
    price: 899,
    category: "lighting",
    imageUrl: "https://picsum.photos/id/1084/400/500",
    stock: 16,
  },
  {
    name: "Chandelier",
    price: 8999,
    category: "lighting",
    imageUrl: "https://picsum.photos/id/1085/400/500",
    stock: 3,
  },
  {
    name: "LED Strip Lights",
    price: 699,
    category: "lighting",
    imageUrl: "https://picsum.photos/id/1086/400/500",
    stock: 25,
  },

  // ---------- MEDICINE ----------
  // Prescription
  {
    name: "Prescription Glasses",
    price: 2999,
    category: "prescription",
    imageUrl: "https://picsum.photos/id/1087/400/500",
    stock: 20,
  },
  {
    name: "Contact Lenses",
    price: 1499,
    category: "prescription",
    imageUrl: "https://picsum.photos/id/1088/400/500",
    stock: 50,
  },

  // Vitamins
  {
    name: "Multivitamin Tablets",
    price: 599,
    category: "vitamins",
    imageUrl: "https://picsum.photos/id/1089/400/500",
    stock: 100,
  },
  {
    name: "Vitamin D3",
    price: 399,
    category: "vitamins",
    imageUrl: "https://picsum.photos/id/1090/400/500",
    stock: 80,
  },
  {
    name: "Omega-3 Fish Oil",
    price: 799,
    category: "vitamins",
    imageUrl: "https://picsum.photos/id/1091/400/500",
    stock: 60,
  },

  // First Aid
  {
    name: "First Aid Kit",
    price: 899,
    category: "first-aid",
    imageUrl: "https://picsum.photos/id/1092/400/500",
    stock: 30,
  },
  {
    name: "Bandages",
    price: 199,
    category: "first-aid",
    imageUrl: "https://picsum.photos/id/1093/400/500",
    stock: 200,
  },
  {
    name: "Antiseptic Solution",
    price: 299,
    category: "first-aid",
    imageUrl: "https://picsum.photos/id/1094/400/500",
    stock: 150,
  },

  // Personal Care
  {
    name: "Electric Toothbrush",
    price: 1999,
    category: "personal-care",
    imageUrl: "https://picsum.photos/id/1095/400/500",
    stock: 40,
  },
  {
    name: "Hair Dryer",
    price: 1999,
    category: "personal-care",
    imageUrl: "https://picsum.photos/id/1096/400/500",
    stock: 15,
  },
  {
    name: "Electric Razor",
    price: 2999,
    category: "personal-care",
    imageUrl: "https://picsum.photos/id/1097/400/500",
    stock: 25,
  },

  // Medical Devices
  {
    name: "Blood Pressure Monitor",
    price: 2999,
    category: "medical-devices",
    imageUrl: "https://picsum.photos/id/1098/400/500",
    stock: 20,
  },
  {
    name: "Thermometer",
    price: 599,
    category: "medical-devices",
    imageUrl: "https://picsum.photos/id/1099/400/500",
    stock: 50,
  },
  {
    name: "Pulse Oximeter",
    price: 1499,
    category: "medical-devices",
    imageUrl: "https://picsum.photos/id/1100/400/500",
    stock: 30,
  },

  // ---------- SPORTS & OUTDOOR ----------
  // Fitness
  {
    name: "Yoga Mat",
    price: 899,
    category: "fitness",
    imageUrl: "https://picsum.photos/id/1101/400/500",
    stock: 60,
  },
  {
    name: "Dumbbells Set",
    price: 2499,
    category: "fitness",
    imageUrl: "https://picsum.photos/id/1102/400/500",
    stock: 25,
  },
  {
    name: "Treadmill",
    price: 29999,
    category: "fitness",
    imageUrl: "https://picsum.photos/id/1103/400/500",
    stock: 8,
  },
  {
    name: "Resistance Bands",
    price: 399,
    category: "fitness",
    imageUrl: "https://picsum.photos/id/1104/400/500",
    stock: 100,
  },

  // Outdoor Gear
  {
    name: "Hiking Boots",
    price: 3999,
    category: "outdoor-gear",
    imageUrl: "https://picsum.photos/id/1105/400/500",
    stock: 20,
  },
  {
    name: "Backpack",
    price: 1999,
    category: "outdoor-gear",
    imageUrl: "https://picsum.photos/id/1106/400/500",
    stock: 30,
  },
  {
    name: "Water Bottle",
    price: 599,
    category: "outdoor-gear",
    imageUrl: "https://picsum.photos/id/1107/400/500",
    stock: 80,
  },

  // Camping
  {
    name: "Tent 4-Person",
    price: 5999,
    category: "camping",
    imageUrl: "https://picsum.photos/id/1108/400/500",
    stock: 12,
  },
  {
    name: "Sleeping Bag",
    price: 1999,
    category: "camping",
    imageUrl: "https://picsum.photos/id/1109/400/500",
    stock: 25,
  },
  {
    name: "Camping Stove",
    price: 1499,
    category: "camping",
    imageUrl: "https://picsum.photos/id/1110/400/500",
    stock: 18,
  },

  // Hiking
  {
    name: "Hiking Poles",
    price: 899,
    category: "hiking",
    imageUrl: "https://picsum.photos/id/1111/400/500",
    stock: 35,
  },
  {
    name: "GPS Device",
    price: 8999,
    category: "hiking",
    imageUrl: "https://picsum.photos/id/1112/400/500",
    stock: 8,
  },
  {
    name: "Compass",
    price: 299,
    category: "hiking",
    imageUrl: "https://picsum.photos/id/1113/400/500",
    stock: 50,
  },

  // Water Sports
  {
    name: "Kayak",
    price: 19999,
    category: "water-sports",
    imageUrl: "https://picsum.photos/id/1114/400/500",
    stock: 5,
  },
  {
    name: "Life Jacket",
    price: 1499,
    category: "water-sports",
    imageUrl: "https://picsum.photos/id/1115/400/500",
    stock: 20,
  },
  {
    name: "Swimming Goggles",
    price: 399,
    category: "water-sports",
    imageUrl: "https://picsum.photos/id/1116/400/500",
    stock: 60,
  },

  // ---------- BABY'S & TOYS ----------
  // Clothing
  {
    name: "Baby Onesie Set",
    price: 899,
    category: "clothing",
    imageUrl: "https://picsum.photos/id/1117/400/500",
    stock: 40,
  },
  {
    name: "Baby Socks",
    price: 299,
    category: "clothing",
    imageUrl: "https://picsum.photos/id/1118/400/500",
    stock: 80,
  },
  {
    name: "Baby Hat",
    price: 199,
    category: "clothing",
    imageUrl: "https://picsum.photos/id/1119/400/500",
    stock: 60,
  },

  // Diapers
  {
    name: "Diaper Pack",
    price: 999,
    category: "diapers",
    imageUrl: "https://picsum.photos/id/1120/400/500",
    stock: 100,
  },
  {
    name: "Baby Wipes",
    price: 399,
    category: "diapers",
    imageUrl: "https://picsum.photos/id/1121/400/500",
    stock: 150,
  },

  // Feeding
  {
    name: "Baby Bottle Set",
    price: 699,
    category: "feeding",
    imageUrl: "https://picsum.photos/id/1122/400/500",
    stock: 50,
  },
  {
    name: "Bib Set",
    price: 299,
    category: "feeding",
    imageUrl: "https://picsum.photos/id/1123/400/500",
    stock: 70,
  },
  {
    name: "High Chair",
    price: 3999,
    category: "feeding",
    imageUrl: "https://picsum.photos/id/1124/400/500",
    stock: 15,
  },

  // Toys
  {
    name: "Remote Control Car",
    price: 1299,
    category: "toys",
    imageUrl: "https://picsum.photos/id/1125/400/500",
    stock: 20,
  },
  {
    name: "Building Blocks Set",
    price: 999,
    category: "toys",
    imageUrl: "https://picsum.photos/id/1126/400/500",
    stock: 40,
  },
  {
    name: "Doll House",
    price: 1799,
    category: "toys",
    imageUrl: "https://picsum.photos/id/1127/400/500",
    stock: 12,
  },
  {
    name: "Action Figure",
    price: 699,
    category: "toys",
    imageUrl: "https://picsum.photos/id/1128/400/500",
    stock: 30,
  },
  {
    name: "Stuffed Teddy Bear",
    price: 899,
    category: "toys",
    imageUrl: "https://picsum.photos/id/1129/400/500",
    stock: 25,
  },

  // Books
  {
    name: "Children's Storybook",
    price: 299,
    category: "books",
    imageUrl: "https://picsum.photos/id/1130/400/500",
    stock: 100,
  },
  {
    name: "Educational Book Set",
    price: 599,
    category: "books",
    imageUrl: "https://picsum.photos/id/1131/400/500",
    stock: 60,
  },
  {
    name: "Coloring Book",
    price: 199,
    category: "books",
    imageUrl: "https://picsum.photos/id/1132/400/500",
    stock: 80,
  },

  // ---------- GROCERIES & PETS ----------
  // Pantry
  {
    name: "Organic Rice",
    price: 199,
    category: "pantry",
    imageUrl: "https://picsum.photos/id/1133/400/500",
    stock: 200,
  },
  {
    name: "Pasta Pack",
    price: 149,
    category: "pantry",
    imageUrl: "https://picsum.photos/id/1134/400/500",
    stock: 150,
  },
  {
    name: "Cooking Oil",
    price: 299,
    category: "pantry",
    imageUrl: "https://picsum.photos/id/1135/400/500",
    stock: 100,
  },

  // Beverages
  {
    name: "Coffee Beans",
    price: 399,
    category: "beverages",
    imageUrl: "https://picsum.photos/id/1136/400/500",
    stock: 80,
  },
  {
    name: "Green Tea",
    price: 199,
    category: "beverages",
    imageUrl: "https://picsum.photos/id/1137/400/500",
    stock: 120,
  },
  {
    name: "Juice Pack",
    price: 299,
    category: "beverages",
    imageUrl: "https://picsum.photos/id/1138/400/500",
    stock: 90,
  },

  // Pet Food
  {
    name: "Dog Food",
    price: 899,
    category: "pet-food",
    imageUrl: "https://picsum.photos/id/1139/400/500",
    stock: 60,
  },
  {
    name: "Cat Food",
    price: 699,
    category: "pet-food",
    imageUrl: "https://picsum.photos/id/1140/400/500",
    stock: 70,
  },
  {
    name: "Bird Seed",
    price: 299,
    category: "pet-food",
    imageUrl: "https://picsum.photos/id/1141/400/500",
    stock: 40,
  },

  // Pet Toys
  {
    name: "Dog Toy",
    price: 399,
    category: "pet-toys",
    imageUrl: "https://picsum.photos/id/1142/400/500",
    stock: 50,
  },
  {
    name: "Cat Toy",
    price: 299,
    category: "pet-toys",
    imageUrl: "https://picsum.photos/id/1143/400/500",
    stock: 60,
  },
  {
    name: "Chew Toy",
    price: 199,
    category: "pet-toys",
    imageUrl: "https://picsum.photos/id/1144/400/500",
    stock: 80,
  },

  // ---------- HEALTH & BEAUTY ----------
  // Skincare
  {
    name: "Face Cream",
    price: 699,
    category: "skincare",
    imageUrl: "https://picsum.photos/id/1145/400/500",
    stock: 60,
  },
  {
    name: "Sunscreen",
    price: 499,
    category: "skincare",
    imageUrl: "https://picsum.photos/id/1146/400/500",
    stock: 80,
  },
  {
    name: "Face Mask",
    price: 299,
    category: "skincare",
    imageUrl: "https://picsum.photos/id/1147/400/500",
    stock: 100,
  },
  {
    name: "Moisturizer",
    price: 599,
    category: "skincare",
    imageUrl: "https://picsum.photos/id/1148/400/500",
    stock: 70,
  },

  // Makeup
  {
    name: "Matte Lipstick",
    price: 499,
    category: "makeup",
    imageUrl: "https://picsum.photos/id/1149/400/500",
    stock: 50,
  },
  {
    name: "Foundation",
    price: 899,
    category: "makeup",
    imageUrl: "https://picsum.photos/id/1150/400/500",
    stock: 40,
  },
  {
    name: "Mascara",
    price: 399,
    category: "makeup",
    imageUrl: "https://picsum.photos/id/1151/400/500",
    stock: 60,
  },
  {
    name: "Eyeshadow Palette",
    price: 1299,
    category: "makeup",
    imageUrl: "https://picsum.photos/id/1152/400/500",
    stock: 30,
  },

  // Fragrances
  {
    name: "Perfume Bottle",
    price: 1499,
    category: "fragrances",
    imageUrl: "https://picsum.photos/id/1153/400/500",
    stock: 35,
  },
  {
    name: "Cologne",
    price: 1299,
    category: "fragrances",
    imageUrl: "https://picsum.photos/id/1154/400/500",
    stock: 40,
  },
  {
    name: "Body Spray",
    price: 399,
    category: "fragrances",
    imageUrl: "https://picsum.photos/id/1155/400/500",
    stock: 80,
  },

  // Hair Care
  {
    name: "Shampoo & Conditioner Set",
    price: 899,
    category: "hair-care",
    imageUrl: "https://picsum.photos/id/1156/400/500",
    stock: 25,
  },
  {
    name: "Hair Dryer",
    price: 1999,
    category: "hair-care",
    imageUrl: "https://picsum.photos/id/1157/400/500",
    stock: 15,
  },
  {
    name: "Hair Straightener",
    price: 2499,
    category: "hair-care",
    imageUrl: "https://picsum.photos/id/1158/400/500",
    stock: 20,
  },
  {
    name: "Hair Brush",
    price: 299,
    category: "hair-care",
    imageUrl: "https://picsum.photos/id/1159/400/500",
    stock: 100,
  },

  // Bath & Body
  {
    name: "Body Wash",
    price: 399,
    category: "bath-body",
    imageUrl: "https://picsum.photos/id/1160/400/500",
    stock: 90,
  },
  {
    name: "Hand Cream",
    price: 299,
    category: "bath-body",
    imageUrl: "https://picsum.photos/id/1161/400/500",
    stock: 120,
  },
  {
    name: "Bath Salt",
    price: 199,
    category: "bath-body",
    imageUrl: "https://picsum.photos/id/1162/400/500",
    stock: 80,
  },
  {
    name: "Deodorant",
    price: 249,
    category: "bath-body",
    imageUrl: "https://picsum.photos/id/1163/400/500",
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