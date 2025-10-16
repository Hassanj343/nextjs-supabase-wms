import { z } from 'zod'

export const ProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sku: z.string().min(1, 'SKU is required'),
  color: z.string().optional(),
  inr_cost_price: z.number().positive('Cost price must be positive'),
  inr_exchange_rate: z.number().positive('Exchange rate must be positive'),
  gbp_purchase_price: z.number().positive('Purchase price must be positive'),
  gbp_sale_price: z.number().positive('Sale price must be positive'),
  barcode: z.string().optional(),
  supplier_id: z.string().uuid('Invalid supplier ID'),
})

export type ProductFormData = z.infer<typeof ProductSchema>
