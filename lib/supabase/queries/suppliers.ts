import { createServerClient } from '../server'
import { SupplierFormData } from '@/lib/validations'

export const supplierQueries = {
  // Get all suppliers
  async getAll(): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get supplier by ID
  async getById(id: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create supplier
  async create(supplier: SupplierFormData): Promise<any> {
    const supabase = createServerClient()
    
    const insertData = {
      ...supplier,
      contact_person: supplier.contact_person || null,
      email: supplier.email || null,
      phone: supplier.phone || null,
      address: supplier.address || null,
      payment_terms: supplier.payment_terms || null,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('suppliers')
      .insert(insertData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update supplier
  async update(id: string, updates: Partial<SupplierFormData>): Promise<any> {
    const supabase = createServerClient()
    
    const updateData = {
      ...updates,
      contact_person: updates.contact_person || null,
      email: updates.email || null,
      phone: updates.phone || null,
      address: updates.address || null,
      payment_terms: updates.payment_terms || null,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('suppliers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete supplier
  async delete(id: string): Promise<void> {
    const supabase = createServerClient()
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get products by supplier
  async getProducts(supplierId: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('products_with_calculations')
      .select('*')
      .eq('supplier_id', supplierId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Search suppliers
  async search(query: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('suppliers')
      .select('*')
      .or(`name.ilike.%${query}%,contact_person.ilike.%${query}%,email.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Check if supplier email exists
  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    if (!email) return false
    
    const supabase = createServerClient()
    let query = supabase
      .from('suppliers')
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