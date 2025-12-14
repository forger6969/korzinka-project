import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-xl"
            >
                {/* 404 */}
                <motion.h1
                    initial={{ y: -30 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[140px] font-extrabold text-[#e4002b] leading-none"
                >
                    404
                </motion.h1>

                {/* subtitle */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-[#302E33] mt-4"
                >
                    Страница не найдена
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-500 text-lg mt-4"
                >
                    Возможно, страница была удалена,
                    или вы ввели неверный адрес
                </motion.p>

                {/* button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                >
                    <Link
                        to="/"
                        className="inline-block bg-[#e4002b] text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:scale-105 transition"
                    >
                        Вернуться на главную
                    </Link>
                </motion.div>

                {/* decorative blob */}
                <div className="absolute -z-10 inset-0 flex justify-center items-center">
                    <div className="w-[420px] h-[420px] bg-[#e4002b] opacity-10 blur-[120px] rounded-full" />
                </div>
            </motion.div>
        </div>
    )
}

export default NotFoundPage
