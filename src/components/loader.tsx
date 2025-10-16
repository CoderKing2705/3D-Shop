import { motion } from "framer-motion";

export default function Loader({ size = 6, color = "white" }: { size?: number; color?: string }) {
    return (
        <motion.div
            className={`border-2 border-t-${color} border-t-transparent border-${color} rounded-full`}
            style={{ width: `${size}rem`, height: `${size}rem`, borderWidth: "3px", borderColor: `${color} transparent transparent transparent` }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
    );
}
