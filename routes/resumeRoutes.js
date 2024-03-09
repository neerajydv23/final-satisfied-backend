const express = require('express');
const {
	resume,
	addeducation,
	editeducation,
	deleteeducation,
	addjob,
	editjob,
	deletejob,
	addinternship,
	editinternship,
	deleteinternship,
	addresponsibility,
	editresponsibility,
	deleteresponsibility,
	addcourse,
	editcourse,
	deletecourse,
	addproject,
	editproject,
	deleteproject,
	addskill,
	editskill,
	deleteskill,
	addaccomplishment,
	editaccomplishment,
	deleteaccomplishment,
	deleteworksample,
	editworksample,
	addworksample,
} = require('../controllers/resumeControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// GET /
router.get('/', isAuthenticated, resume);

/* -------------------------- Resume Education ---------------- */
//POST ADD EDUCATION
router.post('/add-education', isAuthenticated, addeducation);

//POST EDIT EDUCATION
router.post('/edit-education/:eduid', isAuthenticated, editeducation);

//POST DELETE EDUCATION
router.post('/delete-education/:eduid', isAuthenticated, deleteeducation);

/* -------------------------Resume Jobs ---------------- */
//POST ADD JOBS
router.post('/add-job', isAuthenticated, addjob);

//POST EDIT JOBS
router.post('/edit-job/:jobid', isAuthenticated, editjob);

//POST DELETE JOBS
router.post('/delete-job/:jobid', isAuthenticated, deletejob);

/* -------------------------Resume Internships ---------------- */
//POST ADD InternShips
router.post('/add-internship', isAuthenticated, addinternship);

//POST EDIT InternShips
router.post('/edit-internship/:internid', isAuthenticated, editinternship);

//POST DELETE InternShips
router.post('/delete-internship/:internid', isAuthenticated, deleteinternship);

/* ------------------------- Resume POSITIONS OF RESPONSIBILITY ---------------- */
//POST ADD Responsibilities
router.post('/add-responsibility', isAuthenticated, addresponsibility);
//POST EDIT Responsibilities
router.post(
	'/edit-responsibility/:responsid',
	isAuthenticated,
	editresponsibility
);
//POST DELETE Responsibilities
router.post(
	'/delete-responsibility/:responsid',
	isAuthenticated,
	deleteresponsibility
);

/* ------------------------- Resume TRAININGS/ COURSES ---------------- */
//POST ADD Courses
router.post('/add-course', isAuthenticated, addcourse);
//POST EDIT Courses
router.post('/edit-course/:courseid', isAuthenticated, editcourse);
//POST DELETE Courses
router.post('/delete-course/:courseid', isAuthenticated, deletecourse);

/* ------------------------- Resume ACADEMICS/ PERSONAL PROJECTS ---------------- */
//POST ADD PROJECT
router.post('/add-project', isAuthenticated, addproject);
//POST EDIT PROJECT
router.post('/edit-project/:projid', isAuthenticated, editproject);
//POST DELETE PROJECT
router.post('/delete-project/:projid', isAuthenticated, deleteproject);

/* ------------------------- Resume SKILLS ---------------- */
//POST ADD SKILL
router.post('/add-skill', isAuthenticated, addskill);
//POST EDIT SKILL
router.post('/edit-skill/:skillid', isAuthenticated, editskill);
//POST DELETE SKILL
router.post('/delete-skill/:skillid', isAuthenticated, deleteskill);

/* ------------------------- Resume PORTFOLIO/ WORK SAMPLES ---------------- */
//POST ADD WORK SAMPLE
router.post('/add-worksample', isAuthenticated, addworksample);
//POST EDIT WORK SAMPLE
router.post('/edit-worksample/:workid', isAuthenticated, editworksample);
//POST DELETE WORK SAMPLE
router.post('/delete-worksample/:workid', isAuthenticated, deleteworksample);

/* ------------------------- Resume ACCOMPLISHMENTS/ ADDITIONAL DETAILS ---------------- */
//POST ADD ACCOMPLISHMENTS
router.post('/add-accomplishment', isAuthenticated, addaccomplishment);
//POST EDIT ACCOMPLISHMENTS
router.post(
	'/edit-accomplishment/:accomplishmentid',
	isAuthenticated,
	editaccomplishment
);
//POST DELETE ACCOMPLISHMENTS
router.post(
	'/delete-accomplishment/:accomplishmentid',
	isAuthenticated,
	deleteaccomplishment
);

module.exports = router;
