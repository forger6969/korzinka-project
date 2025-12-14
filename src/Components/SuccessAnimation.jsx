import React from "react";
import { motion } from "framer-motion";

const SuccessAnimation = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#e4002b] flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center text-white"
            >
                {/* АНИМИРОВАННАЯ ГАЛОЧКА */}
                <motion.svg
                    width="150"
                    height="150"
                    viewBox="0 0 100 100"
                    className="mx-auto mb-6"
                >
                    <motion.path
                        d="M20 55 L45 78 L80 30"
                        fill="none"
                        stroke="white"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: "easeInOut"
                        }}
                    />
                </motion.svg>

                <p className="text-4xl font-bold">Заказ успешно создан!</p>

                <button
                    onClick={onClose}
                    className="mt-6 px-8 py-3 bg-white text-[#e4002b] font-semibold rounded-xl shadow"
                >
                    OK
                </button>
            </motion.div>
        </motion.div>
    );
};

export default SuccessAnimation;
