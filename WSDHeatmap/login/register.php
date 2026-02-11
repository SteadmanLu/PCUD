<?php
require_once 'config.php';

if (isLoggedIn()) {
    redirect('../about_us_section/index.html');
}

$error = '';
$success = '';

// Pre-fill email if coming from login
$email = isset($_SESSION['register_email']) ? $_SESSION['register_email'] : '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $firstName = trim($_POST['firstName']);
    $lastName = trim($_POST['lastName']);
    $nickName = trim($_POST['nickName']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    
    // Validate input
    if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
        $error = "Please fill in all required fields.";
    } elseif ($password !== $confirmPassword) {
        $error = "Passwords do not match.";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters long.";
    }elseif (strlen($password) > 20) {
        $error = "Password must not exceed 20 characters.";
    }elseif (strlen($email) > 30) {
        $error = "Email must not exceed 30 characters.";
    }elseif (strlen($firstName) > 20) {
        $error = "First Name must not exceed 20 characters.";
    } elseif (strlen($lastName) > 20) {
        $error = "Last Name must not exceed 20 characters.";
    } elseif (strlen($nickName) > 20) {
        $error = "Nickname must not exceed 20 characters.";
    } else {
        // Check if email already exists
        $check_stmt = $conn->prepare("SELECT userId FROM users WHERE email = ?");
        $check_stmt->bind_param("s", $email);
        $check_stmt->execute();
        
        if ($check_stmt->get_result()->num_rows > 0) {
            $error = "Email already registered. Please login.";
        } else {
            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert user
            $insert_stmt = $conn->prepare("
                INSERT INTO users (firstName, lastName, nickName, email, password) 
                VALUES (?, ?, ?, ?, ?)
            ");
            $insert_stmt->bind_param("sssss", $firstName, $lastName, $nickName, $email, $hashedPassword);
            
            if ($insert_stmt->execute()) {
                // Auto-login after registration
                $_SESSION['userId'] = $insert_stmt->insert_id;
                $_SESSION['firstName'] = $firstName;
                $_SESSION['lastName'] = $lastName;
                $_SESSION['email'] = $email;
                
                redirect('../about_us_section/index.html');
            } else {
                $error = "Registration failed. Please try again.";
            }
            
            $insert_stmt->close();
        }
        
        $check_stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Project Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container login-container">
        <h1>Register</h1>
        
        <?php if (!empty($error)): ?>
            <div class="message error">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($success)): ?>
            <div class="message success">
                <?php echo htmlspecialchars($success); ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="firstName">First Name: *</label>
                <input type="text" id="firstName" name="firstName" required maxlength="20">
            </div>
            
            <div class="form-group">
                <label for="lastName">Last Name: *</label>
                <input type="text" id="lastName" name="lastName" required maxlength="20">
            </div>
            
            <div class="form-group">
                <label for="nickName">Nickname:</label>
                <input type="text" id="nickName" name="nickName" required maxlength="20">
            </div>
            
            <div class="form-group">
                <label for="email">Email: *</label>
                <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required maxlength="30">
            </div>
            
            <div class="form-group">
                <label for="password">Password: *</label>
                <input type="password" id="password" name="password" required minlength="6" required maxlength="20">
                <small>Minimum 8 characters</small>
            </div>
            
            <div class="form-group">
                <label for="confirmPassword">Confirm Password: *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required minlength="6" required maxlength="20">
            </div>
            
            <button type="submit" class="btn btn-success">Register</button>
            <a href="login.php" class="btn" style="margin-left: 10px;">Back to Login</a>
        </form>
        
        <div class="footer">
            <p>* Required fields</p>
        </div>
    </div>
</body>
</html>
<?php 
if (isset($_SESSION['register_email'])) {
    unset($_SESSION['register_email']);
}
$conn->close(); 
?>