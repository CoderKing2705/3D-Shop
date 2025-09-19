import Link from "next/link";
import Image from "next/image";
import { products } from "./data/products";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 p-6"> {/* Add top padding because navbar is fixed */}
        <h1 className="text-4xl font-bold text-center mb-8">3D Store</h1>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 hover:border-white/30 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="aspect-square relative">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                <p className="text-gray-200">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
