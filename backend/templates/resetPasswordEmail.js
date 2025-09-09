export const resetPasswordEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - VY Foundation</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                border-top: 4px solid #ff7722;
            }
            .header {
                background: #000;
                color: white;
                text-align: center;
                padding: 30px 20px;
            }
            .header h1 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            .content {
                padding: 30px;
                text-align: center;
            }
            .key-icon {
                font-size: 48px;
                margin-bottom: 20px;
            }
            .greeting {
                font-size: 22px;
                color: #000;
                margin-bottom: 15px;
                font-weight: bold;
            }
            .message {
                font-size: 16px;
                color: #555;
                margin-bottom: 30px;
                line-height: 1.6;
            }
            .otp-container {
                background: #ff7722;
                color: white;
                border-radius: 10px;
                padding: 25px;
                margin: 25px 0;
            }
            .otp-label {
                font-size: 16px;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .otp-code {
                font-size: 36px;
                font-weight: bold;
                letter-spacing: 4px;
                font-family: 'Courier New', monospace;
                background: rgba(0, 0, 0, 0.2);
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
            }
            .timer-info {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                color: #856404;
            }
            .warning-box {
                background: #f8d7da;
                border: 1px solid #f5c6cb;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                color: #721c24;
            }
            .next-steps {
                background: #f8f9fa;
                border-left: 4px solid #ff7722;
                padding: 20px;
                margin: 25px 0;
                text-align: left;
                border-radius: 5px;
            }
            .next-steps h4 {
                color: #000;
                margin-bottom: 10px;
            }
            .next-steps ol {
                color: #666;
                font-size: 14px;
                padding-left: 20px;
            }
            .next-steps li {
                margin: 5px 0;
            }
            .footer {
                background: #f8f9fa;
                color: #666;
                text-align: center;
                padding: 20px;
                font-size: 14px;
                border-top: 1px solid #eee;
            }
            .footer a {
                color: #ff7722;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset Request</h1>
                <p>VY Foundation - Secure Account Recovery</p>
            </div>
            
            <div class="content">
                <div class="key-icon">🔑</div>
                
                <h2 class="greeting">Hi ${name}!</h2>
                
                <p class="message">
                    We received a request to reset your password for your VY Foundation account. 
                    Use the code below to create a new password.
                </p>
                
                <div class="otp-container">
                    <div class="otp-label">Your Password Reset Code:</div>
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="timer-info">
                    <strong>⏰ Code expires in 15 minutes</strong><br>
                    Please use this code promptly to reset your password.
                </div>
                
                <div class="next-steps">
                    <h4>What to do next:</h4>
                    <ol>
                        <li>Go to the password reset page</li>
                        <li>Enter the code above</li>
                        <li>Create a new secure password</li>
                        <li>Log in with your new password</li>
                    </ol>
                </div>
                
                <div class="warning-box">
                    <strong>⚠️ Didn't request this?</strong><br>
                    If you didn't request a password reset, please ignore this email or contact our support team immediately.
                </div>
                
                <p style="color: #666; font-size: 14px; margin-top: 25px;">
                    For your security, never share this code with anyone. VY Foundation will never ask for your reset code.
                </p>
            </div>
            
            <div class="footer">
                <p><strong>VY Foundation</strong> - Account Security</p>
                <p>&copy; 2025 VY Foundation. All rights reserved.</p>
                <p>Support: <a href="mailto:sir.daza02@gmail.com">security@vyfoundation.org</a></p>
            </div>
        </div>
    </body>
    </html>
  `;
};