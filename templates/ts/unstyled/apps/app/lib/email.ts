import * as nodemailer from "nodemailer";

import { APP_URL } from ".";

// Create nodemailer instance
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SEND_IN_BLUE_USER,
    pass: process.env.SEND_IN_BLUE_PASSWORD
  }
});

/**
 * Send an email to a User's email address with a link to their password Reset
 * @param email Target Email Address
 * @param id Reset's ID
 */
export const sendResetEmail = async (email: string, id: string) => {
  await transporter.sendMail({
    // Use your app's domain!
    from: "reset@domain.app",
    to: email,
    subject: "Password Reset Request",
    html: `We received a request to reset your account's password.<br /><br />To continue, please visit <a href="${APP_URL}/reset/${id}" target="_blank">${APP_URL}/reset/${id}</a>`
  });
};

/**
 * Send an email to a User's email address on sign up to invite them to login
 * @param email Target Email Address
 */
export const sendWelcomeEmail = async (email: string) => {
  await transporter.sendMail({
    // Use your app's domain!
    from: "welcome@domain.app",
    to: email,
    // Replace subject with your app!
    subject: "Welcome to TAKEOFF!",
    // Replace email with appropriate content!
    html: `You have successfully signed up to TAKEOFF.<br /><br />To login with your account, please visit <a href="${APP_URL}/login" target="_blank">${APP_URL}/login</a>`
  });
};
