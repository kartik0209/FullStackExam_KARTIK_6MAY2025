
export interface Product {
  _id: string;
  id?: string;           // Optional for compatibility with some APIs
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface CartSummary {
  totalAmount: ReactNode;
  subtotal: number;
  shipping: number;
  total: number;
  items: CartItem[];
  price: number;
  quantity: number;

}



export interface CartItem {
  name: ReactNode;
  _id: ReactNode;
  productId: string;
  quantity: number;
  product: Product;
  price: number;
}

// Order interface
export interface Order {
  total_amount(total_amount: any): import("react").ReactNode;
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

// Report data interface
export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface TopSpender {
  user_id: string;
  total_spent: number;
}

export interface ProductSale {
  product_name: string;
  total_quantity: number;
  total_sales: number;
}

export interface CategorySales {
  category: string;
  productCount: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface RevenueData {
  dailyRevenue: DailyRevenue[];
  topSpenders: TopSpender[];
  productSales: ProductSale[];
  date:string;
  totalRevenue: number;
  categorySales: CategorySales[];
}
export interface CartItemType {
  _id: string;
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}
  export interface CategorySale {
      categoryName: string;
      productCount: number;
      avgPrice: number;
      minPrice: number;
      maxPrice: number;
    }