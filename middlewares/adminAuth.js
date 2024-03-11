const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandlers');
const { catchAsyncError } = require('./catchAsyncError');
const Employer = require("../models/employerModel")

exports.isAdmin = catchAsyncError(async (req, res, next) => {
    
    try {
        const id = req.id;
        const admin = await Employer.findById(id).exec();
        if(!admin.isAdmin){
            res.status(401).json({ message: 'UNAUTHORIZED REQUEST' });
        }
        next();
        
    } catch (error) {
        return next(new ErrorHandler('Invalid or expired token. Please login again.', 401));
    }
});