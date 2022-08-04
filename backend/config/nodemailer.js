import nodeMailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import dotenv from "dotenv";
const __dirname = path.resolve();

dotenv.config();
//autharize with smtp or google to send email
const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//load the html template for mail
const renderTemplate = (data, relativePath) => {
  let mailHTML;
  console.log(__dirname);
  ejs.renderFile(
    path.join(__dirname, "/backend/views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log(`error in rendering html template : ${err}`);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

export { renderTemplate, transporter };

//send mail request
