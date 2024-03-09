const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandlers');
const { catchAsyncError } = require('./catchAsyncError');

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return next(new ErrorHandler('Please Login to access this resource', 401));
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid or expired token. Please login again.', 401));
    }
});