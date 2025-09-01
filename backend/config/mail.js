import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sir.dazai02@gmail.com",
    pass: "wlfw wwyf ljnc lalt" // app password
  }
});
