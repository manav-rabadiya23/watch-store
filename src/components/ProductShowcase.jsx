import { useRef, useState } from "react";

import watch1Img from "../assets/watch1.jpeg";
import watch2Img from "../assets/watch2.jpeg";
import watch3Img from "../assets/watch3.jpeg";
import watch4Img from "../assets/watch4.jpeg";

import watch1Vid from "../assets/watch1.mp4";
import watch2Vid from "../assets/watch2.mp4";
import watch3Vid from "../assets/watch3.mp4";
import watch4Vid from "../assets/watch4.mp4";

const items = [
  {
    id: 1,
    type: "photo",
    image: watch1Img,
    title: "Classic Silver",
    price: "₹4,999",
    description: "Minimal silver design with a timeless premium finish.",
  },
  {
    id: 2,
    type: "photo",
    image: watch2Img,
    title: "Midnight Black",
    price: "₹6,499",
    description: "Bold black styling crafted for a modern luxury look.",
  },
  {
    id: 3,
    type: "photo",
    image: watch3Img,
    title: "Luxury Gold",
    price: "₹8,999",
    description: "Elegant gold details with a refined statement feel.",
  },
  {
    id: 4,
    type: "photo",
    image: watch4Img,
    title: "Leather Edition",
    price: "₹5,799",
    description: "Premium leather styling for everyday sophistication.",
  },
  {
    id: 5,
    type: "reel",
    image: watch1Img,
    video: watch1Vid,
    title: "Silver Reel",
    price: "₹4,999",
    description: "See the silver finish and shine in motion.",
  },
  {
    id: 6,
    type: "reel",
    image: watch2Img,
    video: watch2Vid,
    title: "Black Reel",
    price: "₹6,499",
    description: "A smooth black luxury reel with premium detailing.",
  },
  {
    id: 7,
    type: "reel",
    image: watch3Img,
    video: watch3Vid,
    title: "Gold Reel",
    price: "₹8,999",
    description: "Watch the gold frame and texture come alive.",
  },
  {
    id: 8,
    type: "reel",
    image: watch4Img,
    video: watch4Vid,
    title: "Leather Reel",
    price: "₹5,799",
    description: "A cinematic look at the leather watch styling.",
  },
];

const ProductCard = ({ item, hoveredId, setHoveredId }) => {
  const videoRef = useRef(null);
  const isHovered = hoveredId === item.id;
  const isAnotherHovered = hoveredId !== null && hoveredId !== item.id;

  const handleEnter = () => {
    setHoveredId(item.id);

    if (item.type === "reel" && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleLeave = () => {
    setHoveredId(null);

    if (item.type === "reel" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden rounded-3xl transition-all duration-500 ease-out ${
        isHovered
          ? "lg:col-span-2 lg:row-span-2 h-[520px] shadow-2xl"
          : isAnotherHovered
            ? "scale-95 opacity-0 pointer-events-none lg:h-[220px]"
            : "h-[320px] shadow-md"
      }`}
    >
      {item.type === "photo" ? (
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={item.video}
          poster={item.image}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div
        className={`absolute bottom-0 left-0 w-full p-6 text-white transition-all duration-500 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-90"
        }`}
      >
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/70">
          {item.type === "reel" ? "Reel Preview" : "Photo"}
        </p>

        <h3 className="text-2xl font-semibold">{item.title}</h3>
        <p className="mt-1 text-sm text-white/80">{item.price}</p>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isHovered ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="max-w-md text-sm leading-6 text-white/85">
            {item.description}
          </p>

          <button className="mt-5 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-[#f8f8f8] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Interactive Collection
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Featured Styles
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Hover a photo or reel to focus on it, enlarge it, and preview more
            details.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4 auto-rows-[220px]">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
