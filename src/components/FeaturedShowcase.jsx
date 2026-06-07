import { useRef, useState } from "react";

import watch1Img from "../assets/watch1.jpeg";
import watch2Img from "../assets/watch2.jpeg";
import watch3Img from "../assets/watch3.jpeg";
import watch4Img from "../assets/watch4.jpeg";

import watch2Vid from "../assets/watch2.mp4";
import watch4Vid from "../assets/watch4.mp4";

const cards = [
  {
    id: 1,
    type: "photo",
    image: watch1Img,
    title: "Classic Silver",
    subtitle: "Premium Watch",
    description: "Timeless silver finish with elegant styling.",
    price: "₹4,999",
  },
  {
    id: 2,
    type: "reel",
    image: watch2Img,
    video: watch2Vid,
    title: "Midnight Black",
    subtitle: "Reel Preview",
    description: "Smooth black finish in motion.",
    price: "₹6,499",
  },
  {
    id: 3,
    type: "photo",
    image: watch3Img,
    title: "Luxury Gold",
    subtitle: "Signature Edition",
    description: "Bold and premium gold design.",
    price: "₹8,999",
  },
  {
    id: 4,
    type: "reel",
    image: watch4Img,
    video: watch4Vid,
    title: "Leather Reel",
    subtitle: "Motion Preview",
    description: "Elegant leather details with a premium moving preview.",
    price: "₹5,799",
  },
];

function ShowcaseCard({ card, activeId, setActiveId }) {
  const videoRef = useRef(null);
  const isActive = activeId === card.id;
  const hasActive = activeId !== null;

  const handleMouseEnter = () => {
    setActiveId(card.id);

    if (card.type === "reel" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setActiveId(null);

    if (card.type === "reel" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative h-[500px] overflow-hidden rounded-[28px] transition-all duration-500 ease-in-out ${
        isActive ? "flex-[4]" : hasActive ? "flex-[0.8]" : "flex-1"
      }`}
    >
      {card.type === "reel" ? (
        <video
          ref={videoRef}
          src={card.video}
          poster={card.image}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        {!isActive && (
          <div className="flex h-full items-end justify-center pb-4">
            <h3 className="text-lg font-semibold uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180">
              {card.title}
            </h3>
          </div>
        )}

        <div
          className={`transition-all duration-500 ${
            isActive
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.28em] text-white/70">
            {card.subtitle}
          </p>

          <h2 className="mt-3 text-4xl font-bold uppercase tracking-wide">
            {card.title}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
            {card.description}
          </p>

          <p className="mt-5 text-lg font-medium text-white">{card.price}</p>

          <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const FeaturedShowcase = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="bg-[#f8f8f8] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Interactive Collection
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Featured Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Hover a card to expand it. Reel cards play on hover.
          </p>
        </div>

        <div className="hidden gap-4 lg:flex">
          {cards.map((card) => (
            <ShowcaseCard
              key={card.id}
              card={card}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          {cards.map((card) => (
            <div
              key={card.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              {card.type === "reel" ? (
                <video
                  src={card.video}
                  poster={card.image}
                  muted
                  controls
                  playsInline
                  className="h-80 w-full object-cover"
                />
              ) : (
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-80 w-full object-cover"
                />
              )}

              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  {card.subtitle}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{card.description}</p>
                <p className="mt-3 text-base font-medium text-gray-900">
                  {card.price}
                </p>

                <button className="mt-4 rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShowcase;
