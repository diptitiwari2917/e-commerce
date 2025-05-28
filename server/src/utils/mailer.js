import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: false,
});

export const sendSuccessEmail = async (
  to,
  orderNumber,
  product,
  quantity
) => {
  await transporter.sendMail({
    from: '"Shopify Mock" <noreply@shopifyclone.com>',
    to,
    subject: `✅ Order Confirmation - ${product.title}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p><strong>Order #:</strong> ${orderNumber}</p>
      <p><strong>Product:</strong> ${product.title}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p>We’ll ship your order shortly!</p>
    `,
  });
};

export const sendFailureEmail = async (to, reason) => {
  await transporter.sendMail({
    from: '"Shopify Mock" <noreply@shopifyclone.com>',
    to,
    subject: `❌ Payment Failed - Order Not Placed`,
    html: `
      <h2>We couldn't process your transaction</h2>
      <p>Status: ${reason.replace("_", " ")}</p>
      <p>Please try again or contact support.</p>
    `,
  });
};

