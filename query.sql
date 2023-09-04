CREATE TABLE customer (
    customer_id INT,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    customer_pass VARCHAR(255),
    customer_phone VARCHAR(255),
    avatar VARCHAR(255),
    birth_date VARCHAR(255),
    gender VARCHAR(255),
    PRIMARY KEY(customer_id)
);

CREATE TABLE seller (
    seller_id VARCHAR(255),
    seller_email VARCHAR(255),
    seller_name VARCHAR(255),
    seller_pass VARCHAR(255),
    seller_phone VARCHAR(255),
    seller_store VARCHAR(255),
    avatar VARCHAR(255),
    PRIMARY KEY(seller_id)
);

CREATE TABLE category (
    category_id INT,
    category_name VARCHAR(255)
);

CREATE TABLE orders (
    order_id VARCHAR NOT NULL,
    order_address VARCHAR(255),
    order_quantity VARCHAR(255),
    order_shipping VARCHAR(255),
    total_price INT,
    product_id VARCHAR(255),
    customer_id VARCHAR(255),
    PRIMARY KEY(order_id)
);

CREATE TABLE products (
    product_id VARCHAR(255),
    category_id INT,
    product_name TEXT,
    product_stock INT ,
    product_price INT,
    product_image VARCHAR(255),
    product_description TEXT
);

CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    address_name VARCHAR(255),
    address_street TEXT,
    address_phone VARCHAR(255),
    address_postal VARCHAR(255),
    address_city VARCHAR(255),
    address_place VARCHAR(255),
    customer_id VARCHAR(255)
);