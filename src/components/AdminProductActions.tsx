"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import toast from "react-hot-toast";

export default function AdminProductActions({ id }: { id: any }) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleEdit = () => {
        router.push(`/admin/products/edit/${id}`);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });

            if (res.ok) {
                toast.success("✅ Product deleted successfully!");
                setShowModal(false);
                router.refresh(); // Refresh product list
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete product");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black rounded-lg font-medium shadow hover:scale-105 transition-transform"
                >
                    Edit
                </button>

                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg font-medium shadow hover:scale-105 transition-transform"
                >
                    Delete
                </button>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white/10 backdrop-blur-lg border border-red-400 rounded-xl p-8 text-center max-w-sm">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Are you sure you want to delete this product?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ConfirmDeleteModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}
