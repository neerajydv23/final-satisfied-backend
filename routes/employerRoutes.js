const express = require('express');
const {
	homepage,
	currentemployer,
	employersignup,
	employersingin,
	employersignout,
	employersendmail,
	employerforgetlink,
	employerresetpassword,
	employerOrganisationLogo,
	employerUpdate,
	createInternship,
	readAllInternship,
	readSingleInternship,
	createJob,
	readAllJob,
	readSingleJob,
	deleteEmployer,
	allApplications,
	applicationsStatus
} = require('../controllers/employerControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// GET /
router.get('/', homepage);

// GET /student
router.post('/current', isAuthenticated, currentemployer);

// POST /employer/signin
router.post('/signin', employersingin);

// POST /employer/signup
router.post('/signup', employersignup);

// GET /employer/signout
router.get('/signout', isAuthenticated, employersignout);

// POST /employer/update/:studentId
router.post('/update', isAuthenticated, employerUpdate);

// POST /employer/avatar/:studentId
router.post('/employeravatar', isAuthenticated, employerOrganisationLogo);


/* ------------ Jobs Routes ---------- */
// POST /employer/job/create
router.post('/job/create', isAuthenticated, createJob);

// POST /employer/job/readall
router.post('/job/readall', isAuthenticated, readAllJob);

// POST /employer/job/readsingle/:id
router.post('/job/readsingle/:id', isAuthenticated, readSingleJob);

router.post('/job/applicationstatus',isAuthenticated,applicationsStatus)
/* Todo */

// POST /employer/send-mail
router.post('/send-mail', employersendmail);


// GET /employer/forget-link/:studentId
router.post('/forget-link/:id', employerforgetlink);


// POST /employer/reset-password/:studentId
router.post('/reset-password', isAuthenticated, employerresetpassword);



/* get all applications */
router.post('/allApplications', isAuthenticated, allApplications);


/* --------------- Delete Employer ------------ */
// POST /student/delete/:studentId
router.delete('/delete', isAuthenticated, deleteEmployer);


/* ------------ Intership routes ---------- */
// POST /employer/intership/create
router.post('/internship/create', isAuthenticated, createInternship);



// POST /employer/intership/readall
router.post('/internship/readall', isAuthenticated, readAllInternship);



// POST /employer/intership/readsingle/:id
router.post(
	'/internship/readsingle/:id',
	isAuthenticated,
	readSingleInternship
);


module.exports = router;
