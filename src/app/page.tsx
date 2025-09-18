import Link from "next/link";
import Image from "next/image";
import { products } from "./data/products";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">3D Store</h1>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
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
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
