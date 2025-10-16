import { createServerClient } from '../server'

export const productQueries = {
  // Get all products with calculations
  async getAll() {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get available (unsold) products
  async getAvailable() {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .filter('sold', 'eq', false)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get product by ID
  async getById(id: string) {
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
  async getBySku(sku: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .filter('sku', 'eq', sku)
      .single()
    
    if (error) throw error
    return data
  },

  // Get product by barcode
  async getByBarcode(barcode: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .filter('barcode', 'eq', barcode)
      .single()
    
    if (error) throw error
    return data
  },

  // Create product
  async create(product: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update product
  async update(id: string, updates: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .filter('id', 'eq', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete product
  async delete(id: string) {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('products')
      .delete()
      .filter('id', 'eq', id)
    
    if (error) throw error
  },

  // Search products
  async search(query: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .or(`title.ilike.%${query}%,sku.ilike.%${query}%,color.ilike.%${query}%,barcode.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}