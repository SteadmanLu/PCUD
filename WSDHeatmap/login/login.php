<?php
require_once 'config.php';

if (isLoggedIn()) {
    redirect('../about_us_section/index.html');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    // Validate input
    if (empty($email) || empty($password)) {
        $error = "Please enter both email and password.";
    } else {
        // Check if user exists
        $stmt = $conn->prepare("SELECT userId, firstName, lastName, password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['userId'] = $user['userId'];
                $_SESSION['firstName'] = $user['firstName'];
                $_SESSION['lastName'] = $user['lastName'];
                $_SESSION['email'] = $email;
                
                redirect('../about_us_section/index.html');
            } else {
                $error = "Invalid password.";
            }
        } else {
            // User doesn't exist, redirect to register
            $_SESSION['register_email'] = $email;
            redirect('register.php');
        }
        
        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Project Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container login-container">
        <h1>Login</h1>
        
        <?php if (!empty($error)): ?>
            <div class="message error">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required 
                       value="<?php echo isset($_SESSION['register_email']) ? htmlspecialchars($_SESSION['register_email']) : ''; ?>">
            </div>
            
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="btn">Login</button>
        </form>
        
        <p style="margin-top: 20px; text-align: center;">
            New user? You'll be redirected to registration if your email doesn't exist, or click <a href="register.php">here</a> to register.
        </p>
    </div>
</body>
</html>
<?php 
if (isset($_SESSION['register_email'])) {
    unset($_SESSION['register_email']);
}
$conn->close(); 
?>