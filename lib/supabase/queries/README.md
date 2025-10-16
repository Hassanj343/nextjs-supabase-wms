# Supabase Queries - Modular Structure

This directory contains modular query functions organized by entity type. Each file contains all the database operations for a specific entity.

## Structure

- `products.ts` - Product-related queries (CRUD, search, filtering)
- `customers.ts` - Customer-related queries (CRUD, search)
- `suppliers.ts` - Supplier-related queries (CRUD, product relationships)
- `sales.ts` - Sales transaction queries (CRUD, reporting, filtering)
- `analytics.ts` - Analytics and reporting queries
- `user-roles.ts` - User role management queries
- `index.ts` - Re-exports all query modules for convenience

## Usage

### Import all queries
```typescript
import { productQueries, customerQueries, salesQueries } from '@/lib/supabase/queries'

// Use the queries
const products = await productQueries.getAll()
const customers = await customerQueries.getAll()
```

### Import specific query modules
```typescript
import { productQueries } from '@/lib/supabase/queries/products'
import { salesQueries } from '@/lib/supabase/queries/sales'

// Use specific queries
const availableProducts = await productQueries.getAvailable()
const recentSales = await salesQueries.getAll()
```

### Import individual functions (if needed)
```typescript
import { productQueries } from '@/lib/supabase/queries/products'

const { getAll, getById, create } = productQueries
```

## Benefits of Modular Structure

1. **Better Organization**: Each entity has its own file, making it easier to find and maintain queries
2. **Reduced Bundle Size**: Import only what you need
3. **Better Developer Experience**: Smaller files are easier to navigate and understand
4. **Easier Testing**: Test individual query modules in isolation
5. **Clear Separation of Concerns**: Each file has a single responsibility

## Query Patterns

All query functions follow consistent patterns:

- **Error Handling**: All functions throw errors on database failures
- **Type Safety**: Uses TypeScript for better development experience
- **Consistent Naming**: `getAll()`, `getById()`, `create()`, `update()`, `delete()`, `search()`
- **Server-Side**: All queries use `createServerClient()` for server-side operations