const express = require('express');
const {
	homepage,
	studentsignup,
	studentsignin,
	studentsignout,
	currentstudent,
	studentsendmail,
	studentforgetlink,
	studentresetpassword,
	studentUpdate,
	studentAvatar,
	applyInternship,
	applyJob,
	deleteStudent,
	studentResuma,
	AllJobs,
	getApplicationsByStudent,
	applyForJob,
	SerchJobs,
	findTopCompony,
	findrecentCompony
} = require('../controllers/indexControllers');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();


// GET /
router.get('/', homepage);

// GET /student
router.post('/student', isAuthenticated, currentstudent);

// POST /student/signup
router.post('/student/signup', studentsignup);

// POST /student/signin
router.post('/student/signin', studentsignin);

// GET /student/signout
router.get('/student/signout', isAuthenticated, studentsignout);

// POST /student/update/
router.post('/student/update', isAuthenticated, studentUpdate);

// POST /student/avatar
router.post('/student/avatar', isAuthenticated, studentAvatar);

// POST /student/resuma
router.post('/student/resumaPdf', isAuthenticated, studentResuma);

// POST /student/send-mail
router.post('/student/send-mail', studentsendmail);


// GET /student/forget-link/:studentId
router.post('/student/forget-link/:id', studentforgetlink);

// POST /student/reset-password/:studentId
router.post(
	'/student/reset-password/:id',
	isAuthenticated,
	studentresetpassword
);

// Get /student/View Jobs
router.post('/student/AllJobs', isAuthenticated, AllJobs);

// serch Job
router.post('/search', SerchJobs);

// serch Job
router.post('/topcompony', findTopCompony);

// serch Job
router.post('/resentjobs', findrecentCompony);

/* apply job */
router.post('/student/apply', isAuthenticated, applyForJob);

router.get('/student/applications', isAuthenticated, getApplicationsByStudent);


















/* left  */

/* ------------ Apply Intership  ---------- */
// POST /student/apply/internship/:internshipid
router.post(
	'/student/apply/internship/:internshipid',
	isAuthenticated,
	applyInternship
);

/* ------------ Apply Job  ---------- */
// POST /student/apply/job/:jobid
router.post('/student/apply/job/:jobid', isAuthenticated, applyJob);


/* ---------- Delete Student * -------- */
// POST /student/delete/:studentId
router.delete('/student/delete', isAuthenticated, deleteStudent);



module.exports = router;
