const mongoose = require('mongoose');
const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: [true, 'Job ID is required'],
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: [true, 'Student ID is required']
    },
    resume: {
        type: String,
        required: [true, 'Resume is required']
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    duration:{
        type:String,
        enum:['1 Month','2 Months','3 Months','Flexible'],
        default:'1 Month'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});
const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
module.exports = JobApplication;