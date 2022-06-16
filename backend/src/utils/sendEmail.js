const nodemailer = require("nodemailer");

function sendEmail(email, token) {
 
    var email = email;
    var token = token;
 
    var mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
			//service: process.env.SERVICE,
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_APP,
				pass: process.env.EMAIL_APP_PASSWORD,
			},
        }
    );
 
    var mailOptions = {
        from: 'lcquang116@gmail.com',
        to: email,
        subject: 'Reset Password Link',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/reset-password?token=' + token + '">link</a> to reset your password</p>'
 
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(1)
        } else {
            console.log(0)
        }
    });
}

// module.exports = async (email, subject, text) => {
// 	try {
// 		const transporter = nodemailer.createTransport({
// 			host: 'smtp.gmail.com',
// 			//service: process.env.SERVICE,
// 			port: 587,
// 			secure: false,
// 			auth: {
// 				user: process.env.EMAIL_APP,
// 				pass: process.env.EMAIL_APP_PASSWORD,
// 			},
// 		});

// 		await transporter.sendMail({
// 			from: "lcquang116@gmail.com",
// 			to: email,
// 			subject: subject,
// 			text: text,
// 		});
// 		console.log("email sent successfully");
// 	} catch (error) {
// 		console.log("email not sent!");
// 		console.log(error);
// 		return error;
// 	}
// };