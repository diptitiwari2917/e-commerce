import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const createOrder = (orderData) => API.post("api/order", orderData);
export const getOrder = (orderId) => API.get(`api/order/${orderId}`);
