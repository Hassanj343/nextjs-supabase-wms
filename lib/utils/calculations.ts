/**
 * Utility functions for profit calculations and currency conversion
 */

/**
 * Calculate profit in GBP
 */
export function calculateProfit(gbpSalePrice: number, gbpPurchasePrice: number): number {
  return gbpSalePrice - gbpPurchasePrice
}

/**
 * Calculate profit margin as a percentage
 */
export function calculateProfitMargin(gbpSalePrice: number, gbpPurchasePrice: number): number {
  if (gbpSalePrice === 0) return 0
  const profit = calculateProfit(gbpSalePrice, gbpPurchasePrice)
  return (profit / gbpSalePrice) * 100
}

/**
 * Convert INR amount to GBP using exchange rate
 */
export function convertINRtoGBP(inrAmount: number, exchangeRate: number): number {
  if (exchangeRate === 0) return 0
  return inrAmount / exchangeRate
}

/**
 * Convert GBP amount to INR using exchange rate
 */
export function convertGBPtoINR(gbpAmount: number, exchangeRate: number): number {
  return gbpAmount * exchangeRate
}

/**
 * Calculate GBP purchase price from INR cost price and exchange rate
 */
export function calculateGBPPurchasePrice(inrCostPrice: number, exchangeRate: number): number {
  return convertINRtoGBP(inrCostPrice, exchangeRate)
}

/**
 * Calculate INR sale price from GBP sale price and exchange rate
 */
export function calculateINRSalePrice(gbpSalePrice: number, exchangeRate: number): number {
  return convertGBPtoINR(gbpSalePrice, exchangeRate)
}

/**
 * Format currency value for display
 */
export function formatCurrency(amount: number, currency: 'INR' | 'GBP'): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  return formatter.format(amount)
}

/**
 * Round currency value to 2 decimal places
 */
export function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100
}