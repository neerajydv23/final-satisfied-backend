const mongoose = require('mongoose');

const internshipModel = mongoose.Schema(
	{
		students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
		employer: { type: mongoose.Schema.Types.ObjectId, ref: 'employer' },
		profile: {
			type: String,
			required: [true, 'Profile Name is Required'],
			minLength: [3, 'Profile Name should be minimum of 3 characters'],
		},
		skill: String,
		intershipType: { type: String, enum: ['In Office', 'Remote'] },
		openings: Number,
		from: String,
		to: String,
		duration: String,
		responsibilities: String,
		stipend: {
			stutus: {
				type: String,
				enum: ['Fixed', 'Negotiable', 'Performance Based', 'Unpaid'],
			},
			amount: Number,
		},
		perks: String,
		assessment: String,
	},
	{ timestamps: true }
);

const Internship = mongoose.model('internship', internshipModel);
module.exports = Internship;
