const mongoose = require('mongoose');

const jobModel = mongoose.Schema(
	{
		employer: { type: mongoose.Schema.Types.ObjectId, ref: 'employer' },
		applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
		title: String,
		skills: [String],
		jobType: { type: String, enum: ['In Office', 'Remote'] },
		category: { type: String, enum: ['Internship', 'job'] },
		description: [],
		preferences:[],
		Graduation:String,
		openings: Number,
		location: String,
		salary: Number,
		experience: {
			type: String,
			emum:["0-1","1-2","2-5","5-10"],
		},

	},
	{ timestamps: true }
);

const Job = mongoose.model('job', jobModel);
module.exports = Job;
