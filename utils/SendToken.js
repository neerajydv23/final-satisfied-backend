// exports.sendtoken = (student, statusCode, res) => {
//     const token = student.getjwttoken();

//     const options = {
//         expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 1 * 60 * 60 * 1000),
//         httpOnly: true,
//         sameSite: 'None', // Adjust this based on your requirements and browser support
//     };

//     if (process.env.isProtected === 'production') {
//         options.secure = true;
//     }

//     res
//         .status(statusCode)
//         .cookie('token', token, options)
//         .json({ success: true, id: student._id, student: student, token });
// };

exports.sendtoken = (student, statusCode, res, req) => {
    const token = student.getjwttoken(); // Assuming this method generates a JWT token
    res
        .status(statusCode)
        .json({ success: true, id: student._id, student: student, token }); // Response JSON with success flag, student ID, and token
};
