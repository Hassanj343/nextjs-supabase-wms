import { SaleSchema } from '../sale'

describe('Sale Validation Schema', () => {
  const validSale = {
    customer_id: '123e4567-e89b-12d3-a456-426614174000',
    product_id: '987fcdeb-51a2-43d1-9f12-345678901234',
    sale_price: 150.00,
    currency: 'GBP' as const,
    payment_method: 'Credit Card',
    sale_date: new Date('2024-01-15T10:30:00Z'),
    notes: 'Customer was very satisfied with the purchase'
  }

  describe('Valid data', () => {
    it('should validate a complete sale', () => {
      const result = SaleSchema.safeParse(validSale)
      expect(result.success).toBe(true)
    })

    it('should validate sale without optional fields', () => {
      const minimalSale = {
        customer_id: '123e4567-e89b-12d3-a456-426614174000',
        product_id: '987fcdeb-51a2-43d1-9f12-345678901234',
        sale_price: 100.00,
        currency: 'INR' as const,
        payment_method: 'Cash'
      }
      const result = SaleSchema.safeParse(minimalSale)
      expect(result.success).toBe(true)
    })

    it('should validate sale with INR currency', () => {
      const sale = { ...validSale, currency: 'INR' as const, sale_price: 8000 }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(true)
    })

    it('should validate sale with GBP currency', () => {
      const sale = { ...validSale, currency: 'GBP' as const }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid data', () => {
    it('should reject invalid customer ID', () => {
      const sale = { ...validSale, customer_id: 'invalid-uuid' }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid customer ID')
      }
    })

    it('should reject invalid product ID', () => {
      const sale = { ...validSale, product_id: 'invalid-uuid' }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid product ID')
      }
    })

    it('should reject negative sale price', () => {
      const sale = { ...validSale, sale_price: -100 }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Sale price must be positive')
      }
    })

    it('should reject zero sale price', () => {
      const sale = { ...validSale, sale_price: 0 }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Sale price must be positive')
      }
    })

    it('should reject invalid currency', () => {
      const sale = { ...validSale, currency: 'USD' }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('invalid_value')
      }
    })

    it('should reject empty payment method', () => {
      const sale = { ...validSale, payment_method: '' }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Payment method is required')
      }
    })

    it('should reject missing required fields', () => {
      const sale = { sale_price: 100 }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1)
      }
    })
  })

  describe('Edge cases', () => {
    it('should handle very small positive sale prices', () => {
      const sale = { ...validSale, sale_price: 0.01 }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(true)
    })

    it('should handle very large sale prices', () => {
      const sale = { ...validSale, sale_price: 999999.99 }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(true)
    })

    it('should handle various payment methods', () => {
      const paymentMethods = [
        'Cash',
        'Credit Card',
        'Debit Card',
        'Bank Transfer',
        'Cheque',
        'PayPal',
        'Apple Pay',
        'Google Pay'
      ]

      paymentMethods.forEach(payment_method => {
        const sale = { ...validSale, payment_method }
        const result = SaleSchema.safeParse(sale)
        expect(result.success).toBe(true)
      })
    })

    it('should handle various date formats', () => {
      const dates = [
        new Date(),
        new Date('2024-01-01'),
        new Date('2023-12-31T23:59:59Z'),
        new Date('2024-06-15T12:00:00.000Z')
      ]

      dates.forEach(sale_date => {
        const sale = { ...validSale, sale_date }
        const result = SaleSchema.safeParse(sale)
        expect(result.success).toBe(true)
      })
    })

    it('should handle long notes', () => {
      const longNotes = 'This is a very long note about the sale. '.repeat(20)
      const sale = { ...validSale, notes: longNotes }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(true)
    })

    it('should handle empty notes', () => {
      const sale = { ...validSale, notes: '' }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(true)
    })

    it('should handle special characters in notes', () => {
      const specialNotes = 'Sale with special chars: £$€¥₹ & symbols @#%!'
      const sale = { ...validSale, notes: specialNotes }
      const result = SaleSchema.safeParse(sale)
      expect(result.success).toBe(true)
    })
  })

  describe('Real-world scenarios', () => {
    it('should validate jewelry sale in GBP', () => {
      const jewelrySale = {
        customer_id: '123e4567-e89b-12d3-a456-426614174000',
        product_id: '987fcdeb-51a2-43d1-9f12-345678901234',
        sale_price: 299.99,
        currency: 'GBP' as const,
        payment_method: 'Credit Card',
        sale_date: new Date(),
        notes: 'Gold ring with diamond, customer requested gift wrapping'
      }
      const result = SaleSchema.safeParse(jewelrySale)
      expect(result.success).toBe(true)
    })

    it('should validate jewelry sale in INR', () => {
      const jewelrySale = {
        customer_id: '123e4567-e89b-12d3-a456-426614174000',
        product_id: '987fcdeb-51a2-43d1-9f12-345678901234',
        sale_price: 25000,
        currency: 'INR' as const,
        payment_method: 'Bank Transfer',
        notes: 'Traditional gold necklace, festival purchase'
      }
      const result = SaleSchema.safeParse(jewelrySale)
      expect(result.success).toBe(true)
    })
  })
})