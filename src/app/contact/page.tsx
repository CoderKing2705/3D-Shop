"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Message sent successfully!");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Animation variants
    const cardVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const formVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <>
            <Navbar />
            <motion.div
                className="min-h-screen flex flex-col items-center justify-start p-6 md:p-12 bg-gray-50 dark:bg-gray-900"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } },
                }}
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                    Contact Us
                </h1>

                {/* Contact Info Cards */}
                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <motion.div
                        className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                        variants={cardVariant}
                    >
                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">📧 Support Email</p>
                        <a
                            href="mailto:support@example.com"
                            className="text-purple-600 dark:text-purple-400 font-semibold text-xl hover:underline"
                        >
                            support@example.com
                        </a>
                    </motion.div>

                    <motion.div
                        className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                        variants={cardVariant}
                    >
                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">📞 Contact Number</p>
                        <a
                            href="tel:+1234567890"
                            className="text-purple-600 dark:text-purple-400 font-semibold text-xl hover:underline"
                        >
                            +1 234 567 890
                        </a>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <motion.div
                    className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
                    variants={formVariant}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Your Name"
                                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                placeholder="Your message..."
                                rows={5}
                                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 text-lg font-semibold rounded-xl transition shadow-lg hover:shadow-xl
              ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white active:scale-95"}`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
}
