import { ProductSchema } from '../product'

describe('Product Validation Schema', () => {
  const validProduct = {
    title: 'Gold Ring',
    sku: 'GR001',
    color: 'Gold',
    inr_cost_price: 8000,
    inr_exchange_rate: 80,
    gbp_purchase_price: 100,
    gbp_sale_price: 150,
    barcode: '1234567890',
    supplier_id: '123e4567-e89b-12d3-a456-426614174000'
  }

  describe('Valid data', () => {
    it('should validate a complete product', () => {
      const result = ProductSchema.safeParse(validProduct)
      expect(result.success).toBe(true)
    })

    it('should validate product without optional fields', () => {
      const minimalProduct = {
        title: 'Silver Ring',
        sku: 'SR001',
        inr_cost_price: 5000,
        inr_exchange_rate: 80,
        gbp_purchase_price: 62.5,
        gbp_sale_price: 100,
        supplier_id: '123e4567-e89b-12d3-a456-426614174000'
      }
      const result = ProductSchema.safeParse(minimalProduct)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid data', () => {
    it('should reject empty title', () => {
      const product = { ...validProduct, title: '' }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title is required')
      }
    })

    it('should reject empty SKU', () => {
      const product = { ...validProduct, sku: '' }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('SKU is required')
      }
    })

    it('should reject negative cost price', () => {
      const product = { ...validProduct, inr_cost_price: -100 }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Cost price must be positive')
      }
    })

    it('should reject zero exchange rate', () => {
      const product = { ...validProduct, inr_exchange_rate: 0 }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Exchange rate must be positive')
      }
    })

    it('should reject negative purchase price', () => {
      const product = { ...validProduct, gbp_purchase_price: -50 }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Purchase price must be positive')
      }
    })

    it('should reject negative sale price', () => {
      const product = { ...validProduct, gbp_sale_price: -100 }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Sale price must be positive')
      }
    })

    it('should reject invalid supplier ID', () => {
      const product = { ...validProduct, supplier_id: 'invalid-uuid' }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid supplier ID')
      }
    })

    it('should reject missing required fields', () => {
      const product = { title: 'Test' }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1)
      }
    })
  })

  describe('Edge cases', () => {
    it('should handle very small positive numbers', () => {
      const product = {
        ...validProduct,
        inr_cost_price: 0.01,
        inr_exchange_rate: 0.01,
        gbp_purchase_price: 0.01,
        gbp_sale_price: 0.01
      }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(true)
    })

    it('should handle very large numbers', () => {
      const product = {
        ...validProduct,
        inr_cost_price: 999999999,
        inr_exchange_rate: 999,
        gbp_purchase_price: 999999,
        gbp_sale_price: 999999
      }
      const result = ProductSchema.safeParse(product)
      expect(result.success).toBe(true)
    })
  })
})