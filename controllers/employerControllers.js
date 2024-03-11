const exp = require('constants');
const { catchAsyncError } = require('../middlewares/catchAsyncError');
const Employer = require('../models/employerModel');
const ErrorHandler = require('../utils/ErrorHandlers');
const { sendtoken } = require('../utils/SendToken');
const { sendmail } = require('../utils/nodemailer');
const path = require('path');
const Internship = require('../models/internshipModel');
const Job = require('../models/jobModel');
const JobApplication = require('../models/jobApplicationModel');
const Studnt = require("../models/studentModel");
const Student = require('../models/studentModel');

const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
	cloud_name: 'dcj2gzytt', 
	api_key: process.env.CLOUDINARY_PUBLIC_KEY, 
	api_secret: process.env.CLOUDINARY_SECRET_KEY 
  });

exports.homepage = catchAsyncError((req, res, next) => {
	res.json({ message: 'Employer Homepage of Internshala' });
});

exports.currentemployer = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findById(req.id).exec();
	res.json({ employer });
});

exports.employersignup = catchAsyncError(async (req, res, next) => {
	const employer = await new Employer(req.body).save();
	sendtoken(employer, 200, res);
	// res.status(201).json({ employer });
});

exports.employersingin = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findOne({ email: req.body.email })
		.select('+password')
		.exec();

	if (!employer) {
		return next(
			new ErrorHandler('Employer not found with this Email Address', 404)
		);
	}
	const isMatch = employer.comparepassword(req.body.password);
	if (!isMatch)
		return next(new ErrorHandler('Wrong Employer Credientials', 500));

	sendtoken(employer, 200, res);
});

exports.employersignout = catchAsyncError(async (req, res, next) => {
	res.clearCookie('token');
	res.json({ message: 'Signout Employer done!' });
});

exports.employersendmail = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findOne({ email: req.body.email }).exec();

	if (!employer) {
		return next(
			new ErrorHandler('Employer not found with this Email Address', 404)
		);

	}
	const url = `${process.env.FROENTEND_URI}/admin/${employer._id}`;
	sendmail(req, res, next, url);
	employer.resetpasswordToken = '1';
	await employer.save();
	res.json({ employer, url });
});

exports.employerforgetlink = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findById(req.params.id).exec();

	if (!employer) {
		return next(
			new ErrorHandler('Employer not found with this Email Address', 404)
		);
	}

	if (employer.resetpasswordToken == '1') {
		employer.resetpasswordToken = '0';
		employer.password = req.body.password;
		await employer.save();
	} else {
		return next(new ErrorHandler('Invalid forget link ! try again', 500));
	}

	res.status(200).json({ message: 'Password Changed Successfully' });
});

exports.employerresetpassword = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findById(req.id).exec();
	employer.password = req.body.password;
	await employer.save();
	sendtoken(employer, 201, res);
});


exports.employerUpdate = catchAsyncError(async (req, res, next) => {
	await Employer.findByIdAndUpdate(req.id, req.body, { new: true }).exec();
	res
		.status(200)
		.json({ success: true, message: 'Employer Updated Successfully!' });
});

exports.employerOrganisationLogo = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findById(req.id).exec();

	const file = req.files.organisationlogo;
	if (req.files && req.files.organisationlogo) {
		const file = req.files.organisationlogo;

		if (employer.organisationlogo.fileId !== '') {
			await cloudinary.uploader.destroy(employer.organisationlogo.fileId, (error, result) => {
				if (error) {
				  console.error('Error deleting file from Cloudinary:', error);
				} else {
				  console.log('File deleted successfully:', result);
				}
			  });
		}
		const filepath =  req.files.organisationlogo;
		const myavatar = await cloudinary.uploader.upload(filepath.tempFilePath, {
			folder: "organisationlogo",
		});

		employer.organisationlogo = {
            fileId: myavatar.public_id, 
			url: myavatar.secure_url  
		};

		await employer.save();
		return res
			.status(200)
			.json({ success: true, message: 'Profile Picture Updated Successfully!', });
	} else {
		// Handle the case where req.files or req.files.resuma is undefined
		return res.status(400).json({ success: false, message: 'No resuma file provided.' });
	}
});



