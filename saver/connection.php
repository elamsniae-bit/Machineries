<?php

    session_start();
    $sitename = 'heavyequip';
    
    // Get the base URL based on the environment
    if (isset($_SERVER['HTTP_HOST'])) {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
        $host = $protocol . $_SERVER['HTTP_HOST'] . '/';
    } else {
        $host = "http://localhost:5000/";
    }
    
    // SQLite database connection
    $db_file = __DIR__ . '/../database.sqlite';
    
    try {
        $connection = new PDO('sqlite:' . $db_file);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        die('Connection lost: ' . $e->getMessage());
    }
    
    // Load MySQLi compatibility layer
    require_once __DIR__ . '/../mysqli_compat.php';

?>

