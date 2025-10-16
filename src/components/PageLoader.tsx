"use client";

import { motion } from "framer-motion";
import Loader from "./loader";

export default function PageLoader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
                className="flex flex-col items-center gap-4"
            >
                <Loader size={3} />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                    Loading your product...
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Please wait a moment ✨
                </p>
            </motion.div>
        </motion.div>
    );
}
