import { createServerClient } from '../server'

export const supplierQueries = {
  // Get all suppliers
  async getAll() {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get supplier by ID
  async getById(id: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .filter('id', 'eq', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create supplier
  async create(supplier: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suppliers')
      .insert(supplier)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update supplier
  async update(id: string, updates: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suppliers')
      .update(updates)
      .filter('id', 'eq', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete supplier
  async delete(id: string) {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .filter('id', 'eq', id)
    
    if (error) throw error
  },

  // Get products by supplier
  async getProducts(supplierId: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .filter('supplier_id', 'eq', supplierId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}