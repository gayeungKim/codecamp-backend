import nodemailer from 'nodemailer';
// import * as nodemailer from 'nodemailer';

export function checkValidationEmail(email){
    if (email === undefined || email.includes("@") === false){
        console.log("email 형식 error");
        return false;
    } else {
        return true;
    }
}

export async function sendTemplateToEmail(myemail, mytemplate) {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_SENDER = process.env.EMAIL_SENDER;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
})

    const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: myemail,
    subject: "[section03] 회원가입 이메일 전송 실습",
    html: mytemplate
})
    console.log(result);
}