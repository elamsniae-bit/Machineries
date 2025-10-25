<?php

// MySQLi to PDO Compatibility Layer for SQLite
// This file provides mysqli_* function overrides to work with PDO/SQLite

class MySQLi_Result_Wrapper {
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

if (!function_exists('mysqli_connect')) {
    function mysqli_connect($host, $user, $pass, $db) {
        global $connection;
        return $connection;
    }
}

if (!function_exists('mysqli_query')) {
    function mysqli_query($conn, $query) {
        try {
            $stmt = $conn->query($query);
            return new MySQLi_Result_Wrapper($stmt);
        } catch (PDOException $e) {
            error_log("Query error: " . $e->getMessage());
            return false;
        }
    }
}

if (!function_exists('mysqli_fetch_assoc')) {
    function mysqli_fetch_assoc($result) {
        if ($result === false || !($result instanceof MySQLi_Result_Wrapper)) {
            return false;
        }
        return $result->fetch_assoc();
    }
}

if (!function_exists('mysqli_num_rows')) {
    function mysqli_num_rows($result) {
        if ($result === false || !($result instanceof MySQLi_Result_Wrapper)) {
            return 0;
        }
        return $result->num_rows();
    }
}

if (!function_exists('mysqli_insert_id')) {
    function mysqli_insert_id($conn) {
        return $conn->lastInsertId();
    }
}

if (!function_exists('mysqli_real_escape_string')) {
    function mysqli_real_escape_string($conn, $string) {
        return str_replace("'", "''", $string);
    }
}

if (!function_exists('mysqli_error')) {
    function mysqli_error($conn) {
        $error = $conn->errorInfo();
        return isset($error[2]) ? $error[2] : '';
    }
}

if (!function_exists('mysqli_affected_rows')) {
    function mysqli_affected_rows($conn) {
        return 0;
    }
}

?>
