<?php
session_start();

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'finalProject');
define('DB_USER', 'admin');
define('DB_PASS', 'group7');

// Create connection
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset
    $conn->set_charset("utf8mb4");
    
} catch (Exception $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Helper function to check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['userId']);
}

// Helper function to redirect
function redirect($url) {
    header("Location: $url");
    exit();
}
?>