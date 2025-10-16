// Application constants
export const APP_NAME = 'InventoryFlow'
export const APP_DESCRIPTION =
  'Modern inventory management for jewelry businesses'

// Currency constants
export const CURRENCIES = {
  INR: 'INR',
  GBP: 'GBP',
} as const

export type Currency = keyof typeof CURRENCIES

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES_ASSOCIATE: 'sales_associate',
} as const

export type UserRole = keyof typeof USER_ROLES

// API endpoints
export const API_ENDPOINTS = {
  INVENTORY: '/api/inventory',
  CUSTOMERS: '/api/customers',
  SUPPLIERS: '/api/suppliers',
  SALES: '/api/sales',
  MCP: '/api/mcp',
} as const
