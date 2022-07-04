require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"P-Covid Care" <lcquang116@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
            <h3>Xin chào ${dataSend.patientName}</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên P-Covid Care</p>
            <p>Thông tin đặt lịch khám: </p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank">Nhấn vào đây</a>
            </div>
            <div>Xin cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en'){
        result = `
            <h3>Dear ${dataSend.patientName}</h3>
            <p>You received this email because you booked an online medical appointment on P-Covid Care</p>
            <p>Information to book an appointment: </p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>Please click on the link below to confirm and complete the booking process</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Sincerely thanks!</div>
        `
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi'){
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên P-Covid Care</p>
        <p>Thông tin đơn thuốc/hoá đơn được gửi trên thông tin đính kèm</p>
        <div>Xin chân thành cảm ơn</div>
        `
    }
    if(dataSend.language === 'en'){
        result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on P-Covid Care</p>
        <p>Information to book an appointment: </p>
        <div>Sincerely thanks!</div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise ((resolve, reject) => {
        try{
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_APP, // generated ethereal user
                        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = transporter.sendMail({
                    from: '"P-Covid Care" <lcquang116@gmail>',
                    to: dataSend.email, 
                    subject: 'Kết quả đặt lịch khám bệnh',
                    html: getBodyHTMLEmailRemedy(dataSend),
                    attachments: [
                        {
                            filename: `${dataSend.patientId} - ${new Date().getTime()}.png`,
                            content: dataSend.imgBase64.split("base64,")[1],
                            encoding: 'base64',
                        },
                    ],
            });
            resolve(true);
        }catch(err){
            reject(err);
        }
    })
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
}