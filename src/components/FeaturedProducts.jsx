import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Rolex Submariner Black",
    slug: "rolex-submariner-black",
    price: "₹1,999",
    description: "Premium stylish watch",
  },
  {
    id: 2,
    name: "Omega Seamaster Blue",
    slug: "omega-seamaster-blue",
    price: "₹2,499",
    description: "Elegant modern design",
  },
  {
    id: 3,
    name: "Tag Heuer Carrera",
    slug: "tag-heuer-carrera",
    price: "₹2,999",
    description: "Luxury sporty watch",
  },
  {
    id: 4,
    name: "Fossil Grant Brown",
    slug: "fossil-grant-brown",
    price: "₹1,799",
    description: "Classic leather style",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-semibold text-slate-900">
          Featured Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 h-40 rounded-lg bg-slate-100"></div>

              <h3 className="text-lg font-medium text-slate-900">
                {product.name}
              </h3>

              <p className="text-sm text-slate-600">{product.description}</p>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-slate-900">
                  {product.price}
                </span>

                <Link
                  to={`/product/${product.slug}`}
                  className="text-sm text-emerald-700 hover:underline"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
