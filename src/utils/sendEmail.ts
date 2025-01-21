import nodemailer from 'nodemailer';
import log from '../logger';
import envs from '../env';

// Function to send an email
const sendEmail = async (to: string, subject: string, text: string) => {
  const { MAILER_SERVICE_USER, MAC_MAILER_SERVICE_PASS } = envs();

  try {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: MAILER_SERVICE_USER,
        pass: MAC_MAILER_SERVICE_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: MAILER_SERVICE_USER,
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    log.error(error.message);
    throw error;
  }
};

export default sendEmail;
