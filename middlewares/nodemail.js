import nodemailer from"nodemailer";



const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "chebbiwissal512@gmail.com", // generated ethereal user
        pass: "crwvbumzbfhmdyrz", // generated ethereal password
      },
    });

    await transporter.sendMail({
      from:  "chebbiwissal512@gmail.com",
      to: email,
      subject: subject,
      html: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
export default sendEmail;
