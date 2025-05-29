const OrderSummary = ({ product, variant, quantity }) => {
  const subtotal = product.price * quantity;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>

      <div className="flex items-center gap-4">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-20 h-20 object-cover rounded border"
        />
        <div className="text-sm">
          <p className="font-medium">{product.title}</p>
          <p className="text-gray-500">Qty: {quantity}</p>
        </div>
      </div>

      <div className="border-t pt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold text-base border-t pt-2">
          <span>Total</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
