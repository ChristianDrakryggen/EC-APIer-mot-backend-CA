const sgMail = require("@sendgrid/mail");
//development env vars, remove for production
require("dotenv").config();

const orderConfirmed = (orderInfo) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const msg = {
    to: `${orderInfo.email}`, // Change to your recipient
    from: "christian.johannesson@drakryggen.com", // Change to your verified sender
    subject: "Order confirmed",
    text: "Your has been confirmed",
    html: `<h1 style="color: red; text-transform: uppercase">Hi ${orderInfo.firstname}, your order is confirmed!</h1>
    <p>Thank you for shopping at our store, we'll get back to you when your order is shipped</p>
    <p>Keep on shopping!</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { orderConfirmed };