/* ------------ Job Controllers ---------- */

exports.createJob = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findById(req.id).exec();
	const job = await new Job(req.body);
	job.employer = employer._id;
	employer.jobs.push(job._id);
	await job.save();
	await employer.save();
	res.status(201).json({ success: true, job });
});

exports.readAllJob = catchAsyncError(async (req, res, next) => {
	const { jobTitle, location, jobType } = req.body; // Extract filter parameters from the request body
	const filters = {};

	if (jobTitle) {
		filters.title = { $regex: new RegExp(jobTitle, 'i') }; // Case-insensitive partial match for jobTitle
	}

	if (location) {
		filters.location = { $regex: new RegExp(location, 'i') }; // Case-insensitive partial match for location
	}

	if (jobType) {
		filters.jobType = jobType; // Exact match for jobType
	}

	// Use filters in the query to retrieve matching jobs
	const { jobs } = await Employer.findById(req.id)
		.populate({
			path: 'jobs',
			match: filters,
		})
		.exec();

	res.status(200).json({ success: true, jobs });
});

exports.readSingleJob = catchAsyncError(async (req, res, next) => {
	const job = await Job.findByIdAndUpdate(req.params.id, req.body).populate("employer").exec();
	res.status(200).json({ success: true, job });
});

/* ----------------All Applications----------------- */
exports.allApplications = catchAsyncError(async (req, res, next) => {
	const { email, contact, title } = req.body; // Extract filter parameters from query
	const filters = {};

	if (email) {
		filters['studentId.email'] = {
			$regex: new RegExp(email),
		};
	}

	if (title) {
		filters['jobId.title'] = {
			$regex: new RegExp(title),
		};
	}

	if (contact) {
		filters['studentId.contact'] = {
			$regex: new RegExp(contact),
		};
	}

	const applications = await Employer.findById(req.id)
		.populate({
			path: 'applications',
			populate: [
				{ path: 'jobId', match: { title: { $exists: true } } },
				{ path: 'studentId', match: filters },
			],
			match: filters,
		});

	res.status(200).json({ success: true, applications: applications.applications });
});


/* ------------ Intership Controllers ---------- */
exports.createInternship = catchAsyncError(async (req, res, next) => {
	const employer = await Employer.findById(req.id).exec();
	const internship = await new Internship(req.body);
	internship.employer = employer._id;
	employer.internships.push(internship._id);
	await internship.save();
	await employer.save();
	res.status(201).json({ success: true, internship });
});

exports.readAllInternship = catchAsyncError(async (req, res, next) => {
	const { internships } = await Employer.findById(req.id)
		.populate('internships')
		.exec();
	res.status(200).json({ success: true, internships });
});

exports.readSingleInternship = catchAsyncError(async (req, res, next) => {
	const internship = await Internship.findById(req.params.id).exec();
	res.status(200).json({ success: true, internship });
});

/* -------- Sensitive Delete Employer ------ */
exports.deleteEmployer = catchAsyncError(async (req, res, next) => {
	const deletingEmployerId = req.id;
	try {
		const deletedEmployer = await Employer.findByIdAndDelete(deletingEmployerId);
		if (!deletedEmployer)
			return next(new ErrorHandler('Student Not Found', 404));
		res.status(200).json({
			status: true,
			message: 'Employer Account Deleted Successfully',
			deletedEmployer,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: 'Internal server issue',
		});
	}
});


exports.applicationsStatus = catchAsyncError(async (req, res, next) => {

	const { id, status } = req.body;
	const applicationstatus = await JobApplication.findById(id)

	applicationstatus.status = status
	await applicationstatus.save()
	res.status(200).json({
		status: true,
		message: 'Application updated'
	});


})

