import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DonateSuccessModal = ({ amount, onClose }) => {
    return (
        <AnimatePresence>
            <>
                {/* Фон затемнения */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black z-60"
                    onClick={onClose} // Закрытие по клику на фон
                />

                {/* Модалка по центру */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: -50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="fixed top-1/2 left-1/2 z-70 w-96 sm:w-80 bg-[#e4002b] text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                >
                    <motion.div
                        className="text-center"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-2xl font-bold mb-2 animate-bounce">🎉 Спасибо!</h3>
                        <p className="text-lg">
                            Вы пожертвовали: <span className="font-semibold">{amount.toLocaleString()} сум</span>
                        </p>
                    </motion.div>

                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 bg-white text-[#e4002b] font-semibold px-6 py-3 rounded-xl shadow-lg"
                    >
                        Закрыть
                    </motion.button>
                </motion.div>
            </>
        </AnimatePresence>
    );
};

export default DonateSuccessModal;
