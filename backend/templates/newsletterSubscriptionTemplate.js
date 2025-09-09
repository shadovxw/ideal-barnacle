export const newsletterSubscriptionTemplate = (name, email) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Subscribing - VY Foundation</title>
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
            .thank-you-icon {
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
            .what-to-expect {
                background: #f9f9f9;
                border-left: 4px solid #ff7722;
                padding: 20px;
                margin: 25px 0;
                text-align: left;
                border-radius: 5px;
            }
            .what-to-expect h3 {
                color: #000;
                margin-bottom: 15px;
                text-align: center;
            }
            .expectation-item {
                display: flex;
                align-items: flex-start;
                margin: 12px 0;
                padding: 8px;
            }
            .expectation-icon {
                font-size: 20px;
                margin-right: 12px;
                margin-top: 2px;
            }
            .expectation-text {
                color: #666;
                font-size: 14px;
                flex: 1;
            }
            .expectation-text strong {
                color: #000;
            }
            .impact-section {
                background: linear-gradient(135deg, #ff7722, #ff5722);
                color: white;
                padding: 25px;
                margin: 25px 0;
                border-radius: 8px;
                text-align: center;
            }
            .impact-section h3 {
                margin-bottom: 15px;
                font-size: 20px;
            }
            .impact-section p {
                font-size: 14px;
                line-height: 1.6;
                opacity: 0.95;
            }
            .social-section {
                background: #f8f9fa;
                padding: 20px;
                margin: 25px 0;
                border-radius: 8px;
                text-align: center;
            }
            .social-section h4 {
                color: #000;
                margin-bottom: 15px;
            }
            .social-links {
                margin-top: 10px;
            }
            .social-links a {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: #ff7722;
                color: white;
                text-decoration: none;
                border-radius: 50%;
                margin: 0 8px;
                line-height: 40px;
                text-align: center;
                font-weight: bold;
                transition: background 0.3s ease;
            }
            .social-links a:hover {
                background: #ff5722;
            }
            .unsubscribe-info {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                padding: 15px;
                margin: 25px 0;
                border-radius: 5px;
                font-size: 13px;
                color: #666;
                text-align: center;
            }
            .unsubscribe-info a {
                color: #ff7722;
                text-decoration: none;
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
                <h1>Thank You for Subscribing!</h1>
                <p>VY Foundation Newsletter - Stay Connected</p>
            </div>
            
            <div class="content">
                <div class="thank-you-icon">📧</div>
                
                <h2 class="greeting">Thank You ${name}!</h2>
                
                <p class="message">
                    We're delighted that you've joined our VY Foundation newsletter community! 
                    Your subscription helps us keep you informed about the positive changes 
                    we're making together in communities around the world.
                </p>
                
                <div class="email-info">
                    Newsletter subscribed for: ${email}
                </div>
                
                <div class="impact-section">
                    <h3>🌟 You're Now Part of Our Impact</h3>
                    <p>
                        By staying informed through our newsletter, you're joining thousands of 
                        compassionate individuals who believe in creating positive change. 
                        Together, we can build stronger, more resilient communities.
                    </p>
                </div>
                
                <div class="what-to-expect">
                    <h3>What to Expect in Your Inbox:</h3>
                    
                    <div class="expectation-item">
                        <div class="expectation-icon">📰</div>
                        <div class="expectation-text">
                            <strong>Monthly Impact Updates:</strong> Stories of how your support is making a real difference in communities
                        </div>
                    </div>
                    
                    <div class="expectation-item">
                        <div class="expectation-icon">🎯</div>
                        <div class="expectation-text">
                            <strong>Program Spotlights:</strong> Deep dives into our charitable initiatives and upcoming projects
                        </div>
                    </div>
                    
                    <div class="expectation-item">
                        <div class="expectation-icon">🤝</div>
                        <div class="expectation-text">
                            <strong>Volunteer Opportunities:</strong> Ways to get involved and make a hands-on difference
                        </div>
                    </div>
                    
                    <div class="expectation-item">
                        <div class="expectation-icon">📊</div>
                        <div class="expectation-text">
                            <strong>Transparency Reports:</strong> Clear information about how donations are used and their impact
                        </div>
                    </div>
                    
                    <div class="expectation-item">
                        <div class="expectation-icon">🎉</div>
                        <div class="expectation-text">
                            <strong>Success Stories:</strong> Inspiring stories from the communities and individuals we serve
                        </div>
                    </div>
                </div>
                
                <div class="social-section">
                    <h4>Stay Connected on Social Media</h4>
                    <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                        Follow us for daily updates, behind-the-scenes content, and community highlights
                    </p>
                    <div class="social-links">
                        <a href="#" title="Facebook">f</a>
                        <a href="#" title="Twitter">t</a>
                        <a href="#" title="Instagram">ig</a>
                        <a href="#" title="LinkedIn">in</a>
                    </div>
                </div>
                
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                    Your first newsletter will arrive within the next few days. We can't wait to share 
                    our latest updates and show you the incredible impact we're making together!
                </p>
                
                <div class="unsubscribe-info">
                    You can unsubscribe at any time by 
                    <a href="#">clicking here</a>. We respect your privacy and will never share your email address.
                </div>
            </div>
            
            <div class="footer">
                <p><strong>VY Foundation</strong> - Building Better Communities Together</p>
                <p>&copy; 2025 VY Foundation. All rights reserved.</p>
                <p>Contact us: <a href="mailto:newsletter@vyfoundation.org">newsletter@vyfoundation.org</a></p>
            </div>
        </div>
    </body>
    </html>
  `;
};