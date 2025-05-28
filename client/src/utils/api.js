import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const createOrder = (orderData) => API.post("/order", orderData);
export const getOrder = (orderId) => API.get(`/order/${orderId}`);
