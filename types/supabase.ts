export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          title: string
          sku: string
          color: string | null
          inr_cost_price: number
          inr_exchange_rate: number
          gbp_purchase_price: number
          gbp_sale_price: number
          sold: boolean
          sold_date: string | null
          barcode: string | null
          supplier_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          sku: string
          color?: string | null
          inr_cost_price: number
          inr_exchange_rate: number
          gbp_purchase_price: number
          gbp_sale_price: number
          sold?: boolean
          sold_date?: string | null
          barcode?: string | null
          supplier_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          sku?: string
          color?: string | null
          inr_cost_price?: number
          inr_exchange_rate?: number
          gbp_purchase_price?: number
          gbp_sale_price?: number
          sold?: boolean
          sold_date?: string | null
          barcode?: string | null
          supplier_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          }
        ]
      }
      sales: {
        Row: {
          id: string
          customer_id: string | null
          product_id: string | null
          sale_price: number
          currency: string
          payment_method: string | null
          sale_date: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          product_id?: string | null
          sale_price: number
          currency: string
          payment_method?: string | null
          sale_date?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          product_id?: string | null
          sale_price?: number
          currency?: string
          payment_method?: string | null
          sale_date?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      suppliers: {
        Row: {
          id: string
          name: string
          contact_person: string | null
          email: string | null
          phone: string | null
          address: string | null
          payment_terms: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          payment_terms?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          payment_terms?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      customers_with_totals: {
        Row: {
          id: string | null
          name: string | null
          email: string | null
          phone: string | null
          address: string | null
          created_at: string | null
          updated_at: string | null
          total_purchases_gbp: number | null
          total_orders: number | null
        }
        Relationships: []
      }
      inventory_analytics: {
        Row: {
          total_products: number | null
          available_products: number | null
          sold_products: number | null
          total_inventory_value_gbp: number | null
          potential_revenue_gbp: number | null
          potential_profit_gbp: number | null
          avg_profit_margin_percent: number | null
        }
        Relationships: []
      }
      products_with_calculations: {
        Row: {
          id: string | null
          title: string | null
          sku: string | null
          color: string | null
          inr_cost_price: number | null
          inr_exchange_rate: number | null
          gbp_purchase_price: number | null
          gbp_sale_price: number | null
          sold: boolean | null
          sold_date: string | null
          barcode: string | null
          supplier_id: string | null
          created_at: string | null
          updated_at: string | null
          profit: number | null
          profit_margin_percent: number | null
          inr_sale_price: number | null
          supplier_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          }
        ]
      }
      sales_detailed: {
        Row: {
          id: string | null
          customer_id: string | null
          product_id: string | null
          sale_price: number | null
          currency: string | null
          payment_method: string | null
          sale_date: string | null
          notes: string | null
          created_at: string | null
          customer_name: string | null
          customer_email: string | null
          product_title: string | null
          product_sku: string | null
          product_color: string | null
          supplier_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      calculate_product_profit: {
        Args: {
          gbp_sale_price: number
          gbp_purchase_price: number
        }
        Returns: number
      }
      calculate_profit_margin: {
        Args: {
          gbp_sale_price: number
          gbp_purchase_price: number
        }
        Returns: number
      }
      convert_gbp_to_inr: {
        Args: {
          gbp_amount: number
          exchange_rate: number
        }
        Returns: number
      }
      convert_inr_to_gbp: {
        Args: {
          inr_amount: number
          exchange_rate: number
        }
        Returns: number
      }
      get_user_role: {
        Args: {
          user_uuid: string
        }
        Returns: string
      }
      is_admin_or_manager: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_authenticated: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Type helpers for easier usage
export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never