import { CgCloseO } from "react-icons/cg";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-[300px] p-6 rounded-lg shadow-lg flex flex-col items-center relative">
        <CgCloseO size={40} color="red" />
        <h2 className="text-xl font-semibold mt-2">Payment Error</h2>
        <p className="text-sm text-gray-700 mb-4 text-center">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
