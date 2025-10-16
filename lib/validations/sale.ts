import { z } from 'zod'

export const SaleSchema = z.object({
  customer_id: z.string().uuid('Invalid customer ID'),
  product_id: z.string().uuid('Invalid product ID'),
  sale_price: z.number().positive('Sale price must be positive'),
  currency: z.enum(['INR', 'GBP'], {
    errorMap: () => ({ message: 'Currency must be INR or GBP' })
  }),
  payment_method: z.string().min(1, 'Payment method is required'),
  sale_date: z.date().optional(),
  notes: z.string().optional(),
})

export type SaleFormData = z.infer<typeof SaleSchema>