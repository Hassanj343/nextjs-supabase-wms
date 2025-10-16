# Supabase Database Setup

This directory contains the database schema, migrations, and configuration for the InventoryFlow application.

## Quick Setup

### Option 1: Using Supabase CLI (Recommended for local development)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Initialize Supabase in your project (if not already done):
   ```bash
   supabase init
   ```

3. Start local Supabase:
   ```bash
   supabase start
   ```

4. Apply migrations:
   ```bash
   supabase db reset
   ```

### Option 2: Using Supabase Dashboard (For hosted projects)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the contents of `scripts/setup-database.sql`
4. Then run each migration file in order:
   - `migrations/20241016000001_initial_schema.sql`
   - `migrations/20241016000002_rls_policies.sql`
   - `migrations/20241016000003_functions_and_views.sql`

## Environment Variables

Make sure to set up your environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Database Schema

### Tables

- **suppliers**: Supplier information and contact details
- **customers**: Customer information and contact details
- **products**: Product inventory with pricing and supplier relationships
- **sales**: Sales transactions linking customers and products
- **user_roles**: User role assignments for RBAC

### Views

- **products_with_calculations**: Products with calculated profit margins and supplier names
- **customers_with_totals**: Customers with total purchase amounts and order counts
- **sales_detailed**: Sales with customer and product details
- **inventory_analytics**: Aggregated inventory statistics

### Functions

- **calculate_product_profit**: Calculate profit from sale and purchase prices
- **calculate_profit_margin**: Calculate profit margin percentage
- **convert_inr_to_gbp**: Convert INR to GBP using exchange rate
- **convert_gbp_to_inr**: Convert GBP to INR using exchange rate

### Security

Row Level Security (RLS) is enabled on all tables with the following policies:

- **Read access**: All authenticated users can read data
- **Insert access**: All users can insert customers and sales; only admins/managers can insert products and suppliers
- **Update access**: Only admins/managers can update products and suppliers; all users can update customers
- **Delete access**: Only admins can delete records

## Usage

The database queries are abstracted through the query functions in `lib/supabase/queries.ts`. Use these functions instead of writing raw SQL queries:

```typescript
import { productQueries, customerQueries, supplierQueries, salesQueries } from '@/lib/supabase/queries'

// Get all products
const products = await productQueries.getAll()

// Create a new customer
const customer = await customerQueries.create({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890'
})
```

## Local Development

For local development, use the Supabase CLI to run a local instance:

```bash
# Start local Supabase
supabase start

# View local dashboard
supabase dashboard

# Reset database (applies all migrations)
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts
```

## Production Deployment

1. Create a new Supabase project at https://supabase.com
2. Run the migration files in the SQL editor
3. Update your environment variables with the production URLs and keys
4. Deploy your Next.js application with the updated environment variables