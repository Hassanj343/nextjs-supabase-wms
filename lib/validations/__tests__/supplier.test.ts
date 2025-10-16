import { SupplierSchema } from '../supplier'

describe('Supplier Validation Schema', () => {
  const validSupplier = {
    name: 'Gold Suppliers Ltd',
    contact_person: 'Alice Johnson',
    email: 'alice@goldsuppliers.com',
    phone: '+44 20 7946 0958',
    address: '456 Business Park, Birmingham, UK',
    payment_terms: 'Net 30 days'
  }

  describe('Valid data', () => {
    it('should validate a complete supplier', () => {
      const result = SupplierSchema.safeParse(validSupplier)
      expect(result.success).toBe(true)
    })

    it('should validate supplier with only name', () => {
      const minimalSupplier = { name: 'Silver Suppliers Inc' }
      const result = SupplierSchema.safeParse(minimalSupplier)
      expect(result.success).toBe(true)
    })

    it('should validate supplier with empty string email', () => {
      const supplier = { ...validSupplier, email: '' }
      const result = SupplierSchema.safeParse(supplier)
      expect(result.success).toBe(true)
    })

    it('should validate supplier without optional fields', () => {
      const supplier = {
        name: 'Gem Suppliers Co',
        contact_person: undefined,
        email: undefined,
        phone: undefined,
        address: undefined,
        payment_terms: undefined
      }
      const result = SupplierSchema.safeParse(supplier)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid data', () => {
    it('should reject empty name', () => {
      const supplier = { ...validSupplier, name: '' }
      const result = SupplierSchema.safeParse(supplier)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name is required')
      }
    })

    it('should reject invalid email format', () => {
      const supplier = { ...validSupplier, email: 'invalid-email' }
      const result = SupplierSchema.safeParse(supplier)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email')
      }
    })

    it('should reject missing name', () => {
      const supplier = {
        contact_person: 'John Smith',
        email: 'john@example.com'
      }
      const result = SupplierSchema.safeParse(supplier)
      expect(result.success).toBe(false)
    })
  })

  describe('Edge cases', () => {
    it('should handle very long company names', () => {
      const longName = 'Very Long Company Name '.repeat(10)
      const supplier = { ...validSupplier, name: longName }
      const result = SupplierSchema.safeParse(supplier)
      expect(result.success).toBe(true)
    })

    it('should handle various email formats', () => {
      const validEmails = [
        'contact@supplier.com',
        'sales.team@big-supplier.co.uk',
        'info+orders@supplier.org',
        'supplier123@test-domain.com'
      ]

      validEmails.forEach(email => {
        const supplier = { ...validSupplier, email }
        const result = SupplierSchema.safeParse(supplier)
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
        const supplier = { ...validSupplier, email }
        const result = SupplierSchema.safeParse(supplier)
        expect(result.success).toBe(false)
      })
    })

    it('should handle various payment terms', () => {
      const paymentTerms = [
        'Net 30 days',
        'Payment on delivery',
        '2/10 Net 30',
        'Cash on delivery (COD)',
        'Net 60 days',
        'Immediate payment required'
      ]

      paymentTerms.forEach(terms => {
        const supplier = { ...validSupplier, payment_terms: terms }
        const result = SupplierSchema.safeParse(supplier)
        expect(result.success).toBe(true)
      })
    })

    it('should handle international business addresses', () => {
      const addresses = [
        '123 Business Street, London, UK',
        '456 Industrial Ave, Suite 100, New York, NY 10001, USA',
        'Plot 789, Sector 12, Mumbai, Maharashtra 400001, India',
        'Unit 5, Industrial Estate, Birmingham B1 1AA, UK'
      ]

      addresses.forEach(address => {
        const supplier = { ...validSupplier, address }
        const result = SupplierSchema.safeParse(supplier)
        expect(result.success).toBe(true)
      })
    })

    it('should handle various contact person name formats', () => {
      const contactPersons = [
        'John Smith',
        'Dr. Sarah Johnson',
        'Mr. Ahmed Al-Rashid',
        'Ms. Li Wei',
        'Prof. Maria Garcia-Lopez'
      ]

      contactPersons.forEach(contact_person => {
        const supplier = { ...validSupplier, contact_person }
        const result = SupplierSchema.safeParse(supplier)
        expect(result.success).toBe(true)
      })
    })
  })
})