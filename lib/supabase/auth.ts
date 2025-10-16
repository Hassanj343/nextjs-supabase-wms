import { createServerClient } from './server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

// Cache the user session for the duration of the request
export const getUser = cache(async () => {
  const supabase = createServerClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error getting user:', error)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error in getUser:', error)
    return null
  }
})

// Get user session
export const getSession = cache(async () => {
  const supabase = createServerClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Error in getSession:', error)
    return null
  }
})

// Get user role
export const getUserRole = cache(async () => {
  const user = await getUser()
  
  if (!user) {
    return null
  }
  
  const { userRoleQueries } = await import('./queries')
  
  try {
    return await userRoleQueries.getUserRole(user.id)
  } catch (error) {
    console.error('Error in getUserRole:', error)
    return 'sales_associate'
  }
})

// Check if user has required role
export const hasRole = async (requiredRoles: string | string[]) => {
  const userRole = await getUserRole()
  
  if (!userRole) {
    return false
  }
  
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
  return roles.includes(userRole)
}

// Check if user is admin
export const isAdmin = async () => {
  return await hasRole('admin')
}

// Check if user is admin or manager
export const isAdminOrManager = async () => {
  return await hasRole(['admin', 'manager'])
}

// Require authentication - redirect to login if not authenticated
export const requireAuth = async () => {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return user
}

// Require specific role - redirect to unauthorized if insufficient permissions
export const requireRole = async (requiredRoles: string | string[]) => {
  const user = await requireAuth()
  const hasRequiredRole = await hasRole(requiredRoles)
  
  if (!hasRequiredRole) {
    redirect('/unauthorized')
  }
  
  return user
}

// Sign out helper
export const signOut = async () => {
  const supabase = createServerClient()
  
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
    
    redirect('/login')
  } catch (error) {
    console.error('Error in signOut:', error)
    throw error
  }
}