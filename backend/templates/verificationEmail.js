export const verificationEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification - VY Foundation</title>
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
            .security-icon {
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
            .security-note {
                background: #f8f9fa;
                border-left: 4px solid #ff7722;
                padding: 15px;
                margin: 20px 0;
                text-align: left;
                border-radius: 5px;
            }
            .security-note h4 {
                color: #000;
                margin-bottom: 8px;
            }
            .security-note p {
                color: #666;
                font-size: 14px;
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
                <h1>Account Verification</h1>
                <p>VY Foundation - Secure your account</p>
            </div>
            
            <div class="content">
                <div class="security-icon">🔐</div>
                
                <h2 class="greeting">Hi ${name}!</h2>
                
                <p class="message">
                    To complete your account verification and secure your VY Foundation account, 
                    please use the verification code below.
                </p>
                
                <div class="otp-container">
                    <div class="otp-label">Your Verification Code:</div>
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="timer-info">
                    <strong>⏰ Code expires in 24 hours</strong><br>
                    Please enter this code on the verification page to activate your account.
                </div>
                
                <div class="security-note">
                    <h4>🔒 Security Reminder</h4>
                    <p>Never share this code with anyone. VY Foundation staff will never ask for your verification code via email or phone.</p>
                </div>
                
                <p style="color: #666; font-size: 14px; margin-top: 25px;">
                    If you didn't request this verification or have any concerns, 
                    please contact our support team immediately.
                </p>
            </div>
            
            <div class="footer">
                <p><strong>VY Foundation</strong> - Security Team</p>
                <p>&copy; 2025 VY Foundation. All rights reserved.</p>
                <p>Support: <a href="mailto:sir.daza02@gmail.com">security@vyfoundation.org</a></p>
            </div>
        </div>
    </body>
    </html>
  `;
};