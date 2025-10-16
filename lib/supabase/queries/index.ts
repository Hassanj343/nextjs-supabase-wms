// Re-export all query modules for easy importing
export { productQueries } from './products'
export { customerQueries } from './customers'
export { supplierQueries } from './suppliers'
export { salesQueries } from './sales'
export { analyticsQueries } from './analytics'
export { userRoleQueries } from './user-roles'

// You can now import like:
// import { productQueries, customerQueries } from '@/lib/supabase/queries'
// or import individual modules:
// import { productQueries } from '@/lib/supabase/queries/products'