import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

const ReviewSuccess = ({ onClose }) => {
    return (
        <AnimatePresence>

            <motion.div
                className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-2xl p-10 flex flex-col items-center gap-4 shadow-2xl"
                    initial={{ scale: 0.6, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.6, y: 50 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <CheckCircle size={80} className="text-[#e4002b]" />

                    <h2 className="text-2xl font-bold text-center">
                        Отзыв отправлен!
                    </h2>

                    <p className="text-gray-500 text-center">
                        Спасибо за ваш отзыв ❤️
                    </p>

                    <button
                        onClick={onClose}
                        className="mt-4 px-6 py-3 bg-[#e4002b] text-white rounded-xl hover:bg-[#e4002aa4] transition"
                    >
                        Закрыть
                    </button>
                </motion.div>
            </motion.div>

        </AnimatePresence>
    )
}

export default ReviewSuccess
