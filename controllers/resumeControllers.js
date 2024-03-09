const { catchAsyncError } = require('../middlewares/catchAsyncError');
const Student = require('../models/studentModel');
const { v4: uuidv4 } = require('uuid');
const ErrorHandler = require('../utils/ErrorHandlers');

exports.resume = catchAsyncError(async (req, res, next) => {
	const { resume } = await Student.findById(req.id).exec();

	res.json({ message: 'Resume of USER Internshala', resume });
});

/* -------------------------- EDUCATION ---------------- */
exports.addeducation = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.education.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Education Added', resume: student.resume });
});
exports.editeducation = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const eduIndex = student.resume.education.findIndex(
		i => i.id === req.params.eduid
	);
	student.resume.education[eduIndex] = {
		...student.resume.education[eduIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: 'Education Updated', resume: student.resume });
});
exports.deleteeducation = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const filtereEdu = student.resume.education.filter(
		i => i.id !== req.params.eduid
	);
	student.resume.education = filtereEdu;

	await student.save();
	res.json({
		message: 'Education Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------ Jobs ---------------- */
exports.addjob = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.jobs.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Job Added', resume: student.resume });
});
exports.editjob = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const jobIndex = student.resume.jobs.findIndex(
		i => i.id === req.params.jobid
	);
	student.resume.jobs[jobIndex] = {
		...student.resume.jobs[jobIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Job Updated', resume: student.resume });
});
exports.deletejob = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const filterejob = student.resume.jobs.filter(i => i.id !== req.params.jobid);
	student.resume.jobs = filterejob;

	await student.save();
	res.json({
		message: 'Job Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------ Internships ---------------- */
exports.addinternship = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.internships.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Internship Added', resume: student.resume });
});
exports.editinternship = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const internIndex = student.resume.internships.findIndex(
		i => i.id === req.params.internid
	);
	student.resume.internships[internIndex] = {
		...student.resume.internships[internIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Internship Updated', resume: student.resume });
});
exports.deleteinternship = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const filtereInternships = student.resume.internships.filter(
		i => i.id !== req.params.internid
	);
	student.resume.internships = filtereInternships;

	await student.save();
	res.json({
		message: 'Internship Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------- POSITIONS OF RESPONSIBILITY ---------------- */
exports.addresponsibility = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Responsibility Added', resume: student.resume });
});
exports.editresponsibility = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const internIndex = student.resume.responsibilities.findIndex(
		i => i.id === req.params.responsid
	);
	student.resume.responsibilities[internIndex] = {
		...student.resume.responsibilities[internIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Responsibility Updated', resume: student.resume });
});
exports.deleteresponsibility = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const filtereResponsibility = student.resume.responsibilities.filter(
		i => i.id !== req.params.responsid
	);
	student.resume.responsibilities = filtereResponsibility;
	await student.save();
	res.json({
		message: 'Responsibility Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------- TRAININGS/ COURSES ---------------- */
exports.addcourse = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.courses.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Course Added', resume: student.resume });
});
exports.editcourse = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const courseIndex = student.resume.courses.findIndex(
		i => i.id === req.params.courseid
	);
	student.resume.courses[courseIndex] = {
		...student.resume.courses[courseIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Course Updated', resume: student.resume });
});
exports.deletecourse = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const filtereCourses = student.resume.courses.filter(
		i => i.id !== req.params.courseid
	);
	student.resume.courses = filtereCourses;
	await student.save();
	res.json({
		message: 'Course Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------- ACADEMICS/ PERSONAL PROJECTS ---------------- */
exports.addproject = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.projects.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Project Added', resume: student.resume });
});
exports.editproject = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const projectIndex = student.resume.projects.findIndex(
		i => i.id === req.params.projid
	);
	student.resume.projects[projectIndex] = {
		...student.resume.projects[projectIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Project Updated', resume: student.resume });
});
exports.deleteproject = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const filtereProjects = student.resume.projects.filter(
		i => i.id !== req.params.projid
	);
	student.resume.projects = filtereProjects;
	await student.save();
	res.json({
		message: 'Project Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------- SKILLS ---------------- */
exports.addskill = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.skills.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Skill Added', resume: student.resume });
});
exports.editskill = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const skillIndex = student.resume.skills.findIndex(
		i => i.id === req.params.skillid
	);
	student.resume.skills[skillIndex] = {
		...student.resume.skills[skillIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Skill Updated', resume: student.resume });
});
exports.deleteskill = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const filtereSkills = student.resume.skills.filter(
		i => i.id !== req.params.skillid
	);
	student.resume.skills = filtereSkills;
	await student.save();
	res.json({
		message: 'Skill Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------- PORTFOLIO/ WORK SAMPLES ---------------- */
exports.addworksample = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.worksamples.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({
		message: 'PORTFOLIO/ WORK SAMPLES Added',
		resume: student.resume,
	});
});
exports.editworksample = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const worksampleIndex = student.resume.worksamples.findIndex(
		i => i.id === req.params.workid
	);
	student.resume.worksamples[worksampleIndex] = {
		...student.resume.worksamples[worksampleIndex],
		...req.body,
	};
	await student.save();
	res.json({
		message: 'PORTFOLIO/ WORK SAMPLES Updated',
		resume: student.resume,
	});
});
exports.deleteworksample = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const filtereWorksample = student.resume.worksamples.filter(
		i => i.id !== req.params.workid
	);
	student.resume.worksamples = filtereWorksample;
	await student.save();
	res.json({
		message: 'PORTFOLIO/ WORK SAMPLES Delete Successfully',
		resume: student.resume,
	});
});

/* ------------------------- ACCOMPLISHMENTS/ ADDITIONAL DETAILS ---------------- */
exports.addaccomplishment = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({
		message: 'PORTFOLIO/ WORK SAMPLES Added',
		resume: student.resume,
	});
});
exports.editaccomplishment = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const accomplishmentIndex = student.resume.accomplishments.findIndex(
		i => i.id === req.params.accomplishmentid
	);
	student.resume.accomplishments[accomplishmentIndex] = {
		...student.resume.accomplishments[accomplishmentIndex],
		...req.body,
	};
	await student.save();
	res.json({
		message: 'PORTFOLIO/ WORK SAMPLES Updated',
		resume: student.resume,
	});
});
exports.deleteaccomplishment = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const filtereAccomplishment = student.resume.accomplishments.filter(
		i => i.id !== req.params.accomplishmentid
	);
	student.resume.accomplishments = filtereAccomplishment;
	await student.save();
	res.json({
		message: 'PORTFOLIO/ WORK SAMPLES Delete Successfully',
		resume: student.resume,
	});
});
