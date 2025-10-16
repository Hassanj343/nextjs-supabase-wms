import { createServerClient } from '../server'

export const userRoleQueries = {
  // Get user role
  async getUserRole(userId: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .filter('user_id', 'eq', userId)
      .single()
    
    if (error) return 'sales_associate'
    return (data as any)?.role || 'sales_associate'
  },

  // Set user role (admin only)
  async setUserRole(userId: string, role: string) {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role } as any)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}