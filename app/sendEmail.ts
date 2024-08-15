"use server";

import nodemailer from "nodemailer";

export async function sendEmail(res: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // or your Gmail password if 2FA is not enabled
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "mkjazzy796@gmail.com",
    subject: "Your Itinerary",
    html: formatItinerary(res),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info.response);
  });
}

function formatItinerary(itinerary: string) {
  const lines = itinerary.split("\n");
  let ex = 0;
  lines.forEach((line, index) => {
    if (line.startsWith("----------")) {
      ex = index;
    }
  });
  const noexcel = lines.slice(0, ex).join("\n");

  let html = noexcel.replace(/\n/g, "<br />");

  // Convert **bold** text to <strong>bold</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert ### heading to <h3> heading
  html = html.replace(/### (.*?)(?=<br \/>)?/g, "<h2>$1</h2>");
  return html;
}
