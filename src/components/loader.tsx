import { motion } from "framer-motion";

interface LoaderProps {
    size?: number; // in rem
}

export default function Loader({ size = 1.5 }: LoaderProps) {
    return (
        <motion.div
            className="rounded-full border-4 border-t-transparent border-b-transparent border-r-transparent border-l-[5px]"
            style={{
                width: `${size}rem`,
                height: `${size}rem`,
                borderLeftColor: "transparent",
                borderTopColor: "transparent",
                borderBottomColor: "transparent",
                borderRightColor: "transparent",
                background: "conic-gradient(from 0deg, #a855f7, #ec4899, #f43f5e, #a855f7)",
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
    );
}
