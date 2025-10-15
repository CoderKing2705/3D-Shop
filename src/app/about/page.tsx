"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Cuboid, ShoppingCart, Users } from "lucide-react";

export default function AboutPage() {
    const sectionVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const cardVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <>
            <Navbar />
            <motion.div
                className="min-h-screen flex flex-col items-center justify-start p-6 md:p-12 bg-gray-50 dark:bg-gray-900"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
                {/* Headline */}
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
                    variants={sectionVariant}
                >
                    About 3D Store
                </motion.h1>

                {/* Main Text Content */}
                <motion.div
                    className="max-w-6xl space-y-8 text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-20"
                    variants={sectionVariant}
                >
                    <p>
                        <strong>Our Mission:</strong> Empower customers to experience products like never before. With interactive 3D views, explore every detail, rotate products, and make informed purchasing decisions.
                    </p>
                    <p>
                        <strong>Our Vision:</strong> A world where online shopping is immersive, transparent, and interactive. Eliminate uncertainty in buying online with realistic 3D product previews.
                    </p>
                    <p>
                        3D Store is dedicated to providing a <strong>premium shopping experience</strong> with the latest in 3D technology. Whether browsing or purchasing, our platform is designed to make shopping <strong>easy, fun, and interactive</strong>.
                    </p>
                    <p>
                        Our mission is to bring creativity to your fingertips. Discover, inspect, and buy products like never before—all in <strong>immersive 3D</strong>.
                    </p>
                    <p>
                        Join thousands of customers who are exploring products in 3D, making smarter purchases, and enjoying a next-generation shopping experience.
                    </p>
                </motion.div>

                {/* Feature Cards Section */}
                <motion.div className="w-full max-w-6xl mb-16">
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
                        variants={sectionVariant}
                    >
                        Why Choose Us
                    </motion.h2>

                    <motion.div className="grid gap-10 md:grid-cols-3" variants={sectionVariant}>
                        <motion.div
                            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
                            variants={cardVariant}
                        >
                            <Cuboid className="w-12 h-12 text-purple-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">3D Product View</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Rotate, zoom, and inspect products in <strong>high-fidelity 3D</strong> before purchase.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
                            variants={cardVariant}
                        >
                            <ShoppingCart className="w-12 h-12 text-purple-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Seamless Shopping</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Add products to your cart and enjoy a smooth checkout with secure payments.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
                            variants={cardVariant}
                        >
                            <Users className="w-12 h-12 text-purple-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Connect with creators and shoppers who value quality, innovation, and 3D technology.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}
