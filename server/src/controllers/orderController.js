import prisma from "../prismaClient.js";
import { sendSuccessEmail, sendFailureEmail } from "../utils/mailer.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    cardNumber,
    expiry,
    cvv,
    product,
    productId,
    quantity,
  } = req.body;

  let transactionStatus = "approved";
  if (cardNumber === "2") transactionStatus = "declined";
  if (cardNumber === "3") transactionStatus = "gateway_error";

  const orderNumber = uuidv4();

  try {
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        fullName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        cardNumber,
        expiry,
        cvv,
        productId,
        product,
        quantity,
        transactionStatus,
      },
    });

    if (transactionStatus === "approved") {
      await sendSuccessEmail(email, orderNumber, product, quantity);
    } else {
      await sendFailureEmail(email, transactionStatus);
    }

    return res.status(200).json({ orderId: newOrder.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
