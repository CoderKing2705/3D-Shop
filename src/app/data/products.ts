// src/data/products.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    modelPath: string;
    colors: string[];
    thumbnail: string;
}

export const products: Product[] = [
    {
        id: "shoe",
        name: "Running Shoe",
        price: 120,
        description:
            "Lightweight running shoe with breathable mesh and cushioned sole.",
        modelPath: "/models/shoe.glb",
        colors: ["#ffffff", "#ff0000", "#0000ff", "#00ff00"],
        thumbnail: "/images/shoe_thumb.jpg",
    },
    {
        id: "watch",
        name: "Smart Watch",
        price: 250,
        description:
            "Stylish smartwatch with health tracking and notifications.",
        modelPath: "/models/watch.glb",
        colors: ["#333333", "#666666", "#ffcc00"],
        thumbnail: "/images/watch_thumb.jpg",
    },
    {
        id: "bag",
        name: "Leather Bag",
        price: 180,
        description:
            "Premium leather bag perfect for travel and business.",
        modelPath: "/models/bag.glb",
        colors: ["#8B4513", "#000000", "#A52A2A"],
        thumbnail: "/images/bag_thumb.png",
    },
];
