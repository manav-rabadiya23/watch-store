import { useRef } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ id, type, image, video, name, price }) => {
  const videoRef = useRef(null);
  const { addToCart } = useCart();

  const handleMouseEnter = () => {
    if (type === "reel" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (type === "reel" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group rounded-[26px] border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden rounded-[20px] bg-gray-100 dark:bg-slate-800">
        {type === "reel" ? (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <img
            src={image}
            alt={name}
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-base font-medium text-gray-600 dark:text-slate-300">
          {price}
        </p>

        <button
          onClick={() =>
            addToCart({
              id,
              name,
              price,
              image: image || null,
            })
          }
          className="mt-4 w-full rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
