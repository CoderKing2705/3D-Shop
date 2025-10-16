"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmDeleteModal({
    open,
    onClose,
    onConfirm,
}: ConfirmDeleteModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-purple-500"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <h2 className="text-xl font-bold mb-3 text-purple-300">
                            Delete Product
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete this product? This action cannot
                            be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:scale-105 transition-transform"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
