import { createServerClient } from '../server'

export const customerQueries = {
  // Get all customers with totals
  async getAll() {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers_with_totals')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get customer by ID
  async getById(id: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .filter('id', 'eq', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create customer
  async create(customer: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers')
      .insert(customer)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update customer
  async update(id: string, updates: any) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .filter('id', 'eq', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete customer
  async delete(id: string) {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('customers')
      .delete()
      .filter('id', 'eq', id)
    
    if (error) throw error
  },

  // Search customers
  async search(query: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}