import {
  calculateProfit,
  calculateProfitMargin,
  convertINRtoGBP,
  convertGBPtoINR,
  calculateGBPPurchasePrice,
  calculateINRSalePrice,
  formatCurrency,
  roundCurrency
} from '../calculations'

describe('Calculation Utilities', () => {
  describe('calculateProfit', () => {
    it('should calculate profit correctly', () => {
      expect(calculateProfit(100, 80)).toBe(20)
      expect(calculateProfit(50, 30)).toBe(20)
      expect(calculateProfit(100, 100)).toBe(0)
    })

    it('should handle negative profit', () => {
      expect(calculateProfit(80, 100)).toBe(-20)
    })
  })

  describe('calculateProfitMargin', () => {
    it('should calculate profit margin percentage correctly', () => {
      expect(calculateProfitMargin(100, 80)).toBe(20) // (100-80)/100 * 100 = 20%
      expect(calculateProfitMargin(50, 40)).toBe(20) // (50-40)/50 * 100 = 20%
      expect(calculateProfitMargin(100, 100)).toBe(0) // No profit
    })

    it('should handle zero sale price', () => {
      expect(calculateProfitMargin(0, 50)).toBe(0)
    })

    it('should handle negative margin', () => {
      expect(calculateProfitMargin(80, 100)).toBe(-25) // (80-100)/80 * 100 = -25%
    })
  })

  describe('convertINRtoGBP', () => {
    it('should convert INR to GBP correctly', () => {
      expect(convertINRtoGBP(100, 80)).toBe(1.25) // 100/80 = 1.25
      expect(convertINRtoGBP(1000, 100)).toBe(10) // 1000/100 = 10
    })

    it('should handle zero exchange rate', () => {
      expect(convertINRtoGBP(100, 0)).toBe(0)
    })

    it('should handle zero amount', () => {
      expect(convertINRtoGBP(0, 80)).toBe(0)
    })
  })

  describe('convertGBPtoINR', () => {
    it('should convert GBP to INR correctly', () => {
      expect(convertGBPtoINR(1, 80)).toBe(80) // 1 * 80 = 80
      expect(convertGBPtoINR(10, 100)).toBe(1000) // 10 * 100 = 1000
    })

    it('should handle zero values', () => {
      expect(convertGBPtoINR(0, 80)).toBe(0)
      expect(convertGBPtoINR(10, 0)).toBe(0)
    })
  })

  describe('calculateGBPPurchasePrice', () => {
    it('should calculate GBP purchase price from INR cost', () => {
      expect(calculateGBPPurchasePrice(8000, 80)).toBe(100) // 8000/80 = 100
      expect(calculateGBPPurchasePrice(5000, 100)).toBe(50) // 5000/100 = 50
    })
  })

  describe('calculateINRSalePrice', () => {
    it('should calculate INR sale price from GBP sale price', () => {
      expect(calculateINRSalePrice(100, 80)).toBe(8000) // 100 * 80 = 8000
      expect(calculateINRSalePrice(50, 100)).toBe(5000) // 50 * 100 = 5000
    })
  })

  describe('formatCurrency', () => {
    it('should format GBP currency correctly', () => {
      const result = formatCurrency(100.50, 'GBP')
      expect(result).toMatch(/£100\.50|GBP\s*100\.50/)
    })

    it('should format INR currency correctly', () => {
      const result = formatCurrency(1000.75, 'INR')
      expect(result).toMatch(/₹1,000\.75|INR\s*1,000\.75/)
    })

    it('should handle zero values', () => {
      const gbpResult = formatCurrency(0, 'GBP')
      const inrResult = formatCurrency(0, 'INR')
      expect(gbpResult).toMatch(/£0\.00|GBP\s*0\.00/)
      expect(inrResult).toMatch(/₹0\.00|INR\s*0\.00/)
    })
  })

  describe('roundCurrency', () => {
    it('should round to 2 decimal places', () => {
      expect(roundCurrency(100.123)).toBe(100.12)
      expect(roundCurrency(100.126)).toBe(100.13)
      expect(roundCurrency(100.125)).toBe(100.13) // Banker's rounding
    })

    it('should handle whole numbers', () => {
      expect(roundCurrency(100)).toBe(100)
    })

    it('should handle negative numbers', () => {
      expect(roundCurrency(-100.123)).toBe(-100.12)
      expect(roundCurrency(-100.126)).toBe(-100.13)
    })
  })

  describe('Real-world scenarios', () => {
    it('should handle jewelry pricing scenario', () => {
      const inrCostPrice = 8000 // ₹8000
      const exchangeRate = 80 // 1 GBP = 80 INR
      const gbpSalePrice = 150 // £150

      const gbpPurchasePrice = calculateGBPPurchasePrice(inrCostPrice, exchangeRate)
      expect(gbpPurchasePrice).toBe(100) // £100

      const profit = calculateProfit(gbpSalePrice, gbpPurchasePrice)
      expect(profit).toBe(50) // £50 profit

      const profitMargin = calculateProfitMargin(gbpSalePrice, gbpPurchasePrice)
      expect(profitMargin).toBeCloseTo(33.33, 2) // 33.33% margin

      const inrSalePrice = calculateINRSalePrice(gbpSalePrice, exchangeRate)
      expect(inrSalePrice).toBe(12000) // ₹12000
    })

    it('should handle exchange rate changes', () => {
      const inrCostPrice = 8000
      const oldRate = 80
      const newRate = 85

      const oldGbpPrice = calculateGBPPurchasePrice(inrCostPrice, oldRate)
      const newGbpPrice = calculateGBPPurchasePrice(inrCostPrice, newRate)

      expect(oldGbpPrice).toBe(100)
      expect(newGbpPrice).toBeCloseTo(94.12, 2)

      // When INR weakens (higher exchange rate), GBP purchase price decreases
      expect(newGbpPrice).toBeLessThan(oldGbpPrice)
    })
  })
})