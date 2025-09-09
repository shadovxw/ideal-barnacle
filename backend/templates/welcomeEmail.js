export const welcomeEmailTemplate = (name, email) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to VY Foundation</title>
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
            .welcome-icon {
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
                margin-bottom: 25px;
                line-height: 1.6;
            }
            .email-info {
                background: #ff7722;
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                font-weight: bold;
            }
            .mission-box {
                background: #f9f9f9;
                border-left: 4px solid #ff7722;
                padding: 20px;
                margin: 25px 0;
                text-align: left;
                border-radius: 5px;
            }
            .mission-box h3 {
                color: #000;
                margin-bottom: 10px;
            }
            .mission-box p {
                color: #666;
                font-size: 14px;
            }
            .cta-button {
                display: inline-block;
                background: #000;
                color: white;
                text-decoration: none;
                padding: 12px 25px;
                border-radius: 5px;
                font-weight: bold;
                font-size: 16px;
                margin: 20px 0;
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
                <h1>Welcome to VY Foundation</h1>
                <p>Together, we make a difference</p>
            </div>
            
            <div class="content">
                <div class="welcome-icon">🤝</div>
                
                <h2 class="greeting">Hello ${name}!</h2>
                
                <p class="message">
                    Thank you for joining VY Foundation. Your account has been successfully created, 
                    and you're now part of our mission to create positive change in the world.
                </p>
                
                <div class="email-info">
                    Account created with: ${email}
                </div>
                
                <div class="mission-box">
                    <h3>Our Mission</h3>
                    <p>VY Foundation is dedicated to improving lives through charitable initiatives, 
                    community outreach, and sustainable development programs. Together, we can make 
                    a lasting impact on the communities we serve.</p>
                </div>
                
                <a href="#" class="cta-button">Explore Our Programs</a>
                
                <p style="margin-top: 25px; color: #666; font-size: 14px;">
                    Ready to get started? Log in to your account to discover how you can get involved 
                    with our charitable initiatives and make a difference.
                </p>
            </div>
            
            <div class="footer">
                <p><strong>VY Foundation</strong> - Building Better Communities</p>
                <p>&copy; 2025 VY Foundation. All rights reserved.</p>
                <p>Questions? Contact us at <a href="mailto:sir.daza02@gmail.com">support@vyfoundation.org</a></p>
            </div>
        </div>
    </body>
    </html>
  `;
};