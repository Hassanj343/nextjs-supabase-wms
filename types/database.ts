// Custom type definitions for the application
export interface Product {
  id: string
  title: string
  sku: string
  color: string | null
  inr_cost_price: number
  inr_exchange_rate: number
  gbp_purchase_price: number
  gbp_sale_price: number
  profit?: number // Calculated field
  sold: boolean
  sold_date: Date | null
  barcode: string | null
  supplier_id: string | null
  created_at: Date
  updated_at: Date
}

export interface Customer {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
  total_purchases?: number // Calculated field
  created_at: Date
  updated_at: Date
}

export interface Supplier {
  id: string
  name: string
  contact_person: string | null
  email: string | null
  phone: string | null
  address: string | null
  payment_terms: string | null
  created_at: Date
  updated_at: Date
}

export interface Sale {
  id: string
  customer_id: string | null
  product_id: string | null
  sale_price: number
  currency: 'INR' | 'GBP'
  payment_method: string | null
  sale_date: Date
  notes: string | null
  created_at: Date
}

// Extended interfaces with calculated fields and relationships
export interface ProductWithCalculations extends Product {
  profit: number
  profit_margin_percent: number
  inr_sale_price: number
  supplier_name?: string
}

export interface CustomerWithTotals extends Customer {
  total_purchases_gbp: number
  total_orders: number
}

export interface SaleDetailed extends Sale {
  customer_name?: string
  customer_email?: string
  product_title?: string
  product_sku?: string
  product_color?: string
  supplier_name?: string
}

// Analytics interfaces
export interface InventoryAnalytics {
  total_products: number
  available_products: number
  sold_products: number
  total_inventory_value_gbp: number
  potential_revenue_gbp: number
  potential_profit_gbp: number
  avg_profit_margin_percent: number
}

// User role interface
export interface UserRole {
  id: string
  user_id: string
  role: 'admin' | 'manager' | 'sales_associate'
  created_at: Date
  updated_at: Date
}
