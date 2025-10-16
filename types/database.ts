// Custom type definitions for the application
export interface Product {
  id: string
  title: string
  sku: string
  color: string
  inr_cost_price: number
  inr_exchange_rate: number
  gbp_purchase_price: number
  gbp_sale_price: number
  profit: number // Calculated field
  sold: boolean
  sold_date: Date | null
  barcode: string
  supplier_id: string
  created_at: Date
  updated_at: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  total_purchases: number // Calculated field
  created_at: Date
  updated_at: Date
}

export interface Supplier {
  id: string
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  payment_terms: string
  created_at: Date
  updated_at: Date
}

export interface Sale {
  id: string
  customer_id: string
  product_id: string
  sale_price: number
  currency: 'INR' | 'GBP'
  payment_method: string
  sale_date: Date
  notes: string
  created_at: Date
}
