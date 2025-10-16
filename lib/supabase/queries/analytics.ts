import { createServerClient } from '../server'

export const analyticsQueries = {
  // Get inventory analytics
  async getInventoryAnalytics() {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('inventory_analytics')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  },

  // Get sales analytics for date range
  async getSalesAnalytics(startDate: string, endDate: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('sales')
      .select('sale_price, currency, sale_date')
      .gte('sale_date', startDate)
      .lte('sale_date', endDate)
    
    if (error) throw error
    return data
  }
}