-- Function to calculate product profit
CREATE OR REPLACE FUNCTION calculate_product_profit(
  gbp_sale_price DECIMAL,
  gbp_purchase_price DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
  RETURN gbp_sale_price - gbp_purchase_price;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to calculate profit margin percentage
CREATE OR REPLACE FUNCTION calculate_profit_margin(
  gbp_sale_price DECIMAL,
  gbp_purchase_price DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
  IF gbp_sale_price = 0 THEN
    RETURN 0;
  END IF;
  RETURN ((gbp_sale_price - gbp_purchase_price) / gbp_sale_price) * 100;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to convert INR to GBP
CREATE OR REPLACE FUNCTION convert_inr_to_gbp(
  inr_amount DECIMAL,
  exchange_rate DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
  IF exchange_rate = 0 THEN
    RETURN 0;
  END IF;
  RETURN inr_amount / exchange_rate;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to convert GBP to INR
CREATE OR REPLACE FUNCTION convert_gbp_to_inr(
  gbp_amount DECIMAL,
  exchange_rate DECIMAL
)
RETURNS DECIMAL AS $$
BEGIN
  RETURN gbp_amount * exchange_rate;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- View for products with calculated fields
CREATE OR REPLACE VIEW products_with_calculations AS
SELECT 
  p.*,
  calculate_product_profit(p.gbp_sale_price, p.gbp_purchase_price) as profit,
  calculate_profit_margin(p.gbp_sale_price, p.gbp_purchase_price) as profit_margin_percent,
  convert_gbp_to_inr(p.gbp_sale_price, p.inr_exchange_rate) as inr_sale_price,
  s.name as supplier_name
FROM products p
LEFT JOIN suppliers s ON p.supplier_id = s.id;

-- View for customers with total purchases
CREATE OR REPLACE VIEW customers_with_totals AS
SELECT 
  c.*,
  COALESCE(SUM(s.sale_price), 0) as total_purchases_gbp,
  COUNT(s.id) as total_orders
FROM customers c
LEFT JOIN sales s ON c.id = s.customer_id
GROUP BY c.id, c.name, c.email, c.phone, c.address, c.created_at, c.updated_at;

-- View for sales with customer and product details
CREATE OR REPLACE VIEW sales_detailed AS
SELECT 
  s.*,
  c.name as customer_name,
  c.email as customer_email,
  p.title as product_title,
  p.sku as product_sku,
  p.color as product_color,
  sup.name as supplier_name
FROM sales s
LEFT JOIN customers c ON s.customer_id = c.id
LEFT JOIN products p ON s.product_id = p.id
LEFT JOIN suppliers sup ON p.supplier_id = sup.id;

-- View for inventory analytics
CREATE OR REPLACE VIEW inventory_analytics AS
SELECT 
  COUNT(*) as total_products,
  COUNT(*) FILTER (WHERE sold = false) as available_products,
  COUNT(*) FILTER (WHERE sold = true) as sold_products,
  SUM(gbp_purchase_price) FILTER (WHERE sold = false) as total_inventory_value_gbp,
  SUM(gbp_sale_price) FILTER (WHERE sold = false) as potential_revenue_gbp,
  SUM(calculate_product_profit(gbp_sale_price, gbp_purchase_price)) FILTER (WHERE sold = false) as potential_profit_gbp,
  AVG(calculate_profit_margin(gbp_sale_price, gbp_purchase_price)) as avg_profit_margin_percent
FROM products;

-- Function to automatically update product sold status when sale is created
CREATE OR REPLACE FUNCTION update_product_sold_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the product as sold
  UPDATE products 
  SET sold = true, sold_date = NEW.sale_date 
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update product status on sale
CREATE TRIGGER trigger_update_product_sold_status
  AFTER INSERT ON sales
  FOR EACH ROW
  EXECUTE FUNCTION update_product_sold_status();

-- Function to prevent selling already sold products
CREATE OR REPLACE FUNCTION check_product_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM products WHERE id = NEW.product_id AND sold = true) THEN
    RAISE EXCEPTION 'Product with ID % is already sold', NEW.product_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check product availability before sale
CREATE TRIGGER trigger_check_product_availability
  BEFORE INSERT ON sales
  FOR EACH ROW
  EXECUTE FUNCTION check_product_availability();