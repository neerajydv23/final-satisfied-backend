const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employerModel = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: [true, 'First Name is Required'],
			minLength: [3, 'Firstname should be atleast of 3 Character'],
		},
		lastname: {
			type: String,
			minLength: [3, 'Last Name should be atleast of 3 Character'],
		},
		contact: {
			type: String,
			required: [true, 'Contact is Required'],
			minLength: [10, 'Constact must not be exceed of 10 Numbers'],
			maxLength: [10, 'Constact must be atleast of 10 Numbers'],
		},
		email: {
			type: String,
			required: true,
			index: { unique: true, sparse: true },
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
		},
		password: {
			type: String,
			select: false,
			required: [true, "password is required"],
			minLength: [6, 'Password should have atleast 6 Characters'],
			maxLength: [15, 'Password should not exceed more than 15 Characters'],
			// match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/ , "Password must have this char"],
		},
		resetpasswordToken: {
			type: String,
			default: 0,
		},
		organisationlogo: {
			type: Object,
			default: {
				fileId: '',
				url: 'https://plus.unsplash.com/premium_photo-1699534403319-978d740f9297?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
		},
		organisationname: {
			type: String,
			required: [true, 'Organisation Name is Required'],
			minLength: [3, 'Organisation should be atleast of 3 Character'],
		},
		jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'job' }],
		applications: [{
			type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication'
		}],
		isAdmin:{
			type:Boolean,
			default: false,
		}
		
	},
	{ timestamps: true }
);

employerModel.pre('save', function () {
	if (!this.isModified('password')) {
		return;
	}
	let salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
});

employerModel.methods.comparepassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

employerModel.methods.getjwttoken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const Employer = mongoose.model('employer', employerModel);
module.exports = Employer;
