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
    
    // Helper function to convert mysqli queries to PDO
    function mysqli_query($conn, $query) {
        try {
            return $conn->query($query);
        } catch (PDOException $e) {
            return false;
        }
    }
    
    function mysqli_fetch_assoc($result) {
        if ($result === false) return false;
        return $result->fetch(PDO::FETCH_ASSOC);
    }
    
    function mysqli_num_rows($result) {
        if ($result === false) return 0;
        return $result->rowCount();
    }
    
    function mysqli_insert_id($conn) {
        return $conn->lastInsertId();
    }
    
    function mysqli_real_escape_string($conn, $string) {
        return str_replace("'", "''", $string);
    }

?>

