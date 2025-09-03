const express = require('express');
const { User, Auth, Subscription, UserDetail } = require('./models');

const app = express();
app.use(express.json());

// Example routes
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/userss', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Auth, as: 'auths' },
        { model: Subscription, as: 'subscriptions' },
        { model: UserDetail, as: 'userDetail' }
      ]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});