import { createServerClient } from '../server'
import { SaleFormData } from '@/lib/validations'

export const salesQueries = {
  // Get all sales with details
  async getAll(): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get sale by ID
  async getById(id: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get sale with details by ID
  async getByIdWithDetails(id: string): Promise<any> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create sale and mark product as sold
  async create(sale: SaleFormData): Promise<any> {
    const supabase = createServerClient()
    
    const insertData = {
      ...sale,
      customer_id: sale.customer_id || null,
      product_id: sale.product_id || null,
      payment_method: sale.payment_method || null,
      sale_date: sale.sale_date ? sale.sale_date.toISOString() : new Date().toISOString(),
      notes: sale.notes || null
    }
    
    const { data, error } = await supabase
      .from('sales')
      .insert(insertData)
      .select()
      .single()
    
    if (error) throw error
    
    // Mark the product as sold if product_id is provided
    if (sale.product_id) {
      const { error: productError } = await supabase
        .from('products')
        .update({
          sold: true,
          sold_date: insertData.sale_date,
          updated_at: new Date().toISOString()
        })
        .eq('id', sale.product_id)
      
      if (productError) throw productError
    }
    
    return data
  },

  // Update sale
  async update(id: string, updates: Partial<SaleFormData>): Promise<any> {
    const supabase = createServerClient()
    
    const updateData = {
      ...updates,
      customer_id: updates.customer_id || null,
      product_id: updates.product_id || null,
      payment_method: updates.payment_method || null,
      sale_date: updates.sale_date ? updates.sale_date.toISOString() : undefined,
      notes: updates.notes || null
    }
    
    const { data, error } = await supabase
      .from('sales')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete sale and mark product as available
  async delete(id: string): Promise<void> {
    const supabase = createServerClient()
    
    // First get the sale to find the product
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .select('product_id')
      .eq('id', id)
      .single()
    
    if (saleError) throw saleError
    
    // Delete the sale
    const { error } = await supabase
      .from('sales')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    // Mark the product as available if product_id exists
    if (sale?.product_id) {
      const { error: productError } = await supabase
        .from('products')
        .update({
          sold: false,
          sold_date: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', sale.product_id)
      
      if (productError) throw productError
    }
  },

  // Get sales by customer
  async getByCustomer(customerId: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .eq('customer_id', customerId)
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get sales by product
  async getByProduct(productId: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .eq('product_id', productId)
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get sales by date range
  async getByDateRange(startDate: string, endDate: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .gte('sale_date', startDate)
      .lte('sale_date', endDate)
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Get sales by currency
  async getByCurrency(currency: 'INR' | 'GBP'): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .eq('currency', currency)
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Search sales
  async search(query: string): Promise<any[]> {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales_detailed')
      .select('*')
      .or(`customer_name.ilike.%${query}%,product_title.ilike.%${query}%,product_sku.ilike.%${query}%,payment_method.ilike.%${query}%`)
      .order('sale_date', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}