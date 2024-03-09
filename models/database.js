require('dotenv').config({ path: '/' + './.env' });
const mongoose = require('mongoose');

exports.databaseConnect = async () => {
	// console.log(require('dotenv').config());
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => console.log('Database connection successfully !'))
		.catch(err => (err.message));
};