exports.SearchUsers = catchAsyncError(async (req, res, next) => {


    try {
        let searchQuery = req.query.q;
		let admin = await Employer.findById(req.id);

        // Check if search parameter is provided, if not, retrieve all users
        if (!searchQuery) {
            const allUsers = await getAllUsers();
            res.json(allUsers);
        } else {
            // Search based on provided parameter
            const users = await searchUsers(searchQuery);
            res.json(users);
        }
    } catch (error) {
        console.error('Error in SearchUsers route:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

    async function searchUsers(query) {
        const searchRegex = new RegExp(query, 'i');

        const queryObj = {
            firstname: { $regex: searchRegex },
            lastname: { $regex: searchRegex },
			email: { $regex: searchRegex },
        };

        return Student.find(queryObj);
    }

    async function getAllUsers() {
        return Student.find(); // Retrieve all users
    }
});


exports.SearchEmploye = catchAsyncError(async (req, res, next) => {
    try {
        let searchQuery = req.query.q;

        // Check if search parameter is provided, if not, retrieve all users
        if (!searchQuery) {
            const employes = await getAllEmploye();
            res.json(employes);
        } else {
            // Search based on provided parameter
            const employes = await SearchEmploye(searchQuery);
            res.json(employes);
        }
    } catch (error) {
        console.error('Error in SearchUsers route:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

    async function SearchEmploye(query) {
        const searchRegex = new RegExp(query, 'i');

        const queryObj = {
            firstname: { $regex: searchRegex },
            lastname: { $regex: searchRegex },
			email: { $regex: searchRegex },
        };

        return Employer.find(queryObj);
    }

    async function getAllEmploye() {
        return Employer.find(); // Retrieve all users
    }
});

exports.SearchJobs = catchAsyncError(async (req, res, next) => {
    try {
        let searchQuery = req.query.q;

        // Check if search parameter is provided, if not, retrieve all users
        if (!searchQuery) {
            const jobs = await getAllJobs();
            res.json(jobs);
        } else {
            // Search based on provided parameter
            const jobs = await searchJobs(searchQuery);
            res.json(jobs);
        }
    } catch (error) {
        console.error('Error in SearchUsers route:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }


    async function getAllJobs() {
        return Job.find().populate('employer'); // Retrieve all users
    }

		async function searchJobs(query) {
		const searchRegex = new RegExp(query, 'i'); // 'i' for case-insensitive
		return Job.find({
			$or: [
				{ title: { $regex: searchRegex } },
				{ skills: { $regex: searchRegex } },
				{ location: { $regex: searchRegex } },
				{ description: { $regex: searchRegex } },
				{ preferences: { $regex: searchRegex } },
			]
		}).populate('employer');
	}
	
});


exports.DeleteUser = catchAsyncError(async (req, res, next) => {
    try {
        const id = req.params.id;
		const user = await Student.findByIdAndDelete(id);
		const alluser = await Student.find();
		res.json({ success: true, message: 'Delete User', user:alluser });
    } catch (error) {
        console.error('Error in SearchUsers route:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

});

exports.MakeAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const id = req.params.id;
		const employe = await Employer.findById(id);
		employe.isAdmin = true;
		employe.save();
		const allemploye = await Employer.find()
		res.json({ success: true, message: 'Made Author', employe:allemploye });
    } catch (error) {
        console.error('Error in SearchUsers route:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

});



// exports.SerchJobs = catchAsyncError(async (req, res, next) => {
// 	try {
// 		const searchQuery = req.query.q; // Get search query from URL query parameters
// 		const location = req.query.location;

// 		const jobs = await searchJobs(searchQuery,location);
// 		res.json(jobs);
// 	} catch (error) {
// 		console.error('Error in AllJobs route:', error);
// 		res.status(500).json({ success: false, error: 'Internal Server Error' });
// 	}
// 	async function searchJobs(query,location) {
// 		const searchRegex = new RegExp(query, 'i'); // 'i' for case-insensitive
// 		const locationRegex = new RegExp(location, 'i')
// 		return Job.find({
// 			$or: [
// 				{ title: { $regex: searchRegex } },
// 				{ skills: { $regex: searchRegex } },
// 				{ location: { $regex: locationRegex } },
// 				{ description: { $regex: searchRegex } },
// 				{ preferences: { $regex: searchRegex } },
// 			]
// 		});
// 	}
// });

