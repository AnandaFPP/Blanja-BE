CREATE TABLE users (
    id INT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE seller (
    id INT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE category (
    id INT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE products(
    id VARCHAR(),
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    photo VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

CREATE TABLE store (
    id INT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO users(id, email, username, password, created_at, updated_at) VALUES(1, 'anandafpp14@gmail.com', 'anandafpp', '12345678', CURRENT_TIMESTAMP, LOCALTIMESTAMP);

INSERT INTO category(id, name, image, created_at, updated_at) VALUES(1, 'Clothes', 'Clothes.jpg', CURRENT_TIMESTAMP, LOCALTIMESTAMP);
('Pants', 'Pants.jpg', CURRENT_TIMESTAMP, LOCALTIMESTAMP),
('Clothes', 'Clothes.jpg', CURRENT_TIMESTAMP, LOCALTIMESTAMP),

INSERT INTO products(id, store_id, category_id, name, price, stock, image, created_at, updated_at) 
VALUES(1, 1, 1, 'Seringai x Raisa T-shirt', 220000, 10, 'SeringaixRaisa.jpg', CURRENT_TIMESTAMP, LOCALTIMESTAMP);

UPDATE category SET id = 1 WHERE name = 'Clothes';

INSERT INTO store(id, name, location, phone, created_at) VALUES(1, 'Lawless Store', 'Jakarta Selatan', '085912349989', CURRENT_TIMESTAMP);

SELECT products.id, products.name AS product_name, category.name AS category_name, store.name AS store_name, products.price, products.stock, store.phone AS store_contact FROM products INNER JOIN category ON products.id = category.id INNER JOIN store ON products.id = store.id;