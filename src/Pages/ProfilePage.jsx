import React, { useContext, useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { AppContext } from "../AppContext"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {
    const { userInfo } = useContext(AppContext)
    const user = JSON.parse(localStorage.getItem(`currentUserID`))

    const [userDetails, setDetails] = useState(null)
    const [openStates, setOpenStates] = useState([])
    const [reviews, setReviews] = useState(null)
    const [showHistory, setShowHistory] = useState(false)
    const navigate = useNavigate()

    const getUserDetail = async () => {
        try {
            const req = await axios.get(
                `https://korzinka-server.onrender.com/users/${user}`
            )
            setDetails(req.data)
            setOpenStates(Array(req.data.purchaseHistory.length).fill(false))
        } catch (err) {
            console.log(err)
        }
    }

    const toggleOrder = (index) => {
        setOpenStates((prev) =>
            prev.map((v, i) => (i === index ? !v : v))
        )
    }

    const getReviews = async () => {
        try {
            const req = await axios.get(
                `https://korzinka-server.onrender.com/users/693a8431905b3e7a18a703b3/reviews`
            )
            setReviews(req.data)
        } catch (err) {
            console.log(err)
        }
    }

    const exitToAccountClick = () => {
        localStorage.clear()
        navigate(`/`)
        navigate(0)
    }

    useEffect(() => {
        getUserDetail()
        getReviews()
    }, [])

    return (
        <div className="max-w-6xl mx-auto mt-22 px-4 pb-20">
            <AnimatePresence>
                {userDetails && (
                    <>
                        {/* ===== PROFILE CARD ===== */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white shadow-2xl rounded-3xl p-8 flex items-center gap-8"
                        >
                            <img
                                src={userDetails.avatar || ""}
                                alt="avatar"
                                className="w-32 h-32 rounded-full border-4 border-[#e4002b] bg-gray-200"
                            />

                            <div>
                                <h2 className="text-4xl font-extrabold">
                                    {userDetails.name}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    ID: {userDetails._id}
                                </p>

                                <div className="mt-4 bg-[#e4002b] text-white px-6 py-3 rounded-xl inline-block">
                                    Баланс:{" "}
                                    <span className="font-bold">
                                        {userDetails.balance.toLocaleString()} сум
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* ===== TOGGLE HISTORY ===== */}
                        <div className="mt-14 flex justify-between items-center">
                            <h3 className="text-3xl font-bold">
                                История покупок
                            </h3>

                            <button
                                onClick={() => setShowHistory(v => !v)}
                                className="px-6 py-3 rounded-xl bg-[#e4002b] text-white font-semibold hover:scale-105 transition"
                            >
                                {showHistory ? "Скрыть" : "Показать"}
                            </button>
                        </div>

                        {/* ===== PURCHASE HISTORY ===== */}
                        <AnimatePresence>
                            {showHistory && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-6 max-h-[500px] overflow-y-auto custom-scroll space-y-5 pr-3"
                                >
                                    {userDetails.purchaseHistory.map((order, index) => (
                                        <motion.div
                                            key={order._id}
                                            className="bg-white shadow-xl rounded-3xl p-6 cursor-pointer"
                                            onClick={() => toggleOrder(index)}
                                        >
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-bold text-lg">
                                                        Заказ №{index + 1}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        {new Date(order.date).toLocaleString()}
                                                    </p>
                                                </div>

                                                <p className="text-[#e4002b] font-bold text-xl">
                                                    {order.totalPrice.toLocaleString()} сум
                                                </p>
                                            </div>

                                            <AnimatePresence>
                                                {openStates[index] && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="mt-4 space-y-3"
                                                    >
                                                        {order.products.map(p => (
                                                            <div
                                                                key={p.productId}
                                                                className="flex justify-between bg-gray-50 p-4 rounded-xl"
                                                            >
                                                                <p>{p.name}</p>
                                                                <span className="font-bold">
                                                                    {p.price} сум
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ===== REVIEWS ===== */}
                        <div className="mt-16">
                            <h3 className="text-3xl font-bold mb-6">
                                Ваши отзывы
                            </h3>

                            <div className="bg-white shadow-2xl rounded-3xl p-6 space-y-6">
                                {reviews &&
                                    reviews.reviews.map((review, i) => {
                                        const date = new Date(review.date)
                                        return (
                                            <div key={i}>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className="text-yellow-400"
                                                        />
                                                    ))}
                                                </div>

                                                <p className="mt-2 text-lg">
                                                    {review.text}
                                                </p>

                                                <p className="text-gray-400 text-sm">
                                                    {date.getDate()}.{date.getMonth() + 1}.
                                                    {date.getFullYear()}
                                                </p>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        <button onClick={exitToAccountClick} className="bg-[#e4002b] text-white font-semibold py-5 px-4 rounded-lg shadow-md hover:bg-[#ff4c5b] hover:shadow-lg transition duration-300 mt-[20px] w-full ">
                            Выйти из аккаунта
                        </button>
                    </>
                )}
            </AnimatePresence>

            {/* ===== SCROLLBAR STYLE ===== */}
            <style>{`
                .custom-scroll::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background: #e4002b;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    )
}

export default ProfilePage
