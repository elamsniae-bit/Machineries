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
    
    // Helper function to handle mysqli_query calls with our wrapper
    function safe_mysqli_query($conn, $query) {
        if ($conn instanceof MySQLiWrapper) {
            return $conn->query($query);
        }
        // Fallback for real mysqli connections (shouldn't happen in this app)
        return mysqli_query($conn, $query);
    }
    
    // Helper function to handle mysqli_fetch_assoc
    function safe_mysqli_fetch_assoc($result) {
        if ($result === false) {
            return false;
        }
        if ($result instanceof MySQLiResultWrapper) {
            return $result->fetch_assoc();
        }
        if (method_exists($result, 'fetch_assoc')) {
            return $result->fetch_assoc();
        }
        return mysqli_fetch_assoc($result);
    }
    
    // Helper function to handle mysqli_num_rows
    function safe_mysqli_num_rows($result) {
        if ($result === false) {
            return 0;
        }
        if ($result instanceof MySQLiResultWrapper) {
            return $result->num_rows();
        }
        if (method_exists($result, 'num_rows')) {
            return $result->num_rows();
        }
        return mysqli_num_rows($result);
    }
    
    // Helper function to handle mysqli_insert_id
    function safe_mysqli_insert_id($conn) {
        if ($conn instanceof MySQLiWrapper) {
            return $conn->insert_id();
        }
        return mysqli_insert_id($conn);
    }
    
    // Helper function to handle mysqli_real_escape_string
    function safe_mysqli_real_escape_string($conn, $string) {
        if ($conn instanceof MySQLiWrapper) {
            return $conn->real_escape_string($string);
        }
        return mysqli_real_escape_string($conn, $string);
    }

?>

