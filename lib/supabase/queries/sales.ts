import { createServerClient } from '../server'

export const salesQueries = {
  // Get all sales with details
  async getAll() {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get sale by ID
  async getById(id: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .filter('id', 'eq', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create sale
  async create(sale: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales')
      .insert(sale)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update sale
  async update(id: string, updates: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales')
      .update(updates)
      .filter('id', 'eq', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete sale
  async delete(id: string) {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('sales')
      .delete()
      .filter('id', 'eq', id)
    
    if (error) throw error
  },

  // Get sales by customer
  async getByCustomer(customerId: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .filter('customer_id', 'eq', customerId)
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get sales by date range
  async getByDateRange(startDate: string, endDate: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .gte('sale_date', startDate)
      .lte('sale_date', endDate)
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data
  }
}