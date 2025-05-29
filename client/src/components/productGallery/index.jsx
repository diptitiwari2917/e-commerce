export const ProductGallery = ({ images, selectedImage, onSelect }) => (
  <div className="flex flex-col items-center gap-8">
    <img
      src={selectedImage}
      alt="T-shirt preview"
      className="w-full max-w-sm rounded-2xl shadow-md object-cover"
    />
    <div className="flex gap-2 flex-wrap justify-center md:justify-start mt-4">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Preview ${idx + 1}`}
          className={`h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-xl border-2 ${
            selectedImage === img ? "border-black" : "border-gray-300"
          } cursor-pointer`}
          onClick={() => onSelect(img)}
        />
      ))}
    </div>
  </div>
);
