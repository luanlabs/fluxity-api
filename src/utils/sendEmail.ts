import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAILER_SERVICE_USER,
    pass: process.env.MAC_MAILER_SERVICE_PASS,
  },
});

// Function to send an email
const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    // Define the email options
    const mailOptions = {
      from: process.env.MAILER_SERVICE_USER,
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
