<?php

// Initialize SQLite database for Heavy Equipment Management System
$db_file = __DIR__ . '/database.sqlite';

try {
    $db = new PDO('sqlite:' . $db_file);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create admin table
    $db->exec("CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )");
    
    // Create categories table
    $db->exec("CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL
    )");
    
    // Create client table
    $db->exec("CREATE TABLE IF NOT EXISTS client (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50)
    )");
    
    // Create products table
    $db->exec("CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        price DECIMAL(10,2),
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255),
        categorie VARCHAR(255),
        model VARCHAR(255),
        productcondition VARCHAR(100),
        year INTEGER,
        image VARCHAR(255),
        des TEXT,
        weight VARCHAR(100)
    )");
    
    // Create history table
    $db->exec("CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        status VARCHAR(100),
        quality VARCHAR(100),
        rec_name VARCHAR(255),
        rec_email VARCHAR(255),
        rec_phone VARCHAR(50),
        rec_address TEXT,
        postal VARCHAR(20),
        user VARCHAR(255),
        date DATETIME
    )");
    
    // Insert default admin user (password: admin123)
    $stmt = $db->prepare("SELECT COUNT(*) FROM admin");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $db->exec("INSERT INTO admin (username, email, password) VALUES 
            ('admin', 'admin@heavyequip.com', '" . md5('admin123') . "')");
    }
    
    // Insert default categories
    $stmt = $db->prepare("SELECT COUNT(*) FROM categories");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $db->exec("INSERT INTO categories (name) VALUES 
            ('Excavators'),
            ('Bulldozers'),
            ('Cranes'),
            ('Loaders'),
            ('Dump Trucks')");
    }
    
    echo "Database initialized successfully!\n";
    echo "Database file: $db_file\n";
    echo "Default admin credentials - Username: admin, Password: admin123\n";
    
} catch (PDOException $e) {
    die("Database initialization failed: " . $e->getMessage() . "\n");
}

?>
