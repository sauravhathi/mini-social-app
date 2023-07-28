const User = require('./models/User');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try {
        // console.log(req.headers);
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log(accessToken);
        if (!accessToken) {
            return res.status(403).json({ error: 'User not authenticated' });
        }
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid access token' });
            }

            req.user = decoded.userId; // Set the authenticated user ID in the request object
            next();
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
};

module.exports = {
    isAuthenticated,
    errorHandler,
};