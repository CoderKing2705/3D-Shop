import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const products = [
  {
    name: "Running Shoe",
    description: "Lightweight running shoe with breathable mesh and cushioned sole.",
    price: 120,
    images: [
      { url: "/images/shoe_thumb.jpg" },
      { url: "/models/shoe.glb" }
    ],
    categories: ["Footwear"],
    colors: ["#ffffff", "#ff0000", "#0000ff", "#00ff00"],
  },
  {
    name: "Smart Watch",
    description: "Stylish smartwatch with health tracking and notifications.",
    price: 250,
    images: [
      { url: "/images/watch_thumb.jpg" },
      { url: "/models/watch.glb" }
    ],
    categories: ["Electronics", "Gadgets"],
    colors: ["#333333", "#666666", "#ffcc00"],
  },
  {
    name: "Leather Bag",
    description: "Premium leather bag perfect for travel and business.",
    price: 180,
    images: [
      { url: "/images/bag_thumb.png" },
      { url: "/models/bag.glb" }
    ],
    categories: ["Accessories"],
    colors: ["#8B4513", "#000000", "#A52A2A"],
  },
];

async function main() {
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        colors: p.colors,
        images: {
          create: p.images,
        },
        categories: {
          connectOrCreate: p.categories.map((cat) => ({
            where: { name: cat },
            create: { name: cat },
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
