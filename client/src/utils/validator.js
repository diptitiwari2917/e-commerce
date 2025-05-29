export const validateForm = (form) => {
  const newErrors = {};
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\(\d{3}\) \d{3} \d{4}$/;
  const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
  const cvvRegex = /^\d{3}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
  if (!form.email.trim()) newErrors.email = "Email is required";
  else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email";

  if (!form.phone.trim()) newErrors.phone = "Phone number is required";
  else if (!phoneRegex.test(form.phone))
    newErrors.phone = "Phone number must be in format (123) 456 7890";

  if (!form.address.trim()) newErrors.address = "Address is required";

  if (!form.city) newErrors.city = "City is required";
  if (!form.state) newErrors.state = "State is required";

  if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
  else if (!/^\d{6}$/.test(form.zip)) newErrors.zip = "ZIP must be 6 digits";

  if (!form.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
  else if (!cardRegex.test(form.cardNumber))
    newErrors.cardNumber = "Card must be 16 digits";

  if (!form.expiry.trim()) newErrors.expiry = "Expiry date is required";
  else if (!expiryRegex.test(form.expiry))
    newErrors.expiry = "Invalid format MM/YY";
  else {
    const [month, year] = form.expiry.split("/").map(Number);
    const expiryDate = new Date(`20${year}`, month - 1, 1);
    const now = new Date();
    if (expiryDate < now) newErrors.expiry = "Expiry must be a future date";
  }

  if (!form.cvv.trim()) newErrors.cvv = "CVV is required";
  else if (!cvvRegex.test(form.cvv)) newErrors.cvv = "CVV must be 3 digits";

  return newErrors;
};
