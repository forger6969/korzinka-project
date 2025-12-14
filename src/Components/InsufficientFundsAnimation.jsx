import React from "react";
import { motion } from "framer-motion";

const InsufficientFundsAnimation = ({ onClose }) => {
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
                {/* АНИМАЦИЯ КРЕСТИКА */}
                <motion.svg
                    width="140"
                    height="140"
                    viewBox="0 0 100 100"
                    className="mx-auto mb-6"
                >
                    {/* Линия 1 */}
                    <motion.line
                        x1="20"
                        y1="20"
                        x2="80"
                        y2="80"
                        stroke="white"
                        strokeWidth="10"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    />

                    {/* Линия 2 */}
                    <motion.line
                        x1="80"
                        y1="20"
                        x2="20"
                        y2="80"
                        stroke="white"
                        strokeWidth="10"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
                    />
                </motion.svg>

                <p className="text-4xl font-bold">Недостаточно средств</p>
                <p className="text-lg mt-2 opacity-80">Пополните баланс и попробуйте снова.</p>

                <button
                    onClick={onClose}
                    className="mt-6 px-8 py-3 bg-white text-[#e4002b] font-semibold rounded-xl shadow"
                >
                    Закрыть
                </button>
            </motion.div>
        </motion.div>
    );
};

export default InsufficientFundsAnimation;
