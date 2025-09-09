
const { User} = require('./models');

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not Found" });
        }
        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}