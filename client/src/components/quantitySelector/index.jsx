import { Minus, Plus } from "lucide-react";

export const QuantitySelector = ({ quantity, onChange }) => (
  <div className="flex flex-wrap items-center gap-4 pt-2">
    <span className="text-gray-700 font-medium">Quantity:</span>
    <div className="flex items-center border rounded-full overflow-hidden">
      <button onClick={() => onChange("dec")} className="p-2 hover:bg-gray-100">
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 text-sm font-medium">{quantity}</span>
      <button onClick={() => onChange("inc")} className="p-2 hover:bg-gray-100">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);
