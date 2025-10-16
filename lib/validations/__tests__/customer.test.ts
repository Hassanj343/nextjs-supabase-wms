import { CustomerSchema } from '../customer'

describe('Customer Validation Schema', () => {
  const validCustomer = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 7700 900123',
    address: '123 Main Street, London, UK'
  }

  describe('Valid data', () => {
    it('should validate a complete customer', () => {
      const result = CustomerSchema.safeParse(validCustomer)
      expect(result.success).toBe(true)
    })

    it('should validate customer with only name', () => {
      const minimalCustomer = { name: 'Jane Smith' }
      const result = CustomerSchema.safeParse(minimalCustomer)
      expect(result.success).toBe(true)
    })

    it('should validate customer with empty string email', () => {
      const customer = { ...validCustomer, email: '' }
      const result = CustomerSchema.safeParse(customer)
      expect(result.success).toBe(true)
    })

    it('should validate customer without optional fields', () => {
      const customer = {
        name: 'Bob Wilson',
        email: undefined,
        phone: undefined,
        address: undefined
      }
      const result = CustomerSchema.safeParse(customer)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid data', () => {
    it('should reject empty name', () => {
      const customer = { ...validCustomer, name: '' }
      const result = CustomerSchema.safeParse(customer)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name is required')
      }
    })

    it('should reject invalid email format', () => {
      const customer = { ...validCustomer, email: 'invalid-email' }
      const result = CustomerSchema.safeParse(customer)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email')
      }
    })

    it('should reject missing name', () => {
      const customer = {
        email: 'test@example.com',
        phone: '123456789'
      }
      const result = CustomerSchema.safeParse(customer)
      expect(result.success).toBe(false)
    })
  })

  describe('Edge cases', () => {
    it('should handle very long names', () => {
      const longName = 'A'.repeat(100)
      const customer = { ...validCustomer, name: longName }
      const result = CustomerSchema.safeParse(customer)
      expect(result.success).toBe(true)
    })

    it('should handle various email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com'
      ]

      validEmails.forEach(email => {
        const customer = { ...validCustomer, email }
        const result = CustomerSchema.safeParse(customer)
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'plainaddress',
        '@missingdomain.com',
        'missing@.com',
        'spaces @domain.com',
        'double@@domain.com'
      ]

      invalidEmails.forEach(email => {
        const customer = { ...validCustomer, email }
        const result = CustomerSchema.safeParse(customer)
        expect(result.success).toBe(false)
      })
    })

    it('should handle international phone numbers', () => {
      const phoneNumbers = [
        '+44 7700 900123',
        '+1 555 123 4567',
        '+91 98765 43210',
        '07700 900123',
        '(555) 123-4567'
      ]

      phoneNumbers.forEach(phone => {
        const customer = { ...validCustomer, phone }
        const result = CustomerSchema.safeParse(customer)
        expect(result.success).toBe(true)
      })
    })

    it('should handle multi-line addresses', () => {
      const address = `123 Main Street
Apartment 4B
London, UK
SW1A 1AA`
      const customer = { ...validCustomer, address }
      const result = CustomerSchema.safeParse(customer)
      expect(result.success).toBe(true)
    })
  })
})