import { renderTemplate, transporter } from "../config/nodemailer.js";
import ejs from "ejs";

const newComment = (comment) => {
  //send mail to given destination(user's mail address)
  let htmlString = renderTemplate(comment, "/comment/new_comment_added.ejs");

  transporter.sendMail(
    {
      from: "mittalankit979@gmail.com",
      to: comment.user.email,
      subject: "new comment added sucessfully",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log(`error while sending mail : ${err}`);
        return;
      }

      console.log(`mail sent : ${info}`);
      console.log(info);
      return;
    }
  );
};
const forget_mailer = (user, authentication_key) => {
  console.log("inside user mailer the user in user mailer :", user);
  let htmlString = renderTemplate(user, "/forget_pass.ejs");
  //   let htmlString = "<h1>hii</h1>";

  transporter.sendMail(
    {
      from: "mittalankit979@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log(`error while sending mail : ${err}`);
        return;
      }

      console.log(`mail sent : ${info}`);
      console.log(info);
      return;
    }
  );
};

export { forget_mailer, newComment };
