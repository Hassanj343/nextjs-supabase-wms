import { createServerClient } from '../server'
import { ProductFormData } from '@/lib/validations'
import { ProductWithCalculations } from '@/types/database'

export const productQueries = {
  // Get all products with calculations
  async getAll(): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get available (unsold) products
  async getAvailable(): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .filter('sold', 'eq', false)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get product by ID
  async getById(id: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .filter('id', 'eq', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get product by SKU
  async getBySku(sku: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .filter('sku', 'eq', sku)
      .single()
    
    if (error) throw error
    return data
  },

  // Get product by barcode
  async getByBarcode(barcode: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .filter('barcode', 'eq', barcode)
      .single()
    
    if (error) throw error
    return data
  },

  // Create product
  async create(product: ProductFormData): Promise<any> {
    const supabase = createServerClient()
    
    const insertData = {
      ...product,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert(insertData)
      .select()
      .single()
    
    if (error) throw error
    
    // Return the product with calculations
    return await this.getById(data.id)
  },

  // Update product
  async update(id: string, updates: Partial<ProductFormData>): Promise<any> {
    const supabase = createServerClient()
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .filter('id', 'eq', id)
      .select()
      .single()
    
    if (error) throw error
    
    // Return the product with calculations
    return await this.getById(data.id)
  },

  // Mark product as sold
  async markAsSold(id: string, soldDate?: Date): Promise<any> {
    const supabase = createServerClient()
    
    const updateData = {
      sold: true,
      sold_date: soldDate ? soldDate.toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .filter('id', 'eq', id)
      .select()
      .single()
    
    if (error) throw error
    
    // Return the product with calculations
    return await this.getById(data.id)
  },

  // Mark product as available (unsold)
  async markAsAvailable(id: string): Promise<any> {
    const supabase = createServerClient()
    
    const updateData = {
      sold: false,
      sold_date: null,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .filter('id', 'eq', id)
      .select()
      .single()
    
    if (error) throw error
    
    // Return the product with calculations
    return await this.getById(data.id)
  },

  // Delete product
  async delete(id: string): Promise<void> {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('products')
      .delete()
      .filter('id', 'eq', id)
    
    if (error) throw error
  },

  // Search products
  async search(query: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .or(`title.ilike.%${query}%,sku.ilike.%${query}%,color.ilike.%${query}%,barcode.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get products by supplier
  async getBySupplier(supplierId: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .filter('supplier_id', 'eq', supplierId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Check if SKU exists
  async skuExists(sku: string, excludeId?: string): Promise<boolean> {
    const supabase = createServerClient()
    let query = supabase
      .from('products')
      .select('id')
      .eq('sku', sku)
    
    if (excludeId) {
      query = query.neq('id', excludeId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return (data?.length || 0) > 0
  },

  // Check if barcode exists
  async barcodeExists(barcode: string, excludeId?: string): Promise<boolean> {
    const supabase = createServerClient()
    let query = supabase
      .from('products')
      .select('id')
      .eq('barcode', barcode)
    
    if (excludeId) {
      query = query.neq('id', excludeId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return (data?.length || 0) > 0
  }
}