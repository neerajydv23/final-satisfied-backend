var ImageKit = require('imagekit');

exports.uploadImagekit = function () {
	var imagekit = new ImageKit({
		publicKey: process.env.PUBLICKEY_IMAGEKIT,
		privateKey: process.env.PRIVATEKEY_IMAGEKIT,
		urlEndpoint: process.env.URLENDPOINT_IMAGEKIT,
	});

	var imagekit = new ImageKit({
		publicKey: process.env.PUBLICKEY_IMAGEKIT,
		privateKey: process.env.PRIVATEKEY_IMAGEKIT,
		urlEndpoint: process.env.URLENDPOINT_IMAGEKIT,
	});

	return imagekit;
};
