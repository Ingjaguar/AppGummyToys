const nodemailer= require("nodemailer"); 

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "ruthguzman0728@outlook.com",
          pass: "voxioyjtlrhbhjqb"
        }
      });
    const mensaje={
        from: "GummyToys <ruthguzman0728@outloo.com",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }
    await transport.sendMail(mensaje)
}

module.exports= sendEmail;