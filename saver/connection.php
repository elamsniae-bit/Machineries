<?php

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
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
        $db = new PDO('sqlite:' . $db_file);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        die('Connection lost: ' . $e->getMessage());
    }
    
    // Create a mysqli-compatible wrapper
    class MySQLiWrapper {
        private $pdo;
        
        public function __construct($pdo) {
            $this->pdo = $pdo;
        }
        
        public function query($sql) {
            try {
                $stmt = $this->pdo->query($sql);
                if ($stmt) {
                    return new MySQLiResultWrapper($stmt);
                }
                return false;
            } catch (PDOException $e) {
                error_log("Query error: " . $e->getMessage());
                return false;
            }
        }
        
        public function real_escape_string($string) {
            return str_replace("'", "''", $string);
        }
        
        public function insert_id() {
            return $this->pdo->lastInsertId();
        }
    }
    
    class MySQLiResultWrapper {
        private $stmt;
        private $data = [];
        private $position = 0;
        
        public function __construct($stmt) {
            $this->stmt = $stmt;
            if ($stmt) {
                $this->data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        }
        
        public function fetch_assoc() {
            if ($this->position < count($this->data)) {
                return $this->data[$this->position++];
            }
            return null;
        }
        
        public function num_rows() {
            return count($this->data);
        }
    }
    
    // Create mysqli-compatible connection object
    $connection = new MySQLiWrapper($db);
    
    // Override mysqli functions to use our wrapper
    if (!function_exists('mysqli_query')) {
        function mysqli_query($conn, $query) {
            return $conn->query($query);
        }
    }
    
    if (!function_exists('mysqli_fetch_assoc')) {
        function mysqli_fetch_assoc($result) {
            if ($result === false || !method_exists($result, 'fetch_assoc')) {
                return false;
            }
            return $result->fetch_assoc();
        }
    }
    
    if (!function_exists('mysqli_num_rows')) {
        function mysqli_num_rows($result) {
            if ($result === false || !method_exists($result, 'num_rows')) {
                return 0;
            }
            return $result->num_rows();
        }
    }
    
    if (!function_exists('mysqli_insert_id')) {
        function mysqli_insert_id($conn) {
            return $conn->insert_id();
        }
    }
    
    if (!function_exists('mysqli_real_escape_string')) {
        function mysqli_real_escape_string($conn, $string) {
            return $conn->real_escape_string($string);
        }
    }
    
    if (!function_exists('mysqli_error')) {
        function mysqli_error($conn) {
            return '';
        }
    }
    
    if (!function_exists('mysqli_affected_rows')) {
        function mysqli_affected_rows($conn) {
            return 0;
        }
    }

?>

