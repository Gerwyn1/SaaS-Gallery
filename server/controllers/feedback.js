import {validationResult} from 'express-validator';
import nodemailer from 'nodemailer';

// @desc FEEDBACK
// @Route POST /feedback
// @Access Public
export const feedback = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // NodeMailer proccessing ...

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  let mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: `${process.env.SUBJECTPREFIX}: ${req.body.subject}`,
    html: 
    `<div>
    <p>From: ${req.body.email}</p>
    <p>Subject: ${req.body.subject}</p>
    <p>${req.body.text}</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.json({ message: "Error: Message is not sent" });
    } else {
      console.log("Email sent: " + info);
      return res.json({ message: "Message sent with success" });
    }
  });
};