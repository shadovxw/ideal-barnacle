const validator = require('validator');
const { Subscription, User } = require('../models');
const transporter = require('../config/mail');
const { newsletterSubscriptionTemplate } = require("../templates/newsletterSubscriptionTemplate")
require('dotenv').config(); 

const sendSubscriptionEmail = async ({ email, name }) => {
  try {
    console.log(process.env.SENDER_EMAIL)
    console.log(email, name)
    const mailOptions = {
      from: ` 'VY FOUNDATION' <${process.env.SMTP_USER}`,
      to: email,
      subject: "Thank You for Subscribing to VY Foundation Newsletter! 📧",
      html: newsletterSubscriptionTemplate(name || 'Friend', email)
    };

    await transporter.sendMail(mailOptions);
    console.log(`Newsletter subscription email sent successfully to: ${email}`);
  } catch (error) {
    console.error('Newsletter email send error:', error);
    throw error; // Re-throw to be handled by calling function
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { emailid, name } = req.body || {};

    console.log(emailid, name)
    if (!emailid || !validator.isEmail(emailid)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }
    console.log("33")
    const user_id = await User.findOne({ where: { email:emailid } }) || null;
    console.log("44", user_id)
    try {
        console.log("66")
      const iscreated = await Subscription.findOne({where: { emailid } });
      console.log("445", iscreated)
      
      if (iscreated) {
        return res.json({ 
          success: true, 
          message: 'You are already subscribed to our VY Foundation newsletter. Thank you for your continued support!' 
        });
      }
      console.log("hii")
        await Subscription.create(
            {
            emailid: emailid,
            user_id: user_id,
            plan: 'newsletter',
            status: 'active',
            started_at: new Date()
            }
        );

      // Send welcome email (don't block DB success; but await to report email errors)
      try {
        await sendSubscriptionEmail({ email: emailid, name });
        
        return res.json({ 
          success: true, 
          message: `Thank you ${name || 'for subscribing'}! Welcome to the VY Foundation community. Check your email for confirmation.` 
        });
        
      } catch (mailErr) {
        console.error('Newsletter email send failed:', mailErr);
        // Return success (DB operation succeeded) but inform about email issue
        return res.status(200).json({
          success: true,
          message: 'You\'ve been successfully subscribed to VY Foundation newsletter, but we couldn\'t send the confirmation email. Please contact support if needed.'
        });
      }

    } catch (dbError) {
      console.error('Database error in createSubscription:', dbError);
      
      // Handle specific Sequelize errors
      if (dbError.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided. Please check your email format.'
        });
      }
      
      if (dbError.name === 'SequelizeUniqueConstraintError') {
        return res.json({
          success: true,
          message: 'You are already subscribed to our VY Foundation newsletter!'
        });
      }
      
      throw dbError; // Re-throw other DB errors to be caught by outer catch
    }

  } catch (err) {
    console.error('createSubscription error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'We\'re experiencing technical difficulties. Please try subscribing again in a moment.' 
    });
  }
};

// Get subscription status (optional - for user dashboard)
exports.getSubscriptionStatus = async (req, res) => {
  try {
    const { emailid } = req.query;
    const user_id = req.userId;

    if (!emailid && !user_id) {
      return res.status(400).json({
        success: false,
        message: 'Email address or user authentication required'
      });
    }

    let whereClause = {};
    if (emailid) {
      whereClause.emailid = emailid;
    } else if (user_id) {
      whereClause.user_id = user_id;
    }

    const subscription = await Subscription.findOne({
      where: whereClause,
      attributes: ['id', 'emailid', 'status', 'started_at', 'created_at']
    });

    if (!subscription) {
      return res.json({
        success: false,
        message: 'No subscription found'
      });
    }

    return res.json({
      success: true,
      subscription: {
        id: subscription.id,
        email: subscription.emailid,
        status: subscription.status,
        subscribedAt: subscription.started_at || subscription.created_at
      }
    });

  } catch (error) {
    console.error('getSubscriptionStatus error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve subscription status'
    });
  }
};

// Unsubscribe from newsletter
exports.unsubscribe = async (req, res) => {
  try {
    const { emailid } = req.body;
    const user_id = req.userId;

    if (!emailid && !user_id) {
      return res.status(400).json({
        success: false,
        message: 'Email address or user authentication required'
      });
    }

    let whereClause = {};
    if (emailid) {
      whereClause.emailid = emailid;
    } else if (user_id) {
      whereClause.user_id = user_id;
    }

    const subscription = await Subscription.findOne({ where: whereClause });

    if (!subscription) {
      return res.json({
        success: false,
        message: 'No active subscription found for this email address'
      });
    }

    // Update status to inactive instead of deleting
    await subscription.update({
      status: 'inactive',
      ends_at: new Date()
    });

    return res.json({
      success: true,
      message: 'You have been successfully unsubscribed from VY Foundation newsletter. We\'re sorry to see you go!'
    });

  } catch (error) {
    console.error('unsubscribe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process unsubscription. Please try again.'
    });
  }
};

// Reactivate subscription
exports.reactivateSubscription = async (req, res) => {
  try {
    const { emailid } = req.body;
    const user_id = req.userId;

    if (!emailid && !user_id) {
      return res.status(400).json({
        success: false,
        message: 'Email address or user authentication required'
      });
    }

    let whereClause = {};
    if (emailid) {
      whereClause.emailid = emailid;
    } else if (user_id) {
      whereClause.user_id = user_id;
    }

    const subscription = await Subscription.findOne({ where: whereClause });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No subscription found. Please subscribe to our newsletter first.'
      });
    }

    if (subscription.status === 'active') {
      return res.json({
        success: true,
        message: 'Your subscription is already active!'
      });
    }

    // Reactivate subscription
    await subscription.update({
      status: 'active',
      ends_at: null,
      started_at: new Date()
    });

    // Send welcome back email
    try {
      await sendSubscriptionEmail({ 
        email: subscription.emailid, 
        name: 'Valued Subscriber' 
      });
    } catch (mailErr) {
      console.error('Welcome back email failed:', mailErr);

    }

    return res.json({
      success: true,
      message: 'Welcome back! Your VY Foundation newsletter subscription has been reactivated.'
    });

  } catch (error) {
    console.error('reactivateSubscription error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reactivate subscription. Please try again.'
    });
  }
};