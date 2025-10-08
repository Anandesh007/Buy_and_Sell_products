**Creation of user and selling module
**
1.User module

a.Database name: buyandsell

b.tablename: users

query: CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL
);

Functionalities(end points):
	i)Create a new user (seller or buyer)
	ii)Get all users
	iii)Get user by id

Note: I write a controller code with restriction in the role.It must either buyer or seller.

Example input(raw):
	{
  	"name": "Alice",
  	"role": "seller"
	}


2.Selling module

a.Database name: buyandsell

b.tablename: products

query:CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  seller_id BIGINT REFERENCES users(id),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

Functionalities(endpoints):
	i)Add new product
	ii)Update product (price, stock, description)
	iii)List all products by seller

NOTE: Sellerid is the reference of user. So, refer the user table for seller_id

Example input(raw):
	{
  "name": "Biscuit",
  "price": 50,
  "stock": 100,
  "sellerId": 1
}

**Creation of Buyer module**

1.Buyer module

a.Database name: buyandsell

b.tablename:cart(create the cart the buyerid)

query: CREATE TABLE cart (
  id BIGSERIAL PRIMARY KEY,
  buyer_id BIGINT REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'OPEN',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

c.tablename:cart_items(add the products to the cart using cartid)

query:CREATE TABLE cart_items (
  id BIGSERIAL PRIMARY KEY,
  cart_id BIGINT REFERENCES cart(id),
  product_id BIGINT REFERENCES products(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  price_at_add NUMERIC(10,2) NOT NULL
);

NOTE:price_at_add refers to the price of the one product

Functionalities(end points):
	i)Create Cart for Buyer
	ii)Add item to cart
	iii)View cart

Description:
	->The buyer module is run successfull in postman.

Error Occur:

	-> I face during the input. because, I defined the created_at, but it is default in the database,later i remove and the code is run successfully

**Creation of billing module**

1.Billing module

a.Database name: buyandsell

b.tablename:billing

query: CREATE TABLE billing (
  id BIGSERIAL PRIMARY KEY,
  cart_id BIGINT REFERENCES cart(id),
  buyer_id BIGINT REFERENCES users(id),
  total_amount NUMERIC(10,2) NOT NULL,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  billing_date TIMESTAMP WITH TIME ZONE DEFAULT now()
);

c.tablename:billing_items

query:CREATE TABLE billing_items (
  id BIGSERIAL PRIMARY KEY,
  billing_id BIGINT REFERENCES billing(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  quantity INT NOT NULL,
  price_each NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL
);

Functionalities(end points):

	i) Checkout Cart & Generate Billing(give the cart id)
	ii)Export Billing to CSV(simply give the id from the billing table and it store as a csv file in the defined module).

Error:
	->I try to generate the billing, but it arise the error in the billing_date, I rectify the error with below

	->"defaultFn: 'now'" in the billing date attribute,inside the billing model.it assign the current time


