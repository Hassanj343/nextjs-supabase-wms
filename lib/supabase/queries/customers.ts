import { createServerClient } from '../server'
import { CustomerFormData } from '@/lib/validations'

export const customerQueries = {
  // Get all customers with totals
  async getAll(): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers_with_totals')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get customer by ID
  async getById(id: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get customer with totals by ID
  async getByIdWithTotals(id: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers_with_totals')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create customer
  async create(customer: CustomerFormData): Promise<any> {
    const supabase = createServerClient()
    
    const insertData = {
      ...customer,
      email: customer.email || null,
      phone: customer.phone || null,
      address: customer.address || null,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('customers')
      .insert(insertData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update customer
  async update(id: string, updates: Partial<CustomerFormData>): Promise<any> {
    const supabase = createServerClient()
    
    const updateData = {
      ...updates,
      email: updates.email || null,
      phone: updates.phone || null,
      address: updates.address || null,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('customers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete customer
  async delete(id: string): Promise<void> {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Search customers
  async search(query: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('customers_with_totals')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Check if email exists
  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    if (!email) return false
    
    const supabase = createServerClient()
    let query = supabase
      .from('customers')
      .select('id')
      .eq('email', email)
    
    if (excludeId) {
      query = query.neq('id', excludeId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return (data?.length || 0) > 0
  }
}