CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(15) AUTO_INCREMENT  NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT (100) NOT NULL,
    PRIMARY KEY (item_id)
);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("LEGO Ideas: Tree House, Ages: 16+ (21318)", "Toys", 199.99, 10),
    ("LEGO Stranger Things The Upside Down 75810 Building Kit", "Toys", 199.99, 10),
    ("LEGO Creator Expert: NASA Apollo 11 Lunar Lander", "Toys", 99.99, 6),
    ("LEGO Star Wars : Millennium Falcon ", "Toys", 799.99, 5),
    ("12pcs Camouflage S.W.A.T. Minifigures Compatible Lego Toy Military", "Toys", 24.69, 10),
    ("Star Wars: Jedi Fallen Order Deluxe Edition - Xbox One", "Electronic", 69.99, 20),
    ("Baldur's Gate [Xbox One Game]", "Electronic", 49.99, 20),
    ("ELEX [Xbox One Game]", "Electronic", 12.99, 15),
    ("Biomutant - Xbox One", "Electronic", 59.99, 12),
    ("Call of Duty: Modern Warfare - Xbox One", "Electronic", 55.99, 10),
    ("Mini Moustachery Shave Kit Shavette", "Beauty", 115.00, 15),
    ("Mini Moustachery Shave Kit Chrome", "Beauty", 74.99),
    ("Scalpmaster Boar Brush Black Accrylic Handle", "Beauty", 12.00, 10),
    ("Mini Moustachery Shave Cream Scobberlotch (Mahogany & Teakwood)", "Beauty", 14.99, 15),
    ("Scalpmaster Deluxe Shavette W/ Blades", "Beauty", 20.00, 20);