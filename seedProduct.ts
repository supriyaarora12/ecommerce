import { db } from "../ecommerce/src/lib/firebase";  
import { collection, addDoc } from "firebase/firestore";

const products = [
  // ---------- WOMEN ----------
  {
    name: "Floral Summer Dress",
    price: 1299,
    category: "women",
    imageUrl: "https://picsum.photos/id/1011/400/500",
    stock: 15,
  },
  {
    name: "Casual Denim Jacket",
    price: 1999,
    category: "women",
    imageUrl: "https://picsum.photos/id/1015/400/500",
    stock: 10,
  },
  {
    name: "Classic Leather Handbag",
    price: 2499,
    category: "women",
    imageUrl: "https://picsum.photos/id/1027/400/500",
    stock: 20,
  },
  {
    name: "High Waist Skinny Jeans",
    price: 1499,
    category: "women",
    imageUrl: "https://picsum.photos/id/1019/400/500",
    stock: 25,
  },
  {
    name: "Formal Blazer",
    price: 2799,
    category: "women",
    imageUrl: "https://picsum.photos/id/1020/400/500",
    stock: 8,
  },

  // ---------- MEN ----------
  {
    name: "Slim Fit Formal Shirt",
    price: 1099,
    category: "men",
    imageUrl: "https://picsum.photos/id/1005/400/500",
    stock: 30,
  },
  {
    name: "Leather Wallet",
    price: 799,
    category: "men",
    imageUrl: "https://picsum.photos/id/1050/400/500",
    stock: 40,
  },
  {
    name: "Casual Sneakers",
    price: 2299,
    category: "men",
    imageUrl: "https://picsum.photos/id/1042/400/500",
    stock: 18,
  },
  {
    name: "Blue Denim Jeans",
    price: 1599,
    category: "men",
    imageUrl: "https://picsum.photos/id/1033/400/500",
    stock: 22,
  },
  {
    name: "Winter Hoodie",
    price: 1899,
    category: "men",
    imageUrl: "https://picsum.photos/id/1012/400/500",
    stock: 14,
  },

  // ---------- ELECTRONICS ----------
  {
    name: "Wireless Earbuds",
    price: 2999,
    category: "electronics",
    imageUrl: "https://picsum.photos/id/1062/400/500",
    stock: 50,
  },
  {
    name: "Smartphone 128GB",
    price: 15999,
    category: "electronics",
    imageUrl: "https://picsum.photos/id/1070/400/500",
    stock: 12,
  },
  {
    name: "Laptop i5 8GB RAM",
    price: 45999,
    category: "electronics",
    imageUrl: "https://picsum.photos/id/1084/400/500",
    stock: 7,
  },
  {
    name: "Smartwatch",
    price: 4999,
    category: "electronics",
    imageUrl: "https://picsum.photos/id/1080/400/500",
    stock: 18,
  },
  {
    name: "Bluetooth Speaker",
    price: 2499,
    category: "electronics",
    imageUrl: "https://picsum.photos/id/109/400/500",
    stock: 30,
  },

  // ---------- HOME ----------
  {
    name: "Wooden Coffee Table",
    price: 7999,
    category: "home",
    imageUrl: "https://picsum.photos/id/110/400/500",
    stock: 5,
  },
  {
    name: "Sofa Set",
    price: 25999,
    category: "home",
    imageUrl: "https://picsum.photos/id/111/400/500",
    stock: 3,
  },
  {
    name: "Bedside Lamp",
    price: 1299,
    category: "home",
    imageUrl: "https://picsum.photos/id/112/400/500",
    stock: 12,
  },
  {
    name: "Wall Clock",
    price: 899,
    category: "home",
    imageUrl: "https://picsum.photos/id/113/400/500",
    stock: 16,
  },
  {
    name: "Kitchen Cookware Set",
    price: 3499,
    category: "home",
    imageUrl: "https://picsum.photos/id/114/400/500",
    stock: 20,
  },

  // ---------- BEAUTY ----------
  {
    name: "Matte Lipstick",
    price: 499,
    category: "beauty",
    imageUrl: "https://picsum.photos/id/115/400/500",
    stock: 50,
  },
  {
    name: "Perfume Bottle",
    price: 1499,
    category: "beauty",
    imageUrl: "https://picsum.photos/id/116/400/500",
    stock: 35,
  },
  {
    name: "Face Cream",
    price: 699,
    category: "beauty",
    imageUrl: "https://picsum.photos/id/117/400/500",
    stock: 60,
  },
  {
    name: "Hair Dryer",
    price: 1999,
    category: "beauty",
    imageUrl: "https://picsum.photos/id/118/400/500",
    stock: 15,
  },
  {
    name: "Shampoo & Conditioner Set",
    price: 899,
    category: "beauty",
    imageUrl: "https://picsum.photos/id/119/400/500",
    stock: 25,
  },

  // ---------- TOYS ----------
  {
    name: "Remote Control Car",
    price: 1299,
    category: "toys",
    imageUrl: "https://picsum.photos/id/120/400/500",
    stock: 20,
  },
  {
    name: "Building Blocks Set",
    price: 999,
    category: "toys",
    imageUrl: "https://picsum.photos/id/121/400/500",
    stock: 40,
  },
  {
    name: "Doll House",
    price: 1799,
    category: "toys",
    imageUrl: "https://picsum.photos/id/122/400/500",
    stock: 12,
  },
  {
    name: "Action Figure",
    price: 699,
    category: "toys",
    imageUrl: "https://picsum.photos/id/123/400/500",
    stock: 30,
  },
  {
    name: "Stuffed Teddy Bear",
    price: 899,
    category: "toys",
    imageUrl: "https://picsum.photos/id/124/400/500",
    stock: 25,
  },
];

async function seedData() {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), product);
      console.log(`✅ Added: ${product.name}`);
    }
    console.log("🎉 All products added successfully!");
  } catch (e) {
    console.error("❌ Error adding products: ", e);
  }
}

seedData();
