-- Enable Row Level Security on all tables
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role 
    FROM user_roles 
    WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is authenticated
CREATE OR REPLACE FUNCTION is_authenticated()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has admin or manager role
CREATE OR REPLACE FUNCTION is_admin_or_manager()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN get_user_role(auth.uid()) IN ('admin', 'manager');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Suppliers RLS Policies
-- All authenticated users can read suppliers
CREATE POLICY "Authenticated users can read suppliers" ON suppliers
  FOR SELECT USING (is_authenticated());

-- Only admins and managers can insert suppliers
CREATE POLICY "Admins and managers can insert suppliers" ON suppliers
  FOR INSERT WITH CHECK (is_admin_or_manager());

-- Only admins and managers can update suppliers
CREATE POLICY "Admins and managers can update suppliers" ON suppliers
  FOR UPDATE USING (is_admin_or_manager());

-- Only admins can delete suppliers
CREATE POLICY "Only admins can delete suppliers" ON suppliers
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

-- Customers RLS Policies
-- All authenticated users can read customers
CREATE POLICY "Authenticated users can read customers" ON customers
  FOR SELECT USING (is_authenticated());

-- All authenticated users can insert customers (for sales)
CREATE POLICY "Authenticated users can insert customers" ON customers
  FOR INSERT WITH CHECK (is_authenticated());

-- Only admins and managers can update customers
CREATE POLICY "Admins and managers can update customers" ON customers
  FOR UPDATE USING (is_admin_or_manager());

-- Only admins can delete customers
CREATE POLICY "Only admins can delete customers" ON customers
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

-- Products RLS Policies
-- All authenticated users can read products
CREATE POLICY "Authenticated users can read products" ON products
  FOR SELECT USING (is_authenticated());

-- Only admins and managers can insert products
CREATE POLICY "Admins and managers can insert products" ON products
  FOR INSERT WITH CHECK (is_admin_or_manager());

-- Only admins and managers can update products
CREATE POLICY "Admins and managers can update products" ON products
  FOR UPDATE USING (is_admin_or_manager());

-- Only admins can delete products
CREATE POLICY "Only admins can delete products" ON products
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

-- Sales RLS Policies
-- All authenticated users can read sales
CREATE POLICY "Authenticated users can read sales" ON sales
  FOR SELECT USING (is_authenticated());

-- All authenticated users can insert sales (for processing transactions)
CREATE POLICY "Authenticated users can insert sales" ON sales
  FOR INSERT WITH CHECK (is_authenticated());

-- Only admins and managers can update sales
CREATE POLICY "Admins and managers can update sales" ON sales
  FOR UPDATE USING (is_admin_or_manager());

-- Only admins can delete sales
CREATE POLICY "Only admins can delete sales" ON sales
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

-- User Roles RLS Policies
-- Users can read their own role
CREATE POLICY "Users can read their own role" ON user_roles
  FOR SELECT USING (user_id = auth.uid());

-- Only admins can manage user roles
CREATE POLICY "Only admins can insert user roles" ON user_roles
  FOR INSERT WITH CHECK (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can update user roles" ON user_roles
  FOR UPDATE USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete user roles" ON user_roles
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');