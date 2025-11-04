import User from "../models/user.model.js";

export const verifyAdmin = async (req,res,next) => {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User id required in req.userId' });
        }

        try {
            const user = await User.findById(userId).select('role');
            if (!user) return res.status(404).json({ error: 'User not found' });

            const role = (user.role || '').toString().toLowerCase();
            if (role !== 'admin') return res.status(403).json({ error: 'Admin role required' });

            // user is admin -> proceed
            next();
        } catch (err) {
            console.error('adminVerify error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };  